import { NextResponse } from "next/server";

export const revalidate = 3600; // cross-instance ISR caching (1 hour)

const GITHUB_USERNAME = "HarshalVankudre";
const CACHE_DURATION = 3600; // 1 hour in seconds
const DEFAULT_LANG_COLOR = "#858585";

// In-memory cache
let cachedData: GitHubData | null = null;
let cacheTimestamp = 0;

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

// GitHub REST event shape (subset we rely on)
interface GitHubEvent {
  type: string;
  repo: { name: string };
  payload: { commits?: { message: string }[]; ref?: string; ref_type?: string };
  created_at: string;
}

// GitHub REST repo shape (subset)
interface GitHubRestRepo {
  language?: string | null;
  stargazers_count: number;
}

// GitHub REST user shape (subset)
interface GitHubRestUser {
  name?: string | null;
  avatar_url: string;
  bio?: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

// GitHub GraphQL response shape (subset)
interface GitHubGraphQLResponse {
  data?: {
    user?: {
      name: string | null;
      avatarUrl: string;
      bio: string | null;
      followers: { totalCount: number };
      following: { totalCount: number };
      repositories: {
        totalCount: number;
        nodes: {
          name: string;
          stargazerCount: number;
          languages: {
            edges: { size: number; node: { name: string; color: string | null } }[];
          };
        }[];
      };
      contributionsCollection: {
        totalCommitContributions: number;
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: { contributionCount: number; date: string }[] }[];
        };
      };
    } | null;
  };
  errors?: unknown;
}

// Map GitHub REST events into the recentActivity shape (handles all 4 event types)
function mapEventsToActivity(events: GitHubEvent[]): GitHubData["recentActivity"] {
  return events
    .filter((event) =>
      ["PushEvent", "CreateEvent", "PullRequestEvent", "IssuesEvent"].includes(event.type)
    )
    .slice(0, 5)
    .map((event) => {
      let message = "";
      switch (event.type) {
        case "PushEvent":
          message = event.payload.commits?.[0]?.message || "Pushed commits";
          break;
        case "CreateEvent":
          message = `Created ${event.payload.ref_type} ${event.payload.ref || ""}`;
          break;
        case "PullRequestEvent":
          message = "Pull request activity";
          break;
        case "IssuesEvent":
          message = "Issue activity";
          break;
        default:
          message = event.type;
      }
      return {
        type: event.type,
        repo: event.repo.name,
        message: message.slice(0, 50) + (message.length > 50 ? "..." : ""),
        date: event.created_at,
      };
    });
}

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

const query = `
query($username: String!) {
  user(login: $username) {
    name
    avatarUrl
    bio
    followers {
      totalCount
    }
    following {
      totalCount
    }
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
      totalCount
      nodes {
        name
        stargazerCount
        languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
          edges {
            size
            node {
              name
              color
            }
          }
        }
      }
    }
    contributionsCollection {
      totalCommitContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
          }
        }
      }
    }
  }
}
`;

