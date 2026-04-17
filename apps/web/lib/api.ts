import {
  activityFeed,
  marketplaceStats,
  skillListings,
  type SkillActivity,
  type SkillListing
} from "./catalog";

/**
 * On Vercel, we use internal Next.js API routes directly.
 * Server components call lib/server/catalog.ts functions directly.
 * This file provides safe client-side fallbacks with the seeded data.
 */

export async function getMarketplaceData() {
  // Server-side: call marketplace route via internal fetch
  if (typeof window === "undefined") {
    try {
      const { getMarketplacePayload } = await import("./server/catalog");
      return await getMarketplacePayload();
    } catch {
      // fallback to static data
    }
  }

  return {
    stats: marketplaceStats,
    featured: skillListings.filter((skill) => skill.featured),
    skills: skillListings,
    activity: activityFeed
  };
}

export async function getSkill(slug: string): Promise<SkillListing | null> {
  return skillListings.find((skill) => skill.slug === slug) ?? null;
}

export async function getSkills(): Promise<SkillListing[]> {
  return skillListings;
}

export async function getActivity(): Promise<SkillActivity[]> {
  return activityFeed;
}
