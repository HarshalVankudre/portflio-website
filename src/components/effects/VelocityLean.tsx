"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/motion";

interface Props {
  children: ReactNode;
  className?: string;
  /** Max skew in degrees at full scroll velocity. */
  strength?: number;
}

/**
 * Leans its children with scroll velocity — fast scrolling shears the
 * block a couple of degrees, easing back upright as the scroll settles.
 * Transform-only (no layout reads), passthrough under reduced motion.
 */
export default function VelocityLean({
  children,
  className,
  strength = 2,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      const setSkew = gsap.quickSetter(ref.current, "skewY", "deg");
      const clamp = gsap.utils.clamp(-strength, strength);
      const proxy = { skew: 0 };

      ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / 600);
          // Only restart the settle tween when the new impulse is stronger —
          // otherwise every scroll event truncates the ease back to zero.
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => setSkew(proxy.skew),
            });
          }
        },
      });
    },
    { scope: ref, dependencies: [reduced, strength] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
