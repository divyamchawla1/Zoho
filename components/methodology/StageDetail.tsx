import Link from "next/link";
import type { Deliverable, MethodologyStage, CaseStudy } from "@/schemas/content-types";

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

export function StageDetail({
  stage,
  index,
  deliverables,
  caseStudies,
}: {
  stage: MethodologyStage;
  index: number;
  deliverables: Deliverable[];
  caseStudies: CaseStudy[];
}) {
  return (
    <div>
      <p className="font-mono text-xs text-ink-800/70">Stage {String(index + 1).padStart(2, "0")}</p>
      <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-800">{stage.purpose}</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <FieldList title="Inputs" items={stage.inputs} />
        <FieldList title="Activities" items={stage.activities} tone="accent" />
        <FieldList title="Outputs" items={stage.outputs} />
      </div>

      <div className="mt-8">
        <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Questions Asked</p>
        <ol className="mt-2 space-y-3">
          {stage.questionsAsked.map((question, questionIndex) => (
            <li key={question} className="flex gap-3 border border-paper-200 bg-paper-50 p-4">
              <span className="font-mono text-xs text-ink-800/70">{String(questionIndex + 1).padStart(2, "0")}</span>
              <p className="text-sm leading-relaxed text-ink-950">{question}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <FieldList title="Risks Checked" items={stage.risksChecked} tone="danger" />
        <FieldList title="Client Responsibilities" items={stage.clientResponsibilities} />
      </div>

      {deliverables.length > 0 || caseStudies.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {deliverables.length > 0 ? (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Deliverables</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {deliverables.map((deliverable) => (
                  <li key={deliverable.slug}>
                    <Link
                      href="/deliverables"
                      className="inline-block border border-paper-200 px-3 py-1.5 text-xs text-ink-800 hover:border-accent-500 hover:text-accent-text"
                    >
                      {deliverable.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {caseStudies.length > 0 ? (
            <div>
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
