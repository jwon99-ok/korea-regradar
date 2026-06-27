# DATA — 시드 데이터 스키마 + 한국 실데이터

> `src/data/` 아래 정적 JSON. 백엔드 없음 — 프론트가 직접 import. 타입은 `src/types.ts`.
> 아래는 **검증된 실데이터 기반 시드**(2025년 기준, 인베스트코리아·외국인투자촉진법). 발표 전 핵심 항목만 재확인. 검증 안 된 건 `needs_verification: true`로 두고 배지 노출.

---

## 4.1 `industries.json` (~12개)
```json
[
  { "code": "telecom",       "name_en": "Telecom" },
  { "code": "broadcasting",  "name_en": "Broadcasting" },
  { "code": "aviation",      "name_en": "Air Transport" },
  { "code": "news_media",    "name_en": "News / Print Media" },
  { "code": "power",         "name_en": "Power Generation" },
  { "code": "defense",       "name_en": "Defense" },
  { "code": "fintech",       "name_en": "Fintech" },
  { "code": "ecommerce",     "name_en": "E-commerce" },
  { "code": "gaming",        "name_en": "Gaming / Content" },
  { "code": "biotech",       "name_en": "Biotech / Pharma" },
  { "code": "semiconductor", "name_en": "Semiconductors" },
  { "code": "logistics",     "name_en": "Logistics" }
]
```

## 4.2 `fdi_limits.json` (킬러 기능 — 외국인 지분 신호등, 실데이터)
```json
[
  { "industry": "ecommerce",    "regime": "open_100", "cap_pct": 100,
    "note_en": "Generally open to 100% foreign ownership",
    "source_ko": "원칙적으로 제한 없음", "legal_basis": "Foreign Investment Promotion Act",
    "source_url": "https://www.investkorea.org/" },
  { "industry": "fintech",      "regime": "open_100", "cap_pct": 100,
    "note_en": "Open, subject to financial licensing",
    "source_ko": "금융 인허가 별도", "legal_basis": "FSC licensing",
    "source_url": "https://www.investkorea.org/" },
  { "industry": "telecom",      "regime": "capped", "cap_pct": 49,
    "note_en": "Wired/wireless/satellite telecom capped at 49%",
    "source_ko": "유·무선 및 위성통신업 49% 이하 허용",
    "legal_basis": "Telecommunications Business Act", "source_url": "https://www.investkorea.org/" },
  { "industry": "broadcasting", "regime": "capped", "cap_pct": 49,
    "note_en": "Cable/satellite broadcasting capped at 49%",
    "source_ko": "유선방송업·위성방송업 49% 이하 허용",
    "legal_basis": "Broadcasting Act", "source_url": "https://www.investkorea.org/" },
  { "industry": "aviation",     "regime": "capped", "cap_pct": 49,
    "note_en": "Domestic & air passenger/cargo transport under 50%",
    "source_ko": "내항 및 항공의 여객·화물 운송업 50% 미만",
    "legal_basis": "Aviation Business Act", "source_url": "https://www.investkorea.org/" },
  { "industry": "news_media",   "regime": "capped", "cap_pct": 25,
    "note_en": "News agencies under 25%; newspaper publishing under 50%",
    "source_ko": "뉴스제공업 25% 미만 / 신문발행업 50% 미만",
    "legal_basis": "Act on Press", "source_url": "https://www.investkorea.org/" },
  { "industry": "power",        "regime": "capped", "cap_pct": 30,
    "note_en": "Hydro/thermal/solar generation under 30% of national capacity",
    "source_ko": "발전설비의 30% 미만 허용",
    "legal_basis": "Electric Utility Act", "source_url": "https://www.investkorea.org/" },
  { "industry": "defense",      "regime": "prohibited", "cap_pct": 0,
    "note_en": "Defense industry — foreign investment restricted/excluded",
    "source_ko": "방위산업체 — 제한/제외 업종",
    "legal_basis": "Foreign Investment Promotion Act, Annex", "source_url": "https://www.investkorea.org/" }
]
```
- `regime`: `open_100`(녹) / `capped`(황) / `prohibited`(적).

