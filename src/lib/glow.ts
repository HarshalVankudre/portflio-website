// Shared contract between GradientField and components that ask the
// volt glow to swell behind them (the hero name on hover).
export const GLOW_EVENT = "hv:glow";

export interface GlowEventDetail {
  /** Glow intensity, 0 (resting) to 1 (full swell). */
  v: number;
}

export const setGlow = (v: number) => {
  window.dispatchEvent(
    new CustomEvent<GlowEventDetail>(GLOW_EVENT, { detail: { v } })
  );
};
