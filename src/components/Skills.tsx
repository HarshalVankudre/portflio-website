"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Layout, Database, Brain, Briefcase, Cloud } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/SectionHeader";

export default function Skills() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: t("skills.languages"),
      icon: Code2,
      skills: ["Python", "TypeScript", "JavaScript", "Java", "SQL"],
    },
    {
      title: t("skills.frameworks"),
      icon: Layout,
      skills: ["Next.js", "React", "FastAPI", "Node.js", "Prisma"],
    },
    {
      title: t("skills.databases"),
      icon: Database,
      skills: ["PostgreSQL", "Pinecone", "MongoDB"],
    },
    {
      title: t("skills.cloud"),
      icon: Cloud,
      skills: ["AWS", "Google Cloud", "Azure", "Docker"],
    },
    {
      title: t("skills.ai"),
      icon: Brain,
      skills: ["OpenAI API", "RAG", "LangChain", "Ollama", "Vector DBs"],
    },
    {
      title: t("skills.tools"),
      icon: Briefcase,
      skills: ["Git", "Teams API", "HubSpot", "Microsoft Office"],
    },
  ];

  const allSkills = skillCategories.flatMap((c) => c.skills);

  return (
    <section id="skills" className="relative py-24 sm:py-28">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="02"
          code="CAPABILITIES"
          isInView={isInView}
          title={
            <>
              {t("skills.title")}{" "}
              <span className="text-accent">{t("skills.titleHighlight")}</span>
            </>
          }
          subtitle={t("skills.subtitle")}
        />

        {/* Module grid */}
        <div className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.08 }}
              className="group bg-night p-5 transition-colors hover:bg-raised sm:p-6"
            >
              {/* Module header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="tech-label transition-colors group-hover:text-accent">
                    M.0{categoryIndex + 1}
                  </span>
                  <h3 className="font-display mt-1.5 text-xl font-semibold uppercase tracking-wide sm:text-2xl">
                    {category.title}
                  </h3>
                </div>
                <category.icon
                  size={18}
                  className="mt-1 shrink-0 text-faint transition-colors group-hover:text-accent"
                  aria-hidden
                />
              </div>

              <span
                aria-hidden
                className="mt-4 block h-px w-8 bg-line-strong transition-all duration-300 group-hover:w-full group-hover:bg-accent/40"
              />

              {/* Skills */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: 0.2 + categoryIndex * 0.08 + skillIndex * 0.04,
                    }}
                    className="chip cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Telemetry ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative mt-14 overflow-hidden border-y border-line bg-raised py-3.5"
        >
          {/* Edge fades */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-night to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-night to-transparent"
          />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...allSkills, ...allSkills].map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="mx-5 font-mono text-sm uppercase tracking-[0.18em] text-dim"
              >
                {skill} <span className="ml-5 text-accent">{"//"}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
