"use client";

import { useState, type CSSProperties } from "react";
import { useMounted, usePrefersReducedMotion } from "@/lib/use-reduced-motion";

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
  { id: "message", label: "Customer message", sublabel: "WhatsApp", x: 2, y: 8, rotate: -6 },
  { id: "email", label: "Email", sublabel: "Inbox", x: 66, y: 4, rotate: 4 },
  { id: "spreadsheet-sales", label: "Spreadsheet", sublabel: "Sales copy", x: 26, y: 32, rotate: -4 },
  { id: "spreadsheet-finance", label: "Spreadsheet", sublabel: "Finance copy", x: 34, y: 40, rotate: 6 },
  { id: "approval", label: "Manager approval", sublabel: "Ad hoc", x: 74, y: 30, rotate: -7 },
  { id: "finance", label: "Finance handoff", sublabel: "Manual", x: 1, y: 64, rotate: 3 },
  { id: "followup", label: "Missing follow-up", sublabel: "No owner", x: 45, y: 68, rotate: -5 },
  { id: "reporting", label: "Disconnected reporting", sublabel: "Built by hand", x: 78, y: 62, rotate: 5 },
];

const STATE_B_STEPS: FlowStep[] = [
  { id: "enquiry", label: "Enquiry" },
  { id: "qualification", label: "Qualification" },
  { id: "approval", label: "Approval" },
  { id: "fulfilment", label: "Fulfilment" },
  { id: "finance", label: "Finance" },
  { id: "reporting", label: "Reporting" },
];

// Deterministic timeline, in ms. Every stagger is index-driven — nothing
// random, so the sequence replays identically every time (docs/03 §1).
const SCATTER_DURATION = 420;
const SCATTER_STAGGER = 70;
const SETTLE_START = 1150;
const SETTLE_DURATION = 380;
const SETTLE_STAGGER = 60;
const FLOW_START = 1500;
const FLOW_DURATION = 450;
const FLOW_STAGGER = 110;
const LABEL_SWITCH = SETTLE_START;

function ScatteredCard({ item, index }: { item: ScatteredItem; index: number }) {
  return (
    <div
      className="absolute w-[132px] border border-dashed border-ink-800/40 bg-paper-50 px-3 py-2 opacity-0 shadow-[2px_2px_0_0_rgba(8,17,31,0.08)]"
      style={
        {
          left: `min(${item.x}%, calc(100% - 132px))`,
          top: `${item.y}%`,
          "--rot": `${item.rotate}deg`,
          animationName: "hero-scatter-in, hero-settle-out",
          animationDuration: `${SCATTER_DURATION}ms, ${SETTLE_DURATION}ms`,
          animationDelay: `${index * SCATTER_STAGGER}ms, ${SETTLE_START + index * SETTLE_STAGGER}ms`,
          animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1), ease-in",
          animationFillMode: "forwards",
        } as CSSProperties
      }
    >
      <p className="font-mono text-[10px] uppercase tracking-wide text-danger-text">{item.sublabel}</p>
      <p className="mt-1 font-body text-xs font-medium text-ink-950">{item.label}</p>
    </div>
  );
}

function FlowStepBox({ step, index }: { step: FlowStep; index: number }) {
  return (
    <div
      className="flex min-w-[104px] flex-1 flex-col items-center border border-ink-800 bg-paper-50 px-3 py-4 text-center opacity-0 shadow-[2px_2px_0_0_rgba(8,17,31,0.08)]"
      style={{
        animationName: "reveal-rise",
        animationDuration: `${FLOW_DURATION}ms`,
        animationDelay: `${FLOW_START + index * FLOW_STAGGER}ms`,
        animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        animationFillMode: "forwards",
      }}
    >
      <span className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Step</span>
      <span className="mt-1 font-display text-sm font-semibold text-ink-950">{step.label}</span>
    </div>
  );
}

function FlowArrow({ vertical = false, delay = 0 }: { vertical?: boolean; delay?: number }) {
  return (
    <svg
      width={vertical ? 16 : 28}
      height={vertical ? 28 : 16}
      viewBox={vertical ? "0 0 16 28" : "0 0 28 16"}
      fill="none"
      className="shrink-0 text-accent-500 opacity-0"
      style={{
        animationName: "hero-connector-in",
        animationDuration: "250ms",
        animationDelay: `${delay}ms`,
        animationTimingFunction: "ease-out",
        animationFillMode: "forwards",
      }}
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

function StateLabel() {
  return (
    <div className="pointer-events-none absolute left-4 top-4 z-10 sm:left-5 sm:top-5">
      <p
        className="font-mono text-[10px] uppercase tracking-wide text-danger-text opacity-100"
        style={{
          animationName: "hero-fade-out",
          animationDuration: "400ms",
          animationDelay: `${LABEL_SWITCH}ms`,
          animationFillMode: "forwards",
        }}
      >
        Before — fragmented
      </p>
      <p
        className="absolute left-0 top-0 font-mono text-[10px] uppercase tracking-wide text-accent-text opacity-0"
        style={{
          animationName: "hero-fade-in-up",
          animationDuration: "400ms",
          animationDelay: `${LABEL_SWITCH + 200}ms`,
          animationFillMode: "forwards",
        }}
      >
        After — structured
      </p>
    </div>
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
      <div className="border border-ink-800/30 bg-paper-50 p-5 sm:p-6">
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
      <div className="border border-ink-800 bg-paper-50 p-5 sm:p-6">
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

const GRID_BACKDROP: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(23,35,56,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(23,35,56,0.06) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

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
            className="relative h-[440px] w-full overflow-hidden border border-paper-200 bg-paper-100/50 sm:h-[400px] lg:h-[440px]"
            style={GRID_BACKDROP}
          >
            <StateLabel />

            <div className="absolute inset-0">
              {STATE_A_ITEMS.map((item, index) => (
                <ScatteredCard key={item.id} item={item} index={index} />
              ))}
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 sm:flex-row sm:gap-0 sm:px-8">
              {STATE_B_STEPS.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center gap-2 sm:flex-row">
                  <FlowStepBox step={step} index={index} />
                  {index < STATE_B_STEPS.length - 1 ? (
                    <>
                      <span className="sm:hidden">
                        <FlowArrow vertical delay={FLOW_START + index * FLOW_STAGGER + 120} />
                      </span>
                      <span className="hidden sm:inline-flex sm:px-1">
                        <FlowArrow delay={FLOW_START + index * FLOW_STAGGER + 120} />
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
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 border border-ink-950 bg-paper-50 px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-ink-950 shadow-[2px_2px_0_0_rgba(8,17,31,0.12)] transition-all hover:-translate-y-px hover:bg-ink-950 hover:text-paper-50 hover:shadow-[2px_2px_0_0_rgba(79,124,255,0.4)]"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M6 1a5 5 0 1 0 4.546 2.924M10.5 1v3h-3"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Replay transformation
          </button>
        </div>
      ) : null}
    </div>
  );
}
