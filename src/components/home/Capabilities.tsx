"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ScrambleLabel from "@/components/ui/ScrambleLabel";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/motion";

const TERM_KEYS = [
  "home.capTerm1",
  "home.capTerm2",
  "home.capTerm3",
  "home.capTerm4",
  "home.capTerm5",
  "home.capTerm6",
] as const;

/* Stack lines stay unlocalized — tech terms, same convention as cs.stack. */
const CARDS = [
  {
    title: "home.cap1.title",
    desc: "home.cap1.desc",
    stack: "Python · OpenAI API · Vector DB",
  },
  {
    title: "home.cap2.title",
    desc: "home.cap2.desc",
    stack: "Next.js · TypeScript · PostgreSQL",
  },
  {
    title: "home.cap3.title",
    desc: "home.cap3.desc",
    stack: "Microsoft Teams API · REST · Cloud",
  },
] as const;

/**
 * "What I do" band: a slow marquee of oversized outlined disciplines
 * (decorative — the cards below carry the same content for readers and
 * screen readers) over a three-card capability grid. Scroll velocity
 * leans on the marquee's throttle; it pauses entirely offscreen.
 */
export default function Capabilities() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !sectionRef.current) return;

      // Card entrances — same stagger pattern as the metrics grid
      gsap.from("[data-cap]", {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "[data-caps]",
          start: "top 88%",
          once: true,
        },
      });

      const track = trackRef.current;
      if (!track) return;

      // Two identical groups inside the track — -50% is exactly one group,
      // so the wrap is seamless.
      const drift = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 36,
        repeat: -1,
      });

      // Scroll velocity throttles the drift up to ~3.5x, settling back
      // once the scroll goes quiet.
      const settle = gsap
        .delayedCall(0.15, () => {
          gsap.to(drift, {
            timeScale: 1,
            duration: 1.2,
            ease: "power2.out",
            overwrite: true,
          });
        })
        .pause();

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => drift.paused(!self.isActive),
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(
            1,
            3.5,
            1 + Math.abs(self.getVelocity()) / 1200
          );
          if (boost > drift.timeScale()) {
            gsap.killTweensOf(drift);
            drift.timeScale(boost);
          }
          settle.restart(true);
        },
      });
    },
    // language: the track remounts when the copy flips — re-arm the drift
    // tween on the new node or it keeps animating a detached element.
    { scope: sectionRef, dependencies: [reduced, language] }
  );

  const terms = (copy: number) => (
    <div key={copy} className="flex items-baseline">
      {TERM_KEYS.map((k) => (
        <span key={k} className="flex items-baseline">
          <span className="cap-term font-display text-display-md italic">
            {t(k)}
          </span>
          <span className="mx-6 text-accent sm:mx-10" aria-hidden>
            ·
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative py-section"
    >
      <div className="mb-14 border-b border-line px-gutter pb-5">
        <h2 className="label-mono">
          <ScrambleLabel>{`02 — ${t("home.capabilitiesLabel")}`}</ScrambleLabel>
        </h2>
      </div>

      {/* Decorative marquee — the grid below carries the real content */}
      <div
        aria-hidden
        className="overflow-clip border-b border-line pb-8 pt-2"
      >
        <div
          ref={trackRef}
          key={`${language}-${reduced}`}
          className="flex w-max whitespace-nowrap"
        >
          {reduced ? terms(0) : [terms(0), terms(1)]}
        </div>
      </div>

      <div
        data-caps
        className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 px-gutter md:grid-cols-3"
      >
        {CARDS.map((card, i) => (
          <div key={card.title} data-cap>
            <span className="label-mono text-faint">C.0{i + 1}</span>
            <h3 className="mt-4 font-display text-display-sm text-fg">
              {t(card.title)}
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-dim sm:text-base">
              {t(card.desc)}
            </p>
            <p className="label-mono mt-5 text-faint">{card.stack}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
