"use client";

import type { CaseMediaSection } from "@/lib/caseStudies";
import { useLanguage } from "@/context/LanguageContext";
import ParallaxImage from "@/components/work/ParallaxImage";

/**
 * In-flow case-study visual: "full" breaks out edge-to-edge with a
 * scroll-scrubbed reveal, "duo" is a 2-up grid (stacks on mobile),
 * "figure" is a single captioned panel. Driven entirely by data in
 * caseStudies.ts — swapping real screenshots in later is a src change.
 */
export default function MediaSection({
  section,
}: {
  section: CaseMediaSection;
}) {
  const { language } = useLanguage();

  if (section.layout === "duo") {
    return (
      <div className="grid grid-cols-1 gap-6 px-gutter pb-20 sm:grid-cols-2">
        {section.items.map((item) => (
          <ParallaxImage
            key={item.src}
            src={item.src}
            alt={item.alt[language]}
            reveal="enter"
            className="aspect-[16/10] w-full"
          />
        ))}
      </div>
    );
  }

  if (section.layout === "figure") {
    const item = section.items[0];
    return (
      <figure className="px-gutter pb-20">
        <ParallaxImage
          src={item.src}
          alt={item.alt[language]}
          reveal="enter"
          className="aspect-[16/9] w-full"
        />
        {item.caption && (
          <figcaption className="label-mono mt-4">
            {item.caption[language]}
          </figcaption>
        )}
      </figure>
    );
  }

  // full — edge-to-edge break between chapters
  const item = section.items[0];
  return (
    <div className="pb-20">
      <ParallaxImage
        src={item.src}
        alt={item.alt[language]}
        reveal="scrub"
        frame={false}
        className="aspect-[16/9] w-full"
      />
    </div>
  );
}
