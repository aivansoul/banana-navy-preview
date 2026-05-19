# System 9 — Cloudflare Pages deploy

## One-time setup (~15 min)

1. Push this folder to a GitHub repository (e.g. `banana-navy/banana-navy-site`).
2. Sign in at <https://dash.cloudflare.com> (free tier).
3. **Workers & Pages → Create application → Pages → Connect to Git**.
4. Pick the repository.
5. Build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: leave empty (or set if the repo nests this folder)
   - **Node version**: 20 or higher
6. **Environment variables** (Production):
   ```
   PUBLIC_SITE_URL = https://banana-navy.com    # or your final domain
   RESEND_API_KEY  = (after Resend.com signup)
   NOTIFY_TO       = hello@banana-navy.com
   NOTIFY_FROM     = site@banana-navy.com
   ```
7. Deploy. First build typically completes in ~90 seconds.
8. Add your custom domain at **Pages project → Custom domains**. Cloudflare gives you the DNS records to paste at your registrar (or auto-configures if Cloudflare is your registrar).

## What's already wired

| File | Purpose |
| --- | --- |
| `public/_headers` | Sets `Content-Type: text/plain` for `.md`, `.txt`. Plus long cache for `/_astro/*`. Plus security headers. |
| `functions/api/contact.js` | Pages Function that handles the contact form. Reads `RESEND_API_KEY`, `NOTIFY_TO`, `NOTIFY_FROM`, `CRM_WEBHOOK_URL` from Cloudflare env. Returns 200 to the user even if email fails (so we don't expose provider outages). |
| `astro.config.mjs` | `site` defaults to `https://banana-navy.pages.dev` but is overridden by `PUBLIC_SITE_URL` at build time. |

## After first deploy

1. Verify `https://<your-domain>/llms.txt` returns text and lists the right URLs.
2. Verify `https://<your-domain>/sitemap-index.xml` is reachable.
3. Submit `https://<your-domain>/sitemap-index.xml` to Google Search Console (System 3 Step 3).
4. Trigger one test contact form submission. Check your inbox.
5. Test the FR + NL home pages from a mobile device.

## Adding R2 storage (Playbook Step 4) — optional Phase 2

Only needed when we want to store case-study assets, design proofs, or signed contracts. Skip until there's a real use-case.

## Scheduled Workers — Phase 4

Once Systems 6/7 (CRM) are wired, a Cloudflare Worker will run the
nightly lead-scanner cron. Wrangler config will live at the repo root
when we get there (`wrangler.toml`). For now this is intentionally
absent — premature plumbing rots.
