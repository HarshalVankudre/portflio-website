import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center px-gutter text-center">
      <p className="fade-up label-mono">Lost — reel not found</p>

      <h1
        className="fade-up mt-8 font-display text-display-xl text-fg"
        style={{ animationDelay: "0.1s" }}
      >
        404<span className="text-accent">.</span>
      </h1>

      <p
        className="fade-up mt-8 max-w-md leading-relaxed text-dim"
        style={{ animationDelay: "0.2s" }}
      >
        This frame was cut, moved, or never shot. The rest of the picture is
        still playing.
      </p>

      <div
        className="fade-up mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-5"
        style={{ animationDelay: "0.3s" }}
      >
        <Link
          href="/"
          className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-fg"
        >
          ← Back home
        </Link>
        <Link
          href="/#work"
          className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-fg"
        >
          Selected work
        </Link>
      </div>
    </main>
  );
}
