<div align="center">

# Korea RegRadar

**Korea's regulations, foreign-ownership limits, and political landscape — decoded into English, in real time, for foreign founders and investors entering the Korean market.**

[![Build2026](https://img.shields.io/badge/Build2026-Hackathon-7C3AED?style=flat-square)](https://github.com)
[![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Exa](https://img.shields.io/badge/Exa-Search_API-1A1A1A?style=flat-square)](https://exa.ai)
[![OpenAI](https://img.shields.io/badge/OpenAI-Reasoning-412991?style=flat-square&logo=openai&logoColor=white)](https://openai.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

[**Live Demo**](#) · [**Demo Video**](#) · [**Pitch Deck**](#)

</div>

> ⚠️ Replace the three links above with your Vercel URL, video link, and deck link before submitting.

---

## The Problem

I've watched foreign founders get blocked entering Korea — not by the market, but by **information they literally couldn't read**. Korea's industry regulations, foreign-ownership caps, and pending legislation are all in Korean, scattered across the National Assembly, ministries, and the legal portal, and they shift with the political landscape.

Today, every company entering Korea hires someone to track this **by hand**. It's slow, expensive, and always behind.

## The Solution

Korea RegRadar replaces that manual compliance workflow with an **AI agent**. It monitors primary Korean sources, translates and structures them into English, and scores regulatory risk per industry — turning a human research task into an automated, agent-driven operation.

**This is a B2B compliance tool.** Every foreign company, VC, or law firm entering Korea is a customer — and the same agent scales to any regulated market (Vietnam, Indonesia, anywhere the regulatory information gap blocks founders).

---

## What it does

- **🎯 Regulatory Risk Index** — A single DEFCON-style gauge ("REGCON") showing how hot legislative & regulatory risk is for each Korean industry, right now.
- **🚦 Foreign-Ownership Signal Lights** — Industry-by-industry foreign equity caps at a glance: green (open 100%), amber (capped %), red (restricted). Sourced from the Foreign Investment Promotion Act.
- **🤖 AI Compliance Agent** — Powered end-to-end by **Exa** (discovery) + **OpenAI** (reasoning): searches the latest Korean regulatory news live, summarizes it in English, and re-scores the risk — with the Korean source quote cited alongside.
- **🏛️ Political Landscape** — National Assembly composition and bloc power, providing the *why* behind regulatory shifts.

Every card shows the **Korean source quote + a link**. The agent cites facts — it doesn't infer them.

---

## Tech Stack

**Frontend** · Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · D3 (gauge / hemicycle) · Recharts · Framer Motion

**AI / Data** · Exa Search API (live discovery) · OpenAI API (English summarization, classification, scoring) · curated seed data from primary Korean sources

**Deploy** · Vercel

Sponsor technology is the core engine, not a coat of paint: the gauge, signal lights, and live brief are all driven by the Exa + OpenAI agent pipeline.

---

## Run locally

```bash
# 1) install
pnpm install

# 2) add API keys (see .env.example)
cp .env.example .env.local
#   EXA_API_KEY=...
#   OPENAI_API_KEY=...
#   (keys are used server-side only, never exposed to the client)

# 3) dev
pnpm dev          # http://localhost:3000
```

> The live agent feature falls back to cached responses if keys are absent, so the dashboard renders fully without them.

---

## Data sources

| Source | Used for |
|---|---|
| [Invest Korea](https://www.investkorea.org/) · Foreign Investment Promotion Act | Foreign-ownership caps by industry |
| [National Assembly Bill Information](https://likms.assembly.go.kr/) (Open API) | Pending bills / legislative status |
| [Korea Law Information Center](https://law.go.kr/) | Regulation source text |
| Korean news (via Exa) | Live regulatory signals |

All regulatory and political data is shown with its source link and an as-of date. Unverified political interpretation is labeled "analytical interpretation."

---

## Built for Build2026

A Proof-of-Work hackathon project, designed and directed by the team and built with Claude Code as an AI pair-builder in a single day. The full production architecture (multi-source ingestion pipeline, pgvector semantic search, automated translation) is documented in [`SPEC_FULL.md`](./SPEC_FULL.md) as the scaling vision beyond this demo.

`#supcareer #build2026 #hackathon #PetaniAI`
