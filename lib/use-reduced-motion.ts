"use client";

import { useSyncExternalStore } from "react";

const subscribeNoop = () => () => {};

/**
 * True once past hydration, false during SSR and the client's first render.
 * useSyncExternalStore (rather than a useEffect + setState "mounted" flag)
 * is the React-idiomatic way to make this transition — it is the mechanism
 * React itself uses to keep the server snapshot and client snapshot from
 * disagreeing during hydration.
 */
export function useMounted() {
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

/** Plain matchMedia — no animation library needed to read this. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}
