"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Easing function for smooth animation
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

// Boot sequence readout — lines reveal as progress passes their threshold
const BOOT_LINES = [
  { at: 10, text: "init display.grid", status: "OK" },
  { at: 40, text: "load telemetry", status: "OK" },
  { at: 70, text: "calibrate interface", status: "OK" },
  { at: 96, text: "system ready", status: "GO" },
];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Register service worker for caching
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed, continue anyway
      });
    }

    // Check if already loaded in this session (survives refresh, cleared on tab close)
    const hasLoadedBefore = sessionStorage.getItem("portfolio_loaded");

    if (hasLoadedBefore) {
      // Skip loading screen on refresh (shouldShow already defaults to false,
      // and isLoading is irrelevant while the overlay is hidden).
      return;
    }

    // First visit in this session - reveal the loading screen.
    // This is intentionally effect-driven (not a lazy initializer): it keeps SSR
    // and the first client render both null, avoiding a hydration mismatch on the
    // full-screen overlay. The one-time reveal does not cause cascading renders.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShouldShow(true);

    // Animate progress bar
    let currentProgress = 0;
    const duration = 1800; // Total animation duration in ms
    const steps = 60;
    const stepDuration = duration / steps;

    const interval = setInterval(() => {
      currentProgress += 100 / steps;

      // Easing function for smooth fill
      const easedProgress = easeOutCubic(currentProgress / 100) * 100;
      setProgress(Math.min(easedProgress, 100));

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Mark as loaded in session storage
        sessionStorage.setItem("portfolio_loaded", "true");
        // Fade out after a brief pause
        setTimeout(() => setIsLoading(false), 400);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
          className="blueprint fixed inset-0 z-[100] flex flex-col items-center justify-center bg-night"
        >
          {/* Corner registration marks */}
          <div aria-hidden className="crosshair absolute left-6 top-6" />
          <div aria-hidden className="crosshair absolute right-6 top-6" />
          <div aria-hidden className="crosshair absolute bottom-6 left-6" />
          <div aria-hidden className="crosshair absolute bottom-6 right-6" />

          <div className="w-72 sm:w-80">
            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-display text-6xl font-bold uppercase leading-none sm:text-7xl"
            >
              HV<span className="text-accent">.</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="tech-label mt-3"
            >
              System calibration
            </motion.p>

            {/* Boot readout */}
            <div className="mt-6 min-h-24 space-y-1.5 font-mono text-xs">
              {BOOT_LINES.map(
                (line) =>
                  progress >= line.at && (
                    <motion.div
                      key={line.text}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-baseline gap-2 text-dim"
                    >
                      <span className="text-faint" aria-hidden>
                        &gt;
                      </span>
                      <span>{line.text}</span>
                      <span
                        aria-hidden
                        className="flex-1 border-b border-dotted border-line"
                      />
                      <span className={line.status === "GO" ? "text-accent" : "text-ok"}>
                        {line.status}
                      </span>
                    </motion.div>
                  )
              )}
            </div>

            {/* Progress bar */}
            <motion.div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="relative mt-4 h-2 w-full border border-line-strong"
            >
              <div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
              />
            </motion.div>

            {/* Percentage */}
            <div className="mt-2.5 flex items-baseline justify-between font-mono text-xs">
              <span className="tech-label">CAL.SEQ — 1.0</span>
              <span className="tabular-nums text-fg">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
