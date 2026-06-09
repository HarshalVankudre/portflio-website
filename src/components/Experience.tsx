"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValueEvent,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import { Users, TrendingUp, Zap, Bot } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/SectionHeader";

// Log chapters — chronological order (earliest first)
const storyChapters = [
  {
    title: "First Steps",
    year: "2021",
    narrative: "Every expert was once a beginner. Teaching to learn.",
    icon: Users,
  },
  {
    title: "Going Global",
    year: "2022",
    narrative: "From India to Berlin — embracing renewable energy.",
    icon: TrendingUp,
  },
  {
    title: "Energy & Innovation",
    year: "2024",
    narrative: "Where data meets impact — automating the energy sector.",
    icon: Zap,
  },
  {
    title: "The AI Revolution",
    year: "2025",
    narrative: "Building the future of enterprise AI, one chatbot at a time.",
    icon: Bot,
  },
];

// Impact readout for each role — chronological order
const impactMetrics = [
  { metric: "20+", label: "Students Helped" },
  { metric: "60%", label: "Automation Rate" },
  { metric: "35%", label: "Faster Responses" },
  { metric: "50+", label: "Users Served" },
];

/* Slim fixed progress rail (xl+) — replaces the old floating chapter widget */
function ScrollRail({
  progress,
  isInSection,
}: {
  progress: MotionValue<number>;
  isInSection: boolean;
}) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    const index = Math.min(
      Math.floor(clamped * storyChapters.length),
      storyChapters.length - 1
    );
    setCurrentChapterIndex((prev) => (prev === index ? prev : index));
  });

  const fillHeight = useTransform(
    progress,
    (v) => `${Math.max(0, Math.min(1, v)) * 100}%`
  );

  const chapter = storyChapters[currentChapterIndex];

  return (
    <AnimatePresence>
      {isInSection && (
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3 }}
          className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex"
        >
          <span className="tech-label" style={{ writingMode: "vertical-rl" }}>
            LOG
          </span>
          <span className="relative block h-36 w-px bg-line-strong">
            <motion.span
              className="absolute left-0 top-0 block w-px bg-accent"
              style={{ height: fillHeight }}
            />
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
            {chapter?.year}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ExperienceCard({
  exp,
  chapter,
  impactMetric,
  index,
}: {
  exp: {
    company: string;
    role: string;
    location: string;
    period: string;
    current: boolean;
    highlights: string[];
    technologies: string[];
  };
  chapter: (typeof storyChapters)[0];
  impactMetric: (typeof impactMetrics)[0];
  index: number;
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const Icon = chapter.icon;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative pb-14 last:pb-0 md:pl-14 lg:pl-16"
    >
      {/* Timeline node */}
      <span
        aria-hidden
        className={`absolute left-2 top-1.5 hidden h-2.5 w-2.5 -translate-x-1/2 rotate-45 border md:block ${
          exp.current
            ? "led-accent border-accent bg-accent"
            : "border-line-strong bg-night"
        }`}
      />

      {/* Revision header */}
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.22em]">
          <span className="text-accent">REV.0{index + 1}</span>
          <span className="text-faint">{chapter.year}</span>
          <span aria-hidden className="hidden h-px w-10 bg-line-strong sm:block" />
          <span className="flex items-center gap-1.5 text-faint">
            <Icon size={12} aria-hidden />
            {chapter.title}
          </span>
        </div>
        <p className="mt-2 font-mono text-xs italic text-faint">
          <span className="text-accent" aria-hidden>
            {"// "}
          </span>
          {chapter.narrative}
        </p>
      </div>

      {/* Entry panel */}
      <div className="panel corners">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3 border-b border-line px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <h3 className="font-display text-2xl font-semibold uppercase leading-none sm:text-3xl">
              {exp.company}
            </h3>
            {exp.current && (
              <span className="chip border-accent px-2 py-1 text-[10px] text-accent">
                NOW
              </span>
            )}
          </div>
          <div className="font-mono text-xs leading-relaxed text-dim">
            <span className="text-fg">{exp.role}</span>
            <span className="mx-2 text-faint" aria-hidden>
              ·
            </span>
            {exp.period}
            <span className="mx-2 text-faint" aria-hidden>
              ·
            </span>
            {exp.location}
          </div>
        </div>

        <div className="px-5 py-5 sm:px-6">
          {/* Impact readout */}
          <div className="inline-flex items-center gap-2.5 border border-line-strong px-3 py-1.5 font-mono text-xs">
            <span className="text-accent" aria-hidden>
              Δ
            </span>
            <span className="font-semibold text-fg">{impactMetric.metric}</span>
            <span className="uppercase tracking-[0.12em] text-faint">
              {impactMetric.label}
            </span>
          </div>

          {/* Highlights */}
          <ul className="mt-5 space-y-2.5">
            {exp.highlights.map((highlight, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.07 }}
              >
                <span
                  aria-hidden
                  className="mt-2.5 h-px w-3 shrink-0 bg-accent"
                />
                <span className="text-sm leading-relaxed text-dim sm:text-base">
                  {highlight}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
            {exp.technologies.map((tech) => (
              <span key={tech} className="chip cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Experience() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isSectionInView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const timelineProgress = useTransform(smoothProgress, [0.15, 0.85], [0, 1]);

  // The end-of-log line toggles on a discrete threshold, so derive a boolean
  // from the MotionValue instead of mirroring it into state per scroll frame.
  const [isComplete, setIsComplete] = useState(false);

  useMotionValueEvent(timelineProgress, "change", (v) => {
    const complete = v > 0.85;
    setIsComplete((prev) => (prev === complete ? prev : complete));
  });

  const fillHeight = useTransform(
    timelineProgress,
    (v) => `${Math.max(0, Math.min(1, v)) * 100}%`
  );

  // Experiences in chronological order — earliest first
  const experiences = [
    {
      company: "Bhumi NGO",
      role: t("exp.bhumi.role"),
      location: "India",
      period: "Jun 2021 - Sep 2021",
      current: false,
      highlights: [t("exp.bhumi.h1"), t("exp.bhumi.h2"), t("exp.bhumi.h3")],
      technologies: ["Teaching", "Mathematics", "Community Service"],
    },
    {
      company: "Enpal GmbH",
      role: t("exp.enpal.role"),
      location: "Berlin, Germany",
      period: "Sep 2022 - Sep 2023",
      current: false,
      highlights: [
        t("exp.enpal.h1"),
        t("exp.enpal.h2"),
        t("exp.enpal.h3"),
        t("exp.enpal.h4"),
      ],
      technologies: ["Financial Analysis", "Data Analytics", "Solar Tech"],
    },
    {
      company: "EnBW GmbH",
      role: t("exp.enbw.role"),
      location: t("hero.location"),
      period: "Sep 2024 - Feb 2025",
      current: false,
      highlights: [
        t("exp.enbw.h1"),
        t("exp.enbw.h2"),
        t("exp.enbw.h3"),
        t("exp.enbw.h4"),
        t("exp.enbw.h5"),
        t("exp.enbw.h6"),
      ],
      technologies: ["HubSpot", "Excel", "Data Analysis", "GPT Integration"],
    },
    {
      company: "RÜKO GmbH Baumaschinen",
      role: t("exp.ruko.role"),
      location: t("hero.location"),
      period: "Oct 2025 - Present",
      current: true,
      highlights: [
        t("exp.ruko.h1"),
        t("exp.ruko.h2"),
        t("exp.ruko.h3"),
        t("exp.ruko.h4"),
        t("exp.ruko.h5"),
      ],
      technologies: [
        "Python",
        "Next.js",
        "TypeScript",
        "Prisma",
        "PostgreSQL",
        "OpenAI API",
        "NextAuth.js",
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="blueprint relative overflow-hidden py-24 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div ref={headerRef}>
          <SectionHeader
            index="03"
            code="OPERATIONS LOG"
            isInView={isHeaderInView}
            title={
              <>
                {t("experience.title")}{" "}
                <span className="text-accent">{t("experience.titleHighlight")}</span>
              </>
            }
            subtitle={t("experience.subtitle")}
          />
        </div>

        {/* Fixed progress rail */}
        <ScrollRail progress={timelineProgress} isInSection={isSectionInView} />

        {/* Timeline */}
        <div className="relative">
          {/* Track + animated fill */}
          <div
            aria-hidden
            className="absolute left-2 top-0 hidden h-full w-px bg-line md:block"
          >
            <motion.div
              className="absolute left-0 top-0 w-px bg-accent"
              style={{ height: fillHeight }}
            />
          </div>

          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.company}
              exp={exp}
              chapter={storyChapters[index]}
              impactMetric={impactMetrics[index]}
              index={index}
            />
          ))}

          {/* End of log */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isComplete ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="pt-10 md:pl-14 lg:pl-16"
          >
            <p className="font-mono text-sm text-faint">
              <span className="text-accent" aria-hidden>
                {"// "}
              </span>
              END OF LOG — NEXT ENTRY IN PROGRESS
              <span
                aria-hidden
                className="cursor-blink ml-1.5 inline-block h-3.5 w-2 bg-accent align-middle"
              />
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
