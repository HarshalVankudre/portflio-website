"use client";

import { motion } from "framer-motion";

/** A hand-drawn underline that draws itself in. Place inside a relative parent. */
export default function Scribble({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <svg
      aria-hidden
      className={`absolute left-0 right-0 -bottom-1.5 w-full ${className}`}
      height="12"
      viewBox="0 0 300 12"
      fill="none"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M3 7.5C54 3 110 10.5 150 6.5C190 2.5 250 3.5 297 6"
        stroke="var(--primary)"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeInOut", delay }}
      />
    </svg>
  );
}
