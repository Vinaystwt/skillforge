"use client";

import { useState, useEffect, useRef } from "react";
import type { InvokeResult, SkillListing } from "../../lib/catalog";

type Step = "idle" | "loading" | "payment-required" | "paying" | "done" | "error";

// 4-step flow labels as specified in H3
const STEP_LABELS = ["Request", "Challenge", "Confirm", "Result"];

function stepIndex(s: Step): number {
  if (s === "idle")             return 0;
  if (s === "loading")          return 0;
  if (s === "payment-required") return 1;
  if (s === "paying")           return 2;
  if (s === "done")             return 3;
  if (s === "error")            return 3;
  return 0;
}

function decodeChallenge(base64: string) {
  try { return JSON.parse(atob(base64)); }
  catch { return null; }
}

function buildPaymentHeader(challenge: Record<string, unknown>, skillSlug: string): string {
  const accept = (challenge?.accepts as unknown[])?.[0];
  return btoa(JSON.stringify({
    x402Version: 2,
    resource: `/api/skills/${skillSlug}/invoke`,
    accepted: accept,
    payload: { demo: true, settledAt: Date.now() }
  }));
}

// Structured display for safe-swap-execute result
function SafeSwapResult({ data }: { data: Record<string, unknown> }) {
  const risk = data.riskScan as Record<string, unknown> | null;
  const quote = data.routeQuote as Record<string, unknown> | null;
  const prev = data.previousExecution as Record<string, unknown> | null;

  return (
    <div className="space-y-3">
      {prev && (
        <div
          className="rounded-xl p-4"
          style={{ background: "rgba(16,217,160,0.06)", border: "1px solid rgba(16,217,160,0.18)" }}
        >
          <p className="forge-label mb-2" style={{ color: "var(--live)" }}>Previous operator swap</p>
          <div className="space-y-1 text-xs forge-mono">
            <div className="flex justify-between gap-4">
              <span style={{ color: "var(--text-muted)" }}>From</span>
              <span style={{ color: "var(--text-primary)" }}>{String(prev.amountIn ?? "")}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span style={{ color: "var(--text-muted)" }}>To</span>
              <span style={{ color: "var(--live)" }}>{String(prev.amountOut ?? "")}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span style={{ color: "var(--text-muted)" }}>Network</span>
              <span style={{ color: "var(--text-primary)" }}>{String(prev.network ?? "")}</span>
            </div>
          </div>
        </div>
      )}
      {risk && (
        <details className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <summary
            className="px-4 py-3 text-xs font-semibold cursor-pointer"
            style={{ background: "var(--elevated)", color: "var(--text-secondary)" }}
          >
            Risk scan data ↓
          </summary>
          <pre className="forge-terminal text-xs" style={{ maxHeight: "180px", borderRadius: 0, border: "none" }}>
            {JSON.stringify(risk, null, 2)}
          </pre>
        </details>
      )}
      {quote && (
        <details className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
          <summary
            className="px-4 py-3 text-xs font-semibold cursor-pointer"
            style={{ background: "var(--elevated)", color: "var(--text-secondary)" }}
          >
            Route quote data ↓
          </summary>
          <pre className="forge-terminal text-xs" style={{ maxHeight: "180px", borderRadius: 0, border: "none" }}>
            {JSON.stringify(quote, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}

function FormatResult({ data, skillSlug }: { data: unknown; skillSlug: string }) {
  if (!data) return null;

  // Special structured display for safe-swap-execute
  if (skillSlug === "safe-swap-execute" && typeof data === "object" && data !== null) {
    return <SafeSwapResult data={data as Record<string, unknown>} />;
  }

  try {
    return (
      <pre className="forge-terminal text-xs overflow-auto" style={{ maxHeight: "260px" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    );
  } catch {
    return <pre className="forge-terminal text-xs">{String(data)}</pre>;
  }
}

function StepIndicator({ step }: { step: Step }) {
  const active = stepIndex(step);
  const loading = step === "loading" || step === "paying";

  return (
    <div className="flex items-center gap-1.5 mb-6">
      {STEP_LABELS.map((label, i) => {
        const done    = i < active || step === "done";
        const current = i === active;
        const isLoading = loading && current;
        return (
          <div key={label} className="flex items-center gap-1.5 min-w-0">
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div
                className="h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all duration-200"
                style={{
                  background: done
                    ? "var(--live)"
                    : current
                      ? isLoading ? "var(--payment)" : "var(--accent)"
                      : "rgba(255,255,255,0.06)",
                  color: (done || current) ? "white" : "var(--text-muted)"
                }}
              >
                {done ? "✓" : isLoading ? <span className="animate-forge-blink">·</span> : (i + 1)}
              </div>
              <span
                className="text-[11px] font-medium hidden sm:block"
                style={{ color: done || current ? "var(--text-primary)" : "var(--text-muted)" }}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className="h-px flex-1 min-w-4 transition-colors duration-300"
                style={{ background: i < active ? "var(--live)" : "rgba(255,255,255,0.08)" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// Toast-style notification (M6)
function Toast({ message, type }: { message: string; type: "info" | "payment" | "success" | "error" }) {
  const styles = {
    info:    { bg: "rgba(99,102,241,0.1)",   border: "rgba(99,102,241,0.25)",  color: "var(--accent-light)" },
    payment: { bg: "var(--payment-dim)",      border: "rgba(245,158,11,0.25)",  color: "var(--payment)"      },
    success: { bg: "var(--live-dim)",         border: "rgba(16,217,160,0.25)",  color: "var(--live)"         },
    error:   { bg: "var(--danger-dim)",       border: "rgba(244,63,94,0.25)",   color: "var(--danger)"       }
  };
  const s = styles[type];
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold mb-3 animate-forge-in"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
    >
      {type === "payment" && "💳 "}
      {type === "success" && "✓ "}
      {type === "info"    && "→ "}
      {type === "error"   && "✗ "}
      {message}
    </div>
  );
}

export interface InvokePanelProps {
  skill: SkillListing;
  /** Optional: called when the invoke completes successfully (for auto-demo cascade) */
  onComplete?: (result: unknown) => void;
  /** Optional: auto-start the invoke flow (for auto-demo) */
  autoStart?: boolean;
}

export function InvokePanel({ skill, onComplete, autoStart }: InvokePanelProps) {
  const [step, setStep]           = useState<Step>("idle");
  const didAutoStart = useRef(false);
  const [challenge, setChallenge] = useState<Record<string, unknown> | null>(null);
  const [result, setResult]       = useState<InvokeResult | null>(null);
  const [errorMsg, setError]      = useState<string>("");
  const [toast, setToast]         = useState<{ message: string; type: "info" | "payment" | "success" | "error" } | null>(null);

  const [amount, setAmount]         = useState("0.001");
  const [walletAddr, setWalletAddr] = useState("0x89740dfdc33b07242d1276ad453e00eb56c25884");
  const [contractAddr, setContract] = useState("0x779ded0c9e1022225f8e0630b35a9b54be713736");

  // Auto-start: triggers invoke flow on mount when prop is true (used by AutoDemo cascade)
  useEffect(() => {
    if (autoStart && !didAutoStart.current) {
      didAutoStart.current = true;
      // Small delay so DOM is settled before first API call
      const t = setTimeout(() => { request(); }, 300);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  function showToast(message: string, type: "info" | "payment" | "success" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function request() {
    setStep("loading");
    setError("");
    setResult(null);
    setChallenge(null);
    showToast("Requesting skill…", "info");

    try {
      const res = await fetch(`/api/skills/${skill.slug}/invoke`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, walletAddress: walletAddr, contractAddress: contractAddr })
      });

      if (res.status === 402) {
        const header = res.headers.get("PAYMENT-REQUIRED");
        setChallenge(header ? decodeChallenge(header) : null);
        setStep("payment-required");
        showToast("Payment challenge issued via HTTP 402", "payment");
        return;
      }

      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setStep("done");
        showToast("Skill executed successfully", "success");
        onComplete?.(data);
      } else {
        setError(data?.message ?? "Invocation failed");
        setStep("error");
        showToast(data?.message ?? "Invocation failed", "error");
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Network error";
      setError(msg);
      setStep("error");
      showToast(msg, "error");
    }
  }

  async function confirmPayment() {
    if (!challenge) return;
    setStep("paying");
    setError("");
    showToast("Confirming payment & executing…", "payment");

    try {
      const res = await fetch(`/api/skills/${skill.slug}/invoke`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "payment-signature": buildPaymentHeader(challenge, skill.slug)
        },
        body: JSON.stringify({ amount, walletAddress: walletAddr, contractAddress: contractAddr })
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data);
        setStep("done");
        showToast("Skill executed successfully", "success");
        onComplete?.(data);
      } else {
        setError(data?.message ?? "Execution failed");
        setStep("error");
        showToast(data?.message ?? "Execution failed", "error");
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Network error";
      setError(msg);
      setStep("error");
      showToast(msg, "error");
    }
  }

  function reset() {
    setStep("idle");
    setChallenge(null);
    setResult(null);
    setError("");
    setToast(null);
  }

  const accept = challenge?.accepts as Array<Record<string, unknown>> | undefined;
  const firstAccept = accept?.[0];
  const priceUsdt = firstAccept ? (Number(firstAccept.amount) / 1_000_000).toFixed(2) : null;

  return (
    <div className="forge-card p-6">
      {/* Header */}
      <div className="mb-5">
        <p className="forge-label mb-1.5">Interactive Invocation</p>
        <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
          {skill.name}
        </h3>
      </div>

      <StepIndicator step={step} />

      {/* Toast notification (M6) */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Inputs — idle or error */}
      {(step === "idle" || step === "error") && (
        <div className="space-y-3 mb-5">
          {skill.slug !== "wallet-balance-check" && (
            <div>
              <label className="forge-label block mb-1.5">Amount</label>
              <input
                className="forge-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.001"
              />
            </div>
          )}
          {skill.slug === "wallet-balance-check" && (
            <div>
              <label className="forge-label block mb-1.5">Wallet Address</label>
              <input
                className="forge-input forge-mono text-xs"
                value={walletAddr}
                onChange={(e) => setWalletAddr(e.target.value)}
                placeholder="0x..."
              />
            </div>
          )}
          {(skill.slug === "contract-risk-scan" || skill.slug === "safe-swap-execute") && (
            <div>
              <label className="forge-label block mb-1.5">Token Contract</label>
              <input
                className="forge-input forge-mono text-xs"
                value={contractAddr}
                onChange={(e) => setContract(e.target.value)}
                placeholder="0x..."
              />
            </div>
          )}
        </div>
      )}

      {/* Payment Required — step 2 */}
      {step === "payment-required" && firstAccept && (
        <div
          className="rounded-xl p-4 mb-5"
          style={{ background: "var(--payment-dim)", border: "1px solid rgba(245,158,11,0.2)" }}
        >
          <p className="forge-label mb-2" style={{ color: "var(--payment)" }}>
            HTTP 402 — Payment Required
          </p>
          <p className="text-xs mb-3 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            The server issued an x402 payment challenge. Confirm to attach a demo payment header and retry.
          </p>
          <div className="space-y-1 forge-mono text-xs" style={{ color: "var(--text-muted)" }}>
            <div className="flex justify-between">
              <span>Amount</span>
              <span style={{ color: "var(--payment)" }}>{priceUsdt} USDT</span>
            </div>
            <div className="flex justify-between">
              <span>Network</span>
              <span>{String(firstAccept.network ?? "")}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Pay-to</span>
              <span className="truncate">{String(firstAccept.payTo ?? "").slice(0,10)}…</span>
            </div>
            <div className="flex justify-between">
              <span>Scheme</span>
              <span>{String(firstAccept.scheme ?? "")}</span>
            </div>
          </div>
        </div>
      )}

      {/* Loading / paying */}
      {(step === "loading" || step === "paying") && (
        <div className="py-6 flex flex-col items-center gap-3 mb-5">
          <div
            className="h-8 w-8 rounded-full border-2 animate-spin"
            style={{ borderColor: "rgba(99,102,241,0.2)", borderTopColor: "var(--accent)" }}
          />
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {step === "loading" ? "Requesting skill…" : "Confirming payment & executing…"}
          </p>
        </div>
      )}

      {/* Error */}
      {step === "error" && (
        <div
          className="rounded-xl p-4 mb-5 text-sm"
          style={{ background: "var(--danger-dim)", border: "1px solid rgba(244,63,94,0.2)", color: "var(--danger)" }}
        >
          {errorMsg || "An error occurred. Please try again."}
        </div>
      )}

      {/* Result — step 4 */}
      {step === "done" && result && (
        <div className="mb-5 space-y-3">
          {/* Success banner */}
          <div
            className="flex items-center gap-2 p-3 rounded-lg"
            style={{ background: "var(--live-dim)", border: "1px solid rgba(16,217,160,0.2)" }}
          >
            <span className="forge-dot forge-dot-live" />
            <span className="text-xs font-semibold" style={{ color: "var(--live)" }}>
              Skill executed successfully
            </span>
          </div>

          {/* Summary */}
          {result.summary && (
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {String(result.summary)}
            </p>
          )}

          {/* Receipt ID — prominent (H3 fix) */}
          {result.receiptId && (
            <div
              className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg"
              style={{ background: "var(--elevated)", border: "1px solid rgba(99,102,241,0.18)" }}
            >
              <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                Receipt ID
              </span>
              <span className="forge-mono text-xs" style={{ color: "var(--accent-light)" }}>
                {String(result.receiptId)}
              </span>
            </div>
          )}

          {/* Mainnet tx link */}
          {result.transactionHash && (
            <a
              href={`https://www.oklink.com/xlayer/tx/${String(result.transactionHash)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="oklink-badge"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Mainnet TX: {String(result.transactionHash).slice(0, 14)}…
            </a>
          )}

          {/* Result data */}
          <FormatResult data={result.data} skillSlug={skill.slug} />
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        {(step === "idle" || step === "error") && (
          <button onClick={request} className="forge-btn forge-btn-primary">
            {skill.invokeMode === "x402" ? "Request Invoke" : "Execute Skill"}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2L12 7L7 12M2 7H12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        {step === "payment-required" && (
          <>
            <button onClick={confirmPayment} className="forge-btn forge-btn-primary">
              Confirm & Execute
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7L5.5 10.5L12 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button onClick={reset} className="forge-btn forge-btn-secondary text-xs">Cancel</button>
          </>
        )}
        {step === "done" && (
          <button onClick={reset} className="forge-btn forge-btn-secondary text-sm">
            ↺ Try again
          </button>
        )}
      </div>

      {/* Footnote */}
      {skill.invokeMode === "x402" && step === "idle" && (
        <p className="mt-4 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
          HTTP 402 micropayment gating — first call returns a challenge; confirm payment to execute.
        </p>
      )}
    </div>
  );
}
