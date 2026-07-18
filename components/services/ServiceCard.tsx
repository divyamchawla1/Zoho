"use client";

import { useId, useState } from "react";
import Link from "next/link";
import type { CaseStudy, Process, Service } from "@/schemas/content-types";

function FieldList({ title, items, tone = "ink" }: { title: string; items: string[]; tone?: "ink" | "danger" | "accent" }) {
  const border = tone === "danger" ? "border-danger-500" : tone === "accent" ? "border-accent-500" : "border-ink-800/30";
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">{title}</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className={`border-l-2 ${border} pl-3 text-sm leading-relaxed text-ink-800`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServiceCard({
  service,
  caseStudies,
  relatedProcesses,
}: {
  service: Service;
  caseStudies: CaseStudy[];
  relatedProcesses: Process[];
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border border-paper-200 bg-paper-50">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full flex-col items-start gap-2 p-5 text-left hover:bg-paper-100"
      >
        <div className="flex w-full items-start justify-between gap-4">
          <p className="font-display text-base font-semibold text-ink-950">{service.title}</p>
          <span aria-hidden="true" className="shrink-0 font-mono text-lg text-ink-800/70">
            {open ? "−" : "+"}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-ink-800">{service.audience}</p>
      </button>

      {open ? (
        <div id={panelId} className="border-t border-paper-200 p-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Needed When</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-800">{service.neededWhen}</p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <FieldList title="Inputs" items={service.inputs} />
            <FieldList title="Activities" items={service.activities} tone="accent" />
          </div>

          <div className="mt-6">
            <FieldList title="Deliverables" items={service.deliverables} />
          </div>

          <div className="mt-6">
            <FieldList title="Not Included" items={service.notIncluded} tone="danger" />
          </div>

          {relatedProcesses.length > 0 ? (
            <div className="mt-6">
              <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Related Processes</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {relatedProcesses.map((process) => (
                  <li key={process.slug}>
                    <Link
                      href={`/processes/${process.slug}`}
                      className="inline-block border border-paper-200 px-3 py-1.5 text-xs text-ink-800 hover:border-accent-500 hover:text-accent-text"
                    >
                      {process.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {caseStudies.length > 0 ? (
            <div className="mt-6">
              <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Case Studies</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {caseStudies.map((caseStudy) => (
                  <li key={caseStudy.slug}>
                    <Link
                      href={`/work/${caseStudy.slug}`}
                      className="inline-block border border-paper-200 px-3 py-1.5 text-xs text-ink-800 hover:border-accent-500 hover:text-accent-text"
                    >
                      {caseStudy.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
