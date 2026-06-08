"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor (a lagging ring + a snappy dot) plus a cursor-follow
 * spotlight on any hovered .neo-card. Desktop pointers only; disabled
 * for touch and reduced-motion users. The native cursor is kept for
 * usability — this layers on top via pointer-events:none.
 */
export default function PointerEffects() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    // Enable only after mount so SSR markup stays empty (no hydration mismatch)
    // and capability checks (pointer / reduced-motion) can read matchMedia.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const card = (e.target as HTMLElement)?.closest?.(".neo-card") as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
        card.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
      }
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      setActive(
        !!t?.closest?.("a, button, input, textarea, select, [data-cursor]")
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden md:block"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border"
          animate={{
            width: active ? 46 : 30,
            height: active ? 46 : 30,
            borderColor: active ? "rgba(34,211,238,0.9)" : "rgba(124,92,255,0.7)",
            backgroundColor: active ? "rgba(34,211,238,0.08)" : "rgba(124,92,255,0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden md:block"
        style={{ x, y }}
      >
        <div className="absolute -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
      </motion.div>
    </>
  );
}
