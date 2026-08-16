import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center px-gutter text-center">
      <h1 className="font-display text-display-md text-fg">
        Page not found
      </h1>

      <p className="mt-6 max-w-md leading-relaxed text-dim">
        This page doesn&apos;t exist or has moved.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
        <Link
          href="/"
          className="link-draw inline-flex min-h-11 items-center text-sm text-fg"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
