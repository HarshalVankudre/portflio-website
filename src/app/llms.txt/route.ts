// Plain-text summary for LLM crawlers (llms.txt convention), built from the
// same sources of truth as the site itself.
import { portfolioData } from "@/lib/portfolioData";
import { caseStudies } from "@/lib/caseStudies";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vankudre.com";

export function GET(): Response {
  const { personal, skills } = portfolioData;

  const work = caseStudies
    .map((c) =>
      [
        `### ${c.title} (${c.year})`,
        c.oneLiner.en,
        `Stack: ${c.stack.join(", ")}`,
        `Metrics: ${c.metrics.map((m) => `${m.value} ${m.label.en}`).join(" · ")}`,
        `Case study: ${SITE_URL}/work/${c.slug}`,
      ].join("\n")
    )
    .join("\n\n");

  const body = `# Harshal Vankudre — AI Developer

${personal.title} based in ${personal.location}. Currently AI Developer at RÜKO GmbH Baumaschinen, building enterprise RAG systems and AI agents. ${personal.focus}

## Selected work

${work}

## Skills

- Languages: ${skills.languages.join(", ")}
- Frameworks: ${skills.frameworks.join(", ")}
- Databases: ${skills.databases.join(", ")}
- Cloud & DevOps: ${skills.cloud.join(", ")}
- AI & ML: ${skills.ai.join(", ")}

## Links

- Site: ${SITE_URL}
- GitHub: ${personal.github}
- LinkedIn: ${personal.linkedin}
- Email: ${personal.email}
- CV: ${SITE_URL}/cv.pdf
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
