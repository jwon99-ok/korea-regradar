# 빌드 진행 상태

> 매 작업 시작 시 이 파일부터 읽는다. 매 Unit 종료 시 체크 + 로그 갱신.

## 체크리스트
- [ ] **H0** 스캐폴드 (Next.js 15 + Tailwind + shadcn + 디자인 토큰 + 다크 셸/네비)
- [ ] **H1** 시드 데이터 (`src/data/*.json`, 한국 실데이터)
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
