import { SITE, absoluteUrl, type Locale, LOCALE_TAG } from "./site";

/**
 * JSON-LD builders. One function per schema.org type we emit.
 * Every helper returns a plain object — the <SchemaJsonLd> component
 * stringifies it inside <script type="application/ld+json">.
 */

const ORG_ID = `${SITE.url}#org`;

export function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: SITE.brandName,
    legalName: SITE.legalName,
    url: SITE.url,
    foundingDate: SITE.founded,
    email: SITE.email,
    telephone: SITE.phone,
    vatID: SITE.vatNumber,
    logo: absoluteUrl("/banana-navy-logo.svg"),
    image: absoluteUrl(SITE.defaultOgImage),
    description:
      "Architectes de systèmes IA modulaires. On installe les systèmes IA qui travaillent à votre place — pensés pour évoluer avec la tech, sans devenir obsolètes à 12 mois.",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.address.latitude,
      longitude: SITE.address.longitude,
    },
    areaServed: [
      { "@type": "Country", name: "Belgium" },
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Luxembourg" },
      { "@type": "Country", name: "Netherlands" },
    ],
    knowsLanguage: ["fr-BE", "nl-BE", "en"],
    sameAs: [SITE.social.linkedin, SITE.social.github].filter(Boolean),
  };
}

export function webPage(opts: {
  url: string;
  title: string;
  description: string;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": opts.url,
    url: opts.url,
    name: opts.title,
    description: opts.description,
    inLanguage: LOCALE_TAG[opts.locale],
    isPartOf: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

export function service(opts: {
  name: string;
  description: string;
  url: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.category || "AI implementation",
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "Country", name: "Belgium" },
      { "@type": "Country", name: "France" },
    ],
  };
}

export function faqPage(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function breadcrumb(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function article(opts: {
  url: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author?: string;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: opts.image ? absoluteUrl(opts.image) : absoluteUrl(SITE.defaultOgImage),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    inLanguage: LOCALE_TAG[opts.locale],
    author: { "@type": "Organization", "@id": ORG_ID, name: opts.author || SITE.brandName },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: opts.url,
  };
}

export function localBusinessForCity(opts: {
  cityName: string;
  postalCode: string;
  lat: number;
  lon: number;
  url: string;
  description: string;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": opts.url + "#org",
    name: `${SITE.brandName} — ${opts.cityName}`,
    parentOrganization: { "@id": ORG_ID },
    url: opts.url,
    description: opts.description,
    inLanguage: LOCALE_TAG[opts.locale],
    image: absoluteUrl(SITE.defaultOgImage),
    address: {
      "@type": "PostalAddress",
      addressLocality: opts.cityName,
      postalCode: opts.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: opts.lat,
      longitude: opts.lon,
    },
    areaServed: {
      "@type": "City",
      name: opts.cityName,
    },
    knowsLanguage: ["fr-BE", "nl-BE", "en"],
    telephone: SITE.phone,
    email: SITE.email,
  };
}

export function caseStudy(opts: {
  url: string;
  client: string;
  title: string;
  description: string;
  industry: string;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: opts.title,
    name: opts.title,
    about: { "@type": "Thing", name: opts.industry },
    description: opts.description,
    creator: { "@id": ORG_ID },
    inLanguage: LOCALE_TAG[opts.locale],
    mainEntityOfPage: opts.url,
    keywords: [opts.client, opts.industry, "case study", "AI transformation"].join(", "),
  };
}
