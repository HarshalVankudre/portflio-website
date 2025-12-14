export type GitHubOwner = {
  login: string;
  avatar_url: string;
  html_url: string;
};

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  updated_at: string;
  pushed_at: string;
  owner: GitHubOwner;
};

const GH_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
} as const;

export async function fetchGitHubReposForUser(
  username: string,
): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(
      username,
    )}/repos?per_page=100&sort=updated`,
    {
      headers: token
        ? { ...GH_HEADERS, Authorization: `Bearer ${token}` }
        : GH_HEADERS,
      next: { revalidate: 60 * 60 },
    },
  );

  if (!res.ok) {
    throw new Error(`GitHub API failed for ${username}: ${res.status}`);
  }

  return (await res.json()) as GitHubRepo[];
}

export async function fetchGitHubRepos(usernames: readonly string[]) {
  const results = await Promise.allSettled(
    usernames.map((u) => fetchGitHubReposForUser(u)),
  );

  const all = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
  const unique = new Map<string, GitHubRepo>();

  for (const repo of all) {
    if (repo.fork) continue;
    unique.set(repo.full_name, repo);
  }

  return Array.from(unique.values()).sort((a, b) => {
    const stars = (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0);
    if (stars !== 0) return stars;
    return Date.parse(b.pushed_at) - Date.parse(a.pushed_at);
  });
}
