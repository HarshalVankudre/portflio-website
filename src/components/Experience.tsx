"use client";

import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MapPin, Calendar, Briefcase, CheckCircle, Sparkles, Trophy, Rocket, Star, Zap, TrendingUp, Users, Bot } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Story chapters with narrative elements - chronological order (earliest first)
const storyChapters = [
  {
    chapter: "Chapter 1",
    title: "First Steps",
    year: "2021",
    narrative: "Every expert was once a beginner. Teaching to learn.",
    icon: Users,
    color: "var(--accent-lime)",
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
    color: "var(--accent-purple)",
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
          className="w-12 h-12 flex items-center justify-center border-4 border-black"
          style={{ backgroundColor: chapter.color }}
        >
          <Icon size={24} />
        </motion.div>
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-xs font-black uppercase tracking-widest text-gray-500"
          >
            {chapter.chapter} • {chapter.year}
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl font-black uppercase"
          >
            {chapter.title}
          </motion.h3>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 0.7 } : {}}
        transition={{ delay: 0.5 }}
        className="text-gray-600 italic pl-16 text-sm sm:text-base"
      >
        "{chapter.narrative}"
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
      className="flex items-center gap-2 px-3 py-2 bg-white border-2 border-black neo-shadow"
    >
      <Icon size={16} className="text-gray-600" />
      <span className="font-black">{metric}</span>
      <span className="text-xs text-gray-500 uppercase">{label}</span>
    </motion.div>
  );
}

function ScrollProgress({ progress, isInSection }: { progress: number; isInSection: boolean }) {
  // Find current chapter based on progress
  const currentChapterIndex = Math.min(
    Math.floor(progress * storyChapters.length),
    storyChapters.length - 1
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
          <div className="bg-white/95 backdrop-blur-sm border-4 border-black neo-shadow p-3 space-y-3">
            {/* Mini Progress Circle */}
            <div className="relative w-16 h-16 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#e5e5e5"
                  strokeWidth="6"
                  fill="none"
                />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="url(#progressGradient)"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="square"
                  initial={{ strokeDasharray: "0 176" }}
                  animate={{ strokeDasharray: `${progress * 176} 176` }}
                  transition={{ duration: 0.3 }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--accent-lime)" />
                    <stop offset="50%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--accent-purple)" />
                  </linearGradient>
                </defs>
              </svg>
              <div
                className="absolute inset-0 flex items-center justify-center border-2 border-black m-2"
                style={{ backgroundColor: currentChapter?.color }}
              >
                <Icon size={20} />
              </div>
            </div>

            {/* Current Chapter */}
            <div className="text-center">
              <div className="text-xs font-black text-gray-500 uppercase">
                {currentChapter?.year}
              </div>
              <div className="text-sm font-black leading-tight max-w-[80px]">
                {currentChapter?.title}
              </div>
            </div>

            {/* Chapter Dots */}
            <div className="flex justify-center gap-1.5">
              {storyChapters.map((chapter, index) => {
                const chapterProgress = index / (storyChapters.length - 1);
                const isReached = progress >= chapterProgress;
                return (
                  <motion.div
                    key={chapter.year}
                    className={`w-2.5 h-2.5 border-2 border-black transition-colors ${
                      isReached ? "" : "bg-gray-200"
                    }`}
                    style={{ backgroundColor: isReached ? chapter.color : undefined }}
                    animate={index === currentChapterIndex ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                );
              })}
            </div>

            {/* Percentage */}
            <div className="text-center">
              <span className="text-lg font-black">{Math.round(progress * 100)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TimelineConnector({ progress }: { progress: number }) {
  return (
    <div className="absolute left-6 sm:left-8 top-0 h-full w-1 hidden md:block">
      {/* Background line */}
      <div className="absolute inset-0 bg-gray-200" />
      {/* Animated gradient line - lime (2021) to purple (2025) */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-gradient-to-b from-accent-lime via-accent-cyan via-primary to-accent-purple"
        style={{ height: `${progress * 100}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

function ExperienceCard({
  exp,
  chapter,
  index,
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
  index: number;
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
        className="absolute left-4 sm:left-6 top-0 w-5 h-5 sm:w-6 sm:h-6 border-4 border-black hidden md:flex items-center justify-center z-10"
        style={{ background: exp.color }}
      >
        {exp.current && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 bg-black rounded-full"
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
        <div
          className="p-4 sm:p-6 border-b-4 border-black relative overflow-hidden"
          style={{ background: exp.color }}
        >
          {/* Animated pattern */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, black 0px, black 2px, transparent 2px, transparent 12px)`,
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <motion.h4
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 }}
                  className="text-xl sm:text-2xl font-black uppercase"
                >
                  {exp.company}
                </motion.h4>
                {exp.current && (
                  <motion.span
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="neo-tag neo-tag-lime text-xs"
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
        <div className="p-4 sm:p-6 bg-white">
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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = timelineProgress.on("change", (v) => {
      setProgress(Math.max(0, Math.min(1, v)));
    });
    return () => unsubscribe();
  }, [timelineProgress]);

  // Experiences in chronological order - earliest first for storytelling
  const experiences = [
    {
      company: "Bhumi NGO",
      role: t("exp.bhumi.role"),
      location: "India",
      period: "Jun 2021 - Sep 2021",
      current: false,
      color: "var(--accent-lime)",
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
      color: "var(--accent-purple)",
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
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 neo-tag neo-tag-cyan mb-4">
            <Sparkles size={16} />
            <span>{t("experience.tag")}</span>
          </div>
          <h2 className="neo-title">
            The <span className="neo-highlight">Story</span> So Far
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600">
            From teaching math in India to building AI in Germany — every chapter shaped who I am today.
          </p>
        </motion.div>

        {/* Floating Scroll Progress - Shows when in section */}
        <ScrollProgress progress={progress} isInSection={isSectionInView} />

        {/* Timeline */}
        <div className="relative">
          <TimelineConnector progress={progress} />

          {/* Experience Cards */}
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.company}
              exp={exp}
              chapter={storyChapters[index]}
              index={index}
              impactMetric={impactMetrics[index]}
            />
          ))}

          {/* Story Complete */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={progress > 0.85 ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", damping: 15 }}
            className="text-center py-8"
          >
            <motion.div
              animate={progress > 0.85 ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
              className="inline-flex items-center gap-3 px-6 py-4 bg-primary border-4 border-black neo-shadow-lg"
            >
              <Trophy size={28} />
              <div className="text-left">
                <span className="font-black text-lg uppercase block">To be continued...</span>
                <span className="text-sm font-medium">The next chapter is being written</span>
              </div>
              <Rocket size={28} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
