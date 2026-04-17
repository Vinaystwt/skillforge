import Link from "next/link";
import type { SkillListing } from "../../lib/catalog";

const CATEGORY_STYLES: Record<string, { bar: string; text: string; bg: string }> = {
  market:    { bar: "#22D3EE", text: "#22D3EE", bg: "rgba(34,211,238,0.08)"  },
  wallet:    { bar: "#34D399", text: "#34D399", bg: "rgba(52,211,153,0.08)"  },
  security:  { bar: "#FBBF24", text: "#FBBF24", bg: "rgba(251,191,36,0.08)"  },
  execution: { bar: "#818CF8", text: "#818CF8", bg: "rgba(129,140,248,0.08)" },
  composite: { bar: "#A78BFA", text: "#A78BFA", bg: "rgba(167,139,250,0.08)" }
};

function getCat(cat: string) {
  return CATEGORY_STYLES[cat] ?? CATEGORY_STYLES.execution;
}

function MaturityBadge({ maturity }: { maturity: string }) {
  if (maturity === "live") {
    return (
      <span className="forge-badge forge-badge-live">
        <span className="forge-dot forge-dot-live" />
        Live
      </span>
    );
  }
  return (
    <span className="forge-badge forge-badge-beta">{maturity}</span>
  );
}

function RegistryVerifiedBadge({ txHash }: { txHash: string }) {
  return (
    <a
      href={`https://www.oklink.com/xlayer/tx/${txHash}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-1 text-[9px] font-bold font-mono px-1.5 py-0.5 rounded transition-opacity duration-150 hover:opacity-80"
      style={{
        background: "rgba(16,217,160,0.08)",
        border: "1px solid rgba(16,217,160,0.25)",
        color: "var(--live)"
      }}
    >
      <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
        <path d="M3.5 1L6 2.5V4.5L3.5 6L1 4.5V2.5L3.5 1Z" stroke="currentColor" strokeWidth="0.8"/>
        <path d="M2.5 3.5L3.1 4.1L4.5 2.9" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
      </svg>
      Verified onchain ↗
    </a>
  );
}

export function SkillCard({
  skill,
  featured = false
}: {
  skill: SkillListing;
  featured?: boolean;
}) {
  const cat = getCat(skill.category);

  return (
    <Link
      href={`/skill/${skill.slug}`}
      className="group block h-full"
    >
      <article
        className="forge-card relative h-full overflow-hidden transition-all duration-200"
        style={{ minHeight: featured ? "260px" : "220px" }}
      >
        {/* Category color bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5"
          style={{ background: cat.bar }}
        />

        {/* Card content */}
        <div className="pl-5 pr-5 py-5 flex flex-col h-full">
          {/* Top row: category + maturity */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[11px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded"
              style={{ color: cat.text, background: cat.bg }}
            >
              {skill.category}
            </span>
            <MaturityBadge maturity={skill.maturity} />
          </div>

          {/* Skill name */}
          <h3
            className="font-bold text-lg leading-snug mb-2 transition-colors duration-150 group-hover:text-accent-light"
            style={{ color: "var(--text-primary)", fontSize: featured ? "1.375rem" : "1.125rem" }}
          >
            {skill.name}
          </h3>

          {/* Headline */}
          <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "var(--text-secondary)" }}>
            {skill.headline}
          </p>

          {/* Bottom stats */}
          <div
            className="grid grid-cols-2 gap-3 pt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div>
              <p className="forge-label mb-1">Price</p>
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                {skill.priceLabel}
              </p>
            </div>
            <div>
              <p className="forge-label mb-1">Invocations</p>
              <p className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                {skill.invocationCount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="forge-label mb-1">Rating</p>
              <p className="text-sm font-semibold" style={{ color: cat.text }}>
                {skill.rating.toFixed(1)} / 5
              </p>
            </div>
            <div>
              <p className="forge-label mb-1">Mode</p>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {skill.invokeMode}
              </p>
            </div>
          </div>

          {/* Verified badge + Hover CTA */}
          <div className="mt-4 flex items-center justify-between gap-2">
            {skill.registrationTx && (
              <RegistryVerifiedBadge txHash={skill.registrationTx} />
            )}
            <div
              className="flex items-center gap-1.5 text-sm font-medium transition-all duration-150 opacity-0 group-hover:opacity-100 ml-auto"
              style={{ color: "var(--accent-light)" }}
            >
              View skill
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M8 4L11 7L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function SkillCardFeatured({ skill }: { skill: SkillListing }) {
  const cat = getCat(skill.category);

  return (
    <Link href={`/skill/${skill.slug}`} className="group block h-full">
      <article
        className="forge-card relative h-full overflow-hidden transition-all duration-200"
        style={{ minHeight: "300px" }}
      >
        {/* Top gradient accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, ${cat.bar}, transparent)` }}
        />

        {/* BG glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(${cat.bg}, transparent 70%)` }}
        />

        <div className="relative pl-6 pr-6 py-6 flex flex-col h-full">
          {/* Top row */}
          <div className="flex items-center justify-between mb-5">
            <span
              className="text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-md"
              style={{ color: cat.text, background: cat.bg }}
            >
              {skill.category}
            </span>
            <MaturityBadge maturity={skill.maturity} />
          </div>

          {/* Name */}
          <h3
            className="font-extrabold leading-tight mb-3 transition-colors duration-150 group-hover:text-accent-light"
            style={{ fontSize: "1.75rem", color: "var(--text-primary)" }}
          >
            {skill.name}
          </h3>

          {/* Long description */}
          <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "var(--text-secondary)" }}>
            {skill.longDescription ?? skill.headline}
          </p>

          {/* Stats + CTA */}
          <div
            className="pt-5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex flex-wrap items-end justify-between gap-4 mb-3">
              <div className="flex gap-6">
                <div>
                  <p className="forge-label mb-1">Price</p>
                  <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{skill.priceLabel}</p>
                </div>
                <div>
                  <p className="forge-label mb-1">Invocations</p>
                  <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{skill.invocationCount.toLocaleString()}</p>
                </div>
              </div>
              <span className="forge-btn forge-btn-ghost text-xs">
                Invoke skill →
              </span>
            </div>
            {skill.registrationTx && (
              <RegistryVerifiedBadge txHash={skill.registrationTx} />
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
