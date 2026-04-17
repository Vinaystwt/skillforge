"use client";

import { useState } from "react";
import type { SkillListing } from "../../lib/catalog";

type StepStatus = "waiting" | "running" | "done" | "error";

interface CascadeStep {
  slug: string;
  name: string;
  label: string;
  status: StepStatus;
  summary: string;
}

const STEP_COLORS: Record<string, string> = {
  "market-price-snapshot": "#22D3EE",
  "contract-risk-scan":    "#FBBF24",
  "swap-route-quote":      "#818CF8",
  "safe-swap-execute":     "#A78BFA"
};

const STEP_NUMS = ["01", "02", "03", "04"];

async function invokeSkillDemo(slug: string): Promise<string> {
  const payload = {
    amount: "0.001",
    walletAddress: "0x89740dfdc33b07242d1276ad453e00eb56c25884",
    contractAddress: "0x779ded0c9e1022225f8e0630b35a9b54be713736"
  };

  // Step 1: initial request — expect 402
  const res1 = await fetch(`/api/skills/${slug}/invoke`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res1.status !== 402) {
    const data = await res1.json() as { summary?: string };
    return data.summary ?? "Executed";
  }

  // Step 2: decode challenge, attach payment header, retry
  const header = res1.headers.get("PAYMENT-REQUIRED");
  const challenge = header ? JSON.parse(atob(header)) as Record<string, unknown> : {};
  const paymentHeader = btoa(JSON.stringify({
    x402Version: 2,
    resource: `/api/skills/${slug}/invoke`,
    accepted: (challenge?.accepts as unknown[])?.[0],
    payload: { demo: true, settledAt: Date.now() }
  }));

  const res2 = await fetch(`/api/skills/${slug}/invoke`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "payment-signature": paymentHeader },
    body: JSON.stringify(payload)
  });

  const data = await res2.json() as { summary?: string };
  return data.summary ?? "Skill executed";
}

interface Props {
  skills: SkillListing[];
}

