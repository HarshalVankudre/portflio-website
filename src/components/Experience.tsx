"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Briefcase, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Experience() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      company: "RÜKO GmbH Baumaschinen",
      role: t("exp.ruko.role"),
      location: t("hero.location"),
      period: "Oct 2025 - Present",
      current: true,
      color: "var(--accent-purple)",
      highlights: [
        t("exp.ruko.h1"),
        t("exp.ruko.h2"),
        t("exp.ruko.h3"),
        t("exp.ruko.h4"),
        t("exp.ruko.h5"),
      ],
      technologies: ["Python", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI API", "NextAuth.js"],
    },
    {
      company: "EnBW GmbH",
      role: t("exp.enbw.role"),
      location: t("hero.location"),
      period: "Sep 2024 - Feb 2025",
      current: false,
      color: "var(--primary)",
      highlights: [
        t("exp.enbw.h1"),
        t("exp.enbw.h2"),
        t("exp.enbw.h3"),
        t("exp.enbw.h4"),
        t("exp.enbw.h5"),
        t("exp.enbw.h6"),
      ],
      technologies: ["HubSpot", "Excel", "Data Analysis", "GPT Integration"],
    },
    {
      company: "Enpal GmbH",
      role: t("exp.enpal.role"),
      location: "Berlin, Germany",
      period: "Sep 2022 - Sep 2023",
      current: false,
      color: "var(--accent-cyan)",
      highlights: [
        t("exp.enpal.h1"),
        t("exp.enpal.h2"),
        t("exp.enpal.h3"),
        t("exp.enpal.h4"),
      ],
      technologies: ["Financial Analysis", "Data Analytics", "Solar Tech"],
    },
    {
      company: "Bhumi NGO",
      role: t("exp.bhumi.role"),
      location: "India",
      period: "Jun 2021 - Sep 2021",
      current: false,
      color: "var(--accent-lime)",
      highlights: [
        t("exp.bhumi.h1"),
        t("exp.bhumi.h2"),
        t("exp.bhumi.h3"),
      ],
      technologies: ["Teaching", "Mathematics", "Community Service"],
    },
  ];

  return (
    <section id="experience" className="relative py-24 neo-grid-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="neo-tag neo-tag-cyan mb-4">{t("experience.tag")}</span>
          <h2 className="neo-title mt-4">
            {t("experience.title")} <span className="neo-highlight">{t("experience.titleHighlight")}</span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            {t("experience.subtitle")}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-black hidden md:block" />

          {/* Experience Items */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative md:pl-20"
              >
                {/* Timeline Dot */}
                <div 
                  className="absolute left-6 top-0 w-5 h-5 border-4 border-black hidden md:block"
                  style={{ background: exp.color }}
                />

                {/* Card */}
                <div className="neo-card p-0 overflow-hidden">
                  {/* Header */}
                  <div 
                    className="p-6 border-b-3 border-black"
                    style={{ background: exp.color }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-black uppercase">{exp.company}</h3>
                          {exp.current && (
                            <span className="neo-tag neo-tag-lime text-xs py-1">{t("experience.current")}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 font-bold">
                          <Briefcase size={16} />
                          <span>{exp.role}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 font-bold">
                          <Calendar size={16} />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-gray-700">
                          <MapPin size={14} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-white">
                    {/* Highlights */}
                    <ul className="space-y-2 mb-6">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="neo-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
