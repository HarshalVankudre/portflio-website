"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  GitBranch,
  FolderGit2,
  Activity,
  Code2,
  ArrowUpRight,
  Flame,
  Rocket,
  Cpu,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

interface GitHubData {
  user: {
    name: string;
    avatarUrl: string;
    bio: string;
    followers: number;
    following: number;
    publicRepos: number;
    totalStars: number;
  };
  languages: { name: string; percentage: number; color: string }[];
  recentActivity: {
    type: string;
    repo: string;
    message: string;
    date: string;
  }[];
  contributionData: {
    totalContributions: number;
    weeks: { days: { contributionCount: number; date: string }[] }[];
  };
  source: "graphql" | "rest";
}

function CountUpNumber({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(startValue + (end - startValue) * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* Ember ramp — heat scale in signal orange */
function heatColor(count: number): string {
  if (count === 0) return "rgba(232, 230, 226, 0.06)";
  if (count <= 2) return "rgba(255, 92, 0, 0.3)";
  if (count <= 5) return "rgba(255, 92, 0, 0.55)";
  if (count <= 8) return "rgba(255, 92, 0, 0.8)";
  return "#ff5c00";
}

const LEGEND_STEPS = [0, 2, 5, 8, 12];

function ContributionGraph({
  weeks,
  totalContributions,
}: {
  weeks: { days: { contributionCount: number; date: string }[] }[];
  totalContributions: number;
}) {
  const displayWeeks = weeks.slice(-26);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      className="overflow-x-auto pb-2"
      role="img"
      aria-label={`Contribution activity graph: ${totalContributions} contributions over the last 26 weeks`}
    >
      <div className="flex min-w-fit gap-[3px]">
        {displayWeeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.days.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className="h-3 w-3 rounded-[1px] sm:h-[14px] sm:w-[14px]"
                style={{ backgroundColor: heatColor(day.contributionCount) }}
                title={`${day.date}: ${day.contributionCount} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function LanguageBar({
  languages,
}: {
  languages: { name: string; percentage: number; color: string }[];
}) {
  return (
    <div className="space-y-4">
      {languages.slice(0, 5).map((lang, index) => (
        <motion.div
          key={lang.name}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.08 }}
          viewport={{ once: true }}
          className="space-y-1.5"
        >
          <div className="flex items-baseline justify-between font-mono text-xs">
            <span className="text-fg">{lang.name}</span>
            <span className="text-dim">{lang.percentage}%</span>
          </div>
          <div className="h-1.5 overflow-hidden bg-line">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${lang.percentage}%` }}
              transition={{ delay: index * 0.08 + 0.2, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="h-full bg-accent"
              style={{ opacity: 1 - index * 0.15 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ActivityFeed({
  activities,
}: {
  activities: { type: string; repo: string; message: string; date: string }[];
}) {
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return `${diffMins}m ago`;
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "PushEvent":
        return <GitBranch size={14} />;
      case "CreateEvent":
        return <FolderGit2 size={14} />;
      default:
        return <Activity size={14} />;
    }
  };

  if (activities.length === 0) {
    return (
      <div className="py-4 text-center font-mono text-sm text-faint">
        Building something new...
      </div>
    );
  }

  return (
    <div className="divide-y divide-line border border-line">
      {activities.slice(0, 4).map((activity, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.08 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 p-3 transition-colors hover:bg-overlay sm:p-4"
        >
          <div className="grid h-8 w-8 shrink-0 place-items-center border border-line-strong text-accent">
            {getEventIcon(activity.type)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-sm font-medium text-fg">
              {activity.repo.split("/")[1]}
            </p>
            <p className="truncate text-sm text-dim">{activity.message}</p>
          </div>
          <span className="tech-label whitespace-nowrap normal-case tracking-[0.1em]">
            {getTimeAgo(activity.date)}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// Calculate derived stats from contribution data
function calculateStats(data: GitHubData) {
  const { weeks } = data.contributionData;

  // Calculate current streak
  let currentStreak = 0;
  const allDays = weeks.flatMap(w => w.days).reverse();
  for (const day of allDays) {
    if (day.contributionCount > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Calculate active days in last 30 days
  const last30Days = allDays.slice(0, 30);
  const activeDays = last30Days.filter(d => d.contributionCount > 0).length;

  // Calculate best day
  const bestDay = allDays.length ? Math.max(...allDays.map(d => d.contributionCount)) : 0;

  // Calculate total commits this month
  const thisMonth = last30Days.reduce((acc, d) => acc + d.contributionCount, 0);

  return {
    currentStreak,
    activeDays,
    bestDay,
    thisMonth,
    totalLanguages: data.languages.length,
  };
}

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/github");
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Failed to load GitHub stats");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const derivedStats = data ? calculateStats(data) : null;

  // Only the GraphQL path returns a real contribution calendar; the REST
  // fallback has none, so contribution-derived UI must be hidden there.
  const hasContributions =
    !!data && data.source === "graphql" && data.contributionData.weeks.length > 0;

  const stats = data && derivedStats
    ? [
        {
          label: "Repositories",
          value: data.user.publicRepos,
          icon: FolderGit2,
          suffix: "",
        },
        {
          label: "Languages",
          value: derivedStats.totalLanguages,
          icon: Code2,
          suffix: "",
        },
        {
          label: "Projects",
          value: 10,
          icon: Rocket,
          suffix: "+",
        },
        {
          label: "Tech Used",
          value: 20,
          icon: Cpu,
          suffix: "+",
        },
      ]
    : [];

  return (
    <section
      ref={sectionRef}
      id="github"
      className="relative py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="06"
          code={hasContributions ? "TELEMETRY — LIVE FEED" : "TELEMETRY"}
          isInView={isInView}
          title={
            <>
              Code in <span className="text-accent">Action</span>
            </>
          }
          subtitle={
            hasContributions
              ? "Real-time coding activity — because talk is cheap, show me the code"
              : undefined
          }
        />

        {loading ? (
          <div
            className="flex items-center justify-center gap-3 py-20 font-mono text-sm uppercase tracking-[0.2em] text-faint"
            role="status"
          >
            <span className="led led-accent" aria-hidden />
            Fetching telemetry
            <span aria-hidden className="cursor-blink inline-block h-3.5 w-2 bg-accent" />
          </div>
        ) : error ? (
          <div className="panel p-6 text-center">
            <p className="font-mono text-sm text-err">{error}</p>
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* Readout tiles */}
            <div className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.08 }}
                  className="bg-night p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <span aria-hidden className="block h-px w-4 bg-accent" />
                    <stat.icon size={15} className="text-faint" aria-hidden />
                  </div>
                  <div className="font-display mt-3 text-4xl font-bold sm:text-5xl">
                    <CountUpNumber end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="tech-label mt-1.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-5">
              {/* Contribution heatmap (only with real GraphQL data) */}
              {hasContributions && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25 }}
                  className="panel p-4 sm:p-6 lg:col-span-3"
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="tech-label flex items-center gap-2">
                      <Activity size={13} aria-hidden />
                      Contribution Activity
                    </span>
                    {derivedStats && derivedStats.currentStreak > 0 && (
                      <span className="flex items-center gap-1.5 border border-accent px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-accent">
                        <Flame size={12} aria-hidden />
                        {derivedStats.currentStreak}d streak
                      </span>
                    )}
                  </div>
                  <ContributionGraph
                    weeks={data.contributionData.weeks}
                    totalContributions={data.contributionData.totalContributions}
                  />
                  <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    <span>Less</span>
                    {LEGEND_STEPS.map((step) => (
                      <span
                        key={step}
                        className="h-3 w-3 rounded-[1px]"
                        style={{ backgroundColor: heatColor(step) }}
                        aria-hidden
                      />
                    ))}
                    <span>More</span>
                  </div>
                </motion.div>
              )}

              {/* Languages */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 }}
                className={`panel p-4 sm:p-6 ${hasContributions ? "lg:col-span-2" : "lg:col-span-5"}`}
              >
                <span className="tech-label mb-5 flex items-center gap-2">
                  <Code2 size={13} aria-hidden />
                  Tech Stack
                </span>
                <LanguageBar languages={data.languages} />
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 }}
              className="panel p-4 sm:p-6"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="tech-label flex items-center gap-2">
                  <GitBranch size={13} aria-hidden />
                  Recent Commits
                </span>
                <a
                  href="https://github.com/HarshalVankudre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.14em] text-dim"
                >
                  View GitHub
                  <ArrowUpRight size={12} aria-hidden />
                </a>
              </div>
              <ActivityFeed activities={data.recentActivity} />
            </motion.div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
