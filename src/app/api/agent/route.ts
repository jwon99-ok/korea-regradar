import { NextResponse } from "next/server";
import type {
  AgentBrief,
  AgentResponse,
  IndustryCode,
  IndustryRisk,
} from "@/types";
import { runAgentLive } from "@/lib/agent-core";
import cacheData from "@/data/agent_cache.json";
import riskData from "@/data/risk.json";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const cache = cacheData as Partial<Record<IndustryCode, AgentBrief>>;
const risks = riskData as IndustryRisk[];

const VALID = new Set<IndustryCode>([
  "telecom",
  "broadcasting",
  "aviation",
  "news_media",
  "power",
  "defense",
  "fintech",
  "ecommerce",
  "gaming",
  "biotech",
  "semiconductor",
  "logistics",
]);

// Last-resort brief synthesized from the static seed (cache miss + live fail).
function synthFromSeed(industry: IndustryCode): AgentBrief {
  const r = risks.find((x) => x.industry === industry) ?? risks[0];
  const t = r.triggers[0];
  return {
    industry,
    headline_en: t?.title_en ?? "Regulatory activity detected",
    summary_en: [
      t?.title_en ?? "Recent regulatory activity in this sector.",
      `Current REGCON ${r.regcon} · risk score ${r.score}/100.`,
      "Showing the latest verified seed entry (agent offline).",
    ],
    impact: {
      risk_component: "Pending bills",
      direction: "up",
      delta: 0,
      rationale_en: "Cached signal — live agent unavailable.",
    },
    korean_quote: {
      text_ko: t?.source_ko ?? "",
      text_en: t?.title_en, // the trigger headline is the English of source_ko
      source_title: "Source",
      source_url: t?.source_url ?? "https://www.investkorea.org/",
    },
    sources: t ? [{ title: t.title_en, url: t.source_url }] : [],
  };
}

export async function POST(req: Request) {
  const started = Date.now();
  let body: { industry?: string; forceLive?: boolean } = {};
  try {
    body = await req.json();
  } catch {
    /* empty body */
  }

  const industry = body.industry as IndustryCode;
  if (!industry || !VALID.has(industry)) {
    return NextResponse.json(
      { error: "invalid or missing 'industry'" },
      { status: 400 },
    );
  }

  // 1) Try the live Exa + OpenAI pipeline.
  try {
    const { brief, model } = await runAgentLive(industry);
    const res: AgentResponse = {
      brief,
      meta: { source: "live", elapsed_ms: Date.now() - started, model },
    };
    return NextResponse.json(res);
  } catch (err) {
    const reason = err instanceof Error ? err.message : "live agent failed";
    console.error(
      `[agent] live failed for ${industry} after ${Date.now() - started}ms:`,
      reason,
      "| EXA key set:",
      !!process.env.EXA_API_KEY,
      "| OPENAI key set:",
      !!process.env.OPENAI_API_KEY,
    );

    // forceLive (cache-builder) wants the real error, not a fallback.
    if (body.forceLive) {
      return NextResponse.json({ error: reason }, { status: 502 });
    }

    // 2) Fall back to the pre-built per-industry cache.
    const cached = cache[industry];
    if (cached) {
      const res: AgentResponse = {
        brief: cached,
        meta: {
          source: "cache",
          elapsed_ms: Date.now() - started,
          note: `live unavailable (${reason})`,
        },
      };
      return NextResponse.json(res);
    }

    // 3) Last resort — synthesize from the static seed so the demo never dies.
    const res: AgentResponse = {
      brief: synthFromSeed(industry),
      meta: {
        source: "fallback",
        elapsed_ms: Date.now() - started,
        note: `live + cache unavailable (${reason})`,
      },
    };
    return NextResponse.json(res);
  }
}
