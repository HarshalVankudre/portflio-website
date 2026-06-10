"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Ornamental custom cursor: a volt dot with a trailing ring.
 * Layered over the native cursor (never replaces it).
 * data-cursor="view"  → expands into a labeled disc (work rows)
 * data-cursor="hide"  → fades out (forms, chatbot)
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Effect-driven on purpose: SSR and the first client render must both
    // be "disabled" so the cursor markup never causes a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(hasFinePointer() && !prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    let seen = false;
    const onMove = (e: MouseEvent) => {
      if (!seen) {
        seen = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.25 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const setMode = (mode: "default" | "link" | "view" | "hide") => {
      gsap.to(ring, {
        width: mode === "view" ? 88 : mode === "link" ? 48 : 36,
        height: mode === "view" ? 88 : mode === "link" ? 48 : 36,
        autoAlpha: mode === "hide" ? 0 : 1,
        backgroundColor:
          mode === "view" ? "rgba(206, 255, 0, 0.95)" : "rgba(206, 255, 0, 0)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, {
        autoAlpha: mode === "hide" || mode === "view" ? 0 : 1,
        duration: 0.2,
      });
      gsap.to(label, {
        autoAlpha: mode === "view" ? 1 : 0,
        duration: 0.2,
      });
    };

    const modeFor = (el: Element | null): "default" | "link" | "view" | "hide" => {
      const tagged = el?.closest("[data-cursor]");
      if (tagged) {
        const v = tagged.getAttribute("data-cursor");
        if (v === "view") return "view";
        if (v === "hide") return "hide";
      }
      return el?.closest("a, button, [role='button'], input, textarea, select, label")
        ? "link"
        : "default";
    };

    const onOver = (e: MouseEvent) => setMode(modeFor(e.target as Element));
    const onLeaveWindow = () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
    const onEnterWindow = () => seen && gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
    // The hovered element unmounts during page transitions — without this the
    // ring stays stuck in its expanded "view"/link state on the new page.
    const onNavigate = () => setMode("default");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    document.documentElement.addEventListener("mouseenter", onEnterWindow);
    window.addEventListener("hv:navigate", onNavigate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      document.documentElement.removeEventListener("mouseenter", onEnterWindow);
      window.removeEventListener("hv:navigate", onNavigate);
      gsap.killTweensOf([dot, ring, label]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[110] flex h-9 w-9 items-center justify-center rounded-full border border-fg/30 opacity-0"
        style={{ willChange: "transform" }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent-ink opacity-0"
        >
          View
        </span>
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[110] h-1.5 w-1.5 rounded-full bg-accent opacity-0"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
