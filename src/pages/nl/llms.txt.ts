import type { APIRoute } from "astro";
import { SITE } from "~/lib/site";
import { SERVICE_CATEGORIES, FAQ, POSITIONING, LAYERS_5, LOCATIONS } from "~/lib/content";

/**
 * Playbook System 1 — Dutch llms.txt at /nl/llms.txt
 */
export const GET: APIRoute = async () => {
  const url = SITE.url.replace(/\/$/, "");

  const categoryBlocks = SERVICE_CATEGORIES.map((cat) => {
    const head = `### ${cat.head} — ${cat.one_liner.nl}`;
    const leaves = cat.leaves
      .map((leaf) => {
        const feats = leaf.features.nl.map((f) => `  - ${f}`).join("\n");
        return `- **${leaf.name.nl}** — ${leaf.claim.nl}\n${feats}\n  → ${url}/nl/${cat.slug}/${leaf.slug}/`;
      })
      .join("\n\n");
    return `${head}\n\nDetails: ${cat.intro.nl}\n\n${leaves}\n\nBekijk alles: ${url}/nl/${cat.slug}/`;
  }).join("\n\n---\n\n");

  const layerBlock = LAYERS_5.map(
    (l) => `- **${l.num} — ${l.name.nl}** (${l.bridgeTo}) · ${l.desc.nl}`,
  ).join("\n");

  const faqBlock = FAQ.nl
    .map((q, i) => `### ${i + 1}. ${q.q}\n${q.a}`)
    .join("\n\n");

  const allRoutes = [
    "/nl/",
    "/nl/agentic-systems/",
    ...SERVICE_CATEGORIES.find((c) => c.slug === "agentic-systems")!.leaves.map(
      (l) => `/nl/agentic-systems/${l.slug}/`,
    ),
    "/nl/voice-agents/",
    ...SERVICE_CATEGORIES.find((c) => c.slug === "voice-agents")!.leaves.map(
      (l) => `/nl/voice-agents/${l.slug}/`,
    ),
    "/nl/automations/",
    ...SERVICE_CATEGORIES.find((c) => c.slug === "automations")!.leaves.map(
      (l) => `/nl/automations/${l.slug}/`,
    ),
    "/nl/create/",
    ...SERVICE_CATEGORIES.find((c) => c.slug === "create")!.leaves.map(
      (l) => `/nl/create/${l.slug}/`,
    ),
    "/nl/seo/",
    ...SERVICE_CATEGORIES.find((c) => c.slug === "seo")!.leaves.map(
      (l) => `/nl/seo/${l.slug}/`,
    ),
    "/nl/locations/",
    ...LOCATIONS.map((c) => `/nl/locations/${c.slug}/`),
    "/nl/realisations/",
    "/nl/realisations/immopolis/",
    "/nl/approche/",
    "/nl/lab/",
    "/nl/equipe/",
    "/nl/contact/",
    "/nl/faq/",
    "/nl/mentions-legales/",
    "/nl/politique-confidentialite/",
    "/nl/cgv/",
  ];
  const mirrors = allRoutes.map((r) => `- ${url}${r}index.md`).join("\n");

  const body = `# ${SITE.brandName}

> ${POSITIONING.nl}

## About
${SITE.brandName} (${SITE.legalName}) is een Belgische studio in ${SITE.address.city} (${SITE.address.country}). Opgericht in ${SITE.founded}. We ontwerpen en exploiteren modulaire agent-systemen in productie: voice- en chat-agents, operationele automatisering, business AI-infrastructuur, AI-ready websites, en SEO + GEO-optimalisatie. Onze handtekening: een stap 4 genaamd "Evolve" — modulaire architectuur waarbij elke laag (modellen, vector store, agents, tools) een uitwisselbare module is, zodat de stack de snelle AI-evoluties volgt zonder complete rebuild na 12 maanden.

## Drie pijlers
- **Agents** — orkestratie en communicatie. Omvat Agentic Systems + Voice Agents.
- **Automate** — operations. Omvat Automations (CRM, routing, onboarding).
- **Create** — interface en discovery. Omvat Create (AI-ready websites) + SEO (GEO + AI Search).

## Vijf lagen
${layerBlock}

## Diensten & Prijzen

${categoryBlocks}

> Prijzen op offerte. Audit van 60 minuten gratis, vrijblijvend. Typische sprints van 2 weken.

## Locaties
- ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city}, België

## Werkgebied
België (Wallonië, Brussel, Vlaanderen), Frankrijk, Luxemburg, Nederland. Remote interventies in heel Europa.

### Prioritair bediende steden
${LOCATIONS.map((c) => `- ${c.name.nl} (${c.postalCode}) — ${c.trades.nl.split(".")[0]}. Toegewijde pagina: ${SITE.url.replace(/\/$/, "")}/nl/locations/${c.slug}/`).join("\n")}

## Contact
- Email: ${SITE.email}
- Telefoon: ${SITE.phone}
- Website: ${url}/nl/
- LinkedIn: ${SITE.social.linkedin}
- Uren: maandag–vrijdag, 9u–18u CET

## Kerngegevens
- Vennootschap: ${SITE.legalName}
- BTW: ${SITE.vatNumber}
- Opgericht: ${SITE.founded}
- 5 dienst-categorieën, 13 toegewijde diensten
- Stack: open-source modellen (Llama, Mistral, Qwen) op EU-infra + Claude/GPT waar benchmarks dit rechtvaardigen
- Representatieve klanten: Belfius, NMBS, ORES, PharmaLys, Immo-Vision, jachetevotreauto.be
- Operationele talen: Frans, Nederlands, Engels

## Wat ons onderscheidt
We leveren geen POC, we leveren een modulair systeem dat mee evolueert met AI — nieuwe modellen, nieuwe tools, nieuwe use cases. Architectuur vanaf het begin ontworpen om complete rebuild te vermijden wanneer de tech beweegt. We documenteren elke guardrail. We kiezen waar mogelijk open-source modellen. We tonen je waar je data passeert, prompt per prompt.

## Markdown Mirrors
Elke pagina van deze site heeft een propere Markdown-mirror — voeg \`/index.md\` toe aan eender welke URL voor de inhoud zonder navigatie, scripts of chrome:

${mirrors}

## Veelgestelde vragen

${faqBlock}

---
Bijgewerkt: ${new Date().toISOString().slice(0, 10)}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "index, follow",
    },
  });
};
