# 빌드 진행 상태

> 매 작업 시작 시 이 파일부터 읽는다. 매 Unit 종료 시 체크 + 로그 갱신.

## 체크리스트
- [x] **H0** 스캐폴드 (Next.js 15 + Tailwind + shadcn + 디자인 토큰 + 다크 셸/네비)
- [x] **H1** 시드 데이터 (`src/data/*.json`, 한국 실데이터)
- [x] **H2** 히어로: Regulatory Risk Index 게이지 ★
- [x] **H6** AI 컴플라이언스 에이전트 (Exa+OpenAI) ★ ← 채점 30%, 핵심
- [x] **H3** Foreign Investment Explorer + 지분 신호등 ★
- [x] **H4** 폴리시 (트랜지션·호버·검증 배지·반응형)
- [x] **H5** 국회 반원 — 스트레치 (컷 1순위)

★ = 절대 안 버리는 핵심

## 제출물 5종 (16:30–17:00, 누락 시 실격)
- [ ] Pitch deck 링크 (Canva 5장)
- [ ] Public repo 링크 (⚠️ public 전환 + `.env.local` gitignore 확인)
- [ ] Demo video 링크 (30~60초, 영어 내레이션)
- [ ] Live website URL (Vercel)
- [ ] 소셜 포스트 (X/IG/LinkedIn) + 태그 `#supcareer #build2026 #hackathon #PetaniAI`

## 데모 필수 (제출 전 최종 확인)
- [ ] Vercel URL이 폰·노트북에서 열린다
- [ ] 히어로 게이지가 산업 전환 시 부드럽게 차오른다
- [ ] 지분 신호등 녹/황/적 명확히 구분
- [ ] 모든 카드에 한국어 원문 + 출처 링크 + 검증 배지
- [ ] (H6) 라이브 실패해도 캐시 폴백으로 brief가 뜬다
- [ ] 콘솔 에러 없음
- [ ] 영어 발표 스크립트 1회 이상 리허설

---

## 로그
> 클로드가 Unit 끝낼 때마다 한 줄씩 추가. 형식: `[시각] Hx — 완료 내용 / 막힌 점`

