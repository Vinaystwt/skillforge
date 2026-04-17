import Link from "next/link";
import { getMarketplaceData } from "../../lib/api";
import { InvokePanel } from "../../components/new/invoke-panel";
import { FlowDiagram } from "../../components/new/flow-diagram";
import { OnchainBadge } from "../../components/new/onchain-badge";
import { AutoDemo } from "../../components/new/auto-demo";

export const revalidate = 30;

export default async function DemoPage() {
  const marketplace = await getMarketplaceData();

  const skills = marketplace.skills;
  const safeSwap = skills.find((s) => s.slug === "safe-swap-execute") ?? skills[0];
  const marketSnap = skills.find((s) => s.slug === "market-price-snapshot") ?? skills[0];
  const riskScan = skills.find((s) => s.slug === "contract-risk-scan") ?? skills[1];
  const routeQuote = skills.find((s) => s.slug === "swap-route-quote") ?? skills[2];

  return (
    <div className="page-container">

      {/* ── HERO ── */}
      <div className="forge-reveal forge-reveal-1 mb-10">
        <p className="forge-label mb-3">Interactive Demo</p>
        <h1 className="forge-display mb-4" style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}>
          SkillForge in action.
        </h1>
        <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
          The composability story: a single agent call triggers market data, risk screening,
          route quoting, and guarded execution — each step a reusable, paid skill.
        </p>
      </div>

      {/* ── REAL MAINNET PROOF ── */}
      <div
        className="forge-reveal forge-reveal-2 rounded-2xl p-6 mb-10"
        style={{
          background: "linear-gradient(135deg, rgba(16,217,160,0.06), rgba(99,102,241,0.06))",
          border: "1px solid rgba(16,217,160,0.18)"
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="hidden sm:flex h-10 w-10 rounded-xl items-center justify-center flex-shrink-0"
            style={{ background: "rgba(16,217,160,0.12)" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L17 6V14L10 18L3 14V6L10 2Z" stroke="#10D9A0" strokeWidth="1.5"/>
              <path d="M7 10L9 12L13 8" stroke="#10D9A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--live)" }}>
              Mainnet proof — already executed
            </p>
            <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
              The Agentic Wallet already executed a live OKB → USDT swap via SkillForge on X Layer mainnet.
              This transaction is permanently verifiable on-chain.
            </p>
            <div className="flex flex-wrap gap-3">
              <OnchainBadge
                label="Swap execution tx"
                hash="0x0d6da5ea1cc77c0e6943d730d7392e9a99d04ac599ab8d850214f94b4837c2ba"
                type="tx"
              />
              <OnchainBadge
                label="Agentic Wallet"
                hash="0x89740dfdc33b07242d1276ad453e00eb56c25884"
                type="address"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── COMPOSABILITY FLOW ── */}
      <div className="forge-reveal forge-reveal-3 forge-card p-6 mb-10">
        <FlowDiagram />
      </div>

      {/* ── AUTO DEMO CASCADE ── */}
      <div className="forge-reveal forge-reveal-3 mb-10">
        <AutoDemo skills={skills} />
      </div>

      {/* ── STEP-BY-STEP DEMO CARDS ── */}
      <div className="forge-reveal forge-reveal-3">
        <p className="forge-label mb-5">Try each skill individually</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div id="skill-market-price-snapshot"><InvokePanel skill={marketSnap} /></div>
          <div id="skill-contract-risk-scan"><InvokePanel skill={riskScan} /></div>
          <div id="skill-swap-route-quote"><InvokePanel skill={routeQuote} /></div>
          <div id="skill-safe-swap-execute"><InvokePanel skill={safeSwap} /></div>
        </div>
      </div>

      {/* ── x402 EXPLAINER ── */}
      <div className="forge-card p-6 mb-10">
        <p className="forge-label mb-4">How the x402 payment flow works</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              step: "01",
              title: "Request without payment",
              desc: "Agent calls POST /skills/:slug/invoke with no payment header.",
              color: "var(--text-muted)"
            },
            {
              step: "02",
              title: "402 Challenge returned",
              desc: "Server responds HTTP 402 with PAYMENT-REQUIRED header containing amount, network, asset, pay-to address.",
              color: "var(--payment)"
            },
            {
              step: "03",
              title: "Pay and retry",
              desc: "Agent builds payment-signature header from the challenge, retries. Server verifies and executes via OKX tooling.",
              color: "var(--live)"
            }
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl p-4"
              style={{ background: "var(--elevated)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-bold font-mono h-5 w-5 rounded flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.05)", color: item.color }}
                >
                  {item.step}
                </span>
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── ONCHAIN REGISTRY PROOF ── */}
      <div className="forge-card p-6">
        <p className="forge-label mb-4">Registry provenance</p>
        <p className="text-sm mb-5" style={{ color: "var(--text-secondary)" }}>
          All 5 skills are registered on X Layer mainnet. Each registration is a separate transaction, verifiable on OKLink.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {[
            { label: "Market Price Snapshot", hash: "0xaf92994289936f55ed4e3263ae94011cb384b877e250650e9cd99eac5f49bc82" },
            { label: "Wallet Balance Check",  hash: "0x6b4310f5bb668ac6a55a2d191bc405a5d94ff4b21a1d887750348e7469fd9b31" },
            { label: "Contract Risk Scan",    hash: "0x6f839db28c1c18432fe1007d06925084546a693e6f74365f09109372489aa670" },
            { label: "Swap Route Quote",      hash: "0x04496049d2aaaf50abc5b63eb19450603ae38821f6e044229d552abf41a98f6c" },
            { label: "Safe Swap Execute",     hash: "0xc41c216fd80d6fe53807269f8398229cdf7c9d2d631af16046921e7417845bae" },
          ].map((item) => (
            <OnchainBadge
              key={item.hash}
              label={item.label}
              hash={item.hash}
              type="tx"
            />
          ))}
        </div>
        <OnchainBadge
          label="SkillRegistry contract"
          hash="0x1850d2a31CB8669Ba757159B638DE19Af532ba5e"
          type="contract"
        />
      </div>

    </div>
  );
}
