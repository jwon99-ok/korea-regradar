// ── Agent pipeline (SERVER ONLY) ────────────────────────────────────
// Exa (discover Korean regulatory news) → OpenAI (English summary +
// classification + Korean source quote). Keys come from process.env and
// are NEVER sent to the client. Imported only by app/api/agent/route.ts.

import type {
  AgentBrief,
  IndustryCode,
  RiskComponent,
} from "@/types";

const RISK_COMPONENTS: RiskComponent[] = [
  "Pending bills",
  "Ownership-cap changes",
  "Political events",
  "Media sentiment",
];

// Korean search terms per industry — improves Exa recall on Korean sources.
const KOREAN_TERM: Record<IndustryCode, string> = {
  telecom: "전기통신사업법 외국인 지분 규제",
  broadcasting: "방송법 외국인 소유 규제",
  aviation: "항공사업법 외국인 지분",
  news_media: "신문법 외국자본 규제",
  power: "전기사업법 외국인투자 발전",
  defense: "방위산업 외국인투자 제한",
  fintech: "전자금융거래법 핀테크 규제",
  ecommerce: "전자상거래 플랫폼 규제",
  gaming: "게임산업법 확률형 아이템 규제",
  biotech: "첨단재생의료 바이오 규제",
  semiconductor: "국가첨단전략산업 반도체 수출통제",
  logistics: "물류 자동화 규제",
};

const INDUSTRY_LABEL: Record<IndustryCode, string> = {
  telecom: "telecom",
  broadcasting: "broadcasting",
  aviation: "air transport",
  news_media: "news / print media",
  power: "power generation",
  defense: "defense",
  fintech: "fintech",
  ecommerce: "e-commerce",
  gaming: "gaming / content",
  biotech: "biotech / pharma",
  semiconductor: "semiconductors",
  logistics: "logistics",
};

// Generous timeouts: OpenAI can take 10–25s under load, and aborting an
// in-flight fetch surfaces as a confusing "fetch failed" via undici.
const EXA_TIMEOUT_MS = 20_000;
const OPENAI_TIMEOUT_MS = 45_000;

interface ExaResult {
  title: string;
  url: string;
  author?: string;
  publishedDate?: string;
  text?: string;
}

async function fetchOnce(
  url: string,
  init: RequestInit,
  ms: number,
): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  const host = new URL(url).host;
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } catch (e) {
    // signal.aborted is the reliable timeout signal — undici otherwise
    // reports an aborted in-flight fetch as a bare "fetch failed".
    if (ctrl.signal.aborted) {
      throw new Error(`timeout after ${ms}ms calling ${host}`);
    }
    const cause = (e as { cause?: { code?: string; message?: string } })?.cause;
    const detail = cause?.code || cause?.message || (e as Error)?.message;
    console.error(`[agent] fetch to ${host} failed:`, detail, cause ?? e);
    throw new Error(`fetch ${host} failed: ${detail}`);
  } finally {
    clearTimeout(timer);
  }
}

// One retry on a transient network error (not on a timeout — already waited).
async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  ms: number,
): Promise<Response> {
  try {
    return await fetchOnce(url, init, ms);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.startsWith("timeout")) throw e;
    console.warn(`[agent] retrying ${new URL(url).host} after: ${msg}`);
    await new Promise((r) => setTimeout(r, 600));
    return fetchOnce(url, init, ms);
  }
}

// 1) Exa — discover the latest Korean regulatory / legislative news.
async function discover(industry: IndustryCode): Promise<ExaResult[]> {
  const key = process.env.EXA_API_KEY;
  if (!key) throw new Error("EXA_API_KEY missing");

  const query = `South Korea ${INDUSTRY_LABEL[industry]} foreign ownership regulation bill 2026 ${KOREAN_TERM[industry]}`;
  const res = await fetchWithTimeout(
    "https://api.exa.ai/search",
    {
      method: "POST",
      headers: { "x-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        type: "auto",
        category: "news",
        numResults: 5,
        contents: { text: { maxCharacters: 600 } },
      }),
    },
    EXA_TIMEOUT_MS,
  );
  if (!res.ok) throw new Error(`Exa ${res.status}`);
  const json = (await res.json()) as { results?: ExaResult[] };
  const results = (json.results ?? []).filter((r) => r.url && r.title);
  if (results.length === 0) throw new Error("Exa returned no results");
  return results;
}

