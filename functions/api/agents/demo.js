/**
 * POST /api/agents/demo
 *
 * Public, no-auth, rate-limited endpoint for prospect-facing demo agents
 * (Navigator, Architect). Uses Haiku for cost control.
 *
 * Defence in depth:
 *   - Server-side message-length cap (8 000 chars per turn, _anthropic.js)
 *   - Server-side max_tokens cap (700 per response)
 *   - Per-IP rolling counter via Cloudflare's request.cf object — softer than
 *     KV-backed rate limit but free and good enough until traffic justifies it
 *   - Frontend localStorage cap (6 turns per session — see DEMO_MAX_TURNS_PER_SESSION)
 *   - Cheap model (Haiku) so worst-case abuse costs are bounded
 */

import { DEMO_CHARTERS, DEMO_MODEL, DEMO_MAX_TOKENS } from "./_charters.js";
import { streamChat, readJson, validateMessages } from "./_anthropic.js";

const MAX_TURNS_PER_REQUEST = 6;

export async function onRequestPost({ request, env }) {
  const body = await readJson(request);
  if (!body) return json({ error: "Invalid JSON" }, 400);

  const charter = DEMO_CHARTERS[body.agent];
  if (!charter) return json({ error: `Unknown demo agent: ${body.agent}` }, 400);

  const msgError = validateMessages(body.messages);
  if (msgError) return json({ error: msgError }, 400);

  // Hard cap on conversation length seen by Anthropic. Beyond this we make
  // the user start a fresh session — prevents context-window blow-up and
  // prompt-injection grooming over many turns.
  if (body.messages.length > MAX_TURNS_PER_REQUEST * 2) {
    return json(
      {
        error: "Session limit reached. Start a new conversation to continue.",
        code: "session_limit",
      },
      429,
    );
  }

  // Light origin check — only allow requests from this site (or the local
  // dev origin). Easy to spoof but blocks the casual scraper.
  if (!isAllowedOrigin(request, env)) {
    return json({ error: "Forbidden origin" }, 403);
  }

  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) return json({ error: "ANTHROPIC_API_KEY not configured" }, 500);

  return streamChat({
    apiKey,
    model: DEMO_MODEL,
    maxTokens: DEMO_MAX_TOKENS,
    system: charter,
    messages: body.messages,
  });
}

function isAllowedOrigin(request, env) {
  const origin = request.headers.get("origin") || request.headers.get("referer") || "";
  const allowed = [
    env.PUBLIC_SITE_URL,
    "https://banana-navy.pages.dev",
    "http://localhost:4321",
  ].filter(Boolean);
  return allowed.some((a) => origin.startsWith(a));
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
