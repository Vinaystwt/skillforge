import { getMarketplaceData } from "../../lib/api";
import { InvokePanel } from "../../components/invoke-panel";

export default async function DemoPage() {
  const marketplace = await getMarketplaceData();
  const flagship = marketplace.skills.find((skill) => skill.slug === "safe-swap-execute") ?? marketplace.skills[0];

  return (
    <main className="page-shell pt-10">
      <section className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[2.4rem] border border-white/10 bg-[rgba(10,10,8,0.82)] p-1 shadow-shell">
          <div className="rounded-[calc(2.4rem-4px)] border border-white/6 bg-[linear-gradient(150deg,rgba(17,16,13,0.95),rgba(9,9,7,0.96))] p-8">
            <div className="eyebrow">Guided judge flow</div>
            <h1 className="mt-6 font-display text-[clamp(2.8rem,5vw,4.5rem)] leading-[0.94] text-fog">One script. One wallet. Reusable execution.</h1>
            <ol className="mt-8 space-y-5 text-sm leading-7 text-dune/76">
              <li>1. Fetch a market snapshot for OKB.</li>
              <li>2. Run a token risk scan on the destination asset.</li>
              <li>3. Route an x402-paid invocation through SkillForge.</li>
              <li>4. Execute the guarded swap and surface the transaction hash.</li>
            </ol>
            <div className="mt-10 rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-dune/45">Flagship skill</p>
              <p className="mt-3 text-2xl text-fog">{flagship.name}</p>
              <p className="mt-2 text-sm text-dune/74">{flagship.description}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2.4rem] border border-white/10 bg-[rgba(10,10,8,0.82)] p-1 shadow-shell">
          <div className="rounded-[calc(2.4rem-4px)] border border-white/6 bg-[linear-gradient(150deg,rgba(17,16,13,0.95),rgba(9,9,7,0.96))] p-8">
            <div className="grid gap-4 md:grid-cols-3">
              {["snapshot", "risk", "execute"].map((step, index) => (
                <div key={step} className="rounded-[1.45rem] border border-white/8 bg-white/[0.04] p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-dune/45">Step 0{index + 1}</p>
                  <p className="mt-3 text-lg text-fog capitalize">{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-[1.75rem] border border-[rgba(193,109,69,0.32)] bg-[radial-gradient(circle_at_top,rgba(193,109,69,0.16),transparent_40%),rgba(255,255,255,0.03)] p-6">
              <p className="text-[10px] uppercase tracking-[0.24em] text-dune/45">Live proof</p>
              <p className="mt-4 text-sm leading-7 text-dune/76">Recent mainnet swap routed by the Agentic Wallet:</p>
              <p className="mt-4 break-all text-sm text-fog">0x0d6da5ea1cc77c0e6943d730d7392e9a99d04ac599ab8d850214f94b4837c2ba</p>
            </div>
            <div className="mt-8 space-y-4">
              {marketplace.activity.map((item) => (
                <div key={item.id} className="rounded-[1.35rem] border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-dune/45">{item.actor}</p>
                  <p className="mt-2 text-lg text-fog">{item.skillName}</p>
                  <p className="mt-2 text-sm leading-7 text-dune/72">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mt-12">
        <InvokePanel skill={flagship} />
      </section>
    </main>
  );
}
