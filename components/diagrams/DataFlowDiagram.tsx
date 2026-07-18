/**
 * Data-flow diagram — docs/09-case-study-diagrams.md. Directional, one step
 * per line, generated from solutionArchitecture.dataFlow.
 */
export function DataFlowDiagram({ flows }: { flows: string[] }) {
  return (
    <div aria-label={`Data flow, ${flows.length} sequences`} className="border border-paper-200 bg-paper-50 p-5 sm:p-6">
      <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Data flow</p>
      <ol className="mt-4 space-y-3">
        {flows.map((flow, index) => (
          <li key={flow} className="border-l-2 border-accent-500 py-1 pl-4">
            <span className="font-mono text-[10px] text-ink-800/70">{String(index + 1).padStart(2, "0")}</span>
            <p className="font-mono text-xs leading-relaxed text-ink-950 sm:text-sm">{flow}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
