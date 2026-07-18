"use client";

import { useId } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ENGAGEMENT_STAGE_LABEL } from "@/lib/labels";
import type { EngagementStage, ProcessCategory } from "@/schemas/content-types";

export type ProcessExplorerEntry = {
  slug: string;
  name: string;
  category: string;
  objective: string;
  industrySlugs: string[];
  stages: EngagementStage[];
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

export function ProcessLibraryExplorer({
  processes,
  categories,
  industries,
}: {
  processes: ProcessExplorerEntry[];
  categories: ProcessCategory[];
  industries: { slug: string; name: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const industrySelectId = useId();

  const activeCategories = parseList(searchParams.get("category"));
  const activeIndustry = searchParams.get("industry") ?? "";
  const activeStages = parseList(searchParams.get("stage"));

  function updateParams(next: { category?: string[]; industry?: string; stage?: string[] }) {
    const params = new URLSearchParams(searchParams.toString());
    const nextCategories = next.category ?? activeCategories;
    const nextIndustry = next.industry ?? activeIndustry;
    const nextStages = next.stage ?? activeStages;

    if (nextCategories.length) params.set("category", nextCategories.join(","));
    else params.delete("category");

    if (nextIndustry) params.set("industry", nextIndustry);
    else params.delete("industry");

    if (nextStages.length) params.set("stage", nextStages.join(","));
    else params.delete("stage");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function toggleCategory(slug: string) {
    const next = activeCategories.includes(slug)
      ? activeCategories.filter((c) => c !== slug)
      : [...activeCategories, slug];
    updateParams({ category: next });
  }

  function toggleStage(stage: string) {
    const next = activeStages.includes(stage) ? activeStages.filter((s) => s !== stage) : [...activeStages, stage];
    updateParams({ stage: next });
  }

  function clearAll() {
    router.replace(pathname, { scroll: false });
  }

  const filtered = processes.filter((process) => {
    if (activeCategories.length && !activeCategories.includes(process.category)) return false;
    if (activeIndustry && !process.industrySlugs.includes(activeIndustry)) return false;
    if (activeStages.length && !activeStages.some((stage) => process.stages.includes(stage as EngagementStage))) {
      return false;
    }
    return true;
  });

  const hasFilters = activeCategories.length > 0 || activeIndustry !== "" || activeStages.length > 0;

  return (
    <div>
      <div className="flex flex-wrap items-start gap-x-8 gap-y-5">
        <fieldset>
          <legend className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Category</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = activeCategories.includes(category.slug);
              return (
                <button
                  key={category.slug}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => toggleCategory(category.slug)}
                  className={`border px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
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

        <div>
          <label htmlFor={industrySelectId} className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">
            Industry
          </label>
          <select
            id={industrySelectId}
            value={activeIndustry}
            onChange={(event) => updateParams({ industry: event.target.value })}
            className="mt-2 block border border-paper-200 bg-paper-50 px-3 py-[7px] font-mono text-xs uppercase tracking-wide text-ink-950"
          >
            <option value="">All industries</option>
            {industries.map((industry) => (
              <option key={industry.slug} value={industry.slug}>
                {industry.name}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Engagement stage</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {STAGE_OPTIONS.map((stage) => {
              const isActive = activeStages.includes(stage);
              return (
                <button
                  key={stage}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => toggleStage(stage)}
                  className={`border px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
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

        {hasFilters ? (
          <button
            type="button"
            onClick={clearAll}
            className="self-end font-mono text-xs uppercase tracking-wide text-accent-text hover:underline"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      <p aria-live="polite" className="mt-6 font-mono text-xs uppercase tracking-wide text-ink-800/70">
        {filtered.length} of {processes.length} processes
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 border border-paper-200 bg-paper-50 p-8 text-center">
          <p className="text-sm text-ink-800">No processes match these filters.</p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-3 font-mono text-xs uppercase tracking-wide text-accent-text hover:underline"
          >
            Clear filters to see all {processes.length} processes
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid gap-px border border-paper-200 bg-paper-200 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((process) => (
            <li key={process.slug} className="bg-paper-50 p-5">
              <Link href={`/processes/${process.slug}`} className="block">
                <p className="font-display text-sm font-semibold text-ink-950">{process.name}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-800">{process.objective}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
