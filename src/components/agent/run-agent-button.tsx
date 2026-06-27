"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import type { AgentResponse, IndustryCode } from "@/types";
import { cn } from "@/lib/utils";

const STEPS = [
  "Searching Korean sources…",
  "Analyzing with OpenAI…",
  "Scoring risk impact…",
];

export function RunAgentButton({
  industry,
  onResult,
  onLoadingChange,
  className,
}: {
  industry: IndustryCode;
  onResult: (res: AgentResponse) => void;
  onLoadingChange?: (loading: boolean) => void;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  async function run() {
    if (loading) return;
    setError(null);
    setLoading(true);
    setStep(0);
    onLoadingChange?.(true);
    // Advance the progress text so the agent visibly "works".
    timer.current = setInterval(() => {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }, 1300);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry }),
      });
      const json = (await res.json()) as AgentResponse;
      if (!res.ok || !json.brief) throw new Error("agent failed");
      // Let the final "Scoring…" step show for a beat before revealing.
      await new Promise((r) => setTimeout(r, 400));
      onResult(json);
    } catch {
      setError("Agent unavailable — try again.");
    } finally {
      if (timer.current) clearInterval(timer.current);
      setLoading(false);
      onLoadingChange?.(false);
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <button
        type="button"
        onClick={run}
        disabled={loading}
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
          "bg-accent text-[#06121f] hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-80",
        )}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        {loading ? "Agent running…" : "Run agent"}
      </button>

      <div className="h-5 text-center">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="tabular text-xs text-accent"
            >
              {STEPS[step]}
            </motion.p>
          )}
          {!loading && error && (
            <motion.p
              key="err"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-regcon-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