- (예) `[10:25] H0 — 스캐폴드 완료, 다크 테마 적용. shadcn init 시 경로 별칭 @/* 확인.`
- `[16:40] H5 — Political Landscape(/political) 완성. 단순 의석차트 아님 — "정치지형→규제전망" 연결. (1) Hemicycle: political.json seats(DP170/PPP108/Rebuilding+others22=300)를 D3+trig로 11링 반원 300점 배치(src/lib/hemicycle.ts: 링 반지름∝용량, 라운딩 보정, angle순 정렬로 정당 연속 wedge). 호버 시 같은 정당 강조·타정당 dim, 범례 호버 연동, 중앙 "300 SEATS". (2) ★핵심 RegulationOutlook "What this means for regulation": readMajority(blocs)로 최대블록 DP-aligned 188석(63%)=151과표결·180신속처리선 초과·200미만 → 구조적 함의 1~2문장(seat arithmetic는 사실, 함의는 needs_verification 라벨). regulations.json pending bills 2건(telecom easing/fintech restrictive)을 billDirection(요약 키워드 분류)+billOutlook으로 연결: restrictive=Passable on bloc lines(단일블록 통과가능), easing=Uncertain(자유화는 초당적 합의 필요). 정당입장 사실단정 금지·"구조적 함의"로만 서술 명시. (3) BlocPowerBars: d3-scale로 0~300 트랙+151/180 점선 임계선(라벨 상하 stagger로 겹침해소). GlobalDisclaimer+political.disclaimer_en+Open Assembly 출처. tsc/build 클린(/political static prerendered), 헤드리스 스크린샷 검증 — 반원 녹/적/회 명확, 188블록 바가 fast-track선 통과·PPP 미달, outlook 칩 정상. / 막힌 점: 없음. (참고: blocs 합 296=DP188+PPP108, seats 합 300 — bloc은 해석적 그룹핑이라 정상, hemicycle은 seats 3정당으로 그림.)`
- `[12:15] H3 — Foreign Investment Explorer 완성. app/regulations/page.tsx를 placeholder ScreenStub→ExplorerScreen 라우트로 교체(industries/fdi_limits/regulations JSON 정적 임포트, 타입 캐스트). ExplorerScreen: IndustryFilter 칩(전12+all)·OwnershipSignalLight 그리드(전체 3컬, 선택 시 1산업 lg)·RegulationCard 그리드(industry/reg_type/free-text 검색 필터, framer-motion 전환). ★지분 신호등★ 3램프 stoplight + 활성 램프 글로우, 색맹대응(램프위치+아이콘+라벨 동시): open_100 녹/capped 황/prohibited 적. 카드마다 한국어 source_ko + legal_basis + VerificationBadge(verified/needs-verification) + as-of + Source 링크. pnpm build 클린(tsc OK, /regulations static prerendered 200), 콘솔 에러 0. 헤드리스 크롬으로 신호등 스크린샷 검증 — 녹/황/적 명확히 구분(E-commerce/Fintech 100% 녹, Telecom/Broadcasting/Air 49% 황, News 25% 황, Power 30% 황, Defense 0% 적). / 막힌 점: claude-in-chrome MCP screenshot가 이 환경에서 document_idle 45s 타임아웃으로 계속 실패(javascript_tool·navigate는 정상, readyState=complete 확인). dev HMR 의심해 prod server로도 동일 → MCP 스크린샷 우회하고 /Applications/Google Chrome.app --headless --screenshot로 캡처(H2와 동일 패턴).`
- `[14:40] H6 — ★핵심★ AI 에이전트(Exa+OpenAI) 완성. 빌드 전 Exa·OpenAI 라이브 1회 호출로 응답형식 확인(Exa 200·한국뉴스 반환·publishedDate 없음→옵셔널 처리 / OpenAI gpt-4o-mini json_object 200). app/api/agent/route.ts(서버전용, runtime nodejs): Exa로 산업별 한국 규제뉴스 discover→OpenAI로 영어3줄요약+리스크항목 분류+한국어 원문인용+출처 JSON. 키는 process.env에서만(클라 노출 0), 프론트는 /api/agent만 fetch. RunAgentButton("searching…→analyzing→scoring" 진행텍스트)+AgentBrief 패널, 게이지에 impact delta 반영(72→77, "agent +5 · was 72")+트리거 갱신. ★폴백: scripts/build-agent-cache.mjs로 12산업 실호출→src/data/agent_cache.json 캐시. 키 없을 때 라이브 실패→cache 폴백(검증: source=cache, HTTP200), cache miss시 risk.json synth. CDP로 실제 버튼클릭 스크린샷 검증 OK, tsc/build 클린. / 막힌 점: (1) d3 때처럼 없음. (2) Next16은 같은 디렉토리 2번째 dev server 거부→폴백 테스트는 메인 dev 끄고 빈 키로 재기동해 확인.`
- `[16:10] H4 — 폴리시. (1) AgentBrief: 한국어 인용문 바로 아래 그 인용문 자체의 영어 번역을 작은 muted italic 캡션("…" — translation)으로 추가 — 위 summary_en 3줄과 중복 아님(인용문 1:1 번역). 타입 korean_quote.text_en? 추가 → agent-core 프롬프트에 text_en 필드+규칙, normalizeBrief 통과, route.ts synthFromSeed는 trigger.title_en을 번역으로, agent_cache.json 12산업 전부 text_en 채움. 라이브 호출 확인 OK(source=live, text_en 반환). (2) risk.json 트리거 Source 점검: 12개 전부 퍼블리셔 홈페이지(hankyung/yna 루트 URL)였음 — 실 기사 아님 → RiskTrigger.needs_verification 필드 추가하고 홈페이지는 true. TriggerFeed에 VerificationBadge 표시 + 링크 라벨을 "Source"→"Publisher"로 정직화(needs_verification 시). 날짜는 전부 2026이라 옛날 링크 문제는 없음. (3) 전반 폴리시: IndustrySelector hover:border-border(노옵) → hover:border-accent/40 수정, explorer Chip/IndustrySelector/RunAgentButton에 focus-visible ring 추가, OwnershipSignalLight 카드에 hover:border-accent/40 + transition. tsc/build 클린, 헤드리스 스크린샷으로 트리거 배지·Publisher 링크 확인. / 막힌 점: 없음. 인용 캡션은 인터랙션(버튼클릭) 필요해 정적 스크린샷 대신 /api/agent 직접 호출로 text_en 검증.`
- `[12:10] H2 — 히어로 RegRisk 게이지 완성. / 라우트: RegconGauge(반원 게이지, d3-scale로 score→angle, SVG 스트로크 아크 + framer-motion pathLength로 차오름, REGCON 단계색·글로우·tip마커, 중앙 count-up 숫자), RegconBadge("2·Elevated"+status), IndustrySelector(영어 칩 12개), RiskSparkline, TriggerFeed(한국어 source_ko 병기+출처 링크), ScoreBreakdown(애니 바), GlobalDisclaimer. 헤드리스 크롬 스크린샷으로 시각 확인 — 인상적. 빌드/런타임 클린, 3 라우트 200. / 막힌 점: (1) d3-scale가 pnpm strict에서 미해결→`d3` 대신 `d3-scale` 직접 설치. (2) Recharts ResponsiveContainer가 스파크라인에 다크박스 아티팩트→커스텀 SVG 스파크라인으로 교체(spec의 "sparkline" 충족, 더 깔끔). 산업 전환 색/점수 변화는 데이터 기반 결정적이라 telecom(주황2)만 시각확인.`
- `[11:20] H1 — 시드 데이터 완료. src/types.ts(전 타입 + REGCON_META) + src/data 5종: industries(12), fdi_limits(12: §4.2 검증값 8 + open_100 추가 4), regulations(10건, 한국어 원문 title_ko/source_ko 병기), risk(12 산업, breakdown 합=score 검증, sparkline 8pt, trigger+source_ko), political(22대 국회 300석, needs_verification true + analytical 라벨). 검증 스크립트로 합계·커버리지·300석 전부 통과, tsc 클린. 화면은 H2부터. / 막힌 점: 없음. fdi 추가 4종(gaming/biotech/semiconductor/logistics)은 §4.2 미검증→needs_verification:true.`
- `[10:55] H0 — Next 16(App Router)+Tailwind v4+TS 스캐폴드 완료. globals.css에 디자인 토큰 CSS 변수(@theme inline 매핑), Inter/IBM Plex Mono 폰트, 다크 OSINT 셸+상단 네비(3 라우트 /,/regulations,/political). 3 라우트 모두 200, pnpm build 통과. / 막힌 점: pnpm 11.9가 sharp 빌드 스크립트를 ignored 처리→Next 16 deps check가 exit 1. pnpm-workspace.yaml에 allowBuilds: {sharp: true} 넣어 해결. shadcn은 components.json만 두고 컴포넌트는 유닛별로 추가 예정.`
