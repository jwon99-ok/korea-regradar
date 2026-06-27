# 빌드 진행 상태

> 매 작업 시작 시 이 파일부터 읽는다. 매 Unit 종료 시 체크 + 로그 갱신.

## 체크리스트
- [x] **H0** 스캐폴드 (Next.js 15 + Tailwind + shadcn + 디자인 토큰 + 다크 셸/네비)
- [x] **H1** 시드 데이터 (`src/data/*.json`, 한국 실데이터)
- [x] **H2** 히어로: Regulatory Risk Index 게이지 ★
- [x] **H6** AI 컴플라이언스 에이전트 (Exa+OpenAI) ★ ← 채점 30%, 핵심
- [ ] **H3** Foreign Investment Explorer + 지분 신호등 ★
- [ ] **H4** 폴리시 (트랜지션·호버·검증 배지·반응형)
- [ ] **H5** 국회 반원 — 스트레치 (컷 1순위)

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
- `[14:40] H6 — ★핵심★ AI 에이전트(Exa+OpenAI) 완성. 빌드 전 Exa·OpenAI 라이브 1회 호출로 응답형식 확인(Exa 200·한국뉴스 반환·publishedDate 없음→옵셔널 처리 / OpenAI gpt-4o-mini json_object 200). app/api/agent/route.ts(서버전용, runtime nodejs): Exa로 산업별 한국 규제뉴스 discover→OpenAI로 영어3줄요약+리스크항목 분류+한국어 원문인용+출처 JSON. 키는 process.env에서만(클라 노출 0), 프론트는 /api/agent만 fetch. RunAgentButton("searching…→analyzing→scoring" 진행텍스트)+AgentBrief 패널, 게이지에 impact delta 반영(72→77, "agent +5 · was 72")+트리거 갱신. ★폴백: scripts/build-agent-cache.mjs로 12산업 실호출→src/data/agent_cache.json 캐시. 키 없을 때 라이브 실패→cache 폴백(검증: source=cache, HTTP200), cache miss시 risk.json synth. CDP로 실제 버튼클릭 스크린샷 검증 OK, tsc/build 클린. / 막힌 점: (1) d3 때처럼 없음. (2) Next16은 같은 디렉토리 2번째 dev server 거부→폴백 테스트는 메인 dev 끄고 빈 키로 재기동해 확인.`
- `[12:10] H2 — 히어로 RegRisk 게이지 완성. / 라우트: RegconGauge(반원 게이지, d3-scale로 score→angle, SVG 스트로크 아크 + framer-motion pathLength로 차오름, REGCON 단계색·글로우·tip마커, 중앙 count-up 숫자), RegconBadge("2·Elevated"+status), IndustrySelector(영어 칩 12개), RiskSparkline, TriggerFeed(한국어 source_ko 병기+출처 링크), ScoreBreakdown(애니 바), GlobalDisclaimer. 헤드리스 크롬 스크린샷으로 시각 확인 — 인상적. 빌드/런타임 클린, 3 라우트 200. / 막힌 점: (1) d3-scale가 pnpm strict에서 미해결→`d3` 대신 `d3-scale` 직접 설치. (2) Recharts ResponsiveContainer가 스파크라인에 다크박스 아티팩트→커스텀 SVG 스파크라인으로 교체(spec의 "sparkline" 충족, 더 깔끔). 산업 전환 색/점수 변화는 데이터 기반 결정적이라 telecom(주황2)만 시각확인.`
- `[11:20] H1 — 시드 데이터 완료. src/types.ts(전 타입 + REGCON_META) + src/data 5종: industries(12), fdi_limits(12: §4.2 검증값 8 + open_100 추가 4), regulations(10건, 한국어 원문 title_ko/source_ko 병기), risk(12 산업, breakdown 합=score 검증, sparkline 8pt, trigger+source_ko), political(22대 국회 300석, needs_verification true + analytical 라벨). 검증 스크립트로 합계·커버리지·300석 전부 통과, tsc 클린. 화면은 H2부터. / 막힌 점: 없음. fdi 추가 4종(gaming/biotech/semiconductor/logistics)은 §4.2 미검증→needs_verification:true.`
- `[10:55] H0 — Next 16(App Router)+Tailwind v4+TS 스캐폴드 완료. globals.css에 디자인 토큰 CSS 변수(@theme inline 매핑), Inter/IBM Plex Mono 폰트, 다크 OSINT 셸+상단 네비(3 라우트 /,/regulations,/political). 3 라우트 모두 200, pnpm build 통과. / 막힌 점: pnpm 11.9가 sharp 빌드 스크립트를 ignored 처리→Next 16 deps check가 exit 1. pnpm-workspace.yaml에 allowBuilds: {sharp: true} 넣어 해결. shadcn은 components.json만 두고 컴포넌트는 유닛별로 추가 예정.`
