"use client";

import { ArrowUpRight, Download, Github, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  const facts = [
    ["Role", "AI Developer & Software Engineer"],
    ["Current", "RÜKO GmbH Baumaschinen"],
    ["Base", t("hero.location")],
    ["Focus", "RAG, chatbots, full-stack apps"],
  ];

  return (
    <section id="home" className="relative pt-24 pb-12 sm:pt-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between border-y border-[var(--foreground)] py-3 font-mono text-[11px] uppercase text-muted">
          <span>Harshal Vankudre</span>
          <span className="hidden sm:inline">Portfolio / 2026</span>
          <span className="hidden sm:inline">(AI + software)</span>
        </div>

        <div className="grid border-b border-[var(--foreground)] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="border-b border-[var(--foreground)] py-10 lg:border-b-0 lg:border-r lg:pr-10">
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
          </div>

          <aside className="hidden py-10 sm:block lg:pl-10">
            <div className="hidden grid-cols-[6rem_1fr] gap-5 border-b border-[var(--foreground)] pb-6 md:grid">
              <div className="profile-mark grid aspect-square place-items-center font-mono text-3xl font-black">
                HV
              </div>
              <div>
                <div className="font-mono text-xs uppercase text-muted">Profile record</div>
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
          </aside>
        </div>
      </div>
    </section>
  );
}
