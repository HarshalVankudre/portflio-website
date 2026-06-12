"use client";

import { useRef, type ElementType, type Ref } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/motion";

interface Props {
  /** Plain string only — the scramble rewrites text content. */
  children: string;
  as?: ElementType;
  className?: string;
}

/**
 * Mono-label texture: the text scrambles into place once when scrolled
 * into view. The final string is server-rendered (SEO and no-JS read it
 * verbatim) and `tweenLength` keeps the width constant, so layout never
 * jumps. Renders static under reduced motion.
 */
export default function ScrambleLabel({
  children,
  as = "span",
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.to(ref.current, {
        duration: 0.7,
        scrambleText: {
          text: children,
          chars: "ABCDEFGHIKLNORSTUX0123456789—·",
          speed: 0.4,
          tweenLength: false,
        },
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
    },
    // children: the EN↔DE toggle swaps the string — re-arm on the new text.
    { scope: ref, dependencies: [reduced, children] }
  );

  const Tag = as;
  return (
    <Tag ref={ref as Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
