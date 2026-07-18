function DownArrow() {
  return (
    <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true" className="text-accent-500">
      <path
        d="M8 0V18M8 18L2 12M8 18L14 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TestingLayers({
  layers,
}: {
  layers: { name: string; owner: string; checks: string[] }[];
}) {
  return (
    <ol aria-label={`Testing model, ${layers.length} layers`} className="flex flex-col items-stretch">
      {layers.map((layer, index) => (
        <li key={layer.name} className="flex flex-col items-center">
          <div className="w-full border-2 border-ink-800 bg-paper-50 px-5 py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-mono text-[10px] text-ink-800/70">{index + 1}</p>
              <p className="font-mono text-[10px] uppercase tracking-wide text-accent-text">{layer.owner}</p>
            </div>
            <p className="mt-1 font-display text-base font-semibold text-ink-950">{layer.name}</p>
            <ul className="mt-3 space-y-1.5">
              {layer.checks.map((check) => (
                <li key={check} className="border-l-2 border-paper-200 pl-3 text-sm text-ink-800">
                  {check}
                </li>
              ))}
            </ul>
          </div>
          {index < layers.length - 1 ? <DownArrow /> : null}
        </li>
      ))}
    </ol>
  );
}
