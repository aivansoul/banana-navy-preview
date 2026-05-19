/**
 * Playbook System 7 — Claude Code + CRM helper
 *
 * Generic CRM client wrapper. Talk to your CRM via these functions from any
 * prompt or script. Copy to scripts/crm-client.mjs, fill in the adapters for
 * your provider, and Claude Code can now:
 *
 *   - "Pull stale leads in my CRM with no activity for 30 days"
 *   - "Audit broken automations"
 *   - "Draft 50 personalised reactivation messages — show me before sending"
 *
 * Required env vars (see .env.example):
 *   CRM_PROVIDER=ghl | hubspot | notion | pipedrive | salesforce
 *   CRM_API_KEY=...
 *   CRM_LOCATION_ID=...  (GHL only)
 */

const PROVIDER = process.env.CRM_PROVIDER;
const API_KEY = process.env.CRM_API_KEY;
const LOCATION_ID = process.env.CRM_LOCATION_ID;

if (!PROVIDER) throw new Error("Set CRM_PROVIDER in .env");
if (!API_KEY) throw new Error("Set CRM_API_KEY in .env");

/* ---------- Public API used by other scripts ---------- */

export async function listContacts(filters = {}) {
  return providers[PROVIDER].listContacts(filters);
}

export async function getContact(id) {
  return providers[PROVIDER].getContact(id);
}

export async function getConversation(contactId) {
  return providers[PROVIDER].getConversation(contactId);
}

export async function sendSms(contactId, body) {
  return providers[PROVIDER].sendSms(contactId, body);
}

export async function addTag(contactId, tag) {
  return providers[PROVIDER].addTag(contactId, tag);
}

export async function listWorkflows() {
  return providers[PROVIDER].listWorkflows();
}

/* ---------- Provider adapters ---------- */

const providers = {
  ghl: {
    base: "https://services.leadconnectorhq.com",
    async listContacts({ limit = 100, tag, dateAfter } = {}) {
      const url = new URL("/contacts/", this.base);
      url.searchParams.set("locationId", LOCATION_ID);
      url.searchParams.set("limit", String(limit));
      if (tag) url.searchParams.set("tags", tag);
      if (dateAfter) url.searchParams.set("sortBy", "date_added");
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Version: "2021-07-28",
          Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error(`GHL listContacts ${res.status}`);
      const json = await res.json();
      return json.contacts ?? [];
    },
    async getContact(id) {
      const res = await fetch(`${this.base}/contacts/${id}`, {
        headers: { Authorization: `Bearer ${API_KEY}`, Version: "2021-07-28" },
      });
      return (await res.json()).contact;
    },
    async getConversation(contactId) {
      const res = await fetch(
        `${this.base}/conversations/search?contactId=${contactId}&locationId=${LOCATION_ID}`,
        {
          headers: { Authorization: `Bearer ${API_KEY}`, Version: "2021-07-28" },
        },
      );
      return (await res.json()).conversations ?? [];
    },
    async sendSms(contactId, body) {
      throw new Error("Wire up GHL conversations send endpoint when ready");
    },
    async addTag(contactId, tag) {
      throw new Error("Wire up GHL tag-add endpoint when ready");
    },
    async listWorkflows() {
      const res = await fetch(`${this.base}/workflows/?locationId=${LOCATION_ID}`, {
        headers: { Authorization: `Bearer ${API_KEY}`, Version: "2021-07-28" },
      });
      return (await res.json()).workflows ?? [];
    },
  },

  hubspot: {
    base: "https://api.hubapi.com",
    async listContacts({ limit = 100 } = {}) {
      const res = await fetch(`${this.base}/crm/v3/objects/contacts?limit=${limit}`, {
        headers: { Authorization: `Bearer ${API_KEY}`, Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HubSpot listContacts ${res.status}`);
      return (await res.json()).results ?? [];
    },
    async getContact(id) {
      const res = await fetch(`${this.base}/crm/v3/objects/contacts/${id}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      return res.json();
    },
    async getConversation() { throw new Error("HubSpot conversations TODO"); },
    async sendSms() { throw new Error("HubSpot SMS goes through their Engagement API"); },
    async addTag() { throw new Error("HubSpot uses lists, not tags"); },
    async listWorkflows() { throw new Error("HubSpot workflows TODO"); },
  },

  // Add more providers as needed.
};
