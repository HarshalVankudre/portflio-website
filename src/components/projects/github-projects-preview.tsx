import { ExternalLink, GitFork, Star } from "lucide-react";

import type { GitHubRepo } from "@/lib/github";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ui, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

export function GitHubProjectsPreview({
  repos,
  locale,
  className,
  limit = 4,
}: {
  repos: GitHubRepo[];
  locale: Locale;
  className?: string;
  limit?: number;
}) {
  const t = ui[locale];
  const gh = t.githubBrowser;
  const items = repos.slice(0, limit);

  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      {items.map((repo) => (
        <Card key={repo.full_name} className="flex flex-col">
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
                asChild
                size="icon"
                variant="ghost"
                aria-label={t.common.open}
              >
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
            {repo.description ? (
              <p className="text-sm text-muted-foreground">{repo.description}</p>
            ) : null}
          </CardHeader>
          <CardContent className="mt-auto space-y-3">
            <div className="flex flex-wrap gap-2">
              {repo.language ? (
                <Badge variant="secondary">{repo.language}</Badge>
              ) : null}
              {repo.archived ? <Badge>{gh.archived}</Badge> : null}
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5" /> {repo.stargazers_count ?? 0}
              </span>
              <span className="inline-flex items-center gap-1">
                <GitFork className="h-3.5 w-3.5" /> {repo.forks_count ?? 0}
              </span>
              <span>
                {gh.updated} {formatDate(repo.updated_at)}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
