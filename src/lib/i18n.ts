import type { Locale } from "./site";

type Dict = {
  nav: {
    services: string;
    realisations: string;
    approche: string;
    lab: string;
    equipe: string;
    contact: string;
    audit_cta: string;
    // Mega-menu group label
    capabilities: string;
  };
  footer: {
    tagline: string;
    sections: { offers: string; company: string; resources: string; legal: string };
    legal: {
      mentions: string;
      privacy: string;
      cookies: string;
      llms: string;
    };
    rights: string;
  };
  common: {
    skip_to_content: string;
    open_menu: string;
    close_menu: string;
    lang_switcher_label: string;
  };
  routes: Record<string, string>;
};

const dict: Record<Locale, Dict> = {
  fr: {
    nav: {
      services: "Services",
      realisations: "Réalisations",
      approche: "Approche",
      lab: "Lab",
      equipe: "Équipe",
      contact: "Contact",
      audit_cta: "Audit gratuit →",
      capabilities: "Services",
    },
    footer: {
      tagline: "Architectes de la transformation IA · Charleroi, Belgique · Depuis 2021",
      sections: {
        offers: "Offres",
        company: "Entreprise",
        resources: "Ressources",
        legal: "Légal",
      },
      legal: {
        mentions: "Mentions légales",
        privacy: "Confidentialité",
        cookies: "Cookies",
        llms: "llms.txt",
      },
      rights: "Tous droits réservés",
    },
    common: {
      skip_to_content: "Aller au contenu",
      open_menu: "Ouvrir le menu",
      close_menu: "Fermer le menu",
      lang_switcher_label: "Langue",
    },
    routes: {
      home: "/",
      // Pillar/service categories — English slugs by design, FR copy.
      agentic_systems: "/agentic-systems/",
      voice_agents: "/voice-agents/",
      automations: "/automations/",
      create: "/create/",
      seo: "/seo/",
      // Editorial
      realisations: "/realisations/",
      approche: "/approche/",
      lab: "/lab/",
      equipe: "/equipe/",
      contact: "/contact/",
      faq: "/faq/",
      mentions: "/mentions-legales/",
      privacy: "/politique-confidentialite/",
      cgv: "/cgv/",
    },
  },
  nl: {
    nav: {
      services: "Diensten",
      realisations: "Realisaties",
      approche: "Aanpak",
      lab: "Lab",
      equipe: "Team",
      contact: "Contact",
      audit_cta: "Gratis audit →",
      capabilities: "Diensten",
    },
    footer: {
      tagline: "Architecten van de AI-transformatie · Charleroi, België · Sinds 2021",
      sections: {
        offers: "Diensten",
        company: "Bedrijf",
        resources: "Bronnen",
        legal: "Juridisch",
      },
      legal: {
        mentions: "Juridische vermeldingen",
        privacy: "Privacy",
        cookies: "Cookies",
        llms: "llms.txt",
      },
      rights: "Alle rechten voorbehouden",
    },
    common: {
      skip_to_content: "Ga naar inhoud",
      open_menu: "Menu openen",
      close_menu: "Menu sluiten",
      lang_switcher_label: "Taal",
    },
    // Shared URL slugs across locales — Dutch lives under /nl/ with the same
    // (English) service slugs. Editorial slugs stay FR for now; we can
    // localize them in a Phase 2 polish via Astro [...slug].astro.
    routes: {
      home: "/",
      agentic_systems: "/agentic-systems/",
      voice_agents: "/voice-agents/",
      automations: "/automations/",
      create: "/create/",
      seo: "/seo/",
      locations: "/locations/",
      realisations: "/realisations/",
      approche: "/approche/",
      lab: "/lab/",
      equipe: "/equipe/",
      contact: "/contact/",
      faq: "/faq/",
      mentions: "/mentions-legales/",
      privacy: "/politique-confidentialite/",
      cgv: "/cgv/",
    },
  },
};

export function t(locale: Locale): Dict {
  return dict[locale];
}
