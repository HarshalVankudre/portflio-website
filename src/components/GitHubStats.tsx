"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, Code2, ExternalLink, FolderGit2, GitBranch } from "lucide-react";

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

const EASE = [0.22, 1, 0.36, 1] as const;

function getActivityAge(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  return `${diffMins}m ago`;
}

function calculateStats(data: GitHubData) {
  const allDays = data.contributionData.weeks.flatMap((week) => week.days).reverse();
  const last30Days = allDays.slice(0, 30);

  return {
    activeDays: last30Days.filter((day) => day.contributionCount > 0).length,
    thisMonth: last30Days.reduce((acc, day) => acc + day.contributionCount, 0),
    totalLanguages: data.languages.length,
  };
}

function ContributionGraph({
  weeks,
  totalContributions,
}: {
  weeks: { days: { contributionCount: number; date: string }[] }[];
  totalContributions: number;
}) {
  const getColor = (count: number) => {
    if (count === 0) return "bg-[var(--surface-2)]";
    if (count <= 2) return "bg-green-300";
    if (count <= 5) return "bg-green-400";
    if (count <= 8) return "bg-green-500";
    return "bg-green-600";
  };

  return (
    <div
      className="overflow-x-auto pb-2"
      role="img"
      aria-label={`Contribution activity graph: ${totalContributions} contributions over the last 26 weeks`}
    >
      <div className="flex min-w-fit gap-[3px]">
        {weeks.slice(-26).map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.days.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`h-3 w-3 border border-[var(--border)] ${getColor(day.contributionCount)}`}
                title={`${day.date}: ${day.contributionCount} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

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

  const hasContributions =
    !!data && data.source === "graphql" && data.contributionData.weeks.length > 0;
  const derivedStats = data ? calculateStats(data) : null;

  const stats =
    data && derivedStats
      ? [
          ["Repositories", data.user.publicRepos.toString()],
          ["Languages", derivedStats.totalLanguages.toString()],
          ...(hasContributions
            ? [
                ["This Month", derivedStats.thisMonth.toString()],
                ["Active Days", `${derivedStats.activeDays}/30`],
              ]
            : []),
        ]
      : [];

  return (
    <section ref={ref} id="github" className="record-section">
      <div className="record-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="record-header"
        >
          <div>
            <span className="record-kicker">{hasContributions ? "Live from GitHub" : "From GitHub"}</span>
            <h2 className="record-title">Code Record</h2>
          </div>
          <p className="record-dek">
            Repository activity and language mix from the public GitHub profile.
          </p>
        </motion.div>

        {loading ? (
          <div className="mt-8 border-y border-[var(--foreground)] py-12 font-mono text-sm uppercase text-muted">
            Loading GitHub record...
          </div>
        ) : error ? (
          <div className="mt-8 border-y border-[var(--foreground)] py-12 text-[var(--primary)]">
            {error}
          </div>
        ) : data ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
            className="mt-8 grid gap-8"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(([label, value]) => (
                <div key={label} className="proof-metric">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
              <div className="record-table">
                <div className="record-row">
                  <span className="record-label inline-flex items-center gap-2">
                    <Code2 size={14} />
                    Languages
                  </span>
                  <div className="record-value space-y-3">
                    {data.languages.slice(0, 5).map((language) => (
                      <span key={language.name} className="block">
                        <span className="flex items-center justify-between gap-4">
                          <span className="font-semibold">{language.name}</span>
                          <span className="font-mono text-xs text-muted">{language.percentage}%</span>
                        </span>
                        <span className="mt-1 block h-1 bg-[var(--surface-3)]">
                          <span
                            className="block h-full"
                            style={{ width: `${language.percentage}%`, backgroundColor: language.color }}
                          />
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="record-table">
                {hasContributions && (
                  <div className="record-row">
                    <span className="record-label inline-flex items-center gap-2">
                      <Activity size={14} />
                      Contributions
                    </span>
                    <div className="record-value">
                      <ContributionGraph
                        weeks={data.contributionData.weeks}
                        totalContributions={data.contributionData.totalContributions}
                      />
                    </div>
                  </div>
                )}

                <div className="record-row">
                  <span className="record-label inline-flex items-center gap-2">
                    <GitBranch size={14} />
                    Recent
                  </span>
                  <div className="record-value space-y-3">
                    {data.recentActivity.length === 0 ? (
                      <span className="text-muted">No recent public activity returned.</span>
                    ) : (
                      data.recentActivity.slice(0, 4).map((activity, index) => (
                        <span key={`${activity.repo}-${index}`} className="block">
                          <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                            <span className="font-semibold">{activity.repo.split("/")[1]}</span>
                            <span className="font-mono text-xs uppercase text-muted">
                              {getActivityAge(activity.date)}
                            </span>
                          </span>
                          <span className="block truncate text-sm text-muted">{activity.message}</span>
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/HarshalVankudre"
              target="_blank"
              rel="noopener noreferrer"
              className="plain-link inline-flex w-fit items-center gap-2 font-mono text-xs uppercase"
            >
              <FolderGit2 size={14} />
              View public GitHub
              <ExternalLink size={14} />
            </a>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
