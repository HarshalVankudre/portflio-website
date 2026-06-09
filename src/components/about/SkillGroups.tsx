"use client";

import { useRef } from "react";
import { portfolioData } from "@/lib/portfolioData";
import { useLanguage } from "@/context/LanguageContext";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

const GROUPS = [
  { key: "skills.languages" as const, items: portfolioData.skills.languages },
  { key: "skills.frameworks" as const, items: portfolioData.skills.frameworks },
  { key: "skills.ai" as const, items: portfolioData.skills.ai },
  { key: "skills.databases" as const, items: portfolioData.skills.databases },
  { key: "skills.cloud" as const, items: portfolioData.skills.cloud },
  { key: "skills.tools" as const, items: portfolioData.skills.tools },
];

/** Grouped inline skill lists — quiet, editorial, no card grid. */
export default function SkillGroups() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.from("[data-skill-row]", {
        autoAlpha: 0,
        y: 26,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="divide-y divide-line border-y border-line">
      {GROUPS.map((group) => (
        <div
          key={group.key}
          data-skill-row
          className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8"
        >
          <h3 className="label-mono sm:pt-0.5">{t(group.key)}</h3>
          <p className="text-sm leading-relaxed text-dim sm:text-base">
            {group.items.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}
