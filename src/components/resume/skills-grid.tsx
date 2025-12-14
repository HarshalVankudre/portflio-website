import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SkillsGrid({
  skills,
  className,
}: {
  skills: Record<string, readonly string[]>;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      {Object.entries(skills).map(([category, items]) => (
        <Card key={category}>
          <CardHeader className="py-5">
            <div className="text-sm font-semibold tracking-tight">
              {category}
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {items.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

