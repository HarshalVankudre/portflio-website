"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Github, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { t } = useLanguage();

  const facts = [
    ["Role", "AI Developer & Software Engineer"],
    ["Current", "RUKO GmbH Baumaschinen"],
    ["Base", t("hero.location")],
    ["Focus", "RAG, chatbots, full-stack apps"],
  ];

  const work = [
    {
      id: "01",
      name: "Ruko GPT",
      type: "Internal AI assistant",
      stack: "Next.js / Prisma / PostgreSQL / OpenAI",
    },
    {
      id: "02",
      name: "Teams-BOT",
      type: "Equipment knowledge bot",
      stack: "Python / Teams API / Multi-agent workflows",
    },
    {
      id: "03",
      name: "CourseViewer",
      type: "Course browsing interface",
      stack: "React / JavaScript / Node.js",
    },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-24 pb-14 sm:pt-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-between border-y border-[var(--foreground)] py-3 font-mono text-[11px] uppercase text-muted"
        >
          <span>Harshal Vankudre</span>
          <span className="hidden sm:inline">Portfolio / 2026</span>
          <span>(AI + software)</span>
        </motion.div>

        <div className="grid border-b border-[var(--foreground)] lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
            className="border-b border-[var(--foreground)] py-10 lg:border-b-0 lg:border-r lg:pr-10"
          >
            <p className="font-mono text-xs uppercase text-[var(--primary)]">
              AI developer / software engineer
            </p>
            <h1 className="mt-5 max-w-4xl font-sans text-[3.45rem] font-black uppercase leading-[0.86] text-[var(--foreground)] sm:text-[6.5rem] lg:text-[7.4rem]">
              Harshal
              <br />
              Vankudre
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--foreground)]/78 sm:text-xl">
              I build internal AI tools, retrieval workflows, and production web
              apps for teams that need software to be practical before it is
              impressive.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="neo-btn neo-btn-primary group">
                {t("hero.viewProjects")}
                <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="/cv.pdf" download="Harshal-Vankudre-CV.pdf" className="neo-btn neo-btn-white">
                <Download size={16} />
                {t("hero.downloadCV")}
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.16 }}
            className="py-10 lg:pl-10"
          >
            <div className="grid grid-cols-[6rem_1fr] gap-5 border-b border-[var(--foreground)] pb-6">
              <div className="profile-mark aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/profile.jpg" alt="Harshal Vankudre GitHub avatar" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="font-mono text-xs uppercase text-muted">Current file</div>
                <h2 className="mt-2 font-sans text-2xl font-bold text-[var(--foreground)]">
                  Building AI systems in Karlsruhe.
                </h2>
                <p className="mt-3 flex items-center gap-2 text-sm text-muted">
                  <MapPin size={15} />
                  {t("hero.location")}
                </p>
              </div>
            </div>

            <dl className="divide-y divide-[var(--border-strong)] border-b border-[var(--foreground)]">
              {facts.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3">
                  <dt className="font-mono text-[11px] uppercase text-muted">{label}</dt>
                  <dd className="text-sm font-medium text-[var(--foreground)]">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="grid grid-cols-2 border-b border-[var(--foreground)]">
              <a
                href="https://github.com/HarshalVankudre"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-r border-[var(--border-strong)] py-3 pr-4 font-mono text-xs uppercase hover:text-[var(--primary)]"
              >
                <Github size={15} />
                GitHub
              </a>
              <a
                href="mailto:harshalvankudre@gmail.com"
                className="flex items-center gap-2 py-3 pl-4 font-mono text-xs uppercase hover:text-[var(--primary)]"
              >
                <Mail size={15} />
                Email
              </a>
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.24 }}
          className="mt-6 border-y border-[var(--foreground)]"
        >
          <div className="grid grid-cols-[4rem_1fr] border-b border-[var(--foreground)] bg-[var(--foreground)] font-mono text-[11px] uppercase text-[var(--surface)] sm:grid-cols-[5rem_1.2fr_1fr_1.4fr]">
            <span className="px-3 py-2">No.</span>
            <span className="px-3 py-2">Selected work</span>
            <span className="hidden px-3 py-2 sm:block">Type</span>
            <span className="hidden px-3 py-2 sm:block">Stack</span>
          </div>
          {work.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[4rem_1fr] border-b border-[var(--border-strong)] last:border-b-0 sm:grid-cols-[5rem_1.2fr_1fr_1.4fr]"
            >
              <div className="px-3 py-4 font-mono text-xs text-muted">{item.id}</div>
              <div className="px-3 py-4">
                <div className="font-semibold text-[var(--foreground)]">{item.name}</div>
                <div className="mt-1 text-sm text-muted sm:hidden">{item.type} / {item.stack}</div>
              </div>
              <div className="hidden px-3 py-4 text-sm text-muted sm:block">{item.type}</div>
              <div className="hidden px-3 py-4 text-sm text-muted sm:block">{item.stack}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase text-muted transition-colors hover:text-[var(--foreground)] md:flex"
      >
        Scroll
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  );
}
