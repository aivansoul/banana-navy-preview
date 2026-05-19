/**
 * Page-level content snippets shared across FR/NL surfaces.
 * Service taxonomy: 3 pillars → 5 categories → 13 leaves.
 *
 * Pillars (positioning vocabulary):
 *   - Agents   → agentic-systems + voice-agents (orchestration + communication)
 *   - Automate → automations (operations)
 *   - Create   → create + seo (interface + discovery)
 *
 * URL slugs are English on every locale by design (B2B universal vocabulary).
 * Descriptive copy stays per-locale.
 */
import type { Locale } from "./site";

export const TRUST_CLIENTS = [
  "Belfius",
  "SNCB",
  "ORES",
  "PharmaLys",
  "InhaTarget",
  "Immo-Vision",
  "MonkeyBridge",
  "Mademoiselle Jo",
  "Secundo",
  "Lusty Foods",
  "Horse Notebook",
  "jachetevotreauto.be",
];

/* ============================================================
   POSITIONING & PILLARS
   ============================================================ */

export const POSITIONING: Record<Locale, string> = {
  fr: "Banana Navy conçoit des agents vocaux IA, automatisations CRM, systèmes agentiques et sites IA-ready pour les entreprises qui veulent automatiser sans perdre la main sur leurs données, leurs clients et leurs opérations.",
  nl: "Banana Navy ontwerpt modulaire agent-systemen die communicatie, operations, leadgeneratie en digitale groei automatiseren — via AI-agents, workflows en infrastructuur ontworpen om de snelle AI-evoluties bij te houden, zonder na 12 maanden obsoleet te zijn.",
};

/**
 * Short SEO meta description (≤ 160 chars), distinct from POSITIONING.
 * Used as <meta name="description"> on the homepage.
 */
export const META_DESCRIPTION: Record<Locale, string> = {
  fr: "Banana Navy conçoit des agents vocaux IA, automatisations CRM, systèmes agentiques et sites IA-ready pour les PME en Belgique. Audit 60 min, premier agent fonctionnel en 1 semaine.",
  nl: "Banana Navy bouwt AI voice agents, CRM-automatisering, agent-systemen en AI-ready websites voor KMO's in België. 60 min audit, eerste agent in 1 week.",
};

export const PILLARS_3 = [
  {
    key: "agents",
    title: { fr: "Agents", nl: "Agents" },
    tagline: {
      fr: "Voix, chat, orchestration. Vos agents IA prennent les appels, qualifient les leads, coordonnent vos systèmes.",
      nl: "Voice, chat, orkestratie. Je AI-agents nemen oproepen aan, kwalificeren leads, coördineren systemen.",
    },
    categories: ["agentic-systems", "voice-agents"],
  },
  {
    key: "automate",
    title: { fr: "Automate", nl: "Automate" },
    tagline: {
      fr: "CRM, routage, onboarding. Les flux opérationnels qui consomment vos journées — automatisés en modules interchangeables, prêts à évoluer.",
      nl: "CRM, routing, onboarding. De operationele flows die je dagen opslokken — geautomatiseerd in uitwisselbare modules, klaar om mee te evolueren.",
    },
    categories: ["automations"],
  },
  {
    key: "create",
    title: { fr: "Create", nl: "Create" },
    tagline: {
      fr: "Sites IA-ready et systèmes de conversion + SEO/GEO. L'interface visible et la couche de découverte.",
      nl: "AI-ready websites en conversiesystemen + SEO/GEO. De zichtbare interface en de discovery-laag.",
    },
    categories: ["create", "seo"],
  },
] as const;

/* ============================================================
   FIVE-LAYER MODEL
   The architecture story we tell on the home + /approche page.
   ============================================================ */

export const LAYERS_5 = [
  {
    key: "communication",
    num: "01",
    name: { fr: "Communication", nl: "Communicatie" },
    desc: {
      fr: "Voice agents — la couche de communication. Vos clients parlent à un agent IA disponible 24/7.",
      nl: "Voice agents — de communicatielaag. Je klanten praten met een AI-agent die 24/7 beschikbaar is.",
    },
    bridgeTo: "voice-agents",
  },
  {
    key: "operations",
    num: "02",
    name: { fr: "Opérations", nl: "Operations" },
    desc: {
      fr: "Automations — la couche opérationnelle. Les workflows qui exécutent ce que vos équipes ne devraient plus toucher.",
      nl: "Automations — de operationele laag. Workflows die uitvoeren wat je teams niet meer zouden mogen aanraken.",
    },
    bridgeTo: "automations",
  },
  {
    key: "discovery",
    num: "03",
    name: { fr: "Découverte", nl: "Discovery" },
    desc: {
      fr: "SEO + GEO — la couche de découverte. Pour être trouvé par Google et cité par ChatGPT, Claude, Perplexity.",
      nl: "SEO + GEO — de discovery-laag. Om gevonden te worden door Google en geciteerd door ChatGPT, Claude, Perplexity.",
    },
    bridgeTo: "seo",
  },
  {
    key: "interface",
    num: "04",
    name: { fr: "Interface", nl: "Interface" },
    desc: {
      fr: "Web systems — la couche d'interface. Sites et apps IA-ready, pensés pour la conversion et la lecture machine.",
      nl: "Web systems — de interfacelaag. Sites en apps AI-ready, ontworpen voor conversie en machine-leesbaarheid.",
    },
    bridgeTo: "create",
  },
  {
    key: "orchestration",
    num: "05",
    name: { fr: "Orchestration", nl: "Orkestratie" },
    desc: {
      fr: "Agentic systems — la couche d'orchestration. Les agents qui coordonnent les quatre autres couches comme un chef d'orchestre.",
      nl: "Agentic systems — de orkestratielaag. Agents die de andere vier lagen coördineren als een dirigent.",
    },
    bridgeTo: "agentic-systems",
    keystone: true,
  },
] as const;

/* ============================================================
   SERVICE TAXONOMY
   ============================================================ */

export type LeafService = {
  slug: string;
  name: { fr: string; nl: string; en?: string };
  claim: { fr: string; nl: string };
  features: { fr: string[]; nl: string[] };
};

export type ServiceCategory = {
  slug: string;
  pillar: "agents" | "automate" | "create";
  layer: (typeof LAYERS_5)[number]["key"];
  head: string; // shared display name (English brand vocabulary)
  intro: { fr: string; nl: string };
  one_liner: { fr: string; nl: string };
  leaves: LeafService[];
};

export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  /* ---------- 1. Agentic Systems ---------- */
  {
    slug: "agentic-systems",
    pillar: "agents",
    layer: "orchestration",
    head: "Agentic Systems",
    one_liner: {
      fr: "Des systèmes multi-agents qui coordonnent plusieurs rôles IA : qualification, support, recherche, routage, reporting, documentation et exécution. La couche d'orchestration qui rend l'IA opérationnelle, pas juste conversationnelle.",
      nl: "Orkestratie: agents die je systemen, data en beslissingen coördineren.",
    },
    intro: {
      fr: "Un système agentique est une architecture où plusieurs agents IA travaillent ensemble avec des rôles clairs : analyser, qualifier, rechercher, décider, rédiger, router, exécuter ou escalader à un humain. Contrairement à un chatbot classique, un système agentique peut utiliser des outils, lire des données, déclencher des workflows et suivre des règles métier. Banana Navy conçoit ces systèmes pour les PME et équipes opérationnelles qui veulent dépasser l'automatisation simple.",
      nl: "We ontwerpen de agent-infrastructuur die je business orkestreert — geen geïsoleerde chatbot, maar een team van AI-agents dat beslissingen neemt, acties triggert en je bestaande systemen coördineert. Het is de laag boven al de rest.",
    },
    leaves: [
      {
        slug: "multi-agent-workflows",
        name: { fr: "Workflows multi-agents", nl: "Multi-agent workflows", en: "Multi-Agent Workflows" },
        claim: {
          fr: "Plusieurs agents IA spécialisés qui collaborent en parallèle sur une tâche complexe.",
          nl: "Meerdere gespecialiseerde AI-agents die parallel samenwerken aan complexe taken.",
        },
        features: {
          fr: [
            "Décomposition d'une tâche en sous-agents",
            "Coordination parallèle (CMO, CRO, COO style)",
            "Synthèse finale avec un agent de revue",
            "Logs structurés et audit complet",
          ],
          nl: [
            "Opdeling van een taak in sub-agents",
            "Parallelle coördinatie (CMO, CRO, COO stijl)",
            "Eindsynthese door een review-agent",
            "Gestructureerde logs en volledige audit",
          ],
        },
      },
      {
        slug: "ai-orchestration",
        name: { fr: "AI Orchestration", nl: "AI Orchestration", en: "AI Orchestration" },
        claim: {
          fr: "Un agent chef-d'orchestre qui route les requêtes vers le bon spécialiste ou la bonne API.",
          nl: "Een orkestratie-agent die aanvragen routeert naar de juiste specialist of API.",
        },
        features: {
          fr: [
            "Routing intelligent par intention",
            "Fallback humain au moindre doute",
            "Connecteurs CRM, ERP, calendrier, paiement",
            "Observabilité bout en bout",
          ],
          nl: [
            "Intentiegebaseerde routing",
            "Menselijke fallback bij twijfel",
            "Connectoren naar CRM, ERP, kalender, betaling",
            "End-to-end observability",
          ],
        },
      },
      {
        slug: "autonomous-operations",
        name: { fr: "Opérations autonomes", nl: "Autonomous Operations", en: "Autonomous Operations" },
        claim: {
          fr: "Des opérations qui tournent sans intervention humaine pendant que vous dormez.",
          nl: "Operations die draaien zonder menselijke interventie, terwijl jij slaapt.",
        },
        features: {
          fr: [
            "Crons nocturnes pour audits, relances, rapports",
            "Détection d'anomalies + alerte conditionnelle",
            "Recouvrement de leads sans toucher au CRM à la main",
            "Garde-fou « draft-only » par défaut",
          ],
          nl: [
            "Nachtelijke crons voor audits, follow-ups, rapporten",
            "Anomaliedetectie + voorwaardelijke alerts",
            "Lead-recovery zonder handmatig CRM-werk",
            "Standaard «draft-only» guardrail",
          ],
        },
      },
      {
        slug: "business-ai-infrastructure",
        name: { fr: "Infrastructure IA d'entreprise", nl: "Business AI Infrastructure", en: "Business AI Infrastructure" },
        claim: {
          fr: "Le socle technique pour exploiter l'IA en interne : RAG, vector store, observabilité, sécurité.",
          nl: "Het technische fundament om AI intern uit te rollen: RAG, vector store, observability, security.",
        },
        features: {
          fr: [
            "RAG production-ready sur vos données",
            "Vector store managé ou self-hosted",
            "Eval suite + tests de régression en CI",
            "Hébergement EU + logs souverains",
          ],
          nl: [
            "Production-ready RAG op je data",
            "Managed of self-hosted vector store",
            "Eval suite + regressietests in CI",
            "EU-hosting + soevereine logs",
          ],
        },
      },
    ],
  },

  /* ---------- 2. Voice Agents ---------- */
  {
    slug: "voice-agents",
    pillar: "agents",
    layer: "communication",
    head: "Voice Agents",
    one_liner: {
      fr: "Des agents vocaux capables de répondre aux appels, qualifier les demandes, réserver un rendez-vous, relancer un lead et transférer à un humain quand le contexte l'exige. Français, néerlandais et anglais.",
      nl: "De communicatielaag. Je klanten praten — een AI-agent antwoordt, kwalificeert, draagt over.",
    },
    intro: {
      fr: "Un agent vocal IA permet à votre entreprise de traiter plus d'appels sans recruter immédiatement. Il peut répondre, poser les bonnes questions, qualifier une demande, vérifier une disponibilité, réserver un rendez-vous, créer une fiche CRM ou transférer vers un humain quand le sujet devient sensible. Banana Navy conçoit des agents vocaux pour les entreprises belges qui veulent améliorer leur réactivité sans perdre la qualité de la relation client. Les agents peuvent être construits en français, néerlandais et anglais, avec des scripts adaptés à vos services, votre ton et vos contraintes métier.",
      nl: "Voice-agents die de telefoon 24/7 opnemen, oproepen kwalificeren, afspraken maken en doorgeven aan je team waar nodig. We bouwen ze op Twilio ConversationRelay (of equivalent) met een helder script en directe menselijke fallback.",
    },
    leaves: [
      {
        slug: "ai-receptionist",
        name: { fr: "AI Receptionist", nl: "AI Receptionist", en: "AI Receptionist" },
        claim: {
          fr: "Réceptionniste IA qui prend chaque appel, identifie l'intention, et route vers la bonne personne.",
          nl: "AI-receptioniste die elke oproep aanneemt, de intentie identificeert en doorschakelt naar de juiste persoon.",
        },
        features: {
          fr: [
            "Réponse en moins de 2 sonneries, 24/7",
            "Routage vers les bons numéros internes",
            "Voicemail transcrit + email + Slack",
            "Voix clonée ou voix neutre au choix",
          ],
          nl: [
            "Antwoord in minder dan 2 belsignalen, 24/7",
            "Routing naar de juiste interne nummers",
            "Voicemail transcript + email + Slack",
            "Gekloonde of neutrale stem naar keuze",
          ],
        },
      },
      {
        slug: "ai-sales-agent",
        name: { fr: "AI Sales Agent", nl: "AI Sales Agent", en: "AI Sales Agent" },
        claim: {
          fr: "Agent commercial qui qualifie les leads entrants en moins de 30 secondes.",
          nl: "Sales-agent die binnenkomende leads in minder dan 30 seconden kwalificeert.",
        },
        features: {
          fr: [
            "3–4 questions de qualification adaptatives",
            "Prise de rendez-vous via Calendly/GHL",
            "Transfert chaud si lead premium",
            "Toujours en mode draft pour les premiers 30 jours",
          ],
          nl: [
            "3–4 adaptieve kwalificatievragen",
            "Afspraken via Calendly/GHL",
            "Warme transfer bij premium leads",
            "Eerste 30 dagen altijd in draft-modus",
          ],
        },
      },
      {
        slug: "ai-support-agent",
        name: { fr: "AI Support Agent", nl: "AI Support Agent", en: "AI Support Agent" },
        claim: {
          fr: "Agent support qui résout les demandes courantes et escalade le reste avec contexte complet.",
          nl: "Support-agent die courante vragen oplost en de rest escaleert met volledige context.",
        },
        features: {
          fr: [
            "RAG sur votre base de connaissances",
            "Détection de frustration → escalade humaine",
            "Création de ticket avec contexte structuré",
            "Apprentissage des résolutions humaines pour la suite",
          ],
          nl: [
            "RAG op je knowledge base",
            "Frustratie-detectie → menselijke escalatie",
            "Ticket-creatie met gestructureerde context",
            "Leert van menselijke oplossingen voor de toekomst",
          ],
        },
      },
    ],
  },

  /* ---------- 3. Automations ---------- */
  {
    slug: "automations",
    pillar: "automate",
    layer: "operations",
    head: "Automations",
    one_liner: {
      fr: "Des workflows qui connectent vos formulaires, CRM, calendriers, emails, appels et outils internes. Réduire les tâches répétitives, traiter les leads plus vite, éviter les oublis, rendre vos opérations mesurables.",
      nl: "De operationele laag. Workflows die uitvoeren wat je teams niet meer zouden mogen aanraken.",
    },
    intro: {
      fr: "L'automatisation IA devient utile lorsqu'elle touche un processus réel : un lead arrive, il est enrichi, qualifié, routé, relancé, inscrit dans le CRM et suivi sans que votre équipe doive copier-coller des informations entre cinq outils. Banana Navy conçoit des automatisations CRM et workflows métier avec Make, n8n, Zapier, APIs custom et agents IA. Nous partons de vos outils existants, puis nous créons une architecture simple à comprendre, documentée et évolutive.",
      nl: "We automatiseren de operationele flows die je dagen opslokken: CRM, lead-routing, klant-onboarding, follow-ups. Direct in je stack, in uitwisselbare modules — komt er over 6 maanden een betere tool, dan wisselen we de module, niet het systeem.",
    },
    leaves: [
      {
        slug: "crm-automation",
        name: { fr: "CRM Automation", nl: "CRM Automation", en: "CRM Automation" },
        claim: {
          fr: "Votre CRM piloté en langage naturel : extraction de listes, audits, relances en masse.",
          nl: "Je CRM aangestuurd in natuurlijke taal: lijsten extraheren, audits, bulk follow-ups.",
        },
        features: {
          fr: [
            "Pull stale leads en une phrase",
            "Audit pipeline + automations cassées",
            "Construction de workflows guidée pas-à-pas",
            "Compatible GHL, HubSpot, Salesforce, Whise",
          ],
          nl: [
            "Stale leads ophalen in één zin",
            "Audit pipeline + kapotte automations",
            "Workflow-bouw stap voor stap begeleid",
            "Compatibel met GHL, HubSpot, Salesforce, Whise",
          ],
        },
      },
      {
        slug: "lead-routing",
        name: { fr: "Lead Routing", nl: "Lead Routing", en: "Lead Routing" },
        claim: {
          fr: "Chaque lead va au bon commercial, à la bonne file, au bon moment — en moins de 30 secondes.",
          nl: "Elke lead gaat naar de juiste sales, juiste queue, juiste moment — in minder dan 30 seconden.",
        },
        features: {
          fr: [
            "Speed-to-lead < 30s",
            "Round-robin équilibré + skills-based",
            "Détection des leads frauduleux (Twilio Lookup)",
            "Suivi automatique si pas de réponse",
          ],
          nl: [
            "Speed-to-lead < 30s",
            "Round-robin gebalanceerd + skills-based",
            "Detectie van frauduleuze leads (Twilio Lookup)",
            "Auto follow-up bij uitblijven antwoord",
          ],
        },
      },
      {
        slug: "onboarding-systems",
        name: { fr: "Onboarding Systems", nl: "Onboarding Systems", en: "Onboarding Systems" },
        claim: {
          fr: "Vos nouveaux clients sont accompagnés sans qu'un humain ait à les tenir par la main.",
          nl: "Nieuwe klanten worden begeleid zonder dat een mens hun hand moet vasthouden.",
        },
        features: {
          fr: [
            "Séquence J+0, J+3, J+7, J+30 personnalisée",
            "Collecte de documents + signature automatisée",
            "Première valeur visible en moins de 7 jours",
            "Avis Google demandé au bon moment",
          ],
          nl: [
            "Sequentie D+0, D+3, D+7, D+30 gepersonaliseerd",
            "Document-collectie + handtekening geautomatiseerd",
            "Eerste waarde zichtbaar binnen 7 dagen",
            "Google-review op het juiste moment gevraagd",
          ],
        },
      },
    ],
  },

  /* ---------- 4. Create ---------- */
  {
    slug: "create",
    pillar: "create",
    layer: "interface",
    head: "Create",
    one_liner: {
      fr: "Des sites rapides, statiques, structurés et prêts pour la recherche classique comme pour l'AI Search. Astro, Cloudflare, schema complet, contenu modulaire, architecture multilingue FR/NL/EN.",
      nl: "De interfacelaag. Sites en apps AI-ready, ontworpen voor conversie en machine-leesbaarheid.",
    },
    intro: {
      fr: "Un site moderne ne doit plus seulement être beau. Il doit être rapide, indexable, structuré, compréhensible par les moteurs de recherche et facile à citer par les IA. C'est la différence entre un site vitrine et une infrastructure de visibilité. Banana Navy crée des sites IA-ready avec une architecture SEO/GEO dès le départ : pages services, pages locales, schema.org, llms.txt, markdown mirrors, sitemap, FAQ, meta descriptions, OG images et contenu structuré par intention de recherche.",
      nl: "We bouwen de zichtbare interface van je business — geen brochuresite, maar een platform dat converteert, dat zich laat lezen door AI's, en dat met je stack mee evolueert. Modulaire architectuur, geen complete rebuild bij elke technologische bocht. Static-first, schema overal, fast by default.",
    },
    leaves: [
      {
        slug: "ai-ready-websites",
        name: { fr: "Sites IA-ready", nl: "AI-Ready Websites", en: "AI-Ready Websites" },
        claim: {
          fr: "Sites qui parlent aux IA autant qu'aux humains. llms.txt, schema, markdown mirrors, FAQ structurée.",
          nl: "Sites die net zo goed met AI praten als met mensen. llms.txt, schema, markdown mirrors, gestructureerde FAQ.",
        },
        features: {
          fr: [
            "llms.txt + markdown mirrors par page",
            "JSON-LD complet (Org, Service, FAQ, Article)",
            "Multilingue avec hreflang propre",
            "Core Web Vitals tenus sur mobile",
          ],
          nl: [
            "llms.txt + markdown mirrors per pagina",
            "Volledige JSON-LD (Org, Service, FAQ, Article)",
            "Meertalig met propere hreflang",
            "Core Web Vitals gehaald op mobiel",
          ],
        },
      },
      {
        slug: "conversion-systems",
        name: { fr: "Systèmes de conversion", nl: "Conversion Systems", en: "Conversion Systems" },
        claim: {
          fr: "Tunnel de conversion mesuré, instrumenté, et amélioré sprint après sprint.",
          nl: "Gemeten, geïnstrumenteerde conversiefunnel, sprint na sprint verbeterd.",
        },
        features: {
          fr: [
            "A/B test sur les CTA et la copy",
            "Formulaires courts + Pages Functions",
            "Tracking sans cookie tiers (privacy first)",
            "Tableau de bord conversion hebdomadaire",
          ],
          nl: [
            "A/B test op CTA's en copy",
            "Korte formulieren + Pages Functions",
            "Tracking zonder third-party cookies (privacy first)",
            "Wekelijks conversiedashboard",
          ],
        },
      },
    ],
  },

  /* ---------- 5. SEO ---------- */
  {
    slug: "seo",
    pillar: "create",
    layer: "discovery",
    head: "SEO",
    one_liner: {
      fr: "Le SEO aide à apparaître dans Google. Le GEO aide votre marque à être comprise et citée par ChatGPT, Claude, Perplexity, Gemini et Google AI Overviews. Les deux disciplines se recoupent, mais ne sont pas identiques.",
      nl: "De discovery-laag. Om gevonden te worden door Google en geciteerd door ChatGPT, Claude, Perplexity.",
    },
    intro: {
      fr: "Banana Navy optimise les sites pour les deux environnements : structure sémantique, pages services, pages locales, schema.org, FAQ, llms.txt, markdown mirrors, citations, données concrètes et architecture de contenu. L'objectif est simple : rendre votre entreprise plus facile à trouver, comprendre et recommander.",
      nl: "Traditionele SEO volstaat niet meer. Je prospects stellen hun vragen aan ChatGPT, Claude, Perplexity. Word je niet geciteerd in hun antwoorden, dan besta je niet voor hen. We bouwen de dubbele laag: Google + AI.",
    },
    leaves: [
      {
        slug: "geo-optimization",
        name: { fr: "GEO Optimization", nl: "GEO Optimization", en: "GEO Optimization" },
        claim: {
          fr: "Generative Engine Optimization : faire en sorte que les IA citent votre marque par nom.",
          nl: "Generative Engine Optimization: ervoor zorgen dat AI's je merk bij naam citeren.",
        },
        features: {
          fr: [
            "llms.txt + markdown mirrors complets",
            "Schema FAQPage + Service riche",
            "Q/A formulés pour citation directe",
            "Veille mensuelle sur les citations IA",
          ],
          nl: [
            "Volledige llms.txt + markdown mirrors",
            "Rijk FAQPage- + Service-schema",
            "Q/A geformuleerd voor directe citatie",
            "Maandelijkse monitoring van AI-citaties",
          ],
        },
      },
      {
        slug: "ai-search-optimization",
        name: { fr: "AI Search Optimization", nl: "AI Search Optimization", en: "AI Search Optimization" },
        claim: {
          fr: "Optimisation pour les moteurs IA-augmentés : Google AI Overviews, Bing Copilot, SearchGPT.",
          nl: "Optimalisatie voor AI-augmented zoekmachines: Google AI Overviews, Bing Copilot, SearchGPT.",
        },
        features: {
          fr: [
            "Pages réponses ciblées sur des prompts réels",
            "Données structurées Article + HowTo",
            "Linking interne pensé pour le retrieval",
            "Audit GSC + mesure des impressions IA",
          ],
          nl: [
            "Antwoordpagina's gericht op echte prompts",
            "Gestructureerde data Article + HowTo",
            "Interne linking ontworpen voor retrieval",
            "GSC-audit + meting van AI-impressies",
          ],
        },
      },
      {
        slug: "technical-seo",
        name: { fr: "SEO Technique", nl: "Technische SEO", en: "Technical SEO" },
        claim: {
          fr: "La fondation technique du SEO moderne : Core Web Vitals, schema, architecture et performance AI-ready.",
          nl: "Het technische fundament van moderne SEO: Core Web Vitals, schema, architectuur en AI-ready performance.",
        },
        features: {
          fr: [
            "Core Web Vitals et performance mobile",
            "Sitemap, robots, canonicals propres",
            "JSON-LD et internal linking",
            "Architecture URL et déploiement Cloudflare",
          ],
          nl: [
            "Core Web Vitals en mobile performance",
            "Schone sitemap, robots, canonicals",
            "JSON-LD en interne linking",
            "URL-architectuur en Cloudflare-deployment",
          ],
        },
      },
      {
        slug: "local-seo",
        name: { fr: "Local SEO", nl: "Local SEO", en: "Local SEO" },
        claim: {
          fr: "Pages locales, Google Business Profile, schema LocalBusiness et visibilité régionale multilingue FR/NL.",
          nl: "Lokale pagina's, Google Business Profile, LocalBusiness-schema en meertalige FR/NL regionale zichtbaarheid.",
        },
        features: {
          fr: [
            "Pages villes optimisées par locale",
            "Google Business Profile + NAP consistency",
            "Schema LocalBusiness et FAQ locales",
            "GEO local multilingue FR/NL",
          ],
          nl: [
            "Geoptimaliseerde stadspagina's per locale",
            "Google Business Profile + NAP-consistency",
            "LocalBusiness-schema en lokale FAQ's",
            "Meertalige lokale GEO FR/NL",
          ],
        },
      },
      {
        slug: "schema-markup",
        name: { fr: "Schema & JSON-LD", nl: "Schema & JSON-LD", en: "Schema & JSON-LD" },
        claim: {
          fr: "Schema.org et JSON-LD propres pour SEO, GEO et AI Search. La couche que les IA lisent en premier.",
          nl: "Schone schema.org en JSON-LD voor SEO, GEO en AI Search. De laag die AI's als eerste lezen.",
        },
        features: {
          fr: [
            "Organization, Service, FAQPage, Article",
            "LocalBusiness et BreadcrumbList",
            "Architecture schema validée",
            "Génération automatisée via composants",
          ],
          nl: [
            "Organization, Service, FAQPage, Article",
            "LocalBusiness en BreadcrumbList",
            "Gevalideerde schema-architectuur",
            "Geautomatiseerde generatie via componenten",
          ],
        },
      },
    ],
  },
];

