"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const notes = [
    ["Role", "AI Developer & Software Engineer"],
    ["Base", t("hero.location")],
    ["Languages", "German, English, Hindi, Marathi"],
    ["Looking for", "Software engineering, AI tooling, and data-heavy product work"],
  ];

  const principles = [
    "Build tools people can use before adding spectacle.",
    "Make AI systems explainable, searchable, and useful inside daily workflows.",
    "Treat software as an operational system, not just a UI surface.",
  ];

  return (
    <section ref={ref} id="about" className="record-section">
      <div className="record-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="record-header"
        >
          <div>
            <span className="record-kicker">{t("about.tag")}</span>
            <h2 className="record-title">Working Notes</h2>
          </div>
          <p className="record-dek">
            {t("about.intro")} {t("about.looking")}
          </p>
        </motion.div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
            className="border-y border-[var(--foreground)] py-5"
          >
            <div className="grid grid-cols-[6rem_1fr] gap-4 sm:grid-cols-[8rem_1fr] lg:grid-cols-1">
              <div className="profile-mark grid aspect-square place-items-center font-mono text-4xl font-black">
                HV
              </div>
              <div>
                <p className="font-mono text-xs uppercase text-muted">Profile</p>
                <p className="mt-2 text-2xl font-black leading-tight">Harshal Vankudre</p>
                <p className="mt-3 text-sm leading-6 text-muted">{t("about.summary")}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.16, ease: EASE }}
            className="grid gap-8"
          >
            <div className="record-table">
              {notes.map(([label, value]) => (
                <div key={label} className="record-row">
                  <span className="record-label">{label}</span>
                  <span className="record-value">{value}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {principles.map((principle, index) => (
                <div key={principle} className="proof-metric">
                  <strong>0{index + 1}</strong>
                  <span>{principle}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
