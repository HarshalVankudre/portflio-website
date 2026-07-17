"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { caseStudies } from "@/lib/caseStudies";
import TransitionLink from "@/components/ui/TransitionLink";
import SectionHeader from "@/components/ui/SectionHeader";
import VelocityLean from "@/components/effects/VelocityLean";
import { gsap, useGSAP } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * The centerpiece: every case study as an oversized row. On pointer
 * devices a floating preview crossfades between rows while trailing the
 * cursor (tilting with its horizontal velocity); on touch a static
 * thumbnail sits above each title.
 */
export default function WorkList() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const imgARef = useRef<HTMLImageElement>(null);
  const imgBRef = useRef<HTMLImageElement>(null);

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
      const imgs = [imgARef.current, imgBRef.current];
      if (!preview || !imgs[0] || !imgs[1] || !hasFinePointer()) return;

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
      const rotTo = gsap.quickTo(preview, "rotation", {
        duration: 0.45,
        ease: "power3.out",
      });
      const rotReset = gsap.delayedCall(0.12, () => rotTo(0)).pause();

      let lastX = 0;
      let lastT = 0;
      const onMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        // Horizontal pointer velocity tilts the card a few degrees
        const now = performance.now();
        if (lastT) {
          const vx = (e.clientX - lastX) / Math.max(now - lastT, 8);
          rotTo(gsap.utils.clamp(-8, 8, vx * 12));
          rotReset.restart(true);
        }
        lastX = e.clientX;
        lastT = now;
      };

      // Crossfade between the two stacked frames on row switch — a hard
      // src swap on a single img flashes white while decoding.
      let active = 0;
      let currentSrc = "";
      const showSrc = (src: string) => {
        if (src === currentSrc) return;
        currentSrc = src;
        const next = imgs[1 - active]!;
        const prev = imgs[active]!;
        next.src = src;
        gsap.killTweensOf([next, prev]);
        gsap.set(next, { zIndex: 2 });
        gsap.set(prev, { zIndex: 1 });
        gsap.fromTo(
          next,
          { autoAlpha: 0, scale: 1.12 },
          { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power3.out" }
        );
        gsap.to(prev, { autoAlpha: 0, duration: 0.4, ease: "power2.out" });
        active = 1 - active;
      };

      const rows = gsap.utils.toArray<HTMLElement>("[data-work-row]");
      const enter = (row: HTMLElement) => () => {
        const src = row.getAttribute("data-preview");
        if (src) showSrc(src);
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
        rotReset.kill();
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="work" className="relative px-gutter py-section">
      <SectionHeader
        label={`01 — ${t("home.selectedWork")}`}
        meta={`(0${caseStudies.length})`}
      />

      <VelocityLean strength={1.5}>
        <ul>
          {caseStudies.map((cs) => (
            <li key={cs.slug} className="border-b border-line">
              <TransitionLink
                href={`/work/${cs.slug}`}
                transitionLabel={cs.title}
                data-work-row
                data-preview={cs.hero.src}
                data-cursor="view"
                aria-label={`${cs.title} — ${t("home.viewCase")}`}
                className="group relative grid grid-cols-1 gap-4 py-10 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-8 sm:py-14"
              >
                {/* Full-bleed volt wash rising behind the row on hover */}
                <span
                  aria-hidden
                  className="work-row-wash absolute inset-y-0 -inset-x-gutter -z-10"
                />

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

                {/* Base title + volt overlay swept in by clip-path on hover */}
                <span className="relative block">
                  <span className="work-title block font-display text-display-lg text-fg">
                    {cs.title}
                  </span>
                  <span
                    aria-hidden
                    className="work-title work-title-fill absolute inset-0 block font-display text-display-lg"
                  >
                    {cs.title}
                  </span>
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
      </VelocityLean>

      {/* Floating cursor preview — two frames stacked for crossfades */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[85] hidden aspect-[16/10] w-[min(26rem,38vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm border border-line-strong opacity-0 shadow-[0_40px_80px_rgba(0,0,0,0.55)] lg:block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgARef}
          src={caseStudies[0].hero.src}
          alt=""
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgBRef}
          src={caseStudies[0].hero.src}
          alt=""
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-0"
        />
      </div>
    </section>
  );
}
