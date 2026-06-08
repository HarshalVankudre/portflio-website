"use client";

import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
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

  const projects = [
    {
      title: t("proj.chatbot.title"),
      problem: "Internal support teams need a faster way to query equipment and company knowledge.",
      proof: t("proj.chatbot.desc"),
      outcome: "Production-oriented RAG workflow for real company data.",
      stack: ["Python", "FastAPI", "RAG", "OpenAI", "Pinecone", "Docker"],
      github: "https://github.com/HarshalVankudre/Baumachschinen-KI-Chatbot",
      live: null,
    },
    {
      title: t("proj.teams.title"),
      problem: "Equipment knowledge should be available inside the tools teams already use.",
      proof: t("proj.teams.desc"),
      outcome: "2,395+ construction equipment records exposed through a Teams bot.",
      stack: ["Python", "PostgreSQL", "Azure", "Docker", "Teams API"],
      github: "https://github.com/HarshalVankudre/Teams-BOT",
      live: null,
    },
    {
      title: t("proj.course.title"),
      problem: "Course content needs a clean browsing interface for quick scanning.",
      proof: t("proj.course.desc"),
      outcome: "Full-stack learning project focused on usable content navigation.",
      stack: ["JavaScript", "React", "Node.js"],
      github: "https://github.com/HarshalVankudre/CourseViewer",
      live: null,
    },
  ];

  return (
    <section id="projects" className="record-section">
      <div className="record-shell">
        <div className="record-header">
          <div>
            <span className="record-kicker">{t("projects.tag")}</span>
            <h2 className="record-title">Selected Work</h2>
          </div>
          <p className="record-dek">
            Case notes from AI tooling, internal automation, and practical web interfaces.
          </p>
        </div>

        <div className="mt-8 border-y border-[var(--foreground)]">
          <div className="hidden border-b border-[var(--foreground)] bg-[var(--foreground)] font-mono text-[11px] uppercase text-[var(--background)] md:grid md:grid-cols-[4.5rem_minmax(12rem,0.28fr)_minmax(0,0.44fr)_minmax(13rem,0.28fr)]">
            <span className="px-0 py-2">No.</span>
            <span className="py-2">Project</span>
            <span className="py-2">Evidence</span>
            <span className="py-2">Stack / links</span>
          </div>

          {projects.map((project, index) => (
            <article
              key={project.title}
              className="case-row"
            >
              <div className="font-mono text-xs text-muted-2">0{index + 1}</div>

              <div>
                <h3 className="text-2xl font-black leading-tight text-[var(--foreground)]">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{project.problem}</p>
              </div>

              <div>
                <p className="leading-7 text-[var(--foreground)]/85">{project.proof}</p>
                <p className="mt-3 font-semibold text-[var(--primary)]">{project.outcome}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="neo-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="plain-link inline-flex items-center gap-1.5 font-mono text-xs uppercase"
                  >
                    <Github size={14} />
                    {t("projects.code")}
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="plain-link inline-flex items-center gap-1.5 font-mono text-xs uppercase"
                    >
                      <ExternalLink size={14} />
                      {t("projects.live")}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <div className="mb-4 flex items-end justify-between gap-4 border-b border-[var(--foreground)] pb-3">
            <h3 className="font-mono text-sm uppercase text-[var(--foreground)]">
              {t("projects.recentGithub")}
            </h3>
            <a
              href="https://github.com/HarshalVankudre"
              target="_blank"
              rel="noopener noreferrer"
              className="plain-link inline-flex items-center gap-1.5 font-mono text-xs uppercase"
            >
              {t("projects.viewProfile")}
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="record-table">
            {recentRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="record-row group"
              >
                <span className="record-label">{repo.language}</span>
                <span className="record-value flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-semibold group-hover:text-[var(--primary)]">
                    {repo.owner}/{repo.name}
                  </span>
                  <span className="font-mono text-xs uppercase text-muted">{repo.updated}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
