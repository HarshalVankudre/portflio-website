"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Skills() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const skillRows = [
    {
      category: t("skills.ai"),
      use: "Retrieval workflows, internal assistants, agent experiments, and LLM integration.",
      skills: ["OpenAI API", "RAG", "LangChain", "Ollama", "Vector DBs", "Prompt Engineering"],
    },
    {
      category: t("skills.frameworks"),
      use: "Production interfaces, APIs, authentication flows, and data-backed web apps.",
      skills: ["Next.js", "React", "FastAPI", "Node.js", "Prisma", "Tailwind CSS"],
    },
    {
      category: t("skills.languages"),
      use: "Backend logic, typed frontends, scripting, data work, and application glue.",
      skills: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "HTML/CSS"],
    },
    {
      category: t("skills.databases"),
      use: "Relational app data, document stores, vector retrieval, and analytics foundations.",
      skills: ["PostgreSQL", "MongoDB", "Pinecone", "Vector Databases"],
    },
    {
      category: t("skills.cloud"),
      use: "Shipping and operating apps across managed platforms and containerized services.",
      skills: ["AWS", "Google Cloud", "Azure", "Docker", "Vercel"],
    },
    {
      category: t("skills.tools"),
      use: "Developer workflow, stakeholder reporting, CRM work, and productivity systems.",
      skills: ["Git", "VS Code", "Jira", "HubSpot", "Microsoft Excel", "Teams API"],
    },
  ];

  return (
    <section ref={ref} id="skills" className="record-section bg-[var(--background-2)]">
      <div className="record-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="record-header"
        >
          <div>
            <span className="record-kicker">{t("skills.tag")}</span>
            <h2 className="record-title">Stack Matrix</h2>
          </div>
          <p className="record-dek">
            The tools are grouped by how they are used, not by resume keyword density.
          </p>
        </motion.div>

        <div className="mt-8 border-y border-[var(--foreground)]">
          {skillRows.map((row, index) => (
            <motion.div
              key={row.category}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.06, ease: EASE }}
              className="case-row md:grid-cols-[4.5rem_minmax(12rem,0.24fr)_minmax(0,0.42fr)_minmax(13rem,0.34fr)]"
            >
              <div className="font-mono text-xs text-muted-2">0{index + 1}</div>
              <h3 className="text-xl font-black text-[var(--foreground)]">{row.category}</h3>
              <p className="text-[var(--foreground)]/82">{row.use}</p>
              <div className="flex flex-wrap gap-2">
                {row.skills.map((skill) => (
                  <span key={skill} className="neo-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
