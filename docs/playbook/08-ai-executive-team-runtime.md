# System 8 — AI Executive Team runtime

Two surfaces, one set of charters.

## A — Local (Claude Code, for developers)

**Who:** any team member with a terminal + Claude Code + an Anthropic account.
**What they get:** auto-detected `/AgentsBN` slash command + the 5 chiefs callable via `/agents`.

**Setup (~5 min, once per machine):**

```bash
npm install -g @anthropic-ai/claude-code        # free CLI
git clone <repo-url> banana-navy-site
cd banana-navy-site
claude                                           # opens Claude Code in the project
```

**Usage:**

```
/AgentsBN                 # list chiefs + usage
/AgentsBN cmo "GOAL: ... CONTEXT: ... CONSTRAINTS: ... DOD: ..."
/AgentsBN parallel "snapshot of where the business stands this week"
/AgentsBN audit           # check charter compliance against System 8 Step 7
/AgentsBN help            # print the dispatch contract
```

Pros: parallel dispatch (run CMO + CRO + COO at the same time), full access to the repo's files (the agents can read `src/lib/content.ts`, `_data/*`, etc.), no per-turn cost when on Claude Pro.

Cons: requires a terminal and an Anthropic account.

## B — Web (browser, for non-tech and demo)

Two URLs once deployed:

| URL | Audience | Auth | Runtime |
| --- | --- | --- | --- |
| `/team/` | The 3 internal team members | HTTP Basic — shared password `BANANA_NAVY_TEAM_PASSWORD` | Claude Sonnet 4.6, 2 048 max_tokens, full charters |
| `/demo-agents/` | Prospects, public | None (rate-limited) | Claude Haiku 4.5, 700 max_tokens, sanitized charters, 6 turns per session |

The web runtime calls the same Anthropic API as Claude Code. It does NOT have filesystem access, so the chiefs work from text context only.

### Cost protection (already wired)

- Demo: Haiku model + 700 max_tokens + 6 turns / session (client) + 6 turns / request (server) + origin allowlist
- Team: Sonnet + 2 048 max_tokens + Basic auth
- Both: 8 000 chars / user-message cap server-side

### Deploy steps

After the first Cloudflare Pages deploy (System 9), set these env vars in **Pages → Settings → Variables and Secrets**:

```
ANTHROPIC_API_KEY=sk-ant-...
BANANA_NAVY_TEAM_PASSWORD=<long random string — share with the 3 team members>
PUBLIC_SITE_URL=https://banana-navy.com
```

Then redeploy (Pages will trigger automatically on env-var change). Test:

```bash
curl -i -u :"$PASSWORD" https://banana-navy.com/team/             # 200
curl -i https://banana-navy.com/team/                              # 401 (no auth)
curl -i https://banana-navy.com/demo-agents/                       # 200 (public)
```

### Sharing access with the 3 team members

1. Pick a strong password (1Password / Bitwarden suggested).
2. Set it as `BANANA_NAVY_TEAM_PASSWORD` in Cloudflare.
3. Share via your password manager (not Slack / email).
4. They visit `/team/`, browser asks for credentials — username can be anything (it's ignored), password is the one you set.

### When to upgrade auth

Once the team is past ~5 people, or you need an audit log of who briefed which chief: replace `functions/_middleware.js` with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/self-hosted-apps/) (free for first 50 users, ties to Google Workspace / Microsoft / OneLogin / email OTP). It's a 10-minute swap.

## Keeping charters in sync

Two sources of truth right now:

- `.claude/agents/*.md` — Claude Code reads these
- `functions/api/agents/_charters.js` — web runtime reads these

When you edit a charter, update both. The web ones are slightly trimmed (no front-matter, prose is paraphrased) so they're not byte-identical anyway. A sync script can be added when this drift becomes annoying.

## Cost ballpark (Belgian team, modest usage)

Assumptions:
- 3 team members, ~50 chief dispatches / week between them
- 1 000 prospect demo turns / month

| Component | Monthly cost |
| --- | --- |
| Team dispatches (Sonnet 4.6, ~10k tokens / dispatch) | ~$8 |
| Demo turns (Haiku 4.5, ~3k tokens / turn) | ~$2 |
| Cloudflare Pages + Functions | $0 (free tier) |
| **Total** | **~$10 / month** |

Anthropic API billed monthly to the account that owns `ANTHROPIC_API_KEY`. Set spend limits in the Anthropic Console.
