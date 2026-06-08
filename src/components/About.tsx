"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Lightbulb, Code, Target, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasPhoto, setHasPhoto] = useState(true);

  const highlights = [
    { text: t("about.softwareDev"), icon: Code },
    { text: t("about.dataAnalysis"), icon: Target },
    { text: t("about.languages"), icon: Users },
    { text: t("about.problemSolving"), icon: Lightbulb },
  ];

  return (
    <section id="about" className="relative py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative mb-16"
        >
          <span className="neo-eyebrow mb-5">{t("about.tag")}</span>
          <h2 className="neo-title mt-4">
            {t("about.title")}{" "}
            <span className="neo-highlight">{t("about.titleHighlight")}</span>
          </h2>
          <span className="hand-note hidden md:block absolute right-2 top-0 text-2xl rotate-3 select-none">
            the person, not the buzzwords
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left - profile mark */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto lg:mx-0 w-fit">
              <div className="system-panel p-3">
                <div className="relative w-60 sm:w-72 aspect-square overflow-hidden rounded-lg bg-[var(--surface-2)] border border-[var(--border)]">
                  {hasPhoto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/profile.jpg"
                      alt="Harshal Vankudre GitHub avatar"
                      onError={() => setHasPhoto(false)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 px-4 text-center">
                      <span className="font-serif text-7xl text-[var(--muted-2)]">HV</span>
                      <span className="font-mono text-[10px] uppercase text-muted-2">
                        AI developer
                      </span>
                    </div>
                  )}
                </div>
                <p className="font-mono text-xs uppercase text-center mt-3 text-muted">
                  GitHub profile mark
                </p>
              </div>
              <span className="hand-note hidden sm:block absolute -right-6 top-8 text-2xl rotate-6 select-none">
                builder energy
              </span>
            </div>

            {/* Years stat */}
            <div className="mt-12 flex items-center gap-4 justify-center lg:justify-start">
              <span className="font-serif text-6xl text-[var(--primary)] leading-none">2+</span>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted max-w-[8rem]">
                {t("about.yearsExp")}
              </span>
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="lg:col-span-7 space-y-7"
          >
            <p className="text-lg leading-relaxed text-[var(--foreground)]/90">
              {t("about.intro")}
            </p>

            <blockquote className="border-l-2 border-[var(--primary)] pl-5 py-1">
              <p className="font-serif italic text-xl sm:text-2xl leading-snug text-[var(--foreground)]">
                {t("about.summary")}
              </p>
            </blockquote>

            <p className="text-lg leading-relaxed text-[var(--foreground)]/90">
              {t("about.chess")}{" "}
              <span className="font-medium text-[var(--accent-cyan)]">{t("hero.location")}</span>.
            </p>

            {/* Highlights */}
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 border-t border-[var(--border)] mt-2 pt-6">
              {highlights.map((h) => (
                <li key={h.text} className="flex items-center gap-2.5 text-[var(--foreground)]">
                  <h.icon className="w-4 h-4 text-[var(--accent-cyan)] flex-shrink-0" />
                  <span>{h.text}</span>
                </li>
              ))}
            </ul>

            <p className="text-[var(--foreground)]/80 font-medium">{t("about.looking")}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
