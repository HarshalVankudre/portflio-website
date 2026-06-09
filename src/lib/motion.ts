"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" && window.matchMedia(QUERY).matches;

const subscribe = (onChange: () => void) => {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
};

/**
 * Reactive reduced-motion flag. SSR renders the full-motion variant;
 * the value corrects itself on hydration before any scroll animation runs.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}

/** True for mouse/trackpad devices — gates cursor + magnetic effects. */
export const hasFinePointer = (): boolean =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
