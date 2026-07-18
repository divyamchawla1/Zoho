/**
 * Vertical process-flow diagram — docs/09-case-study-diagrams.md.
 * States are boxes; lines carry no text, direction only. Rendered as real
 * HTML text in DOM order, so the diagram and its accessible text
 * alternative are the same markup — nothing to drift out of sync.
 */

type Tone = "neutral" | "warning" | "teal";

const TONE_BORDER: Record<Tone, string> = {
  neutral: "border-ink-800",
  warning: "border-warning-500",
  teal: "border-teal-500",
};

const TONE_LABEL: Record<Tone, string> = {
  neutral: "text-ink-800/70",
  warning: "text-warning-text",
  teal: "text-teal-text",
};

function DownArrow() {
  return (
    <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true" className="text-accent-500">
      <path d="M8 0V18M8 18L2 12M8 18L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProcessFlowDiagram({
  label,
  steps,
  tone = "neutral",
}: {
  label: string;
  steps: string[];
  tone?: Tone;
}) {
  return (
    <div aria-label={`${label} process flow, ${steps.length} steps`} className="border border-paper-200 bg-paper-50 p-5 sm:p-6">
      <p className={`font-mono text-[10px] uppercase tracking-wide ${TONE_LABEL[tone]}`}>{label}</p>
      <ol className="mt-4 flex flex-col items-stretch">
        {steps.map((step, index) => (
          <li key={step} className="flex flex-col items-center">
            <div
              className={`w-full border-2 bg-paper-50 px-4 py-3 text-center ${TONE_BORDER[tone]}`}
            >
              <span className="font-mono text-[10px] text-ink-800/70">{index + 1}</span>
              <p className="mt-1 text-sm font-medium leading-snug text-ink-950">{step}</p>
            </div>
            {index < steps.length - 1 ? <DownArrow /> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
