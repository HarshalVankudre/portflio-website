import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ResumeExperience } from "@/data/resume";
import { cn } from "@/lib/utils";

export function ExperienceTimeline({
  items,
  className,
}: {
  items: ReadonlyArray<ResumeExperience>;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4", className)}>
      {items.map((role) => (
        <Card key={`${role.company}-${role.start}`} className="overflow-hidden">
          <CardHeader className="space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-base font-semibold tracking-tight">
                {role.title} · {role.company}
              </div>
              <div className="text-sm text-muted-foreground">
                {role.start} — {role.end}
              </div>
            </div>
            {role.location ? (
              <div className="text-sm text-muted-foreground">{role.location}</div>
            ) : null}
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {role.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/25" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
