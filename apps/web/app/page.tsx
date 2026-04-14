import { SkillCard } from "../components/skill-card";
import { ActivityFeed } from "../components/activity-feed";
import { getMarketplaceData } from "../lib/api";

export default async function HomePage() {
  const marketplace = await getMarketplaceData();

  return (
    <main className="page-shell pt-10">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2.4rem] border border-white/10 bg-[rgba(10,10,8,0.82)] p-1 shadow-shell">
          <div className="rounded-[calc(2.4rem-4px)] border border-white/6 bg-[linear-gradient(135deg,rgba(17,16,13,0.96),rgba(9,9,7,0.96))] px-6 py-8 md:px-10 md:py-12">
            <div className="eyebrow hero-copy">Skills Arena / X Layer mainnet</div>
            <h1 className="hero-copy mt-8 max-w-3xl font-display text-[clamp(3rem,7vw,6.4rem)] leading-[0.92] tracking-[-0.04em] text-fog">
              The paid execution layer for reusable agent skills.
            </h1>
            <p className="hero-copy mt-8 max-w-2xl text-base leading-8 text-dune/76 md:text-lg">
              SkillForge turns reusable capabilities into onchain-discoverable, agent-consumable primitives. Publish a skill, price invocation, route execution through OKX tooling, and keep proof on X Layer.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-dune/45">Skills</p>
                <p className="mt-3 text-3xl text-fog">{marketplace.stats.totalSkills}</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-dune/45">Invocations</p>
                <p className="mt-3 text-3xl text-fog">{marketplace.stats.totalInvocations.toLocaleString()}</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-dune/45">Monthly revenue</p>
                <p className="mt-3 text-3xl text-fog">${marketplace.stats.monthlyRevenueUsd.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
        <ActivityFeed items={marketplace.activity} />
      </section>

      <section className="mt-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="eyebrow">Featured registry entries</div>
            <h2 className="mt-5 font-display text-[clamp(2.3rem,5vw,4.6rem)] leading-none text-fog">Built for agents. Clear for judges.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-dune/72">
            Start with reusable primitives that a human judge can understand instantly: market reads, risk filters, route quotes, and one guarded execution skill that shows composability without adding protocol noise.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {marketplace.featured.map((skill, index) => (
            <div key={skill.slug} className={index === 0 ? "lg:col-span-2" : ""}>
              <SkillCard skill={skill} featured={index === 0} />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-6 lg:grid-cols-2">
        {marketplace.skills.map((skill) => (
          <SkillCard key={skill.slug} skill={skill} />
        ))}
      </section>
    </main>
  );
}

