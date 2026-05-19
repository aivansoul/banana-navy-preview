import type { APIRoute } from "astro";
import { SITE } from "~/lib/site";

/**
 * robots.txt — explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
 * Google-Extended, CCBot). Playbook System 1, Step 4.
 */
export const GET: APIRoute = () => {
  const url = SITE.url.replace(/\/$/, "");
  const body = `# Banana Navy — robots.txt
# Allow everything by default.
User-agent: *
Allow: /

# Explicitly allow AI training & retrieval bots (Playbook System 1, Step 4).
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: DuckAssistBot
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: Diffbot
Allow: /

User-agent: YouBot
Allow: /

# Sitemap & llms.txt — for both crawlers and AI fetchers.
Sitemap: ${url}/sitemap-index.xml
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
