# Banana Navy — Site

Production site for **Banana Navy SRL** (Charleroi, BE). Built with Astro,
deployed on Cloudflare Pages, following the Claude Code Business Playbook.

## What's in here

| Path | Why |
| --- | --- |
| `src/pages/` | FR routes (default locale, unprefixed) |
| `src/pages/nl/` | Dutch mirror |
| `src/pages/llms.txt.ts` | Playbook System 1 — AI recommendation file |
| `src/pages/nl/llms.txt.ts` | NL llms.txt |
| `src/pages/robots.txt.ts` | Allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot |
| `src/lib/site.ts` | Single source of truth for brand + business facts |
| `src/lib/content.ts` | Shared FR/NL content for sections (services, FAQ, etc.) |
| `src/lib/schema.ts` | JSON-LD builders (Org, WebPage, Service, FAQPage, Article, BreadcrumbList, CaseStudy) |
| `src/lib/i18n.ts` | Locale dicts + nav/footer strings |
| `src/styles/base.css` | Ported from the original `styles.css` (Immopolis base) |
| `src/styles/banana-navy.css` | Ported from `bn-styles.css` (yellow accent, hero) |
| `src/components/HeroParticles.client.ts` | three.js hero — loaded as an island when the hero enters the viewport |
| `scripts/generate-markdown-mirrors.mjs` | Playbook System 2 — generates `index.md` next to every built page |
| `public/_headers` | Cloudflare Pages config — serves `.md`, `.txt`, `robots.txt` as `text/plain` |
| `public/banana-navy-logo.svg` | Brand SVG |

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # builds to dist/ and generates markdown mirrors
npm run preview  # serve the dist/ output locally
```

## Deploy (Cloudflare Pages)

1. Push this folder to a GitHub repo.
2. In Cloudflare → Pages → Create a project → Connect to Git.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set `PUBLIC_SITE_URL` to the production URL (e.g. `https://banana-navy.com`).
6. After first deploy: add the custom domain, then submit `https://yourdomain.com/sitemap-index.xml` to Google Search Console.

## What ships per page (the GEO surface)

Every page emits:

- `<title>` + `<meta name="description">`
- `<link rel="canonical">`
- `hreflang` pair for `fr-BE` and `nl-BE` + `x-default`
- Open Graph + Twitter card meta
- `geo.region` / `geo.placename` / `geo.position` / `ICBM`
- `<link rel="alternate" type="text/markdown">` pointing at its `index.md`
- JSON-LD: `ProfessionalService` (org) + `WebPage` + page-specific blocks
- A `index.md` mirror next to it, served as `text/plain`

## Phase status

Phase 0 — Scaffold ✓ (this commit). Real brand, real clients, real FAQs ported.
Phases 1–4 — see `/Users/svetlanatotolina/.claude/plans/users-svetlanatotolina-downloads-the-cl-glimmering-catmull.md`.
