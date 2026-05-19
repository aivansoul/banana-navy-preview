/**
 * UI-side metadata only. The full system prompts live server-side at
 * functions/api/agents/_charters.js and are never sent to the browser.
 */

export type AgentMeta = {
  slug: string;
  name: string;
  tagline: string;
};

export const TEAM_AGENTS_META: AgentMeta[] = [
  {
    slug: "chief-of-staff",
    name: "Chief of Staff",
    tagline: "Routeur stratégique · revues hebdo · arbitrages cross-lane.",
  },
  {
    slug: "chief-marketing-officer",
    name: "CMO",
    tagline: "Voix de marque · calendrier de contenu · SEO/GEO · LinkedIn.",
  },
  {
    slug: "chief-revenue-officer",
    name: "CRO",
    tagline: "Pipeline · conversion · leads chauds · win/loss.",
  },
  {
    slug: "chief-operating-officer",
    name: "COO",
    tagline: "Uptime · SOPs · intégrations · coûts d'infra.",
  },
  {
    slug: "chief-financial-officer",
    name: "CFO",
    tagline: "P&L · AR · allocation de capital · pricing.",
  },
];

export const DEMO_AGENTS_META: AgentMeta[] = [
  {
    slug: "navigator",
    name: "Navigator",
    tagline:
      "Pose 2-3 questions ciblées et identifie quel(s) service(s) Banana Navy correspondent à ton besoin.",
  },
  {
    slug: "architect",
    name: "Architect",
    tagline:
      "Une fois le service identifié, esquisse l'architecture, les intégrations et un ordre de grandeur de timing.",
  },
];

export const DEMO_MAX_TURNS_PER_SESSION = 6;
