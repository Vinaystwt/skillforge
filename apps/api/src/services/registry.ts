import { createPublicClient, getContract, http } from "viem";
import { defineChain } from "viem";
import { env } from "../config.js";

const xlayer = defineChain({
  id: 196,
  name: "X Layer",
  nativeCurrency: { name: "OKB", symbol: "OKB", decimals: 18 },
  rpcUrls: {
    default: { http: [env.X_LAYER_RPC] }
  },
  blockExplorers: {
    default: { name: "OKLink", url: "https://www.oklink.com/xlayer" }
  }
});

const registryAbi = [
  {
    type: "function",
    stateMutability: "view",
    name: "getAllSkillIds",
    inputs: [],
    outputs: [{ name: "", type: "bytes32[]" }]
  },
  {
    type: "function",
    stateMutability: "view",
    name: "getSkill",
    inputs: [{ name: "skillId", type: "bytes32" }],
    outputs: [
      {
        components: [
          { name: "name", type: "string" },
          { name: "description", type: "string" },
          { name: "endpoint", type: "string" },
          { name: "category", type: "string" },
          { name: "pricingAsset", type: "string" },
          { name: "creator", type: "address" },
          { name: "priceAtomic", type: "uint256" },
          { name: "invocationCount", type: "uint256" },
          { name: "ratingBps", type: "uint256" },
          { name: "ratingCount", type: "uint256" },
          { name: "active", type: "bool" },
          { name: "version", type: "uint256" },
          { name: "createdAt", type: "uint64" },
          { name: "updatedAt", type: "uint64" }
        ],
        type: "tuple"
      }
    ]
  }
] as const;

export function getRegistryClient() {
  if (!env.NEXT_PUBLIC_REGISTRY_ADDRESS) return null;

  const publicClient = createPublicClient({
    chain: xlayer,
    transport: http()
  });

  return getContract({
    address: env.NEXT_PUBLIC_REGISTRY_ADDRESS as `0x${string}`,
    abi: registryAbi,
    client: publicClient
  });
}

