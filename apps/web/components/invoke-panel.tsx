"use client";

import { useState } from "react";
import type { SkillListing } from "../lib/catalog";

interface InvokePanelProps {
  skill: SkillListing;
}

function decodeChallenge(base64: string) {
  try {
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export function InvokePanel({ skill }: InvokePanelProps) {
  const [amount, setAmount] = useState(skill.slug === "wallet-balance-check" ? "" : "0.001");
  const [walletAddress, setWalletAddress] = useState("0x89740dfdc33b07242d1276ad453e00eb56c25884");
  const [contractAddress, setContractAddress] = useState("0x779ded0c9e1022225f8e0630b35a9b54be713736");
  const [status, setStatus] = useState<"idle" | "needs-payment" | "loading" | "done" | "error">("idle");
  const [challenge, setChallenge] = useState<any>(null);
  const [result, setResult] = useState<any>(null);

  async function invoke(withPayment = false) {
    setStatus("loading");

    const headers: HeadersInit = {
      "Content-Type": "application/json"
    };

    if (withPayment && challenge) {
      const accept = challenge.accepts?.[0];
      headers["payment-signature"] = btoa(
        JSON.stringify({
          x402Version: 2,
          resource: challenge.resource,
          accepted: accept,
          payload: {
            demo: true,
            settledAt: Date.now()
          }
        })
      );
    }

    const response = await fetch(`/api/skills/${skill.slug}/invoke`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        amount,
        walletAddress,
        contractAddress
      })
    });

    if (response.status === 402) {
      const header = response.headers.get("PAYMENT-REQUIRED");
      setChallenge(header ? decodeChallenge(header) : null);
      setStatus("needs-payment");
      return;
    }

    const data = await response.json();
    setResult(data);
    setStatus(response.ok ? "done" : "error");
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-[rgba(12,12,10,0.86)] p-1 shadow-shell">
      <div className="rounded-[calc(2rem-4px)] border border-white/6 bg-[rgba(16,15,13,0.96)] p-6">
        <p className="text-[10px] uppercase tracking-[0.26em] text-dune/50">Interactive invoke</p>
        <h3 className="mt-4 font-display text-3xl text-fog">Run the live demo flow</h3>
        <div className="mt-6 grid gap-4">
          {skill.slug !== "wallet-balance-check" ? (
            <label className="grid gap-2 text-sm text-dune/74">
              <span className="uppercase tracking-[0.2em] text-dune/48">Amount</span>
              <input value={amount} onChange={(e) => setAmount(e.target.value)} className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-fog outline-none" />
            </label>
          ) : null}

          {skill.slug === "wallet-balance-check" ? (
            <label className="grid gap-2 text-sm text-dune/74">
              <span className="uppercase tracking-[0.2em] text-dune/48">Wallet</span>
              <input value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-fog outline-none" />
            </label>
          ) : null}

          {skill.slug === "contract-risk-scan" || skill.slug === "safe-swap-execute" ? (
            <label className="grid gap-2 text-sm text-dune/74">
              <span className="uppercase tracking-[0.2em] text-dune/48">Contract</span>
              <input value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-fog outline-none" />
            </label>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={() => invoke(false)} className="inline-flex items-center gap-3 rounded-full bg-fog px-5 py-3 text-sm uppercase tracking-[0.2em] text-ink transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px]">
            Request invoke
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-fog">↗</span>
          </button>
          {status === "needs-payment" ? (
            <button onClick={() => invoke(true)} className="inline-flex items-center gap-3 rounded-full border border-[rgba(193,109,69,0.45)] bg-[rgba(193,109,69,0.12)] px-5 py-3 text-sm uppercase tracking-[0.2em] text-fog transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px]">
              Confirm demo payment
            </button>
          ) : null}
        </div>

        {challenge ? (
          <div className="mt-6 rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-4 text-sm text-dune/76">
            <p className="uppercase tracking-[0.22em] text-dune/50">Payment required</p>
            <p className="mt-3">Amount: {Number(challenge.accepts?.[0]?.amount ?? 0) / 1e6} USDT</p>
            <p className="mt-1">Network: {challenge.accepts?.[0]?.network}</p>
            <p className="mt-1 break-all">Pay to: {challenge.accepts?.[0]?.payTo}</p>
          </div>
        ) : null}

        {status === "done" && result ? (
          <pre className="mt-6 max-h-[24rem] overflow-auto rounded-[1.2rem] border border-white/8 bg-black/30 p-4 text-xs leading-6 text-dune/78">
            {JSON.stringify(result, null, 2)}
          </pre>
        ) : null}
      </div>
    </div>
  );
}