export function AutoDemo({ skills }: Props) {
  const cascadeSkills = skills.filter(s =>
    ["market-price-snapshot", "contract-risk-scan", "swap-route-quote", "safe-swap-execute"].includes(s.slug)
  ).sort((a, b) =>
    ["market-price-snapshot", "contract-risk-scan", "swap-route-quote", "safe-swap-execute"].indexOf(a.slug) -
    ["market-price-snapshot", "contract-risk-scan", "swap-route-quote", "safe-swap-execute"].indexOf(b.slug)
  );

  const initSteps = (): CascadeStep[] =>
    cascadeSkills.map((s, i) => ({
      slug: s.slug,
      name: s.name,
      label: STEP_NUMS[i] ?? `0${i + 1}`,
      status: "waiting",
      summary: ""
    }));

  const [steps, setSteps]   = useState<CascadeStep[]>(initSteps);
  const [running, setRunning] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [error, setError]     = useState("");

  function updateStep(i: number, patch: Partial<CascadeStep>) {
    setSteps(prev => prev.map((s, j) => j === i ? { ...s, ...patch } : s));
  }

  async function runCascade() {
    setRunning(true);
    setAllDone(false);
    setError("");
    setSteps(initSteps());

    for (let i = 0; i < cascadeSkills.length; i++) {
      updateStep(i, { status: "running" });
      try {
        const summary = await invokeSkillDemo(cascadeSkills[i].slug);
        updateStep(i, { status: "done", summary });
        // Pause between steps for visual rhythm
        if (i < cascadeSkills.length - 1) {
          await new Promise<void>(r => setTimeout(r, 500));
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        updateStep(i, { status: "error", summary: msg });
        setError(`Step ${i + 1} failed: ${msg}`);
        setRunning(false);
        return;
      }
    }

    setRunning(false);
    setAllDone(true);
  }

  function reset() {
    setSteps(initSteps());
    setAllDone(false);
    setError("");
  }

  const completedCount = steps.filter(s => s.status === "done").length;

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(167,139,250,0.04))",
        border: "1px solid rgba(99,102,241,0.2)"
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="forge-label mb-1">Agent Cascade Demo</p>
          <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
            Watch an agent run the full composability flow
          </h3>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Executes all 4 skills sequentially — market snapshot → risk scan → route quote → guarded swap.
            Each step hits a real x402 payment gate.
          </p>
        </div>

        {/* Progress ring */}
        {(running || allDone) && (
          <div className="flex-shrink-0 flex items-center gap-2">
            <span className="forge-mono text-xs" style={{ color: allDone ? "var(--live)" : "var(--payment)" }}>
              {completedCount}/{cascadeSkills.length}
            </span>
            <div
              className="h-2.5 w-2.5 rounded-full flex-shrink-0"
              style={{
                background: allDone ? "var(--live)" : "var(--payment)",
                animation: running ? "forgePulse 1.2s ease-in-out infinite" : "none"
              }}
            />
          </div>
        )}
      </div>

      {/* Cascade steps */}
      <div className="space-y-2 mb-5">
        {steps.map((step, i) => {
          const color = STEP_COLORS[step.slug] ?? "var(--accent)";
          const isDone    = step.status === "done";
          const isRunning = step.status === "running";
          const isError   = step.status === "error";
          const isWaiting = step.status === "waiting";

          return (
            <div
              key={step.slug}
              className="flex items-start gap-3 rounded-xl px-4 py-3 transition-all duration-200"
              style={{
                background: isDone
                  ? `${color}0A`
                  : isRunning
                    ? `${color}10`
                    : "var(--elevated)",
                border: `1px solid ${isDone ? `${color}30` : isRunning ? `${color}40` : "rgba(255,255,255,0.05)"}`,
                opacity: isWaiting && running ? 0.5 : 1
              }}
            >
              {/* Step number / status icon */}
              <div
                className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold font-mono flex-shrink-0 mt-0.5 transition-all duration-300"
                style={{
                  background: isDone
                    ? color
                    : isRunning
                      ? `${color}30`
                      : isError
                        ? "var(--danger)"
                        : "rgba(255,255,255,0.06)",
                  color: isDone || isError ? "white" : isRunning ? color : "var(--text-muted)",
                  animation: isRunning ? "forgePulse 1s ease-in-out infinite" : "none"
                }}
              >
                {isDone ? "✓" : isError ? "✕" : step.label}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: isDone ? color : isRunning ? color : "var(--text-secondary)" }}
                  >
                    {step.name}
                  </span>
                  {isRunning && (
                    <span className="text-[10px] font-mono" style={{ color: "var(--payment)" }}>
                      invoking…
                    </span>
                  )}
                </div>
                {isDone && step.summary && (
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {step.summary}
                  </p>
                )}
                {isError && step.summary && (
                  <p className="text-xs" style={{ color: "var(--danger)" }}>{step.summary}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* All done banner */}
      {allDone && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl mb-5"
          style={{ background: "rgba(16,217,160,0.08)", border: "1px solid rgba(16,217,160,0.2)" }}
        >
          <span className="forge-dot forge-dot-live" />
          <span className="text-sm font-semibold" style={{ color: "var(--live)" }}>
            Agent cascade complete — all 4 skills executed via x402 payment gates
          </span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div
          className="px-4 py-3 rounded-xl mb-5 text-sm"
          style={{ background: "var(--danger-dim)", border: "1px solid rgba(244,63,94,0.2)", color: "var(--danger)" }}
        >
          {error}
        </div>
      )}

      {/* Action */}
      <div className="flex flex-wrap gap-3">
        {!running && !allDone && (
          <button
            onClick={runCascade}
            className="forge-btn forge-btn-primary"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 2L12 7L3 12V2Z" fill="white"/>
            </svg>
            Watch Agent Run
          </button>
        )}
        {running && (
          <button disabled className="forge-btn forge-btn-primary opacity-60 cursor-not-allowed">
            <div
              className="h-3.5 w-3.5 rounded-full border-2 animate-spin"
              style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "white" }}
            />
            Running cascade…
          </button>
        )}
        {allDone && (
          <>
            <button onClick={reset} className="forge-btn forge-btn-secondary">
              Reset
            </button>
            <button onClick={runCascade} className="forge-btn forge-btn-primary">
              Run again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
