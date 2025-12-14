"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink, GitFork, Search, Star, X } from "lucide-react";

import type { GitHubRepo } from "@/lib/github";
import { ui, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function formatDate(iso: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

function RepoStats({
  repo,
  updatedLabel,
}: {
  repo: GitHubRepo;
  updatedLabel: string;
}) {
  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <Star className="h-3.5 w-3.5" /> {repo.stargazers_count ?? 0}
      </span>
      <span className="inline-flex items-center gap-1">
        <GitFork className="h-3.5 w-3.5" /> {repo.forks_count ?? 0}
      </span>
      {repo.language ? <span>{repo.language}</span> : null}
      <span>
        {updatedLabel} {formatDate(repo.updated_at)}
      </span>
    </div>
  );
}

export function GitHubProjectsBrowser({
  repos,
  locale,
}: {
  repos: GitHubRepo[];
  locale: Locale;
}) {
  const t = ui[locale].githubBrowser;
  const [query, setQuery] = React.useState("");
  const [owner, setOwner] = React.useState<string>("all");
  const [language, setLanguage] = React.useState<string>("all");
  const [sort, setSort] = React.useState<"updated" | "stars" | "name">(
    "updated",
  );
  const [hideArchived, setHideArchived] = React.useState(true);
  const [onlyWithDescription, setOnlyWithDescription] = React.useState(false);
  const [selected, setSelected] = React.useState<GitHubRepo | null>(null);

  const owners = React.useMemo(() => {
    return Array.from(new Set(repos.map((r) => r.owner.login))).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [repos]);

  const languages = React.useMemo(() => {
    return Array.from(new Set(repos.map((r) => r.language).filter(Boolean))) as string[];
  }, [repos]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = repos.filter((r) => {
      if (owner !== "all" && r.owner.login !== owner) return false;
      if (language !== "all" && (r.language ?? "") !== language) return false;
      if (hideArchived && r.archived) return false;
      if (onlyWithDescription && !r.description) return false;
      if (!q) return true;
      const haystack =
        `${r.name} ${r.full_name} ${r.description ?? ""} ${(r.topics ?? []).join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });

    return [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "stars") {
        return (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0);
      }
      return Date.parse(b.pushed_at) - Date.parse(a.pushed_at);
    });
  }, [hideArchived, language, onlyWithDescription, owner, query, repos, sort]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="pl-9"
          />
        </div>

        <select
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className={cn(
            "h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <option value="all">{t.allOwners}</option>
          {owners.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className={cn(
            "h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <option value="all">{t.allLanguages}</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className={cn(
            "h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <option value="updated">{t.sortUpdated}</option>
          <option value="stars">{t.sortStars}</option>
          <option value="name">{t.sortName}</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={hideArchived}
            onChange={(e) => setHideArchived(e.target.checked)}
            className="h-4 w-4 rounded border-border bg-background"
          />
          {t.hideArchived}
        </label>
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={onlyWithDescription}
            onChange={(e) => setOnlyWithDescription(e.target.checked)}
            className="h-4 w-4 rounded border-border bg-background"
          />
          {t.onlyWithDescription}
        </label>
        {query ||
        owner !== "all" ||
        language !== "all" ||
        !hideArchived ||
        onlyWithDescription ||
        sort !== "updated" ? (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => {
              setQuery("");
              setOwner("all");
              setLanguage("all");
              setSort("updated");
              setHideArchived(true);
              setOnlyWithDescription(false);
            }}
          >
            {t.reset}
          </Button>
        ) : null}
      </div>

      <div className="text-sm text-muted-foreground">
        {t.showing}{" "}
        <span className="font-medium text-foreground">{filtered.length}</span>{" "}
        {t.of} {repos.length}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((repo) => (
          <Card
            key={repo.full_name}
            className="group cursor-pointer bg-card/70 transition hover:-translate-y-0.5 hover:border-foreground/20"
            onClick={() => setSelected(repo)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setSelected(repo);
            }}
          >
            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-base font-semibold tracking-tight">
                    {repo.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {repo.owner.login} / {repo.name}
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Open on GitHub"
                  className="opacity-0 transition group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(repo.html_url, "_blank", "noopener,noreferrer");
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              {repo.description ? (
                <p className="text-sm text-muted-foreground">
                  {repo.description}
                </p>
              ) : null}
            </CardHeader>
            <CardContent className="space-y-3">
              {repo.topics?.length ? (
                <div className="flex flex-wrap gap-2">
                  {repo.topics.slice(0, 6).map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
              ) : null}
              <RepoStats repo={repo} updatedLabel={t.updated} />
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog.Root open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
            {selected ? (
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <Dialog.Title className="text-lg font-semibold">
                      {selected.full_name}
                    </Dialog.Title>
                    {selected.description ? (
                      <Dialog.Description className="text-sm text-muted-foreground">
                        {selected.description}
                      </Dialog.Description>
                    ) : (
                  <Dialog.Description className="text-sm text-muted-foreground">
                    {t.noDescription}
                  </Dialog.Description>
                )}
              </div>
              <Dialog.Close asChild>
                <Button variant="ghost" size="icon" aria-label={t.close}>
                  <X className="h-4 w-4" />
                </Button>
              </Dialog.Close>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge variant="outline">{selected.owner.login}</Badge>
              {selected.language ? (
                <Badge variant="secondary">{selected.language}</Badge>
              ) : null}
              {selected.archived ? <Badge>{t.archived}</Badge> : null}
            </div>

                {selected.topics?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selected.topics.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                ) : null}

                <div className="mt-5 space-y-2">
                  <RepoStats repo={selected} updatedLabel={t.updated} />
                  <div className="flex flex-wrap gap-3 pt-3">
                    <Button asChild>
                      <a
                        href={selected.html_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t.viewOnGitHub} <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    {selected.homepage ? (
                      <Button asChild variant="outline">
                        <a
                          href={selected.homepage}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t.liveDemo} <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
