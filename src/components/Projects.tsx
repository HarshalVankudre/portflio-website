"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Bot, Users, BookOpen, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/SectionHeader";

const recentRepos = [
  {
    name: "portflio-website",
    owner: "HarshalVankudre",
    language: "TypeScript",
    updated: "Jan 02, 2026",
    url: "https://github.com/HarshalVankudre/portflio-website",
  },
  {
    name: "ExpenseTracker",
    owner: "HarshalVankudre777",
    language: "TypeScript",
    updated: "Jun 07, 2024",
    url: "https://github.com/HarshalVankudre777/ExpenseTracker",
  },
  {
    name: "CourseViewer",
    owner: "HarshalVankudre",
    language: "JavaScript",
    updated: "Dec 30, 2025",
    url: "https://github.com/HarshalVankudre/CourseViewer",
  },
  {
    name: "admin",
    owner: "HarshalVankudre",
    language: "TypeScript",
    updated: "Dec 18, 2025",
    url: "https://github.com/HarshalVankudre/admin",
  },
];

export default function Projects() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featuredProjects = [
    {
      title: t("proj.chatbot.title"),
      description: t("proj.chatbot.desc"),
      technologies: ["Python", "FastAPI", "RAG", "OpenAI", "Pinecone", "Docker"],
      github: "https://github.com/HarshalVankudre/Baumachschinen-KI-Chatbot",
      live: null,
      icon: Bot,
    },
    {
      title: t("proj.teams.title"),
      description: t("proj.teams.desc"),
      technologies: ["Python", "PostgreSQL", "Azure", "Docker", "Teams API"],
      github: "https://github.com/HarshalVankudre/Teams-BOT",
      live: null,
      icon: Users,
    },
    {
      title: t("proj.course.title"),
      description: t("proj.course.desc"),
      technologies: ["JavaScript", "React", "Node.js"],
      github: "https://github.com/HarshalVankudre/CourseViewer",
      live: null,
      icon: BookOpen,
    },
  ];

  return (
    <section id="projects" className="relative bg-raised py-24 sm:py-28">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="05"
          code="SELECTED WORK"
          isInView={isInView}
          title={
            <>
              {t("projects.title")}{" "}
              <span className="text-accent">{t("projects.titleHighlight")}</span>
            </>
          }
          subtitle={t("projects.subtitle")}
        />

        {/* Featured file cards */}
        <div className="mb-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="corners group flex flex-col border border-line bg-night"
            >
              {/* File header */}
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="tech-label transition-colors group-hover:text-accent">
                  FILE.0{index + 1}
                </span>
                <project.icon
                  size={16}
                  className="text-faint transition-colors group-hover:text-accent"
                  aria-hidden
                />
              </div>

              {/* Content */}
              <div className="flex flex-grow flex-col p-5 sm:p-6">
                <h3 className="font-display text-2xl font-semibold uppercase leading-tight sm:text-[1.7rem]">
                  {project.title}
                </h3>
                <p className="mt-3 flex-grow text-sm leading-relaxed text-dim">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="chip cursor-default text-[10px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-6 border-t border-line px-5 py-3.5 font-mono text-xs uppercase tracking-[0.14em]">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw inline-flex items-center gap-1.5 text-dim"
                  >
                    <Github size={13} aria-hidden />
                    {t("projects.code")}
                    <ArrowUpRight size={12} aria-hidden />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-draw inline-flex items-center gap-1.5 text-accent"
                  >
                    <span className="led led-ok" aria-hidden />
                    {t("projects.live")}
                    <ArrowUpRight size={12} aria-hidden />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Recent on GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="tech-label whitespace-nowrap">
              INDEX <span className="text-accent">{"//"}</span>{" "}
              {t("projects.recentGithub")}
            </span>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </div>

          <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {recentRepos.map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.45 + index * 0.08 }}
                className="group flex items-center justify-between gap-4 bg-night p-4 transition-colors hover:bg-overlay sm:p-5"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate font-mono text-sm font-medium text-fg transition-colors group-hover:text-accent">
                    {repo.name}
                  </div>
                  <div className="tech-label mt-1.5 truncate normal-case tracking-[0.1em]">
                    {repo.owner} · {repo.language} · {repo.updated}
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden
                />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/HarshalVankudre"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <Github size={15} />
            {t("projects.viewProfile")}
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