/** Flat list of every leaf — convenient for sitemaps, schema, llms.txt. */
export const ALL_LEAVES = SERVICE_CATEGORIES.flatMap((cat) =>
  cat.leaves.map((leaf) => ({ categorySlug: cat.slug, ...leaf })),
);

/* ============================================================
   METHOD, FAQ, CASES, PILLARS (existing)
   ============================================================ */

export const METHOD_STEPS = [
  {
    num: "01",
    name: { fr: "Audit", nl: "Audit" },
    body: { fr: "On regarde sous le capot. On chiffre le gain potentiel.", nl: "We kijken onder de motorkap. We becijferen de potentiële winst." },
  },
  {
    num: "02",
    name: { fr: "Build", nl: "Build" },
    body: { fr: "On construit en sprints de 2 semaines. Vous voyez tout.", nl: "We bouwen in sprints van 2 weken. Je ziet alles." },
  },
  {
    num: "03",
    name: { fr: "Deploy", nl: "Deploy" },
    body: { fr: "On met en prod, on monitore, on ajuste.", nl: "We zetten in productie, we monitoren, we sturen bij." },
  },
  {
    num: "04",
    name: { fr: "Evolve", nl: "Evolve" },
    body: {
      fr: "On garde votre stack à jour. Modules interchangeables. Pas de rebuild complet quand la tech change.",
      nl: "We houden je stack up-to-date. Uitwisselbare modules. Geen complete rebuild bij elke tech-shift.",
    },
    signature: true,
  },
] as const;

export const FAQ: Record<Locale, Array<{ q: string; a: string }>> = {
  fr: [
    {
      q: "Combien coûte un agent vocal IA ?",
      a: "Nos agents vocaux IA commencent à 3.000 € pour un système starter fonctionnel capable de répondre aux appels, qualifier les demandes, réserver des rendez-vous et déclencher des workflows simples. Le prix augmente selon les intégrations CRM, le multilingue, les outils connectés, le volume d'appels et les options agentiques avancées.",
    },
    {
      q: "Combien de temps faut-il pour déployer un agent vocal IA ?",
      a: "Nous commençons par un audit de 60 minutes pour cartographier vos appels, vos scénarios et vos outils. Un agent vocal starter peut généralement être livré en 1 semaine. Les systèmes plus complexes avec CRM, automatisations, scripts multiples, transfert humain ou multi-agents demandent plus de temps selon les intégrations.",
    },
    {
      q: "Travaillez-vous partout en Belgique ?",
      a: "Oui. Banana Navy sert les entreprises en Wallonie et en Flandre, avec une base à Charleroi et une capacité de travail remote. Nous travaillons en français, néerlandais et anglais, ce qui permet de créer des agents vocaux et automatisations adaptés au marché belge.",
    },
    {
      q: "Qu'est-ce qui différencie Banana Navy d'une agence digitale classique ?",
      a: "Banana Navy ne vend pas seulement des sites, des campagnes ou des automatisations isolées. Nous concevons des systèmes agentiques : agents vocaux, workflows, SEO/GEO, sites IA-ready et infrastructure connectée pour automatiser la communication, la qualification, la prise de rendez-vous et le suivi client 24/7.",
    },
    {
      q: "Un agent vocal IA peut-il remplacer mon équipe ?",
      a: "Non. Un agent vocal IA doit absorber les tâches répétitives : répondre aux appels simples, collecter les informations, qualifier, planifier, relancer et transférer. Votre équipe reste responsable des conversations sensibles, des décisions commerciales et des relations à forte valeur.",
    },
    {
      q: "L'IA peut-elle s'intégrer à notre CRM actuel ?",
      a: "Oui. Nous pouvons connecter les agents IA à des CRM, calendriers, formulaires, emails, bases de données, outils métiers et APIs. Les intégrations fréquentes incluent HubSpot, GoHighLevel, Pipedrive, Odoo, Make, n8n, Zapier, Google Workspace et des outils internes.",
    },
    {
      q: "Est-ce que vos agents vocaux parlent français belge et néerlandais ?",
      a: "Oui. Nous concevons des agents vocaux multilingues capables de gérer des conversations en français, néerlandais et anglais. Le niveau de fluidité dépend du fournisseur voix, du script, du contexte métier et des tests réalisés avant mise en production.",
    },
    {
      q: "Comment évitez-vous les hallucinations IA ?",
      a: "Nous limitons les hallucinations avec des scripts contrôlés, des bases de connaissance validées, du RAG quand nécessaire, des règles de refus, des fallbacks humains et des logs. Un agent ne doit pas improviser sur les prix, les conditions ou les engagements critiques.",
    },
    {
      q: "Utilisez-vous uniquement des outils propriétaires ?",
      a: "Non. Nous choisissons la stack selon le besoin : APIs managées, outils open-source, hébergement européen, Cloudflare, n8n, Vapi, Retell, ElevenLabs, Claude, OpenAI, Mistral ou autres modèles. L'architecture reste modulaire pour éviter la dépendance à un seul fournisseur.",
    },
    {
      q: "Le SEO est-il encore utile avec ChatGPT et Perplexity ?",
      a: "Oui. Le SEO reste essentiel, mais il doit être complété par le GEO : structuration des contenus pour les moteurs génératifs. Les pages doivent être lisibles, sourcées, structurées en Q/R, enrichies avec schema.org, llms.txt, markdown mirrors et données concrètes.",
    },
  ],
  nl: [
    {
      q: "Wat kost een AI voice agent?",
      a: "Onze AI voice agents starten vanaf € 3.000 voor een functioneel starter-systeem dat oproepen kan beantwoorden, leads kan kwalificeren, afspraken kan inplannen en basis-workflows kan afhandelen. De prijs schaalt vervolgens op afhankelijk van integraties, meertalige ondersteuning, CRM-koppelingen, geavanceerde automatisering en custom agent-systemen.",
    },
    {
      q: "Hoe lang duurt het om een AI voice agent te bouwen?",
      a: "We starten met een audit + strategie-sessie van 60 minuten om je workflows en communicatiebehoeften in kaart te brengen. Een functionele starter-agent wordt typisch binnen één week uitgerold. Geavanceerdere systemen — integraties, automatiseringen, multi-agent infrastructuur — vragen extra implementatietijd afhankelijk van complexiteit.",
    },
    {
      q: "Bedien je bedrijven over heel België?",
      a: "Ja. Banana Navy bedient bedrijven in zowel Wallonië als Vlaanderen. We werken in het Frans, Nederlands en Engels — wat ons toelaat meertalige AI-systemen en voice agents te ontwerpen die aangepast zijn aan elke markt en klantenbasis.",
    },
    {
      q: "Kunnen jullie AI voice agents meerdere talen spreken?",
      a: "Ja. We bouwen meertalige voice agents die werken in het Frans, Nederlands en Engels. Afhankelijk van de implementatie kunnen agents de taal automatisch detecteren of tijdens een gesprek wisselen voor een natuurlijkere klantbeleving.",
    },
    {
      q: "Kunnen jullie AI-agents integreren met onze bestaande tools en CRM?",
      a: "Ja. Onze systemen integreren met CRM's, kalenders, websites, formulieren, telefoonsystemen, API's en interne workflows. We koppelen AI-agents regelmatig aan platformen zoals GoHighLevel, HubSpot, Google Workspace en custom bedrijfstools.",
    },
    {
      q: "Gaan AI voice agents mijn team vervangen?",
      a: "Nee. Onze systemen zijn ontworpen om je team te ondersteunen en te versterken door repetitieve taken op het vlak van communicatie, kwalificatie, planning en follow-up over te nemen. Zo maakt je team tijd vrij voor gesprekken met hogere waarde, klantrelaties en operations.",
    },
    {
      q: "Wat onderscheidt Banana Navy van een klassiek digitaal bureau?",
      a: "Banana Navy is gebouwd rond agent-systemen in plaats van geïsoleerde diensten. We combineren AI voice agents, automatiseringsworkflows, SEO/GEO-infrastructuur en intelligente digitale ervaringen tot verbonden systemen die bedrijven helpen om communicatie te automatiseren, leads te kwalificeren, afspraken te boeken en 24/7 te schalen.",
    },
    {
      q: "Hoe vermijd je hallucinaties bij een AI-agent in productie?",
      a: "Drie hefbomen: 1) RAG met geafbakende bronnen (nooit het ruwe model op je data) 2) Declaratieve guardrails (weigeren, escaleren, loggen) 3) Geautomatiseerde CI-evaluaties bij elke deploy. Elke guardrail is gedocumenteerd.",
    },
    {
      q: "Werkt Banana Navy met open-source modellen?",
      a: "Ja, standaard wanneer technisch haalbaar — Llama, Mistral, Qwen op EU-infra. Propriëtaire modellen (Claude, GPT) gebruiken we wanneer benchmarks het rechtvaardigen en soevereiniteit geen issue is.",
    },
    {
      q: "Hoe vermijd je dat een AI-systeem na 12 maanden obsoleet is?",
      a: "Modulaire architectuur vanaf de conceptie. Modellen, vector stores, agents, guardrails — elke laag is een uitwisselbare module. Komt er een beter model uit of een nieuwe tool? Dan wisselen we de betrokken module. Geen volledige rebuild, geen herinvestering vanaf nul.",
    },
  ],
};

export const CASE_PREVIEWS = [
  {
    slug: "belfius",
    client: "Belfius",
    industry: { fr: "Banque", nl: "Bank" },
    before: { fr: "Approbation manuelle", nl: "Manuele goedkeuring" },
    after: { fr: "Approbation automatisée", nl: "Geautomatiseerde goedkeuring" },
  },
  {
    slug: "jachetevotreauto",
    client: "jachetevotreauto.be",
    industry: { fr: "Auto", nl: "Auto" },
    before: { fr: "Encodage leads manuel", nl: "Manuele lead-invoer" },
    after: { fr: "Capture + estimation IA", nl: "AI-capture + waardeschatting" },
  },
  {
    slug: "immo-vision",
    client: "Immo-Vision",
    industry: { fr: "Immobilier", nl: "Vastgoed" },
    before: { fr: "Sans plateforme intégrée", nl: "Geen geïntegreerd platform" },
    after: { fr: "Site + CRM Whise connectés", nl: "Site + Whise CRM gekoppeld" },
  },
] as const;

/* ============================================================
   LOCATIONS — city-level landing pages for SEO + GEO
   Playbook System 1, Step 6 ("the multiplier"): one page per
   city you serve. Same slug across locales, locale-specific
   display name + copy.
   ============================================================ */

export type LocationCity = {
  /** URL slug — English/universal, identical across locales. */
  slug: string;
  /** Display name per locale (handles Bruxelles/Brussel, Anvers/Antwerpen, etc.) */
  name: { fr: string; nl: string };
  /** Linguistic region of the city itself, used to set the page tone. */
  region: "wallonia" | "flanders" | "brussels";
  /** ISO 3166-2 region code used in geo.region meta. */
  iso: string; // e.g. BE-WHT, BE-VAN, BE-BRU
  /** Sample postal code (city centre). */
  postalCode: string;
  /** Approximate city-centre coordinates. */
  lat: number;
  lon: number;
  /** Why this city — used in the intro paragraph (per locale). */
  angle: { fr: string; nl: string };
  /** 2-line trade snapshot — typical industries / business profile. */
  trades: { fr: string; nl: string };
};

export const LOCATIONS: readonly LocationCity[] = [
  {
    slug: "charleroi",
    name: { fr: "Charleroi", nl: "Charleroi" },
    region: "wallonia",
    iso: "BE-WHT",
    postalCode: "6000",
    lat: 50.4108,
    lon: 4.4446,
    angle: {
      fr: "Notre port d'attache. Banana Navy est née à Charleroi. On connaît le tissu PME local, on travaille côte à côte avec les fondateurs qui veulent passer l'industrie au cran supérieur sans dépendre d'une grande agence bruxelloise.",
      nl: "Onze thuisbasis. Banana Navy is geboren in Charleroi. We kennen het lokale KMO-weefsel en werken zij aan zij met oprichters die de industrie willen moderniseren zonder afhankelijk te worden van een groot Brussels bureau.",
    },
    trades: {
      fr: "PME industrielles, services B2B, immobilier, automotive, biotech (BioPark, Aéropole).",
      nl: "Industriële KMO's, B2B-diensten, vastgoed, automotive, biotech (BioPark, Aéropole).",
    },
  },
  {
    slug: "brussels",
    name: { fr: "Bruxelles", nl: "Brussel" },
    region: "brussels",
    iso: "BE-BRU",
    postalCode: "1000",
    lat: 50.8503,
    lon: 4.3517,
    angle: {
      fr: "Capitale bilingue, institutions européennes, sièges sociaux. Bruxelles est le marché où un agent vocal IA doit basculer entre FR, NL et EN dans la même conversation. C'est notre quotidien.",
      nl: "Tweetalige hoofdstad, Europese instellingen, hoofdkantoren. Brussel is de markt waar een AI voice agent moet wisselen tussen FR, NL en EN in hetzelfde gesprek. Dat is onze dagelijkse realiteit.",
    },
    trades: {
      fr: "Cabinets juridiques et fiscaux, conseil EU, institutions, fintech, hôtellerie haut de gamme, immobilier.",
      nl: "Juridische en fiscale kantoren, EU-consultancy, instellingen, fintech, premium hospitality, vastgoed.",
    },
  },
  {
    slug: "liege",
    name: { fr: "Liège", nl: "Luik" },
    region: "wallonia",
    iso: "BE-WLG",
    postalCode: "4000",
    lat: 50.6326,
    lon: 5.5797,
    angle: {
      fr: "Bassin industriel reconverti, hub logistique (Liège Airport), université technique. Les PME liégeoises ont du volume d'appels et un mix FR/NL/DE qu'on automatise sans casser la relation client.",
      nl: "Geherindustrialiseerd bekken, logistieke hub (Luik Airport), technische universiteit. KMO's in Luik hebben oproepvolume en een FR/NL/DE-mix die we automatiseren zonder de klantrelatie te breken.",
    },
    trades: {
      fr: "Logistique, e-commerce, fintech, ingénierie, soins de santé, formation continue.",
      nl: "Logistiek, e-commerce, fintech, engineering, gezondheidszorg, professionele opleiding.",
    },
  },
  {
    slug: "namur",
    name: { fr: "Namur", nl: "Namen" },
    region: "wallonia",
    iso: "BE-WNA",
    postalCode: "5000",
    lat: 50.4669,
    lon: 4.8675,
    angle: {
      fr: "Capitale de la Wallonie, administration régionale, écosystème B2B compact. À Namur on travaille beaucoup avec les cabinets indépendants et les ETI qui veulent une IA propre sans tomber dans le piège du SaaS bloated.",
      nl: "Hoofdstad van Wallonië, regionale administratie, compact B2B-ecosysteem. In Namen werken we veel met onafhankelijke kantoren en middelgrote bedrijven die schone AI willen zonder te vervallen in opgeblazen SaaS.",
    },
    trades: {
      fr: "Cabinets comptables et juridiques, conseil, administration publique, tourisme, ETI manufacturières.",
      nl: "Boekhoud- en advocatenkantoren, consultancy, openbaar bestuur, toerisme, middelgrote maakbedrijven.",
    },
  },
  {
    slug: "mons",
    name: { fr: "Mons", nl: "Bergen" },
    region: "wallonia",
    iso: "BE-WHT",
    postalCode: "7000",
    lat: 50.4541,
    lon: 3.9523,
    angle: {
      fr: "Microsoft Innovation Center, université, écosystème numérique en croissance. Mons est un excellent terrain pour piloter — l'environnement tech est mature et les PME locales sont prêtes à expérimenter sérieusement.",
      nl: "Microsoft Innovation Center, universiteit, groeiend digitaal ecosysteem. Bergen is uitstekend voor pilots — de tech-omgeving is volwassen en de lokale KMO's zijn klaar om serieus te experimenteren.",
    },
    trades: {
      fr: "Tech & numérique, culture (Mons 2015), services publics, manufacturier, agro-alimentaire.",
      nl: "Tech & digitaal, cultuur (Mons 2015), openbare diensten, productie, agrovoeding.",
    },
  },
  {
    slug: "antwerpen",
    name: { fr: "Anvers", nl: "Antwerpen" },
    region: "flanders",
    iso: "BE-VAN",
    postalCode: "2000",
    lat: 51.2194,
    lon: 4.4025,
    angle: {
      fr: "Deuxième ville du pays, port géant, capitale du diamant, scène B2B dense. Les entreprises anversoises ont des volumes qui justifient des systèmes agentiques sérieux — pas juste un chatbot sur une homepage.",
      nl: "Tweede stad van het land, gigantische haven, diamanthoofdstad, dichte B2B-scene. Antwerpse bedrijven hebben volumes die serieuze agent-systemen rechtvaardigen — niet zomaar een chatbot op een homepage.",
    },
    trades: {
      fr: "Logistique portuaire, négoce, diamant, finance, mode, e-commerce, conseil.",
      nl: "Havenlogistiek, handel, diamant, finance, mode, e-commerce, consultancy.",
    },
  },
  {
    slug: "gent",
    name: { fr: "Gand", nl: "Gent" },
    region: "flanders",
    iso: "BE-VOV",
    postalCode: "9000",
    lat: 51.0543,
    lon: 3.7174,
    angle: {
      fr: "Hub IA et biotech (UGent, imec), scale-up scene en pleine forme, esprit pragmatique. Gand est l'endroit où une bonne architecture modulaire se vend toute seule — les fondateurs comprennent le coût d'un système fermé.",
      nl: "AI- en biotech-hub (UGent, imec), bloeiende scale-up scene, pragmatische geest. Gent is dé plek waar een goede modulaire architectuur zichzelf verkoopt — oprichters begrijpen de kost van een gesloten systeem.",
    },
    trades: {
      fr: "Tech & SaaS, biotech, scale-ups, design, e-commerce, agro-alimentaire premium.",
      nl: "Tech & SaaS, biotech, scale-ups, design, e-commerce, premium agrovoeding.",
    },
  },
  {
    slug: "mechelen",
    name: { fr: "Malines", nl: "Mechelen" },
    region: "flanders",
    iso: "BE-VAN",
    postalCode: "2800",
    lat: 51.0259,
    lon: 4.4776,
    angle: {
      fr: "Carrefour logistique entre Anvers et Bruxelles, e-commerce dense, PME familiales solides. Malines est typique du marché flamand qui veut de l'efficacité opérationnelle sans bricolage.",
      nl: "Logistiek kruispunt tussen Antwerpen en Brussel, dichte e-commerce, sterke familiale KMO's. Mechelen is typisch voor de Vlaamse markt die operationele efficiëntie wil zonder geknutsel.",
    },
    trades: {
      fr: "Logistique, e-commerce, distribution, PME familiales, services aux entreprises.",
      nl: "Logistiek, e-commerce, distributie, familiale KMO's, zakelijke dienstverlening.",
    },
  },
  {
    slug: "knokke",
    name: { fr: "Knokke", nl: "Knokke" },
    region: "flanders",
    iso: "BE-VWV",
    postalCode: "8300",
    lat: 51.3460,
    lon: 3.2912,
    angle: {
      fr: "Côte belge haut de gamme — immobilier de luxe, hospitality, galeries, clientèle internationale. À Knokke un agent vocal IA doit gérer FR, NL, EN et un ton premium dès la première seconde.",
      nl: "Hoogwaardige Belgische kust — luxevastgoed, hospitality, galerijen, internationale clientèle. In Knokke moet een AI voice agent vanaf de eerste seconde FR, NL, EN en een premium toon hanteren.",
    },
    trades: {
      fr: "Immobilier de prestige, hôtels haut de gamme, galeries d'art, restauration étoilée, services patrimoniaux.",
      nl: "Prestigevastgoed, premium hotels, kunstgalerijen, sterrenrestaurants, family-office services.",
    },
  },
  {
    slug: "oostende",
    name: { fr: "Ostende", nl: "Oostende" },
    region: "flanders",
    iso: "BE-VWV",
    postalCode: "8400",
    lat: 51.2287,
    lon: 2.9114,
    angle: {
      fr: "Port, tourisme, énergie offshore, économie portuaire. Ostende combine flux saisonnier et opérations 24/7 — terrain idéal pour des agents vocaux qui absorbent les pics sans casser le budget.",
      nl: "Haven, toerisme, offshore-energie, havenseconomie. Oostende combineert seizoenspieken en 24/7-operaties — ideaal terrein voor voice agents die pieken opvangen zonder het budget te breken.",
    },
    trades: {
      fr: "Tourisme, hôtellerie, port et logistique, énergie offshore, pêche, services maritimes.",
      nl: "Toerisme, hospitality, haven en logistiek, offshore-energie, visserij, maritieme diensten.",
    },
  },
];

