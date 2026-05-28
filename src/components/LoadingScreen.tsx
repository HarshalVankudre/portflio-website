"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Easing function for smooth animation
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

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
          className="fixed inset-0 z-[100] bg-[#FFFEF5] flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 sm:mb-8"
          >
            <div className="text-4xl sm:text-5xl font-black bg-primary text-black px-3 sm:px-4 py-1.5 sm:py-2 border-3 sm:border-4 border-black neo-shadow">
              HV
            </div>
          </motion.div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 sm:mb-6 text-gray-600"
          >
            Loading Portfolio
          </motion.p>

          {/* Progress bar container */}
          <motion.div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="w-56 sm:w-64 md:w-80 h-4 sm:h-5 bg-white border-3 sm:border-4 border-black relative overflow-hidden neo-shadow"
          >
            {/* Progress fill with gradient */}
            <motion.div
              className="h-full relative"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #FFE500 0%, #FFD000 50%, #FFE500 100%)",
              }}
              transition={{ duration: 0.05, ease: "linear" }}
            >
              {/* Shine effect */}
              <div 
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                  animation: "shine 1.5s ease-in-out infinite",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Percentage */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-3 sm:mt-4 font-mono font-bold text-lg sm:text-xl tabular-nums"
          >
            {Math.round(progress)}%
          </motion.p>

          {/* Fun loading messages */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.6 }}
            className="mt-4 sm:mt-6 text-[10px] sm:text-xs text-gray-500 font-medium"
          >
            {progress < 30 && "Initializing awesomeness..."}
            {progress >= 30 && progress < 60 && "Loading projects..."}
            {progress >= 60 && progress < 90 && "Almost there..."}
            {progress >= 90 && "Ready!"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
