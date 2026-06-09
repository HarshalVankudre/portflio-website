"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/* Roles and highlights resolve through t() (already localized);
   the short impact lines are inline-localized. */
const ENTRIES = [
  {
    company: "RÜKO GmbH Baumaschinen",
    period: "2025 —",
    location: "Karlsruhe, DE",
    roleKey: "exp.ruko.role" as const,
    highlightKeys: ["exp.ruko.h1", "exp.ruko.h2", "exp.ruko.h5"] as const,
    impact: { en: "50+ internal users", de: "50+ interne Nutzer" },
  },
  {
    company: "EnBW GmbH",
    period: "2024 — 2025",
    location: "Karlsruhe, DE",
    roleKey: "exp.enbw.role" as const,
    highlightKeys: ["exp.enbw.h5", "exp.enbw.h6", "exp.enbw.h3"] as const,
    impact: {
      en: "35% faster responses · 60% tier-1 automated",
      de: "35% schnellere Antworten · 60% Tier-1 automatisiert",
    },
  },
  {
    company: "Enpal GmbH",
    period: "2022 — 2023",
    location: "Berlin, DE",
    roleKey: "exp.enpal.role" as const,
    highlightKeys: ["exp.enpal.h1", "exp.enpal.h3"] as const,
    impact: {
      en: "One year inside the solar transition",
      de: "Ein Jahr in der Solarwende",
    },
  },
  {
    company: "Bhumi NGO",
    period: "2021",
    location: "India",
    roleKey: "exp.bhumi.role" as const,
    highlightKeys: ["exp.bhumi.h1", "exp.bhumi.h3"] as const,
    impact: { en: "20+ students tutored", de: "20+ Schüler:innen unterrichtet" },
  },
];

/** Vertical timeline whose spine draws itself as you scroll. */
export default function Timeline() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;

      gsap.from("[data-spine]", {
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          end: "bottom 60%",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-entry]").forEach((entry) => {
        gsap.from(entry, {
          autoAlpha: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: entry, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="relative">
      <span
        data-spine
        aria-hidden
        className="absolute bottom-0 left-0 top-0 hidden w-px bg-line-strong sm:block"
      />
      <ol className="space-y-20 sm:pl-12">
        {ENTRIES.map((e) => (
          <li key={e.company} data-entry className="relative">
            <span
              aria-hidden
              className="absolute -left-12 top-3 hidden h-2 w-2 -translate-x-1/2 rounded-full bg-accent sm:block"
            />
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <h3 className="font-display text-display-sm text-fg">
                {e.company}
              </h3>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
                {e.period} · {e.location}
              </span>
            </div>
            <p className="label-mono mt-2">{t(e.roleKey)}</p>
            <ul className="mt-5 max-w-2xl space-y-2.5">
              {e.highlightKeys.map((key) => (
                <li
                  key={key}
                  className="text-sm leading-relaxed text-dim sm:text-base"
                >
                  {t(key)}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-accent">
              {e.impact[language]}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