/* ============================================================
   LOCATION PAGES — rich per-city content (Lot 3).
   Keyed by LOCATIONS slug. Flemish cities use the user's EN
   delivery as both fr/nl placeholder until Lot 4. Walloon
   cities mirror FR → NL.
   ============================================================ */

export type LocationSection =
  | { kind: "list"; label: { fr: string; nl: string }; items: { fr: string[]; nl: string[] } }
  | { kind: "para"; label: { fr: string; nl: string }; body: { fr: string; nl: string } };

export type LocationPageContent = {
  meta?: {
    title: { fr: string; nl: string };
    description: { fr: string; nl: string };
  };
  h1?: { fr: string; nl: string };
  intro: { fr: string[]; nl: string[] };
  sections?: LocationSection[];
  stack?: { fr: string; nl: string };
  faq: { fr: LeafFaq[]; nl: LeafFaq[] };
};

export const LOCATION_PAGES_CONTENT: Record<string, LocationPageContent> = {
  charleroi: {
    meta: {
      title: {
        fr: "Agence IA Charleroi — Agents vocaux & automatisations | Banana Navy",
        nl: "AI-bureau Charleroi — Voice agents & automatiseringen | Banana Navy",
      },
      description: {
        fr: "Banana Navy conçoit des agents vocaux IA, automatisations CRM, systèmes agentiques et SEO/GEO pour entreprises à Charleroi.",
        nl: "Banana Navy ontwerpt AI-voice agents, CRM-automatiseringen, agentische systemen en SEO/GEO voor bedrijven in Charleroi.",
      },
    },
    h1: { fr: "Agence IA Charleroi", nl: "AI-bureau Charleroi" },
    intro: {
      fr: [
        "Banana Navy accompagne les PME et entreprises de Charleroi qui souhaitent automatiser leurs opérations, améliorer leur gestion des leads et installer des systèmes IA réellement utiles.",
        "Nous construisons des agents vocaux IA, workflows CRM, systèmes agentiques et infrastructures SEO/GEO pour entreprises wallonnes qui veulent gagner du temps sans complexifier leurs opérations.",
      ],
      nl: [
        "Banana Navy begeleidt KMO's en bedrijven in Charleroi die hun operaties willen automatiseren, hun leadbeheer willen verbeteren en echt nuttige AI-systemen willen installeren.",
        "We bouwen AI-voice agents, CRM-workflows, agentische systemen en SEO/GEO-infrastructuur voor Waalse bedrijven die tijd willen winnen zonder hun operaties complexer te maken.",
      ],
    },
    sections: [
      {
        kind: "list",
        label: { fr: "Services", nl: "Diensten" },
        items: {
          fr: [
            "Agents vocaux IA",
            "Automatisations CRM",
            "AI Receptionist",
            "Qualification leads IA",
            "SEO & GEO",
            "Sites IA-ready",
            "Workflows multi-agents",
          ],
          nl: [
            "AI voice agents",
            "CRM-automatiseringen",
            "AI Receptionist",
            "AI-leadkwalificatie",
            "SEO & GEO",
            "AI-ready websites",
            "Multi-agent workflows",
          ],
        },
      },
      {
        kind: "para",
        label: { fr: "Pourquoi Charleroi", nl: "Waarom Charleroi" },
        body: {
          fr: "Charleroi possède un tissu PME industriel, immobilier, logistique et services particulièrement adapté à l'automatisation IA. Beaucoup d'entreprises disposent déjà de CRM, formulaires et processus pouvant être améliorés rapidement sans refonte complète.",
          nl: "Charleroi heeft een KMO-weefsel in industrie, vastgoed, logistiek en diensten dat bijzonder geschikt is voor AI-automatisering. Veel bedrijven beschikken al over CRM, formulieren en processen die snel verbeterd kunnen worden zonder volledige overhaul.",
        },
      },
    ],
    faq: {
      fr: [
        {
          q: "Travaillez-vous uniquement à Charleroi ?",
          a: "Non. Nous couvrons toute la Wallonie, Bruxelles et la Flandre.",
        },
        {
          q: "Peut-on commencer petit ?",
          a: "Oui. Beaucoup de projets commencent par un seul workflow ou un agent vocal starter.",
        },
        {
          q: "Faites-vous les audits sur place ?",
          a: "Oui selon le projet, sinon en remote.",
        },
      ],
      nl: [
        {
          q: "Werken jullie enkel in Charleroi?",
          a: "Nee. We werken in heel Wallonië, Brussel en Vlaanderen.",
        },
        {
          q: "Kunnen we klein starten?",
          a: "Ja. Veel projecten starten met één workflow of een starter voice agent.",
        },
        {
          q: "Doen jullie audits op locatie?",
          a: "Ja afhankelijk van het project, anders remote.",
        },
      ],
    },
  },

  brussels: {
    meta: {
      title: {
        fr: "Agence IA Bruxelles — Voice Agents & GEO | Banana Navy",
        nl: "AI-bureau Brussel — Voice Agents & GEO | Banana Navy",
      },
      description: {
        fr: "Studio IA à Bruxelles : agents vocaux, automatisations, SEO/GEO et systèmes agentiques pour entreprises et PME.",
        nl: "AI-studio in Brussel: voice agents, automatiseringen, SEO/GEO en agentische systemen voor bedrijven en KMO's.",
      },
    },
    h1: { fr: "Agence IA Bruxelles", nl: "AI-bureau Brussel" },
    intro: {
      fr: [
        "Bruxelles concentre une forte densité de services, cabinets, immobilier, finance et entreprises internationales. Banana Navy aide ces structures à automatiser leurs opérations avec des agents IA capables de gérer appels, qualification, support et workflows.",
        "Nos systèmes sont conçus pour fonctionner dans des environnements multilingues FR/NL/EN avec intégrations CRM et automatisations métier.",
      ],
      nl: [
        "Brussel concentreert een hoge dichtheid aan dienstenkantoren, vastgoed, finance en internationale bedrijven. Banana Navy helpt deze structuren hun operaties te automatiseren met AI-agents voor oproepen, kwalificatie, support en workflows.",
        "Onze systemen zijn ontworpen om te werken in meertalige FR/NL/EN-omgevingen met CRM-integraties en bedrijfsautomatiseringen.",
      ],
    },
    sections: [
      {
        kind: "list",
        label: { fr: "Services", nl: "Diensten" },
        items: {
          fr: [
            "AI Receptionist",
            "AI Sales Agents",
            "Automatisations CRM",
            "SEO/GEO",
            "Sites IA-ready",
            "Multi-agent workflows",
          ],
          nl: [
            "AI Receptionist",
            "AI Sales Agents",
            "CRM-automatiseringen",
            "SEO/GEO",
            "AI-ready websites",
            "Multi-agent workflows",
          ],
        },
      },
      {
        kind: "list",
        label: { fr: "Use cases Bruxelles", nl: "Use cases Brussel" },
        items: {
          fr: [
            "Cabinets de conseil",
            "Immobilier",
            "Hospitality",
            "Santé",
            "SaaS",
            "Finance",
          ],
          nl: [
            "Consultancykantoren",
            "Vastgoed",
            "Hospitality",
            "Gezondheidszorg",
            "SaaS",
            "Finance",
          ],
        },
      },
    ],
    faq: {
      fr: [
        {
          q: "Les agents peuvent-ils parler plusieurs langues ?",
          a: "Oui. Français, néerlandais et anglais.",
        },
        {
          q: "Travaillez-vous avec des entreprises internationales ?",
          a: "Oui.",
        },
        {
          q: "Pouvez-vous intégrer HubSpot ou Salesforce ?",
          a: "Oui via APIs et workflows.",
        },
      ],
      nl: [
        {
          q: "Kunnen de agents meerdere talen spreken?",
          a: "Ja. Frans, Nederlands en Engels.",
        },
        {
          q: "Werken jullie met internationale bedrijven?",
          a: "Ja.",
        },
        {
          q: "Kunnen jullie HubSpot of Salesforce integreren?",
          a: "Ja via APIs en workflows.",
        },
      ],
    },
  },

  liege: {
    meta: {
      title: {
        fr: "Agence IA Liège — Automatisations & agents IA | Banana Navy",
        nl: "AI-bureau Luik — Automatiseringen & AI-agents | Banana Navy",
      },
      description: {
        fr: "Agents vocaux IA, automatisations CRM et systèmes IA pour PME et entreprises à Liège.",
        nl: "AI-voice agents, CRM-automatiseringen en AI-systemen voor KMO's en bedrijven in Luik.",
      },
    },
    h1: { fr: "Agence IA Liège", nl: "AI-bureau Luik" },
    intro: {
      fr: [
        "Banana Navy accompagne les entreprises liégeoises qui souhaitent déployer des agents IA, automatiser leurs workflows et améliorer leur réactivité commerciale.",
        "Nous travaillons particulièrement sur :",
      ],
      nl: [
        "Banana Navy begeleidt Luikse bedrijven die AI-agents willen uitrollen, hun workflows willen automatiseren en hun commerciële reactiviteit willen verbeteren.",
        "We werken vooral aan:",
      ],
    },
    sections: [
      {
        kind: "list",
        label: { fr: "Domaines", nl: "Domeinen" },
        items: {
          fr: [
            "appels entrants",
            "qualification leads",
            "automatisation CRM",
            "workflows support",
            "SEO/GEO",
          ],
          nl: [
            "inkomende oproepen",
            "leadkwalificatie",
            "CRM-automatisering",
            "support workflows",
            "SEO/GEO",
          ],
        },
      },
      {
        kind: "list",
        label: { fr: "Ce qu'on peut automatiser", nl: "Wat we kunnen automatiseren" },
        items: {
          fr: [
            "Qualification appels",
            "Prise rendez-vous",
            "Relances automatiques",
            "CRM updates",
            "Support niveau 1",
            "Reporting IA",
          ],
          nl: [
            "Oproepkwalificatie",
            "Afsprakenbeheer",
            "Automatische follow-ups",
            "CRM-updates",
            "Niveau-1 support",
            "AI-rapportering",
          ],
        },
      },
    ],
    stack: {
      fr: "HubSpot, Pipedrive, Odoo, Vapi, Claude, OpenAI, n8n, Make.",
      nl: "HubSpot, Pipedrive, Odoo, Vapi, Claude, OpenAI, n8n, Make.",
    },
    faq: {
      fr: [
        { q: "Peut-on connecter nos outils actuels ?", a: "Oui." },
        { q: "Combien coûte un starter agent ?", a: "À partir de 3.000 €." },
        { q: "Peut-on commencer avec un seul workflow ?", a: "Oui." },
      ],
      nl: [
        { q: "Kunnen we onze huidige tools koppelen?", a: "Ja." },
        { q: "Hoeveel kost een starter agent?", a: "Vanaf 3.000 €." },
        { q: "Kunnen we starten met één workflow?", a: "Ja." },
      ],
    },
  },

  namur: {
    meta: {
      title: {
        fr: "Agence IA Namur — Voice Agents & CRM Automation | Banana Navy",
        nl: "AI-bureau Namen — Voice Agents & CRM Automation | Banana Navy",
      },
      description: {
        fr: "Banana Navy construit des agents IA et automatisations pour entreprises à Namur : CRM, appels, SEO/GEO et workflows.",
        nl: "Banana Navy bouwt AI-agents en automatiseringen voor bedrijven in Namen: CRM, oproepen, SEO/GEO en workflows.",
      },
    },
    h1: { fr: "Agence IA Namur", nl: "AI-bureau Namen" },
    intro: {
      fr: [
        "Nous aidons les PME namuroises à installer des systèmes IA concrets : agents vocaux, automatisations CRM, workflows multi-agents et infrastructures SEO/GEO.",
        "Notre approche privilégie des systèmes simples à comprendre, documentés et capables d'évoluer dans le temps.",
      ],
      nl: [
        "We helpen Naamse KMO's concrete AI-systemen installeren: voice agents, CRM-automatiseringen, multi-agent workflows en SEO/GEO-infrastructuur.",
        "Onze aanpak verkiest systemen die eenvoudig te begrijpen, gedocumenteerd en in staat zijn te evolueren in de tijd.",
      ],
    },
    sections: [
      {
        kind: "list",
        label: { fr: "Cas d'usage fréquents", nl: "Veelvoorkomende use cases" },
        items: {
          fr: [
            "Standard téléphonique IA",
            "Qualification leads",
            "CRM automation",
            "Onboarding automatisé",
            "Relances automatiques",
            "Support IA",
          ],
          nl: [
            "AI-telefoonstandaard",
            "Leadkwalificatie",
            "CRM-automatisering",
            "Geautomatiseerde onboarding",
            "Automatische follow-ups",
            "AI-support",
          ],
        },
      },
    ],
    faq: {
      fr: [
        { q: "Travaillez-vous avec les PME ?", a: "Oui, principalement." },
        { q: "Peut-on intégrer l'IA sans équipe technique ?", a: "Oui." },
        { q: "Faites-vous aussi le site web ?", a: "Oui avec architecture IA-ready." },
      ],
      nl: [
        { q: "Werken jullie met KMO's?", a: "Ja, voornamelijk." },
        { q: "Kunnen we AI integreren zonder technisch team?", a: "Ja." },
        { q: "Maken jullie ook de website?", a: "Ja, met AI-ready architectuur." },
      ],
    },
  },

  mons: {
    meta: {
      title: {
        fr: "Agence IA Mons — Agents vocaux IA & automatisations | Banana Navy",
        nl: "AI-bureau Bergen — AI voice agents & automatiseringen | Banana Navy",
      },
      description: {
        fr: "Studio IA pour entreprises à Mons : voice agents, workflows IA, SEO/GEO et systèmes automatisés.",
        nl: "AI-studio voor bedrijven in Bergen: voice agents, AI-workflows, SEO/GEO en geautomatiseerde systemen.",
      },
    },
    h1: { fr: "Agence IA Mons", nl: "AI-bureau Bergen" },
    intro: {
      fr: [
        "Banana Navy accompagne les entreprises de Mons qui veulent automatiser communication, support et workflows commerciaux grâce à des systèmes IA modulaires.",
      ],
      nl: [
        "Banana Navy begeleidt bedrijven in Bergen die communicatie, support en commerciële workflows willen automatiseren met modulaire AI-systemen.",
      ],
    },
    sections: [
      {
        kind: "list",
        label: { fr: "Services", nl: "Diensten" },
        items: {
          fr: [
            "AI Receptionist",
            "AI Sales Agent",
            "CRM automation",
            "GEO optimization",
            "Sites IA-ready",
          ],
          nl: [
            "AI Receptionist",
            "AI Sales Agent",
            "CRM-automatisering",
            "GEO optimization",
            "AI-ready websites",
          ],
        },
      },
    ],
    faq: {
      fr: [
        { q: "Les agents fonctionnent-ils 24/7 ?", a: "Oui." },
        { q: "Peut-on connecter un calendrier ?", a: "Oui." },
        { q: "Peut-on suivre les performances ?", a: "Oui via logs et dashboards." },
      ],
      nl: [
        { q: "Werken de agents 24/7?", a: "Ja." },
        { q: "Kan een kalender gekoppeld worden?", a: "Ja." },
        { q: "Kunnen we de prestaties opvolgen?", a: "Ja via logs en dashboards." },
      ],
    },
  },

  antwerpen: {
    meta: {
      title: {
        fr: "AI Agency Antwerp — Voice Agents & AI Automation | Banana Navy",
        nl: "AI Agency Antwerpen — Voice Agents & AI Automation | Banana Navy",
      },
      description: {
        fr: "AI voice agents, CRM automation and agentic systems for companies in Antwerp and Flanders.",
        nl: "AI voice agents, CRM-automatisering en agentische systemen voor bedrijven in Antwerpen en Vlaanderen.",
      },
    },
    h1: { fr: "AI Agency Antwerp", nl: "AI Agency Antwerpen" },
    intro: {
      fr: [
        "Banana Navy builds AI voice agents, CRM automations and agentic systems for companies across Antwerp and Flanders.",
        "We help businesses automate calls, qualify leads, route requests and improve operational workflows through modular AI systems.",
      ],
      nl: [
        "Banana Navy bouwt AI voice agents, CRM-automatiseringen en agentische systemen voor bedrijven in Antwerpen en Vlaanderen.",
        "We helpen bedrijven oproepen automatiseren, leads kwalificeren, aanvragen routeren en operationele workflows verbeteren via modulaire AI-systemen.",
      ],
    },
    sections: [
      {
        kind: "list",
        label: { fr: "Services", nl: "Diensten" },
        items: {
          fr: [
            "Voice Agents",
            "AI Receptionists",
            "CRM Automation",
            "Agentic Systems",
            "GEO Optimization",
            "AI-ready Websites",
          ],
          nl: [
            "Voice Agents",
            "AI Receptionists",
            "CRM-automatisering",
            "Agentische systemen",
            "GEO Optimization",
            "AI-ready websites",
          ],
        },
      },
    ],
    faq: {
      fr: [
        {
          q: "Do you support Dutch-speaking companies?",
          a: "Yes. We work in Dutch, French and English.",
        },
        { q: "Can your agents integrate with our CRM?", a: "Yes." },
        { q: "Do you work remotely?", a: "Yes across Belgium and nearby markets." },
      ],
      nl: [
        {
          q: "Ondersteunen jullie Nederlandstalige bedrijven?",
          a: "Ja. We werken in het Nederlands, Frans en Engels.",
        },
        { q: "Kunnen jullie agents met ons CRM integreren?", a: "Ja." },
        {
          q: "Werken jullie remote?",
          a: "Ja, in heel België en nabijgelegen markten.",
        },
      ],
    },
  },

  gent: {
    meta: {
      title: {
        fr: "AI Agency Gent — AI Voice Agents & Automation | Banana Navy",
        nl: "AI Agency Gent — AI voice agents & automatisering | Banana Navy",
      },
      description: {
        fr: "AI systems, voice agents and CRM automation for companies in Ghent and Flanders.",
        nl: "AI-systemen, voice agents en CRM-automatisering voor bedrijven in Gent en Vlaanderen.",
      },
    },
    h1: { fr: "AI Agency Gent", nl: "AI Agency Gent" },
    intro: {
      fr: [
        "Banana Navy helps companies in Ghent automate communication, customer support and operational workflows using AI voice agents and automation systems.",
      ],
      nl: [
        "Banana Navy helpt bedrijven in Gent communicatie, klantenservice en operationele workflows automatiseren met AI voice agents en automatiseringssystemen.",
      ],
    },
    sections: [
      {
        kind: "list",
        label: { fr: "Core services", nl: "Kernservices" },
        items: {
          fr: [
            "AI voice agents",
            "AI automation",
            "Agentic workflows",
            "SEO/GEO",
            "AI-ready websites",
          ],
          nl: [
            "AI voice agents",
            "AI-automatisering",
            "Agentische workflows",
            "SEO/GEO",
            "AI-ready websites",
          ],
        },
      },
    ],
    faq: {
      fr: [
        { q: "Can AI voice agents work in Dutch?", a: "Yes." },
        { q: "Do you offer AI audits?", a: "Yes, 60-minute audits." },
        { q: "Can we start with a small pilot?", a: "Yes." },
      ],
      nl: [
        { q: "Werken AI voice agents in het Nederlands?", a: "Ja." },
        { q: "Bieden jullie AI-audits aan?", a: "Ja, audits van 60 minuten." },
        { q: "Kunnen we starten met een kleine pilot?", a: "Ja." },
      ],
    },
  },

  knokke: {
    meta: {
      title: {
        fr: "AI Agency Knokke — Luxury & Hospitality AI Systems | Banana Navy",
        nl: "AI Agency Knokke — AI voor luxe & hospitality | Banana Navy",
      },
      description: {
        fr: "AI systems, voice agents and automation for hospitality, luxury and service businesses in Knokke.",
        nl: "AI-systemen, voice agents en automatisering voor hospitality, luxe en servicebedrijven in Knokke.",
      },
    },
    h1: { fr: "AI Agency Knokke", nl: "AI Agency Knokke" },
    intro: {
      fr: [
        "Banana Navy designs AI systems for hospitality, luxury and service-oriented businesses in Knokke.",
        "We help teams automate reservations, support, lead qualification and customer communication through multilingual AI agents.",
      ],
      nl: [
        "Banana Navy ontwerpt AI-systemen voor hospitality, luxe en service-georiënteerde bedrijven in Knokke.",
        "We helpen teams reserveringen, support, leadkwalificatie en klantcommunicatie automatiseren via meertalige AI-agents.",
      ],
    },
    sections: [
      {
        kind: "list",
        label: { fr: "Industries", nl: "Industrieën" },
        items: {
          fr: [
            "Hospitality",
            "Restaurants",
            "Real estate",
            "Luxury services",
            "Marine & yacht services",
          ],
          nl: [
            "Hospitality",
            "Restaurants",
            "Vastgoed",
            "Luxe-diensten",
            "Marine & yacht services",
          ],
        },
      },
    ],
    faq: {
      fr: [
        { q: "Can AI agents handle reservations?", a: "Yes." },
        { q: "Can they work in multiple languages?", a: "Yes." },
        { q: "Do you support hospitality workflows?", a: "Yes." },
      ],
      nl: [
        { q: "Kunnen AI-agents reserveringen afhandelen?", a: "Ja." },
        { q: "Kunnen ze in meerdere talen werken?", a: "Ja." },
        { q: "Ondersteunen jullie hospitality-workflows?", a: "Ja." },
      ],
    },
  },

  oostende: {
    meta: {
      title: {
        fr: "AI Agency Oostende — Voice Agents & AI Automation | Banana Navy",
        nl: "AI Agency Oostende — Voice agents & AI-automatisering | Banana Navy",
      },
      description: {
        fr: "AI voice agents, automation systems and SEO/GEO infrastructure for companies in Oostende.",
        nl: "AI voice agents, automatiseringssystemen en SEO/GEO-infrastructuur voor bedrijven in Oostende.",
      },
    },
    h1: { fr: "AI Agency Oostende", nl: "AI Agency Oostende" },
    intro: {
      fr: [
        "Banana Navy helps businesses in Oostende automate customer communication, support and workflows with AI systems designed for real operational use.",
      ],
      nl: [
        "Banana Navy helpt bedrijven in Oostende klantcommunicatie, support en workflows automatiseren met AI-systemen ontworpen voor echte operationele inzet.",
      ],
    },
    sections: [
      {
        kind: "list",
        label: { fr: "Services", nl: "Diensten" },
        items: {
          fr: [
            "Voice Agents",
            "AI Support",
            "CRM Automation",
            "GEO Optimization",
            "AI-ready Websites",
          ],
          nl: [
            "Voice Agents",
            "AI Support",
            "CRM-automatisering",
            "GEO Optimization",
            "AI-ready websites",
          ],
        },
      },
    ],
    faq: {
      fr: [
        { q: "Can we connect existing phone systems?", a: "Yes." },
        { q: "Do you support multilingual calls?", a: "Yes." },
        { q: "Can you automate customer follow-up?", a: "Yes." },
      ],
      nl: [
        { q: "Kunnen we bestaande telefoonsystemen koppelen?", a: "Ja." },
        { q: "Ondersteunen jullie meertalige oproepen?", a: "Ja." },
        { q: "Kunnen jullie klant follow-up automatiseren?", a: "Ja." },
      ],
    },
  },
};

