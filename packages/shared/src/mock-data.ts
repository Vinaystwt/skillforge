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
    endpointPath: "/api/skills/market-price-snapshot/invoke",
    maturity: "live",
    backing: "OKX DEX API",
    samplePrompt: "Get a market snapshot for OKB on X Layer.",
    featured: true
  },
  {
    slug: "wallet-balance-check",
    name: "Wallet Balance Check",
    headline: "Inspect a wallet's token balance surface without opening a block explorer.",
    description: "Returns holdings, chain-specific balances, and summarized wallet exposure.",
    longDescription:
      "Wraps wallet portfolio capabilities into a single reusable endpoint. Useful for agent workflows that need quick balance confirmation before simulation or execution.",
    category: "wallet",
    priceLabel: "$0.08",
    invokeMode: "x402",
    priceAtomic: "80000",
    version: 1,
    tags: ["wallet", "portfolio", "balances"],
    endpointPath: "/api/skills/wallet-balance-check/invoke",
    maturity: "live",
    backing: "OKX Wallet Portfolio API",
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
    endpointPath: "/api/skills/contract-risk-scan/invoke",
    maturity: "live",
    backing: "OKX Security API",
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
    endpointPath: "/api/skills/swap-route-quote/invoke",
    maturity: "live",
    backing: "OKX DEX Aggregator",
    samplePrompt: "Quote swapping 0.01 OKB into USDT on X Layer.",
    featured: true
  },
  {
    slug: "safe-swap-execute",
    name: "Safe Swap Execute",
    headline: "Combine risk screen and swap execution into a single guarded action.",
    description: "Checks the destination asset, quotes the route, and executes if the risk profile stays acceptable.",
    longDescription:
      "The flagship SkillForge skill. It composes security and execution into one callable primitive, showing why agents should consume reusable skills instead of rebuilding these checks each time.",
    category: "composite",
    priceLabel: "$0.25",
    invokeMode: "x402",
    priceAtomic: "250000",
    version: 1,
    tags: ["composite", "security", "execution", "uniswap"],
    endpointPath: "/api/skills/safe-swap-execute/invoke",
    maturity: "live",
    backing: "OKX Security + DEX Aggregator",
    samplePrompt: "Safely swap 0.005 OKB into USDT on X Layer if the target remains low risk.",
    featured: true
  }
];

const creatorAddress = "0x94c188F8280cA706949CC030F69e42B5544514ac";

export const skillListings: SkillListing[] = skillSeeds.map((skill, index) => ({
  ...skill,
  id: `seed-${index + 1}`,
  // Seed invocation counts — these represent the seeded baseline at launch
  rating: [4.9, 4.8, 4.7, 4.9, 5][index] ?? 4.8,
  ratingCount: [42, 34, 28, 19, 11][index] ?? 10,
  invocationCount: [1324, 1044, 856, 489, 217][index] ?? 100,
  creator: creatorAddress,
  active: true
}));

// Activity feed seeded from real onchain registration and swap events
export const activityFeed: SkillActivity[] = [
  {
    id: "act-swap",
    skillSlug: "safe-swap-execute",
    skillName: "Safe Swap Execute",
    actor: "Agentic Wallet",
    status: "executed",
    timestamp: new Date().toISOString(),
    hash: "0x0d6da5ea1cc77c0e6943d730d7392e9a99d04ac599ab8d850214f94b4837c2ba",
    summary: "OKB → USDT swap routed on X Layer mainnet. Mainnet tx verifiable on OKLink."
  },
  {
    id: "act-risk",
    skillSlug: "contract-risk-scan",
    skillName: "Contract Risk Scan",
    actor: "SkillForge Agent",
    status: "paid",
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    hash: "0x6f839db28c1c18432fe1007d06925084546a693e6f74365f09109372489aa670",
    summary: "Token risk scan completed before swap execution. No critical flags detected."
  },
  {
    id: "act-quote",
    skillSlug: "swap-route-quote",
    skillName: "Swap Route Quote",
    actor: "SkillForge Agent",
    status: "executed",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    hash: "0x04496049d2aaaf50abc5b63eb19450603ae38821f6e044229d552abf41a98f6c",
    summary: "Swap route quote returned with price impact and expected output for OKB → USDT."
  },
  {
    id: "act-market",
    skillSlug: "market-price-snapshot",
    skillName: "Market Price Snapshot",
    actor: "Builder Console",
    status: "executed",
    timestamp: new Date(Date.now() - 1000 * 60 * 44).toISOString(),
    hash: "0xaf92994289936f55ed4e3263ae94011cb384b877e250650e9cd99eac5f49bc82",
    summary: "OKB market snapshot pulled to seed the registry on X Layer."
  }
];

export const marketplaceStats: MarketplaceStats = {
  totalSkills: skillListings.length,
  totalInvocations: skillListings.reduce((sum, skill) => sum + skill.invocationCount, 0),
  activeCreators: 1,
  monthlyRevenueUsd: 1842
};
