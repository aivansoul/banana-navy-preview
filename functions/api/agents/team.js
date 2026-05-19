/**
 * POST /api/agents/team
 *
 * Auth-gated endpoint for the 3-member Banana Navy team. Returns a streaming
 * response from one of the 5 chief charters.
 *
 * Auth: HTTP Basic. Set BANANA_NAVY_TEAM_PASSWORD in Cloudflare Pages
 * Variables. The username is ignored (single shared password model — switch
 * to Cloudflare Access for per-user auth when the team grows).
 *
 * Body: { agent: "chief-of-staff" | ..., messages: [{role, content}, ...] }
 */

import { TEAM_CHARTERS, TEAM_MODEL, TEAM_MAX_TOKENS } from "./_charters.js";
import { streamChat, readJson, validateMessages } from "./_anthropic.js";

export async function onRequestPost({ request, env }) {
  // 1. Auth — single shared password via HTTP Basic.
  const authError = checkBasicAuth(request, env);
  if (authError) return authError;

  // 2. Validate body.
  const body = await readJson(request);
  if (!body) return json({ error: "Invalid JSON" }, 400);

  const charter = TEAM_CHARTERS[body.agent];
  if (!charter) {
    return json({ error: `Unknown agent: ${body.agent}` }, 400);
  }

  const msgError = validateMessages(body.messages);
  if (msgError) return json({ error: msgError }, 400);

  // 3. Anthropic key check.
  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) return json({ error: "ANTHROPIC_API_KEY not configured" }, 500);

  // 4. Stream the response.
  return streamChat({
    apiKey,
    model: TEAM_MODEL,
    maxTokens: TEAM_MAX_TOKENS,
    system: charter,
    messages: body.messages,
  });
}

function checkBasicAuth(request, env) {
  const expected = env.BANANA_NAVY_TEAM_PASSWORD;
  if (!expected) {
    return json({ error: "BANANA_NAVY_TEAM_PASSWORD not configured" }, 500);
  }
  const header = request.headers.get("authorization") || "";
  if (!header.startsWith("Basic ")) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "www-authenticate": 'Basic realm="Banana Navy Team", charset="UTF-8"',
      },
    });
  }
  let decoded;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
  const [, password] = decoded.split(":");
  if (password !== expected) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "www-authenticate": 'Basic realm="Banana Navy Team", charset="UTF-8"',
      },
    });
  }
  return null;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
