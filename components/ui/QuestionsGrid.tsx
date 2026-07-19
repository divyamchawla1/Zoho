import type { DecisionFrameworkTest } from "@/schemas/content-types";

export function QuestionsGrid({ tests }: { tests: DecisionFrameworkTest[] }) {
  return (
    <ol className="grid gap-px border border-paper-50/15 bg-paper-50/15 sm:grid-cols-2 lg:grid-cols-3">
      {tests.map((test, index) => (
        <li
          key={test.question}
          className="group relative flex flex-col gap-3 bg-ink-950 p-6 transition-colors hover:bg-ink-900"
        >
          <span className="font-mono text-2xl font-semibold text-accent-400">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            aria-hidden="true"
            className="h-px w-8 bg-accent-400/40 transition-all duration-300 group-hover:w-16 group-hover:bg-accent-400"
          />
          <p className="font-display text-base font-semibold leading-snug text-paper-50">{test.question}</p>
          <p className="text-sm leading-relaxed text-paper-50/65">{test.whyItMatters}</p>
        </li>
      ))}
    </ol>
  );
}
