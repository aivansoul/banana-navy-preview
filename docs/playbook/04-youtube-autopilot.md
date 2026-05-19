# System 4 — YouTube Autopilot

**Status:** Deferred until Banana Navy has an active Instagram or YouTube channel.

## When to revisit

Activate this system once **all three** are true:

1. Banana Navy has an Instagram business or creator account posting ≥ 2 videos / week.
2. There is a YouTube channel for the brand (free to create at <https://youtube.com>).
3. Someone owns content velocity for ≥ 3 months — the autopilot is downstream of having content to mirror, not a replacement for it.

## What we will build when activated

Two Node scripts (the Playbook uses Python — Node fits our existing toolchain):

| File | Job |
| --- | --- |
| `scripts/ig-to-queue.mjs` | Poll Instagram Graph API → download new Reels → use Claude to draft YouTube-optimised title / description / tags → write to `data/yt-queue.json` |
| `scripts/queue-to-youtube.mjs` | Read queue → upload each video as a YouTube Short → post a pinned CTA comment → mark uploaded |

Both run on a Cloudflare Worker cron every 6 hours once System 9 is fully wired.

## Required credentials (when ready)

```
META_APP_ID=
META_APP_SECRET=
INSTAGRAM_USER_ID=
INSTAGRAM_LONG_LIVED_TOKEN=
YOUTUBE_OAUTH_CLIENT_ID=
YOUTUBE_OAUTH_CLIENT_SECRET=
ANTHROPIC_API_KEY=
```

## Expected runtime cost

Under 1 €/month for Claude metadata generation. Instagram Graph API + YouTube Data API free tiers cover the volume of a typical agency channel.

## Hand-off note

When you're ready, drop me a line and I'll wire this in a single session — the prompts are already drafted in the original Playbook (System 4, Step 3).
