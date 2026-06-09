"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Shared engineered section header:
 *
 *   SYS.02 ───────────────────────────── CAPABILITIES
 *   BIG DISPLAY TITLE                              02   ← giant outlined numeral
 *   optional subtitle
 */
export default function SectionHeader({
  index,
  code,
  title,
  subtitle,
  align = "left",
  isInView = true,
}: {
  index: string;
  code: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  isInView?: boolean;
}) {
  const centered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative mb-14 sm:mb-16 ${centered ? "text-center" : ""}`}
    >
      {/* Giant outlined index in the background */}
      <span
        aria-hidden
        className="outline-text font-display absolute -top-8 right-0 select-none text-[7rem] font-bold leading-none sm:-top-12 sm:text-[10rem]"
      >
        {index}
      </span>

      {/* Mono meta row */}
      <div
        className={`relative flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="text-accent">SYS.{index}</span>
        {!centered && <span className="h-px max-w-40 flex-1 bg-line-strong" aria-hidden />}
        <span className="text-faint">{code}</span>
      </div>

      {/* Display title */}
      <h2
        className="font-display relative mt-4 font-bold uppercase leading-[0.95]"
        style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
      >
        {title}
      </h2>

      {subtitle && (
        <p className={`relative mt-4 max-w-2xl text-base text-dim sm:text-lg ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
