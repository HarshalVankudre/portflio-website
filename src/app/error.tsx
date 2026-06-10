"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center px-gutter text-center">
      <p className="fade-up label-mono">Error — unexpected</p>

      <h1
        className="fade-up mt-8 font-display text-display-lg text-fg"
        style={{ animationDelay: "0.1s" }}
      >
        Something broke<span className="text-accent">.</span>
      </h1>

      <p
        className="fade-up mt-8 max-w-md leading-relaxed text-dim"
        style={{ animationDelay: "0.2s" }}
      >
        An unexpected error interrupted the scene. Retry the take, or head back
        to the start.
      </p>

      <div
        className="fade-up mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
        style={{ animationDelay: "0.3s" }}
      >
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-12 items-center rounded-full bg-accent px-8 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-ink transition-transform hover:scale-[1.03]"
        >
          Try again
        </button>
        {/* Hard navigation on purpose — client routing may be the thing that broke. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/"
          className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-fg"
        >
          ← Back home
        </a>
      </div>
    </main>
  );
}
