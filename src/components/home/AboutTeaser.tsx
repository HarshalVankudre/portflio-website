"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import RevealText from "@/components/ui/RevealText";
import TransitionLink from "@/components/ui/TransitionLink";
import Magnetic from "@/components/ui/Magnetic";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/** Real numbers only — these are the EnBW/RÜKO figures from the CV. */
const METRICS = [
  { value: 2, suffix: "+", key: "home.metricYears" as const },
  { value: 50, suffix: "+", key: "home.metricUsers" as const },
  { value: 60, suffix: "%", key: "home.metricAutomation" as const },
  { value: 35, suffix: "%", key: "home.metricFaster" as const },
];

export default function AboutTeaser() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.v)}${suffix}`;
          },
        });
      });

      gsap.from("[data-metric]", {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "[data-metrics]",
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [language] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative grid grid-cols-1 gap-10 px-gutter py-section lg:grid-cols-[1fr_2.5fr]"
    >
      <div>
        <h2 className="label-mono lg:sticky lg:top-28">
          02 — {t("home.aboutLabel")}
        </h2>
      </div>

      <div>
        <RevealText
          key={language}
          as="p"
          className="font-display text-display-sm text-fg [text-wrap:balance]"
        >
          {t("home.aboutStatement")}
        </RevealText>

        <div
          data-metrics
          className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4"
        >
          {METRICS.map((m) => (
            <div key={m.key} data-metric>
              <span
                data-count={m.value}
                data-suffix={m.suffix}
                className="block font-display text-display-md leading-none text-accent tabular-nums"
              >
                {m.value}
                {m.suffix}
              </span>
              <span className="label-mono mt-3 block">{t(m.key)}</span>
            </div>
          ))}
        </div>

        <Magnetic className="mt-16">
          <TransitionLink
            href="/about"
            className="link-draw inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-dim"
          >
            {t("home.moreAbout")}
            <span aria-hidden>↗</span>
          </TransitionLink>
        </Magnetic>
      </div>
    </section>
  );
}
