"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      // Skip loading screen on refresh
      setIsLoading(false);
      setShouldShow(false);
      return;
    }

    // First visit in this session - show loading screen
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

  // Easing function for smooth animation
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
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
            className="mb-8"
          >
            <div className="text-5xl font-black bg-primary text-black px-4 py-2 border-4 border-black neo-shadow">
              HV
            </div>
          </motion.div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-600"
          >
            Loading Portfolio
          </motion.p>

          {/* Progress bar container */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="w-64 sm:w-80 h-5 bg-white border-4 border-black relative overflow-hidden neo-shadow"
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
            className="mt-4 font-mono font-bold text-xl tabular-nums"
          >
            {Math.round(progress)}%
          </motion.p>

          {/* Fun loading messages */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-xs text-gray-500 font-medium"
          >
            {progress < 30 && "Initializing awesomeness..."}
            {progress >= 30 && progress < 60 && "Loading projects..."}
            {progress >= 60 && progress < 90 && "Almost there..."}
            {progress >= 90 && "Ready!"}
          </motion.p>

          {/* CSS for shine animation */}
          <style jsx>{`
            @keyframes shine {
              0% {
                transform: translateX(-100%);
              }
              50%, 100% {
                transform: translateX(200%);
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
