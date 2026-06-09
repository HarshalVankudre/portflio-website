"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/motion";

/**
 * Lenis smooth scroll with ScrollTrigger kept in sync.
 * Disabled entirely under prefers-reduced-motion (native scroll instead).
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [reduced]);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: true,
        lerp: 0.1,
        wheelMultiplier: 1,
        syncTouch: false, // native touch scrolling on mobile
      }}
    >
      {children}
    </ReactLenis>
  );
}
