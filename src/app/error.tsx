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
      <h1 className="font-display text-display-md text-fg">
        Something went wrong
      </h1>

      <p className="mt-6 max-w-md leading-relaxed text-dim">
        An unexpected error occurred. You can try again or go back to the
        start.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 items-center rounded-full bg-fg px-6 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          Try again
        </button>
        {/* Hard navigation on purpose — client routing may be the thing that broke. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/"
          className="link-draw inline-flex min-h-11 items-center text-sm text-fg"
        >
          Back home
        </a>
      </div>
    </main>
  );
}