// 2) OpenAI — English summary + classification + Korean quote (strict JSON).
async function reason(
  industry: IndustryCode,
  results: ExaResult[],
): Promise<{ brief: AgentBrief; model: string }> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY missing");

  const sources = results.slice(0, 5).map((r) => ({
    title: r.title,
    url: r.url,
    text: (r.text ?? "").replace(/\s+/g, " ").slice(0, 600),
  }));

  const system =
    "You are RegRadar, a regulatory-intelligence agent for foreign companies entering Korea. " +
    "You read Korean regulatory news and return STRICT JSON only. " +
    "Never invent facts — every claim and quote must come from the provided sources.";

  const user = `Industry under review: ${INDUSTRY_LABEL[industry]} (code: ${industry}).

Korean regulatory news (from Exa search):
${JSON.stringify(sources, null, 2)}

Return a JSON object with EXACTLY these fields:
{
  "industry": "${industry}",
  "headline_en": "<=10 word English headline",
  "summary_en": ["line 1","line 2","line 3"],
  "impact": {
    "risk_component": "<one of: ${RISK_COMPONENTS.join(" | ")}>",
    "direction": "<up | down | flat>",
    "delta": <integer between -8 and 8: how much this should move the regulatory-risk score>,
    "rationale_en": "<one sentence>"
  },
  "korean_quote": { "text_ko": "<a short verbatim Korean quote from ONE source>", "text_en": "<faithful English translation of text_ko only — do not summarize or add context>", "source_title": "<that source title>", "source_url": "<that source url>" },
  "sources": [ {"title":"...","url":"..."} ]
}

Rules:
- "risk_component" MUST be exactly one of the four allowed strings — choose the single best fit, do not output the list.
- "direction" is "up" if regulatory risk is increasing for foreign entrants.
- Include 2–4 of the provided sources in "sources". Use only the given URLs.`;

  const res = await fetchWithTimeout(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
        max_tokens: 700,
      }),
    },
    OPENAI_TIMEOUT_MS,
  );
  if (!res.ok) throw new Error(`OpenAI ${res.status}`);
  const json = (await res.json()) as {
    model: string;
    choices?: { message?: { content?: string } }[];
  };
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI empty content");

  const parsed = JSON.parse(content) as AgentBrief;
  return { brief: normalizeBrief(industry, parsed), model: json.model };
}

// Defensive normalization — keep the UI safe even if the model drifts.
function normalizeBrief(industry: IndustryCode, b: AgentBrief): AgentBrief {
  const rawComp = b.impact?.risk_component as RiskComponent | undefined;
  const comp: RiskComponent =
    rawComp && RISK_COMPONENTS.includes(rawComp) ? rawComp : "Pending bills";
  const rawDir = String(b.impact?.direction);
  const dir: "up" | "down" | "flat" =
    rawDir === "down" || rawDir === "flat" ? rawDir : "up";
  let delta = Math.round(Number(b.impact?.delta ?? 0));
  if (!Number.isFinite(delta)) delta = 0;
  delta = Math.max(-8, Math.min(8, delta));

  return {
    industry,
    headline_en: String(b.headline_en ?? "Regulatory update detected"),
    summary_en: (Array.isArray(b.summary_en) ? b.summary_en : [])
      .map((s) => String(s))
      .slice(0, 3),
    impact: {
      risk_component: comp,
      direction: dir,
      delta,
      rationale_en: String(b.impact?.rationale_en ?? ""),
    },
    korean_quote: {
      text_ko: String(b.korean_quote?.text_ko ?? ""),
      text_en: b.korean_quote?.text_en
        ? String(b.korean_quote.text_en)
        : undefined,
      source_title: String(b.korean_quote?.source_title ?? ""),
      source_url: String(b.korean_quote?.source_url ?? ""),
    },
    sources: (Array.isArray(b.sources) ? b.sources : [])
      .filter((s) => s?.url && s?.title)
      .map((s) => ({ title: String(s.title), url: String(s.url) }))
      .slice(0, 4),
  };
}

// Full live pipeline — throws on any failure (caller falls back to cache).
export async function runAgentLive(
  industry: IndustryCode,
): Promise<{ brief: AgentBrief; model: string }> {
  const results = await discover(industry);
  return reason(industry, results);
}
