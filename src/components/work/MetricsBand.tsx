"use client";

import { useRef } from "react";
import type { CaseStudy } from "@/lib/caseStudies";
import { useLanguage } from "@/context/LanguageContext";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/** Full-width strip of oversized figures. Numeric values count up on enter. */
export default function MetricsBand({
  metrics,
}: {
  metrics: CaseStudy["metrics"];
}) {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.from("[data-band-metric]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-12 border-y border-line bg-surface/60 px-gutter py-16 sm:grid-cols-2 lg:grid-cols-3"
    >
      {metrics.map((m) => (
        <div key={m.label.en} data-band-metric>
          <span className="block font-display text-display-md leading-none text-accent tabular-nums">
            {m.value}
          </span>
          <span className="label-mono mt-3 block">{m.label[language]}</span>
        </div>
      ))}
    </div>
  );
}
