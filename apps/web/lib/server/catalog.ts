import { activityFeed, marketplaceStats, skillListings, type InvokePayload, type InvokeResult, type SkillListing } from "../catalog";
import { fetchBalances, fetchQuote, fetchTokenBasicInfo } from "./okx";

function getSkillBySlug(slug: string) {
  return skillListings.find((skill) => skill.slug === slug) ?? null;
}

export function getMarketplacePayload() {
  return {
    stats: marketplaceStats,
    featured: skillListings.filter((skill) => skill.featured),
    skills: skillListings,
    activity: activityFeed
  };
}

export function getSkill(slug: string) {
  return getSkillBySlug(slug);
}

export async function invokeServerSkill(skill: SkillListing, payload: InvokePayload): Promise<InvokeResult> {
  switch (skill.slug) {
    case "market-price-snapshot": {
      const quote = await fetchQuote(payload.amount ?? "0.001");
      return {
        ok: true,
        skillSlug: skill.slug,
        summary: "Returned a live OKB to USDT market snapshot from OKX routing data.",
        receiptId: crypto.randomUUID(),
        data: quote
      };
    }
    case "wallet-balance-check": {
      const balances = await fetchBalances(payload.walletAddress ?? "0x89740dfdc33b07242d1276ad453e00eb56c25884");
      return {
        ok: true,
        skillSlug: skill.slug,
        summary: "Returned live X Layer balances for the requested wallet.",
        receiptId: crypto.randomUUID(),
        data: balances
      };
    }
    case "contract-risk-scan": {
      const token = await fetchTokenBasicInfo(payload.contractAddress ?? "0x779ded0c9e1022225f8e0630b35a9b54be713736");
      return {
        ok: true,
        skillSlug: skill.slug,
        summary: "Returned token metadata and tags for a fast pre-trade risk read.",
        receiptId: crypto.randomUUID(),
        data: token
      };
    }
    case "swap-route-quote": {
      const quote = await fetchQuote(payload.amount ?? "0.001");
      return {
        ok: true,
        skillSlug: skill.slug,
        summary: "Calculated a live X Layer route quote.",
        receiptId: crypto.randomUUID(),
        data: quote
      };
    }
    case "safe-swap-execute": {
      const token = await fetchTokenBasicInfo(payload.contractAddress ?? "0x779ded0c9e1022225f8e0630b35a9b54be713736");
      const quote = await fetchQuote(payload.amount ?? "0.001");
      return {
        ok: true,
        skillSlug: skill.slug,
        summary: "Computed a guarded execution plan with token metadata and live route quote. Final wallet-signed execution remains operator-controlled.",
        receiptId: crypto.randomUUID(),
        data: { token, quote, executionMode: "manual-sign-required" }
      };
    }
    default:
      return {
        ok: false,
        skillSlug: skill.slug,
        summary: "Skill not implemented.",
        receiptId: crypto.randomUUID()
      };
  }
}
