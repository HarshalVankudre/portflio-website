"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Bot, Users, BookOpen, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
      color: "var(--accent-red)",
    },
    {
      title: t("proj.teams.title"),
      description: t("proj.teams.desc"),
      technologies: ["Python", "PostgreSQL", "Azure", "Docker", "Teams API"],
      github: "https://github.com/HarshalVankudre/Teams-BOT",
      live: null,
      icon: Users,
      color: "var(--accent-cyan)",
    },
    {
      title: t("proj.course.title"),
      description: t("proj.course.desc"),
      technologies: ["JavaScript", "React", "Node.js"],
      github: "https://github.com/HarshalVankudre/CourseViewer",
      live: null,
      icon: BookOpen,
      color: "var(--primary)",
    },
  ];

  return (
    <section id="projects" className="relative py-24 sm:py-28 bg-[var(--background-2)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-16"
        >
          <span className="neo-eyebrow mb-5">{t("projects.tag")}</span>
          <h2 className="neo-title mt-4">
            {t("projects.title")}{" "}
            <span className="neo-highlight">{t("projects.titleHighlight")}</span>
          </h2>
          <p className="text-muted mt-4 text-lg max-w-2xl">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
              className="gradient-ring group relative neo-card overflow-hidden flex flex-col"
            >
              {/* Visual header */}
              <div className="relative p-6 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.18] transition-opacity duration-500 group-hover:opacity-30"
                  style={{
                    background: `radial-gradient(120% 120% at 0% 0%, ${project.color}, transparent 60%)`,
                  }}
                />
                <div className="relative flex items-start justify-between mb-4">
                  <div
                    className="grid place-items-center w-12 h-12 rounded-xl border border-[var(--border)]"
                    style={{ background: `${project.color}1f`, color: project.color }}
                  >
                    <project.icon className="w-6 h-6" strokeWidth={2.2} />
                  </div>
                  <span className="font-mono text-xs text-muted-2">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="relative text-xl sm:text-2xl font-bold tracking-tight leading-tight text-[var(--foreground)]">
                  {project.title}
                </h3>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 flex flex-col flex-grow">
                <p className="text-muted leading-relaxed text-sm sm:text-[15px] mb-5 flex-grow">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="neo-tag h-fit">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-2.5 mt-auto pt-4 border-t border-[var(--border)]">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn neo-btn-white text-sm py-2 px-4 flex-1"
                    >
                      <Github size={15} />
                      {t("projects.code")}
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn neo-btn-primary text-sm py-2 px-4 flex-1"
                    >
                      <ExternalLink size={15} />
                      {t("projects.live")}
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Recent on GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight mb-5 sm:mb-6 flex items-center gap-2.5 text-[var(--foreground)]">
            <Github size={20} className="text-muted" />
            {t("projects.recentGithub")}
          </h3>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {recentRepos.map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.4 + index * 0.08 }}
                className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-2)] transition-all group"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm sm:text-base text-[var(--foreground)] group-hover:text-primary transition-colors truncate">
                    {repo.name}
                  </div>
                  <div className="text-muted-2 font-mono text-xs mt-0.5 truncate">
                    {repo.owner} · {repo.language}
                  </div>
                </div>
                <div className="text-right font-mono text-[11px] text-muted-2 ml-2 hidden sm:block shrink-0">
                  {repo.updated}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/HarshalVankudre"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-btn neo-btn-primary inline-flex"
          >
            <Github size={20} />
            {t("projects.viewProfile")}
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
