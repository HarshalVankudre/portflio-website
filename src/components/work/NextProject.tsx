"use client";

import type { CaseStudy } from "@/lib/caseStudies";
import { useLanguage } from "@/context/LanguageContext";
import TransitionLink from "@/components/ui/TransitionLink";

/**
 * Full-height closing link — replaces a conventional footer on case
 * pages and keeps the reader moving through the work.
 */
export default function NextProject({ next }: { next: CaseStudy }) {
  const { t } = useLanguage();

  return (
    <TransitionLink
      href={`/work/${next.slug}`}
      transitionLabel={next.title}
      data-cursor="view"
      className="group relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden border-t border-line px-gutter text-center"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={next.hero.src}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-20 [@media(hover:none)]:opacity-[0.16]"
      />
      <span className="label-mono relative">{t("work.next")}</span>
      <span className="work-title relative mt-6 font-display text-display-lg text-fg">
        {next.title}
      </span>
      <span className="relative mt-8 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-faint transition-colors group-hover:text-accent">
        {next.index} <span aria-hidden>→</span>
      </span>
    </TransitionLink>
  );
}
