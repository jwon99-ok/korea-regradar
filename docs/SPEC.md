# SPEC — 제품 · 범위 · 스택 · 디자인

> **Codename:** `korea-regradar`
> **One-liner (EN, 발표용):** Korea's industry regulations, foreign-ownership limits, and political landscape — decoded into English, in real time, for foreign founders and investors entering the Korean market.
> **한 줄 정의 (내부용):** 외국(동남아 등) 사업가·VC가 한국 진출 시 마주치는 규제·외국인 지분 제한·정치 지형을 영어로 실시간 제공하는 OSINT 대시보드.
> 변하지 않는 비전 문서. 빌드 규율은 `BUILD.md §0`, 데이터는 `DATA.md`, 화면은 `SCREENS.md`.

---

## 1. 제품 개요

### 1.1 문제 (1인칭 경험 + 심사위원 페인)
외국 founder·VC·주재원이 한국 진출 시 **산업별 규제, 외국인 지분 제한, 빠르게 바뀌는 입법·정치 지형**을 모른다. 정보가 (a) 전부 한국어, (b) 국회·부처·법제처에 흩어짐, (c) 정치 권력 구도와 연동돼 변동. 모든 진출 기업이 이걸 사람이 수동 추적한다 — 느리고 늘 뒤처진다. → 심사위원이 외국인이므로 이 페인에 즉시 공감한다.

### 1.1b 포지셔닝 (채점 대응)
- **챌린지 4 (AI-Native Organizations):** 기업의 규제 컴플라이언스라는 전통 워크플로우를 **AI 에이전트 기반 운영으로 전환**. = "traditional workflows → AI-powered, agent-driven, rapidly, at scale" 정의문과 일치.
- **B2B 시장성 (Market Value 25%):** 한국 진출 외국 기업·VC·로펌이 고객인 **B2B 컴플라이언스 SaaS.** 동일 에이전트가 베트남·인니 등 모든 규제 시장으로 스케일.
- **스폰서 기술 중심 (Innovation 30%):** Exa(discovery) + OpenAI(reasoning)가 게이지·신호등·브리프를 구동하는 **핵심 엔진**. 칠 한 겹이 아니라 제품의 심장.

### 1.2 핵심 가치 (데모에서 보여줄 것)
1. **Industry × foreign-ownership limit** — 산업별 외국인 지분 한도를 신호등으로 즉시(영어).
2. **Regulatory Risk Index** — DEFCON식 단일 게이지로 "이 산업, 지금 입법/규제 위험 온도".
3. **Political Landscape** — 국회 구성·정당 지형(규제가 "누구에 의해" 바뀌는지 맥락).
4. **AI compliance agent (★ 채점 30%)** — "Run agent" 버튼 → Exa가 최신 한국 규제 뉴스를 discover → OpenAI가 영어 요약 + 산업/리스크 분류 + 한국어 원문 병기 → 게이지·신호등에 반영.

### 1.3 데모 무기 (30초 후크)
- OSINT 상황실 다크 테마 + IBM Plex Mono 수치.
- **REGCON 게이지**(Pentagon Pizza/DEFCON 차용) — 반원 게이지가 차오르는 애니메이션.
- **Foreign-Ownership 신호등** — 산업별 녹/황/적 + %.
- **National Assembly Hemicycle**(HOI4 차용) — 300석 반원.
- **AI agent live** — "Run agent" 클릭 시 Exa+OpenAI가 한국 소스를 실시간 검색·영어 요약·리스크 재점수. "자동화된 에이전트가 일하는" 시연.

---

## 2. 범위 (해커톤)

### 2.1 IN SCOPE
- **국가: 대한민국.**
- **UI: 영어** (카드에 한국어 원문 병기).
- **화면 2개 필수 + 1개 스트레치:**
  1. **Regulatory Risk Index** (히어로) — `/`
  2. **Foreign Investment Explorer** — `/regulations`
  3. **Political Landscape** (스트레치) — `/political`
- **라이브 기능 1개** (스트레치, H6): Exa + OpenAI 영어 브리프.

### 2.2 OUT OF SCOPE (오늘 절대 안 함)
한국어 UI, 라이브 스크래핑 파이프라인, DB, 벡터 검색, 자체 백엔드 서버, 인증·결제, Prefect, Docker, 테스트 스위트, 4번째 화면 동시 진행.

---

## 3. 기술 스택 (해커톤 미니멀)

| 레이어 | 선택 | 비고 |
|---|---|---|
| 프레임워크 | **Next.js 15 (App Router) + TypeScript** | 단일 앱 |
| 스타일 | **Tailwind CSS + shadcn/ui** | 빠른 디자인 시스템 |
| 시각화 | **D3**(게이지·반원·force graph) + **Recharts**(스파크라인) | 핵심 후크 |
| 애니메이션 | **Framer Motion** | 게이지 차오름·트랜지션 |
| 데이터 | **정적 JSON**(`src/data/*.json`) | 백엔드 없음, 프론트 직접 import |
| 라이브(스트레치) | **Exa Search API + OpenAI API** | Next.js API 라우트(서버사이드) |
| 배포 | **Vercel** | `vercel --prod` 한 방 |
| 에디터 | Cursor(코드 손볼 때) + Claude Code(자율 빌드) | 주력은 Claude Code |

DB·Python·Docker 불필요. `pnpm` 사용.

---

## 6. 디자인 토큰 (`tokens.css` / globals.css)
```css
--bg:#0B0E14; --surface:#121722; --surface-2:#1A2130;
--text:#E6EDF3; --muted:#8B98A9; --border:#243044;
--accent:#4DA3FF;
--kr-color:#E4572E;   /* Korea accent */
--regcon-5:#2ECC71; --regcon-4:#A3CB38; --regcon-3:#F1C40F;
--regcon-2:#E67E22; --regcon-1:#E74C3C;
/* font: Inter(본문) / IBM Plex Mono(수치) */
```
- 무드: OSINT 상황실 / 인텔리전스 대시보드. 다크 우선, 고대비, 모노스페이스 수치, 절제된 네온 시그널.
- 색맹 대응: 신호등에 아이콘 병기. 카드마다 as-of date·출처.

> §4(데이터)는 `DATA.md`, §5(화면)은 `SCREENS.md`, §7~11(빌드/발표)은 `BUILD.md`에 있다.
