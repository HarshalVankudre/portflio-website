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
    <section id="projects" className="relative py-24 bg-[var(--foreground)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="neo-tag neo-tag-primary mb-4">{t("projects.tag")}</span>
          <h2 className="neo-title mt-4 text-white">
            {t("projects.title")} <span className="bg-[var(--primary)] text-black px-2">{t("projects.titleHighlight")}</span>
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
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
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white text-black border-4 border-black shadow-[6px_6px_0_#FFE500] hover:shadow-[8px_8px_0_#FFE500] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col"
            >
              {/* Header */}
              <div 
                className="p-4 border-b-4 border-black flex items-center gap-3"
                style={{ background: project.color }}
              >
                <project.icon className="w-6 h-6" />
                <h3 className="text-xl font-black uppercase">{project.title}</h3>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-700 leading-relaxed min-h-[80px]">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 my-4 min-h-[60px] content-start">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="neo-tag text-xs h-fit">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn neo-btn-white text-sm py-2 px-4"
                    >
                      <Github size={16} />
                      {t("projects.code")}
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn neo-btn-primary text-sm py-2 px-4"
                    >
                      <ExternalLink size={16} />
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
          <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
            <Github size={28} />
            {t("projects.recentGithub")}
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {recentRepos.map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/5 border-2 border-white/20 hover:border-[var(--primary)] hover:bg-white/10 transition-all group"
              >
                <div>
                  <div className="font-bold text-lg group-hover:text-[var(--primary)] transition-colors">
                    {repo.name}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {repo.owner} • {repo.language}
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>Updated {repo.updated}</div>
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
