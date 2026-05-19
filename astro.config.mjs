// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// Production site URL. Override at deploy time with PUBLIC_SITE_URL.
const SITE = process.env.PUBLIC_SITE_URL || "https://banana-navy.pages.dev";

// When deploying to GitHub Pages under aivansoul.github.io/<BASE>, the BASE
// env var is set by the workflow. Locally it's empty so the dev server runs
// at "/".
const BASE = process.env.BASE_PATH || "/";

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "nl"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "fr",
        locales: {
          fr: "fr-BE",
          nl: "nl-BE",
        },
      },
      // Skip api routes, the password-gated team area (would 401 for Googlebot),
      // and the interactive demo chat pages (no static content to index).
      filter: (page) =>
        !page.includes("/api/") &&
        !page.includes("/team/") &&
        !page.includes("/demo-agents/"),
      // Per Playbook System 3 Step 1 — priorities tell Google which pages
      // matter most. Auto-generated sitemaps that set everything to 0.5 are
      // wasted signal.
      serialize(item) {
        const url = new URL(item.url);
        const path = url.pathname;
        const stripped = path.replace(/^\/nl/, "") || "/";

        // Home
        if (stripped === "/") {
          item.priority = 1.0;
          item.changefreq = "weekly";
        }
        // Top-level service categories
        else if (
          /^\/(agentic-systems|voice-agents|automations|create|seo|locations)\/$/.test(
            stripped,
          )
        ) {
          item.priority = 0.9;
          item.changefreq = "weekly";
        }
        // Leaf service pages + city pages
        else if (
          /^\/(agentic-systems|voice-agents|automations|create|seo|locations)\/[^/]+\/$/.test(
            stripped,
          )
        ) {
          item.priority = 0.8;
          item.changefreq = "monthly";
        }
        // Editorial (approche, faq, contact, realisations index, equipe, lab)
        else if (
          /^\/(approche|faq|contact|realisations|equipe|lab)\/?$/.test(
            stripped.replace(/\/$/, "/"),
          )
        ) {
          item.priority = 0.8;
          item.changefreq = "monthly";
        }
        // Case study leaves + lab articles
        else if (/^\/(realisations|lab)\/[^/]+\/$/.test(stripped)) {
          item.priority = 0.7;
          item.changefreq = "monthly";
        }
        // Legal pages — necessary for compliance, low search priority
        else if (
          /^\/(mentions-legales|politique-confidentialite|cgv)\/$/.test(stripped)
        ) {
          item.priority = 0.3;
          item.changefreq = "yearly";
        } else {
          item.priority = 0.5;
          item.changefreq = "monthly";
        }
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
});