## 4.3 `regulations.json` (계류 법안 / 규제, 8~15건)
> 실제 계류 법안은 국회 의안정보 OpenAPI("계류의안 목록")에서 끌어와 채운다. 시드 예시:
```json
[
  { "id": "bill-001",
    "title_en": "Amendment to the Telecommunications Business Act",
    "title_ko": "전기통신사업법 일부개정법률안",
    "summary_en": "Proposes adjusting foreign-ownership caps in telecom services.",
    "reg_type": "bill", "status": "pending", "stage_en": "Committee review",
    "industries": ["telecom"], "introduced_date": "2026-05-xx",
    "source_url": "https://likms.assembly.go.kr/", "needs_verification": true }
]
```
- `reg_type`: law / bill / decree / ministerial / restriction.
- `status`: pending(계류) / passed(통과) / in_force(시행) / withdrawn(폐기).

## 4.4 `risk.json` (REGCON 게이지 — 산업별, 미리 계산된 정적값)
```json
[
  { "industry": "telecom", "score": 72, "regcon": 2,
    "sparkline": [38,40,44,50,58,64,70,72],
    "breakdown": [
      { "label_en": "Pending bills",        "value": 28 },
      { "label_en": "Ownership-cap changes", "value": 22 },
      { "label_en": "Political events",      "value": 14 },
      { "label_en": "Media sentiment",       "value": 8 }
    ],
    "triggers": [
      { "title_en": "Govt reviews easing foreign equity caps in telecom/aviation/broadcasting",
        "date": "2026-06-xx", "source_url": "https://www.hankyung.com/" }
    ]
  }
]
```
- `regcon` 5→1: `5 Stable`(녹) / `4 Watch` / `3 Caution` / `2 Elevated`(주황) / `1 Critical`(적).
- **점수는 미리 박은 정적값.** ML·룰엔진 구현 안 함. 발표에선 "explainable rule engine 설계"라고 말하되 데모는 정적.

## 4.5 `political.json` (스트레치 — 국회 구성)
```json
{
  "assembly_en": "National Assembly (300 seats)",
  "blocs": [
    { "name_en": "Ruling bloc",     "power": 0, "color": "#4DA3FF", "needs_verification": true },
    { "name_en": "Opposition bloc", "power": 0, "color": "#E4572E", "needs_verification": true }
  ],
  "seats": [
    { "party_en": "Party A", "seats": 0, "color": "#4DA3FF" },
    { "party_en": "Party B", "seats": 0, "color": "#E4572E" },
    { "party_en": "Others",  "seats": 0, "color": "#8B98A9" }
  ],
  "disclaimer_en": "Analytical interpretation · public sources · as-of date shown"
}
```
> ⚠️ 의석수·정당 구성은 **발표 직전 현재 국회 기준으로 실값 채우고** 출처 표기. 모르면 `needs_verification: true` + "analytical interpretation" 라벨. 추정을 사실로 표기 금지.

---

## 실데이터 소스 (채울 때 참고)
- **외국인 지분 제한:** Invest Korea `investkorea.org/ik-en/` (영문), 외국인투자촉진법 `law.go.kr`. (§4.2는 검증된 값)
- **계류 법안:** 국회 의안정보 OpenAPI — `apis.data.go.kr/9710000/BillInfoService2`(계류의안 목록) 또는 열린국회정보 `open.assembly.go.kr/portal/openapi`. 인증키 발급 필요(공공데이터포털).
- **법령 원문:** 국가법령정보센터 `law.go.kr`, 영문법령 `elaw.klri.re.kr`.
- **규제 뉴스(Exa 검색 대상):** 한경·연합 등. Exa가 자동 검색하니 별도 시드 불필요.
> 시드는 "검증된 핵심 5~10건"이면 충분. 나머지는 `needs_verification`로 두고 배지 노출.
