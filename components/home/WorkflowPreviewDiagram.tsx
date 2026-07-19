/**
 * Compact horizontal workflow preview — docs/09-case-study-diagrams.md:
 * transitions are boxes, lines carry no text, horizontal only for short
 * linear sequences. Generated from `futureState.steps`, so it cannot drift
 * from the case study text it summarises.
 */

function MiniArrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true" className="shrink-0 text-accent-500/70">
      <path d="M0 5H10M10 5L6 1M10 5L6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WorkflowPreviewDiagram({ steps, moreCount }: { steps: string[]; moreCount: number }) {
  return (
    <div
      aria-label={`Simplified future-state workflow, ${steps.length + moreCount} steps`}
      className="flex flex-wrap items-center gap-1.5"
    >
      {steps.map((step, index) => (
        <span key={step} className="flex items-center gap-1.5">
          <span className="border border-accent-500/50 bg-paper-50 px-2.5 py-1.5 text-[11px] font-medium leading-snug text-ink-950 transition-colors group-hover:border-accent-500">
            {step}
          </span>
          {index < steps.length - 1 ? <MiniArrow /> : null}
        </span>
      ))}
      {moreCount > 0 ? (
        <>
          <MiniArrow />
          <span className="font-mono text-[10px] uppercase tracking-wide text-ink-800/60">+{moreCount} more</span>
        </>
      ) : null}
    </div>
  );
}
