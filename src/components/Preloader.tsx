"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Once-per-session opening sequence: a counter runs 000 → 100 beside
 * the wordmark, then the whole panel wipes upward to reveal the hero.
 * Skipped on refresh (sessionStorage) and reduced to a brief fade
 * under prefers-reduced-motion.
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
    if (sessionStorage.getItem("portfolio_loaded")) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShouldShow(true);
  }, []);

  useEffect(() => {
    if (!shouldShow || done) return;
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
        sessionStorage.setItem("portfolio_loaded", "true");
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
      const tl = gsap.timeline({ onComplete: finish });

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
    },
    { scope: rootRef, dependencies: [shouldShow] }
  );

  if (!shouldShow || done) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[120] flex items-end bg-bg"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="flex w-full items-end justify-between px-gutter pb-10">
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
        <span className="mask">
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
