import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
  const previewSteps = caseStudy.futureState.steps.slice(0, 5);
  const remaining = caseStudy.futureState.steps.length - previewSteps.length;

  return (
    <article className="grid gap-8 border-t border-paper-200 py-10 lg:grid-cols-12 lg:gap-6">
      <div className="lg:col-span-3">
        <span className="font-mono text-xs text-ink-800/70">{String(index + 1).padStart(2, "0")}</span>
        <p className="mt-2 font-mono text-xs uppercase tracking-wide text-accent-text">
          {caseIndustries.map((industry) => industry.name).join(" · ")}
        </p>
        <h3 className="mt-3 font-display text-xl font-semibold text-ink-950">{caseStudy.title}</h3>
      </div>

      <div className="lg:col-span-6">
        <p className="text-sm leading-relaxed text-ink-800">
          {caseStudy.operationalChallenge[0]}
        </p>
        <p className="mt-3 font-mono text-xs uppercase tracking-wide text-ink-800/70">
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
        <p className="font-mono text-xs uppercase tracking-wide text-ink-800/70">Simplified workflow</p>
        <ol className="mt-2 space-y-1.5">
          {previewSteps.map((step) => (
            <li key={step} className="border-l-2 border-accent-500 pl-2 text-xs text-ink-950">
              {step}
            </li>
          ))}
          {remaining > 0 ? (
            <li className="pl-2 text-xs text-ink-800/70">+{remaining} more steps</li>
          ) : null}
        </ol>
        <Link
          href={`/work/${caseStudy.slug}`}
          className="mt-4 inline-block font-mono text-xs uppercase tracking-wide text-accent-text hover:underline"
        >
          View case study →
        </Link>
      </div>
    </article>
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
