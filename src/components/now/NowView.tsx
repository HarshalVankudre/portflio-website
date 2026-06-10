"use client";

import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Signature from "@/components/ui/Signature";
import type { Localized } from "@/lib/caseStudies";

const SECTIONS: { label: Localized; items: Localized[] }[] = [
  {
    label: { en: "Building", de: "Bauen" },
    items: [
      {
        en: "Rüko GPT — an internal AI assistant for 50+ employees at RÜKO GmbH, from RAG pipeline to the Next.js front-end.",
        de: "Rüko GPT — ein interner KI-Assistent für 50+ Mitarbeitende der RÜKO GmbH, von der RAG-Pipeline bis zum Next.js-Frontend.",
      },
      {
        en: "This very site — rebuilt from scratch, by hand, more times than I'd like to admit.",
        de: "Diese Website — öfter von Grund auf neu gebaut, als ich zugeben möchte.",
      },
    ],
  },
  {
    label: { en: "Learning", de: "Lernen" },
    items: [
      {
        en: "Evaluation for RAG systems — turning 'it feels better' into something I can actually measure.",
        de: "Evaluation für RAG-Systeme — aus 'fühlt sich besser an' etwas machen, das ich wirklich messen kann.",
      },
      {
        en: "Agentic workflows and tool-use patterns that don't fall apart in production.",
        de: "Agentische Workflows und Tool-Use-Patterns, die in der Produktion nicht auseinanderfallen.",
      },
      {
        en: "My German — slowly, stubbornly.",
        de: "Mein Deutsch — langsam, aber stur.",
      },
    ],
  },
  {
    label: { en: "Reading", de: "Lesen" },
    items: [
      {
        en: "Papers on retrieval and long-context models (and far too many GitHub issues).",
        de: "Paper zu Retrieval und Long-Context-Modellen (und viel zu viele GitHub-Issues).",
      },
    ],
  },
  {
    label: { en: "Life", de: "Leben" },
    items: [
      {
        en: "Based in Karlsruhe, Germany. Playing chess when I should be sleeping.",
        de: "Zuhause in Karlsruhe. Schach spielen, wenn ich eigentlich schlafen sollte.",
      },
    ],
  },
];

const FOOT = {
  before: { en: "This is a ", de: "Das ist eine " },
  link: { en: "now page", de: "Now-Seite" },
  after: {
    en: " — a snapshot of the present, not a résumé. It changes when my life does.",
    de: " — eine Momentaufnahme, kein Lebenslauf. Sie ändert sich, wenn sich mein Leben ändert.",
  },
  updated: {
    en: "Updated June 2026 · Karlsruhe, DE",
    de: "Stand Juni 2026 · Karlsruhe, DE",
  },
};

export default function NowView() {
  const { language } = useLanguage();

  return (
    <>
      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="relative min-h-screen outline-none"
      >
        <div className="mx-auto max-w-3xl px-gutter py-14 pt-32 sm:py-20 sm:pt-40">
          {/* Header */}
          <h1 className="fade-up font-display text-display-lg text-fg">
            Now<span className="text-accent">.</span>
          </h1>
          <p
            className="fade-up label-mono mt-5"
            style={{ animationDelay: "0.1s" }}
          >
            {FOOT.updated[language]}
          </p>

          {/* Sections */}
          <div className="mt-14 divide-y divide-line border-y border-line">
            {SECTIONS.map((s, i) => (
              <div
                key={s.label.en}
                className="fade-up grid gap-3 py-8 sm:grid-cols-4 sm:gap-6"
                style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              >
                {/* !important: .label-mono is unlayered CSS and would win otherwise */}
                <h2 className="label-mono !text-accent sm:pt-1">
                  {s.label[language]}
                </h2>
                <ul className="space-y-3 sm:col-span-3">
                  {s.items.map((item) => (
                    <li
                      key={item.en.slice(0, 32)}
                      className="leading-relaxed text-fg/90"
                    >
                      {item[language]}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p
            className="fade-up mt-12 text-sm leading-relaxed text-dim"
            style={{ animationDelay: "0.5s" }}
          >
            {FOOT.before[language]}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw text-fg"
            >
              {FOOT.link[language]}
            </a>
            {FOOT.after[language]}
          </p>

          <div
            className="fade-up mt-12 text-accent"
            style={{ animationDelay: "0.6s" }}
          >
            <Signature />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