/* ============================================================
   HUB PAGES — rich per-category sections (Pour qui, livré,
   stack, process, prix/timing, exemples, FAQ).
   FR is the source of truth (Lot 1). NL placeholder duplicates
   FR until Lot 4 (NL translations) lands.
   ============================================================ */

export type HubFaq = { q: string; a: string };

export type HubPageContent = {
  h1: { fr: string; nl: string };
  subheadline: { fr: string; nl: string };
  forQui: { fr: string[]; nl: string[] };
  livre: { fr: string[]; nl: string[] };
  /** Optional named lists keyed by section label. */
  examples?: { fr: string[]; nl: string[] };
  process?: { fr: string[]; nl: string[] };
  stack?: { fr: string; nl: string };
  prix?: { fr: string; nl: string };
  timing?: { fr: string; nl: string };
  cta: { fr: string; nl: string };
  faq: { fr: HubFaq[]; nl: HubFaq[] };
};

export const HUB_PAGES_CONTENT: Record<string, HubPageContent> = {
  "agentic-systems": {
    h1: {
      fr: "Systèmes agentiques pour entreprises",
      nl: "Agentische systemen voor bedrijven",
    },
    subheadline: {
      fr: "Des agents IA coordonnés qui exécutent des tâches métier, pas seulement des conversations.",
      nl: "Gecoördineerde AI-agents die bedrijfsprocessen uitvoeren, niet alleen gesprekken.",
    },
    forQui: {
      fr: [
        "PME de 10 à 200 salariés avec plusieurs outils déjà en place.",
        "Équipes commerciales ou support qui perdent du temps en qualification, suivi ou reporting.",
        "Entreprises qui veulent préparer un futur avec agents IA internes, workflows multi-agents et infrastructure IA modulaire.",
      ],
      nl: [
        "KMO's met 10 tot 200 medewerkers en meerdere bestaande tools.",
        "Sales- of supportteams die tijd verliezen aan kwalificatie, follow-up of rapportage.",
        "Bedrijven die zich willen voorbereiden op interne AI-agents, multi-agent workflows en modulaire AI-infrastructuur.",
      ],
    },
    livre: {
      fr: [
        "Architecture agentique : rôles, outils, limites, fallback humain.",
        "Agents spécialisés : qualification, support, documentation, analyse, reporting.",
        "Orchestration multi-agents avec règles d'escalade.",
        "Connexion CRM, calendrier, base documentaire, emails ou APIs.",
        "Logs, tests, documentation et recommandations d'évolution.",
      ],
      nl: [
        "Agent-architectuur: rollen, tools, grenzen, menselijke fallback.",
        "Gespecialiseerde agents: kwalificatie, support, documentatie, analyse, rapportage.",
        "Multi-agent orkestratie met escalatieregels.",
        "Koppeling met CRM, kalender, kennisbank, e-mails of API's.",
        "Logs, tests, documentatie en evolutie-aanbevelingen.",
      ],
    },
    process: {
      fr: [
        "Audit des processus et données disponibles.",
        "Design des rôles agents et des outils connectés.",
        "Build d'un premier workflow agentique testable.",
        "Déploiement contrôlé avec logs, règles d'escalade et documentation.",
        "Évolution par modules.",
      ],
      nl: [
        "Audit van processen en beschikbare data.",
        "Ontwerp van agent-rollen en gekoppelde tools.",
        "Build van een eerste testbare agentische workflow.",
        "Gecontroleerde deploy met logs, escalatieregels en documentatie.",
        "Modulaire evolutie.",
      ],
    },
    stack: {
      fr: "Claude, OpenAI, Mistral, n8n, Make, HubSpot, GoHighLevel, Odoo, Google Workspace, Cloudflare Workers, pgvector, Qdrant, Langfuse, LiteLLM, APIs métiers.",
      nl: "Claude, OpenAI, Mistral, n8n, Make, HubSpot, GoHighLevel, Odoo, Google Workspace, Cloudflare Workers, pgvector, Qdrant, Langfuse, LiteLLM, business-API's.",
    },
    cta: {
      fr: "Planifier un audit agentique",
      nl: "Plan een agentische audit",
    },
    faq: {
      fr: [
        {
          q: "Quelle différence entre un chatbot et un système agentique ?",
          a: "Un chatbot répond principalement à des messages. Un système agentique coordonne plusieurs agents, utilise des outils, suit des règles métier et peut déclencher des actions dans vos systèmes.",
        },
        {
          q: "Combien coûte un système agentique ?",
          a: "Le coût dépend du nombre d'agents, d'intégrations, de données, de workflows et de contraintes de sécurité. Nous commençons par un audit de 60 minutes pour définir un premier périmètre réaliste.",
        },
        {
          q: "Un système agentique peut-il fonctionner avec nos outils actuels ?",
          a: "Oui. La plupart des systèmes sont conçus autour des outils déjà présents : CRM, emails, calendrier, fichiers, API métier, bases documentaires ou plateformes internes.",
        },
      ],
      nl: [
        {
          q: "Wat is het verschil tussen een chatbot en een agentisch systeem?",
          a: "Een chatbot beantwoordt vooral berichten. Een agentisch systeem coördineert meerdere agents, gebruikt tools, volgt bedrijfsregels en kan acties triggeren in je systemen.",
        },
        {
          q: "Wat kost een agentisch systeem?",
          a: "De kost hangt af van het aantal agents, integraties, data, workflows en veiligheidsvereisten. We starten met een audit van 60 minuten om een realistisch eerste scope te bepalen.",
        },
        {
          q: "Kan een agentisch systeem werken met onze huidige tools?",
          a: "Ja. De meeste systemen worden opgebouwd rond bestaande tools: CRM, e-mails, kalender, bestanden, business-API's, kennisbanken of interne platformen.",
        },
      ],
    },
  },

  "voice-agents": {
    h1: {
      fr: "Agents vocaux IA",
      nl: "AI voice agents",
    },
    subheadline: {
      fr: "Des agents qui répondent aux appels, qualifient les demandes et déclenchent les bons workflows 24/7.",
      nl: "Agents die oproepen beantwoorden, kwalificeren en de juiste workflows 24/7 triggeren.",
    },
    forQui: {
      fr: [
        "Entreprises qui ratent des appels ou répondent trop lentement.",
        "Équipes commerciales qui veulent qualifier avant de rappeler.",
        "Services client qui veulent absorber le niveau 1 sans bloquer les humains.",
        "PME belges avec clients FR/NL/EN.",
      ],
      nl: [
        "Bedrijven die oproepen missen of te traag antwoorden.",
        "Salesteams die willen kwalificeren voor ze terugbellen.",
        "Klantendiensten die niveau 1 willen opvangen zonder mensen vast te zetten.",
        "Belgische KMO's met FR/NL/EN-klanten.",
      ],
    },
    livre: {
      fr: [
        "Script conversationnel et scénarios d'appels.",
        "Agent vocal IA connecté à votre numéro ou système téléphonique.",
        "Qualification des demandes entrantes.",
        "Création ou mise à jour CRM.",
        "Prise de rendez-vous via calendrier.",
        "Relance automatique ou notification équipe.",
        "Transfert humain selon règles.",
        "Logs et analyse des conversations.",
      ],
      nl: [
        "Gespreksscript en oproepscenario's.",
        "AI voice agent gekoppeld aan je nummer of telefoonsysteem.",
        "Kwalificatie van inkomende vragen.",
        "Aanmaak of update in CRM.",
        "Afspraak via kalender.",
        "Automatische follow-up of teamnotificatie.",
        "Menselijke transfer volgens regels.",
        "Logs en gespreksanalyse.",
      ],
    },
    prix: {
      fr: "Les agents vocaux IA commencent à 3.000 € pour un starter pack fonctionnel. Les options comme multilingue avancé, CRM, base de connaissance, transfert humain, analytics, scoring ou workflows multi-agents sont chiffrées après audit.",
      nl: "AI voice agents starten vanaf 3.000 € voor een functioneel starter pack. Opties zoals geavanceerd meertalig, CRM, kennisbank, menselijke transfer, analytics, scoring of multi-agent workflows worden begroot na de audit.",
    },
    timing: {
      fr: "Audit 60 minutes. Premier agent starter possible en 1 semaine. Timing plus long si intégrations multiples, conformité spécifique, scripts complexes ou plusieurs langues.",
      nl: "60 minuten audit. Eerste starter-agent mogelijk in 1 week. Langer als er meerdere integraties, specifieke compliance, complexe scripts of meerdere talen zijn.",
    },
    stack: {
      fr: "Vapi, Retell, ElevenLabs, Twilio, n8n, Make, HubSpot, GoHighLevel, Pipedrive, Google Calendar, APIs métier, Claude, OpenAI, Mistral.",
      nl: "Vapi, Retell, ElevenLabs, Twilio, n8n, Make, HubSpot, GoHighLevel, Pipedrive, Google Calendar, business-API's, Claude, OpenAI, Mistral.",
    },
    cta: {
      fr: "Créer mon premier agent vocal IA",
      nl: "Maak mijn eerste AI voice agent",
    },
    faq: {
      fr: [
        {
          q: "Est-ce qu'un agent vocal IA peut répondre en français belge ?",
          a: "Oui. Nous adaptons les scripts, formulations, voix et règles de conversation au contexte belge. Les agents peuvent aussi fonctionner en néerlandais et anglais selon le besoin.",
        },
        {
          q: "Que fait l'agent quand il ne sait pas répondre ?",
          a: "Il doit le dire clairement, collecter les informations nécessaires et transférer à un humain ou créer une tâche de suivi. Nous évitons les agents qui improvisent sur des sujets non validés.",
        },
        {
          q: "Est-ce légal d'utiliser un agent vocal IA ?",
          a: "Oui, si le système respecte les règles applicables : information de l'utilisateur, traitement des données, consentement si nécessaire, RGPD et politiques de prospection. Nous cadrons ces points pendant l'audit.",
        },
      ],
      nl: [
        {
          q: "Kan een AI voice agent in Belgisch Frans antwoorden?",
          a: "Ja. We passen scripts, formuleringen, stemmen en conversatieregels aan de Belgische context aan. Agents kunnen ook werken in het Nederlands en Engels naargelang de noden.",
        },
        {
          q: "Wat doet de agent als hij niet weet wat antwoorden?",
          a: "Hij moet dit duidelijk zeggen, de nodige info verzamelen en doorzetten naar een mens of een opvolgtaak aanmaken. We vermijden agents die improviseren op niet-gevalideerde onderwerpen.",
        },
        {
          q: "Is een AI voice agent legaal?",
          a: "Ja, als het systeem de toepasselijke regels respecteert: gebruikersinformatie, dataverwerking, toestemming indien nodig, GDPR en prospectiebeleid. We kaderen dat tijdens de audit.",
        },
      ],
    },
  },

  automations: {
    h1: {
      fr: "Automatisations IA pour vos opérations",
      nl: "AI-automatisering voor je operations",
    },
    subheadline: {
      fr: "Des workflows qui connectent vos outils, réduisent les tâches répétitives et évitent les leads oubliés.",
      nl: "Workflows die je tools koppelen, repetitieve taken verminderen en vergeten leads voorkomen.",
    },
    forQui: {
      fr: [
        "PME qui perdent du temps en tâches répétitives.",
        "Équipes commerciales avec leads non suivis.",
        "Services client avec tickets mal routés.",
        "Entreprises qui veulent automatiser sans recruter une équipe technique.",
      ],
      nl: [
        "KMO's die tijd verliezen aan repetitieve taken.",
        "Salesteams met niet-opgevolgde leads.",
        "Klantendiensten met slecht gerouteerde tickets.",
        "Bedrijven die willen automatiseren zonder technisch team aan te werven.",
      ],
    },
    livre: {
      fr: [
        "Audit des processus existants.",
        "Workflows automatisés connectés à vos outils.",
        "Qualification et scoring de leads.",
        "Routage par langue, secteur, taille, urgence ou source.",
        "Relances automatiques email/SMS.",
        "Notifications internes.",
        "Documentation, logs et monitoring.",
      ],
      nl: [
        "Audit van bestaande processen.",
        "Geautomatiseerde workflows gekoppeld aan je tools.",
        "Kwalificatie en scoring van leads.",
        "Routing per taal, sector, omvang, urgentie of bron.",
        "Automatische follow-ups via e-mail/sms.",
        "Interne notificaties.",
        "Documentatie, logs en monitoring.",
      ],
    },
    examples: {
      fr: [
        "Lead formulaire → enrichissement → scoring → assignation commercial → relance J+3.",
        "Appel entrant → transcription → résumé → tâche CRM → notification Slack/Teams.",
        "Nouveau client → onboarding email → documents → accès → rappel équipe.",
        "Ticket support → classification IA → routage → réponse brouillon → escalade humaine.",
      ],
      nl: [
        "Formulier-lead → verrijking → scoring → toewijzing sales → follow-up D+3.",
        "Inkomende oproep → transcriptie → samenvatting → CRM-taak → Slack/Teams-notificatie.",
        "Nieuwe klant → onboarding-e-mail → documenten → toegang → teamherinnering.",
        "Support-ticket → AI-classificatie → routing → conceptantwoord → menselijke escalatie.",
      ],
    },
    stack: {
      fr: "n8n, Make, Zapier, HubSpot, GoHighLevel, Pipedrive, Odoo, Notion, Google Sheets, Airtable, Gmail, Slack, Teams, Calendly, APIs custom, Claude, OpenAI, Mistral.",
      nl: "n8n, Make, Zapier, HubSpot, GoHighLevel, Pipedrive, Odoo, Notion, Google Sheets, Airtable, Gmail, Slack, Teams, Calendly, custom API's, Claude, OpenAI, Mistral.",
    },
    cta: {
      fr: "Auditer mes workflows",
      nl: "Audit van mijn workflows",
    },
    faq: {
      fr: [
        {
          q: "Comment automatiser mon CRM sans coder ?",
          a: "Nous connectons vos formulaires, emails, calendrier, appels et outils CRM via des workflows no-code, low-code ou API. Votre équipe n'a pas besoin de coder, mais le système reste documenté et maintenable.",
        },
        {
          q: "Quelle différence entre Zapier, Make et n8n ?",
          a: "Zapier est simple pour des workflows courts, Make est visuel et puissant pour beaucoup de PME, n8n est plus flexible et intéressant pour des scénarios techniques ou self-hosted. Nous choisissons selon vos contraintes.",
        },
        {
          q: "Quel ROI attendre d'une automatisation IA ?",
          a: "Le ROI dépend du volume et du coût humain actuel. Les gains les plus rapides viennent souvent des leads mieux suivis, du temps administratif réduit et des erreurs opérationnelles évitées.",
        },
      ],
      nl: [
        {
          q: "Hoe automatiseer ik mijn CRM zonder te coderen?",
          a: "We koppelen je formulieren, e-mails, kalender, oproepen en CRM via no-code, low-code of API-workflows. Je team hoeft niet te coderen, maar het systeem blijft gedocumenteerd en onderhoudbaar.",
        },
        {
          q: "Wat is het verschil tussen Zapier, Make en n8n?",
          a: "Zapier is simpel voor korte workflows, Make is visueel en krachtig voor veel KMO's, n8n is flexibeler en interessant voor technische of self-hosted scenario's. We kiezen op basis van je context.",
        },
        {
          q: "Welke ROI mag ik verwachten van AI-automatisering?",
          a: "De ROI hangt af van volume en huidige menselijke kost. De snelste winst komt vaak van beter opgevolgde leads, minder administratieve tijd en vermeden operationele fouten.",
        },
      ],
    },
  },

  create: {
    h1: {
      fr: "Sites IA-ready",
      nl: "AI-ready websites",
    },
    subheadline: {
      fr: "Des sites rapides, structurés et lisibles par Google, ChatGPT, Claude et Perplexity.",
      nl: "Snelle sites, gestructureerd en leesbaar voor Google, ChatGPT, Claude en Perplexity.",
    },
    forQui: {
      fr: [
        "Entreprises qui veulent refaire leur site sans perdre le SEO.",
        "PME qui veulent être visibles sur Google et les réponses IA.",
        "Agences ou marques qui ont besoin d'un site rapide, statique et maintenable.",
        "Projets multilingues FR/NL/EN.",
      ],
      nl: [
        "Bedrijven die hun site willen herbouwen zonder SEO te verliezen.",
        "KMO's die zichtbaar willen zijn op Google en in AI-antwoorden.",
        "Bureaus of merken die een snelle, statische en onderhoudbare site nodig hebben.",
        "Meertalige projecten FR/NL/EN.",
      ],
    },
    livre: {
      fr: [
        "Architecture Astro ou stack adaptée.",
        "Pages services et pages locales.",
        "SEO technique : title, meta, canonical, hreflang, sitemap.",
        "GEO : llms.txt, markdown mirrors, FAQ extractibles, schema complet.",
        "Design responsive, rapide et propre.",
        "Déploiement Cloudflare Pages ou équivalent.",
        "Documentation pour faire évoluer le contenu.",
      ],
      nl: [
        "Astro-architectuur of aangepaste stack.",
        "Dienstenpagina's en lokale pagina's.",
        "Technische SEO: title, meta, canonical, hreflang, sitemap.",
        "GEO: llms.txt, markdown mirrors, extraheerbare FAQ, volledige schema.",
        "Responsive design, snel en proper.",
        "Deploy op Cloudflare Pages of equivalent.",
        "Documentatie om de content te laten evolueren.",
      ],
    },
    stack: {
      fr: "Astro, Cloudflare Pages, CSS propre, composants réutilisables, JSON-LD, sitemap automatisé, markdown content, optimisations Core Web Vitals, intégrations CRM/formulaires.",
      nl: "Astro, Cloudflare Pages, propere CSS, herbruikbare componenten, JSON-LD, geautomatiseerde sitemap, markdown content, Core Web Vitals optimalisaties, CRM/formulier-integraties.",
    },
    cta: {
      fr: "Créer un site IA-ready",
      nl: "Bouw een AI-ready site",
    },
    faq: {
      fr: [
        {
          q: "C'est quoi un site IA-ready ?",
          a: "Un site IA-ready est un site conçu pour être compris par Google et les moteurs IA. Il combine contenu structuré, schema.org, FAQ, llms.txt, markdown mirrors, sitemap propre et pages claires par service ou localisation.",
        },
        {
          q: "Faut-il refaire son site pour être cité par ChatGPT ?",
          a: "Pas toujours. Parfois une couche GEO suffit : structure, FAQ, schema, llms.txt et pages mieux organisées. Si le site est lent, mono-page, mal indexé ou difficile à maintenir, une refonte peut être plus rentable.",
        },
        {
          q: "Pourquoi Astro ?",
          a: "Astro génère des pages statiques très rapides, parfaites pour SEO/GEO. Il permet de garder du HTML propre tout en utilisant des composants, layouts, contenus markdown et une architecture scalable.",
        },
      ],
      nl: [
        {
          q: "Wat is een AI-ready site?",
          a: "Een AI-ready site is ontworpen om begrepen te worden door Google en AI-engines. Hij combineert gestructureerde content, schema.org, FAQ, llms.txt, markdown mirrors, een propere sitemap en duidelijke pagina's per dienst of locatie.",
        },
        {
          q: "Moet ik mijn site herbouwen om geciteerd te worden door ChatGPT?",
          a: "Niet altijd. Soms volstaat een GEO-laag: structuur, FAQ, schema, llms.txt en betere paginastructuur. Als de site traag, mono-page, slecht geïndexeerd of moeilijk te onderhouden is, kan een rebuild rendabeler zijn.",
        },
        {
          q: "Waarom Astro?",
          a: "Astro genereert zeer snelle statische pagina's, perfect voor SEO/GEO. Het laat toe om propere HTML te behouden terwijl je componenten, layouts, markdown content en een schaalbare architectuur gebruikt.",
        },
      ],
    },
  },

  seo: {
    h1: {
      fr: "SEO & GEO pour l'AI Search",
      nl: "SEO & GEO voor AI Search",
    },
    subheadline: {
      fr: "Optimiser votre site pour Google ne suffit plus. Il doit aussi être lisible, fiable et citable par les moteurs IA.",
      nl: "Je site optimaliseren voor Google volstaat niet meer. Hij moet ook leesbaar, betrouwbaar en citeerbaar zijn voor AI-engines.",
    },
    forQui: {
      fr: [
        "Entreprises qui veulent ranker sur Google et apparaître dans les réponses IA.",
        "PME belges avec offres complexes ou techniques.",
        "Sites qui ont du contenu mais peu de structure sémantique.",
        "Marques qui veulent préparer leur visibilité 2026–2028.",
      ],
      nl: [
        "Bedrijven die willen ranken op Google en willen verschijnen in AI-antwoorden.",
        "Belgische KMO's met complexe of technische diensten.",
        "Sites met content maar weinig semantische structuur.",
        "Merken die hun zichtbaarheid 2026–2028 willen voorbereiden.",
      ],
    },
    livre: {
      fr: [
        "Audit SEO/GEO de 60 minutes.",
        "Analyse des pages, contenus, schema, robots, sitemap et indexation.",
        "Plan de clusters keywords.",
        "Pages FAQ et blocs Q/R optimisés pour extraction IA.",
        "llms.txt et markdown mirrors.",
        "JSON-LD Organization, Service, FAQPage, Article, LocalBusiness.",
        "Recommandations Core Web Vitals et maillage interne.",
      ],
      nl: [
        "SEO/GEO-audit van 60 minuten.",
        "Analyse van pagina's, content, schema, robots, sitemap en indexering.",
        "Keyword-cluster-plan.",
        "FAQ-pagina's en Q/R-blokken geoptimaliseerd voor AI-extractie.",
        "llms.txt en markdown mirrors.",
        "JSON-LD Organization, Service, FAQPage, Article, LocalBusiness.",
        "Aanbevelingen Core Web Vitals en interne linking.",
      ],
    },
    process: {
      fr: [
        "Audit de visibilité : Google, ChatGPT, Claude, Perplexity, indexation, citations existantes.",
        "Structuration : pages services, pages locales, FAQ, réponses directes, entités nommées.",
        "Signaux machine : schema.org, llms.txt, markdown mirrors, sitemap, robots IA.",
        "Autorité : contenu Lab, comparatifs, cas clients, preuves chiffrées, mentions externes.",
      ],
      nl: [
        "Zichtbaarheidsaudit: Google, ChatGPT, Claude, Perplexity, indexering, bestaande citaties.",
        "Structurering: dienstenpagina's, lokale pagina's, FAQ, directe antwoorden, named entities.",
        "Machine-signalen: schema.org, llms.txt, markdown mirrors, sitemap, AI-robots.",
        "Autoriteit: Lab-content, vergelijkingen, klantcases, cijferbewijzen, externe vermeldingen.",
      ],
    },
    cta: {
      fr: "Réserver un audit GEO",
      nl: "Reserveer een GEO-audit",
    },
    faq: {
      fr: [
        {
          q: "Comment apparaître dans les réponses ChatGPT ?",
          a: "Il faut rendre votre site clair, structuré, fiable et citable. Les pages doivent contenir des réponses directes, des données concrètes, du schema.org, des FAQ, un llms.txt, des markdown mirrors et des signaux d'autorité externe.",
        },
        {
          q: "Quelle différence entre SEO et GEO ?",
          a: "Le SEO optimise votre visibilité dans les moteurs de recherche classiques. Le GEO optimise la manière dont les moteurs génératifs comprennent, résument et citent votre marque dans leurs réponses.",
        },
        {
          q: "ChatGPT lit-il mon site en temps réel ?",
          a: "Cela dépend du mode utilisé, de l'accès web, du crawler et de l'index disponible. C'est pour cela qu'un site doit être facilement crawlable, bien structuré et cohérent sur plusieurs sources.",
        },
      ],
      nl: [
        {
          q: "Hoe verschijn ik in ChatGPT-antwoorden?",
          a: "Je site moet duidelijk, gestructureerd, betrouwbaar en citeerbaar zijn. Pagina's moeten directe antwoorden bevatten, concrete data, schema.org, FAQ, een llms.txt, markdown mirrors en externe autoriteitssignalen.",
        },
        {
          q: "Wat is het verschil tussen SEO en GEO?",
          a: "SEO optimaliseert je zichtbaarheid in klassieke zoekmachines. GEO optimaliseert hoe generatieve engines je merk begrijpen, samenvatten en citeren in hun antwoorden.",
        },
        {
          q: "Leest ChatGPT mijn site in realtime?",
          a: "Dat hangt af van de gebruikte modus, web-toegang, crawler en beschikbare index. Daarom moet een site makkelijk crawlbaar, goed gestructureerd en coherent zijn over meerdere bronnen.",
        },
      ],
    },
  },
};

