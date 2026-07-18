"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { MethodologyStage } from "@/schemas/content-types";

export function MethodologySection({
  name,
  intro,
  stages,
}: {
  name: string;
  intro: string;
  stages: MethodologyStage[];
}) {
  const [activeSlug, setActiveSlug] = useState(stages[0]?.slug ?? "");
  const active = stages.find((stage) => stage.slug === activeSlug) ?? stages[0];
  const baseId = useId();

  return (
    <section className="border-b border-paper-200 bg-paper-50 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading eyebrow="Methodology" title={name} intro={intro} />

        <ol className="mt-12 flex flex-col gap-0 sm:flex-row sm:items-start sm:gap-2">
          {stages.map((stage, index) => {
            const isActive = stage.slug === activeSlug;
            const panelId = `${baseId}-panel-${stage.slug}`;
            return (
              <li key={stage.slug} className="flex flex-1 flex-col sm:items-center">
                <div className="flex items-center gap-2 sm:w-full sm:flex-col sm:gap-0">
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    onClick={() => setActiveSlug(stage.slug)}
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm font-semibold transition-colors ${
                      isActive
                        ? "border-accent-500 bg-accent-500 text-ink-950"
                        : "border-ink-800/30 bg-paper-50 text-ink-800 hover:border-accent-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                  {index < stages.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-paper-200 sm:mt-[-22px] sm:h-px sm:w-full sm:translate-y-[-22px]"
                    />
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSlug(stage.slug)}
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  className={`mt-3 font-display text-sm font-semibold sm:text-center ${
                    isActive ? "text-accent-text" : "text-ink-950"
                  }`}
                >
                  {stage.name}
                </button>
              </li>
            );
          })}
        </ol>

        {active ? (
          <div id={`${baseId}-panel-${active.slug}`} className="mt-10 grid gap-6 border border-paper-200 bg-paper-100 p-6 sm:grid-cols-3 sm:p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-ink-800/70">Purpose</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-950">{active.purpose}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-ink-800/70">Inputs</p>
              <ul className="mt-2 space-y-1.5">
                {active.inputs.map((input) => (
                  <li key={input} className="text-sm text-ink-800">
                    {input}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-ink-800/70">Outputs</p>
              <ul className="mt-2 space-y-1.5">
                {active.outputs.map((output) => (
                  <li key={output} className="text-sm text-ink-800">
                    {output}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        <Link
          href="/methodology"
          className="mt-6 inline-block font-mono text-xs uppercase tracking-wide text-accent-text hover:underline"
        >
          Full methodology, including questions asked and risks checked →
        </Link>
      </Container>
    </section>
  );
}
