export default function PublishPage() {
  return (
    <main className="page-shell pt-10">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="eyebrow">Creator intake</div>
          <h1 className="mt-6 font-display text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.94] text-fog">Publish a reusable capability, not another isolated bot.</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-dune/75">
            SkillForge treats skills like infrastructure products: versioned endpoints, onchain provenance, and clear invocation economics. The publish flow is intentionally compact so a judge can see the creator story immediately.
          </p>
        </div>
        <div className="rounded-[2.2rem] border border-white/10 bg-[rgba(12,12,10,0.84)] p-1 shadow-shell">
          <form className="grid gap-5 rounded-[calc(2.2rem-4px)] border border-white/6 bg-[rgba(16,15,13,0.95)] p-6 md:p-8">
            {[
              ["Skill name", "Safe Swap Execute"],
              ["Category", "composite"],
              ["Endpoint", "/skills/safe-swap-execute/invoke"],
              ["Price (USDT atomic)", "250000"]
            ].map(([label, value]) => (
              <label key={label} className="grid gap-3 text-sm text-dune/74">
                <span className="uppercase tracking-[0.2em] text-dune/48">{label}</span>
                <input
                  defaultValue={value}
                  className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-fog outline-none transition duration-500 focus:border-[rgba(193,109,69,0.45)] focus:bg-white/[0.06]"
                />
              </label>
            ))}
            <label className="grid gap-3 text-sm text-dune/74">
              <span className="uppercase tracking-[0.2em] text-dune/48">Description</span>
              <textarea
                defaultValue="Combine token risk screening and swap execution into one callable primitive."
                className="min-h-40 rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-fog outline-none transition duration-500 focus:border-[rgba(193,109,69,0.45)] focus:bg-white/[0.06]"
              />
            </label>
            <button
              type="button"
              className="mt-3 inline-flex items-center justify-between rounded-full bg-fog px-5 py-3 text-sm uppercase tracking-[0.2em] text-ink transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px]"
            >
              Stage registry entry
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-fog">↗</span>
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

