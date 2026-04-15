export type SkillCategory = "market" | "security" | "wallet" | "execution" | "composite";

export type SkillInvocationMode = "free" | "x402";

export interface SkillListing {
  id: string;
  slug: string;
  name: string;
  headline: string;
  description: string;
  longDescription: string;
  category: SkillCategory;
  priceLabel: string;
  invokeMode: SkillInvocationMode;
  priceAtomic: string;
  version: number;
  tags: string[];
  endpointPath: string;
  maturity: "beta" | "live";
  backing: string;
  samplePrompt: string;
  rating: number;
  ratingCount: number;
  invocationCount: number;
  creator: string;
  active: boolean;
  featured?: boolean;
}

export interface SkillActivity {
  id: string;
  skillSlug: string;
  skillName: string;
  actor: string;
  status: "queued" | "paid" | "executed" | "failed";
  timestamp: string;
  hash?: string;
  summary: string;
}

export interface MarketplaceStats {
  totalSkills: number;
  totalInvocations: number;
  activeCreators: number;
  monthlyRevenueUsd: number;
}

export interface InvokePayload {
  walletAddress?: string;
  tokenAddress?: string;
  contractAddress?: string;
  amount?: string;
  note?: string;
  extra?: Record<string, string | number | boolean>;
}

export interface InvokeResult {
  ok: boolean;
  skillSlug: string;
  summary: string;
  receiptId: string;
  transactionHash?: string;
  data?: unknown;
}

const creatorAddress = "0x94c188F8280cA706949CC030F69e42B5544514ac";

export const skillListings: SkillListing[] = [
  {
    id: "seed-1",
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
    rating: 4.9,
    ratingCount: 42,
    invocationCount: 1324,
    creator: creatorAddress,
    active: true,
    featured: true
  },
  {
    id: "seed-2",
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
    samplePrompt: "Check the X Layer balances for 0x89740dfdc33b07242d1276ad453e00eb56c25884.",
    rating: 4.8,
    ratingCount: 34,
    invocationCount: 1044,
    creator: creatorAddress,
    active: true
  },
  {
    id: "seed-3",
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
    backing: "OKX token metadata and security surfaces",
    samplePrompt: "Scan the X Layer USDT contract for obvious execution risk.",
    rating: 4.7,
    ratingCount: 28,
    invocationCount: 856,
    creator: creatorAddress,
    active: true
  },
  {
    id: "seed-4",
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
    rating: 4.9,
    ratingCount: 19,
    invocationCount: 489,
    creator: creatorAddress,
    active: true,
    featured: true
  },
  {
    id: "seed-5",
    slug: "safe-swap-execute",
    name: "Safe Swap Execute",
    headline: "Combine risk screen and swap execution into a single guarded action.",
    description: "Checks the destination asset, quotes the route, and packages a guarded execution plan.",
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
    backing: "OKX security + swap planning",
    samplePrompt: "Safely swap 0.005 OKB into USDT on X Layer if the target remains low risk.",
    rating: 5,
    ratingCount: 11,
    invocationCount: 217,
    creator: creatorAddress,
    active: true,
    featured: true
  }
];

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