/* ============================================================
   LEAF PAGES — rich per-leaf content (subheadline, intro,
   forQui, livre, scenario, ROI, stack, FAQ). Keyed by
   `${categorySlug}/${leafSlug}`. FR is source of truth; NL
   placeholder duplicates FR until Lot 4.
   ============================================================ */

export type LeafFaq = { q: string; a: string };
export type ScenarioLine = { who: "agent" | "user"; text: string };

export type LeafPageContent = {
  /** Optional meta override; falls back to default leaf-name-based meta. */
  meta?: {
    title: { fr: string; nl: string };
    description: { fr: string; nl: string };
  };
  subheadline: { fr: string; nl: string };
  /** Paragraphs of body intro. */
  intro: { fr: string[]; nl: string[] };
  forQui: { fr: string[]; nl: string[] };
  /** Optional custom label override for the forQui section (e.g. "Use cases" instead of "Pour qui"). */
  forQuiLabel?: { fr: string; nl: string };
  /** Optional. When omitted, the "Ce qu'on livre" section is skipped entirely. */
  livre?: { fr: string[]; nl: string[] };
  /** Optional label override for the livre section. */
  livreLabel?: { fr: string; nl: string };
  /** Inline scenario / sample call (alternating agent/user lines). */
  scenario?: {
    title: { fr: string; nl: string };
    lines: { fr: ScenarioLine[]; nl: ScenarioLine[] };
  };
  /** Linear workflow / process chain (step → step → step). */
  workflow?: {
    title: { fr: string; nl: string };
    steps: { fr: string[]; nl: string[] };
  };
  /** Extra labelled bullet list (e.g. "Industries", "Outils intégrés"). */
  industries?: {
    label: { fr: string; nl: string };
    items: { fr: string[]; nl: string[] };
  };
  /** Inline case study block (intro paragraph + bullets + outcome paragraph). */
  caseStudy?: {
    label: { fr: string; nl: string };
    intro: { fr: string; nl: string };
    bullets: { fr: string[]; nl: string[] };
    outcome: { fr: string; nl: string };
  };
  /** Extra arbitrary labelled sections (list or paragraph) rendered after caseStudy. */
  sections?: LocationSection[];
  roi?: { fr: string; nl: string };
  stack?: { fr: string; nl: string };
  faq: { fr: LeafFaq[]; nl: LeafFaq[] };
};

