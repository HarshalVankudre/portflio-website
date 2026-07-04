"use client";

import { useRef } from "react";
import { getCaseStudy, type CaseStudy } from "@/lib/caseStudies";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import TransitionLink from "@/components/ui/TransitionLink";
import RevealText from "@/components/ui/RevealText";
import ScrambleLabel from "@/components/ui/ScrambleLabel";
import ParallaxImage from "@/components/work/ParallaxImage";
import MediaSection from "@/components/work/MediaSection";
import MetricsBand from "@/components/work/MetricsBand";
import NextProject from "@/components/work/NextProject";
import ScrollRail from "@/components/effects/ScrollRail";
import ChatBot from "@/components/ChatBot";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

function ProseBlock({
  id,
  number,
  label,
  paragraphs,
}: {
  id: string;
  number: string;
  label: string;
  paragraphs: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.from("[data-prose-p]", {
        autoAlpha: 0,
        y: 36,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
      });
    },
    { scope: ref, dependencies: [paragraphs] }
  );

  return (
    <div
      ref={ref}
      id={id}
      className="grid grid-cols-1 gap-8 border-t border-line px-gutter py-20 lg:grid-cols-[1fr_2.5fr]"
    >
      <h2 className="label-mono lg:sticky lg:top-28 lg:self-start">
        <ScrambleLabel>{`${number} — ${label}`}</ScrambleLabel>
      </h2>
      <div className="max-w-[65ch] space-y-6">
        {paragraphs.map((p) => (
          <p
            key={p.slice(0, 32)}
            data-prose-p
            className="text-base leading-relaxed text-dim sm:text-lg"
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function CaseStudyView({ slug }: { slug: CaseStudy["slug"] }) {
  const { t, language } = useLanguage();
  const cs = getCaseStudy(slug)!;
  const next = getCaseStudy(cs.nextSlug)!;
  const headerRef = useRef<HTMLDivElement>(null);

  const mediaAfter = (slot: "problem" | "approach" | "result") =>
    cs.media
      ?.filter((m) => m.after === slot)
      .map((m, i) => <MediaSection key={`${slot}-${i}`} section={m} />);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !headerRef.current) return;
      gsap.from("[data-case-meta]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.07,
        delay: 0.5,
      });
    },
    { scope: headerRef }
  );

  return (
    <>
      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="relative min-h-screen outline-none"
      >
      {/* Case hero */}
      <div ref={headerRef} className="px-gutter pb-16 pt-36 sm:pt-44">
        <p data-case-meta className="label-mono mb-8">
          <TransitionLink
            href="/#work"
            transitionLabel={t("nav.work")}
            className="link-draw"
          >
            {t("work.back")}
          </TransitionLink>
          <span className="mx-3 text-faint" aria-hidden>
            /
          </span>
          {cs.index}
        </p>

        <RevealText
          key={`title-${language}`}
          as="h1"
          className="font-display text-display-lg text-fg"
        >
          {cs.title}
        </RevealText>

        <RevealText
          key={`oneliner-${language}`}
          as="p"
          delay={0.2}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-dim"
        >
          {cs.oneLiner[language]}
        </RevealText>

        <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
          <div data-case-meta>
            <dt className="label-mono">{t("work.year")}</dt>
            <dd className="mt-2 font-mono text-sm text-fg">{cs.year}</dd>
          </div>
          <div data-case-meta>
            <dt className="label-mono">{t("work.role")}</dt>
            <dd className="mt-2 font-mono text-sm text-fg">
              {cs.role[language]}
            </dd>
          </div>
          <div data-case-meta>
            <dt className="label-mono">{t("work.client")}</dt>
            <dd className="mt-2 font-mono text-sm text-fg">{cs.client}</dd>
          </div>
          <div data-case-meta>
            <dt className="label-mono">{t("work.stack")}</dt>
            <dd className="mt-2 font-mono text-xs leading-relaxed text-dim">
              {cs.stack.join(" · ")}
            </dd>
          </div>
        </dl>
      </div>

      {/* Hero visual */}
      <div className="px-gutter pb-8">
        <ParallaxImage
          src={cs.hero.src}
          alt={cs.hero.alt[language]}
          reveal="enter"
          className="aspect-[16/9] w-full"
        />
      </div>

      <ProseBlock
        id="problem"
        number="01"
        label={t("work.problem")}
        paragraphs={cs.problem[language]}
      />
      {mediaAfter("problem")}
      <ProseBlock
        id="approach"
        number="02"
        label={t("work.approach")}
        paragraphs={cs.approach[language]}
      />
      {mediaAfter("approach")}

      <MetricsBand metrics={cs.metrics} />

      <ProseBlock
        id="result"
        number="03"
        label={t("work.result")}
        paragraphs={cs.result[language]}
      />
      {mediaAfter("result")}

      {(cs.links?.repo || cs.links?.reference) && (
        <div className="flex flex-wrap gap-10 border-t border-line px-gutter py-10">
          {cs.links?.repo && (
            <a
              href={cs.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-dim"
            >
              GitHub ↗
            </a>
          )}
          {cs.links?.reference && (
            <a
              href={cs.links.reference}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-dim"
            >
              {t("work.reference")} ↗
            </a>
          )}
        </div>
      )}

      <NextProject next={next} />
      <ScrollRail
        chapters={[
          { id: "problem", label: t("work.problem") },
          { id: "approach", label: t("work.approach") },
          { id: "result", label: t("work.result") },
        ]}
      />
      </main>
      <ChatBot />
    </>
  );
}
