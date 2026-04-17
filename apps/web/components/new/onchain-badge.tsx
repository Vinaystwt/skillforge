import type { ReactNode } from "react";

interface OnchainBadgeProps {
  label: string;
  hash: string;
  type?: "tx" | "address" | "contract";
  network?: "xlayer";
  extra?: ReactNode;
}

function buildUrl(hash: string, type: OnchainBadgeProps["type"]) {
  const base = "https://www.oklink.com/xlayer";
  if (type === "address" || type === "contract") return `${base}/address/${hash}`;
  return `${base}/tx/${hash}`;
}

function truncateHash(hash: string, start = 10, end = 6): string {
  if (hash.length <= start + end + 3) return hash;
  return `${hash.slice(0, start)}…${hash.slice(-end)}`;
}

export function OnchainBadge({
  label,
  hash,
  type = "tx",
  extra
}: OnchainBadgeProps) {
  return (
    <div
      className="flex flex-col gap-2 p-3 rounded-lg"
      style={{
        background: "rgba(99,102,241,0.05)",
        border: "1px solid rgba(99,102,241,0.12)"
      }}
    >
      <p className="forge-label">{label}</p>
      <a
        href={buildUrl(hash, type)}
        target="_blank"
        rel="noopener noreferrer"
        className="oklink-badge"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
          <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {truncateHash(hash)}
      </a>
      {extra}
    </div>
  );
}

export function OnchainProofRow({ items }: {
  items: Array<{ label: string; hash: string; type?: "tx" | "address" | "contract" }>
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item) => (
        <OnchainBadge
          key={item.hash}
          label={item.label}
          hash={item.hash}
          type={item.type}
        />
      ))}
    </div>
  );
}
