#!/usr/bin/env node
/**
 * Playbook System 6 — CRM Lead Recovery
 *
 * CRM-agnostic template. Implement the four adapter functions for your CRM
 * (GoHighLevel, HubSpot, Notion, Pipedrive, Salesforce…), copy this file to
 * scripts/lead-scanner.mjs, and you're done.
 *
 * Run nightly via cron on Cloudflare (System 9 will wire that up) or via
 * launchd/cron on your machine.
 *
 * Output: a JSON file at _data/leads/YYYY-MM-DD.json containing every
 * un-responded lead from the last 24h with a drafted follow-up email.
 *
 * Safety: this script DRAFTS. It never sends. You review and approve.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk"; // npm i @anthropic-ai/sdk

const CRM = process.env.CRM_PROVIDER || "ghl"; // ghl | hubspot | notion
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const LOOK_BACK_HOURS = 24;

if (!ANTHROPIC_API_KEY) {
  console.error("ANTHROPIC_API_KEY missing — set it in .env");
  process.exit(1);
}
const claude = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

/* ---------- CRM adapters — implement these per provider ---------- */

/** Return array of leads added in the last `hours` hours. */
async function fetchRecentLeads(_hours) {
  // GHL example:
  //   const res = await fetch(`https://services.leadconnectorhq.com/contacts/`, {
  //     headers: { Authorization: `Bearer ${process.env.GHL_API_KEY}`, Version: "2021-07-28" },
  //   });
  //   const json = await res.json();
  //   return json.contacts.filter((c) => isWithin(c.dateAdded, hours));
  throw new Error(`Implement fetchRecentLeads for CRM=${CRM}`);
}

/** Return true if any outbound message was sent to this contact. */
async function hasOutboundResponse(_contact) {
  throw new Error(`Implement hasOutboundResponse for CRM=${CRM}`);
}

/** Return contact's first inbound message (used to personalise drafts). */
async function fetchFirstInboundMessage(_contact) {
  throw new Error(`Implement fetchFirstInboundMessage for CRM=${CRM}`);
}

/** Optionally tag the contact with "lead-recovery-drafted" so we don't redraft. */
async function tagContact(_contact, _tag) {
  // no-op in dry-run mode
}

/* ---------- Drafting via Claude ---------- */

async function draftFollowUp({ name, company, industry, firstMessage }) {
  const prompt = `You are drafting a follow-up email for ${name} from ${company || "an unknown company"} (industry: ${industry || "general"}). The lead's first message was:

"${firstMessage || "(no message)"}"

Write a short follow-up email (under 100 words). Sound like a real person — direct, no marketing fluff. Reference their original ask if there is one. End with one clear next step. Output the email body only, no subject line.`;

  const resp = await claude.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 400,
    messages: [{ role: "user", content: prompt }],
  });
  return resp.content[0].type === "text" ? resp.content[0].text.trim() : "";
}

/* ---------- Main ---------- */

async function main() {
  const leads = await fetchRecentLeads(LOOK_BACK_HOURS);
  console.log(`[lead-scanner] ${leads.length} leads in last ${LOOK_BACK_HOURS}h`);

  const drafts = [];
  for (const lead of leads) {
    if (await hasOutboundResponse(lead)) {
      console.log(`[lead-scanner] skip ${lead.email} — already responded`);
      continue;
    }
    const firstMessage = await fetchFirstInboundMessage(lead);
    const draft = await draftFollowUp({
      name: lead.firstName || lead.name || "there",
      company: lead.companyName,
      industry: lead.industry,
      firstMessage,
    });
    drafts.push({
      id: lead.id,
      name: lead.firstName,
      email: lead.email,
      phone: lead.phone,
      company: lead.companyName,
      source: lead.source,
      firstMessage,
      draft,
    });
    if (!process.argv.includes("--dry-run")) {
      await tagContact(lead, "lead-recovery-drafted");
    }
  }

  const stamp = new Date().toISOString().slice(0, 10);
  const out = path.resolve("_data/leads", `${stamp}.json`);
  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, JSON.stringify(drafts, null, 2));
  console.log(`[lead-scanner] ${drafts.length} drafts written to ${out}`);
  console.log("[lead-scanner] Review them. Approved drafts can be sent through your CRM UI or via your usual send-mail script.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
