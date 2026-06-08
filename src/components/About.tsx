"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Lightbulb, Code, Target, Users } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { text: t("about.softwareDev"), icon: Code },
    { text: t("about.dataAnalysis"), icon: Target },
    { text: t("about.languages"), icon: Users },
    { text: t("about.problemSolving"), icon: Lightbulb },
  ];

  return (
    <section id="about" className="relative py-24 neo-stripes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="neo-eyebrow mb-5">{t("about.tag")}</span>
          <h2 className="neo-title mt-4">
            {t("about.title")}{" "}
            <span className="neo-highlight">{t("about.titleHighlight")}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="neo-card p-6">
              <p className="text-lg leading-relaxed">
                {t("about.intro")}
              </p>
            </div>

            <blockquote className="border-l-2 border-[var(--primary)] pl-5 py-1">
              <p className="font-serif italic text-xl sm:text-2xl leading-snug text-[var(--foreground)]">
                {t("about.summary")}
              </p>
            </blockquote>

            <div className="neo-card p-6">
              <p className="text-lg leading-relaxed">
                {t("about.chess")}{" "}
                <span className="font-medium text-[var(--accent-cyan)]">{t("hero.location")}</span>.
              </p>
            </div>

            <p className="text-gray-700 font-medium">
              {t("about.looking")}
            </p>
          </motion.div>

          {/* Right - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.text}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="neo-card p-4 flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded bg-[var(--accent-cyan)] flex items-center justify-center flex-shrink-0">
                  <highlight.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-base sm:text-lg text-[var(--foreground)]">{highlight.text}</span>
                <CheckCircle2 className="w-5 h-5 ml-auto text-[var(--accent-cyan)]" />
              </motion.div>
            ))}

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="neo-card p-6 text-center"
            >
              <div className="font-serif text-5xl sm:text-6xl text-[var(--primary)] mb-1">2+</div>
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{t("about.yearsExp")}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
