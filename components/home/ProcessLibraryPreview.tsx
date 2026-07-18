"use client";

import { useState } from "react";
import Link from "next/link";
import type { HomepageContent, ProcessCategory } from "@/schemas/content-types";

/** Minimal shape — see docs/10-deployment.md on client-bundle discipline. */
export type ProcessPreviewEntry = { slug: string; name: string; category: string };

export function ProcessLibraryPreview({
  categories,
  processes,
  copy,
}: {
  categories: ProcessCategory[];
  processes: ProcessPreviewEntry[];
  copy: HomepageContent["processLibrary"];
}) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.slug ?? "");
  const current = categories.find((category) => category.slug === activeCategory) ?? categories[0];
  const currentProcesses = processes.filter((process) => process.category === activeCategory);

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-wide text-paper-50/60">
        {processes.length} processes across {categories.length} families
      </p>

      <div role="tablist" aria-label="Process categories" className="mt-6 flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = category.slug === activeCategory;
          return (
            <button
              key={category.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(category.slug)}
              className={`border px-3 py-2 font-mono text-xs uppercase tracking-wide transition-colors ${
                isActive
                  ? "border-accent-400 bg-accent-500 text-ink-950"
                  : "border-paper-50/30 text-paper-50/80 hover:border-paper-50/60"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {current ? (
        <div role="tabpanel" className="mt-8 border border-paper-50/15 bg-ink-900 p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-lg font-semibold text-paper-50">{current.name}</h3>
            <span className="font-mono text-xs text-paper-50/50">{currentProcesses.length} processes</span>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-paper-50/70">{current.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {currentProcesses.map((process) => (
              <li key={process.slug}>
                <Link
                  href={`/processes/${process.slug}`}
                  className="inline-block border border-paper-50/25 px-3 py-1.5 text-xs text-paper-50/90 hover:border-accent-400 hover:text-accent-400"
                >
                  {process.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Link
        href="/processes"
        className="mt-6 inline-block font-mono text-xs uppercase tracking-wide text-accent-400 hover:underline"
      >
        Browse the process library →
      </Link>
    </div>
  );
}
