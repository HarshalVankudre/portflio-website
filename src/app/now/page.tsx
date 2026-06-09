import type { Metadata } from "next";
import Link from "next/link";
import Signature from "@/components/ui/Signature";

export const metadata: Metadata = {
  title: "Now",
  description:
    "A snapshot of what Harshal Vankudre is focused on right now — building, learning, reading.",
  alternates: { canonical: "/now" },
};

const sections = [
  {
    label: "Building",
    items: [
      "Rüko GPT — an internal AI assistant for 50+ employees at RÜKO GmbH, from RAG pipeline to the Next.js front-end.",
      "This very site — rebuilt from scratch, by hand, more times than I'd like to admit.",
    ],
  },
  {
    label: "Learning",
    items: [
      "Evaluation for RAG systems — making 'it feels better' into something I can actually measure.",
      "Agentic workflows and tool-use patterns that don't fall apart in production.",
    ],
  },
  {
    label: "Reading",
    items: [
      "Papers on retrieval and long-context models (and far too many GitHub issues).",
      "Improving my German — slowly, stubbornly.",
    ],
  },
  {
    label: "Life",
    items: [
      "Based in Karlsruhe, Germany. Playing chess when I should be sleeping.",
      "Open to new opportunities — if you're building something ambitious, say hi.",
    ],
  },
];

export default function NowPage() {
  return (
    <main className="relative min-h-screen">
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-line pb-4">
          <Link
            href="/"
            className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-dim"
          >
            ← Harshal Vankudre
          </Link>
          <span className="label-mono">/now</span>
        </div>

        {/* Header */}
        <h1 className="fade-up mt-14 font-display text-display-lg text-fg">
          Now<span className="text-accent">.</span>
        </h1>
        <p className="fade-up label-mono mt-5" style={{ animationDelay: "0.1s" }}>
          Updated June 2026 · Karlsruhe, DE
        </p>

        {/* Sections */}
        <div className="mt-14 divide-y divide-line border-y border-line">
          {sections.map((s, i) => (
            <div
              key={s.label}
              className="fade-up grid gap-3 py-8 sm:grid-cols-4 sm:gap-6"
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              <h2 className="label-mono !text-accent sm:pt-1">{s.label}</h2>
              <ul className="space-y-3 sm:col-span-3">
                {s.items.map((item) => (
                  <li
                    key={item.slice(0, 32)}
                    className="leading-relaxed text-fg/90"
                  >
                    {item}
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
          This is a{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw text-fg"
          >
            now page
          </a>{" "}
          — a snapshot of the present, not a résumé. It changes when my life
          does.
        </p>

        <div
          className="fade-up mt-12 text-accent"
          style={{ animationDelay: "0.6s" }}
        >
          <Signature />
        </div>
      </div>
    </main>
  );
}