async function fetchGitHubData(): Promise<GitHubData> {
  const token = process.env.GITHUB_TOKEN;

  // If no token, use REST API fallback
  if (!token) {
    return fetchGitHubDataREST();
  }

  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { username: GITHUB_USERNAME },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = (await response.json()) as GitHubGraphQLResponse;

  if (data.errors) {
    console.error("GraphQL errors:", data.errors);
    return fetchGitHubDataREST();
  }

  const user = data?.data?.user;

  if (!user) {
    console.error("GraphQL response missing user");
    return fetchGitHubDataREST();
  }

  // Calculate total stars
  const totalStars = user.repositories.nodes.reduce(
    (acc, repo) => acc + repo.stargazerCount,
    0
  );

  // Calculate language percentages
  const languageTotals: Record<string, { size: number; color: string }> = {};
  let totalSize = 0;

  for (const repo of user.repositories.nodes) {
    for (const edge of repo.languages.edges) {
      const name = edge.node.name;
      const size = edge.size;
      const color = edge.node.color || DEFAULT_LANG_COLOR;

      if (!languageTotals[name]) {
        languageTotals[name] = { size: 0, color };
      }
      languageTotals[name].size += size;
      totalSize += size;
    }
  }

  const languages = Object.entries(languageTotals)
    .map(([name, { size, color }]) => ({
      name,
      percentage: Math.round((size / totalSize) * 100),
      color,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 6);

  return {
    user: {
      name: user.name || GITHUB_USERNAME,
      avatarUrl: user.avatarUrl,
      bio: user.bio || "",
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      publicRepos: user.repositories.totalCount,
      totalStars,
    },
    languages,
    recentActivity: [], // Will be fetched from REST API
    contributionData: {
      totalContributions: user.contributionsCollection.contributionCalendar.totalContributions,
      weeks: user.contributionsCollection.contributionCalendar.weeks.map((week) => ({
        days: week.contributionDays.map((day) => ({
          contributionCount: day.contributionCount,
          date: day.date,
        })),
      })),
    },
    source: "graphql",
  };
}

async function fetchGitHubDataREST(): Promise<GitHubData> {
  // Fetch user data
  const userResponse = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}`,
    { next: { revalidate: CACHE_DURATION } }
  );

  if (!userResponse.ok) {
    throw new Error(`GitHub API error: ${userResponse.status}`);
  }

  const userData = (await userResponse.json()) as GitHubRestUser;

  // Fetch repos for stars and languages
  const reposResponse = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    { next: { revalidate: CACHE_DURATION } }
  );

  const reposJson = reposResponse.ok ? await reposResponse.json() : [];
  const repos: GitHubRestRepo[] = Array.isArray(reposJson) ? reposJson : [];

  // Calculate total stars
  const totalStars = repos.reduce(
    (acc, repo) => acc + repo.stargazers_count,
    0
  );

  // Get languages from repos
  const languageCounts: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  }

  const totalReposWithLang = Object.values(languageCounts).reduce((a, b) => a + b, 0);

  const languageColors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Go: "#00ADD8",
    Rust: "#dea584",
    C: "#555555",
    "C++": "#f34b7d",
    Shell: "#89e051",
    Ruby: "#701516",
  };

  const languages = Object.entries(languageCounts)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / totalReposWithLang) * 100),
      color: languageColors[name] || DEFAULT_LANG_COLOR,
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 6);

  // Fetch recent events
  const eventsResponse = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`,
    { next: { revalidate: CACHE_DURATION } }
  );

  const eventsJson = eventsResponse.ok ? await eventsResponse.json() : [];
  const events: GitHubEvent[] = Array.isArray(eventsJson) ? eventsJson : [];

  const recentActivity = mapEventsToActivity(events);

  // The REST API does not expose the contribution calendar, so we do not
  // fabricate one — only the GraphQL path returns real contribution data.
  return {
    user: {
      name: userData.name || GITHUB_USERNAME,
      avatarUrl: userData.avatar_url,
      bio: userData.bio || "",
      followers: userData.followers,
      following: userData.following,
      publicRepos: userData.public_repos,
      totalStars,
    },
    languages,
    recentActivity,
    contributionData: {
      totalContributions: 0,
      weeks: [],
    },
    source: "rest",
  };
}

export async function GET() {
  try {
    const now = Date.now();

    // Return cached data if valid
    if (cachedData && now - cacheTimestamp < CACHE_DURATION * 1000) {
      return NextResponse.json(cachedData);
    }

    const data = await fetchGitHubData();

    // Also fetch recent activity via REST if using GraphQL
    if (process.env.GITHUB_TOKEN) {
      const eventsResponse = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=10`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          },
        }
      );

      if (eventsResponse.ok) {
        const eventsJson = await eventsResponse.json();
        const events: GitHubEvent[] = Array.isArray(eventsJson) ? eventsJson : [];
        data.recentActivity = mapEventsToActivity(events);
      }
    }

    // Update cache
    cachedData = data;
    cacheTimestamp = now;

    return NextResponse.json(data);
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