export const LEAF_PAGES_CONTENT: Record<string, LeafPageContent> = {
  "seo/geo-optimization": {
    meta: {
      title: {
        fr: "GEO Optimization Belgique — AI Search SEO | Banana Navy",
        nl: "GEO Optimization België — AI Search SEO | Banana Navy",
      },
      description: {
        fr: "Optimisation GEO pour être cité par ChatGPT, Claude, Gemini et Perplexity. Structure AI-ready, llms.txt, schema et contenus extractibles.",
        nl: "GEO-optimalisatie om geciteerd te worden door ChatGPT, Claude, Gemini en Perplexity. AI-ready structuur, llms.txt, schema en extraheerbare content.",
      },
    },
    subheadline: {
      fr: "Optimiser votre visibilité pour les moteurs génératifs et l'AI Search.",
      nl: "Je zichtbaarheid optimaliseren voor generatieve motoren en AI Search.",
    },
    intro: {
      fr: [
        "Le GEO — Generative Engine Optimization — consiste à structurer un site pour qu'il soit compris, résumé et cité par les moteurs IA.",
        "Les moteurs génératifs ne lisent pas le web exactement comme Google traditionnel. Ils privilégient des réponses directes, une structure claire, des données cohérentes, des pages spécialisées et des signaux d'autorité.",
        "Banana Navy construit des architectures GEO-ready adaptées à ChatGPT, Claude, Perplexity et Google AI Overviews.",
      ],
      nl: [
        "GEO — Generative Engine Optimization — bestaat erin een site te structureren zodat hij begrepen, samengevat en geciteerd wordt door AI-motoren.",
        "Generatieve motoren lezen het web niet exact zoals het traditionele Google. Ze geven voorrang aan directe antwoorden, duidelijke structuur, coherente data, gespecialiseerde pagina's en autoriteitssignalen.",
        "Banana Navy bouwt GEO-ready architecturen aangepast aan ChatGPT, Claude, Perplexity en Google AI Overviews.",
      ],
    },
    forQuiLabel: {
      fr: "Ce qu'on optimise",
      nl: "Wat we optimaliseren",
    },
    forQui: {
      fr: [
        "FAQ extractibles",
        "llms.txt",
        "markdown mirrors",
        "JSON-LD",
        "pages services",
        "pages locales",
        "clusters sémantiques",
        "architecture interne",
        "réponses courtes et structurées",
      ],
      nl: [
        "Extraheerbare FAQ's",
        "llms.txt",
        "markdown mirrors",
        "JSON-LD",
        "service-pagina's",
        "lokale pagina's",
        "semantische clusters",
        "interne architectuur",
        "korte gestructureerde antwoorden",
      ],
    },
    livre: {
      fr: [
        "Audit GEO",
        "Structure FAQ",
        "Schema complet",
        "Architecture AI-ready",
        "Optimisation contenus",
        "Internal linking",
        "Signaux d'entité",
      ],
      nl: [
        "GEO-audit",
        "FAQ-structuur",
        "Volledig schema",
        "AI-ready architectuur",
        "Contentoptimalisatie",
        "Interne linking",
        "Entiteitssignalen",
      ],
    },
    caseStudy: {
      label: {
        fr: "Pourquoi c'est important",
        nl: "Waarom dit belangrijk is",
      },
      intro: {
        fr: "Les recherches changent :",
        nl: "Zoekopdrachten veranderen:",
      },
      bullets: {
        fr: [
          '"Google it"',
          "→ devient progressivement",
          '"Ask AI"',
        ],
        nl: [
          '"Google it"',
          "→ wordt geleidelijk",
          '"Ask AI"',
        ],
      },
      outcome: {
        fr: "Les entreprises visibles dans AI Search auront un avantage énorme sur les prochaines années.",
        nl: "Bedrijven die zichtbaar zijn in AI Search zullen de komende jaren een enorm voordeel hebben.",
      },
    },
    faq: {
      fr: [
        { q: "Le GEO remplace-t-il le SEO ?", a: "Non. Il complète le SEO classique." },
        { q: "Pourquoi les FAQ sont importantes ?", a: "Parce qu'elles sont facilement extractibles par les moteurs IA." },
        { q: "Pourquoi les moteurs IA préfèrent-ils certains sites ?", a: "Ils privilégient les sites structurés, cohérents et spécialisés." },
      ],
      nl: [
        { q: "Vervangt GEO de SEO?", a: "Nee. Het vult de klassieke SEO aan." },
        { q: "Waarom zijn FAQ's belangrijk?", a: "Omdat ze makkelijk extraheerbaar zijn door AI-motoren." },
        { q: "Waarom verkiezen AI-motoren bepaalde sites?", a: "Ze geven voorrang aan gestructureerde, coherente en gespecialiseerde sites." },
      ],
    },
  },

  "seo/ai-search-optimization": {
    meta: {
      title: {
        fr: "AI Search Optimization | Banana Navy",
        nl: "AI Search Optimization | Banana Navy",
      },
      description: {
        fr: "Optimisation pour ChatGPT, Claude, Gemini, Perplexity et AI Overviews. SEO nouvelle génération orienté AI Search.",
        nl: "Optimalisatie voor ChatGPT, Claude, Gemini, Perplexity en AI Overviews. Nieuwe-generatie SEO gericht op AI Search.",
      },
    },
    subheadline: {
      fr: "SEO nouvelle génération orienté moteurs génératifs.",
      nl: "Nieuwe-generatie SEO gericht op generatieve motoren.",
    },
    intro: {
      fr: [
        "Les moteurs IA deviennent progressivement une nouvelle interface du web. Les entreprises doivent maintenant optimiser leur présence non seulement pour Google, mais aussi pour les systèmes génératifs.",
      ],
      nl: [
        "AI-motoren worden geleidelijk een nieuwe interface van het web. Bedrijven moeten nu hun aanwezigheid niet alleen voor Google optimaliseren, maar ook voor generatieve systemen.",
      ],
    },
    forQuiLabel: {
      fr: "Objectifs",
      nl: "Doelen",
    },
    forQui: {
      fr: ["Être compris", "Être cité", "Être recommandé", "Être extractible"],
      nl: ["Begrepen worden", "Geciteerd worden", "Aanbevolen worden", "Extraheerbaar zijn"],
    },
    livre: {
      fr: [
        "Audit AI Search",
        "Structure GEO",
        "Architecture FAQ",
        "Schema strategy",
        "Entity reinforcement",
        "AI-ready copywriting",
      ],
      nl: [
        "AI Search-audit",
        "GEO-structuur",
        "FAQ-architectuur",
        "Schema strategy",
        "Entity reinforcement",
        "AI-ready copywriting",
      ],
    },
    sections: [
      {
        kind: "list",
        label: { fr: "Signaux : Structure sémantique", nl: "Signalen: semantische structuur" },
        items: {
          fr: ["headings propres", "pages spécialisées", "architecture clusters"],
          nl: ["nette headings", "gespecialiseerde pagina's", "cluster-architectuur"],
        },
      },
      {
        kind: "list",
        label: { fr: "Signaux : Données machine-readable", nl: "Signalen: machine-readable data" },
        items: {
          fr: ["schema.org", "JSON-LD", "llms.txt", "markdown mirrors"],
          nl: ["schema.org", "JSON-LD", "llms.txt", "markdown mirrors"],
        },
      },
      {
        kind: "list",
        label: { fr: "Signaux : Autorité", nl: "Signalen: autoriteit" },
        items: {
          fr: ["guides techniques", "benchmarks", "comparatifs", "études"],
          nl: ["technische gidsen", "benchmarks", "vergelijkingen", "studies"],
        },
      },
    ],
    faq: {
      fr: [
        { q: "ChatGPT lit-il directement les sites ?", a: "Parfois via accès web, parfois via index et données intermédiaires." },
        { q: "Les AI Overviews changent-ils le SEO ?", a: "Oui. Les réponses deviennent plus synthétiques et extractives." },
        { q: "Peut-on mesurer la visibilité IA ?", a: "Partiellement via citations, trafic et monitoring." },
      ],
      nl: [
        { q: "Leest ChatGPT direct websites?", a: "Soms via web access, soms via index en tussenliggende data." },
        { q: "Veranderen AI Overviews de SEO?", a: "Ja. Antwoorden worden synthetischer en extractiever." },
        { q: "Kunnen we AI-zichtbaarheid meten?", a: "Gedeeltelijk via citaties, traffic en monitoring." },
      ],
    },
  },

  "seo/technical-seo": {
    meta: {
      title: {
        fr: "SEO Technique Belgique | Banana Navy",
        nl: "Technische SEO België | Banana Navy",
      },
      description: {
        fr: "SEO technique pour Core Web Vitals, schema.org, architecture, indexation et performance AI-ready.",
        nl: "Technische SEO voor Core Web Vitals, schema.org, architectuur, indexering en AI-ready performance.",
      },
    },
    subheadline: {
      fr: "La fondation technique d'un site qui performe en SEO et en AI Search.",
      nl: "Het technische fundament van een site die presteert in SEO én AI Search.",
    },
    intro: {
      fr: [
        "Le SEO technique reste la fondation d'un site performant. Même les meilleurs contenus souffrent si le site est lent, mal structuré, difficile à crawler, ou rempli de duplication.",
        "Banana Navy construit des architectures SEO techniques adaptées au web moderne et à l'AI Search.",
      ],
      nl: [
        "Technische SEO blijft het fundament van een performante site. Zelfs de beste inhoud lijdt onder een trage site, slechte structuur, moeilijke crawling of duplicatie.",
        "Banana Navy bouwt technische SEO-architecturen aangepast aan het moderne web en AI Search.",
      ],
    },
    forQui: { fr: [], nl: [] },
    livreLabel: {
      fr: "Ce qu'on optimise",
      nl: "Wat we optimaliseren",
    },
    livre: {
      fr: [
        "Core Web Vitals",
        "Sitemap",
        "Robots",
        "Canonicals",
        "JSON-LD",
        "Internal linking",
        "Architecture URL",
        "Mobile performance",
        "Cloudflare deployment",
      ],
      nl: [
        "Core Web Vitals",
        "Sitemap",
        "Robots",
        "Canonicals",
        "JSON-LD",
        "Interne linking",
        "URL-architectuur",
        "Mobile performance",
        "Cloudflare-deployment",
      ],
    },
    industries: {
      label: { fr: "Stack recommandée", nl: "Aanbevolen stack" },
      items: {
        fr: [
          "Astro",
          "Cloudflare Pages",
          "Static rendering",
          "Edge caching",
          "Optimized assets",
        ],
        nl: [
          "Astro",
          "Cloudflare Pages",
          "Static rendering",
          "Edge caching",
          "Optimized assets",
        ],
      },
    },
    faq: {
      fr: [
        { q: "Pourquoi Astro est bon pour SEO ?", a: "Parce qu'il génère du HTML statique très rapide." },
        { q: "Les performances influencent-elles le ranking ?", a: "Oui, particulièrement sur mobile." },
        { q: "Pourquoi éviter les sites trop lourds ?", a: "Ils dégradent UX, crawl et Core Web Vitals." },
      ],
      nl: [
        { q: "Waarom is Astro goed voor SEO?", a: "Omdat het zeer snelle statische HTML genereert." },
        { q: "Beïnvloedt performance de ranking?", a: "Ja, vooral op mobile." },
        { q: "Waarom te zware sites vermijden?", a: "Ze degraderen UX, crawl en Core Web Vitals." },
      ],
    },
  },

  "seo/local-seo": {
    meta: {
      title: {
        fr: "Local SEO Belgique | Banana Navy",
        nl: "Local SEO België | Banana Navy",
      },
      description: {
        fr: "SEO local pour entreprises belges : pages locales, Google Business Profile, GEO et visibilité régionale.",
        nl: "Lokale SEO voor Belgische bedrijven: lokale pagina's, Google Business Profile, GEO en regionale zichtbaarheid.",
      },
    },
    subheadline: {
      fr: "Le levier le plus rentable pour les PME belges sous-optimisées.",
      nl: "De meest rendabele hefboom voor onderbenutte Belgische KMO's.",
    },
    intro: {
      fr: [
        "Le SEO local reste l'un des leviers les plus rentables pour les PME belges.",
        "La plupart des entreprises locales restent sous-optimisées : peu de pages locales, GBP incomplet, structure faible, absence de GEO.",
      ],
      nl: [
        "Lokale SEO blijft een van de meest rendabele hefbomen voor Belgische KMO's.",
        "De meeste lokale bedrijven zijn onderbenut: weinig lokale pagina's, onvolledige GBP, zwakke structuur, geen GEO.",
      ],
    },
    forQuiLabel: {
      fr: "Ce qu'on optimise",
      nl: "Wat we optimaliseren",
    },
    forQui: {
      fr: [
        "Pages villes",
        "Google Business Profile",
        "Schema LocalBusiness",
        "NAP consistency",
        "FAQ locales",
        "GEO multilingue FR/NL",
      ],
      nl: [
        "Stadspagina's",
        "Google Business Profile",
        "Schema LocalBusiness",
        "NAP-consistency",
        "Lokale FAQ's",
        "Meertalige GEO FR/NL",
      ],
    },
    caseStudy: {
      label: {
        fr: "Pourquoi la Belgique est intéressante",
        nl: "Waarom België interessant is",
      },
      intro: {
        fr: "Le marché belge combine :",
        nl: "De Belgische markt combineert:",
      },
      bullets: {
        fr: [
          "faible concurrence GEO",
          "besoin multilingue",
          "forte densité PME",
          "faible maturité AI Search",
        ],
        nl: [
          "lage GEO-concurrentie",
          "meertalige behoefte",
          "hoge KMO-dichtheid",
          "lage AI Search-maturiteit",
        ],
      },
      outcome: {
        fr: "Les PME belges qui investissent maintenant dans le local SEO + GEO prennent une longueur d'avance durable.",
        nl: "Belgische KMO's die nu investeren in lokale SEO + GEO nemen een duurzame voorsprong.",
      },
    },
    faq: {
      fr: [
        { q: "Faut-il une page par ville ?", a: "Oui, si le contenu est réellement utile et spécifique." },
        { q: "GBP est-il toujours important ?", a: "Oui, énormément." },
        { q: "Peut-on faire du local SEO en plusieurs langues ?", a: "Oui." },
      ],
      nl: [
        { q: "Heeft elke stad een eigen pagina nodig?", a: "Ja, als de content echt nuttig en specifiek is." },
        { q: "Blijft GBP belangrijk?", a: "Ja, enorm." },
        { q: "Kan lokale SEO meertalig?", a: "Ja." },
      ],
    },
  },

  "seo/schema-markup": {
    meta: {
      title: {
        fr: "Schema.org & JSON-LD | Banana Navy",
        nl: "Schema.org & JSON-LD | Banana Navy",
      },
      description: {
        fr: "Implémentation schema.org et JSON-LD pour SEO, GEO et AI Search.",
        nl: "Implementatie van schema.org en JSON-LD voor SEO, GEO en AI Search.",
      },
    },
    subheadline: {
      fr: "La couche que les moteurs IA lisent en premier.",
      nl: "De laag die AI-motoren als eerste lezen.",
    },
    intro: {
      fr: [
        "Le schema markup aide les moteurs à comprendre précisément votre entreprise, vos services, vos FAQ, vos articles et vos localisations.",
        "C'est une couche essentielle pour SEO moderne et GEO.",
      ],
      nl: [
        "Schema markup helpt motoren precies te begrijpen wat je bedrijf, je diensten, je FAQ's, je artikels en je locaties zijn.",
        "Het is een essentiële laag voor moderne SEO en GEO.",
      ],
    },
    forQuiLabel: {
      fr: "Schemas fréquemment utilisés",
      nl: "Vaak gebruikte schema's",
    },
    forQui: {
      fr: [
        "Organization",
        "Service",
        "FAQPage",
        "Article",
        "LocalBusiness",
        "BreadcrumbList",
      ],
      nl: [
        "Organization",
        "Service",
        "FAQPage",
        "Article",
        "LocalBusiness",
        "BreadcrumbList",
      ],
    },
    livre: {
      fr: [
        "JSON-LD propre",
        "Architecture schema",
        "Validation",
        "FAQ schema",
        "LocalBusiness schema",
      ],
      nl: [
        "Schone JSON-LD",
        "Schema-architectuur",
        "Validatie",
        "FAQ-schema",
        "LocalBusiness-schema",
      ],
    },
    caseStudy: {
      label: {
        fr: "Pourquoi c'est important",
        nl: "Waarom dit belangrijk is",
      },
      intro: {
        fr: "Les moteurs IA utilisent fortement les données structurées pour :",
        nl: "AI-motoren gebruiken gestructureerde data sterk om:",
      },
      bullets: {
        fr: ["résumer", "catégoriser", "citer", "relier les entités"],
        nl: ["samen te vatten", "te categoriseren", "te citeren", "entiteiten te koppelen"],
      },
      outcome: {
        fr: "Un schema propre est un raccourci direct vers la compréhension par les moteurs et les IA.",
        nl: "Schoon schema is een directe snelweg naar begrip door motoren en AI's.",
      },
    },
    faq: {
      fr: [
        { q: "Le schema améliore-t-il le SEO ?", a: "Indirectement oui." },
        { q: "Les moteurs IA utilisent-ils schema.org ?", a: "Oui, fortement." },
        { q: "Peut-on automatiser le schema ?", a: "Oui avec Astro et composants dynamiques." },
      ],
      nl: [
        { q: "Verbetert schema de SEO?", a: "Indirect ja." },
        { q: "Gebruiken AI-motoren schema.org?", a: "Ja, sterk." },
        { q: "Kan schema geautomatiseerd worden?", a: "Ja met Astro en dynamische componenten." },
      ],
    },
  },

  "voice-agents/ai-support-agent": {
    meta: {
      title: {
        fr: "AI Support Agent — Support client IA Belgique | Banana Navy",
        nl: "AI Support Agent — AI-klantenservice België | Banana Navy",
      },
      description: {
        fr: "Agent support IA pour service client, tickets, FAQ, triage et transfert humain. Support multilingue et workflows automatisés.",
        nl: "AI-supportagent voor klantenservice, tickets, FAQ, triage en menselijke transfer. Meertalig support en geautomatiseerde workflows.",
      },
    },
    subheadline: {
      fr: "Un support IA capable de gérer le niveau 1 sans bloquer vos équipes humaines.",
      nl: "Een AI-support die niveau 1 kan afhandelen zonder je menselijke teams te blokkeren.",
    },
    intro: {
      fr: [
        "Les demandes répétitives saturent rapidement les équipes support. Un AI Support Agent peut traiter les questions simples, rechercher des informations, créer des tickets et transférer les cas complexes.",
        "Banana Navy conçoit des agents support IA avec règles métier, fallback humain et historique conversationnel.",
      ],
      nl: [
        "Repetitieve vragen overbelasten supportteams snel. Een AI Support Agent kan eenvoudige vragen afhandelen, informatie opzoeken, tickets aanmaken en complexe gevallen doorzetten.",
        "Banana Navy ontwerpt AI-supportagents met bedrijfsregels, menselijke fallback en gespreksgeschiedenis.",
      ],
    },
    forQuiLabel: {
      fr: "Couverture",
      nl: "Dekking",
    },
    forQui: {
      fr: [
        "Tier 1 automatisé",
        "Tier 2 assisté IA possible",
        "Escalade humaine contrôlée",
        "Support vocal ou textuel",
      ],
      nl: [
        "Geautomatiseerde tier 1",
        "Tier 2 met AI-assistentie mogelijk",
        "Gecontroleerde menselijke escalatie",
        "Voice of tekst support",
      ],
    },
    livre: {
      fr: [
        "FAQ IA",
        "Classification tickets",
        "Résumé conversations",
        "Connexion base documentaire",
        "RAG si nécessaire",
        "Escalade support humain",
        "Logs et analytics",
      ],
      nl: [
        "AI-FAQ",
        "Ticketclassificatie",
        "Gesprekssamenvattingen",
        "Koppeling documentatiebasis",
        "RAG indien nodig",
        "Escalatie naar menselijke support",
        "Logs en analytics",
      ],
    },
    industries: {
      label: {
        fr: "Industries",
        nl: "Industrieën",
      },
      items: {
        fr: [
          "E-commerce",
          "Immobilier",
          "SaaS",
          "Hospitality",
          "Santé",
        ],
        nl: [
          "E-commerce",
          "Vastgoed",
          "SaaS",
          "Hospitality",
          "Gezondheidszorg",
        ],
      },
    },
    faq: {
      fr: [
        {
          q: "L'agent invente-t-il des réponses ?",
          a: "Non. Les réponses sont limitées à des données validées ou à une base documentaire contrôlée.",
        },
        {
          q: "Peut-il créer des tickets ?",
          a: "Oui. L'agent peut créer, classer et router des tickets automatiquement.",
        },
        {
          q: "Peut-il fonctionner avec une base documentaire ?",
          a: "Oui. Via RAG ou documentation structurée.",
        },
      ],
      nl: [
        {
          q: "Verzint de agent antwoorden?",
          a: "Nee. Antwoorden zijn beperkt tot gevalideerde data of een gecontroleerde documentatiebasis.",
        },
        {
          q: "Kan hij tickets aanmaken?",
          a: "Ja. De agent kan tickets automatisch aanmaken, classificeren en routeren.",
        },
        {
          q: "Kan hij werken met een documentatiebasis?",
          a: "Ja. Via RAG of gestructureerde documentatie.",
        },
      ],
    },
  },

  "agentic-systems/multi-agent-workflows": {
    meta: {
      title: {
        fr: "Workflows multi-agents IA | Banana Navy",
        nl: "Multi-agent AI-workflows | Banana Navy",
      },
      description: {
        fr: "Conception de workflows multi-agents IA pour orchestrer qualification, recherche, support, reporting et opérations métier.",
        nl: "Ontwerp van multi-agent AI-workflows om kwalificatie, research, support, rapportering en bedrijfsoperaties te orkestreren.",
      },
    },
    subheadline: {
      fr: "Des agents spécialisés qui collaborent entre eux pour exécuter des tâches complexes.",
      nl: "Gespecialiseerde agents die samenwerken om complexe taken uit te voeren.",
    },
    intro: {
      fr: [
        "Un workflow multi-agent répartit les tâches entre plusieurs agents IA spécialisés : qualification, recherche, décision, exécution, reporting ou validation humaine.",
        "Contrairement à un agent unique, cette architecture améliore la stabilité, la spécialisation et le contrôle.",
      ],
      nl: [
        "Een multi-agent workflow verdeelt taken over meerdere gespecialiseerde AI-agents: kwalificatie, research, beslissing, uitvoering, rapportering of menselijke validatie.",
        "In tegenstelling tot één enkele agent verbetert deze architectuur stabiliteit, specialisatie en controle.",
      ],
    },
    forQui: { fr: [], nl: [] },
    livre: {
      fr: [
        "Architecture multi-agent",
        "Routing logique",
        "Mémoire contexte",
        "Tool calling",
        "APIs métier",
        "Logs et observabilité",
      ],
      nl: [
        "Multi-agent architectuur",
        "Logische routing",
        "Contextgeheugen",
        "Tool calling",
        "Business APIs",
        "Logs en observability",
      ],
    },
    workflow: {
      title: {
        fr: "Architecture type",
        nl: "Standaardarchitectuur",
      },
      steps: {
        fr: [
          "Orchestrateur",
          "Agent qualification",
          "Agent recherche",
          "Agent reporting",
          "Agent CRM",
          "Validation humaine",
        ],
        nl: [
          "Orchestrator",
          "Kwalificatie-agent",
          "Research-agent",
          "Reporting-agent",
          "CRM-agent",
          "Menselijke validatie",
        ],
      },
    },
    caseStudy: {
      label: {
        fr: "Cas concret",
        nl: "Concreet voorbeeld",
      },
      intro: {
        fr: "Chez un client immobilier, un orchestrateur IA a permis d'automatiser :",
        nl: "Bij een vastgoedklant heeft een AI-orchestrator het volgende geautomatiseerd:",
      },
      bullets: {
        fr: [
          "qualification lead",
          "enrichissement CRM",
          "génération résumé",
          "relance automatique",
          "assignation agent humain",
        ],
        nl: [
          "leadkwalificatie",
          "CRM-verrijking",
          "samenvatting genereren",
          "automatische follow-up",
          "toewijzing menselijke agent",
        ],
      },
      outcome: {
        fr: "Temps de traitement réduit de plusieurs heures par semaine.",
        nl: "Verwerkingstijd verminderd met meerdere uren per week.",
      },
    },
    stack: {
      fr: "LangGraph, Claude, OpenAI, n8n, Qdrant, pgvector, Langfuse, Cloudflare Workers.",
      nl: "LangGraph, Claude, OpenAI, n8n, Qdrant, pgvector, Langfuse, Cloudflare Workers.",
    },
    faq: {
      fr: [
        {
          q: "Pourquoi plusieurs agents ?",
          a: "Chaque agent reste spécialisé et plus stable qu'un agent \"universel\".",
        },
        {
          q: "Peut-on garder un humain dans la boucle ?",
          a: "Oui. Validation humaine possible à chaque étape critique.",
        },
        {
          q: "Peut-il fonctionner avec nos outils internes ?",
          a: "Oui. Via API, webhooks ou connecteurs.",
        },
      ],
      nl: [
        {
          q: "Waarom meerdere agents?",
          a: "Elke agent blijft gespecialiseerd en stabieler dan één \"universele\" agent.",
        },
        {
          q: "Kunnen we een mens in de loop houden?",
          a: "Ja. Menselijke validatie is mogelijk bij elke kritieke stap.",
        },
        {
          q: "Kan het werken met onze interne tools?",
          a: "Ja. Via API, webhooks of connectoren.",
        },
      ],
    },
  },

  "agentic-systems/ai-orchestration": {
    meta: {
      title: {
        fr: "Orchestration IA entreprise | Banana Navy",
        nl: "AI-orchestratie voor bedrijven | Banana Navy",
      },
      description: {
        fr: "Orchestration IA pour coordonner agents, workflows, CRM et outils métiers dans une architecture agentique évolutive.",
        nl: "AI-orchestratie om agents, workflows, CRM en bedrijfstools te coördineren in een schaalbare agentische architectuur.",
      },
    },
    subheadline: {
      fr: "La couche qui coordonne vos agents IA, outils et workflows métier.",
      nl: "De laag die je AI-agents, tools en bedrijfsworkflows coördineert.",
    },
    intro: {
      fr: [
        "L'orchestration IA permet de gérer plusieurs agents, outils et workflows comme un système cohérent. Sans orchestration, les automatisations deviennent rapidement difficiles à maintenir.",
        "Banana Navy construit des couches d'orchestration pour connecter agents IA, CRM, APIs, bases documentaires et workflows internes.",
      ],
      nl: [
        "AI-orchestratie laat je meerdere agents, tools en workflows beheren als één coherent systeem. Zonder orchestratie worden automatiseringen snel moeilijk te onderhouden.",
        "Banana Navy bouwt orchestratielagen om AI-agents, CRM's, APIs, documentatiebases en interne workflows te koppelen.",
      ],
    },
    forQuiLabel: {
      fr: "Outils fréquemment intégrés",
      nl: "Vaak geïntegreerde tools",
    },
    forQui: {
      fr: [
        "HubSpot",
        "GoHighLevel",
        "Odoo",
        "Pipedrive",
        "Notion",
        "Slack",
        "Google Workspace",
        "Make",
        "n8n",
        "Whise",
      ],
      nl: [
        "HubSpot",
        "GoHighLevel",
        "Odoo",
        "Pipedrive",
        "Notion",
        "Slack",
        "Google Workspace",
        "Make",
        "n8n",
        "Whise",
      ],
    },
    livre: {
      fr: [
        "Router logique",
        "Tool calling",
        "Gestion permissions",
        "Mémoire contexte",
        "Logging",
        "Escalade humaine",
        "Monitoring workflows",
      ],
      nl: [
        "Logische router",
        "Tool calling",
        "Permissiebeheer",
        "Contextgeheugen",
        "Logging",
        "Menselijke escalatie",
        "Workflow monitoring",
      ],
    },
    workflow: {
      title: {
        fr: "Exemple",
        nl: "Voorbeeld",
      },
      steps: {
        fr: [
          "Request",
          "Router",
          "Agent spécialiste",
          "Action CRM",
          "Validation",
          "Réponse utilisateur",
        ],
        nl: [
          "Request",
          "Router",
          "Specialist-agent",
          "CRM-actie",
          "Validatie",
          "Gebruikersantwoord",
        ],
      },
    },
    faq: {
      fr: [
        {
          q: "Pourquoi une couche orchestration ?",
          a: "Pour éviter les automatisations isolées impossibles à maintenir.",
        },
        {
          q: "Peut-on changer de modèle IA plus tard ?",
          a: "Oui. Architecture modulaire prévue pour swap modèles et providers.",
        },
        {
          q: "Peut-on héberger certaines briques en Europe ?",
          a: "Oui. Selon contraintes RGPD et sécurité.",
        },
      ],
      nl: [
        {
          q: "Waarom een orchestratielaag?",
          a: "Om geïsoleerde automatiseringen te vermijden die onmogelijk te onderhouden zijn.",
        },
        {
          q: "Kunnen we later van AI-model wisselen?",
          a: "Ja. De modulaire architectuur is ontworpen om modellen en providers te kunnen wisselen.",
        },
        {
          q: "Kunnen we bepaalde onderdelen in Europa hosten?",
          a: "Ja. Afhankelijk van de GDPR- en beveiligingseisen.",
        },
      ],
    },
  },

  "voice-agents/ai-sales-agent": {
    meta: {
      title: {
        fr: "AI Sales Agent Belgique — Qualification & prospection IA | Banana Navy",
        nl: "AI Sales Agent België — AI-kwalificatie & prospectie | Banana Navy",
      },
      description: {
        fr: "Agent commercial IA pour qualification, prospection, suivi et prise de rendez-vous. SDR IA multilingue connecté à votre CRM.",
        nl: "AI-salesagent voor kwalificatie, prospectie, opvolging en afspraken. Meertalige AI-SDR gekoppeld aan je CRM.",
      },
    },
    subheadline: {
      fr: "Un agent commercial IA qui qualifie, relance et réserve des rendez-vous automatiquement.",
      nl: "Een AI-salesagent die automatisch kwalificeert, opvolgt en afspraken boekt.",
    },
    intro: {
      fr: [
        "Les équipes commerciales perdent énormément de temps sur les premiers échanges : qualification, rappels, suivi de formulaires, relances et prise de rendez-vous. Un AI Sales Agent permet d'automatiser cette couche sans perdre la qualité commerciale.",
        "Banana Navy construit des agents commerciaux IA capables de gérer inbound et outbound : qualification, relance, scoring, enrichissement CRM et planification.",
      ],
      nl: [
        "Salesteams verliezen veel tijd aan de eerste contacten: kwalificatie, herinneringen, opvolging van formulieren, follow-ups en afspraken. Een AI Sales Agent automatiseert deze laag zonder commerciële kwaliteit te verliezen.",
        "Banana Navy bouwt AI-salesagents voor inbound en outbound: kwalificatie, follow-up, scoring, CRM-verrijking en planning.",
      ],
    },
    forQuiLabel: {
      fr: "Cas d'usage",
      nl: "Use cases",
    },
    forQui: {
      fr: [
        "Qualification leads entrants",
        "Relance après formulaire",
        "SDR outbound",
        "Qualification salon/événement",
        "Réactivation leads dormants",
      ],
      nl: [
        "Kwalificatie inkomende leads",
        "Follow-up na formulier",
        "Outbound SDR",
        "Kwalificatie beurs/evenement",
        "Reactivatie slapende leads",
      ],
    },
    livre: {
      fr: [
        "Scripts commerciaux IA",
        "Qualification automatique",
        "Lead scoring",
        "CRM sync",
        "Relances automatisées",
        "Calendrier intégré",
        "Résumé appels",
        "Reporting commercial",
      ],
      nl: [
        "AI-salesscripts",
        "Automatische kwalificatie",
        "Lead scoring",
        "CRM-sync",
        "Geautomatiseerde follow-ups",
        "Geïntegreerde kalender",
        "Gesprekssamenvattingen",
        "Salesrapportering",
      ],
    },
    workflow: {
      title: {
        fr: "Workflow exemple",
        nl: "Voorbeeld-workflow",
      },
      steps: {
        fr: [
          "Lead formulaire",
          "Enrichissement Apollo",
          "Scoring IA",
          "Appel qualification",
          "Prise RDV",
          "Création HubSpot",
          "Relance automatique J+3",
        ],
        nl: [
          "Formulier-lead",
          "Verrijking Apollo",
          "AI-scoring",
          "Kwalificatie-oproep",
          "Afspraak",
          "Aanmaak HubSpot",
          "Automatische follow-up D+3",
        ],
      },
    },
    stack: {
      fr: "HubSpot, Apollo, GoHighLevel, Pipedrive, Claude, OpenAI, Vapi, n8n, Make.",
      nl: "HubSpot, Apollo, GoHighLevel, Pipedrive, Claude, OpenAI, Vapi, n8n, Make.",
    },
    faq: {
      fr: [
        {
          q: "L'agent peut-il faire de la prospection ?",
          a: "Oui, avec cadre légal et scripts adaptés. Nous évitons les approches agressives ou trompeuses.",
        },
        {
          q: "Peut-il enrichir un CRM ?",
          a: "Oui. Tags, score, résumé, notes, historique et actions peuvent être ajoutés automatiquement.",
        },
        {
          q: "Peut-il transférer vers un commercial humain ?",
          a: "Oui. Les leads qualifiés peuvent être transférés immédiatement selon vos règles.",
        },
      ],
      nl: [
        {
          q: "Kan de agent prospecteren?",
          a: "Ja, binnen een wettelijk kader en met aangepaste scripts. We vermijden agressieve of misleidende benaderingen.",
        },
        {
          q: "Kan hij een CRM verrijken?",
          a: "Ja. Tags, score, samenvatting, notities, historiek en acties kunnen automatisch toegevoegd worden.",
        },
        {
          q: "Kan hij doorzetten naar een menselijke salesman?",
          a: "Ja. Gekwalificeerde leads kunnen onmiddellijk doorgezet worden volgens je regels.",
        },
      ],
    },
  },

  "voice-agents/ai-receptionist": {
    meta: {
      title: {
        fr: "AI Receptionist Belgique — Réceptionniste IA multilingue | Banana Navy",
        nl: "AI Receptionist België — Meertalige AI-receptioniste | Banana Navy",
      },
      description: {
        fr: "Réceptionniste IA pour PME belges : appels entrants, qualification, rendez-vous, CRM et transfert humain. Français, néerlandais et anglais.",
        nl: "AI-receptioniste voor Belgische KMO's: inkomende oproepen, kwalificatie, afspraken, CRM en menselijke transfer. Frans, Nederlands en Engels.",
      },
    },
    subheadline: {
      fr: "Un standard téléphonique IA capable de répondre 24/7 sans perdre le contexte métier.",
      nl: "Een AI-telefoonstandaard die 24/7 kan antwoorden zonder de bedrijfscontext te verliezen.",
    },
    intro: {
      fr: [
        "Une AI receptionist permet à votre entreprise de répondre immédiatement aux appels entrants, même en dehors des heures d'ouverture. L'agent peut identifier le besoin, poser les bonnes questions, réserver un rendez-vous, créer une fiche CRM ou transférer vers la bonne personne.",
        "Banana Navy construit des réceptionnistes IA pour PME belges avec scripts conversationnels adaptés au marché FR/NL/EN. L'objectif n'est pas de remplacer votre équipe, mais d'éviter les appels manqués, les leads oubliés et les pertes de temps administratives.",
      ],
      nl: [
        "Een AI receptionist laat je bedrijf onmiddellijk reageren op inkomende oproepen, ook buiten de openingsuren. De agent identificeert de behoefte, stelt de juiste vragen, boekt een afspraak, maakt een CRM-fiche aan of zet door naar de juiste persoon.",
        "Banana Navy bouwt AI-receptionistes voor Belgische KMO's met conversatiescripts aangepast aan de FR/NL/EN-markt. Het doel is niet je team vervangen, maar gemiste oproepen, vergeten leads en administratief tijdverlies vermijden.",
      ],
    },
    forQui: {
      fr: [
        "Cabinets immobiliers",
        "Cliniques, pharmacies, cabinets médicaux",
        "PME recevant beaucoup d'appels entrants",
        "Services client avec horaires limités",
        "Entreprises multilingues Belgique",
      ],
      nl: [
        "Vastgoedkantoren",
        "Klinieken, apotheken, medische praktijken",
        "KMO's met veel inkomende oproepen",
        "Klantendiensten met beperkte uren",
        "Meertalige Belgische bedrijven",
      ],
    },
    livre: {
      fr: [
        "Script d'appel personnalisé",
        "Gestion horaires ouverture/fermeture",
        "Qualification automatique",
        "Réservation calendrier",
        "Connexion CRM",
        "Notifications email/Slack",
        "Transfert humain intelligent",
        "Logs conversations et analytics",
      ],
      nl: [
        "Aangepast belscript",
        "Beheer openings-/sluitingsuren",
        "Automatische kwalificatie",
        "Kalenderreservatie",
        "CRM-koppeling",
        "E-mail/Slack-notificaties",
        "Slimme menselijke transfer",
        "Gesprekslogs en analytics",
      ],
    },
    scenario: {
      title: {
        fr: "Exemple de scénario d'appel",
        nl: "Voorbeeld van een oproepscenario",
      },
      lines: {
        fr: [
          { who: "agent", text: "Bonjour, ici Banana Navy Assist. Comment puis-je vous aider ?" },
          { who: "user", text: "Je voudrais un rendez-vous." },
          { who: "agent", text: "Très bien. Est-ce votre première demande ?" },
          { who: "user", text: "Oui." },
          { who: "agent", text: "Parfait. Pouvez-vous me donner votre nom et votre disponibilité ?" },
        ],
        nl: [
          { who: "agent", text: "Hallo, dit is Banana Navy Assist. Hoe kan ik u helpen?" },
          { who: "user", text: "Ik zou graag een afspraak maken." },
          { who: "agent", text: "Heel goed. Is dit uw eerste aanvraag?" },
          { who: "user", text: "Ja." },
          { who: "agent", text: "Perfect. Kunt u me uw naam en beschikbaarheid geven?" },
        ],
      },
    },
    roi: {
      fr: "Un standard IA 24/7 peut absorber une partie importante des appels répétitifs et représenter jusqu'à 1–1,5 ETP économisé selon le volume entrant.",
      nl: "Een 24/7 AI-standaard kan een groot deel van de repetitieve oproepen opvangen en tot 1–1,5 VTE besparen, afhankelijk van het inkomende volume.",
    },
    stack: {
      fr: "Vapi, Retell, ElevenLabs, Twilio, HubSpot, Google Calendar, Claude, OpenAI, n8n.",
      nl: "Vapi, Retell, ElevenLabs, Twilio, HubSpot, Google Calendar, Claude, OpenAI, n8n.",
    },
    faq: {
      fr: [
        {
          q: "Est-ce que l'agent peut transférer à un humain ?",
          a: "Oui. Nous définissons précisément les conditions de transfert : urgence, incompréhension, demande sensible ou VIP.",
        },
        {
          q: "Peut-il fonctionner la nuit ou le week-end ?",
          a: "Oui. Les agents fonctionnent 24/7 avec scénarios adaptés selon les horaires.",
        },
        {
          q: "Peut-il reconnaître la langue ?",
          a: "Oui. Les systèmes peuvent détecter ou proposer FR/NL/EN dès le début de l'appel.",
        },
      ],
      nl: [
        {
          q: "Kan de agent doorzetten naar een mens?",
          a: "Ja. We definiëren precies de transfer-voorwaarden: urgentie, onbegrip, gevoelige vraag of VIP.",
        },
        {
          q: "Kan hij 's nachts of in het weekend werken?",
          a: "Ja. De agents werken 24/7 met scenario's aangepast aan de uren.",
        },
        {
          q: "Kan hij de taal herkennen?",
          a: "Ja. De systemen kunnen FR/NL/EN detecteren of voorstellen vanaf het begin van de oproep.",
        },
      ],
    },
  },
};

