const STEPS = [
  {
    num: "01",
    name: "Market Snapshot",
    slug: "market-price-snapshot",
    backing: "OKX DEX API",
    color: "#22D3EE",
    desc: "Live price + 24h context"
  },
  {
    num: "02",
    name: "Risk Scan",
    slug: "contract-risk-scan",
    backing: "OKX Security API",
    color: "#FBBF24",
    desc: "Token risk flags before capital moves"
  },
  {
    num: "03",
    name: "Route Quote",
    slug: "swap-route-quote",
    backing: "OKX DEX Aggregator",
    color: "#818CF8",
    desc: "Best route + price impact"
  },
  {
    num: "04",
    name: "Safe Execute",
    slug: "safe-swap-execute",
    backing: "OKX Agentic Wallet",
    color: "#A78BFA",
    desc: "Guarded swap if risk stays low"
  }
];

function AnimatedArrow({ delay }: { delay: number }) {
  return (
    <div className="hidden md:flex items-center justify-center w-8 flex-shrink-0 relative overflow-hidden">
      {/* Static arrow */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-30">
        <path d="M4 12H20M15 7L20 12L15 17" stroke="rgba(99,102,241,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {/* Animated pulse dot travelling along arrow */}
      <div
        className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full"
        style={{
          background: "var(--accent)",
          animation: `flowPulse 2.4s ease-in-out ${delay}ms infinite`,
          left: "-4px"
        }}
      />
    </div>
  );
}

export function FlowDiagram() {
  return (
    <div>
      <p className="forge-label mb-5">Composability Flow</p>

      {/* Desktop: horizontal with animated arrows */}
      <div className="hidden md:flex items-stretch gap-0">
        {STEPS.map((step, i) => (
          <div key={step.slug} className="flex items-center flex-1 min-w-0">
            <a
              href={`#skill-${step.slug}`}
              className="flex-1 rounded-xl p-4 relative overflow-hidden group transition-all duration-200 no-underline block"
              style={{
                background: "var(--surface)",
                border: `1px solid ${step.color}28`,
                minHeight: "150px"
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-200"
                style={{ background: step.color }}
              />
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top left, ${step.color}10, transparent 70%)` }}
              />
              <div className="relative mt-2">
                <span
                  className="text-[11px] font-bold font-mono"
                  style={{ color: step.color }}
                >
                  STEP {step.num}
                </span>
                <h4
                  className="text-sm font-bold mt-1 mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {step.name}
                </h4>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                  {step.desc}
                </p>
                <div
                  className="text-[10px] font-mono px-2 py-0.5 rounded inline-block"
                  style={{ background: `${step.color}12`, color: step.color, border: `1px solid ${step.color}25` }}
                >
                  {step.backing}
                </div>
              </div>
            </a>
            {i < STEPS.length - 1 && <AnimatedArrow delay={i * 300} />}
          </div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden space-y-3">
        {STEPS.map((step) => (
          <a
            key={step.slug}
            href={`#skill-${step.slug}`}
            className="flex gap-3 p-4 rounded-xl no-underline block transition-all duration-200"
            style={{
              background: "var(--surface)",
              border: `1px solid ${step.color}25`
            }}
          >
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono flex-shrink-0"
              style={{ background: `${step.color}18`, color: step.color }}
            >
              {step.num}
            </div>
            <div>
              <p className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                {step.name}
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{step.desc}</p>
              <p className="text-[10px] font-mono mt-1" style={{ color: step.color }}>
                {step.backing}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
