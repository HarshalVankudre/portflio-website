"use client";

import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import RevealText from "@/components/ui/RevealText";
import TransitionLink from "@/components/ui/TransitionLink";
import Magnetic from "@/components/ui/Magnetic";
import Timeline from "@/components/about/Timeline";
import SkillGroups from "@/components/about/SkillGroups";

const LANGS = [
  { name: { en: "German", de: "Deutsch" }, level: { en: "Fluent", de: "Fließend" } },
  { name: { en: "English", de: "Englisch" }, level: { en: "Fluent", de: "Fließend" } },
  { name: { en: "Hindi", de: "Hindi" }, level: { en: "Native", de: "Muttersprache" } },
  { name: { en: "Marathi", de: "Marathi" }, level: { en: "Native", de: "Muttersprache" } },
];

export default function AboutView() {
  const { t, language } = useLanguage();

  return (
    <>
      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="relative min-h-screen outline-none"
      >
      {/* Page hero */}
      <section className="px-gutter pb-24 pt-36 sm:pt-44">
        <p className="label-mono mb-8">{t("aboutPage.label")}</p>
        <RevealText
          key={`statement-${language}`}
          as="h1"
          className="max-w-5xl font-display text-display-md text-fg [text-wrap:balance]"
        >
          {t("aboutPage.statement")}
        </RevealText>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="max-w-2xl space-y-6 text-base leading-relaxed text-dim sm:text-lg">
            <p>{t("about.summary")}</p>
            <p>
              {t("about.chess")} {t("hero.location")}.
            </p>
            <p>{t("about.looking")}</p>
          </div>
          <dl className="space-y-5 self-start border-l border-line pl-6">
            <div>
              <dt className="label-mono">{t("home.role")}</dt>
              <dd className="mt-1 font-mono text-sm text-fg">
                {t("home.company")}
              </dd>
            </div>
            <div>
              <dt className="label-mono">{t("education.tag")}</dt>
              <dd className="mt-1 font-mono text-sm text-fg">
                {t("edu.hka.degree")} — HKA
              </dd>
            </div>
            <div>
              <dt className="label-mono">{t("contact.location")}</dt>
              <dd className="mt-1 font-mono text-sm text-fg">
                {t("hero.location")}
              </dd>
            </div>
            <div>
              <dt className="label-mono">CV</dt>
              <dd className="mt-1">
                <a
                  href="/cv.pdf"
                  download
                  className="link-draw font-mono text-sm text-fg"
                >
                  {t("contact.downloadCv")} ↓
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Experience */}
      <section className="border-t border-line px-gutter py-section">
        <h2 className="label-mono mb-16">
          01 — {t("aboutPage.experienceLabel")}
        </h2>
        <Timeline />
      </section>

      {/* Skills */}
      <section className="border-t border-line px-gutter py-section">
        <h2 className="label-mono mb-12">02 — {t("aboutPage.skillsLabel")}</h2>
        <SkillGroups />
      </section>

      {/* Education + spoken languages */}
      <section className="grid grid-cols-1 gap-16 border-t border-line px-gutter py-section lg:grid-cols-2">
        <div>
          <h2 className="label-mono mb-10">
            03 — {t("aboutPage.educationLabel")}
          </h2>
          <h3 className="font-display text-display-sm text-fg">
            {t("edu.hka.degree")}
          </h3>
          <p className="label-mono mt-3">
            Hochschule Karlsruhe · 2024 — · {t("education.current")}
          </p>
          <ul className="mt-6 max-w-xl space-y-2.5 text-sm leading-relaxed text-dim sm:text-base">
            <li>{t("edu.hka.h1")}</li>
            <li>{t("edu.hka.h2")}</li>
          </ul>
        </div>
        <div>
          <h2 className="label-mono mb-10">
            04 — {t("aboutPage.languagesLabel")}
          </h2>
          <dl className="divide-y divide-line border-y border-line">
            {LANGS.map((l) => (
              <div
                key={l.name.en}
                className="flex items-baseline justify-between py-4"
              >
                <dt className="text-base text-fg">{l.name[language]}</dt>
                <dd className="font-mono text-xs uppercase tracking-[0.18em] text-dim">
                  {l.level[language]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA banner */}
      <section className="border-t border-line px-gutter py-section text-center">
        <Magnetic strength={0.15}>
          <TransitionLink
            href="/#contact"
            className="link-giant font-display text-display-md italic text-fg"
          >
            {t("aboutPage.cta")} ↗
          </TransitionLink>
        </Magnetic>
      </section>
      </main>

      <Footer />
      <ChatBot />
    </>
  );
}
