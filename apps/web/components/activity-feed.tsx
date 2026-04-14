import type { SkillActivity } from "@skillforge/shared";

function statusTone(status: SkillActivity["status"]) {
  switch (status) {
    case "executed":
      return "bg-[rgba(73,135,88,0.18)] text-[#b7ddb6]";
    case "paid":
      return "bg-[rgba(193,109,69,0.18)] text-[#f0c0a6]";
    case "failed":
      return "bg-[rgba(157,74,74,0.18)] text-[#f3b8b8]";
    default:
      return "bg-white/8 text-dune";
  }
}

export function ActivityFeed({ items }: { items: SkillActivity[] }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-[rgba(15,14,12,0.88)] p-1 shadow-shell">
      <div className="rounded-[calc(2rem-4px)] border border-white/6 bg-[linear-gradient(180deg,rgba(17,16,13,0.96),rgba(10,10,8,0.96))] p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-dune/55">Live feed</p>
            <h3 className="mt-3 font-display text-3xl text-fog">Agent activity</h3>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.2em] text-dune/65">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.8)]" />
            Mainnet
          </div>
        </div>
        <div className="mt-8 space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="grid gap-4 rounded-[1.35rem] border border-white/6 bg-white/[0.03] p-4 transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/[0.06]"
              style={{ animationDelay: `${index * 140}ms` }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-dune/50">{item.actor}</p>
                  <p className="mt-2 text-lg text-fog">{item.skillName}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] ${statusTone(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <p className="text-sm leading-6 text-dune/75">{item.summary}</p>
              {item.hash ? <p className="text-xs text-dune/50">{item.hash}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

