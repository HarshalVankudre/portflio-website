"use client";

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/motion";

/**
 * Bridges Lenis into the GSAP ticker (single rAF loop) and keeps
 * ScrollTrigger in sync. Must live BELOW ReactLenis: useLenis re-renders
 * when the instance is ready — a ref read in the provider's own effect
 * would run before ReactLenis commits the instance and silently leave
 * lenis.raf undriven (dead wheel scrolling, the autoRaf:false trap).
 */
function LenisGsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    // Lenis owns frame pacing — GSAP must not skip ticks to "catch up".
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

/**
 * Lenis smooth scroll driven by the GSAP ticker, so scrubbed animations
 * never lag scroll by a frame.
 * Disabled entirely under prefers-reduced-motion (native scroll instead).
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.1,
        wheelMultiplier: 1,
        syncTouch: false, // native touch scrolling on mobile
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
