"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

/** A line of the headline that reveals upward from behind a clip mask. */
function RevealLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-16"
    >
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10">
        {/* Top meta rule */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between border-t border-[var(--border-strong)] pt-3 mb-10 sm:mb-14 font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] text-muted"
        >
          <span className="text-[var(--foreground)]">Harshal Vankudre</span>
          <span className="hidden sm:inline">AI / Software Engineer</span>
          <span>(01)</span>
        </motion.div>

        {/* Headline */}
        <h1
          className="font-serif font-light tracking-[-0.02em] text-[var(--foreground)]"
          style={{ fontSize: "clamp(2.6rem, 8.5vw, 7rem)", lineHeight: 1.02 }}
        >
          <RevealLine delay={0.05}>Designing&nbsp;&amp;&nbsp;building</RevealLine>
          <RevealLine delay={0.13}>
            <span className="italic text-[var(--primary)]">intelligent</span> systems
          </RevealLine>
          <RevealLine delay={0.21}>for the real world.</RevealLine>
        </h1>

        {/* Sub + meta + actions */}
        <div className="mt-12 sm:mt-16 grid lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            className="lg:col-span-7"
          >
            <p className="text-lg sm:text-xl leading-relaxed text-[var(--foreground)]/85 max-w-xl">
              I&rsquo;m Harshal — an AI developer in {t("hero.location")} building
              enterprise chatbots, RAG systems, and full-stack apps that ship.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#projects" className="neo-btn neo-btn-primary group">
                {t("hero.viewProjects")}
                <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="/cv.pdf"
                download="Harshal-Vankudre-CV.pdf"
                className="neo-btn neo-btn-white"
              >
                {t("hero.downloadCV")}
              </a>
            </div>
          </motion.div>

          {/* Right column — facts index */}
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            className="lg:col-span-5 lg:justify-self-end w-full max-w-sm divide-y divide-[var(--border)] border-y border-[var(--border)]"
          >
            {[
              { k: "Currently", v: "AI Developer @ RÜKO GmbH" },
              { k: "Focus", v: "RAG · LLMs · Full-stack" },
              { k: "Based in", v: t("hero.location") },
              { k: "Status", v: "Open to opportunities" },
            ].map((row) => (
              <div key={row.k} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-2 shrink-0">
                  {row.k}
                </dt>
                <dd className="text-right text-sm sm:text-[15px] text-[var(--foreground)]">
                  {row.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted hover:text-[var(--foreground)] transition-colors"
      >
        Scroll
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  );
}
