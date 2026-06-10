"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { PRELOADER_DONE_EVENT, PRELOADER_STORAGE_KEY } from "@/lib/preloader";

/**
 * Once-per-session opening sequence: a counter runs 000 → 100 beside
 * the wordmark, then the whole panel wipes upward to reveal the hero.
 * An inline head script covers the page with html.preloading before
 * paint, so nothing flashes before this overlay hydrates on top of it.
 * Skipped on refresh (sessionStorage) and reduced to a brief fade
 * under prefers-reduced-motion. The exit waits for the display fonts
 * (capped at 2s) so the hero never swaps typefaces mid-reveal.
 */
export default function Preloader() {
  const [shouldShow, setShouldShow] = useState(false);
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    // Effect-driven reveal keeps SSR and first client render identical
    // (both hidden), avoiding a hydration mismatch on the overlay.
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem(PRELOADER_STORAGE_KEY));
    } catch {
      // Storage blocked — treat as a fresh visit.
    }
    if (seen) {
      document.documentElement.classList.remove("preloading");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShouldShow(true);
  }, []);

  useEffect(() => {
    if (!shouldShow || done) return;
    // The React overlay is mounted — hand off from the CSS pre-paint cover.
    document.documentElement.classList.remove("preloading");
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [shouldShow, done, lenis]);

  useGSAP(
    () => {
      if (!shouldShow || !rootRef.current) return;

      const finish = () => {
        try {
          sessionStorage.setItem(PRELOADER_STORAGE_KEY, "true");
        } catch {
          // Storage blocked — the intro will simply replay next load.
        }
        window.dispatchEvent(new CustomEvent(PRELOADER_DONE_EVENT));
        setDone(true);
      };

      if (prefersReducedMotion()) {
        gsap.to(rootRef.current, {
          autoAlpha: 0,
          duration: 0.3,
          delay: 0.5,
          onComplete: finish,
        });
        return;
      }

      const counter = { v: 0 };
      const tl = gsap.timeline({ paused: true, onComplete: finish });

      tl.from("[data-pre-line]", {
        yPercent: 110,
        duration: 0.7,
        ease: "power4.out",
        stagger: 0.09,
      })
        .to(
          counter,
          {
            v: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(
                  Math.round(counter.v)
                ).padStart(3, "0");
              }
            },
          },
          0.2
        )
        .to("[data-pre-line]", {
          yPercent: -110,
          duration: 0.55,
          ease: "power3.in",
          stagger: 0.05,
        })
        .to(
          rootRef.current,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.7,
            ease: "power4.inOut",
          },
          "-=0.15"
        );

      // Start once the display fonts are usable (or after 2s, whichever
      // comes first) so the giant Fraunces lines don't swap mid-animation.
      let cancelled = false;
      Promise.race([
        document.fonts?.ready ?? Promise.resolve(),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]).then(() => {
        if (!cancelled) tl.play();
      });

      return () => {
        cancelled = true;
      };
    },
    { scope: rootRef, dependencies: [shouldShow] }
  );

  if (!shouldShow || done) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[120] flex items-end bg-bg"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="flex w-full flex-col gap-6 px-gutter pb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="mask">
            <span data-pre-line className="block font-display text-display-md text-fg">
              Harshal Vankudre
            </span>
          </span>
          <span className="mask mt-3">
            <span data-pre-line className="label-mono block">
              Portfolio — Karlsruhe, DE — ©2026
            </span>
          </span>
        </div>
        {/* aria-hidden: a counter mutating inside a live region would spam
            screen readers — the role=status label above says enough. */}
        <span className="mask" aria-hidden>
          <span
            data-pre-line
            className="block font-display text-display-lg leading-none text-accent tabular-nums"
          >
            <span ref={counterRef}>000</span>
          </span>
        </span>
      </div>
    </div>
  );
}
