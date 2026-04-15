import Link from "next/link";
import { notFound } from "next/navigation";
import { getSkill } from "../../../lib/api";
import { InvokePanel } from "../../../components/invoke-panel";

export default async function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = await getSkill(slug);

  if (!skill) {
    notFound();
  }

  return (
    <main className="page-shell pt-10">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2.2rem] border border-white/10 bg-[rgba(10,10,8,0.85)] p-1 shadow-shell">
          <div className="rounded-[calc(2.2rem-4px)] border border-white/6 bg-[linear-gradient(150deg,rgba(16,15,12,0.95),rgba(10,10,8,0.96))] p-8 md:p-10">
            <div className="eyebrow">{skill.category} / version {skill.version}</div>
            <h1 className="mt-8 font-display text-[clamp(3rem,6vw,5rem)] leading-[0.94] text-fog">{skill.name}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-dune/75">{skill.longDescription}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              {skill.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-dune/70">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-dune/45">Price</p>
                <p className="mt-3 text-2xl text-fog">{skill.priceLabel}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-dune/45">Invocations</p>
                <p className="mt-3 text-2xl text-fog">{skill.invocationCount.toLocaleString()}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-dune/45">Backing</p>
                <p className="mt-3 text-lg text-fog">{skill.backing}</p>
              </div>
            </div>
          </div>
        </div>
        <aside className="space-y-6">
          <InvokePanel skill={skill} />
          <div className="rounded-[2rem] border border-white/10 bg-[rgba(12,12,10,0.86)] p-1 shadow-shell">
            <div className="rounded-[calc(2rem-4px)] border border-white/6 bg-[rgba(16,15,13,0.96)] p-6">
              <p className="text-[10px] uppercase tracking-[0.26em] text-dune/50">Invocation surface</p>
              <h2 className="mt-4 font-display text-3xl text-fog">Ready for x402-paid execution</h2>
              <p className="mt-4 text-sm leading-7 text-dune/74">
                Endpoint: <span className="text-fog">{skill.endpointPath}</span>
              </p>
              <p className="mt-2 text-sm leading-7 text-dune/74">Sample prompt: {skill.samplePrompt}</p>
              <Link
                href="/demo"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-fog px-5 py-3 text-sm uppercase tracking-[0.2em] text-ink transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px]"
              >
                Run demo flow
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-fog">↗</span>
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-[rgba(12,12,10,0.86)] p-1 shadow-shell">
            <div className="rounded-[calc(2rem-4px)] border border-white/6 bg-[rgba(16,15,13,0.96)] p-6">
              <p className="text-[10px] uppercase tracking-[0.26em] text-dune/50">Creator stats</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-dune/74">
                  <span>Creator</span>
                  <span className="text-fog">{skill.creator.slice(0, 8)}...{skill.creator.slice(-4)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-dune/74">
                  <span>Rating</span>
                  <span className="text-fog">{skill.rating.toFixed(1)} / 5 from {skill.ratingCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-dune/74">
                  <span>Status</span>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-200">Active</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
