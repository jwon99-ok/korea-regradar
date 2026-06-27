# BUILD — 실행 프로토콜 · 시간표 · Unit 프롬프트 · 발표

> 빌드 규율과 순서. 화면은 `SCREENS.md`, 데이터는 `DATA.md`, 제품/스택은 `SPEC.md`.

---

## §-1. 채점 기준 (모든 결정의 기준 — Build2026)

> **Build2026 = Proof of Work 해커톤.** VC·생태계·스타트업 파트너가 인재·아이디어를 스카우팅한다. → "작동하는 데모 + VC가 투자하고 싶은 아이디어"가 목표.

| 기준 | 가중치 | 질문 | 우리 대응 |
|---|---|---|---|
| **Innovation & 스폰서 기술 활용** | **30%** | 스폰서 툴(OpenAI/Codex, Exa…)이 **중심적·발명적**으로 쓰였나, 그냥 칠 한 겹인가? | **H6(Exa+OpenAI)를 제품 심장으로** — 게이지·신호등·브리프를 구동하는 엔진 |
| Proof of Work — Functionality | 25% | 실제로 작동하나? 데모 가능한 빌드를 냈나? | 데모 우선 전략. 작동 80% > 완벽 100% |
| Problem fit & Market Value | 25% | 진짜 유저의 진짜 문제? 상업성? 스케일 채택? | **B2B 컴플라이언스 SaaS** — 한국 진출 외국기업 = 고객 |
| Design, Craft & Taste | 20% | 목적의식·세련됨? 직관적 UX? | OSINT 다크 테마 + 디자인 토큰 일관성 |

**전략 함의:**
- 30%가 스폰서 기술이다 → **H6는 스트레치가 아니라 핵심 필수.** H2와 동급.
- "VC 스카우팅" → 발표에 **B2B/시장성 각도** 명시 (§10).
- "개인적으로 경험한 문제" 강조됨 → 발표 오프닝에 **1인칭 경험담** (§10).

---

## §0. 실행 프로토콜 (Claude Code 해커톤판)

> ⚠️ 원본의 TDD·커버리지·컴플라이언스 게이트는 오늘 전부 무시. 그건 프로덕션 문서다.

1. **데모가 전부.** 모든 결정은 "5시 데모 화면에 보이는가?"로 판단.
2. **UI 언어 = 영어.** 카드엔 한국어 원문(source_ko) 병기 → "1차 출처에서 직접 가져와 영어로 옮겼다"는 신뢰성.
3. **수직 슬라이스 우선.** 화면 1개 완성하고 다음. 4개 동시 진행 금지.
4. **테스트 작성 금지(오늘).** TDD·VCR·Storybook·커버리지 전부 스킵.
5. **백엔드·DB·스크래퍼·파이프라인 없음.** Postgres/Redis/FastAPI/Prefect/Docker/Python 안 씀. 정적 JSON 시드.
   - **예외:** Next.js API 라우트 2개 (Exa·OpenAI 서버사이드, `H6`).
6. **우선순위 컷.** 밀리면 §9 순서대로 가차없이 버림. 화면 1개 완벽 > 화면 3개 어설픔.
7. **사실성 라벨 유지.** 카드마다 출처 링크 + as-of date. 검증 안 된 정치 데이터는 "analytical interpretation".

**Unit = 1 커밋.** 끝나면 `PROGRESS.md` 갱신 + 커밋 + (가능하면) Vercel 푸시.
**DoD (모든 Unit):** `pnpm dev` 에러 없이 렌더 / 시드 데이터가 실제로 보임 / 커밋 성공.

---

## §7. 시간표 (10:00–17:00)

| 시간 | 작업 |
|---|---|
| 10:00–11:30 | `H0` 스캐폴드 + `H1` 시드 데이터 (한국 실데이터) |
| 11:30–13:30 | `H2` 히어로(RegRisk 게이지) **완벽하게** |
| 13:30–15:00 | `H6` **에이전트(Exa+OpenAI) — 핵심 (채점 30%)** |
| 15:00–16:00 | `H3` Foreign Investment Explorer + 지분 신호등 |
| 16:00–16:30 | `H4` 폴리시 + Vercel 배포 |
| 16:30–17:00 | **§12 제출물 5종**: deck·영상·repo public·소셜포스트 |

> ⚠️ **16:30에 빌드를 무조건 멈춘다.** 제출물에 30분 통째 확보. 작동 80% + 제출 완료 > 완벽 100% + 제출 누락.
> `H5`(정치 지형)는 시간 남을 때만. `H6`은 더 이상 스트레치가 아니다(채점 30% = 스폰서 기술 중심 활용).
> 13:30에 히어로 안 끝났으면 H6에 집중하고 H3/H5를 줄인다 — H6 > H3 우선순위.

---

## §8. Claude Code 빌드 Unit + 프롬프트

