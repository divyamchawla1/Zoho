"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Section-level scroll reveal (docs/03-interactions.md §8). Renders visible
 * by default (SSR-safe, no-JS-safe); on mount it hides itself and watches
 * for the section entering the viewport, then reveals once. Skipped
 * entirely under prefers-reduced-motion, per docs/07 — reveals are then
 * immediate because the section was never hidden in the first place.
 */
export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.classList.add("reveal-pending");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.remove("reveal-pending");
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}
