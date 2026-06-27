# Korea RegRadar

Korea's industry regulations, foreign-ownership limits, and political landscape — decoded into English, in real time, for foreign founders entering the Korean market.

> 학생 해커톤(10:00–17:00) 제출용. Claude Code로 빌드.

## 문서 구조

| 파일 | 역할 | 누가 읽나 |
|---|---|---|
| `CLAUDE.md` | 상시 지침 + 문서 라우팅 | **Claude Code가 매 세션 자동 로드** |
| `PROGRESS.md` | 빌드 진행 상태 + 로그 | 매 작업 시작/종료 시 |
| `docs/SPEC.md` | 제품·범위·스택·디자인 토큰 | 제품 결정 시 |
| `docs/DATA.md` | 시드 데이터 스키마 + 실데이터 | H1(데이터) 작업 시 |
| `docs/SCREENS.md` | 화면·컴포넌트 명세 | H2/H3/H5(화면) 작업 시 |
| `docs/BUILD.md` | 프로토콜·시간표·Unit 프롬프트·발표 | 빌드 순서 참조 시 |
| `SPEC_FULL.md` | 원본 프로덕션 명세서 | **빌드 중 참조 안 함** (발표 비전 근거) |

핵심: 클로드 코드는 `CLAUDE.md`(자동) + `PROGRESS.md`(상태)만 항상 읽고,
나머지 `docs/*`는 해당 Unit 작업할 때만 읽는다 → 컨텍스트 절약 + 상태 추적.

## 시작

```bash
# 1) 원본 프로덕션 명세서를 repo에 둔다 (발표 비전 근거용)
cp /path/to/SEA-RegRadar_기획_빌드명세서.md ./SPEC_FULL.md

# 2) ⚠️ 키 보안 먼저 — 절대 커밋 금지
echo ".env.local" >> .gitignore

# 3) git + repo (제출 요건: PUBLIC 필수)
git init && git add -A && git commit -m "chore: spec scaffold"
gh repo create korea-regradar --public --source=.
#   빌드 중엔 private로 하고 제출 직전 공개해도 됨:
#   gh repo create korea-regradar --private --source=.   →  나중에  gh repo edit --visibility public
#   ★ public 전환 직전 .env.local이 커밋 안 됐는지 반드시 확인 (git log -p로 키 노출 점검)

# 4) 라이브 에이전트(H6) 키 — .env.local 에 EXA_API_KEY, OPENAI_API_KEY

# 5) Claude Code 시작
claude
# → "PROGRESS.md 읽고 H0부터 시작해" 라고 지시
```

빌드 순서·Unit 프롬프트는 `docs/BUILD.md §8` 참조.
