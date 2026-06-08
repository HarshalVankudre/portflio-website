"use client";

import { motion, useScroll, useTransform, useSpring, useInView, useMotionValueEvent, AnimatePresence, type MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Calendar, Briefcase, CheckCircle, Trophy, Rocket, Star, Zap, TrendingUp, Users, Bot } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Story chapters with narrative elements - chronological order (earliest first)
const storyChapters = [
  {
    chapter: "Chapter 1",
    title: "First Steps",
    year: "2021",
    narrative: "Every expert was once a beginner. Teaching to learn.",
    icon: Users,
    color: "var(--accent-red)",
  },
  {
    chapter: "Chapter 2",
    title: "Going Global",
    year: "2022",
    narrative: "From India to Berlin — embracing renewable energy.",
    icon: TrendingUp,
    color: "var(--accent-cyan)",
  },
  {
    chapter: "Chapter 3",
    title: "Energy & Innovation",
    year: "2024",
    narrative: "Where data meets impact — automating the energy sector.",
    icon: Zap,
    color: "var(--primary)",
  },
  {
    chapter: "Chapter 4",
    title: "The AI Revolution",
    year: "2025",
    narrative: "Building the future of enterprise AI, one chatbot at a time.",
    icon: Bot,
    color: "var(--accent-cyan)",
  },
];

// Impact metrics for each role - chronological order
const impactMetrics = [
  { metric: "20+", label: "Students Helped", icon: Star },
  { metric: "60%", label: "Automation Rate", icon: Bot },
  { metric: "35%", label: "Faster Responses", icon: Zap },
  { metric: "50+", label: "Users Served", icon: Users },
];

function ChapterHeader({
  chapter,
  isVisible,
}: {
  chapter: typeof storyChapters[0];
  isVisible: boolean;
}) {
  const Icon = chapter.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-6"
    >
      <div className="flex items-center gap-4 mb-2">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isVisible ? { scale: 1, rotate: 0 } : {}}
          transition={{ type: "spring", damping: 15, delay: 0.2 }}
          className="grid place-items-center w-12 h-12 rounded-xl border border-[var(--border)]"
          style={{ backgroundColor: `${chapter.color}1f`, color: chapter.color }}
        >
          <Icon size={22} />
        </motion.div>
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="font-mono text-xs uppercase tracking-widest text-muted-2"
          >
            {chapter.chapter} · {chapter.year}
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]"
          >
            {chapter.title}
          </motion.h3>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="text-muted italic pl-16 text-sm sm:text-base"
      >
        &ldquo;{chapter.narrative}&rdquo;
      </motion.p>
    </motion.div>
  );
}

function ImpactBadge({
  metric,
  label,
  icon: Icon,
  delay,
  isVisible,
}: {
  metric: string;
  label: string;
  icon: typeof Zap;
  delay: number;
  isVisible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, type: "spring" }}
      className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]"
    >
      <Icon size={16} className="text-primary" />
      <span className="font-display font-black text-lg gradient-text">{metric}</span>
      <span className="font-mono text-[11px] text-muted-2 uppercase tracking-wide">{label}</span>
    </motion.div>
  );
}

