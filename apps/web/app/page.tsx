import Link from "next/link";
import { getMarketplaceData } from "../lib/api";
import { SkillsGrid } from "../components/new/skills-grid";
import { ActivityFeed } from "../components/new/activity-feed";
import { FlowDiagram } from "../components/new/flow-diagram";

export const revalidate = 30;

export default async function HomePage() {
  const marketplace = await getMarketplaceData();

  return (
    <div className="page-container">

      {/* ── HERO ── */}
      <section className="pt-12 pb-16">
        <div className="forge-reveal forge-reveal-1">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
              color: "var(--accent-light)"
            }}
          >
            <span className="forge-dot forge-dot-live" />
            Skills Arena · X Layer mainnet · HTTP 402 payments
          </div>
        </div>

        <h1
          className="forge-display forge-reveal forge-reveal-2 mb-6"
          style={{
            fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
            maxWidth: "820px",
            lineHeight: "1.02"
          }}
        >
          Registry and execution layer for reusable{" "}
          <span style={{ color: "var(--accent-light)" }}>agent skills.</span>
        </h1>

        <p
          className="forge-reveal forge-reveal-3 text-lg leading-relaxed mb-8"
          style={{ color: "var(--text-secondary)", maxWidth: "640px" }}
        >
          SkillForge turns reusable capabilities into onchain-discoverable, agent-consumable
          primitives. Publish a skill, gate invocation with x402, and route execution through
          OKX tooling — with proof on X Layer.
        </p>

        {/* Stats */}
        <div className="forge-reveal forge-reveal-3 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mb-10">
          {[
            { label: "Skills", value: marketplace.stats.totalSkills.toString(), note: "onchain" },
            { label: "Invocations", value: marketplace.stats.totalInvocations.toLocaleString(), note: "seeded" },
            { label: "Rev / mo", value: `$${marketplace.stats.monthlyRevenueUsd.toLocaleString()}`, note: "estimated" }
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-4"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)"
              }}
            >
              <p className="forge-label mb-1">{s.label}</p>
              <p
                className="text-2xl font-bold font-mono leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {s.value}
              </p>
              <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>{s.note}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="forge-reveal forge-reveal-4 flex flex-wrap gap-3">
          <Link href="/demo" className="forge-btn forge-btn-primary">
            Try Live Demo
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7L7 2L12 7M7 2V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 7 7)"/>
            </svg>
          </Link>
          <a
            href="/api/agent"
            target="_blank"
            rel="noopener noreferrer"
            className="forge-btn forge-btn-secondary"
          >
            Agent Discovery API ↗
          </a>
        </div>
      </section>

      {/* ── MAIN GRID: Skills + Activity ── */}
      <section>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

          {/* Skills column */}
          <div className="flex-1 min-w-0">

            {/* Section header */}
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="forge-label mb-1.5">On-chain Registry</p>
                <h2
                  className="forge-heading"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
                >
                  Skill marketplace
                </h2>
              </div>
              <Link
                href="/publish"
                className="hidden sm:inline-flex forge-btn forge-btn-ghost text-xs"
              >
                + Publish skill
              </Link>
            </div>

            <SkillsGrid
              featured={marketplace.featured}
              skills={marketplace.skills}
            />
          </div>

          {/* Activity feed column */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
            <ActivityFeed items={marketplace.activity} />

            {/* Agent API card */}
            <div className="forge-card mt-4 p-5">
              <div className="flex items-center justify-between mb-2">
                <p className="forge-label">Agent Discovery</p>
                <span
                  className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded"
                  style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", color: "var(--accent-light)" }}
                >
                  MCP-Compatible
                </span>
              </div>
              <h3 className="text-sm font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                Any agent can discover and invoke these skills
              </h3>
              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                Hit <code className="forge-mono px-1 py-0.5 rounded" style={{ background: "var(--elevated)", color: "var(--accent-light)" }}>/api/agent</code> for skills manifest with MCP tool definitions. No API key needed.
              </p>
              <a
                href="/api/agent"
                target="_blank"
                rel="noopener noreferrer"
                className="forge-btn forge-btn-ghost text-xs w-full justify-center"
              >
                GET /api/agent ↗
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ── COMPOSABILITY FLOW ── */}
      <section className="mt-16 forge-card p-6">
        <FlowDiagram />
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="mt-20 pt-12" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-2xl mb-10">
          <p className="forge-label mb-2">Protocol</p>
          <h2 className="forge-heading text-3xl mb-4">How SkillForge works</h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Creators register skills onchain. Agents discover them via API. Every invocation
            is gated by an HTTP 402 payment challenge. Proof lives on X Layer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              num: "01",
              title: "Register onchain",
              desc: "Creator calls registerSkill() on SkillRegistry — name, endpoint, price stored on X Layer.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 10H13M7 7H13M7 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )
            },
            {
              num: "02",
              title: "Discover via API",
              desc: "Agents hit /api/agent or /marketplace to discover available skills and their pricing.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )
            },
            {
              num: "03",
              title: "Pay with x402",
              desc: "First request returns HTTP 402 + payment challenge. Caller attaches payment header and retries.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 9H18" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="6" cy="13" r="1" fill="currentColor"/>
                </svg>
              )
            },
            {
              num: "04",
              title: "Execute via OKX",
              desc: "Skill gateway dispatches to OKX OnchainOS tooling and returns result with receipt.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L17 6V14L10 18L3 14V6L10 2Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )
            }
          ].map((step) => (
            <div
              key={step.num}
              className="forge-card p-5 hover:border-accent/30 transition-colors duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(99,102,241,0.12)", color: "var(--accent-light)" }}
                >
                  {step.icon}
                </div>
                <span
                  className="text-xs font-bold font-mono"
                  style={{ color: "var(--text-muted)" }}
                >
                  {step.num}
                </span>
              </div>
              <h3
                className="text-sm font-bold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {step.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mt-16 py-12 rounded-2xl text-center" style={{
        background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(167,139,250,0.06))",
        border: "1px solid rgba(99,102,241,0.18)"
      }}>
        <h2 className="forge-heading text-2xl mb-3">
          Run the full composability demo
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          See market snapshot → risk scan → route quote → guarded swap — live on X Layer.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/demo" className="forge-btn forge-btn-primary">
            Open Demo
          </Link>
          <a
            href="https://www.oklink.com/xlayer/address/0x1850d2a31CB8669Ba757159B638DE19Af532ba5e#code"
            target="_blank"
            rel="noopener noreferrer"
            className="forge-btn forge-btn-secondary"
          >
            Verify Contract ↗
          </a>
        </div>
      </section>

    </div>
  );
}
