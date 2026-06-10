"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { caseStudies } from "@/lib/caseStudies";
import TransitionLink from "@/components/ui/TransitionLink";
import { gsap, useGSAP } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * The centerpiece: every case study as an oversized row. On pointer
 * devices a floating preview image trails the cursor across the row;
 * on touch a static thumbnail sits above each title.
 */
export default function WorkList() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || prefersReducedMotion()) return;

      // Row entrances
      gsap.utils.toArray<HTMLElement>("[data-work-row]").forEach((row) => {
        gsap.from(row, {
          y: 70,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });

      // Floating preview (fine pointers only)
      const preview = previewRef.current;
      if (!preview || !hasFinePointer()) return;

      // Initial state lives on the GSAP transform — an inline CSS `scale`
      // would compose multiplicatively with it and never resolve to 1.
      gsap.set(preview, { scale: 0.88 });

      // Warm the cache so fast row-switching never flashes a stale frame
      caseStudies.forEach((cs) => {
        const img = new Image();
        img.src = cs.hero.src;
      });

      const xTo = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const rows = gsap.utils.toArray<HTMLElement>("[data-work-row]");
      const enter = (row: HTMLElement) => () => {
        const src = row.getAttribute("data-preview");
        if (previewImgRef.current && src) previewImgRef.current.src = src;
        gsap.to(preview, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
        });
      };
      const leave = () =>
        gsap.to(preview, {
          autoAlpha: 0,
          scale: 0.88,
          duration: 0.3,
          ease: "power3.in",
        });

      section.addEventListener("mousemove", onMove, { passive: true });
      const cleanups = rows.map((row) => {
        const onEnter = enter(row);
        row.addEventListener("mouseenter", onEnter);
        row.addEventListener("mouseleave", leave);
        return () => {
          row.removeEventListener("mouseenter", onEnter);
          row.removeEventListener("mouseleave", leave);
        };
      });

      return () => {
        section.removeEventListener("mousemove", onMove);
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="work" className="relative px-gutter py-section">
      <div className="mb-14 flex items-baseline justify-between border-b border-line pb-5">
        <h2 className="label-mono">
          01 — {t("home.selectedWork")}
        </h2>
        <span className="label-mono" aria-hidden>
          (0{caseStudies.length})
        </span>
      </div>

      <ul>
        {caseStudies.map((cs) => (
          <li key={cs.slug} className="border-b border-line">
            <TransitionLink
              href={`/work/${cs.slug}`}
              data-work-row
              data-preview={cs.hero.src}
              data-cursor="view"
              aria-label={`${cs.title} — ${t("home.viewCase")}`}
              className="group grid grid-cols-1 gap-4 py-10 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-8 sm:py-14"
            >
              {/* Touch-only thumbnail */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cs.hero.src}
                alt=""
                aria-hidden
                loading="lazy"
                className="touch-only mb-2 aspect-[16/10] w-full rounded-sm border border-line object-cover sm:col-span-3"
              />

              <span className="label-mono hidden sm:block" aria-hidden>
                {cs.index}
              </span>

              <span className="work-title block font-display text-display-lg text-fg">
                {cs.title}
              </span>

              <span className="flex flex-col items-start gap-1 sm:items-end">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-dim">
                  {cs.year}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
                  {cs.role[language]}
                </span>
                <span className="mt-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint transition-colors group-hover:text-accent">
                  {t("home.viewCase")}
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </span>
              </span>
            </TransitionLink>
          </li>
        ))}
      </ul>

      {/* Floating cursor preview */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[85] hidden w-[min(26rem,38vw)] -translate-x-1/2 -translate-y-1/2 opacity-0 lg:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={previewImgRef}
          src={caseStudies[0].hero.src}
          alt=""
          decoding="async"
          className="aspect-[16/10] w-full rounded-sm border border-line-strong object-cover shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
        />
      </div>
    </section>
  );
}
