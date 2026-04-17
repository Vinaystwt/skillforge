"use client";

import { useState } from "react";

const CATEGORIES = ["market", "wallet", "security", "execution", "composite"];
const ASSETS     = ["USDT", "USDC", "OKB"];

function buildCalldata(name: string, desc: string, endpoint: string, category: string, asset: string, price: string) {
  // ABI-encoded registerSkill calldata (human-readable)
  return {
    contractAddress: "0x1850d2a31CB8669Ba757159B638DE19Af532ba5e",
    network: "X Layer mainnet (chainId 196)",
    functionSignature: "registerSkill(string,string,string,string,string,uint256)",
    params: {
      name,
      description: desc,
      endpoint,
      category,
      pricingAsset: asset,
      priceAtomic: (Number(price) * 1_000_000).toString()
    },
    hardhatCommand: `pnpm --filter @skillforge/contracts exec hardhat run scripts/seed.ts --network xlayer`
  };
}

export default function PublishPage() {
  const [name, setName]         = useState("");
  const [desc, setDesc]         = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [category, setCategory] = useState("execution");
  const [asset, setAsset]       = useState("USDT");
  const [price, setPrice]       = useState("0.10");
  const [showModal, setModal]   = useState(false);
  const [copied, setCopied]     = useState(false);

  const calldata = buildCalldata(name, desc, endpoint, category, asset, price);
  const isValid  = name.trim() && desc.trim() && endpoint.trim();

  function handleSubmit() {
    if (!isValid) return;
    setModal(true);
  }

  async function copyCalldata() {
    await navigator.clipboard.writeText(JSON.stringify(calldata, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="page-container">

      {/* ── HERO ── */}
      <div className="mb-10">
        <p className="forge-label mb-3">Creator Flow</p>
        <h1 className="forge-display mb-4" style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}>
          Publish a reusable skill.
        </h1>
        <p className="text-base leading-relaxed max-w-2xl" style={{ color: "var(--text-secondary)" }}>
          Register your skill on X Layer mainnet. Once onchain, any agent can discover and invoke it
          through the SkillForge gateway — with automatic x402 payment gating.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

        {/* ── FORM ── */}
        <div>
          <div className="forge-card p-6">
            <p className="forge-label mb-5">Skill registration</p>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="forge-label block mb-2">Skill name *</label>
                <input
                  className="forge-input"
                  placeholder="e.g. Token liquidity scanner"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                />
              </div>

              {/* Description */}
              <div>
                <label className="forge-label block mb-2">Description *</label>
                <textarea
                  className="forge-input forge-textarea"
                  placeholder="What does this skill do? What data does it return?"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  maxLength={400}
                />
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  {desc.length}/400 characters
                </p>
              </div>

              {/* Endpoint */}
              <div>
                <label className="forge-label block mb-2">API Endpoint *</label>
                <input
                  className="forge-input forge-mono text-xs"
                  placeholder="/skills/my-skill-slug/invoke"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                />
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  The fully-qualified path agents will POST to
                </p>
              </div>

              {/* Category + Asset row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="forge-label block mb-2">Category</label>
                  <select
                    className="forge-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} style={{ background: "var(--surface)" }}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="forge-label block mb-2">Pricing asset</label>
                  <select
                    className="forge-input"
                    value={asset}
                    onChange={(e) => setAsset(e.target.value)}
                  >
                    {ASSETS.map((a) => (
                      <option key={a} value={a} style={{ background: "var(--surface)" }}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="forge-label block mb-2">Price per invocation ({asset})</label>
                <div className="relative">
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold"
                    style={{ color: "var(--text-muted)" }}
                  >
                    $
                  </span>
                  <input
                    className="forge-input pl-7"
                    type="number"
                    min="0.01"
                    step="0.01"
                    placeholder="0.10"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  Stored as {(Number(price || 0) * 1_000_000).toFixed(0)} atomic units (6 decimals)
                </p>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className="forge-btn forge-btn-primary w-full justify-center mt-2"
                style={{ opacity: isValid ? 1 : 0.4, cursor: isValid ? "pointer" : "not-allowed" }}
              >
                Generate registration transaction
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="2" y="2" width="10" height="10" rx="2" stroke="white" strokeWidth="1.3"/>
                  <path d="M5 7L6.5 8.5L9 6" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS sidebar ── */}
        <div className="space-y-4">
          <div className="forge-card p-5">
            <p className="forge-label mb-4">Registration process</p>
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Fill out the form",
                  desc: "Name, description, endpoint URL, category, and price per invocation."
                },
                {
                  step: "02",
                  title: "Generate calldata",
                  desc: "SkillForge generates the exact registerSkill() calldata for X Layer mainnet."
                },
                {
                  step: "03",
                  title: "Execute onchain",
                  desc: "Call the SkillRegistry contract from your wallet. Your skill is now discoverable by all agents."
                },
                {
                  step: "04",
                  title: "Earn per invocation",
                  desc: "Every paid invoke routes the x402 payment through to your configured pay-to address."
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-3">
                  <div
                    className="h-6 w-6 rounded-md flex items-center justify-center text-[10px] font-bold font-mono flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(99,102,241,0.12)", color: "var(--accent-light)" }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
                      {item.title}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-4"
            style={{ background: "rgba(16,217,160,0.06)", border: "1px solid rgba(16,217,160,0.18)" }}
          >
            <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--live)" }}>
              Contract deployed on X Layer mainnet
            </p>
            <a
              href="https://www.oklink.com/xlayer/address/0x1850d2a31CB8669Ba757159B638DE19Af532ba5e#code"
              target="_blank"
              rel="noopener noreferrer"
              className="oklink-badge text-[10px]"
            >
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M1 8L8 1M8 1H3M8 1V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              0x1850d2a31CB8669…
            </a>
          </div>
        </div>
      </div>

      {/* ── CALLDATA MODAL ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setModal(false); }}
        >
          <div
            className="w-full max-w-2xl rounded-2xl p-4 sm:p-6"
            style={{ background: "var(--elevated)", border: "1px solid rgba(99,102,241,0.25)", maxHeight: "90vh", overflowY: "auto" }}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="forge-label mb-1">Ready to register</p>
                <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                  Registration transaction
                </h3>
              </div>
              <button
                onClick={() => setModal(false)}
                className="p-2 rounded-lg transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
              Execute this transaction on X Layer mainnet to register your skill onchain.
            </p>

            {/* Params display */}
            <div className="space-y-2 mb-4">
              {Object.entries(calldata.params).map(([k, v]) => (
                <div
                  key={k}
                  className="flex gap-3 items-start py-2 px-3 rounded-lg"
                  style={{ background: "var(--surface)" }}
                >
                  <span className="forge-mono text-xs w-28 flex-shrink-0" style={{ color: "var(--text-muted)" }}>
                    {k}
                  </span>
                  <span className="forge-mono text-xs break-all" style={{ color: "var(--accent-light)" }}>
                    {v as string}
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <p className="forge-label mb-2">Contract</p>
              <a
                href="https://www.oklink.com/xlayer/address/0x1850d2a31CB8669Ba757159B638DE19Af532ba5e#code"
                target="_blank"
                rel="noopener noreferrer"
                className="oklink-badge"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {calldata.contractAddress}
              </a>
            </div>

            <div className="mb-5">
              <p className="forge-label mb-2">Function</p>
              <code className="forge-mono text-xs px-3 py-2 rounded-lg block" style={{ background: "var(--surface)", color: "var(--live)" }}>
                {calldata.functionSignature}
              </code>
            </div>

            <div className="flex gap-3">
              <button onClick={copyCalldata} className="forge-btn forge-btn-primary flex-1 justify-center">
                {copied ? "Copied!" : "Copy calldata JSON"}
              </button>
              <button
                onClick={() => setModal(false)}
                className="forge-btn forge-btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
