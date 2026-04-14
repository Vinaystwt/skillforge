export type SkillCategory = "market" | "security" | "wallet" | "execution" | "composite";

export type SkillInvocationMode = "free" | "x402";

export interface SkillSeed {
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
  featured?: boolean;
}

export interface SkillListing extends SkillSeed {
  id: string;
  rating: number;
  ratingCount: number;
  invocationCount: number;
  creator: string;
  active: boolean;
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

