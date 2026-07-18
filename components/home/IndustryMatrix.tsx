"use client";

import { useState } from "react";
import Link from "next/link";
import type { ExposureLevel } from "@/schemas/content-types";
import { EXPOSURE_LABEL } from "@/lib/labels";

/**
 * Minimal shape only — nothing more of Industry/Process is sent to the
 * client than what this component renders. See docs/10-deployment.md:
 * "anything imported into a client component is published."
 */
export type IndustryMatrixEntry = {
  slug: string;
  name: string;
  exposure: ExposureLevel;
  processes: { slug: string; name: string }[];
};

export function IndustryMatrix({ industries }: { industries: IndustryMatrixEntry[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = industries.find((industry) => industry.slug === activeSlug) ?? null;

  return (
    <ul className="grid grid-cols-1 gap-px border border-paper-200 bg-paper-200 sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((industry) => {
        const isActive = industry.slug === activeSlug;
        return (
          <li key={industry.slug} className="bg-paper-50">
            <button
              type="button"
              onFocus={() => setActiveSlug(industry.slug)}
              onMouseEnter={() => setActiveSlug(industry.slug)}
              onClick={() => setActiveSlug(industry.slug)}
              aria-expanded={isActive}
              className={`flex w-full flex-col items-start gap-1.5 p-4 text-left transition-colors ${
                isActive ? "bg-ink-950 text-paper-50" : "text-ink-950 hover:bg-paper-100"
              }`}
            >
              <span className="font-display text-sm font-semibold">{industry.name}</span>
              <span
                className={`font-mono text-[10px] uppercase tracking-wide ${
                  isActive ? "text-accent-400" : "text-accent-text"
                }`}
              >
                {EXPOSURE_LABEL[industry.exposure]}
              </span>
            </button>

            {isActive ? (
              <div className="border-t border-paper-200 bg-ink-950 p-4 text-paper-50">
                <p className="font-mono text-[10px] uppercase tracking-wide text-paper-50/60">
                  Processes worked on
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {active?.processes.slice(0, 8).map((process) => (
                    <li key={process.slug} className="border border-paper-50/30 px-2 py-0.5 text-xs">
                      {process.name}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="mt-3 inline-block font-mono text-xs uppercase tracking-wide text-accent-400 hover:underline"
                >
                  View industry →
                </Link>
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
