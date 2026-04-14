import * as dotenv from "dotenv";
import hre from "hardhat";

dotenv.config({ path: "../../.env" });
dotenv.config();

const skillSeeds = [
  {
    name: "Market Price Snapshot",
    description: "Returns current price, 24h movement, and route context for a token.",
    endpointPath: "/skills/market-price-snapshot/invoke",
    category: "market",
    priceAtomic: "100000"
  },
  {
    name: "Wallet Balance Check",
    description: "Returns X Layer token balances and summarized holdings.",
    endpointPath: "/skills/wallet-balance-check/invoke",
    category: "wallet",
    priceAtomic: "80000"
  },
  {
    name: "Contract Risk Scan",
    description: "Flags token risk markers before execution.",
    endpointPath: "/skills/contract-risk-scan/invoke",
    category: "security",
    priceAtomic: "120000"
  },
  {
    name: "Swap Route Quote",
    description: "Quotes a swap route, output, and impact on X Layer.",
    endpointPath: "/skills/swap-route-quote/invoke",
    category: "execution",
    priceAtomic: "180000"
  },
  {
    name: "Safe Swap Execute",
    description: "Runs a guarded swap after risk screening and routing.",
    endpointPath: "/skills/safe-swap-execute/invoke",
    category: "composite",
    priceAtomic: "250000"
  }
] as const;

async function main() {
  const registryAddress = process.env.NEXT_PUBLIC_REGISTRY_ADDRESS;

  if (!registryAddress) {
    throw new Error("NEXT_PUBLIC_REGISTRY_ADDRESS is required");
  }

  const registry = await hre.ethers.getContractAt("SkillRegistry", registryAddress);

  for (const seed of skillSeeds) {
    const tx = await registry.registerSkill(
      seed.name,
      seed.description,
      seed.endpointPath,
      seed.category,
      "USDT",
      BigInt(seed.priceAtomic)
    );

    const receipt = await tx.wait();
    console.log(`${seed.endpointPath}: ${receipt?.hash}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
