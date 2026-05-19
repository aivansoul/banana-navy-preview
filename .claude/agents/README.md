# Banana Navy — AI Executive Team

Playbook System 8. Each `.md` file in this folder is a callable Claude Code subagent. They run in their own context window, so they keep the main conversation lean.

## Dispatching

From this project's Claude Code session:

```
> Spawn the chief-of-staff agent. Give it this brief: …
```

Or in parallel:

```
> Spawn my CMO, CRO and COO in parallel. Each writes a 5-bullet brief from its lane. After all three return, the chief of staff synthesises.
```

## Roster

| Agent | Owns | Does NOT own |
| --- | --- | --- |
| `chief-of-staff` | Strategic routing, weekly review, cross-lane prioritisation | Direct execution, marketing campaigns, CRM ops, code |
| `chief-marketing-officer` | Brand, content calendar, audience growth, partnerships, SEO/GEO direction | Closing deals, billing, operations |
| `chief-revenue-officer` | Pipeline integrity, conversion rate, sales cycle, win/loss, hot inbound | Product delivery, brand decisions, capital |
| `chief-operating-officer` | Calendar, vendor uptime, SOPs, dashboard health, integration QA | Strategy, marketing, finance |
| `chief-financial-officer` | P&L, AR, capital allocation, pricing strategy, Profit First | Marketing spend (partner with CMO), operational vendors |

## Dispatch contract (use this format)

Always brief an agent with four blocks:

```
GOAL:        what success looks like
CONTEXT:     the data the agent needs to read first
CONSTRAINTS: hard limits (time, scope, money, tone)
DEFINITION OF DONE: the shape of the output you want back
```

## Safety defaults

- Audit agents are **read-only**. They read files / APIs and report. They never modify.
- Drafting agents are **draft-only**. They produce content for human review. They never send.
- Anything that spends money over €X, sends to a customer, or deletes data must escalate back to you.

These rules are baked into every charter. Tighten them as you build trust.
