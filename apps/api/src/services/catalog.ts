import { activityFeed, marketplaceStats, skillListings, skillSeeds, type InvokePayload, type InvokeResult, type SkillListing } from "@skillforge/shared";
import { executeSafeSwap, fetchWalletBalance, quoteSwap, scanToken } from "./onchainos.js";
import { getRegistryClient } from "./registry.js";

function bySlug(slug: string) {
  return skillListings.find((skill) => skill.slug === slug);
}

export async function resolveSkill(slug: string) {
  return bySlug(slug) ?? null;
}

export async function listSkills() {
  const registry = getRegistryClient();

  if (!registry) {
    return skillListings;
  }

  try {
    const ids = await registry.read.getAllSkillIds();
    const onchainSkills = await Promise.all(
      ids.map(async (id) => {
        const skill = await registry.read.getSkill([id]);
        const seed = skillListings.find((item) => item.endpointPath === skill.endpoint);

        if (!seed) {
          return null;
        }

        return {
          ...seed,
          id,
          description: skill.description,
          creator: skill.creator,
          invocationCount: Number(skill.invocationCount),
          rating: Number(skill.ratingBps) / 100 || seed.rating,
          ratingCount: Number(skill.ratingCount),
          active: skill.active,
          version: Number(skill.version)
        } satisfies SkillListing;
      })
    );

    const resolved = onchainSkills.filter(Boolean) as SkillListing[];
    return resolved.length ? resolved : skillListings;
  } catch {
    return skillListings;
  }
}

export async function listFeaturedSkills() {
  const skills = await listSkills();
  return skills.filter((skill) => skill.featured);
}

export async function getMarketplacePayload() {
  const skills = await listSkills();

  return {
    stats: marketplaceStats,
    featured: skills.filter((skill) => skill.featured),
    skills,
    activity: activityFeed
  };
}

export async function invokeSkill(skill: SkillListing, payload: InvokePayload): Promise<InvokeResult> {
  switch (skill.slug) {
    case "market-price-snapshot": {
      const quote = await quoteSwap(payload.amount ?? "0.01");
      return {
        ok: true,
        skillSlug: skill.slug,
        summary: "Generated a live swap-informed OKB market snapshot.",
        receiptId: crypto.randomUUID(),
        data: quote
      };
    }
    case "wallet-balance-check": {
      const balances = await fetchWalletBalance("xlayer");
      return {
        ok: true,
        skillSlug: skill.slug,
        summary: "Fetched live X Layer wallet balances.",
        receiptId: crypto.randomUUID(),
        data: balances
      };
    }
    case "contract-risk-scan": {
      const scan = await scanToken((payload.contractAddress ?? "0x779ded0c9e1022225f8e0630b35a9b54be713736").toLowerCase());
      return {
        ok: true,
        skillSlug: skill.slug,
        summary: "Scanned the destination token for major execution risks.",
        receiptId: crypto.randomUUID(),
        data: scan
      };
    }
    case "swap-route-quote": {
      const quote = await quoteSwap(payload.amount ?? "0.01");
      return {
        ok: true,
        skillSlug: skill.slug,
        summary: "Calculated the best available swap route on X Layer.",
        receiptId: crypto.randomUUID(),
        data: quote
      };
    }
    case "safe-swap-execute": {
      const walletAddress = payload.walletAddress ?? "0x89740dfdc33b07242d1276ad453e00eb56c25884";
      const result = await executeSafeSwap(payload.amount ?? "0.001", walletAddress);
      return {
        ok: true,
        skillSlug: skill.slug,
        summary: "Executed a guarded swap after routing through the OKX swap stack.",
        receiptId: crypto.randomUUID(),
        transactionHash: result?.data?.swapTxHash,
        data: result
      };
    }
    default:
      return {
        ok: false,
        skillSlug: skill.slug,
        summary: "No executor is configured for this skill yet.",
        receiptId: crypto.randomUUID()
      };
  }
}

export function getSeedSkills() {
  return skillSeeds;
}
