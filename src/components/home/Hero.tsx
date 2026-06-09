"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Full-viewport opening statement: the name in huge Fraunces lines
 * revealed from behind masks, drifting upward at a slower rate than
 * the scroll (parallax) while fading toward the work list.
 */
export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return;

      // First visit: wait for the preloader's wipe. Refresh: start almost at once.
      const firstVisit = !sessionStorage.getItem("portfolio_loaded");
      const delay = firstVisit ? 2.45 : 0.25;

      gsap.from("[data-hero-line]", {
        yPercent: 115,
        duration: 1.3,
        ease: "power4.out",
        stagger: 0.12,
        delay,
      });
      gsap.from("[data-hero-meta]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: delay + 0.55,
      });

      // Parallax out
      gsap.to("[data-hero-parallax]", {
        yPercent: -14,
        autoAlpha: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-between px-gutter pb-12 pt-32 sm:pt-40"
    >
      <div data-hero-parallax>
        <p data-hero-meta className="label-mono mb-6 sm:mb-10">
          {t("home.role")} — RÜKO GmbH · {t("hero.location")}
        </p>

        <h1 className="font-display text-fg">
          <span className="mask">
            <span data-hero-line className="block text-display-xl tracking-tight">
              Harshal
            </span>
          </span>
          <span className="mask">
            <span
              data-hero-line
              className="block text-display-xl italic tracking-tight text-fg sm:ml-[10vw]"
            >
              Vankudre<span className="not-italic text-accent">.</span>
            </span>
          </span>
        </h1>
      </div>

      <div
        data-hero-parallax
        className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
      >
        <p
          data-hero-meta
          className="max-w-md text-base leading-relaxed text-dim sm:text-lg"
        >
          {t("home.tagline")}
        </p>

        <div data-hero-meta className="flex items-center gap-10">
          <span className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-dim">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {t("home.status")}
          </span>

          <span
            className="hidden items-center gap-3 sm:inline-flex"
            aria-hidden
          >
            <span className="label-mono">{t("home.scroll")}</span>
            <span className="relative h-12 w-px overflow-hidden bg-line-strong">
              <span className="animate-cue-drop absolute left-0 top-0 h-4 w-px bg-accent" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
