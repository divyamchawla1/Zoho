"use client";

import { useId } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ENGAGEMENT_STAGE_LABEL } from "@/lib/labels";
import type { EngagementStage, ProcessCategory } from "@/schemas/content-types";

export type WorkExplorerEntry = {
  slug: string;
  title: string;
  locationContext: string;
  challenge: string;
  industrySlugs: string[];
  processCategorySlugs: string[];
  engagementStages: EngagementStage[];
  technologyGroups: string[];
};

const STAGE_OPTIONS: EngagementStage[] = [
  "discovery",
  "process-mapping",
  "architecture",
  "requirement-documentation",
  "estimation",
  "delivery-leadership",
  "uat",
];

function parseList(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

export function WorkIndexExplorer({
  caseStudies,
  categories,
  industries,
  technologyGroups,
}: {
  caseStudies: WorkExplorerEntry[];
  categories: ProcessCategory[];
  industries: { slug: string; name: string }[];
  technologyGroups: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const industrySelectId = useId();

  const activeIndustry = searchParams.get("industry") ?? "";
  const activeCategories = parseList(searchParams.get("category"));
  const activeStages = parseList(searchParams.get("stage"));
  const activeTech = parseList(searchParams.get("technology"));

  function updateParams(next: {
    industry?: string;
    category?: string[];
    stage?: string[];
    technology?: string[];
  }) {
    const params = new URLSearchParams(searchParams.toString());
    const nextIndustry = next.industry ?? activeIndustry;
    const nextCategories = next.category ?? activeCategories;
    const nextStages = next.stage ?? activeStages;
    const nextTech = next.technology ?? activeTech;

    if (nextIndustry) params.set("industry", nextIndustry);
    else params.delete("industry");

    if (nextCategories.length) params.set("category", nextCategories.join(","));
    else params.delete("category");

    if (nextStages.length) params.set("stage", nextStages.join(","));
    else params.delete("stage");

    if (nextTech.length) params.set("technology", nextTech.join(","));
    else params.delete("technology");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function toggle(list: string[], value: string): string[] {
    return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
  }

  function clearAll() {
    router.replace(pathname, { scroll: false });
  }

  const filtered = caseStudies.filter((cs) => {
    if (activeIndustry && !cs.industrySlugs.includes(activeIndustry)) return false;
    if (activeCategories.length && !activeCategories.some((c) => cs.processCategorySlugs.includes(c))) {
      return false;
    }
    if (activeStages.length && !activeStages.some((s) => cs.engagementStages.includes(s as EngagementStage))) {
      return false;
    }
    if (activeTech.length && !activeTech.some((t) => cs.technologyGroups.includes(t))) return false;
    return true;
  });

  const hasFilters =
    activeIndustry !== "" || activeCategories.length > 0 || activeStages.length > 0 || activeTech.length > 0;

  return (
    <div>
      <div className="flex flex-wrap items-start gap-x-8 gap-y-5">
        <div className="min-w-0 max-w-full">
          <label htmlFor={industrySelectId} className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">
            Industry
          </label>
          <select
            id={industrySelectId}
            value={activeIndustry}
            onChange={(event) => updateParams({ industry: event.target.value })}
            className="mt-2 block min-h-11 max-w-full border border-paper-200 bg-paper-50 px-3 py-[7px] font-mono text-xs uppercase tracking-wide text-ink-950 sm:min-h-0"
          >
            <option value="">All industries</option>
            {industries.map((industry) => (
              <option key={industry.slug} value={industry.slug}>
                {industry.name}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="min-w-0 max-w-full">
          <legend className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Process category</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = activeCategories.includes(category.slug);
              return (
                <button
                  key={category.slug}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => updateParams({ category: toggle(activeCategories, category.slug) })}
                  className={`inline-flex min-h-11 items-center justify-center border px-3 py-1.5 text-center font-mono text-xs uppercase tracking-wide transition-colors sm:min-h-0 ${
                    isActive
                      ? "border-accent-500 bg-accent-500 text-ink-950"
                      : "border-paper-200 text-ink-800 hover:border-ink-950"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="min-w-0 max-w-full">
          <legend className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Engagement stage</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {STAGE_OPTIONS.map((stage) => {
              const isActive = activeStages.includes(stage);
              return (
                <button
                  key={stage}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => updateParams({ stage: toggle(activeStages, stage) })}
                  className={`inline-flex min-h-11 items-center justify-center border px-3 py-1.5 text-center font-mono text-xs uppercase tracking-wide transition-colors sm:min-h-0 ${
                    isActive
                      ? "border-accent-500 bg-accent-500 text-ink-950"
                      : "border-paper-200 text-ink-800 hover:border-ink-950"
                  }`}
                >
                  {ENGAGEMENT_STAGE_LABEL[stage]}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="min-w-0 max-w-full">
          <legend className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Technology group</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {technologyGroups.map((name) => {
              const isActive = activeTech.includes(name);
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => updateParams({ technology: toggle(activeTech, name) })}
                  className={`inline-flex min-h-11 items-center justify-center border px-3 py-1.5 text-center font-mono text-xs uppercase tracking-wide transition-colors sm:min-h-0 ${
                    isActive
                      ? "border-accent-500 bg-accent-500 text-ink-950"
                      : "border-paper-200 text-ink-800 hover:border-ink-950"
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </fieldset>

        {hasFilters ? (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex min-h-11 items-center self-end font-mono text-xs uppercase tracking-wide text-accent-text hover:underline sm:min-h-0"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      <p aria-live="polite" className="mt-6 font-mono text-xs uppercase tracking-wide text-ink-800/70">
        {filtered.length} of {caseStudies.length} case studies
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 border border-paper-200 bg-paper-50 p-8 text-center">
          <p className="text-sm text-ink-800">No case studies match these filters.</p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-3 inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-wide text-accent-text hover:underline sm:min-h-0"
          >
            Clear filters to see all {caseStudies.length} case studies
          </button>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-paper-200 border-t border-paper-200">
          {filtered.map((caseStudy) => (
            <li key={caseStudy.slug} className="py-6">
              <Link href={`/work/${caseStudy.slug}`} className="block">
                <p className="font-mono text-xs uppercase tracking-wide text-accent-text">
                  {caseStudy.locationContext}
                </p>
                <p className="mt-2 font-display text-lg font-semibold text-ink-950">{caseStudy.title}</p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-800">{caseStudy.challenge}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {caseStudy.engagementStages.map((stage) => (
                    <span
                      key={stage}
                      className="border border-ink-800/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-800"
                    >
                      {ENGAGEMENT_STAGE_LABEL[stage]}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
