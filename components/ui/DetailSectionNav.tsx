"use client";

import { useEffect, useId, useRef, useState } from "react";

export type DetailNavSection = { id: string; label: string };

export function DetailSectionNav({
  sections,
  ariaLabel,
}: {
  sections: DetailNavSection[];
  ariaLabel: string;
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const selectId = useId();

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el));

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
          setActiveId(topmost.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    for (const el of elements) observerRef.current.observe(el);

    return () => observerRef.current?.disconnect();
  }, [sections]);

  function jumpTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Compact control — mobile / tablet */}
      <div className="border-b border-paper-200 bg-paper-50 xl:hidden">
        <label htmlFor={selectId} className="sr-only">
          Jump to section
        </label>
        <select
          id={selectId}
          value={activeId}
          onChange={(event) => jumpTo(event.target.value)}
          className="min-h-11 w-full border-0 bg-paper-50 px-4 py-3 font-mono text-xs uppercase tracking-wide text-ink-950"
        >
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      {/* Sticky rail — desktop */}
      <nav
        aria-label={ariaLabel}
        className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto pr-4 xl:block"
      >
        <ul className="space-y-1 border-l border-paper-200">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => jumpTo(section.id)}
                aria-current={activeId === section.id ? "true" : undefined}
                className={`-ml-px block border-l-2 px-4 py-1.5 text-left text-xs transition-colors ${
                  activeId === section.id
                    ? "border-accent-500 font-medium text-accent-text"
                    : "border-transparent text-ink-800/70 hover:text-ink-950"
                }`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
