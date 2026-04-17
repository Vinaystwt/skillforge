import { NextResponse } from "next/server";

const BASE_URL = "https://skillforge-vinaystwts-projects.vercel.app";

const SKILLS_MANIFEST = {
  name: "SkillForge",
  version: "1.0.0",
  description: "On-chain registry and paid execution layer for reusable AI agent skills on X Layer.",
  network: "X Layer mainnet (chainId 196)",
  registry: "0x1850d2a31CB8669Ba757159B638DE19Af532ba5e",
  paymentScheme: "HTTP 402 / x402",
  paymentAsset: "USDT (0x779ded0c9e1022225f8e0630b35a9b54be713736)",
  docs: `${BASE_URL}/api/agent`,
  skills: [
    {
      slug: "market-price-snapshot",
      name: "Market Price Snapshot",
      description: "Returns current price, 24h movement, liquidity hints, and market framing for a token on X Layer.",
      category: "market",
      endpoint: `${BASE_URL}/api/skills/market-price-snapshot/invoke`,
      method: "POST",
      invokeMode: "x402",
      priceUsdt: 0.10,
      priceAtomic: "100000",
      backing: "OKX DEX API",
      sampleBody: { amount: "0.001" },
      samplePrompt: "Get a market snapshot for OKB on X Layer."
    },
    {
      slug: "wallet-balance-check",
      name: "Wallet Balance Check",
      description: "Returns holdings, chain-specific balances, and summarized wallet exposure.",
      category: "wallet",
      endpoint: `${BASE_URL}/api/skills/wallet-balance-check/invoke`,
      method: "POST",
      invokeMode: "x402",
      priceUsdt: 0.08,
      priceAtomic: "80000",
      backing: "OKX Wallet Portfolio API",
      sampleBody: { walletAddress: "0x89740dfdc33b07242d1276ad453e00eb56c25884" },
      samplePrompt: "Check the X Layer balances for wallet 0x89740dfdc33b07242d1276ad453e00eb56c25884."
    },
    {
      slug: "contract-risk-scan",
      name: "Contract Risk Scan",
      description: "Flags mintability, liquidity issues, honeypot traits, and other token risk markers.",
      category: "security",
      endpoint: `${BASE_URL}/api/skills/contract-risk-scan/invoke`,
      method: "POST",
      invokeMode: "x402",
      priceUsdt: 0.12,
      priceAtomic: "120000",
      backing: "OKX Security API",
      sampleBody: { contractAddress: "0x779ded0c9e1022225f8e0630b35a9b54be713736" },
      samplePrompt: "Scan the X Layer USDT contract for execution risk."
    },
    {
      slug: "swap-route-quote",
      name: "Swap Route Quote",
      description: "Quotes a token swap across X Layer liquidity routes, including output and price impact.",
      category: "execution",
      endpoint: `${BASE_URL}/api/skills/swap-route-quote/invoke`,
      method: "POST",
      invokeMode: "x402",
      priceUsdt: 0.18,
      priceAtomic: "180000",
      backing: "OKX DEX Aggregator",
      sampleBody: { amount: "0.01" },
      samplePrompt: "Quote swapping 0.01 OKB into USDT on X Layer."
    },
    {
      slug: "safe-swap-execute",
      name: "Safe Swap Execute",
      description: "Combines token risk screening and swap execution into one guarded callable primitive.",
      category: "composite",
      endpoint: `${BASE_URL}/api/skills/safe-swap-execute/invoke`,
      method: "POST",
      invokeMode: "x402",
      priceUsdt: 0.25,
      priceAtomic: "250000",
      backing: "OKX Security + DEX Aggregator",
      sampleBody: { amount: "0.001", contractAddress: "0x779ded0c9e1022225f8e0630b35a9b54be713736" },
      samplePrompt: "Safely swap 0.005 OKB into USDT on X Layer if the target remains low risk."
    }
  ],
  x402Flow: {
    step1: "POST to skill endpoint without payment header — receive HTTP 402 with PAYMENT-REQUIRED header",
    step2: "Decode base64 PAYMENT-REQUIRED header to get payment challenge (amount, network, asset, payTo)",
    step3: "Build payment-signature header and retry POST — receive skill execution result",
    challengeHeader: "PAYMENT-REQUIRED",
    paymentHeader: "payment-signature",
    scheme: "aggr_deferred"
  },
  quickstart: {
    curl: `# Step 1: Request (expect 402)\ncurl -X POST ${BASE_URL}/api/skills/market-price-snapshot/invoke \\\n  -H "Content-Type: application/json" \\\n  -d '{"amount":"0.001"}'\n\n# Step 2: Decode PAYMENT-REQUIRED header, attach payment-signature, retry`
  },
  mcp: {
    protocol: "model-context-protocol",
    version: "0.1",
    tools: [
      {
        name: "market_price_snapshot",
        description: "Returns live OKB/USDT price, 24h movement, and market context from OKX DEX API on X Layer. Requires x402 payment (0.10 USDT).",
        inputSchema: {
          type: "object",
          properties: { amount: { type: "string", description: "Amount of OKB to quote (e.g. '0.001')" } },
          required: []
        }
      },
      {
        name: "wallet_balance_check",
        description: "Returns token balances and portfolio summary for a wallet address on X Layer. Requires x402 payment (0.08 USDT).",
        inputSchema: {
          type: "object",
          properties: { walletAddress: { type: "string", description: "Wallet address (0x...)" } },
          required: []
        }
      },
      {
        name: "contract_risk_scan",
        description: "Scans a token contract for risk flags: mintability, honeypot traits, liquidity issues. Requires x402 payment (0.12 USDT).",
        inputSchema: {
          type: "object",
          properties: { contractAddress: { type: "string", description: "Token contract address (0x...)" } },
          required: []
        }
      },
      {
        name: "swap_route_quote",
        description: "Returns best swap route, expected output, and price impact for OKB→USDT on X Layer. Requires x402 payment (0.18 USDT).",
        inputSchema: {
          type: "object",
          properties: { amount: { type: "string", description: "Amount of OKB to swap" } },
          required: []
        }
      },
      {
        name: "safe_swap_execute",
        description: "Runs contract risk scan + route quote in one call. Returns guarded execution plan with real mainnet tx proof. Requires x402 payment (0.25 USDT).",
        inputSchema: {
          type: "object",
          properties: {
            amount: { type: "string", description: "Amount of OKB to swap" },
            contractAddress: { type: "string", description: "Destination token contract (0x...)" }
          },
          required: []
        }
      }
    ]
  }
};

export async function GET() {
  return NextResponse.json(SKILLS_MANIFEST, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300",
      "X-MCP-Compatible": "true",
      "X-Registry": "0x1850d2a31CB8669Ba757159B638DE19Af532ba5e",
      "X-Chain": "xlayer-mainnet"
    }
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS" }
  });
}
