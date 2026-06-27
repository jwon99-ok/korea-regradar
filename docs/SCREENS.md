# SCREENS — 화면 · 컴포넌트 명세

> 모든 라벨은 **영어**. 카드엔 한국어 원문(source_ko) 병기. 데이터는 `src/data/*.json` 직접 import (스키마는 `DATA.md`).

---

## 5.1 Regulatory Risk Index — 히어로 (`/`)
가장 중요한 화면. 게이지가 데모의 핵심 후크다.

- `RegconGauge` (D3 반원 게이지 0–100): 산업 선택 시 `risk.json` 점수까지 **Framer Motion으로 차오르고** 색이 REGCON 단계색(`--regcon-*`)으로 전환.
- `RegconBadge`: 예 `"2 · Elevated"` + 상태 텍스트.
- `IndustrySelector`: 영어 칩. 선택 시 게이지·피드 갱신.
- `RiskSparkline` (Recharts): 추세선.
- `TriggerFeed`: "Why is it elevated now?" 이벤트 카드 + 원문 링크.
- `ScoreBreakdown`: feature 기여 바 (explainable).
- **`RunAgentButton` (★ 채점 30%):** 누르면 `/api/agent` 호출 → "Agent searching Korean sources… analyzing… scoring…" 진행 상태 표시 → Exa+OpenAI 결과로 트리거 피드/게이지 갱신. 라이브 실패 시 `agent_cache.json` 폴백.
- 상단 `GlobalDisclaimer`: "Not legal advice · analytical interpretation · data as-of date".

## 5.2 Foreign Investment Explorer (`/regulations`)
지분 신호등이 킬러 기능.

- `IndustryFilter` (영어 칩) + `RegTypeChips` + `SearchBar` (텍스트 필터).
- `RegulationCard`:
  - 타입 배지 · **영어 제목/요약 + 한국어 원문(source_ko) 병기** · 단계(stage) · 상태
  - **`OwnershipSignalLight`** (녹/황/적 + cap %)
  - 출처 링크 · `VerificationBadge`("needs verification"일 때)
- `OwnershipSignalLight`: 산업별 외국인 지분 신호등. `regime` → 색 (open_100=녹, capped=황, prohibited=적). 색맹 대응 아이콘 병기.
- 산업 필터 클릭 시 카드 리스트 + 신호등 즉시 갱신.

## 5.3 Political Landscape — 스트레치 (`/political`)
- `Hemicycle` (D3): 국회 300석 반원 좌석 배치, 정당색, 호버 카드. **HOI4 차용 — 에셋/로고 직접 사용 금지, 레이아웃 패턴만.**
- `BlocPowerBars`: 여/야 영향력 바 (HOI4식 political-power).
- `AnalystSourcePanel`: "analytical interpretation" 라벨 + 출처 리스트 (필수).
> 시간 없으면 화면 전체 컷 (`BUILD.md §9`).

---

## 공통 / 접근성
- 전 화면 상단 `GlobalDisclaimer`.
- 모든 데이터 카드에 `as_of_date` · `source` 노출 (추적성).
- 색맹 대응: 신호등·게이지에 아이콘/라벨 병기.
- 모바일: 그래프(게이지·반원)는 단순화 뷰.
