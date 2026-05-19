/**
 * Single source of truth for brand + business facts.
 * Anything that ends up in JSON-LD, llms.txt, the footer, or the contact page
 * reads from here so we cannot drift across surfaces.
 */

export type Locale = "fr" | "nl";

export const LOCALES: Locale[] = ["fr", "nl"];
export const DEFAULT_LOCALE: Locale = "fr";

export const SITE = {
  /** Override at deploy time with PUBLIC_SITE_URL. */
  url: (import.meta.env.PUBLIC_SITE_URL as string) || "https://banana-navy.pages.dev",
  legalName: "Banana Navy SRL",
  brandName: "Banana Navy",
  founded: "2021",
  vatNumber: "BE 0745.575.058",
  email: "hello@banana-navy.com",
  phone: "+32 71 49 40 11",
  address: {
    street: "Rue Antoine de Saint-Exupéry 2",
    postalCode: "6041",
    city: "Charleroi",
    region: "Hainaut",
    country: "BE",
    countryName: "Belgique",
    latitude: 50.4108,
    longitude: 4.4446,
  },
  social: {
    linkedin: "https://www.linkedin.com/company/banana-navy",
    github: "https://github.com/banana-navy",
  },
  defaultOgImage: "/og/default.png",
};

export const LOCALE_TAG: Record<Locale, string> = {
  fr: "fr-BE",
  nl: "nl-BE",
};

export const LOCALE_LABEL: Record<Locale, string> = {
  fr: "FR",
  nl: "NL",
};

/** Astro's configured base path (e.g. "/banana-navy-preview/" on GH Pages,
 *  "/" everywhere else). Astro auto-injects this at build time. */
const BASE = (import.meta.env.BASE_URL as string) || "/";

function withBase(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (BASE === "/") return clean;
  const trimmedBase = BASE.replace(/\/$/, "");
  return `${trimmedBase}${clean}`.replace(/\/+/g, "/");
}

/**
 * Build a locale-prefixed pathname (with Astro base path applied).
 * The default locale (fr) is unprefixed.
 *   localizedPath('fr', '/services/') === '<base>/services/'
 *   localizedPath('nl', '/services/') === '<base>/nl/services/'
 */
export function localizedPath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const localePart = locale === DEFAULT_LOCALE ? normalized : `/${locale}${normalized}`;
  return withBase(localePart);
}

/** Absolute URL for canonical / OG / sitemap.
 *  Pass either a raw route ("/services/") or an already-localized path.
 *  Auto-detects whether the base is already prefixed to avoid double-application. */
export function absoluteUrl(path: string): string {
  const siteBase = SITE.url.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  // If the path doesn't already start with our base, prefix it.
  const withBaseApplied =
    BASE === "/" || clean.startsWith(BASE) ? clean : withBase(clean);
  return `${siteBase}${withBaseApplied}`;
}

/** Prefix a static asset path with the base (use for src/href in markup). */
export function asset(path: string): string {
  return withBase(path);
}

/**
 * Strip Astro base path AND locale prefix so we can map any URL back to its
 * canonical route key.
 *   stripLocale('/banana-navy-preview/nl/services/') === '/services/'
 *   stripLocale('/nl/services/')                    === '/services/'
 *   stripLocale('/services/')                       === '/services/'
 */
export function stripLocale(path: string): string {
  let p = path;
  // Strip configured base first (e.g. "/banana-navy-preview/" on GH Pages)
  if (BASE !== "/" && p.startsWith(BASE)) {
    p = "/" + p.slice(BASE.length);
    p = p.replace(/\/+/g, "/");
  }
  for (const loc of LOCALES) {
    if (loc === DEFAULT_LOCALE) continue;
    if (p === `/${loc}` || p === `/${loc}/`) return "/";
    if (p.startsWith(`/${loc}/`)) return p.slice(`/${loc}`.length);
  }
  return p;
}
