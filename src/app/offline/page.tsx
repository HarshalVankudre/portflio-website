import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline",
  description: "You appear to be offline.",
  robots: { index: false },
};

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="label-mono">Connection — Lost</p>
      <h1 className="mt-6 font-display text-display-md text-fg">
        You&rsquo;re offline.
      </h1>
      <p className="mt-6 max-w-md text-dim">
        This page isn&rsquo;t cached and the network is out of reach. Everything
        picks up where it left off once you&rsquo;re back online.
      </p>
      {/* Plain anchor so the retry triggers a full reload, not a client transition. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        href="/"
        className="link-draw mt-10 font-mono text-xs uppercase tracking-[0.18em] text-dim"
      >
        Try again
      </a>
    </main>
  );
}
