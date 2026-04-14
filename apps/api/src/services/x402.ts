import { randomUUID } from "node:crypto";
import { env } from "../config.js";
import type { SkillListing } from "@skillforge/shared";

interface X402Accept {
  scheme: string;
  network: string;
  amount: string;
  maxTimeoutSeconds: number;
  asset: string;
  payTo: string;
  extra: {
    name: string;
    version: string;
  };
}

export function buildPaymentRequired(skill: SkillListing) {
  const accepts: X402Accept[] = [
    {
      scheme: "aggr_deferred",
      network: env.X402_NETWORK,
      amount: skill.priceAtomic || env.X402_AMOUNT_USDT,
      maxTimeoutSeconds: 300,
      asset: env.X402_ASSET,
      payTo: env.X402_PAY_TO,
      extra: {
        name: "SkillForge",
        version: "0.1.0"
      }
    }
  ];

  const payload = {
    x402Version: 2,
    resource: `/skills/${skill.slug}/invoke`,
    accepts,
    metadata: {
      id: randomUUID(),
      skill: skill.slug
    }
  };

  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function hasPaymentHeader(headers: Record<string, string | string[] | undefined>) {
  return Boolean(headers["payment-signature"] || headers["x-payment"]);
}

