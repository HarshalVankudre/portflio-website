"use client";

import ScrambleLabel from "@/components/ui/ScrambleLabel";
import RegMark from "@/components/ui/RegMark";

/**
 * Chapter header shared by the home sections: scrambled mono index label
 * left, optional meta right, hairline rule underneath with a volt
 * registration cross at each end. Keeps every chapter opening identical —
 * the sections themselves carry the variety.
 */
export default function SectionHeader({
  label,
  meta,
  className = "",
}: {
  /** Full label text, e.g. `01 — Selected Work` (already localized). */
  label: string;
  /** Right-aligned decoration, e.g. a row count. Hidden from AT. */
  meta?: string;
  className?: string;
}) {
  return (
    <div className={`relative mb-14 border-b border-line pb-5 ${className}`}>
      <div className="flex items-baseline justify-between">
        <h2 className="label-mono">
          <ScrambleLabel>{label}</ScrambleLabel>
        </h2>
        {meta ? (
          <span className="label-mono" aria-hidden>
            {meta}
          </span>
        ) : null}
      </div>
      <RegMark className="-bottom-[5px] left-0" />
      <RegMark className="-bottom-[5px] right-0" />
    </div>
  );
}
