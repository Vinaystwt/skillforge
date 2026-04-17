"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "/", label: "Marketplace" },
  { href: "/demo", label: "Demo" },
  { href: "/publish", label: "Publish" },
  { href: "/dashboard", label: "Dashboard" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Blur backdrop strip */}
      <div
        className="absolute inset-0 backdrop-blur-xl"
        style={{
          background: "rgba(4,5,14,0.82)",
          borderBottom: "1px solid rgba(99,102,241,0.12)"
        }}
      />

      <div className="relative page-container !py-0">
        <div className="flex h-14 items-center justify-between gap-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="h-7 w-7 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:shadow-[0_0_12px_rgba(99,102,241,0.5)]"
              style={{ background: "var(--accent)" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white">
                <path d="M2 10L7 2L12 10H9L7 6L5 10H2Z" fill="white" fillOpacity="0.9"/>
                <circle cx="7" cy="12" r="1.5" fill="white" fillOpacity="0.7"/>
              </svg>
            </div>
            <div className="leading-none">
              <span className="text-sm font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                SkillForge
              </span>
            </div>
          </Link>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "relative px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-150",
                    active
                      ? "text-[var(--text-primary)] bg-[rgba(99,102,241,0.12)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.04)]"
                  )}
                >
                  {active && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Chain badge */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium"
              style={{
                background: "rgba(16,217,160,0.08)",
                border: "1px solid rgba(16,217,160,0.18)",
                color: "var(--live)"
              }}
            >
              <span className="forge-dot forge-dot-live" />
              X Layer
            </div>

            {/* Agent API link */}
            <a
              href="/api/agent"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all duration-150"
              style={{
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.2)",
                color: "var(--accent-light)"
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(99,102,241,0.14)";
                el.style.borderColor = "rgba(99,102,241,0.35)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(99,102,241,0.08)";
                el.style.borderColor = "rgba(99,102,241,0.2)";
              }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M5.5 3.5V5.5L7 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Agent API
            </a>

            {/* Mobile menu button */}
            <details className="md:hidden relative group">
              <summary
                className="list-none p-2 rounded-md cursor-pointer"
                style={{ color: "var(--text-secondary)" }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 5H15M3 9H15M3 13H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </summary>
              <div
                className="absolute right-0 top-full mt-2 py-2 rounded-xl min-w-40"
                style={{
                  background: "var(--elevated)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
                }}
              >
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