> 한 번에 하나씩. 작업 전 `PROGRESS.md` 확인, 후 갱신.

### H0 — 스캐폴드
```
docs/SPEC.md §3·§6을 읽어라.
Next.js 15(App Router, TypeScript) + Tailwind + shadcn/ui 앱을 스캐폴드.
디자인 토큰을 globals.css의 CSS 변수로, 다크 OSINT 테마 전역 적용
(Inter 본문, IBM Plex Mono 수치). UI 언어는 영어. 상단 네비에 3개 라우트
(/, /regulations, /political) 자리만. 백엔드·DB·테스트 만들지 마라.
pnpm dev로 빈 셸이 다크 테마로 뜨면 끝. PROGRESS.md 갱신, 커밋하고 멈춰라.
```

### H1 — 시드 데이터
```
docs/DATA.md의 스키마대로 src/data/ 아래 industries.json, fdi_limits.json,
regulations.json, risk.json, political.json을 만들어라. DATA.md의 실데이터
시드를 그대로 채우되, 한국 12개 산업 전체와 규제/법안 카드 10건, 산업별 위험
점수를 채워라. fdi_limits는 DATA.md §4.2 값(telecom 49%, broadcasting 49%,
aviation 49%, news_media 25%, power 30%, defense 0% 등) 그대로. 모든 항목에
source_url·needs_verification 포함. 타입은 src/types.ts. 화면은 아직 안 만든다.
PROGRESS.md 갱신, 커밋하고 멈춰라.
```

### H2 — 히어로: Regulatory Risk Index
```
docs/SCREENS.md §5.1을 읽어라. / 라우트에 Regulatory Risk Index 화면.
- D3 반원 게이지 RegconGauge(0–100). 산업 선택 시 risk.json 점수까지
  Framer Motion으로 차오르고 색이 REGCON 단계색으로.
- RegconBadge("2 · Elevated"), IndustrySelector(영어 칩), RiskSparkline(Recharts),
  TriggerFeed("Why now?" 이벤트+원문링크), ScoreBreakdown(기여 바).
- 상단 GlobalDisclaimer(영어). 데이터는 risk.json import.
게이지가 데모의 핵심 후크다. 시각적으로 인상적으로.
PROGRESS.md 갱신, 커밋하고 멈춰라.
```

### H3 — Foreign Investment Explorer
```
docs/SCREENS.md §5.2를 읽어라. /regulations 라우트.
IndustryFilter(영어 칩)+RegTypeChips+SearchBar(텍스트 필터).
RegulationCard: 타입 배지·영어 제목/요약 + 한국어 원문(source_ko) 병기·단계·상태·
OwnershipSignalLight(녹/황/적 + cap%)·출처 링크·VerificationBadge.
산업 필터 시 카드와 신호등 즉시 갱신. regulations.json·fdi_limits.json import.
지분 신호등이 킬러다. PROGRESS.md 갱신, 커밋하고 멈춰라.
```

### H4 — 폴리시
```
전 화면에 호버 카드, Framer Motion 트랜지션, 색맹 대응 신호등 아이콘,
모바일 반응형(그래프 단순화), 깔끔한 빈/로딩 상태를 더해라.
시각 완성도에만 집중. PROGRESS.md 갱신, 커밋하고 멈춰라.
```

### H6 — 핵심 (채점 30%): AI 컴플라이언스 에이전트 (Exa + OpenAI)
> **이건 스트레치가 아니다. 제품의 심장이다.** 스폰서 툴이 "칠 한 겹"이 아니라 "중심 엔진"으로 보여야 30% 항목을 먹는다.
```
규제 카드와 게이지 화면에 "Run agent" 버튼을 추가.
app/api/agent/route.ts 서버 라우트를 만들어 — 단순 검색→요약을 넘어 에이전트답게:
1) Exa Search API로 선택 산업의 최신 한국 규제/입법 뉴스를 discover.
2) OpenAI API로: (a) 영어 3줄 요약, (b) 어느 산업·어느 리스크 항목에 영향인지
   분류, (c) 한국어 원문 인용 1개 + 출처 URL 반환. JSON 구조화 출력.
3) 그 분류 결과가 게이지/신호등에 "에이전트가 방금 갱신함"으로 반영되게.
키는 .env.local의 EXA_API_KEY, OPENAI_API_KEY에서 서버사이드로만 사용
(클라이언트 노출 금지). 프론트는 이 라우트만 fetch.
UI: 버튼 누르면 "Agent searching Korean sources… analyzing… scoring…" 진행
상태 텍스트를 1초라도 보여줘 — "자동화된 에이전트"라는 인상이 핵심.
★ 반드시: 산업별로 미리 한 번 호출한 응답을 src/data/agent_cache.json에 저장,
라이브 실패(네트워크/rate limit) 시 캐시로 폴백. 데모 중 빈 화면 절대 금지.
PROGRESS.md 갱신, 커밋하고 멈춰라.
```

