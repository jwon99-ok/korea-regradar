# 빌드 진행 상태

> 매 작업 시작 시 이 파일부터 읽는다. 매 Unit 종료 시 체크 + 로그 갱신.

## 체크리스트
- [x] **H0** 스캐폴드 (Next.js 15 + Tailwind + shadcn + 디자인 토큰 + 다크 셸/네비)
- [x] **H1** 시드 데이터 (`src/data/*.json`, 한국 실데이터)
- [ ] **H2** 히어로: Regulatory Risk Index 게이지 ★
- [ ] **H6** AI 컴플라이언스 에이전트 (Exa+OpenAI) ★ ← 채점 30%, 핵심
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
- `[11:20] H1 — 시드 데이터 완료. src/types.ts(전 타입 + REGCON_META) + src/data 5종: industries(12), fdi_limits(12: §4.2 검증값 8 + open_100 추가 4), regulations(10건, 한국어 원문 title_ko/source_ko 병기), risk(12 산업, breakdown 합=score 검증, sparkline 8pt, trigger+source_ko), political(22대 국회 300석, needs_verification true + analytical 라벨). 검증 스크립트로 합계·커버리지·300석 전부 통과, tsc 클린. 화면은 H2부터. / 막힌 점: 없음. fdi 추가 4종(gaming/biotech/semiconductor/logistics)은 §4.2 미검증→needs_verification:true.`
- `[10:55] H0 — Next 16(App Router)+Tailwind v4+TS 스캐폴드 완료. globals.css에 디자인 토큰 CSS 변수(@theme inline 매핑), Inter/IBM Plex Mono 폰트, 다크 OSINT 셸+상단 네비(3 라우트 /,/regulations,/political). 3 라우트 모두 200, pnpm build 통과. / 막힌 점: pnpm 11.9가 sharp 빌드 스크립트를 ignored 처리→Next 16 deps check가 exit 1. pnpm-workspace.yaml에 allowBuilds: {sharp: true} 넣어 해결. shadcn은 components.json만 두고 컴포넌트는 유닛별로 추가 예정.`
