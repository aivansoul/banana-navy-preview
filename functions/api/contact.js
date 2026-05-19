/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Playbook System 9, Step 5 ("Pages Function — your first API on demand").
 *
 * When deployed on Cloudflare Pages, files under functions/ are auto-detected
 * as edge functions. This handler receives the contact form POST, validates
 * the fields, and (when wired) forwards to email + CRM.
 *
 * Required Cloudflare environment variables (set in Pages → Settings → Variables):
 *
 *   RESEND_API_KEY        — for the notification email (or replace with another provider)
 *   NOTIFY_TO             — your inbox, e.g. hello@banana-navy.com
 *   NOTIFY_FROM           — verified sender, e.g. site@banana-navy.com
 *   CRM_WEBHOOK_URL       — optional; if set, a POST mirrors the lead to your CRM
 *   CRM_WEBHOOK_TOKEN     — optional bearer token for that webhook
 *
 * If RESEND_API_KEY is not set, the function still returns 200 to the
 * browser so the form doesn't break — it just logs the submission instead.
 */

export async function onRequestPost({ request, env }) {
  let payload;
  const ct = request.headers.get("content-type") || "";

  // Accept both application/x-www-form-urlencoded (the default form post)
  // and application/json (in case we add fetch-based clients later).
  try {
    if (ct.includes("application/json")) {
      payload = await request.json();
    } else {
      const form = await request.formData();
      payload = Object.fromEntries(form.entries());
    }
  } catch (err) {
    return json({ ok: false, error: "Invalid payload" }, 400);
  }

  // Honeypot — silent drop if the bot field is filled.
  if (payload.website || payload.url) {
    return json({ ok: true });
  }

  // Minimal validation. Adjust to what's required by the brand.
  const errors = [];
  if (!payload.name || String(payload.name).trim().length < 2) errors.push("name");
  if (!payload.email || !/.+@.+\..+/.test(payload.email)) errors.push("email");
  if (!payload.message || String(payload.message).trim().length < 5) errors.push("message");
  if (!payload.rgpd) errors.push("rgpd");
  if (errors.length) {
    return json({ ok: false, error: "Missing or invalid fields", fields: errors }, 400);
  }

  const lead = {
    name: String(payload.name).trim(),
    email: String(payload.email).trim().toLowerCase(),
    company: payload.company ? String(payload.company).trim() : "",
    message: String(payload.message).trim(),
    locale: request.headers.get("accept-language")?.startsWith("nl") ? "nl" : "fr",
    referer: request.headers.get("referer") || "",
    userAgent: request.headers.get("user-agent") || "",
    ip:
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for") ||
      "",
    submittedAt: new Date().toISOString(),
  };

  // Fire-and-forget side effects. Use Promise.allSettled so one provider
  // outage doesn't break the user-facing success response.
  const tasks = [];

  if (env.RESEND_API_KEY) tasks.push(sendNotificationEmail(lead, env));
  if (env.CRM_WEBHOOK_URL) tasks.push(forwardToCrm(lead, env));

  const results = await Promise.allSettled(tasks);
  const failures = results
    .filter((r) => r.status === "rejected")
    .map((r) => String(r.reason));
  if (failures.length) {
    console.error("[contact] some side-effects failed:", failures);
  }

  // Always 200 to the user — they don't care if our email provider hiccuped.
  return json({ ok: true });
}

/* ---------- helpers ---------- */

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

async function sendNotificationEmail(lead, env) {
  const to = env.NOTIFY_TO || "hello@banana-navy.com";
  const from = env.NOTIFY_FROM || "site@banana-navy.com";
  const subject = `Nouveau lead site — ${lead.name}${
    lead.company ? ` (${lead.company})` : ""
  }`;
  const text = [
    `Nom        : ${lead.name}`,
    `Email      : ${lead.email}`,
    `Entreprise : ${lead.company || "—"}`,
    `Locale     : ${lead.locale}`,
    `Reçu le    : ${lead.submittedAt}`,
    `Provenance : ${lead.referer || "—"}`,
    `IP         : ${lead.ip}`,
    "",
    "Message :",
    lead.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, text }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

async function forwardToCrm(lead, env) {
  const headers = { "Content-Type": "application/json" };
  if (env.CRM_WEBHOOK_TOKEN) {
    headers.Authorization = `Bearer ${env.CRM_WEBHOOK_TOKEN}`;
  }
  const res = await fetch(env.CRM_WEBHOOK_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error(`CRM webhook ${res.status}: ${await res.text()}`);
}
