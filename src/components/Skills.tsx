"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Layout, Database, Brain, Briefcase, Cloud } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Skills() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: t("skills.languages"),
      icon: Code2,
      color: "var(--primary)",
      skills: ["Python", "TypeScript", "JavaScript", "Java", "SQL"],
    },
    {
      title: t("skills.frameworks"),
      icon: Layout,
      color: "var(--accent-cyan)",
      skills: ["Next.js", "React", "FastAPI", "Node.js", "Prisma"],
    },
    {
      title: t("skills.databases"),
      icon: Database,
      color: "var(--accent-lime)",
      skills: ["PostgreSQL", "Pinecone", "MongoDB"],
    },
    {
      title: t("skills.cloud"),
      icon: Cloud,
      color: "var(--accent-red)",
      skills: ["AWS", "Google Cloud", "Azure", "Docker"],
    },
    {
      title: t("skills.ai"),
      icon: Brain,
      color: "var(--accent-purple)",
      skills: ["OpenAI API", "RAG", "LangChain", "Ollama", "Vector DBs"],
    },
    {
      title: t("skills.tools"),
      icon: Briefcase,
      color: "var(--accent-orange)",
      skills: ["Git", "Teams API", "HubSpot", "Microsoft Office"],
    },
  ];

  return (
    <section id="skills" className="relative py-24 neo-stripes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="neo-tag neo-tag-lime mb-4">{t("skills.tag")}</span>
          <h2 className="neo-title mt-4">
            {t("skills.title")} <span className="neo-highlight">{t("skills.titleHighlight")}</span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="neo-card p-0 overflow-hidden"
            >
              {/* Header */}
              <div
                className="p-4 border-b-3 border-black flex items-center gap-3"
                style={{ background: category.color }}
              >
                <category.icon className="w-6 h-6" />
                <h3 className="font-black uppercase">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className="p-4 bg-white">
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: 0.2 + categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                      className="neo-tag hover:bg-[var(--primary)] transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scrolling Skills Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 overflow-hidden neo-border bg-black py-4"
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {[...skillCategories.flatMap((c) => c.skills), ...skillCategories.flatMap((c) => c.skills)].map(
              (skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="mx-4 text-white font-bold uppercase text-lg"
                >
                  {skill} <span className="text-[var(--primary)]">•</span>
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
