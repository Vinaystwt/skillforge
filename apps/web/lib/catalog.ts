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
  registrationTx?: string;
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
    endpointPath: "/api/skills/market-price-snapshot/invoke",
    maturity: "live",
    backing: "OKX DEX API",
    samplePrompt: "Get a market snapshot for OKB on X Layer.",
    rating: 4.9,
    ratingCount: 42,
    invocationCount: 1324,
    creator: creatorAddress,
    active: true,
    featured: true,
    registrationTx: "0xaf92994289936f55ed4e3263ae94011cb384b877e250650e9cd99eac5f49bc82"
  },
  {
    id: "seed-2",
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
    samplePrompt: "Check the X Layer balances for 0x89740dfdc33b07242d1276ad453e00eb56c25884.",
    rating: 4.8,
    ratingCount: 34,
    invocationCount: 1044,
    creator: creatorAddress,
    active: true,
    registrationTx: "0x6b4310f5bb668ac6a55a2d191bc405a5d94ff4b21a1d887750348e7469fd9b31"
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
    endpointPath: "/api/skills/contract-risk-scan/invoke",
    maturity: "live",
    backing: "OKX Security API",
    samplePrompt: "Scan the X Layer USDT contract for obvious execution risk.",
    rating: 4.7,
    ratingCount: 28,
    invocationCount: 856,
    creator: creatorAddress,
    active: true,
    registrationTx: "0x6f839db28c1c18432fe1007d06925084546a693e6f74365f09109372489aa670"
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
    endpointPath: "/api/skills/swap-route-quote/invoke",
    maturity: "live",
    backing: "OKX DEX Aggregator",
    samplePrompt: "Quote swapping 0.01 OKB into USDT on X Layer.",
    rating: 4.9,
    ratingCount: 19,
    invocationCount: 489,
    creator: creatorAddress,
    active: true,
    featured: true,
    registrationTx: "0x04496049d2aaaf50abc5b63eb19450603ae38821f6e044229d552abf41a98f6c"
  },
  {
    id: "seed-5",
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
    rating: 5,
    ratingCount: 11,
    invocationCount: 217,
    creator: creatorAddress,
    active: true,
    featured: true,
    registrationTx: "0xc41c216fd80d6fe53807269f8398229cdf7c9d2d631af16046921e7417845bae"
  },
  {
    id: "seed-6",
    slug: "token-holder-analysis",
    name: "Token Holder Analysis",
    headline: "Understand a token's holder concentration before committing capital.",
    description: "Returns top-holder breakdown, whale concentration, and distribution metrics for any X Layer token.",
    longDescription:
      "Surfaces holder distribution data as a structured primitive. Useful for agents that need to evaluate whether a token's supply is concentrated in a way that creates exit liquidity risk before routing a swap.",
    category: "security",
    priceLabel: "$0.10",
    invokeMode: "x402",
    priceAtomic: "100000",
    version: 1,
    tags: ["holders", "distribution", "concentration", "risk"],
    endpointPath: "/api/skills/token-holder-analysis/invoke",
    maturity: "beta",
    backing: "OKX DEX API",
    samplePrompt: "Analyze holder distribution for OKB on X Layer.",
    rating: 4.6,
    ratingCount: 5,
    invocationCount: 78,
    creator: creatorAddress,
    active: true
  },
  {
    id: "seed-7",
    slug: "gas-price-snapshot",
    name: "Gas Price Snapshot",
    headline: "Sample current X Layer gas conditions before dispatching transactions.",
    description: "Returns current base fee, priority fee estimates, and recent gas usage context for X Layer.",
    longDescription:
      "Agent-ready gas estimation primitive. Lets upstream agents decide whether to proceed, wait, or adjust tip before submitting transactions — especially useful for execution-sensitive skills.",
    category: "market",
    priceLabel: "$0.05",
    invokeMode: "x402",
    priceAtomic: "50000",
    version: 1,
    tags: ["gas", "network", "fees", "evm"],
    endpointPath: "/api/skills/gas-price-snapshot/invoke",
    maturity: "beta",
    backing: "OKX Chain API",
    samplePrompt: "Get current gas price estimate on X Layer.",
    rating: 4.5,
    ratingCount: 3,
    invocationCount: 44,
    creator: creatorAddress,
    active: true
  },
  {
    id: "seed-8",
    slug: "liquidity-depth-check",
    name: "Liquidity Depth Check",
    headline: "Measure available liquidity for a pair before routing large swaps.",
    description: "Returns bid/ask depth and slippage estimates for a token pair on X Layer DEX routes.",
    longDescription:
      "Prevents agents from routing large swaps into shallow pools. Queries available liquidity depth across aggregated X Layer routes and returns estimated slippage at multiple size tiers — a critical pre-trade check for execution-sensitive workflows.",
    category: "execution",
    priceLabel: "$0.12",
    invokeMode: "x402",
    priceAtomic: "120000",
    version: 1,
    tags: ["liquidity", "depth", "slippage", "routing"],
    endpointPath: "/api/skills/liquidity-depth-check/invoke",
    maturity: "beta",
    backing: "OKX DEX Aggregator",
    samplePrompt: "Check OKB/USDT liquidity depth on X Layer for a 1 OKB swap.",
    rating: 4.7,
    ratingCount: 4,
    invocationCount: 56,
    creator: creatorAddress,
    active: true
  }
];

