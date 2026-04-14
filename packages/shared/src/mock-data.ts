import type { MarketplaceStats, SkillActivity, SkillListing, SkillSeed } from "./types";

export const skillSeeds: SkillSeed[] = [
  {
    slug: "market-price-snapshot",
    name: "Market Price Snapshot",
    headline: "Pull a live multi-venue token snapshot with context, not just a ticker.",
    description: "Returns current price, 24h movement, liquidity hints, and market framing for a token on X Layer.",
    longDescription:
      "A fast, agent-ready market primitive. Use it to ground downstream workflows before routing swaps, monitoring risk, or generating strategy summaries. Designed for low-latency invocation by both dashboards and autonomous agents.",
    category: "market",
    priceLabel: "$0.10",
    invokeMode: "x402",
    priceAtomic: "100000",
    version: 1,
    tags: ["market", "ohlcv", "pricing", "analysis"],
    endpointPath: "/skills/market-price-snapshot/invoke",
    maturity: "live",
    backing: "OKX DEX market APIs",
    samplePrompt: "Get a market snapshot for OKB on X Layer.",
    featured: true
  },
  {
    slug: "wallet-balance-check",
    name: "Wallet Balance Check",
    headline: "Inspect a wallet’s token balance surface without opening a block explorer.",
    description: "Returns holdings, chain-specific balances, and summarized wallet exposure.",
    longDescription:
      "Wraps wallet portfolio capabilities into a single reusable endpoint. Useful for agent workflows that need quick balance confirmation before simulation or execution.",
    category: "wallet",
    priceLabel: "$0.08",
    invokeMode: "x402",
    priceAtomic: "80000",
    version: 1,
    tags: ["wallet", "portfolio", "balances"],
    endpointPath: "/skills/wallet-balance-check/invoke",
    maturity: "live",
    backing: "OKX wallet portfolio tooling",
    samplePrompt: "Check the X Layer balances for 0x89740dfdc33b07242d1276ad453e00eb56c25884."
  },
  {
    slug: "contract-risk-scan",
    name: "Contract Risk Scan",
    headline: "Run a fast token risk read before an agent executes.",
    description: "Flags mintability, liquidity issues, honeypot traits, and other token risk markers.",
    longDescription:
      "A defensive primitive for agent pipelines. Intended to sit between intent formation and execution, so agents can refuse obvious traps before capital moves.",
    category: "security",
    priceLabel: "$0.12",
    invokeMode: "x402",
    priceAtomic: "120000",
    version: 1,
    tags: ["security", "risk", "token-scan"],
    endpointPath: "/skills/contract-risk-scan/invoke",
    maturity: "live",
    backing: "OKX security token scan",
    samplePrompt: "Scan the X Layer USDT contract for obvious execution risk."
  },
  {
    slug: "swap-route-quote",
    name: "Swap Route Quote",
    headline: "Find the route, output, and impact before committing capital.",
    description: "Quotes a token swap across X Layer liquidity routes, including output and price impact.",
    longDescription:
      "Built for pre-trade agents and human operators who need the route first. Quotes are returned with impact and expected output so downstream systems can decide whether to proceed.",
    category: "execution",
    priceLabel: "$0.18",
    invokeMode: "x402",
    priceAtomic: "180000",
    version: 1,
    tags: ["uniswap", "routing", "quote", "trade"],
    endpointPath: "/skills/swap-route-quote/invoke",
    maturity: "live",
    backing: "OKX DEX aggregator",
    samplePrompt: "Quote swapping 0.01 OKB into USDT on X Layer.",
    featured: true
  },
  {
    slug: "safe-swap-execute",
    name: "Safe Swap Execute",
    headline: "Combine risk screen and swap execution into a single guarded action.",
    description: "Checks the destination asset, quotes the route, and executes if the risk profile stays acceptable.",
    longDescription:
      "The flagship SkillForge demo skill. It composes security and execution into one callable primitive, showing why agents should consume reusable skills instead of rebuilding these checks each time.",
    category: "composite",
    priceLabel: "$0.25",
    invokeMode: "x402",
    priceAtomic: "250000",
    version: 1,
    tags: ["composite", "security", "execution", "uniswap"],
    endpointPath: "/skills/safe-swap-execute/invoke",
    maturity: "beta",
    backing: "OKX security + swap",
    samplePrompt: "Safely swap 0.005 OKB into USDT on X Layer if the target remains low risk.",
    featured: true
  }
];

const creatorAddress = "0x94c188F8280cA706949CC030F69e42B5544514ac";

export const skillListings: SkillListing[] = skillSeeds.map((skill, index) => ({
  ...skill,
  id: `seed-${index + 1}`,
  rating: [4.9, 4.8, 4.7, 4.9, 5][index] ?? 4.8,
  ratingCount: [42, 34, 28, 19, 11][index] ?? 10,
  invocationCount: [1324, 1044, 856, 489, 217][index] ?? 100,
  creator: creatorAddress,
  active: true
}));

export const activityFeed: SkillActivity[] = [
  {
    id: "act-1",
    skillSlug: "safe-swap-execute",
    skillName: "Safe Swap Execute",
    actor: "Agentic Wallet",
    status: "executed",
    timestamp: new Date().toISOString(),
    hash: "0x0d6da5ea1cc77c0e6943d730d7392e9a99d04ac599ab8d850214f94b4837c2ba",
    summary: "Safely converted OKB into USDT on X Layer."
  },
  {
    id: "act-2",
    skillSlug: "contract-risk-scan",
    skillName: "Contract Risk Scan",
    actor: "SkillForge Demo Agent",
    status: "paid",
    timestamp: new Date(Date.now() - 1000 * 60 * 13).toISOString(),
    summary: "Scanned the target token before allowing execution."
  },
  {
    id: "act-3",
    skillSlug: "market-price-snapshot",
    skillName: "Market Price Snapshot",
    actor: "Builder Console",
    status: "executed",
    timestamp: new Date(Date.now() - 1000 * 60 * 29).toISOString(),
    summary: "Pulled a live OKB snapshot to seed the marketplace."
  }
];

export const marketplaceStats: MarketplaceStats = {
  totalSkills: skillListings.length,
  totalInvocations: skillListings.reduce((sum, skill) => sum + skill.invocationCount, 0),
  activeCreators: 1,
  monthlyRevenueUsd: 1842
};

