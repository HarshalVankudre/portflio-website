"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Lightbulb, Code, Target, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/SectionHeader";

export default function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { code: "A.1", text: t("about.softwareDev"), icon: Code },
    { code: "A.2", text: t("about.dataAnalysis"), icon: Target },
    { code: "A.3", text: t("about.languages"), icon: Users },
    { code: "A.4", text: t("about.problemSolving"), icon: Lightbulb },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="01"
          code="PROFILE"
          isInView={isInView}
          title={
            <>
              {t("about.title")}{" "}
              <span className="text-accent">{t("about.titleHighlight")}</span>
            </>
          }
        />

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Left — Statement */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            <p className="text-xl leading-relaxed text-fg sm:text-2xl">
              {t("about.intro")}
            </p>
            <p className="text-base leading-relaxed text-dim sm:text-lg">
              {t("about.summary")}
            </p>
            <p className="text-base leading-relaxed text-dim sm:text-lg">
              {t("about.chess")}{" "}
              <span className="font-medium text-accent">{t("hero.location")}</span>.
            </p>

            {/* Objective callout */}
            <div className="panel relative border-l-2 border-l-accent p-5 sm:p-6">
              <span className="tech-label flex items-center gap-2 text-accent">
                <span className="led led-accent" aria-hidden />
                Objective
              </span>
              <p className="mt-2.5 font-medium leading-relaxed text-fg">
                {t("about.looking")}
              </p>
            </div>
          </motion.div>

          {/* Right — Spec checklist */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="panel corners"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <span className="tech-label">
                SPEC <span className="text-accent">{"//"}</span> CHECKLIST
              </span>
              <span aria-hidden className="crosshair" />
            </div>

            <ul className="divide-y divide-line">
              {highlights.map((highlight, index) => (
                <motion.li
                  key={highlight.code}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                  className="flex items-center gap-4 px-5 py-4"
                >
                  <span className="tech-label w-7 shrink-0">{highlight.code}</span>
                  <highlight.icon size={16} className="shrink-0 text-faint" aria-hidden />
                  <span className="flex-1 text-sm font-medium text-fg sm:text-base">
                    {highlight.text}
                  </span>
                  <Check size={15} className="shrink-0 text-accent" aria-hidden />
                </motion.li>
              ))}
            </ul>

            {/* Readout strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="grid grid-cols-2 divide-x divide-line border-t border-line bg-overlay"
            >
              <div className="p-5 text-center">
                <div className="font-display text-5xl font-bold text-accent">2+</div>
                <div className="tech-label mt-1.5">{t("about.yearsExp")}</div>
              </div>
              <div className="p-5 text-center">
                <div className="font-display text-5xl font-bold">04</div>
                <div className="tech-label mt-1.5">Roles · 2021—2026</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
