import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkflowPreviewDiagram } from "@/components/home/WorkflowPreviewDiagram";
import { resolveIndustries, resolveProcesses } from "@/lib/resolve";
import type { CaseStudy, HomepageContent, Industry, Process } from "@/schemas/content-types";

function TransformationPanel({
  caseStudy,
  index,
  industries,
  processes,
}: {
  caseStudy: CaseStudy;
  index: number;
  industries: Industry[];
  processes: Process[];
}) {
  const caseIndustries = resolveIndustries(caseStudy.industrySlugs, industries);
  const caseProcesses = resolveProcesses(caseStudy.processSlugs, processes);
  const previewSteps = caseStudy.futureState.steps.slice(0, 4);
  const remaining = caseStudy.futureState.steps.length - previewSteps.length;

  return (
    <div className="group relative grid gap-8 border-t border-paper-200 py-10 transition-colors hover:bg-paper-100/60 lg:-mx-6 lg:grid-cols-12 lg:gap-6 lg:px-6">
      {/* Stretched link: the whole panel is the click/tap target, but its
          accessible name stays just the case study title — see docs/07 on
          not burying screen-reader link names in a wall of panel text. */}
      <Link href={`/work/${caseStudy.slug}`} className="absolute inset-0" aria-label={caseStudy.title} />


      <div className="lg:col-span-3">
        <span className="font-mono text-xs text-ink-800/60 transition-colors group-hover:text-accent-text">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="mt-2 font-mono text-xs uppercase tracking-wide text-accent-text">
          {caseIndustries.map((industry) => industry.name).join(" · ")}
        </p>
        <h3 className="mt-3 font-display text-xl font-semibold text-ink-950 sm:text-2xl">{caseStudy.title}</h3>
      </div>

      <div className="lg:col-span-6">
        <p className="text-sm leading-relaxed text-ink-800 sm:text-base">
          {caseStudy.operationalChallenge[0]}
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-wide text-ink-800/70">
          {caseProcesses.length} processes analysed
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {caseProcesses.slice(0, 5).map((process) => (
            <li key={process.slug} className="border border-paper-200 px-2 py-1 text-xs text-ink-800">
              {process.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-3">
        <p className="font-mono text-xs uppercase tracking-wide text-ink-800/70">Simplified future-state workflow</p>
        <div className="mt-3">
          <WorkflowPreviewDiagram steps={previewSteps} moreCount={remaining} />
        </div>
        <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-accent-text">
          View case study
          <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </div>
  );
}

export function SelectedTransformations({
  caseStudies,
  industries,
  processes,
  copy,
}: {
  caseStudies: CaseStudy[];
  industries: Industry[];
  processes: Process[];
  copy: HomepageContent["transformations"];
}) {
  return (
    <section className="border-b border-paper-200 bg-paper-50 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading eyebrow="Selected work" title={copy.title} intro={copy.intro} />
        <div className="mt-4">
          {caseStudies.map((caseStudy, index) => (
            <TransformationPanel
              key={caseStudy.slug}
              caseStudy={caseStudy}
              index={index}
              industries={industries}
              processes={processes}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
