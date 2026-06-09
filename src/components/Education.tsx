"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/SectionHeader";

export default function Education() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const education = [
    {
      institution: "Hochschule Karlsruhe",
      degree: t("edu.hka.degree"),
      period: "Sep 2024 - Present",
      current: true,
      highlights: [t("edu.hka.h1"), t("edu.hka.h2")],
    },
  ];

  return (
    <section id="education" className="relative py-24 sm:py-28">
      <div ref={ref} className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="04"
          code="ACADEMIC RECORD"
          isInView={isInView}
          title={
            <>
              {t("education.title")}{" "}
              <span className="text-accent">{t("education.titleHighlight")}</span>
            </>
          }
          subtitle={t("education.subtitle")}
        />

        {/* Credential plate */}
        <div className="mx-auto max-w-4xl">
          {education.map((edu, index) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="panel corners"
            >
              {/* Plate header */}
              <div className="flex items-center justify-between border-b border-line px-5 py-3 sm:px-6">
                <span className="tech-label">
                  CRED.0{index + 1} <span className="text-accent">{"//"}</span>{" "}
                  HOCHSCHULE KARLSRUHE
                </span>
                {edu.current && (
                  <span className="tech-label flex items-center gap-2 text-ok">
                    <span className="led led-ok" aria-hidden />
                    {t("education.current")}
                  </span>
                )}
              </div>

              <div className="grid md:grid-cols-[220px_1fr]">
                {/* Degree mark */}
                <div className="blueprint relative flex min-h-44 flex-col justify-between border-b border-line p-6 md:border-b-0 md:border-r">
                  <div aria-hidden className="crosshair absolute right-3 top-3" />
                  <GraduationCap size={26} className="text-accent" aria-hidden />
                  <div>
                    <div className="font-display text-6xl font-bold uppercase leading-none">
                      B.Sc
                    </div>
                    <span aria-hidden className="mt-3 block h-px w-12 bg-accent" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="chip cursor-default border-accent text-accent">
                      {edu.period}
                    </span>
                    <span className="chip cursor-default">Data Science</span>
                  </div>
                  <h3 className="font-display mt-4 text-3xl font-semibold uppercase sm:text-4xl">
                    {edu.degree}
                  </h3>
                  <p className="mt-1 font-mono text-sm text-dim">
                    {edu.institution}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {edu.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-2.5 h-px w-3 shrink-0 bg-accent"
                        />
                        <span className="text-sm leading-relaxed text-dim sm:text-base">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