function ScrollProgress({
  progress,
  isInSection,
}: {
  progress: MotionValue<number>;
  isInSection: boolean;
}) {
  // Find current chapter based on progress. This is genuinely discrete React
  // state (the active chapter icon/title/dots change), so update it only when
  // the index actually changes rather than on every scroll frame.
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    const index = Math.min(
      Math.floor(clamped * storyChapters.length),
      storyChapters.length - 1
    );
    setCurrentChapterIndex((prev) => (prev === index ? prev : index));
  });

  // Drive the SVG ring and percentage label directly from the MotionValue.
  const strokeDasharray = useTransform(
    progress,
    (v) => `${Math.max(0, Math.min(1, v)) * 176} 176`
  );
  const percentText = useTransform(
    progress,
    (v) => `${Math.round(Math.max(0, Math.min(1, v)) * 100)}%`
  );

  const currentChapter = storyChapters[currentChapterIndex];
  const Icon = currentChapter?.icon || Rocket;

  return (
    <AnimatePresence>
      {isInSection && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 hidden md:block"
        >
          <div className="glass rounded-2xl shadow-[var(--shadow-lg)] p-4 space-y-3">
            {/* Mini Progress Circle */}
            <div className="relative w-16 h-16 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="rgba(26,24,19,0.12)"
                  strokeWidth="5"
                  fill="none"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="url(#progressGradient)"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  style={{ strokeDasharray }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--accent-red)" />
                    <stop offset="50%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--accent-cyan)" />
                  </linearGradient>
                </defs>
              </svg>
              <div
                className="absolute inset-0 flex items-center justify-center rounded-full m-2.5 border border-[var(--border)]"
                style={{ backgroundColor: `${currentChapter?.color}26`, color: currentChapter?.color }}
              >
                <Icon size={20} />
              </div>
            </div>

            {/* Current Chapter */}
            <div className="text-center">
              <div className="font-mono text-[11px] text-muted-2 uppercase tracking-widest">
                {currentChapter?.year}
              </div>
              <div className="text-sm font-semibold leading-tight max-w-[88px] text-[var(--foreground)]">
                {currentChapter?.title}
              </div>
            </div>

            {/* Chapter Dots */}
            <div className="flex justify-center gap-1.5">
              {storyChapters.map((chapter, index) => {
                const isReached = index <= currentChapterIndex;
                return (
                  <motion.div
                    key={chapter.year}
                    className="w-2 h-2 rounded-full transition-colors"
                    style={{ backgroundColor: isReached ? chapter.color : "rgba(26,24,19,0.16)" }}
                    animate={index === currentChapterIndex ? { scale: [1, 1.4, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                );
              })}
            </div>

            {/* Percentage */}
            <div className="text-center">
              <motion.span className="font-display text-lg font-black gradient-text">{percentText}</motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TimelineConnector({ progress }: { progress: MotionValue<number> }) {
  // Map the timeline MotionValue straight to a CSS height string so the line
  // animates without copying the value into React state every scroll frame.
  const height = useTransform(
    progress,
    (v) => `${Math.max(0, Math.min(1, v)) * 100}%`
  );

  return (
    <div className="absolute left-6 sm:left-8 top-0 h-full w-px hidden md:block">
      {/* Background line */}
      <div className="absolute inset-0 bg-[var(--border)]" />
      {/* Animated gradient line - red (2021) to cyan (2025) */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-red via-primary to-cyan shadow-[0_0_12px_var(--glow)]"
        style={{ height }}
      />
    </div>
  );
}

function ExperienceCard({
  exp,
  chapter,
  impactMetric,
}: {
  exp: {
    company: string;
    role: string;
    location: string;
    period: string;
    current: boolean;
    color: string;
    highlights: string[];
    technologies: string[];
  };
  chapter: typeof storyChapters[0];
  impactMetric: typeof impactMetrics[0];
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative md:pl-16 lg:pl-20 mb-16"
    >
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.2, type: "spring" }}
        className="absolute left-[1.15rem] sm:left-[1.65rem] top-1 w-4 h-4 rounded-full ring-4 ring-[var(--background)] hidden md:flex items-center justify-center z-10"
        style={{ background: exp.color, boxShadow: `0 0 14px ${exp.color}` }}
      >
        {exp.current && (
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 rounded-full"
            style={{ background: exp.color }}
          />
        )}
      </motion.div>

      {/* Chapter Header */}
      <ChapterHeader chapter={chapter} isVisible={isInView} />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="neo-card p-0 overflow-hidden"
      >
        {/* Header with Company Info */}
        <div className="p-5 sm:p-6 border-b border-[var(--border)] relative overflow-hidden">
          {/* Color tint wash */}
          <div
            className="absolute inset-0 opacity-[0.13]"
            style={{ background: `radial-gradient(120% 140% at 0% 0%, ${exp.color}, transparent 55%)` }}
          />
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{ background: exp.color }}
          />

          <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <motion.h4
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 }}
                  className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]"
                >
                  {exp.company}
                </motion.h4>
                {exp.current && (
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="neo-tag neo-tag-primary text-xs"
                  >
                    NOW
                  </motion.span>
                )}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 font-bold"
              >
                <Briefcase size={16} />
                <span>{exp.role}</span>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="sm:text-right"
            >
              <div className="flex items-center gap-2 font-bold">
                <Calendar size={16} />
                <span>{exp.period}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-gray-700 text-sm">
                <MapPin size={14} />
                <span>{exp.location}</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 bg-[var(--surface)]">
          {/* Impact Metric */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <ImpactBadge
              metric={impactMetric.metric}
              label={impactMetric.label}
              icon={impactMetric.icon}
              delay={0.7}
              isVisible={isInView}
            />
          </motion.div>

          {/* Highlights */}
          <ul className="space-y-3 mb-6">
            {exp.highlights.map((highlight, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                </motion.div>
                <span className="text-gray-700">{highlight}</span>
              </motion.li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                className="neo-tag cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.05 }}
                whileHover={{ scale: 1.05, backgroundColor: "var(--primary)" }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
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

  // The "Story Complete" badge toggles on a discrete threshold, so derive a
  // boolean from the MotionValue instead of mirroring the whole value into
  // state on every scroll frame.
  const [isComplete, setIsComplete] = useState(false);

  useMotionValueEvent(timelineProgress, "change", (v) => {
    const complete = v > 0.85;
    setIsComplete((prev) => (prev === complete ? prev : complete));
  });

  // Experiences in chronological order - earliest first for storytelling
  const experiences = [
    {
      company: "Bhumi NGO",
      role: t("exp.bhumi.role"),
      location: "India",
      period: "Jun 2021 - Sep 2021",
      current: false,
      color: "var(--accent-red)",
      highlights: [
        t("exp.bhumi.h1"),
        t("exp.bhumi.h2"),
        t("exp.bhumi.h3"),
      ],
      technologies: ["Teaching", "Mathematics", "Community Service"],
    },
    {
      company: "Enpal GmbH",
      role: t("exp.enpal.role"),
      location: "Berlin, Germany",
      period: "Sep 2022 - Sep 2023",
      current: false,
      color: "var(--accent-cyan)",
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
      color: "var(--primary)",
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
      color: "var(--accent-cyan)",
      highlights: [
        t("exp.ruko.h1"),
        t("exp.ruko.h2"),
        t("exp.ruko.h3"),
        t("exp.ruko.h4"),
        t("exp.ruko.h5"),
      ],
      technologies: ["Python", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI API", "NextAuth.js"],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-16 sm:py-24 neo-grid-bg overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 flex flex-col items-center"
        >
          <span className="neo-eyebrow mb-5">{t("experience.tag")}</span>
          <h2 className="neo-title">
            The <span className="neo-highlight">Story</span> So Far
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted">
            From teaching math in India to building AI in Germany — every chapter shaped who I am today.
          </p>
        </motion.div>

        {/* Floating Scroll Progress - Shows when in section */}
        <ScrollProgress progress={timelineProgress} isInSection={isSectionInView} />

        {/* Timeline */}
        <div className="relative">
          <TimelineConnector progress={timelineProgress} />

          {/* Experience Cards */}
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.company}
              exp={exp}
              chapter={storyChapters[index]}
              impactMetric={impactMetrics[index]}
            />
          ))}

          {/* Story Complete */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isComplete ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", damping: 15 }}
            className="text-center py-8"
          >
            <motion.div className="gradient-ring inline-flex items-center gap-4 px-6 py-4 rounded-2xl glass shadow-[var(--shadow-lg)]">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-600)] text-white">
                <Trophy size={22} />
              </span>
              <div className="text-left">
                <span className="font-display font-bold text-lg block text-[var(--foreground)]">To be continued…</span>
                <span className="text-sm text-muted">The next chapter is being written</span>
              </div>
              <Rocket size={22} className="text-[var(--accent-cyan)]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
