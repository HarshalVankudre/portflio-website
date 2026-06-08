"use client";

import { motion, useInView } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const experiences = [
    {
      company: "RUKO GmbH Baumaschinen",
      role: t("exp.ruko.role"),
      location: t("hero.location"),
      period: "Oct 2025 - Present",
      status: t("experience.current"),
      proof: "Internal AI assistant for company data, authentication, and knowledge workflows.",
      impact: "Enterprise AI tools for 50+ employees",
      highlights: [t("exp.ruko.h1"), t("exp.ruko.h2"), t("exp.ruko.h3"), t("exp.ruko.h5")],
      stack: ["Python", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI API"],
    },
    {
      company: "EnBW GmbH",
      role: t("exp.enbw.role"),
      location: t("hero.location"),
      period: "Sep 2024 - Feb 2025",
      status: "Working student",
      proof: "Operations support, reporting, process improvement, and GPT-based automation pilot.",
      impact: "~35% faster response time, ~60% tier-1 automation",
      highlights: [t("exp.enbw.h1"), t("exp.enbw.h2"), t("exp.enbw.h5"), t("exp.enbw.h6")],
      stack: ["HubSpot", "Excel", "Data Analysis", "GPT Integration"],
    },
    {
      company: "Enpal GmbH",
      role: t("exp.enpal.role"),
      location: "Berlin, Germany",
      period: "Sep 2022 - Sep 2023",
      status: "Working student",
      proof: "Customer data coordination, financial analysis, and solar configuration support.",
      impact: "Supported quoting and project analysis for solar installations",
      highlights: [t("exp.enpal.h1"), t("exp.enpal.h2"), t("exp.enpal.h3"), t("exp.enpal.h4")],
      stack: ["Financial Analysis", "Data Analytics", "Solar Tech"],
    },
    {
      company: "Bhumi NGO",
      role: t("exp.bhumi.role"),
      location: "India",
      period: "Jun 2021 - Sep 2021",
      status: "Volunteer",
      proof: "Mathematics tutoring with a focus on practical problem solving.",
      impact: "Helped 20+ students improve core math skills",
      highlights: [t("exp.bhumi.h1"), t("exp.bhumi.h2"), t("exp.bhumi.h3")],
      stack: ["Teaching", "Mathematics", "Community Service"],
    },
  ];

  return (
    <section ref={ref} id="experience" className="record-section bg-[var(--background-2)]">
      <div className="record-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="record-header"
        >
          <div>
            <span className="record-kicker">{t("experience.tag")}</span>
            <h2 className="record-title">Work Ledger</h2>
          </div>
          <p className="record-dek">
            A concise read of the roles, systems, and measurable outcomes behind the portfolio.
          </p>
        </motion.div>

        <div className="mt-8 border-y border-[var(--foreground)]">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.07, ease: EASE }}
              className="case-row"
            >
              <div className="font-mono text-xs text-muted-2">0{index + 1}</div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-black leading-tight text-[var(--foreground)]">
                    {exp.company}
                  </h3>
                  <span className="neo-tag">{exp.status}</span>
                </div>
                <p className="mt-2 font-medium text-[var(--foreground)]">{exp.role}</p>
                <div className="mt-3 space-y-1 font-mono text-[11px] uppercase text-muted">
                  <p className="flex items-center gap-2">
                    <Calendar size={13} />
                    {exp.period}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={13} />
                    {exp.location}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[var(--foreground)]/85">{exp.proof}</p>
                <p className="mt-3 font-semibold text-[var(--primary)]">{exp.impact}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {exp.highlights.slice(0, 3).map((item) => (
                    <li key={item} className="border-l border-[var(--border-strong)] pl-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {exp.stack.map((tech) => (
                  <span key={tech} className="neo-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
