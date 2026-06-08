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
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-[var(--border-strong)] pb-3 font-mono text-[11px] sm:text-xs uppercase text-muted">
          <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
            ← Harshal Vankudre
          </Link>
          <span>/now</span>
        </div>

        {/* Header */}
        <p className="hand-note text-3xl mt-12 -rotate-2 inline-block">
          what I&rsquo;m up to these days —
        </p>
        <h1 className="neo-title mt-1">
          Now
        </h1>
        <p className="font-mono text-[11px] uppercase text-muted-2 mt-4">
          Updated June 2026 · Karlsruhe, DE
        </p>

        {/* Sections */}
        <div className="mt-14 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {sections.map((s) => (
            <div key={s.label} className="grid sm:grid-cols-4 gap-3 sm:gap-6 py-7">
              <h2 className="font-mono text-xs uppercase text-[var(--primary)] sm:pt-1">
                {s.label}
              </h2>
              <ul className="sm:col-span-3 space-y-3">
                {s.items.map((item, i) => (
                  <li key={i} className="text-[var(--foreground)]/90 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-muted text-sm mt-12">
          This is a{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--foreground)]"
          >
            now page
          </a>{" "}
          — a snapshot of the present, not a résumé. It changes when my life does.
        </p>

        <div className="mt-10 text-[var(--primary)]">
          <Signature />
        </div>
      </div>
    </main>
  );
}
