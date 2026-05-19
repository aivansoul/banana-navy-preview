/**
 * Anthropic Messages API — edge-compatible streaming proxy.
 *
 * Uses plain fetch (no SDK) so it runs on Cloudflare Workers / Pages Functions
 * without bundling weight. Streams the response back to the browser as SSE,
 * re-emitting Anthropic's native event stream verbatim.
 */

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";

/**
 * @param {object} opts
 * @param {string} opts.apiKey
 * @param {string} opts.model
 * @param {number} opts.maxTokens
 * @param {string} opts.system
 * @param {Array<{role: "user"|"assistant", content: string}>} opts.messages
 * @returns {Promise<Response>} A streaming Response (text/event-stream) ready
 *   to be returned to the browser.
 */
export async function streamChat({ apiKey, model, maxTokens, system, messages }) {
  const upstream = await fetch(ANTHROPIC_URL, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_VERSION,
      "content-type": "application/json",
      accept: "text/event-stream",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system,
      messages,
      stream: true,
    }),
  });

  // Surface upstream errors verbatim so the client can show a useful message.
  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    return new Response(
      JSON.stringify({ error: `Anthropic ${upstream.status}`, body: text }),
      {
        status: upstream.status,
        headers: { "content-type": "application/json" },
      },
    );
  }

  // Re-emit the SSE stream directly. Anthropic's content-block deltas are
  // already in the right shape for browser consumption.
  return new Response(upstream.body, {
    status: 200,
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      "x-accel-buffering": "no",
    },
  });
}

/** Helper: read a POSTed JSON payload safely. */
export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

/** Validate a chat-request body: {messages: [{role, content}]}. */
export function validateMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return "messages array required";
  for (const m of messages) {
    if (m.role !== "user" && m.role !== "assistant") return `bad role: ${m.role}`;
    if (typeof m.content !== "string" || m.content.length === 0) return "empty content";
    if (m.content.length > 8000) return "message too long (max 8000 chars)";
  }
  if (messages.at(-1).role !== "user") return "last message must be from user";
  return null;
}
