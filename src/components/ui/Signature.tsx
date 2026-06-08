"use client";

import { motion } from "framer-motion";

/** Handwritten name with an ink flourish underline that draws itself in. */
export default function Signature({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-block leading-none ${className}`}>
      <span className="font-hand text-4xl sm:text-5xl inline-block -rotate-2">
        Harshal
      </span>
      <svg
        aria-hidden
        className="absolute left-0 -bottom-3 w-[118%]"
        height="20"
        viewBox="0 0 250 20"
        fill="none"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M4 11C46 4 92 17 140 9C182 3 214 12 244 6C236 13 220 16 206 13"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        />
      </svg>
    </span>
  );
}