export const PILLARS = [
  {
    num: "01",
    title: { fr: "Souveraineté", nl: "Soevereiniteit" },
    body: { fr: "Hébergement EU. Modèles open-source quand possible.", nl: "EU-hosting. Open-source modellen waar mogelijk." },
  },
  {
    num: "02",
    title: { fr: "Modularité", nl: "Modulariteit" },
    body: {
      fr: "Architectures modulaires. Swap des modèles et outils sans rebuild complet — votre stack suit les évolutions de l'IA.",
      nl: "Modulaire architecturen. Modellen en tools wisselen zonder volledige rebuild — je stack volgt de AI-evoluties.",
    },
  },
  {
    num: "03",
    title: { fr: "Éthique", nl: "Ethiek" },
    body: { fr: "Pas d'usage caché. Pas de scraping non consenti.", nl: "Geen verborgen gebruik. Geen niet-toegestane scraping." },
  },
] as const;

/* ============================================================
   LAB ARTICLES — Lot 4 (long-form posts).
   Block-based articles. FR is source of truth; NL mirrors FR
   until proper NL translations land.
   ============================================================ */

type Bi = { fr: string; nl: string };
type BiList = { fr: string[]; nl: string[] };

export type ArticleBlock =
  | { kind: "p"; text: Bi }
  | { kind: "h2"; text: Bi }
  | { kind: "h3"; text: Bi }
  | { kind: "ul"; items: BiList }
  | { kind: "pre"; text: Bi };

export type ArticleContent = {
  slug: string;
  publishedAt: string; // ISO date
  meta: {
    title: Bi;
    description: Bi;
  };
  title: Bi;
  /** Lead/standfirst — short bold paragraph above the body. */
  lead: Bi;
  blocks: ArticleBlock[];
  /** Optional FAQ at the bottom — renders FAQPage JSON-LD when present. */
  faq?: { fr: LeafFaq[]; nl: LeafFaq[] };
  /** Optional cover image path (relative to /public). Used by Lab index preview + article hero thumbnail. */
  cover?: string;
  /** Optional topic tags shown under the row (e.g. ["GEO", "AI Search"]). Falls back to derived first-h2 list. */
  topics?: string[];
  cta: {
    label: Bi;
    href: string; // localizedPath() will be applied at render time
  };
};

const p = (fr: string, nl: string): ArticleBlock => ({ kind: "p", text: { fr, nl } });
const h2 = (fr: string, nl: string): ArticleBlock => ({ kind: "h2", text: { fr, nl } });
const h3 = (fr: string, nl: string): ArticleBlock => ({ kind: "h3", text: { fr, nl } });
const ul = (fr: string[], nl: string[]): ArticleBlock => ({ kind: "ul", items: { fr, nl } });
const pre = (fr: string, nl: string): ArticleBlock => ({ kind: "pre", text: { fr, nl } });

