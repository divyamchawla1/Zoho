/**
 * Architecture / layer diagram — docs/09-case-study-diagrams.md. Each layer
 * is named with its role; the source of truth is marked explicitly rather
 * than left implicit.
 */
export function ArchitectureDiagram({ layers }: { layers: { name: string; role: string }[] }) {
  return (
    <div aria-label={`Solution architecture, ${layers.length} layers`} className="border border-paper-200 bg-paper-50 p-5 sm:p-6">
      <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Solution architecture</p>
      <ol className="mt-4 space-y-3">
        {layers.map((layer) => {
          const isSourceOfTruth = /source of truth/i.test(layer.role);
          return (
            <li
              key={layer.name}
              className={`border-2 px-4 py-3 ${isSourceOfTruth ? "border-accent-500" : "border-ink-800"}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-sm font-semibold text-ink-950">{layer.name}</p>
                {isSourceOfTruth ? (
                  <span className="border border-accent-500 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent-text">
                    Source of truth
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-ink-800">{layer.role}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
