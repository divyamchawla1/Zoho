"use client";

import { useState } from "react";
import { ProcessFlowDiagram } from "@/components/diagrams/ProcessFlowDiagram";
import type { CaseState } from "@/schemas/content-types";

type Mode = "current" | "future";

/**
 * One control updates three things together: the diagram, the summary text
 * and the risk/control callouts — docs/03-interactions.md rule 4. If only
 * the diagram changed, the interaction would fail to demonstrate the point.
 */
export function CurrentFutureToggle({
  currentState,
  futureState,
}: {
  currentState: CaseState;
  futureState: CaseState;
}) {
  const [mode, setMode] = useState<Mode>("future");
  const isCurrent = mode === "current";
  const active = isCurrent ? currentState : futureState;
  const calloutLabel = isCurrent ? "Risks and gaps" : "Controls introduced";
  const callouts = isCurrent ? [...(currentState.risks ?? []), ...(currentState.gaps ?? [])] : futureState.controls ?? [];

  return (
    <div>
      <div role="group" aria-label="Show current state or future state" className="inline-flex border border-ink-950">
        <button
          type="button"
          aria-pressed={isCurrent}
          onClick={() => setMode("current")}
          className={`px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors ${
            isCurrent ? "bg-warning-500 text-ink-950" : "bg-paper-50 text-ink-950 hover:bg-paper-100"
          }`}
        >
          Current state
        </button>
        <button
          type="button"
          aria-pressed={!isCurrent}
          onClick={() => setMode("future")}
          className={`border-l border-ink-950 px-4 py-2 font-mono text-xs uppercase tracking-wide transition-colors ${
            !isCurrent ? "bg-teal-500 text-ink-950" : "bg-paper-50 text-ink-950 hover:bg-paper-100"
          }`}
        >
          Future state
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5 lg:gap-8">
        <div className="lg:col-span-3">
          <ProcessFlowDiagram
            label={isCurrent ? "Current state" : "Future state"}
            steps={active.steps}
            tone={isCurrent ? "warning" : "teal"}
          />
        </div>

        <div className="lg:col-span-2">
          <p className="text-sm leading-relaxed text-ink-800">{active.summary}</p>

          {callouts.length > 0 ? (
            <div className="mt-6">
              <p
                className={`font-mono text-[10px] uppercase tracking-wide ${
                  isCurrent ? "text-danger-text" : "text-success-text"
                }`}
              >
                {calloutLabel}
              </p>
              <ul className="mt-2 space-y-2">
                {callouts.map((item) => (
                  <li
                    key={item}
                    className={`border-l-2 pl-3 text-sm text-ink-800 ${
                      isCurrent ? "border-danger-500" : "border-success-500"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
