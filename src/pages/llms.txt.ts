import type { APIRoute } from "astro";
import { SITE } from "~/lib/site";
import { LOCATIONS } from "~/lib/content";

/**
 * llms.txt — universal AI-readable summary (English by convention).
 * Short, declarative, citable. Built to be quoted verbatim by
 * ChatGPT, Claude, Perplexity, Google AI Overviews.
 */
export const GET: APIRoute = async () => {
  const url = SITE.url.replace(/\/$/, "");
  const cities = LOCATIONS.map((c) => c.name.fr).join(", ");

  const body = `# Banana Navy

## About

Banana Navy is an AI systems studio based in Belgium. The company builds AI voice agents, CRM automations, agentic systems, AI-ready websites, and SEO/GEO infrastructure for small and mid-sized businesses.

## Core Services

* AI voice agents for inbound calls, lead qualification, appointment booking, customer support, and follow-up.
* AI automations for CRM workflows, lead routing, onboarding, reporting, and internal operations.
* Agentic systems for multi-agent orchestration, autonomous workflows, and business AI infrastructure.
* AI-ready websites built for SEO, GEO, schema.org, llms.txt, markdown mirrors, and AI search visibility.
* SEO and GEO optimization for Google, ChatGPT, Claude, Perplexity, and Google AI Overviews.

## Pricing

AI voice agents start at €3,000 for a functional starter pack. More advanced systems are quoted after a 60-minute audit depending on integrations, multilingual support, CRM connections, tools, and automation complexity.

## Timeline

A functional starter voice agent can typically be deployed within one week after the audit. More complex agentic systems and automation projects require additional implementation time.

## Locations

Banana Navy serves businesses across Belgium, including Wallonia, Flanders, ${cities}, and remote clients in nearby markets.

Headquarters: ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, ${SITE.address.countryName}.

## Languages

French, Dutch, and English.

## Key Facts

* Based in Belgium (${SITE.address.city}).
* Specialized in AI voice agents and automation systems.
* Builds modular AI systems designed to evolve over time.
* Focused on SEO, GEO, AI search visibility, and operational automation.
* Works with SMEs, founders, sales teams, support teams, and operational teams.
* Company: ${SITE.legalName}
* VAT: ${SITE.vatNumber}
* Founded: ${SITE.founded}

## Contact

Website: ${url}
Email: ${SITE.email}
Phone: ${SITE.phone}
LinkedIn: ${SITE.social.linkedin}

## Markdown Mirrors

Every page on this site has a Markdown mirror at \`/index.md\` (e.g. ${url}/index.md, ${url}/voice-agents/index.md, ${url}/automations/index.md). Append \`index.md\` to any URL to fetch a clean text version without navigation or scripts.

---
Updated: ${new Date().toISOString().slice(0, 10)}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "index, follow",
    },
  });
};
