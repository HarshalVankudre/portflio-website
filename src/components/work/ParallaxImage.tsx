"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Full-bleed image in a clipped window — the inner image drifts
 * vertically as the window crosses the viewport. With `reveal` the
 * window itself opens from an inset clip as it scrolls in ("enter"
 * plays once, "scrub" is tied to scroll). Static under reduced motion.
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
  reveal,
  frame = true,
  fit = "cover",
}: {
  src: string;
  alt: string;
  className?: string;
  reveal?: "enter" | "scrub";
  frame?: boolean;
  fit?: "cover" | "contain";
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !wrapRef.current || !imgRef.current) return;
      gsap.fromTo(
        imgRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // The clip opens on the wrapper only — the inner image keeps its CSS
      // scale untouched (a GSAP scale would compose multiplicatively).
      if (reveal) {
        gsap.fromTo(
          wrapRef.current,
          { clipPath: "inset(12% 8% 12% 8%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: reveal === "scrub" ? "none" : "power3.out",
            duration: 1.2,
            scrollTrigger:
              reveal === "scrub"
                ? {
                    trigger: wrapRef.current,
                    start: "top 95%",
                    end: "top 40%",
                    scrub: true,
                  }
                : {
                    trigger: wrapRef.current,
                    start: "top 85%",
                    once: true,
                  },
          }
        );
      }
    },
    { scope: wrapRef, dependencies: [reveal, fit] }
  );

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden ${
        frame ? "rounded-sm border border-line" : ""
      } ${fit === "contain" ? "bg-[#0c0c0e]" : ""} ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`h-full w-full ${
          fit === "contain"
            ? "scale-[1.04] object-contain"
            : "scale-[1.22] object-cover"
        }`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
