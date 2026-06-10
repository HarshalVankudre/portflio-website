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
      const root = ref.current;
      if (prefersReducedMotion() || !root) return;
      gsap.from("[data-band-metric]", {
        autoAlpha: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });

      // Count up numeric values; non-numeric ones ("Full-stack") stay static
      gsap.utils.toArray<HTMLElement>("[data-band-value]").forEach((el) => {
        const raw = el.dataset.value ?? "";
        const match = /^([\d.,]+)(.*)$/.exec(raw);
        if (!match) return;
        // Years read as labels, not quantities — counting "2025" up from 0 is wrong
        if (/^(19|20)\d{2}$/.test(raw)) return;
        const target = Number(match[1].replace(/[.,]/g, ""));
        if (!Number.isFinite(target)) return;
        const suffix = match[2];
        // Reproduce the source string's grouping: "2,395" → en-US, "2.395" → de-DE
        const locale = match[1].includes(",")
          ? "en-US"
          : match[1].includes(".")
            ? "de-DE"
            : undefined;
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
          onUpdate: () => {
            const n = Math.round(counter.v);
            el.textContent = `${locale ? n.toLocaleString(locale) : n}${suffix}`;
          },
        });
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
          <span
            data-band-value
            data-value={m.value}
            className="block font-display text-display-md leading-none text-accent tabular-nums"
          >
            {m.value}
          </span>
          <span className="label-mono mt-3 block">{m.label[language]}</span>
        </div>
      ))}
    </div>
  );
}
