import Link from "next/link";

const links = [
  { href: "/", label: "Marketplace" },
  { href: "/publish", label: "Publish" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/demo", label: "Demo" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-5 z-50 mx-auto w-[min(1120px,calc(100%-24px))] rounded-full border border-white/10 bg-[rgba(12,12,10,0.78)] px-5 py-4 shadow-shell backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_top,rgba(193,109,69,0.8),rgba(193,109,69,0.22))] font-display text-lg text-ink">
            SF
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-dune/55">Skill marketplace</p>
            <p className="font-display text-xl text-fog">SkillForge</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-dune/78 transition duration-500 hover:text-fog">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-2 py-2">
          <span className="px-3 text-xs uppercase tracking-[0.26em] text-dune/55">X Layer</span>
          <span className="flex h-9 items-center rounded-full bg-fog px-4 text-xs uppercase tracking-[0.2em] text-ink">Agentic Wallet</span>
        </div>
      </div>
    </header>
  );
}

