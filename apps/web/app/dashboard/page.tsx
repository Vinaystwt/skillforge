import { getMarketplaceData } from "../../lib/api";
import { OnchainBadge } from "../../components/new/onchain-badge";

export const revalidate = 30;

const CATEGORY_STYLES: Record<string, { text: string; bg: string }> = {
  market:    { text: "#22D3EE", bg: "rgba(34,211,238,0.08)"  },
  wallet:    { text: "#34D399", bg: "rgba(52,211,153,0.08)"  },
  security:  { text: "#FBBF24", bg: "rgba(251,191,36,0.08)"  },
  execution: { text: "#818CF8", bg: "rgba(129,140,248,0.08)" },
  composite: { text: "#A78BFA", bg: "rgba(167,139,250,0.08)" }
};


const CREATOR_ADDRESS = "0x94c188F8280cA706949CC030F69e42B5544514ac";

export default async function DashboardPage() {
  const marketplace = await getMarketplaceData();
  const stats = marketplace.stats;

  return (
    <div className="page-container">

      {/* ── HEADER ── */}
      <div className="mb-10">
        <p className="forge-label mb-3">Creator Dashboard</p>
        <h1 className="forge-display mb-3" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}>
          Registry overview
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Creator: <span className="forge-mono text-xs" style={{ color: "var(--accent-light)" }}>{CREATOR_ADDRESS}</span>
        </p>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Registered Skills", value: stats.totalSkills.toString(), note: "on X Layer mainnet" },
          { label: "Total Invocations", value: stats.totalInvocations.toLocaleString(), note: "seeded baseline" },
          { label: "Monthly Revenue",   value: `$${stats.monthlyRevenueUsd.toLocaleString()}`, note: "estimated" },
          { label: "Active Creators",   value: stats.activeCreators.toString(), note: "deployer wallet" }
        ].map((s) => (
          <div
            key={s.label}
            className="forge-card p-4 sm:p-5"
          >
            <p className="forge-label mb-2 text-[10px] sm:text-xs">{s.label}</p>
            <p
              className="text-2xl sm:text-3xl font-bold font-mono mb-1 leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {s.value}
            </p>
            <p className="text-[10px] sm:text-xs" style={{ color: "var(--text-muted)" }}>{s.note}</p>
          </div>
        ))}
      </div>

      {/* ── SKILLS TABLE ── */}
      <div className="forge-card mb-10 overflow-hidden">
        <div
          className="px-6 py-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <p className="forge-label mb-0.5">Skills Registry</p>
          <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
            Published skills
          </h2>
        </div>

        {/* scroll hint visible on mobile */}
        <p className="px-6 py-2 text-[10px] sm:hidden" style={{ color: "var(--text-muted)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          ← scroll to see all columns
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-max text-xs sm:text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {["Skill", "Category", "Mode", "Price", "Invocations", "Status", "Chain TX"].map((h) => (
                  <th
                    key={h}
                    className="px-3 sm:px-4 py-3 text-left forge-label font-medium whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {marketplace.skills.map((skill, i) => {
                const cat = CATEGORY_STYLES[skill.category] ?? CATEGORY_STYLES.execution;
                const tx = skill.registrationTx;
                return (
                  <tr
                    key={skill.slug}
                    style={{
                      borderBottom: i < marketplace.skills.length - 1
                        ? "1px solid rgba(255,255,255,0.04)"
                        : "none",
                      background: "transparent"
                    }}
                  >
                    <td className="px-3 sm:px-4 py-3">
                      <p className="font-semibold whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
                        {skill.name}
                      </p>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <span
                        className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded whitespace-nowrap"
                        style={{ color: cat.text, background: cat.bg }}
                      >
                        {skill.category}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      <span className="forge-mono text-[10px] sm:text-xs whitespace-nowrap" style={{ color: "var(--text-secondary)" }}>
                        {skill.invokeMode}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 font-semibold whitespace-nowrap" style={{ color: "var(--payment)" }}>
                      {skill.priceLabel}
                    </td>
                    <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                      <span style={{ color: "var(--text-primary)" }}>
                        {skill.invocationCount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      {skill.active
                        ? <span className="forge-badge forge-badge-live"><span className="forge-dot forge-dot-live" />active</span>
                        : <span className="forge-badge forge-badge-failed">inactive</span>
                      }
                    </td>
                    <td className="px-3 sm:px-4 py-3">
                      {tx ? (
                        <a
                          href={`https://www.oklink.com/xlayer/tx/${tx}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="oklink-badge"
                          title={tx}
                        >
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <path d="M1 8L8 1M8 1H3M8 1V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {tx.slice(0,8)}…
                        </a>
                      ) : (
                        <span style={{ color: "var(--text-muted)" }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ONCHAIN PROOF SECTION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Registry contract */}
        <div className="forge-card p-6">
          <p className="forge-label mb-4">Contract Details</p>
          <div className="space-y-3">
            <OnchainBadge
              label="SkillRegistry contract (verified)"
              hash="0x1850d2a31CB8669Ba757159B638DE19Af532ba5e"
              type="contract"
            />
            <OnchainBadge
              label="Deployer wallet"
              hash={CREATOR_ADDRESS}
              type="address"
            />
            <OnchainBadge
              label="Agentic Wallet (executor)"
              hash="0x89740dfdc33b07242d1276ad453e00eb56c25884"
              type="address"
            />
          </div>
          <div
            className="mt-5 p-3 rounded-lg"
            style={{ background: "var(--elevated)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span style={{ color: "var(--text-muted)" }}>Chain</span>
                <span style={{ color: "var(--text-primary)" }}>X Layer mainnet (196)</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--text-muted)" }}>Solidity</span>
                <span style={{ color: "var(--text-primary)" }}>^0.8.24</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--text-muted)" }}>Standard</span>
                <span style={{ color: "var(--text-primary)" }}>Ownable (OZ)</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--text-muted)" }}>Skills registered</span>
                <span style={{ color: "var(--live)" }}>5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live proof */}
        <div className="forge-card p-6">
          <p className="forge-label mb-4">Mainnet Execution Proof</p>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            The Agentic Wallet executed a real OKB → USDT swap via SkillForge on X Layer mainnet.
          </p>
          <OnchainBadge
            label="Mainnet swap tx (OKB → USDT)"
            hash="0x0d6da5ea1cc77c0e6943d730d7392e9a99d04ac599ab8d850214f94b4837c2ba"
            type="tx"
          />
          <div
            className="mt-4 p-3 rounded-lg space-y-1.5 text-xs"
            style={{ background: "var(--elevated)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex justify-between">
              <span style={{ color: "var(--text-muted)" }}>From</span>
              <span style={{ color: "var(--text-primary)" }}>0.118 OKB</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--text-muted)" }}>To</span>
              <span style={{ color: "var(--live)" }}>10.104445 USDT</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--text-muted)" }}>Wallet</span>
              <span style={{ color: "var(--text-primary)" }}>Agentic Wallet</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: "var(--text-muted)" }}>Verified</span>
              <span className="forge-badge forge-badge-live text-[9px] py-0"><span className="forge-dot forge-dot-live"/>OKLink</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