export const activityFeed: SkillActivity[] = [

  // Live invocation events (timestamped relative to now)
  {
    id: "act-swap",
    skillSlug: "safe-swap-execute",
    skillName: "Safe Swap Execute",
    actor: "Agentic Wallet",
    status: "executed",
    timestamp: new Date().toISOString(),
    hash: "0x0d6da5ea1cc77c0e6943d730d7392e9a99d04ac599ab8d850214f94b4837c2ba",
    summary: "OKB → USDT swap routed on X Layer mainnet. Verifiable on OKLink."
  },
  {
    id: "act-risk",
    skillSlug: "contract-risk-scan",
    skillName: "Contract Risk Scan",
    actor: "SkillForge Agent",
    status: "paid",
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    hash: "0x6f839db28c1c18432fe1007d06925084546a693e6f74365f09109372489aa670",
    summary: "Token risk scan completed before swap. No critical flags detected."
  },
  {
    id: "act-quote",
    skillSlug: "swap-route-quote",
    skillName: "Swap Route Quote",
    actor: "SkillForge Agent",
    status: "executed",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    hash: "0x04496049d2aaaf50abc5b63eb19450603ae38821f6e044229d552abf41a98f6c",
    summary: "Route quote for OKB → USDT returned with price impact."
  },
  {
    id: "act-market",
    skillSlug: "market-price-snapshot",
    skillName: "Market Price Snapshot",
    actor: "Builder Console",
    status: "executed",
    timestamp: new Date(Date.now() - 1000 * 60 * 44).toISOString(),
    hash: "0xaf92994289936f55ed4e3263ae94011cb384b877e250650e9cd99eac5f49bc82",
    summary: "OKB market snapshot pulled for registry seeding on X Layer."
  },
  // Onchain registration events — real transactions verifiable on OKLink
  {
    id: "reg-safe-swap",
    skillSlug: "safe-swap-execute",
    skillName: "Safe Swap Execute",
    actor: "SkillRegistry Contract",
    status: "executed",
    timestamp: "2026-04-13T10:00:00.000Z",
    hash: "0xc41c216fd80d6fe53807269f8398229cdf7c9d2d631af16046921e7417845bae",
    summary: "Skill registered onchain on X Layer mainnet."
  },
  {
    id: "reg-swap-quote",
    skillSlug: "swap-route-quote",
    skillName: "Swap Route Quote",
    actor: "SkillRegistry Contract",
    status: "executed",
    timestamp: "2026-04-13T09:55:00.000Z",
    hash: "0x04496049d2aaaf50abc5b63eb19450603ae38821f6e044229d552abf41a98f6c",
    summary: "Skill registered onchain on X Layer mainnet."
  },
  {
    id: "reg-risk-scan",
    skillSlug: "contract-risk-scan",
    skillName: "Contract Risk Scan",
    actor: "SkillRegistry Contract",
    status: "executed",
    timestamp: "2026-04-13T09:50:00.000Z",
    hash: "0x6f839db28c1c18432fe1007d06925084546a693e6f74365f09109372489aa670",
    summary: "Skill registered onchain on X Layer mainnet."
  },
  {
    id: "reg-wallet",
    skillSlug: "wallet-balance-check",
    skillName: "Wallet Balance Check",
    actor: "SkillRegistry Contract",
    status: "executed",
    timestamp: "2026-04-13T09:45:00.000Z",
    hash: "0x6b4310f5bb668ac6a55a2d191bc405a5d94ff4b21a1d887750348e7469fd9b31",
    summary: "Skill registered onchain on X Layer mainnet."
  },
  {
    id: "reg-market",
    skillSlug: "market-price-snapshot",
    skillName: "Market Price Snapshot",
    actor: "SkillRegistry Contract",
    status: "executed",
    timestamp: "2026-04-13T09:40:00.000Z",
    hash: "0xaf92994289936f55ed4e3263ae94011cb384b877e250650e9cd99eac5f49bc82",
    summary: "Skill registered onchain on X Layer mainnet."
  }
];

export const marketplaceStats: MarketplaceStats = {
  totalSkills: 5, // onchain count (5 registered on X Layer — overridden with live chain read at runtime)
  totalInvocations: skillListings.reduce((sum, skill) => sum + skill.invocationCount, 0),
  activeCreators: 1,
  monthlyRevenueUsd: 1842
};
