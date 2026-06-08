"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Education() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const focus = ["Statistics", "Machine Learning", "Data Engineering", "Applied AI", "Analytics"];

  return (
    <section ref={ref} id="education" className="record-section">
      <div className="record-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="record-header"
        >
          <div>
            <span className="record-kicker">{t("education.tag")}</span>
            <h2 className="record-title">Academic Record</h2>
          </div>
          <p className="record-dek">{t("education.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
          className="mt-8 border-y border-[var(--foreground)]"
        >
          <div className="case-row">
            <div className="font-mono text-xs text-muted-2">01</div>
            <div>
              <h3 className="text-2xl font-black">Hochschule Karlsruhe</h3>
              <p className="mt-2 font-medium">{t("edu.hka.degree")}</p>
              <p className="mt-3 font-mono text-xs uppercase text-muted">
                Sep 2024 - Present / {t("education.current")}
              </p>
            </div>
            <div>
              <p className="text-[var(--foreground)]/85">
                A data science foundation shaped around statistics, machine learning, data engineering,
                and applied AI.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {focus.map((item) => (
                <span key={item} className="neo-tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
