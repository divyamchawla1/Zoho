"use client";

import { useState, useSyncExternalStore } from "react";

const subscribeNoop = () => () => {};

/**
 * True once past hydration, false during SSR and the client's first render.
 * useSyncExternalStore (rather than a useEffect + setState "mounted" flag)
 * is the React-idiomatic way to make this transition — it is the mechanism
 * React itself uses to keep the server snapshot and client snapshot from
 * disagreeing during hydration.
 */
function useMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

/** Plain matchMedia — no framer-motion needed for two CSS fades. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

type ScatteredItem = {
  id: string;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  rotate: number;
};

type FlowStep = {
  id: string;
  label: string;
};

const STATE_A_ITEMS: ScatteredItem[] = [
  { id: "message", label: "Customer message", sublabel: "WhatsApp", x: 4, y: 6, rotate: -6 },
  { id: "email", label: "Email", sublabel: "Inbox", x: 63, y: 2, rotate: 4 },
  { id: "spreadsheet-sales", label: "Spreadsheet", sublabel: "Sales copy", x: 27, y: 30, rotate: -4 },
  { id: "spreadsheet-finance", label: "Spreadsheet", sublabel: "Finance copy", x: 33, y: 36, rotate: 6 },
  { id: "approval", label: "Manager approval", sublabel: "Ad hoc", x: 70, y: 28, rotate: -7 },
  { id: "finance", label: "Finance handoff", sublabel: "Manual", x: 2, y: 60, rotate: 3 },
  { id: "followup", label: "Missing follow-up", sublabel: "No owner", x: 43, y: 66, rotate: -5 },
  { id: "reporting", label: "Disconnected reporting", sublabel: "Built by hand", x: 74, y: 60, rotate: 5 },
];

const STATE_B_STEPS: FlowStep[] = [
  { id: "enquiry", label: "Enquiry" },
  { id: "qualification", label: "Qualification" },
  { id: "approval", label: "Approval" },
  { id: "fulfilment", label: "Fulfilment" },
  { id: "finance", label: "Finance" },
  { id: "reporting", label: "Reporting" },
];

function ScatteredCard({ item }: { item: ScatteredItem }) {
  return (
    <div
      className="absolute w-[132px] border border-dashed border-ink-800/40 bg-paper-50 px-3 py-2 shadow-[2px_2px_0_0_rgba(8,17,31,0.08)]"
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        transform: `rotate(${item.rotate}deg)`,
      }}
    >
      <p className="font-mono text-[10px] uppercase tracking-wide text-danger-text">{item.sublabel}</p>
      <p className="mt-1 font-body text-xs font-medium text-ink-950">{item.label}</p>
    </div>
  );
}

function FlowStepBox({ step }: { step: FlowStep }) {
  return (
    <div className="flex min-w-[104px] flex-1 flex-col items-center border border-ink-800 bg-paper-50 px-3 py-4 text-center">
      <span className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Step</span>
      <span className="mt-1 font-display text-sm font-semibold text-ink-950">{step.label}</span>
    </div>
  );
}

function FlowArrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <svg
      width={vertical ? 16 : 28}
      height={vertical ? 28 : 16}
      viewBox={vertical ? "0 0 16 28" : "0 0 28 16"}
      fill="none"
      className="shrink-0 text-accent-500"
      aria-hidden="true"
    >
      {vertical ? (
        <path d="M8 0V22M8 22L2 16M8 22L14 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M0 8H22M22 8L16 2M22 8L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function TextAlternative() {
  return (
    <div className="sr-only">
      <p>
        A process transformation, shown in two states. Before: the same operation carried out as
        disconnected, duplicated activity across separate tools. After: the same activity restructured
        into one connected, ordered flow.
      </p>
      <p>Before — fragmented:</p>
      <ul>
        {STATE_A_ITEMS.map((item) => (
          <li key={item.id}>
            {item.label} ({item.sublabel})
          </li>
        ))}
      </ul>
      <p>After — structured, in order:</p>
      <ol>
        {STATE_B_STEPS.map((step) => (
          <li key={step.id}>{step.label}</li>
        ))}
      </ol>
      <p>
        What changed: eight scattered, duplicated and unowned activities were reorganised into one
        six-step flow with a defined order and a defined owner at every step.
      </p>
    </div>
  );
}

function StaticComparison() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="border border-ink-800/30 bg-paper-50 p-4">
        <p className="font-mono text-xs uppercase tracking-wide text-danger-text">Before — fragmented</p>
        <ul className="mt-3 space-y-2">
          {STATE_A_ITEMS.map((item) => (
            <li key={item.id} className="border border-dashed border-ink-800/30 px-3 py-2 text-sm text-ink-950">
              {item.label}
              <span className="ml-1 text-xs text-ink-800/70">— {item.sublabel}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-ink-800 bg-paper-50 p-4">
        <p className="font-mono text-xs uppercase tracking-wide text-accent-text">After — structured</p>
        <ol className="mt-3 space-y-2">
          {STATE_B_STEPS.map((step, index) => (
            <li key={step.id} className="flex items-center gap-2 border border-ink-800 px-3 py-2 text-sm font-medium text-ink-950">
              <span className="font-mono text-xs text-ink-800/70">{index + 1}</span>
              {step.label}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function HeroTransformation() {
  const reducedMotion = usePrefersReducedMotion();
  const [playCount, setPlayCount] = useState(0);

  // usePrefersReducedMotion() reads matchMedia, which does not exist during
  // SSR, so it always resolves to its safe default there. Branching on it
  // directly would make the client's first render disagree with the
  // server-rendered HTML, so gate on useMounted() instead — it is
  // guaranteed false on both the server render and the client's first
  // render, and only becomes true once React re-renders past hydration.
  const mounted = useMounted();

  const showAnimated = mounted && !reducedMotion;
  const showStatic = !mounted || reducedMotion;

  return (
    <div>
      <TextAlternative />

      {showStatic ? <StaticComparison /> : null}

      {showAnimated ? (
        <div key={playCount}>
          <div
            aria-hidden="true"
            className="relative h-[420px] w-full overflow-hidden border border-paper-200 bg-paper-100/60 sm:h-[360px]"
          >
            <div
              className="absolute inset-0 opacity-100 [animation:hero-fade-out_0.6s_ease-in-out_1.1s_forwards]"
            >
              {STATE_A_ITEMS.map((item) => (
                <ScatteredCard key={item.id} item={item} />
              ))}
            </div>

            <div
              className="absolute inset-0 flex translate-y-4 flex-col items-center justify-center gap-2 px-4 opacity-0 [animation:hero-fade-in-up_0.6s_ease-out_1.3s_forwards] sm:flex-row sm:gap-0"
            >
              {STATE_B_STEPS.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center gap-2 sm:flex-row">
                  <FlowStepBox step={step} />
                  {index < STATE_B_STEPS.length - 1 ? (
                    <>
                      <span className="sm:hidden">
                        <FlowArrow vertical />
                      </span>
                      <span className="hidden sm:inline-flex sm:px-1">
                        <FlowArrow />
                      </span>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPlayCount((count) => count + 1)}
            className="mt-4 inline-flex items-center gap-2 border border-ink-950 px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink-950 transition-colors hover:bg-ink-950 hover:text-paper-50"
          >
            Replay transformation
          </button>
        </div>
      ) : null}
    </div>
  );
}
