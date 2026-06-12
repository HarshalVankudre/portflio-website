"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface Chapter {
  /** id of the section element the tick scrolls to. */
  id: string;
  label: string;
}

/**
 * Right-edge progress rail: a hairline track whose volt fill tracks
 * document scroll. With `chapters` it grows focusable tick buttons that
 * glide to each section and light up while the reader is inside it.
 * The fill reflects scroll *state* (direct sets, no tweens), so it stays
 * meaningful under reduced motion too.
 */
export default function ScrollRail({ chapters }: { chapters?: Chapter[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      const fill = fillRef.current;
      if (!fill) return;

      const setScale = gsap.quickSetter(fill, "scaleY");
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => setScale(self.progress),
        onRefresh: (self) => setScale(self.progress),
      });

      chapters?.forEach((c) => {
        const section = document.getElementById(c.id);
        const btn = ref.current?.querySelector(`[data-rail-tick="${c.id}"]`);
        if (!section || !btn) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) =>
            btn.classList.toggle("rail-tick-active", self.isActive),
        });
      });
    },
    { scope: ref, dependencies: [chapters] }
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -96 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={ref}
      aria-hidden={chapters?.length ? undefined : true}
      className="fixed right-3 top-1/2 z-[70] hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex"
    >
      <div className="relative h-[28svh] w-px overflow-hidden bg-line-strong">
        <div
          ref={fillRef}
          className="absolute inset-0 origin-top bg-accent"
          style={{ transform: "scaleY(0)" }}
        />
      </div>

      {chapters?.length ? (
        <nav aria-label="Chapters">
          <ul className="flex flex-col items-center gap-1.5">
            {chapters.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  data-rail-tick={c.id}
                  aria-label={c.label}
                  onClick={() => scrollTo(c.id)}
                  className="rail-tick-btn flex h-6 w-6 items-center justify-end"
                >
                  <span aria-hidden className="rail-tick" />
                </button>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
