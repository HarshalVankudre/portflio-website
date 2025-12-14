import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ResumeProject } from "@/data/resume";
import { cn } from "@/lib/utils";

export function FeaturedProjects({
  projects,
  className,
}: {
  projects: ReadonlyArray<ResumeProject>;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-3", className)}>
      {projects.map((p) => (
        <Card key={p.href} className="flex flex-col">
          <CardHeader className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="text-base font-semibold tracking-tight">
                {p.name}
              </div>
              <Button asChild size="icon" variant="ghost" aria-label="Open">
                <a href={p.href} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{p.description}</p>
          </CardHeader>
          <CardContent className="mt-auto flex flex-wrap gap-2">
            {(p.tags ?? []).map((t) => (
              <Badge key={t} variant="secondary">
                {t}
              </Badge>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
