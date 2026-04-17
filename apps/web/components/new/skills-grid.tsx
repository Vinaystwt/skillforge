"use client";

import { useState } from "react";
import type { SkillListing } from "../../lib/catalog";
import { SkillCard, SkillCardFeatured } from "./skill-card";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "market", label: "Market" },
  { value: "wallet", label: "Wallet" },
  { value: "security", label: "Security" },
  { value: "execution", label: "Execution" },
  { value: "composite", label: "Composite" }
];

const CAT_COLORS: Record<string, string> = {
  all: "var(--accent)",
  market: "#22D3EE",
  wallet: "#34D399",
  security: "#FBBF24",
  execution: "#818CF8",
  composite: "#A78BFA"
};

interface Props {
  featured: SkillListing[];
  skills: SkillListing[];
}

export function SkillsGrid({ featured, skills }: Props) {
  const [active, setActive] = useState("all");

  const filteredFeatured = active === "all"
    ? featured
    : featured.filter((s) => s.category === active);

  const filteredSkills = active === "all"
    ? skills.filter((s) => !s.featured)
    : skills.filter((s) => s.category === active && !s.featured);

  const color = CAT_COLORS[active] ?? "var(--accent)";

  return (
    <div>
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.value;
          const c = CAT_COLORS[cat.value] ?? "var(--accent)";
          return (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150"
              style={{
                background: isActive ? `${c}18` : "var(--elevated)",
                border: `1px solid ${isActive ? `${c}55` : "rgba(255,255,255,0.06)"}`,
                color: isActive ? c : "var(--text-muted)"
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Featured */}
      {filteredFeatured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {filteredFeatured.slice(0, 2).map((skill) => (
            <SkillCardFeatured key={skill.slug} skill={skill} />
          ))}
        </div>
      )}

      {/* All */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>
      ) : filteredFeatured.length === 0 ? (
        <p className="text-sm py-8 text-center" style={{ color: "var(--text-muted)" }}>
          No {active} skills registered yet.
        </p>
      ) : null}
    </div>
  );
}
