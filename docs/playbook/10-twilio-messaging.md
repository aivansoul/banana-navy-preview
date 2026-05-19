# System 10 — Twilio messaging layer

**Status:** Deferred until Svetlana provisions a Twilio account.

## Why we wait

Twilio is per-message billing — there's nothing to pre-configure without an account, a verified sender identity, and a real EU phone number. Building a Twilio integration before those exist creates dead code.

## What's required to flip the switch

1. Twilio account at <https://twilio.com>. Free trial credit covers the first ~30 days of tests.
2. **Belgian SMS sender regulations** — unlike the US, Belgium does **not** require A2P 10DLC registration. The relevant regime is the EU eCommerce Directive + GDPR consent, which our `politique-confidentialite` page already covers. Twilio's "Alphanumeric Sender ID" is typically allowed for transactional + opt-in marketing in Belgium.
3. Twilio phone number — €1/month for an EU mobile number that can both receive and send SMS, and receive voice.
4. Verified sender identity for the Alphanumeric Sender ID (BANANA-NAVY or similar).

## When ready

```
TWILIO_ACCOUNT_SID=
TWILIO_API_KEY_SID=
TWILIO_API_KEY_SECRET=
TWILIO_FROM_NUMBER=+32...
TWILIO_SENDER_ID=BANANA-NAVY
TWILIO_VOICE_WEBHOOK=https://banana-navy.com/api/voice/incoming
```

These go into Cloudflare Pages → Variables once we deploy.

## Build plan when activated

| Phase | Deliverable | Lives in |
| --- | --- | --- |
| 1 | `scripts/send-sms.mjs` — CLI to send one-off SMS via Twilio | `scripts/` |
| 2 | `functions/api/voice/incoming.js` — Pages Function with TwiML for inbound call handling (greet → route by hour-of-day → voicemail with transcription) | `functions/api/voice/` |
| 3 | `functions/api/voice/conversation.js` — ConversationRelay endpoint for the AI Receptionist voice agent | `functions/api/voice/` |
| 4 | Post-call intelligence webhook → pushes transcript + sentiment + outcome to the CRM | scheduled Worker |
| 5 | Reactivation SMS campaign script (reads stale leads from CRM, drafts personalised message, throttles to 30 msg/s, honours STOP) | `scripts/` |

## Cost estimate

For a typical small-business volume (≤ 1 000 SMS + ≤ 200 inbound voice minutes / month):
- SMS: ~€10
- Voice inbound: ~€2
- Number rental: €1
- Total: **~€15 / month** — replaces the €150-330 / month Belgian SaaS stack the Playbook describes.
