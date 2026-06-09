"use client";

import { useRef, type ElementType, type ReactNode, type Ref } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/motion";

interface Props {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Seconds before the reveal starts once triggered. */
  delay?: number;
  /** ScrollTrigger start position. */
  start?: string;
  /** Per-line stagger in seconds. */
  stagger?: number;
}

/**
 * Masked line reveal — splits text into lines, each sliding up from
 * behind an overflow mask when scrolled into view. The workhorse
 * animation of the whole site. Renders plain text under reduced motion.
 */
export default function RevealText({
  children,
  as = "div",
  className,
  delay = 0,
  start = "top 85%",
  stagger = 0.08,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const split = SplitText.create(ref.current, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 115,
            duration: 1.1,
            ease: "power4.out",
            stagger,
            delay,
            scrollTrigger: {
              trigger: ref.current,
              start,
              once: true,
            },
          }),
      });
      return () => split.revert();
    },
    { scope: ref, dependencies: [reduced] }
  );

  const Tag = as;
  return (
    <Tag ref={ref as Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
