"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
      color: "var(--primary)",
      highlights: [
        t("edu.hka.h1"),
        t("edu.hka.h2"),
      ],
    },
    {
      institution: "HTWG Konstanz",
      degree: t("edu.htwg.degree"),
      period: "Sep 2021 - Sep 2022",
      current: false,
      color: "var(--accent-cyan)",
      highlights: [
        t("edu.htwg.h1"),
      ],
    },
  ];

  return (
    <section id="education" className="relative py-24 neo-grid-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="neo-tag neo-tag-purple text-white mb-4">{t("education.tag")}</span>
          <h2 className="neo-title mt-4">
            {t("education.title")} <span className="neo-highlight">{t("education.titleHighlight")}</span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            {t("education.subtitle")}
          </p>
        </motion.div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="neo-card p-0 overflow-hidden"
            >
              {/* Header */}
              <div
                className="p-6 border-b-3 border-black relative"
                style={{ background: edu.color }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-black flex items-center justify-center flex-shrink-0">
                    {edu.current ? (
                      <GraduationCap className="w-8 h-8 text-white" />
                    ) : (
                      <BookOpen className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm">{edu.period}</span>
                      {edu.current && (
                        <span className="neo-tag neo-tag-lime text-xs py-0.5">
                          {t("education.current")}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-black uppercase">{edu.degree}</h3>
                    <p className="font-bold">{edu.institution}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 bg-white">
                <ul className="space-y-3">
                  {edu.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
