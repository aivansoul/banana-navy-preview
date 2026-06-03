/**
 * Cloudflare Pages Function — POST /api/newsletter
 *
 * Handles newsletter sign-ups from /newsletter/. Validates the email + consent,
 * then (when wired) adds the subscriber to your provider. If no provider env is
 * set, it still returns 200 so the form never breaks — it just logs the signup.
 *
 * Optional Cloudflare environment variables (Pages → Settings → Variables):
 *
 *   RESEND_API_KEY         — Resend API key (reused from the contact form)
 *   RESEND_AUDIENCE_ID     — Resend Audience to add the contact to
 *   NEWSLETTER_WEBHOOK_URL — generic webhook (Mailerlite/Brevo/Beehiiv/n8n…)
 *   NEWSLETTER_WEBHOOK_TOKEN — optional bearer token for that webhook
 */

export async function onRequestPost({ request, env }) {
  let payload;
  const ct = request.headers.get("content-type") || "";
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

  // Honeypot — silent drop if a bot filled the hidden field.
  if (payload.website || payload.url) {
    return json({ ok: true });
  }

  const errors = [];
  if (!payload.email || !/.+@.+\..+/.test(payload.email)) errors.push("email");
  if (!payload.rgpd) errors.push("rgpd");
  if (errors.length) {
    return json({ ok: false, error: "Missing or invalid fields", fields: errors }, 400);
  }

  const sub = {
    email: String(payload.email).trim().toLowerCase(),
    locale: request.headers.get("accept-language")?.startsWith("nl") ? "nl" : "fr",
    source: "newsletter-page",
    referer: request.headers.get("referer") || "",
    submittedAt: new Date().toISOString(),
  };

  const tasks = [];
  if (env.RESEND_API_KEY && env.RESEND_AUDIENCE_ID) tasks.push(addToResendAudience(sub, env));
  if (env.NEWSLETTER_WEBHOOK_URL) tasks.push(forwardToWebhook(sub, env));

  const results = await Promise.allSettled(tasks);
  const failures = results.filter((r) => r.status === "rejected").map((r) => String(r.reason));
  if (failures.length) console.error("[newsletter] some side-effects failed:", failures);
  if (!tasks.length) console.log("[newsletter] signup (no provider wired):", sub.email);

  return json({ ok: true });
}

/* ---------- helpers ---------- */

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

async function addToResendAudience(sub, env) {
  const res = await fetch(
    `https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: sub.email, unsubscribed: false }),
    },
  );
  // Resend returns 409 if the contact already exists — treat that as success.
  if (!res.ok && res.status !== 409) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

async function forwardToWebhook(sub, env) {
  const headers = { "Content-Type": "application/json" };
  if (env.NEWSLETTER_WEBHOOK_TOKEN) {
    headers.Authorization = `Bearer ${env.NEWSLETTER_WEBHOOK_TOKEN}`;
  }
  const res = await fetch(env.NEWSLETTER_WEBHOOK_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(sub),
  });
  if (!res.ok) throw new Error(`Newsletter webhook ${res.status}: ${await res.text()}`);
}
