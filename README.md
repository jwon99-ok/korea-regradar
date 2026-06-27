<div align="center">

<br />

# 🇰🇷 Korea RegRadar

### Korean regulation, decoded into English for foreign investors and startup founders — in real time.

*Industry regulations, foreign-ownership limits, and the political landscape, made legible for foreign founders and investors entering the Korean market.*

<br />

[![Build2026](https://img.shields.io/badge/Build2026-Proof_of_Work-7C3AED?style=for-the-badge)](https://github.com/jwon99-ok/korea-regradar)
[![Live Demo](https://img.shields.io/badge/▶_Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://korea-regradar.vercel.app/)
[![Demo Video](https://img.shields.io/badge/▶_Demo_Video-FF0000?style=for-the-badge&logo=googledrive&logoColor=white)](https://drive.google.com/file/d/16JDXlqRPY2gcQyNklgejO-_hbfahJ6MJ/view?usp=sharing)
[![Pitch Deck](https://img.shields.io/badge/📊_Pitch_Deck-E4572E?style=for-the-badge)](https://www.canva.com/design/DAHNvuzPocE/x-Th0KCchx1_WcUch8Y3Ug/view)

<br />

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![D3](https://img.shields.io/badge/D3.js-F9A03C?style=flat-square&logo=d3dotjs&logoColor=white)
![Exa](https://img.shields.io/badge/Exa_Search-1A1A1A?style=flat-square)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)

</div>

---

## The problem

As an intern at a venture-building company bridging Southeast Asia and South Korea, I kept watching foreign founders get blocked entering Korea — not by the market, but by **information they couldn't read**. Industry regulations, foreign-ownership caps, and pending legislation are all in Korean, scattered across the National Assembly, ministries, and the legal portal, and they shift with the political landscape.

Every company entering Korea hires someone to track this **by hand**. It's slow, expensive, and always behind.

## The solution

**Korea RegRadar replaces that manual compliance workflow with an AI agent.** It monitors primary Korean sources, translates and structures them into English, and scores regulatory risk per industry — turning a human research task into an automated, agent-driven operation.

A **B2B compliance tool**: every foreign company, VC, or law firm entering Korea is a customer — and the same agent architecture scales to any regulated market across Southeast Asia (Vietnam, Indonesia, and beyond) where the regulatory information gap blocks founders.

---

## What it does

| | Feature | |
|:--:|:--|:--|
| 🎯 | **Regulatory Risk Index** | A single DEFCON-style gauge (*REGCON*) showing how hot regulatory risk is for each industry, right now. |
| 🚦 | **Foreign-Ownership Signal Lights** | Foreign equity caps at a glance — 🟢 open 100% · 🟡 capped · 🔴 restricted. Each backed by its Korean legal basis. |
| 🤖 | **AI Compliance Agent** | Powered by **Exa** (discovery) + **OpenAI** (reasoning): searches live Korean regulatory news, summarizes it in English, and re-scores the risk — with the Korean source quote cited. |
| 🏛️ | **Political Landscape** | The 22nd National Assembly's composition and bloc power — the *why* behind regulatory shifts. |

> Every card shows the **Korean source quote + a link**. The agent cites facts — it doesn't infer them.

---

## How it works

---

## How it works
```
Exa Search  ──▶  primary Korean sources (Assembly bills, ministry filings, news)

│

▼

OpenAI  ──▶  English summary · industry classification · risk scoring

│

▼

Dashboard  ──▶  REGCON gauge · ownership signal lights · live brief

```

Sponsor technology is the **core engine, not a coat of paint** — the gauge, signal lights, and live brief are all driven by the Exa + OpenAI agent pipeline.

---

## Tech stack

**Frontend** — Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · D3 · Recharts · Framer Motion

**AI / Data** — Exa Search API · OpenAI API · curated seed data from primary Korean sources

**Deploy** — Vercel · **Built with** — Cursor · Claude Code

---

## Run locally

```bash
pnpm install

cp .env.example .env.local      # add EXA_API_KEY and OPENAI_API_KEY
                                # (used server-side only — never exposed to the client)
pnpm dev                        # → http://localhost:3000
```

The live agent falls back to cached responses if keys are absent, so the dashboard renders fully without them.

---

## Data sources

| Source | Used for |
|:--|:--|
| [Invest Korea](https://www.investkorea.org/) · Foreign Investment Promotion Act | Foreign-ownership caps by industry |
| [National Assembly Bill Information](https://likms.assembly.go.kr/) | Pending bills / legislative status |
| [Korea Law Information Center](https://law.go.kr/) | Regulation source text |
| Korean news *(via Exa)* | Live regulatory signals |

Verified sources link directly to the law (e.g. law.go.kr deep links); unverified entries are labelled **"Needs verification"** rather than guessed. Political seat counts are sourced from public records; interpretation is labelled **"analytical interpretation."**

---

<div align="center">

**Built for Build2026** — a Proof-of-Work hackathon.

Designed and directed by me, built with Claude Code as an AI pair-builder in a single day.

`#supcareer` · `#build2026` · `#hackathon` · `#PetaniAI`

</div>
