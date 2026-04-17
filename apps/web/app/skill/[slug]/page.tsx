import Link from "next/link";
import { notFound } from "next/navigation";
import { getSkill, getMarketplaceData } from "../../../lib/api";
import { InvokePanel } from "../../../components/new/invoke-panel";
import { OnchainBadge } from "../../../components/new/onchain-badge";

export const revalidate = 30;


const CATEGORY_STYLES: Record<string, { text: string; bg: string }> = {
  market:    { text: "#22D3EE", bg: "rgba(34,211,238,0.08)"  },
  wallet:    { text: "#34D399", bg: "rgba(52,211,153,0.08)"  },
  security:  { text: "#FBBF24", bg: "rgba(251,191,36,0.08)"  },
  execution: { text: "#818CF8", bg: "rgba(129,140,248,0.08)" },
  composite: { text: "#A78BFA", bg: "rgba(167,139,250,0.08)" }
};

function getCat(cat: string) {
  return CATEGORY_STYLES[cat] ?? CATEGORY_STYLES.execution;
}

export default async function SkillDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = await getSkill(slug);

  if (!skill) notFound();

  const regTx = skill.registrationTx;
  const cat = getCat(skill.category);

  return (
    <div className="page-container">

      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm forge-back-link"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 3L4 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All skills
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

        {/* ── LEFT: Skill detail ── */}
        <div>

          {/* Category + maturity */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className="text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded-md"
              style={{ color: cat.text, background: cat.bg }}
            >
              {skill.category}
            </span>
            <span className="forge-label">v{skill.version}</span>
            {skill.maturity === "live"
              ? <span className="forge-badge forge-badge-live"><span className="forge-dot forge-dot-live" />Live</span>
              : <span className="forge-badge forge-badge-beta">{skill.maturity}</span>
            }
          </div>

          {/* Title */}
          <h1
            className="forge-display mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {skill.name}
          </h1>

          {/* Description */}
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)", maxWidth: "620px" }}
          >
            {skill.longDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {skill.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: "var(--elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)"
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Price per call", value: skill.priceLabel },
              { label: "Invocations", value: skill.invocationCount.toLocaleString() },
              { label: "Rating", value: `${skill.rating.toFixed(1)} / 5` },
              { label: "Ratings", value: skill.ratingCount.toLocaleString() },
              { label: "Invoke mode", value: skill.invokeMode },
              { label: "Powered by", value: skill.backing }
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-4"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <p className="forge-label mb-1.5">{s.label}</p>
                <p className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* Sample prompt */}
          <div
            className="rounded-xl p-4 mb-8"
            style={{ background: "var(--elevated)", border: "1px solid var(--border)" }}
          >
            <p className="forge-label mb-2">Sample Agent Prompt</p>
            <p className="text-sm italic" style={{ color: "var(--text-secondary)" }}>
              "{skill.samplePrompt}"
            </p>
          </div>

          {/* Invocation surface */}
          <div
            className="rounded-xl p-5 mb-8"
            style={{ background: "var(--surface)", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            <p className="forge-label mb-3">Invocation Surface</p>
            <div className="space-y-2 text-sm">
              <div className="flex gap-3">
                <span style={{ color: "var(--text-muted)", width: "80px", flexShrink: 0 }}>Endpoint</span>
                <code
                  className="forge-mono text-xs px-2 py-0.5 rounded break-all min-w-0"
                  style={{ background: "var(--elevated)", color: "var(--accent-light)" }}
                >
                  POST {skill.endpointPath}
                </code>
              </div>
              <div className="flex gap-3">
                <span style={{ color: "var(--text-muted)", width: "80px", flexShrink: 0 }}>Mode</span>
                <span style={{ color: "var(--text-primary)" }}>{skill.invokeMode}</span>
              </div>
              <div className="flex gap-3">
                <span style={{ color: "var(--text-muted)", width: "80px", flexShrink: 0 }}>Price</span>
                <span style={{ color: "var(--payment)" }}>{skill.priceLabel} USDT</span>
              </div>
            </div>
          </div>

          {/* Onchain provenance */}
          {regTx && (
            <div className="mb-8">
              <p className="forge-label mb-3">Onchain Provenance</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <OnchainBadge
                  label="Registration transaction"
                  hash={regTx}
                  type="tx"
                />
                <OnchainBadge
                  label="Registry contract"
                  hash="0x1850d2a31CB8669Ba757159B638DE19Af532ba5e"
                  type="contract"
                />
              </div>
              <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
                Creator: {skill.creator.slice(0,10)}…{skill.creator.slice(-6)}
              </p>
            </div>
          )}

          {/* cURL example */}
          <div>
            <p className="forge-label mb-3">Agent Quick-start</p>
            <div className="forge-terminal">
              <div>
                <span style={{ color: "#6B7FFF" }}># 1. Request (expect 402)</span>
              </div>
              <div>curl -X POST https://skillforge-vinaystwts-projects.vercel.app{skill.endpointPath} \</div>
              <div>  -H "Content-Type: application/json" \</div>
              <div>  -d &#123;"amount": "{skill.slug === "wallet-balance-check" ? "" : "0.001"}"&#125;</div>
              <div className="mt-3">
                <span style={{ color: "#6B7FFF" }}># 2. Decode PAYMENT-REQUIRED header, build payment-signature, retry</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Invoke panel + links ── */}
        <div className="space-y-4">
          <InvokePanel skill={skill} />

          <div className="forge-card p-5">
            <p className="forge-label mb-2">Quick Actions</p>
            <div className="space-y-2">
              <Link href="/demo" className="forge-btn forge-btn-secondary text-xs w-full justify-center">
                Run full demo flow
              </Link>
              <a
                href="https://www.oklink.com/xlayer/address/0x1850d2a31CB8669Ba757159B638DE19Af532ba5e#code"
                target="_blank"
                rel="noopener noreferrer"
                className="forge-btn forge-btn-secondary text-xs w-full justify-center"
              >
                Registry on OKLink ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
