import { expect } from "chai";
import hre from "hardhat";

describe("SkillRegistry", function () {
  async function deployFixture() {
    const [owner, creator, user] = await hre.ethers.getSigners();
    const factory = await hre.ethers.getContractFactory("SkillRegistry");
    const registry = await factory.deploy(owner.address);
    await registry.waitForDeployment();

    return { owner, creator, user, registry };
  }

  it("registers and reads a skill", async function () {
    const { creator, registry } = await deployFixture();

    const tx = await registry.connect(creator).registerSkill(
      "Market Price Snapshot",
      "Live pricing",
      "/skills/market-price-snapshot/invoke",
      "market",
      "USDT",
      100000n
    );
    await tx.wait();

    const ids = await registry.getAllSkillIds();
    const stored = await registry.getSkill(ids[0]);

    expect(ids).to.have.length(1);
    expect(stored.creator).to.equal(creator.address);
    expect(stored.version).to.equal(1n);
    expect(stored.priceAtomic).to.equal(100000n);
  });

  it("records invocation only for owner", async function () {
    const { owner, creator, user, registry } = await deployFixture();

    await registry.connect(creator).registerSkill(
      "Risk Scan",
      "Risk scan",
      "/skills/contract-risk-scan/invoke",
      "security",
      "USDT",
      120000n
    );

    const [id] = await registry.getAllSkillIds();

    await expect(registry.connect(user).recordInvocation(id, user.address)).to.be.reverted;

    await expect(registry.connect(owner).recordInvocation(id, user.address))
      .to.emit(registry, "SkillInvoked");
  });
});
