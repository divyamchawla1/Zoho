import type { ScopeDecision } from "@/schemas/content-types";

export function ScopeDecisions({ decisions }: { decisions: ScopeDecision[] }) {
  return (
    <ul className="space-y-4">
      {decisions.map((decision) => (
        <li key={decision.requirement} className="border-l-2 border-ink-950 bg-paper-50 py-1 pl-5">
          <p className="font-display text-sm font-semibold text-ink-950">{decision.requirement}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-wide text-accent-text">{decision.decision}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-800">{decision.reasoning}</p>
        </li>
      ))}
    </ul>
  );
}
