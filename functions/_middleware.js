/**
 * Pages Function middleware — gates /team/* with HTTP Basic auth.
 *
 * Cloudflare runs this for every request hitting the Pages project,
 * including static asset requests. We only enforce auth on the team
 * area; everything else passes through.
 *
 * When the team grows, swap this for Cloudflare Access (free for the
 * first 50 users, supports SSO, audit log, per-user policies).
 */

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // Public surface — anything outside /team/.
  if (!url.pathname.startsWith("/team")) {
    return next();
  }

  const expected = env.BANANA_NAVY_TEAM_PASSWORD;
  if (!expected) {
    return new Response(
      "BANANA_NAVY_TEAM_PASSWORD not configured. Set it in Cloudflare Pages → Settings → Variables.",
      { status: 500 },
    );
  }

  const header = request.headers.get("authorization") || "";
  if (!header.startsWith("Basic ")) return challenge();

  let password;
  try {
    [, password] = atob(header.slice(6)).split(":");
  } catch {
    return challenge();
  }

  if (password !== expected) return challenge();

  return next();
}

function challenge() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "www-authenticate": 'Basic realm="Banana Navy Team", charset="UTF-8"',
    },
  });
}
