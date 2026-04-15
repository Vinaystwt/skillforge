import Link from "next/link";
import clsx from "clsx";
import type { SkillListing } from "../lib/catalog";

export function SkillCard({ skill, featured = false }: { skill: SkillListing; featured?: boolean }) {
  return (
    <Link
      href={`/skill/${skill.slug}`}
      className={clsx(
        "group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(18,18,15,0.84)] p-1 shadow-shell transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[rgba(193,109,69,0.45)]",
        featured ? "min-h-[24rem]" : "min-h-[20rem]"
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(193,109,69,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(231,225,214,0.08),transparent_28%)] opacity-80 transition duration-700 group-hover:scale-105" />
      <div className="relative flex h-full flex-col rounded-[calc(2rem-4px)] border border-white/6 bg-[rgba(10,10,8,0.92)] p-6 shadow-inset">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-dune/70">
          <span>{skill.category}</span>
          <span>{skill.maturity}</span>
        </div>
        <div className="mt-8 space-y-4">
          <h3 className="font-display text-[1.8rem] leading-none text-fog">{skill.name}</h3>
          <p className="max-w-sm text-sm leading-6 text-dune/80">{skill.headline}</p>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-4 pt-8 text-sm text-dune/78">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-dune/55">Price</p>
            <p className="mt-2 text-lg text-fog">{skill.priceLabel}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-dune/55">Invocations</p>
            <p className="mt-2 text-lg text-fog">{skill.invocationCount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-dune/55">Rating</p>
            <p className="mt-2 text-lg text-fog">{skill.rating.toFixed(1)} / 5</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-dune/55">Mode</p>
            <p className="mt-2 text-lg capitalize text-fog">{skill.invokeMode}</p>
          </div>
        </div>
        <div className="mt-8 inline-flex items-center gap-3 text-sm text-fog">
          <span>Open skill</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/8 transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
}