### H5 — 스트레치 (시간 남을 때만, 컷 1순위): 국회 반원
```
docs/SCREENS.md §5.3. /political에 D3 Hemicycle(국회 300석 반원, 정당색,
호버 카드)와 BlocPowerBars(여/야). political.json import. AnalystSourcePanel에
"analytical interpretation" 라벨 필수. PROGRESS.md 갱신, 커밋하고 멈춰라.
```

---

## §9. 컷 순서 (시간 밀릴 때 버리는 순서)
1. `/political`(H5) 전체 — **제일 먼저 버림.**
2. force graph(있다면).
3. `ScoreBreakdown` 바.
4. 모바일 반응형.
5. (최후) H6 라이브 호출 자체 → **캐시(agent_cache.json)만으로 시연.** 호출은 끊되 에이전트 출력은 그대로 보여줌.

**절대 안 버림:** H2 게이지(히어로), **H6 에이전트(채점 30%)**, 외국인 지분 신호등, 다크 OSINT 테마, 한국어 원문 병기, 출처/검증 배지.
> H6는 캐시 폴백으로 *시연 방식만* 바꿀 수 있을 뿐, 기능 자체를 컷하면 30% 항목이 무너진다. 끝까지 살린다.

---

## §10. 발표 프레이밍 (외국인 심사위원 + VC 대상)

> 채점: Innovation/스폰서 30% · Proof of Work 25% · Market Value 25% · Design 20%.
> 박을 키워드: **agent, AI-native, workflow, Exa, OpenAI, B2B, scale, commercially viable.**

1. **Hook — 1인칭 경험담 (15s):** "I watched foreign founders get blocked entering Korea — by regulations, ownership limits, and bills they literally couldn't read, all in Korean. Every company hires someone to track this manually. It's slow and always behind."
2. **The product as an agent (10s):** "RegRadar replaces that compliance workflow with an AI agent — powered end-to-end by Exa for discovery and OpenAI for reasoning."
3. **Hero demo (25s):** 산업 바꾸며 게이지 차오름 → "Telecom: REGCON 2, Elevated. Why?" → **Run agent 버튼** → "The agent just searched Korean sources, summarized in English, and re-scored the risk — live."
4. **Killer feature (20s):** Explorer 지분 신호등 → "E-commerce: 100%, green. Telecom: 49%, capped. Defense: restricted, red. At a glance, in English."
5. **Trust (10s):** "Every card shows the Korean source quote and a link. The agent doesn't infer facts — it cites them."
6. **Market / VC close (15s):** "This is a B2B compliance tool. Every foreign company entering Korea is a customer, and the same agent scales to any regulated market — Vietnam, Indonesia, anywhere the regulatory information gap blocks founders."

---

## §12. 제출물 5종 (16:30–17:00 — 빌드만큼 중요, 누락 시 실격)

> ⚠️ 빌드를 16:30에 멈추고 이거에 30분 통째 쓴다. 작동하는 제품 만들고도 제출 누락하면 끝.

1. **Pitch deck 링크** — Canva 5장: 문제(1인칭) / 솔루션(에이전트) / 데모 스크린샷 / 기술(Exa+OpenAI 중심) / 시장(B2B·스케일). 막판에 빠르게.
2. **Public repo 링크** — ⚠️ **public 필수.** push 전 `.env.local`이 `.gitignore`에 있는지 **반드시 확인**(키 노출 사고 주의). `gh repo edit --visibility public`.
3. **Demo video 링크** — 화면 녹화 30~60초 + 영어 내레이션. §10 흐름대로. 게이지·Run agent·신호등 보여주기.
4. **Live website URL** — Vercel 배포 주소.
5. **소셜 포스트** — X / IG / LinkedIn 라이브 포스트. **태그 필수 4개:** `#supcareer #build2026 #hackathon #PetaniAI` (스크린샷 + Vercel 링크 첨부).

---

## §11. 데모 체크리스트 (제출 전 — PROGRESS.md와 동기화)
- [ ] Vercel URL이 폰·노트북에서 열린다.
- [ ] 히어로 게이지가 산업 전환 시 부드럽게 차오른다.
- [ ] **Run agent 버튼**이 작동하고, "searching… analyzing… scoring…" 진행 상태가 보인다.
- [ ] 지분 신호등 녹/황/적 명확히 구분.
- [ ] 모든 카드에 한국어 원문 + 출처 링크 + 검증 배지.
- [ ] 에이전트 라이브 실패해도 `agent_cache.json` 폴백으로 출력이 뜬다.
- [ ] 콘솔 에러 없음.
- [ ] 영어 발표 스크립트 1회 이상 리허설.
- [ ] **제출물 5종 준비** (§12).
