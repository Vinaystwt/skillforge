import crypto from "node:crypto";
import { z } from "zod";

const envSchema = z.object({
  OKX_API_KEY: z.string().min(1),
  OKX_SECRET_KEY: z.string().min(1),
  OKX_PASSPHRASE: z.string().min(1),
  X402_PAY_TO: z.string().min(1).default("0x89740dfdc33b07242d1276ad453e00eb56c25884"),
  X402_NETWORK: z.string().default("eip155:196"),
  X402_ASSET: z.string().default("0x779ded0c9e1022225f8e0630b35a9b54be713736")
});

function getEnv() {
  return envSchema.parse(process.env);
}

function sign(method: "GET" | "POST", requestPath: string, body?: unknown) {
  const { OKX_API_KEY, OKX_SECRET_KEY, OKX_PASSPHRASE } = getEnv();
  const timestamp = new Date().toISOString();
  const payload = method === "POST" && body ? JSON.stringify(body) : "";
  const prehash = `${timestamp}${method}${requestPath}${payload}`;
  const signature = crypto.createHmac("sha256", OKX_SECRET_KEY).update(prehash).digest("base64");

  return {
    headers: {
      "Content-Type": "application/json",
      "OK-ACCESS-KEY": OKX_API_KEY,
      "OK-ACCESS-SIGN": signature,
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": OKX_PASSPHRASE
    },
    body: payload
  };
}

async function okxFetch<T>(method: "GET" | "POST", requestPath: string, query?: URLSearchParams, body?: unknown): Promise<T> {
  const pathWithQuery = `${requestPath}${query && query.toString() ? `?${query.toString()}` : ""}`;
  const { headers, body: payload } = sign(method, pathWithQuery, body);

  const response = await fetch(`https://web3.okx.com${pathWithQuery}`, {
    method,
    headers,
    body: method === "POST" ? payload : undefined,
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`OKX API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export interface OkxResponse<T> {
  code: string;
  msg: string;
  data: T;
}

export async function fetchQuote(amountReadable = "0.001") {
  const minimal = BigInt(Math.floor(Number(amountReadable) * 1e18)).toString();
  const query = new URLSearchParams({
    chainIndex: "196",
    amount: minimal,
    swapMode: "exactIn",
    fromTokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    toTokenAddress: "0x779ded0c9e1022225f8e0630b35a9b54be713736"
  });

  return okxFetch<OkxResponse<unknown[]>>("GET", "/api/v6/dex/aggregator/quote", query);
}

export async function fetchTokenBasicInfo(tokenContractAddress: string) {
  const body = [
    {
      chainIndex: "196",
      tokenContractAddress
    }
  ];

  return okxFetch<OkxResponse<unknown[]>>("POST", "/api/v6/dex/market/token/basic-info", undefined, body);
}

export async function fetchBalances(address: string) {
  const body = {
    address,
    tokenContractAddresses: [
      { chainIndex: "196", tokenContractAddress: "" },
      { chainIndex: "196", tokenContractAddress: "0x779ded0c9e1022225f8e0630b35a9b54be713736" }
    ],
    excludeRiskToken: "1"
  };

  return okxFetch<OkxResponse<unknown[]>>("POST", "/api/v6/dex/balance/token-balances-by-address", undefined, body);
}

export function buildChallenge(priceAtomic: string, skillSlug: string) {
  const { X402_PAY_TO, X402_NETWORK, X402_ASSET } = getEnv();
  const payload = {
    x402Version: 2,
    resource: `/api/skills/${skillSlug}/invoke`,
    accepts: [
      {
        scheme: "aggr_deferred",
        network: X402_NETWORK,
        amount: priceAtomic,
        maxTimeoutSeconds: 300,
        asset: X402_ASSET,
        payTo: X402_PAY_TO,
        extra: {
          name: "SkillForge",
          version: "0.1.0"
        }
      }
    ],
    metadata: {
      skill: skillSlug,
      issuedAt: Date.now()
    }
  };

  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function verifyDemoPayment(headerValue: string | null, priceAtomic: string, skillSlug: string) {
  if (!headerValue) return false;

  try {
    const { X402_PAY_TO, X402_NETWORK, X402_ASSET } = getEnv();
    const decoded = JSON.parse(Buffer.from(headerValue, "base64").toString("utf8"));
    const accept = decoded?.accepted;
    const settledAt = decoded?.payload?.settledAt;

    return (
      decoded?.x402Version === 2 &&
      decoded?.resource === `/api/skills/${skillSlug}/invoke` &&
      accept?.network === X402_NETWORK &&
      accept?.asset === X402_ASSET &&
      accept?.payTo?.toLowerCase() === X402_PAY_TO.toLowerCase() &&
      accept?.amount === priceAtomic &&
      decoded?.payload?.demo === true &&
      typeof settledAt === "number" &&
      Date.now() - settledAt < 1000 * 60 * 10
    );
  } catch {
    return false;
  }
}
