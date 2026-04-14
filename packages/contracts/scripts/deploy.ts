import * as dotenv from "dotenv";
import hre from "hardhat";

dotenv.config({ path: "../../.env" });
dotenv.config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const registryFactory = await hre.ethers.getContractFactory("SkillRegistry");
  const registry = await registryFactory.deploy(deployer.address);
  await registry.waitForDeployment();

  const address = await registry.getAddress();

  console.log(JSON.stringify({
    network: "xlayer",
    deployer: deployer.address,
    registry: address
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
