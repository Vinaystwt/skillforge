import type { SkillActivity } from "../../lib/catalog";

function timeAgo(isoString: string) {
  const diff = Date.now() - new Date(isoString).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function isRegistrationEvent(item: SkillActivity) {
  return item.id.startsWith("reg-");
}

type StatusStyle = { dot: string; badge: string; label: string };

function statusStyle(item: SkillActivity): StatusStyle {
  if (isRegistrationEvent(item)) {
    return { dot: "forge-dot-accent", badge: "forge-badge-executed", label: "registered" };
  }
  switch (item.status) {
    case "executed":
      return { dot: "forge-dot-live", badge: "forge-badge-live",     label: "executed" };
    case "paid":
      return { dot: "forge-dot-payment", badge: "forge-badge-paid",  label: "paid"     };
    case "failed":
      return { dot: "forge-dot-error",   badge: "forge-badge-failed", label: "failed"  };
    default:
      return { dot: "forge-dot-accent",  badge: "forge-badge-executed", label: item.status };
  }
}

function FeedItem({ item, index }: { item: SkillActivity; index: number }) {
  const s = statusStyle(item);
  const txHash = item.hash;
  const isReg = isRegistrationEvent(item);

  return (
    <div
      className="forge-reveal py-3.5"
      style={{
        animationDelay: `${index * 60}ms`,
        borderBottom: "1px solid rgba(255,255,255,0.04)"
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`forge-dot ${s.dot} flex-shrink-0 mt-0.5`} />
          <span
            className="text-sm font-semibold truncate"
            style={{ color: isReg ? "var(--text-secondary)" : "var(--text-primary)" }}
          >
            {item.skillName}
          </span>
        </div>
        <span className={`forge-badge ${s.badge} flex-shrink-0`}>{s.label}</span>
      </div>
      <p className="text-xs mb-1.5 ml-3.5" style={{ color: "var(--text-muted)" }}>
        {item.actor} · {timeAgo(item.timestamp)}
      </p>
      {!isReg && (
        <p className="text-xs leading-relaxed ml-3.5" style={{ color: "var(--text-muted)" }}>
          {item.summary}
        </p>
      )}
      {txHash && (
        <div className="mt-2 ml-3.5">
          <a
            href={`https://www.oklink.com/xlayer/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="oklink-badge"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
              <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {txHash.slice(0,10)}…{txHash.slice(-6)}
          </a>
        </div>
      )}
    </div>
  );
}

export function ActivityFeed({ items }: { items: SkillActivity[] }) {
  const invocations = items.filter((i) => !isRegistrationEvent(i));
  const registrations = items.filter((i) => isRegistrationEvent(i));

  return (
    <div
      className="forge-card h-full"
      style={{ background: "var(--surface)" }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div>
          <p className="forge-label mb-0.5">Live Activity</p>
          <h3 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
            Invocations & registry
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="forge-dot forge-dot-live" />
          <span className="text-xs font-medium" style={{ color: "var(--live)" }}>Mainnet</span>
        </div>
      </div>

      {/* Feed */}
      <div className="px-5 overflow-y-auto" style={{ maxHeight: "560px" }}>
        {/* Invocation events */}
        {invocations.length > 0 && (
          <>
            <p className="forge-label pt-3 pb-1" style={{ fontSize: "9px" }}>Recent invocations</p>
            {invocations.map((item, i) => (
              <FeedItem key={item.id} item={item} index={i} />
            ))}
          </>
        )}

        {/* Registration events */}
        {registrations.length > 0 && (
          <>
            <p className="forge-label pt-4 pb-1" style={{ fontSize: "9px" }}>Onchain registrations</p>
            {registrations.map((item, i) => (
              <FeedItem key={item.id} item={item} index={invocations.length + i} />
            ))}
          </>
        )}

        {items.length === 0 && (
          <p className="py-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            No recent activity
          </p>
        )}
      </div>

      {/* Footer link */}
      <div
        className="px-5 py-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <a
          href="https://www.oklink.com/xlayer/address/0x1850d2a31CB8669Ba757159B638DE19Af532ba5e"
          target="_blank"
          rel="noopener noreferrer"
          className="oklink-contract-link text-xs font-medium flex items-center gap-1.5"
        >
          View registry contract on OKLink ↗
        </a>
      </div>
    </div>
  );
}