export const ARTICLES: ArticleContent[] = [
  {
    slug: "ai-act-belgium",
    publishedAt: "2026-05-19",
    meta: {
      title: {
        fr: "AI Act Belgique — Ce que les PME doivent savoir | Banana Navy",
        nl: "AI Act België — Wat KMO's moeten weten | Banana Navy",
      },
      description: {
        fr: "Comprendre l'AI Act européen et ses implications pour les PME belges utilisant agents IA et automatisations.",
        nl: "Begrijp de Europese AI Act en de gevolgen voor Belgische KMO's die AI-agents en automatiseringen gebruiken.",
      },
    },
    title: { fr: "AI Act Belgique", nl: "AI Act België" },
    lead: {
      fr: "L'AI Act européen va progressivement encadrer l'utilisation de certains systèmes IA en Europe.",
      nl: "De Europese AI Act zal het gebruik van bepaalde AI-systemen in Europa geleidelijk reguleren.",
    },
    blocks: [
      p(
        "Beaucoup de PME pensent que cela concerne uniquement les grandes entreprises. Pourtant, toute société utilisant :",
        "Veel KMO's denken dat dit enkel grote bedrijven betreft. Toch zal elk bedrijf dat het volgende gebruikt:",
      ),
      ul(
        ["agents IA,", "automatisations,", "scoring,", "IA conversationnelle,"],
        ["AI-agents,", "automatiseringen,", "scoring,", "conversationele AI,"],
      ),
      p("…sera progressivement concernée.", "…er geleidelijk door geraakt worden."),
      h2("Les points importants", "De belangrijke punten"),
      h3("Transparence", "Transparantie"),
      p(
        "Les utilisateurs doivent savoir quand ils interagissent avec une IA.",
        "Gebruikers moeten weten wanneer ze met een AI interageren.",
      ),
      h3("Données", "Data"),
      p(
        "Le traitement des données doit respecter le RGPD.",
        "De gegevensverwerking moet de GDPR respecteren.",
      ),
      h3("Risques", "Risico's"),
      p(
        "Certains usages à haut risque auront des obligations supplémentaires.",
        "Bepaalde toepassingen met hoog risico zullen extra verplichtingen hebben.",
      ),
      h2("Ce que cela change pour les PME", "Wat dit verandert voor KMO's"),
      p("Les PME devront surtout :", "KMO's zullen vooral moeten:"),
      ul(
        ["documenter,", "encadrer,", "superviser,", "limiter certains usages."],
        ["documenteren,", "kaders stellen,", "superviseren,", "bepaalde toepassingen beperken."],
      ),
      h2(
        "Pourquoi les systèmes modulaires aident",
        "Waarom modulaire systemen helpen",
      ),
      p("Une architecture claire facilite :", "Een duidelijke architectuur vergemakkelijkt:"),
      ul(
        ["monitoring,", "documentation,", "contrôle,", "évolutions réglementaires."],
        ["monitoring,", "documentatie,", "controle,", "regelgevende evoluties."],
      ),
    ],
    faq: {
      fr: [
        { q: "Les voice agents sont-ils autorisés ?", a: "Oui dans la majorité des cas avec cadre adapté." },
        { q: "Faut-il informer les utilisateurs ?", a: "Oui selon contexte." },
        { q: "Le RGPD reste-t-il applicable ?", a: "Oui." },
      ],
      nl: [
        { q: "Zijn voice agents toegelaten?", a: "Ja in de meeste gevallen, met een aangepast kader." },
        { q: "Moeten gebruikers geïnformeerd worden?", a: "Ja afhankelijk van de context." },
        { q: "Blijft de GDPR van toepassing?", a: "Ja." },
      ],
    },
    cta: {
      label: { fr: "Auditer la conformité de votre stack IA", nl: "Audit van de conformiteit van je AI-stack" },
      href: "/contact/",
    },
  },
  {
    slug: "voice-agents-for-real-estate",
    publishedAt: "2026-05-19",
    meta: {
      title: {
        fr: "Agents vocaux IA pour immobilier | Banana Navy",
        nl: "AI voice agents voor vastgoed | Banana Navy",
      },
      description: {
        fr: "Voice agents IA pour agences immobilières : qualification leads, appels, visites et automatisation CRM.",
        nl: "AI voice agents voor vastgoedkantoren: leadkwalificatie, oproepen, bezichtigingen en CRM-automatisering.",
      },
    },
    title: {
      fr: "Agents vocaux IA pour immobilier",
      nl: "AI voice agents voor vastgoed",
    },
    lead: {
      fr: "Les agences immobilières perdent énormément de temps sur des tâches qu'un agent vocal IA peut absorber.",
      nl: "Vastgoedkantoren verliezen enorm veel tijd aan taken die een AI voice agent kan overnemen.",
    },
    blocks: [
      p(
        "Les agences immobilières perdent énormément de temps :",
        "Vastgoedkantoren verliezen enorm veel tijd aan:",
      ),
      ul(
        [
          "appels manqués,",
          "qualification répétitive,",
          "prise de rendez-vous,",
          "relances,",
          "suivi CRM.",
        ],
        [
          "gemiste oproepen,",
          "repetitieve kwalificatie,",
          "afsprakenbeheer,",
          "follow-ups,",
          "CRM-opvolging.",
        ],
      ),
      p(
        "Les agents vocaux IA peuvent absorber une partie importante de cette charge.",
        "AI voice agents kunnen een groot deel van deze last overnemen.",
      ),
      h2(
        "Ce qu'un voice agent peut faire",
        "Wat een voice agent kan doen",
      ),
      ul(
        [
          "Répondre aux appels",
          "Qualifier le besoin",
          "Identifier budget/localisation",
          "Réserver une visite",
          "Mettre à jour le CRM",
          "Relancer automatiquement",
        ],
        [
          "Oproepen beantwoorden",
          "De behoefte kwalificeren",
          "Budget/locatie identificeren",
          "Een bezichtiging boeken",
          "Het CRM bijwerken",
          "Automatisch opvolgen",
        ],
      ),
      h2(
        "Pourquoi c'est particulièrement utile en immobilier",
        "Waarom dit bijzonder nuttig is in vastgoed",
      ),
      p("Les leads arrivent souvent :", "Leads komen vaak binnen:"),
      ul(
        ["soir,", "week-end,", "pendant visites."],
        ["'s avonds,", "in het weekend,", "tijdens bezichtigingen."],
      ),
      p("Un agent IA 24/7 évite beaucoup de pertes.", "Een 24/7 AI-agent vermijdt veel verlies."),
      h2("Stack typique", "Typische stack"),
      p(
        "Vapi + CRM + n8n + calendrier + WhatsApp/email.",
        "Vapi + CRM + n8n + kalender + WhatsApp/email.",
      ),
    ],
    faq: {
      fr: [
        { q: "Peut-il parler plusieurs langues ?", a: "Oui." },
        { q: "Peut-il qualifier les budgets ?", a: "Oui selon scripts définis." },
        { q: "Peut-il fonctionner avec Whise ?", a: "Oui via APIs et workflows." },
      ],
      nl: [
        { q: "Kan hij meerdere talen spreken?", a: "Ja." },
        { q: "Kan hij budgetten kwalificeren?", a: "Ja volgens gedefinieerde scripts." },
        { q: "Kan hij werken met Whise?", a: "Ja via APIs en workflows." },
      ],
    },
    cta: {
      label: { fr: "Discuter d'un agent immobilier", nl: "Spreek over een vastgoedagent" },
      href: "/contact/",
    },
  },
  {
    slug: "voice-agents-for-healthcare",
    publishedAt: "2026-05-19",
    meta: {
      title: {
        fr: "Agents vocaux IA pour santé | Banana Navy",
        nl: "AI voice agents voor gezondheidszorg | Banana Navy",
      },
      description: {
        fr: "Agents IA pour cabinets médicaux, pharmacies et santé : appels, rendez-vous, triage et automatisation.",
        nl: "AI-agents voor medische praktijken, apotheken en gezondheidszorg: oproepen, afspraken, triage en automatisering.",
      },
    },
    title: {
      fr: "Agents vocaux IA pour santé",
      nl: "AI voice agents voor gezondheidszorg",
    },
    lead: {
      fr: "Les structures médicales reçoivent énormément d'appels répétitifs qu'un agent IA peut absorber, sous supervision stricte.",
      nl: "Medische structuren ontvangen enorm veel repetitieve oproepen die een AI-agent kan overnemen, onder strikte supervisie.",
    },
    blocks: [
      p(
        "Les structures médicales reçoivent énormément d'appels répétitifs :",
        "Medische structuren ontvangen enorm veel repetitieve oproepen:",
      ),
      ul(
        ["rendez-vous,", "horaires,", "renouvellements,", "informations simples."],
        ["afspraken,", "openingsuren,", "vernieuwingen,", "eenvoudige informatie."],
      ),
      p(
        "Les agents vocaux IA peuvent absorber une partie importante de ces demandes.",
        "AI voice agents kunnen een belangrijk deel van deze vragen overnemen.",
      ),
      h2("Cas d'usage", "Use cases"),
      ul(
        [
          "Standard téléphonique",
          "Triage simple",
          "Prise rendez-vous",
          "Informations horaires",
          "Rappels automatisés",
        ],
        [
          "Telefoonstandaard",
          "Eenvoudige triage",
          "Afspraakboeking",
          "Informatie over openingsuren",
          "Geautomatiseerde herinneringen",
        ],
      ),
      h2("Important", "Belangrijk"),
      p("Les systèmes doivent rester :", "De systemen moeten:"),
      ul(
        ["encadrés,", "supervisés,", "limités aux cas autorisés."],
        ["binnen een kader blijven,", "gesuperviseerd zijn,", "beperkt blijven tot toegelaten gevallen."],
      ),
    ],
    faq: {
      fr: [
        { q: "Peut-il donner des conseils médicaux ?", a: "Non." },
        { q: "Peut-il transférer vers un humain ?", a: "Oui immédiatement si nécessaire." },
        { q: "Peut-il gérer plusieurs langues ?", a: "Oui." },
      ],
      nl: [
        { q: "Kan hij medisch advies geven?", a: "Nee." },
        { q: "Kan hij doorzetten naar een mens?", a: "Ja, onmiddellijk indien nodig." },
        { q: "Kan hij meerdere talen aan?", a: "Ja." },
      ],
    },
    cta: {
      label: { fr: "Discuter d'un agent santé", nl: "Spreek over een healthcare-agent" },
      href: "/contact/",
    },
  },
  {
    slug: "how-to-appear-in-chatgpt-results",
    publishedAt: "2026-05-19",
    meta: {
      title: {
        fr: "Comment apparaître dans ChatGPT en 2026 | Banana Navy",
        nl: "Hoe verschijnen in ChatGPT in 2026 | Banana Navy",
      },
      description: {
        fr: "Guide GEO 2026 : comment structurer votre site pour être compris et cité par ChatGPT, Claude, Perplexity et Google AI Overviews.",
        nl: "GEO-gids 2026: hoe je site structureren om begrepen en geciteerd te worden door ChatGPT, Claude, Perplexity en Google AI Overviews.",
      },
    },
    title: {
      fr: "Comment apparaître dans ChatGPT en 2026",
      nl: "Hoe verschijnen in ChatGPT in 2026",
    },
    lead: {
      fr: "Beaucoup d'entreprises pensent encore uniquement en SEO Google classique. Pourtant, une part croissante des recherches passe maintenant par ChatGPT, Claude, Perplexity et Google AI Overviews.",
      nl: "Veel bedrijven denken nog steeds enkel in klassieke Google-SEO. Toch verloopt een groeiend aandeel van de zoekopdrachten via ChatGPT, Claude, Perplexity en Google AI Overviews.",
    },
    blocks: [
      p(
        "Le problème : ces moteurs ne lisent pas les sites comme Google en 2018. Ils privilégient les contenus structurés, les réponses claires, les entités cohérentes et les pages facilement extractibles.",
        "Het probleem: deze motoren lezen sites niet zoals Google in 2018. Ze geven voorrang aan gestructureerde inhoud, duidelijke antwoorden, coherente entiteiten en makkelijk extraheerbare pagina's.",
      ),
      h2("Le SEO ne suffit plus", "SEO alleen volstaat niet meer"),
      p(
        "Le SEO reste indispensable, mais il doit être complété par du GEO — Generative Engine Optimization.",
        "SEO blijft onmisbaar, maar moet aangevuld worden met GEO — Generative Engine Optimization.",
      ),
      p("Le GEO consiste à :", "GEO bestaat uit:"),
      ul(
        ["structurer les réponses,", "clarifier les entités,", "rendre le contenu extractible,", "faciliter les citations IA."],
        ["antwoorden structureren,", "entiteiten verduidelijken,", "inhoud extraheerbaar maken,", "AI-citaties faciliteren."],
      ),
      h2("Les signaux utilisés par les moteurs IA", "De signalen die AI-motoren gebruiken"),
      p(
        "Les modèles utilisent plusieurs types de signaux :",
        "De modellen gebruiken verschillende soorten signalen:",
      ),
      h3("Structure claire", "Duidelijke structuur"),
      ul(
        ["H1/H2 propres", "FAQ", "réponses directes", "paragraphes courts"],
        ["nette H1/H2", "FAQ", "directe antwoorden", "korte paragrafen"],
      ),
      h3("Données machine-readable", "Machine-readable data"),
      ul(
        ["schema.org", "JSON-LD", "llms.txt", "markdown mirrors"],
        ["schema.org", "JSON-LD", "llms.txt", "markdown mirrors"],
      ),
      h3("Cohérence d'entité", "Coherentie van entiteit"),
      p(
        "Votre entreprise doit être décrite de manière cohérente :",
        "Je bedrijf moet coherent beschreven worden:",
      ),
      ul(
        ["site", "LinkedIn", "GitHub", "YouTube", "profils externes"],
        ["site", "LinkedIn", "GitHub", "YouTube", "externe profielen"],
      ),
      h3("Autorité", "Autoriteit"),
      p("Les moteurs IA privilégient :", "AI-motoren geven voorrang aan:"),
      ul(
        ["guides techniques", "études", "comparatifs", "benchmarks", "données concrètes"],
        ["technische gidsen", "studies", "vergelijkingen", "benchmarks", "concrete data"],
      ),
      h2("Pourquoi les sites mono-page performent mal", "Waarom one-pagers slecht presteren"),
      p('Les sites "one page" rendent difficile :', '"One page"-sites maken het moeilijk om:'),
      ul(
        ["l'indexation par sujet,", "la création de clusters,", "les pages locales,", "les FAQ extractibles,", "les citations IA."],
        ["te indexeren per onderwerp,", "clusters te creëren,", "lokale pagina's te bouwen,", "FAQ's extraheerbaar te maken,", "AI-citaties te genereren."],
      ),
      p(
        "Une architecture multi-pages reste bien plus efficace pour GEO.",
        "Een multi-page architectuur blijft veel efficiënter voor GEO.",
      ),
      h2("Les éléments techniques importants", "De belangrijke technische elementen"),
      ul(
        ["llms.txt", "markdown mirrors", "JSON-LD", "sitemap propre", "Core Web Vitals", "architecture services", "pages locales", "FAQ schema"],
        ["llms.txt", "markdown mirrors", "JSON-LD", "nette sitemap", "Core Web Vitals", "service-architectuur", "lokale pagina's", "FAQ-schema"],
      ),
      h2("Exemple simple", "Eenvoudig voorbeeld"),
      p("Un site qui contient :", "Een site die het volgende bevat:"),
      ul(
        ["/voice-agents/", "/seo/", "/automations/", "FAQ structurées", "réponses directes"],
        ["/voice-agents/", "/seo/", "/automations/", "gestructureerde FAQ's", "directe antwoorden"],
      ),
      p(
        "…sera beaucoup plus facilement compris qu'une landing page générique \"Agence IA\".",
        "…zal veel makkelijker begrepen worden dan een generieke \"AI-bureau\"-landingspagina.",
      ),
      h2("GEO et Belgique", "GEO en België"),
      p(
        "Le marché belge présente une opportunité particulière :",
        "De Belgische markt biedt een bijzondere kans:",
      ),
      ul(
        ["multilingue FR/NL,", "faible concurrence GEO,", "peu de sites structurés pour AI Search,", "beaucoup de PME encore peu visibles."],
        ["meertalig FR/NL,", "lage GEO-concurrentie,", "weinig sites gestructureerd voor AI Search,", "veel KMO's nog weinig zichtbaar."],
      ),
      h2("Conclusion", "Conclusie"),
      p(
        "Les moteurs IA favorisent les sites structurés, cohérents et spécialisés. Le GEO ne remplace pas le SEO : il devient une couche supplémentaire indispensable.",
        "AI-motoren bevoordelen gestructureerde, coherente en gespecialiseerde sites. GEO vervangt SEO niet: het wordt een onmisbare extra laag.",
      ),
    ],
    cta: {
      label: { fr: "Réserver un audit GEO", nl: "Boek een GEO-audit" },
      href: "/contact/",
    },
  },
  {
    slug: "chatgpt-vs-claude-for-business",
    publishedAt: "2026-05-19",
    meta: {
      title: {
        fr: "ChatGPT vs Claude pour entreprise | Banana Navy",
        nl: "ChatGPT vs Claude voor bedrijven | Banana Navy",
      },
      description: {
        fr: "Comparatif ChatGPT vs Claude pour entreprises : automatisation, agents IA, contexte, sécurité, RAG et workflows.",
        nl: "Vergelijking ChatGPT vs Claude voor bedrijven: automatisering, AI-agents, context, beveiliging, RAG en workflows.",
      },
    },
    title: {
      fr: "ChatGPT vs Claude pour entreprise",
      nl: "ChatGPT vs Claude voor bedrijven",
    },
    lead: {
      fr: "ChatGPT et Claude dominent aujourd'hui la plupart des projets IA entreprise. Pourtant, ils ne sont pas identiques.",
      nl: "ChatGPT en Claude domineren vandaag de meeste enterprise AI-projecten. Toch zijn ze niet identiek.",
    },
    blocks: [
      p("Le bon choix dépend :", "De juiste keuze hangt af van:"),
      ul(
        [
          "du contexte métier,",
          "du type de workflow,",
          "du volume documentaire,",
          "de la stabilité recherchée,",
          "du niveau d'autonomie demandé.",
        ],
        [
          "de bedrijfscontext,",
          "het type workflow,",
          "het documentvolume,",
          "de gezochte stabiliteit,",
          "het vereiste autonomieniveau.",
        ],
      ),
      h2(
        "Claude : excellent pour raisonnement et contexte",
        "Claude: uitstekend voor redenering en context",
      ),
      p("Claude performe particulièrement bien sur :", "Claude presteert bijzonder goed op:"),
      ul(
        [
          "longs documents,",
          "workflows complexes,",
          "analyse structurée,",
          "rédaction professionnelle,",
          "orchestration agentique.",
        ],
        [
          "lange documenten,",
          "complexe workflows,",
          "gestructureerde analyse,",
          "professionele redactie,",
          "agentische orchestratie.",
        ],
      ),
      h3("Points forts", "Sterke punten"),
      ul(
        [
          "Très bon contexte long",
          "Réponses souvent plus stables",
          "Excellent pour workflows multi-étapes",
          "Forte qualité rédactionnelle",
        ],
        [
          "Zeer goede lange context",
          "Vaak stabielere antwoorden",
          "Uitstekend voor multi-step workflows",
          "Sterke redactionele kwaliteit",
        ],
      ),
      h3("Limites", "Beperkingen"),
      ul(
        ["Tool calling parfois plus limité selon stack", "Écosystème plus jeune"],
        ["Tool calling soms beperkter afhankelijk van stack", "Jonger ecosysteem"],
      ),
      h2(
        "ChatGPT : excellent écosystème et polyvalence",
        "ChatGPT: uitstekend ecosysteem en veelzijdigheid",
      ),
      p("OpenAI reste très fort sur :", "OpenAI blijft zeer sterk op:"),
      ul(
        ["multimodal,", "tooling,", "APIs,", "ecosystem tooling,", "intégrations enterprise."],
        ["multimodaal,", "tooling,", "APIs,", "ecosysteem-tooling,", "enterprise-integraties."],
      ),
      h3("Points forts", "Sterke punten"),
      ul(
        ["Large écosystème", "Très bon support APIs", "Outils nombreux", "Forte adoption marché"],
        ["Breed ecosysteem", "Zeer goede API-ondersteuning", "Veel tools", "Sterke marktadoptie"],
      ),
      h3("Limites", "Beperkingen"),
      ul(
        ['Réponses parfois plus "marketing"', "Variabilité selon modèles"],
        ['Antwoorden soms meer "marketing"', "Variabiliteit naargelang model"],
      ),
      h2("Quel modèle pour quel cas ?", "Welk model voor welk geval?"),
      h3("Voice agents", "Voice agents"),
      p("Claude + Vapi fonctionne très bien pour :", "Claude + Vapi werkt zeer goed voor:"),
      ul(
        ["qualification,", "support,", "appels complexes."],
        ["kwalificatie,", "support,", "complexe oproepen."],
      ),
      h3("CRM automation", "CRM-automatisering"),
      p("GPT-4o reste très efficace pour :", "GPT-4o blijft zeer effectief voor:"),
      ul(
        ["extraction,", "classification,", "tool calling rapide."],
        ["extractie,", "classificatie,", "snelle tool calling."],
      ),
      h3("Multi-agent systems", "Multi-agent-systemen"),
      p(
        "Claude Sonnet est souvent excellent pour orchestration et workflows longs.",
        "Claude Sonnet is vaak uitstekend voor orchestratie en lange workflows.",
      ),
      h2(
        "Faut-il choisir un seul fournisseur ?",
        "Moet je één leverancier kiezen?",
      ),
      p("Non.", "Nee."),
      p(
        "Les architectures modernes deviennent souvent :",
        "Moderne architecturen worden vaak:",
      ),
      ul(
        ["multi-models,", "multi-providers,", "provider-agnostic."],
        ["multi-models,", "multi-providers,", "provider-agnostic."],
      ),
      h2("Ce que fait Banana Navy", "Wat Banana Navy doet"),
      p("Nous concevons des architectures modulaires :", "We ontwerpen modulaire architecturen:"),
      ul(
        ["Claude,", "OpenAI,", "Mistral,", "modèles open-source,"],
        ["Claude,", "OpenAI,", "Mistral,", "open-source modellen,"],
      ),
      p(
        "…selon les contraintes métier et budget.",
        "…afhankelijk van zakelijke en budgettaire beperkingen.",
      ),
      h2("Conclusion", "Conclusie"),
      p(
        "Le meilleur modèle dépend moins de la hype que du workflow réel. Les entreprises gagnent surtout lorsqu'elles construisent une architecture flexible capable d'évoluer avec les modèles.",
        "Het beste model hangt minder af van hype dan van de echte workflow. Bedrijven winnen vooral wanneer ze een flexibele architectuur bouwen die kan evolueren met de modellen.",
      ),
    ],
    cta: {
      label: { fr: "Parler de votre stack IA", nl: "Spreek over je AI-stack" },
      href: "/contact/",
    },
  },
  {
    slug: "why-most-ai-pocs-fail",
    publishedAt: "2026-05-19",
    meta: {
      title: {
        fr: "Pourquoi 80 % des POC IA échouent | Banana Navy",
        nl: "Waarom 80 % van AI-POC's faalt | Banana Navy",
      },
      description: {
        fr: "Pourquoi la majorité des projets IA restent bloqués au stade POC et comment construire des systèmes IA réellement utilisables.",
        nl: "Waarom de meeste AI-projecten geblokkeerd blijven in de POC-fase en hoe echt bruikbare AI-systemen te bouwen.",
      },
    },
    title: {
      fr: "Pourquoi 80 % des POC IA échouent",
      nl: "Waarom 80 % van AI-POC's faalt",
    },
    lead: {
      fr: "La plupart des projets IA produisent une démo impressionnante… puis ne passent jamais en production.",
      nl: "De meeste AI-projecten produceren een indrukwekkende demo… en gaan nooit naar productie.",
    },
    blocks: [
      p(
        "Le problème n'est généralement pas le modèle IA lui-même. Le problème vient de :",
        "Het probleem is meestal niet het AI-model zelf. Het probleem komt van:",
      ),
      ul(
        [
          "workflows mal définis,",
          "absence de données,",
          "manque de fallback,",
          "architecture fragile,",
          "absence d'objectif métier clair.",
        ],
        [
          "slecht gedefinieerde workflows,",
          "afwezigheid van data,",
          "gebrek aan fallback,",
          "fragiele architectuur,",
          "afwezigheid van een duidelijk bedrijfsdoel.",
        ],
      ),
      h2("Le piège de la démo", "De demo-valkuil"),
      p(
        "Beaucoup de POC sont construits pour impressionner :",
        "Veel POC's worden gebouwd om te imponeren:",
      ),
      ul(
        ['chatbot "wow",', "résumé automatique,", "génération texte spectaculaire."],
        ['"wow"-chatbot,', "automatische samenvatting,", "spectaculaire tekstgeneratie."],
      ),
      p("Mais sans :", "Maar zonder:"),
      ul(
        ["intégration CRM,", "logs,", "validation humaine,", "process métier,", "monitoring,"],
        ["CRM-integratie,", "logs,", "menselijke validatie,", "bedrijfsproces,", "monitoring,"],
      ),
      p("…le système ne tient pas.", "…houdt het systeem het niet."),
      h2(
        "Les vrais problèmes arrivent en production",
        "De echte problemen komen in productie",
      ),
      h3("Cas hors périmètre", "Cases buiten scope"),
      p("Les utilisateurs posent des questions imprévues.", "Gebruikers stellen onverwachte vragen."),
      h3("Données sales", "Vuile data"),
      p(
        "CRM incomplet, doublons, informations manquantes.",
        "Onvolledige CRM, duplicaten, ontbrekende informatie.",
      ),
      h3("Workflow cassé", "Gebroken workflow"),
      p(
        "L'agent répond bien… mais rien n'est envoyé au bon outil.",
        "De agent antwoordt goed… maar er wordt niets naar de juiste tool gestuurd.",
      ),
      h3("Hallucinations", "Hallucinaties"),
      p("Sans garde-fous, l'agent improvise.", "Zonder guardrails improviseert de agent."),
      h2("Ce qui fonctionne réellement", "Wat echt werkt"),
      h3("Commencer petit", "Klein beginnen"),
      p("Un seul workflow clair :", "Eén enkele duidelijke workflow:"),
      ul(
        ["qualification lead,", "prise RDV,", "routing support."],
        ["leadkwalificatie,", "afspraakboeking,", "support-routing."],
      ),
      h3("Mesurer", "Meten"),
      ul(
        ["appels traités,", "temps gagné,", "leads convertis,", "tickets réduits."],
        ["behandelde oproepen,", "tijdwinst,", "geconverteerde leads,", "minder tickets."],
      ),
      h3("Garder un humain", "Een mens behouden"),
      p("Les meilleurs systèmes IA gardent :", "De beste AI-systemen behouden:"),
      ul(
        ["validation,", "escalade,", "supervision."],
        ["validatie,", "escalatie,", "supervisie."],
      ),
      h2(
        "Pourquoi les systèmes modulaires gagnent",
        "Waarom modulaire systemen winnen",
      ),
      p("Les modèles changent vite.", "Modellen veranderen snel."),
      p("Une bonne architecture doit permettre :", "Een goede architectuur moet toelaten:"),
      ul(
        ["changer fournisseur,", "remplacer modèle,", "modifier workflow,", "ajouter agents."],
        ["leverancier te wisselen,", "model te vervangen,", "workflow aan te passen,", "agents toe te voegen."],
      ),
      h2("Ce que fait Banana Navy", "Wat Banana Navy doet"),
      p("Nous privilégions :", "We verkiezen:"),
      ul(
        ["audit rapide,", "sprint build,", "déploiement contrôlé,", "logs,", "évolution progressive."],
        ["snelle audit,", "sprint build,", "gecontroleerde uitrol,", "logs,", "geleidelijke evolutie."],
      ),
      h2("Conclusion", "Conclusie"),
      p(
        "Les entreprises qui gagnent avec l'IA ne cherchent pas \"la grosse révolution\". Elles automatisent progressivement des workflows réels avec une architecture capable d'évoluer.",
        "Bedrijven die winnen met AI zoeken niet \"de grote revolutie\". Ze automatiseren geleidelijk echte workflows met een architectuur die kan evolueren.",
      ),
    ],
    cta: {
      label: { fr: "Réserver un audit IA", nl: "Boek een AI-audit" },
      href: "/contact/",
    },
  },
  {
    slug: "n8n-vs-make-vs-zapier",
    publishedAt: "2026-05-19",
    meta: {
      title: {
        fr: "n8n vs Make vs Zapier | Banana Navy",
        nl: "n8n vs Make vs Zapier | Banana Navy",
      },
      description: {
        fr: "Comparatif n8n, Make et Zapier pour automatisation IA et workflows entreprise.",
        nl: "Vergelijking n8n, Make en Zapier voor AI-automatisering en bedrijfsworkflows.",
      },
    },
    title: { fr: "n8n vs Make vs Zapier", nl: "n8n vs Make vs Zapier" },
    lead: {
      fr: "Zapier, Make et n8n dominent aujourd'hui le marché de l'automatisation no-code et low-code.",
      nl: "Zapier, Make en n8n domineren vandaag de markt van no-code en low-code automatisering.",
    },
    blocks: [
      p(
        "Mais ils ne répondent pas exactement aux mêmes besoins.",
        "Maar ze beantwoorden niet exact dezelfde behoeften.",
      ),
      h2("Zapier", "Zapier"),
      p("Zapier reste extrêmement simple à prendre en main.", "Zapier blijft uiterst eenvoudig in gebruik."),
      h3("Points forts", "Sterke punten"),
      ul(
        ["Très accessible", "Rapide à configurer", "Grand nombre d'intégrations"],
        ["Zeer toegankelijk", "Snel te configureren", "Groot aantal integraties"],
      ),
      h3("Limites", "Beperkingen"),
      ul(
        ["Coûts qui montent vite", "Moins flexible sur workflows complexes"],
        ["Kosten die snel oplopen", "Minder flexibel voor complexe workflows"],
      ),
      h2("Make", "Make"),
      p("Make offre un excellent équilibre :", "Make biedt een uitstekend evenwicht:"),
      ul(
        ["visuel,", "puissant,", "flexible."],
        ["visueel,", "krachtig,", "flexibel."],
      ),
      h3("Points forts", "Sterke punten"),
      ul(
        ["Interface claire", "Très bon pour PME", "Workflows avancés possibles"],
        ["Duidelijke interface", "Zeer goed voor KMO's", "Geavanceerde workflows mogelijk"],
      ),
      h3("Limites", "Beperkingen"),
      ul(["Complexité croissante sur gros systèmes"], ["Toenemende complexiteit bij grote systemen"]),
      h2("n8n", "n8n"),
      p(
        "n8n devient très populaire dans les architectures IA modernes.",
        "n8n wordt zeer populair in moderne AI-architecturen.",
      ),
      h3("Points forts", "Sterke punten"),
      ul(
        ["Self-hosted possible", "Très flexible", "Excellent pour AI workflows", "Contrôle avancé"],
        ["Self-hosted mogelijk", "Zeer flexibel", "Uitstekend voor AI-workflows", "Geavanceerde controle"],
      ),
      h3("Limites", "Beperkingen"),
      ul(
        ["Plus technique", "Maintenance plus importante"],
        ["Technischer", "Meer onderhoud"],
      ),
      h2("Quel outil choisir ?", "Welke tool kiezen?"),
      h3("PME simple", "Eenvoudige KMO"),
      p("Zapier ou Make.", "Zapier of Make."),
      h3("Automatisation avancée", "Geavanceerde automatisering"),
      p("Make ou n8n.", "Make of n8n."),
      h3("Agentic systems", "Agentic systems"),
      p("n8n devient souvent le meilleur choix.", "n8n wordt vaak de beste keuze."),
      h2("Ce que fait Banana Navy", "Wat Banana Navy doet"),
      p("Nous choisissons la stack selon :", "We kiezen de stack volgens:"),
      ul(
        ["volume,", "budget,", "sécurité,", "complexité,", "besoins IA futurs."],
        ["volume,", "budget,", "beveiliging,", "complexiteit,", "toekomstige AI-behoeften."],
      ),
      h2("Conclusion", "Conclusie"),
      p(
        "L'outil parfait n'existe pas. Le plus important reste l'architecture globale et la capacité du système à évoluer.",
        "De perfecte tool bestaat niet. Het belangrijkste blijft de globale architectuur en het vermogen van het systeem om te evolueren.",
      ),
    ],
    cta: {
      label: { fr: "Auditer vos workflows", nl: "Je workflows laten auditen" },
      href: "/contact/",
    },
  },
  {
    slug: "what-is-an-agentic-system",
    publishedAt: "2026-05-19",
    meta: {
      title: {
        fr: "Qu'est-ce qu'un système agentique ? | Banana Navy",
        nl: "Wat is een agentisch systeem? | Banana Navy",
      },
      description: {
        fr: "Comprendre les systèmes agentiques, workflows multi-agents et orchestration IA pour entreprises.",
        nl: "Begrijp agentische systemen, multi-agent workflows en AI-orchestratie voor bedrijven.",
      },
    },
    title: {
      fr: "Qu'est-ce qu'un système agentique ?",
      nl: "Wat is een agentisch systeem?",
    },
    lead: {
      fr: 'Le terme "agentic systems" devient central dans l\'IA moderne. Pourtant, beaucoup d\'entreprises confondent encore plusieurs notions :',
      nl: '"Agentic systems" wordt centraal in moderne AI. Toch verwarren veel bedrijven nog steeds verschillende begrippen:',
    },
    blocks: [
      ul(
        ["chatbot,", "automatisation,", "agent IA,", "système agentique."],
        ["chatbot,", "automatisering,", "AI-agent,", "agentisch systeem."],
      ),
      h2(
        "Un agent IA n'est pas juste un chatbot",
        "Een AI-agent is niet zomaar een chatbot",
      ),
      p("Un chatbot répond à des messages.", "Een chatbot antwoordt op berichten."),
      p("Un agent IA peut :", "Een AI-agent kan:"),
      ul(
        ["utiliser des outils,", "accéder à des données,", "exécuter des actions,", "déclencher des workflows."],
        ["tools gebruiken,", "data raadplegen,", "acties uitvoeren,", "workflows triggeren."],
      ),
      h2(
        "Qu'est-ce qu'un système agentique ?",
        "Wat is een agentisch systeem?",
      ),
      p(
        "Un système agentique coordonne plusieurs agents spécialisés avec :",
        "Een agentisch systeem coördineert meerdere gespecialiseerde agents met:",
      ),
      ul(
        ["rôles distincts,", "orchestration,", "mémoire,", "outils,", "supervision."],
        ["aparte rollen,", "orchestratie,", "geheugen,", "tools,", "supervisie."],
      ),
      h2("Exemple simple", "Eenvoudig voorbeeld"),
      pre(
        "Agent qualification\n→ Agent CRM\n→ Agent reporting\n→ Validation humaine\n→ Action finale",
        "Kwalificatie-agent\n→ CRM-agent\n→ Reporting-agent\n→ Menselijke validatie\n→ Finale actie",
      ),
      h2(
        "Pourquoi cette approche devient importante",
        "Waarom deze aanpak belangrijk wordt",
      ),
      p(
        "Les workflows entreprise deviennent trop complexes pour :",
        "Bedrijfsworkflows worden te complex voor:",
      ),
      ul(
        ["un seul prompt,", "un seul agent,", "une seule automatisation."],
        ["één enkele prompt,", "één enkele agent,", "één enkele automatisering."],
      ),
      p("Les architectures multi-agents permettent :", "Multi-agent architecturen laten toe:"),
      ul(
        ["spécialisation,", "stabilité,", "contrôle,", "évolutivité."],
        ["specialisatie,", "stabiliteit,", "controle,", "schaalbaarheid."],
      ),
      h2("Cas d'usage", "Use cases"),
      ul(
        [
          "Support client",
          "Qualification commerciale",
          "Reporting",
          "Routing",
          "Documentation",
          "Analyse",
          "CRM automation",
        ],
        [
          "Klantenservice",
          "Commerciële kwalificatie",
          "Reporting",
          "Routing",
          "Documentatie",
          "Analyse",
          "CRM-automatisering",
        ],
      ),
      h2("Ce qui change en 2026+", "Wat verandert in 2026+"),
      p("Le marché évolue :", "De markt evolueert:"),
      ul(
        ["des outils IA isolés,", "vers des infrastructures IA coordonnées."],
        ["van geïsoleerde AI-tools,", "naar gecoördineerde AI-infrastructuren."],
      ),
      p("Les entreprises qui gagnent construisent :", "De winnende bedrijven bouwen:"),
      ul(
        ["couches agentiques,", "orchestration,", "workflows autonomes supervisés."],
        ["agentische lagen,", "orchestratie,", "gesuperviseerde autonome workflows."],
      ),
      h2("Conclusion", "Conclusie"),
      p(
        "Les systèmes agentiques deviennent progressivement une nouvelle couche opérationnelle dans les entreprises modernes.",
        "Agentische systemen worden geleidelijk een nieuwe operationele laag in moderne bedrijven.",
      ),
    ],
    cta: {
      label: { fr: "Parler de votre architecture IA", nl: "Spreek over je AI-architectuur" },
      href: "/contact/",
    },
  },
];

export const ARTICLES_BY_SLUG: Record<string, ArticleContent> = Object.fromEntries(
  ARTICLES.map((a) => [a.slug, a]),
);
