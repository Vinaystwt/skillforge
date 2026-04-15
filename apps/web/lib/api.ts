import { activityFeed, marketplaceStats, skillListings, type SkillActivity, type SkillListing } from "./catalog";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3001");

async function safeFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      next: { revalidate: 5 }
    });

    if (!response.ok) {
      return fallback;
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export async function getMarketplaceData() {
  return safeFetch("/marketplace", {
    stats: marketplaceStats,
    featured: skillListings.filter((skill) => skill.featured),
    skills: skillListings,
    activity: activityFeed
  });
}

export async function getSkill(slug: string): Promise<SkillListing | null> {
  return safeFetch(`/marketplace/skills/${slug}`, skillListings.find((skill) => skill.slug === slug) ?? null);
}

export async function getSkills(): Promise<SkillListing[]> {
  return safeFetch("/marketplace/skills", skillListings);
}

export async function getActivity(): Promise<SkillActivity[]> {
  const marketplace = await getMarketplaceData();
  return marketplace.activity;
}
