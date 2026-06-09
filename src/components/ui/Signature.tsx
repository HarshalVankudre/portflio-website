"use client";

/** Name with an ink flourish underline that draws itself in (CSS-only). */
export default function Signature({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-block leading-none ${className}`}>
      <span className="inline-block -rotate-2 font-display text-4xl italic sm:text-5xl">
        Harshal
      </span>
      <svg
        aria-hidden
        className="absolute -bottom-3 left-0 w-[118%]"
        height="20"
        viewBox="0 0 250 20"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          className="signature-stroke"
          d="M4 11C46 4 92 17 140 9C182 3 214 12 244 6C236 13 220 16 206 13"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
