"use client";

import { useId, useState, type ReactNode } from "react";

export function Disclosure({
  label,
  children,
  defaultOpen = false,
}: {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-2 border border-ink-950 px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-ink-950 hover:bg-paper-100"
      >
        {label}
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {open ? (
        <div id={panelId} className="mt-4 w-full">
          {children}
        </div>
      ) : null}
    </div>
  );
}
