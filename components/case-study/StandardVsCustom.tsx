import type { CaseStudy } from "@/schemas/content-types";

const VERDICT_STYLE: Record<string, string> = {
  standard: "border-success-500 text-success-text",
  configuration: "border-accent-500 text-accent-text",
  custom: "border-warning-500 text-warning-text",
  external: "border-violet-500 text-violet-text",
};

const VERDICT_LABEL: Record<string, string> = {
  standard: "Standard",
  configuration: "Configuration",
  custom: "Custom",
  external: "External",
};

export function StandardVsCustom({ items }: { items: CaseStudy["standardVsCustom"] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.requirement} className="border border-paper-200 bg-paper-50 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <p className="font-display text-sm font-semibold text-ink-950">{item.requirement}</p>
            <span
              className={`shrink-0 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${VERDICT_STYLE[item.verdict]}`}
            >
              {VERDICT_LABEL[item.verdict]}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-800">{item.reasoning}</p>
        </li>
      ))}
    </ul>
  );
}
