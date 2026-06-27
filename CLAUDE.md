# Korea RegRadar — Claude Code 작업 지침

너는 이 repo를 **학생 해커톤(10:00–17:00)** 제출용으로 빌드한다.
**Claude Code로 빌드. 심사위원 전원 외국인 → UI는 영어.**
상세 규율은 `docs/BUILD.md §0`을 따른다.

---

## 작업 시작 시 — 항상
1. **`PROGRESS.md`를 먼저 읽어** 현재 어느 Unit인지 확인한다.
2. 그 Unit에 **해당하는 문서만** 읽는다 (전체 통째 로드 금지 — 토큰·컨텍스트 낭비):
   - 제품 / 범위 / 스택 / 디자인 토큰 → `docs/SPEC.md`
   - 시드 데이터 스키마·실데이터 값 → `docs/DATA.md`
   - 화면 / 컴포넌트 명세 → `docs/SCREENS.md`
   - Unit 프롬프트 / 순서 / 시간표 / 컷 순서 → `docs/BUILD.md`
3. 한 번에 **한 Unit만** 수행한다. 다음 Unit으로 미리 넘어가지 마라.

## 작업 종료 시 — 항상
1. `PROGRESS.md`의 해당 Unit을 `[x]`로 체크하고, **로그에 한 줄 메모 + 막힌 점**을 기록한다.
2. **커밋 1개**를 생성한다 (Conventional Commits: `feat(H2): ...`).
3. 가능하면 Vercel에 푸시해 "지금 보여줄 수 있는 상태"를 유지한다.

---

## 절대 규칙 (해커톤 한정)
- **데모가 전부.** 모든 결정은 "5시 데모 화면에 보이는가?"로 판단.
- **테스트 작성 금지(오늘).** TDD·커버리지·Storybook 전부 스킵.
- **백엔드·DB·스크래퍼 만들지 마라.** Postgres/Redis/FastAPI/Prefect/Docker/Python 안 씀. 데이터는 정적 JSON 시드.
  - **유일한 예외:** Next.js API 라우트 (Exa·OpenAI 서버사이드 호출, `H6`). H6는 **채점 30%의 핵심**이라 스킵 금지.
- **UI 언어 = 영어.** 단, 규제/법안 카드엔 **한국어 원문(source_ko) 병기**.
- **사실성 라벨 유지.** 카드마다 출처 링크 + as-of date. 검증 안 된 정치 데이터는 "analytical interpretation" 라벨. 추정을 사실로 표기 금지.
- 시간이 밀리면 `docs/BUILD.md §9` 컷 순서대로 가차없이 버린다.

## 참고 문서 (읽지 않음, 발표 근거용)
- `SPEC_FULL.md` — 원본 프로덕션 명세서. **빌드 중 참조하지 마라.** 발표에서 "전체 아키텍처 비전"의 근거로만 존재.
