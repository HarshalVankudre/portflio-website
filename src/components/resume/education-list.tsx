import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ResumeEducation } from "@/data/resume";
import { cn } from "@/lib/utils";

export function EducationList({
  items,
  className,
}: {
  items: ReadonlyArray<ResumeEducation>;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4", className)}>
      {items.map((edu) => (
        <Card key={`${edu.school}-${edu.start}`}>
          <CardHeader className="space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-base font-semibold tracking-tight">
                {edu.program}
              </div>
              <div className="text-sm text-muted-foreground">
                {edu.start} — {edu.end}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{edu.school}</div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {edu.details.map((d) => (
                <li key={d} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/25" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
