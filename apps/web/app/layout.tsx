import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { SiteNav } from "../components/new/site-nav";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: "#04050E"
};

export const metadata: Metadata = {
  title: "SkillForge — On-chain AI Skill Registry",
  description: "On-chain registry and paid execution layer for reusable AI agent skills on X Layer. Publish, discover, and invoke agent capabilities via HTTP 402.",
  keywords: ["AI agents", "on-chain", "X Layer", "OKX", "skill marketplace", "x402", "agent skills"],
  openGraph: {
    title: "SkillForge — On-chain AI Skill Registry",
    description: "Registry and paid execution layer for reusable agent skills on X Layer.",
    type: "website",
    siteName: "SkillForge"
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillForge — On-chain AI Skill Registry",
    description: "Registry and paid execution layer for reusable agent skills on X Layer."
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${mono.variable}`}>
      <body>
        <SiteNav />
        <main className="relative z-10">
          {children}
        </main>
        <footer className="relative z-10 border-t border-forge-border mt-16 py-10">
          <div className="page-container">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-md bg-accent flex items-center justify-center">
                  <span className="text-white text-xs font-bold font-mono">SF</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">SkillForge</p>
                  <p className="text-xs text-[var(--text-muted)]">X Layer mainnet</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-6 text-xs text-[var(--text-muted)]">
                <a
                  href="https://www.oklink.com/xlayer/address/0x1850d2a31CB8669Ba757159B638DE19Af532ba5e#code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-light transition-colors"
                >
                  Contract on OKLink ↗
                </a>
                <a href="/api/agent" className="hover:text-accent-light transition-colors">
                  Agent API
                </a>
                <a href="https://github.com/Vinaystwt/skillforge" target="_blank" rel="noopener noreferrer" className="hover:text-accent-light transition-colors">
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
