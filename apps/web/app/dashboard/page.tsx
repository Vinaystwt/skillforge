import { getMarketplaceData } from "../../lib/api";

export default async function DashboardPage() {
  const marketplace = await getMarketplaceData();

  return (
    <main className="page-shell pt-10">
      <section className="grid gap-6 lg:grid-cols-4">
        {[
          ["Registry entries", marketplace.stats.totalSkills.toString()],
          ["Creator revenue", `$${marketplace.stats.monthlyRevenueUsd.toLocaleString()}`],
          ["Invocation throughput", marketplace.stats.totalInvocations.toLocaleString()],
          ["Agentic Wallet", "online"]
        ].map(([label, value]) => (
          <div key={label} className="rounded-[2rem] border border-white/10 bg-[rgba(12,12,10,0.84)] p-1 shadow-shell">
            <div className="rounded-[calc(2rem-4px)] border border-white/6 bg-[rgba(16,15,13,0.95)] p-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-dune/50">{label}</p>
              <p className="mt-4 font-display text-4xl text-fog">{value}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-[2.2rem] border border-white/10 bg-[rgba(12,12,10,0.84)] p-1 shadow-shell">
        <div className="rounded-[calc(2.2rem-4px)] border border-white/6 bg-[rgba(16,15,13,0.95)] p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow">Creator command view</div>
              <h1 className="mt-5 font-display text-[clamp(2.4rem,4vw,4rem)] leading-none text-fog">Revenue, proof, and onchain distribution.</h1>
            </div>
            <p className="max-w-xl text-sm leading-7 text-dune/74">
              This is where the creator story lands: what has been published, what got paid, what executed, and which skills are pulling the most usage from agents and humans.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-[1.6rem] border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="bg-white/[0.03] text-dune/55">
                <tr>
                  <th className="px-4 py-4 font-medium uppercase tracking-[0.18em]">Skill</th>
                  <th className="px-4 py-4 font-medium uppercase tracking-[0.18em]">Mode</th>
                  <th className="px-4 py-4 font-medium uppercase tracking-[0.18em]">Price</th>
                  <th className="px-4 py-4 font-medium uppercase tracking-[0.18em]">Invocations</th>
                  <th className="px-4 py-4 font-medium uppercase tracking-[0.18em]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {marketplace.skills.map((skill) => (
                  <tr key={skill.slug} className="bg-[rgba(16,15,13,0.72)]">
                    <td className="px-4 py-4 text-fog">{skill.name}</td>
                    <td className="px-4 py-4 text-dune/78">{skill.invokeMode}</td>
                    <td className="px-4 py-4 text-dune/78">{skill.priceLabel}</td>
                    <td className="px-4 py-4 text-dune/78">{skill.invocationCount.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-100">
                        active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

