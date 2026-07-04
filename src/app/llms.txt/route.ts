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

${personal.title} based in ${personal.location}. Since July 2026 working on AI in cyber security at Mercedes-Benz Tech Innovation (Stuttgart). Previously built enterprise RAG systems and AI agents at RÜKO GmbH Baumaschinen and chatbot automation at EnBW. ${personal.focus}

Availability: not looking for a new role or freelance work right now.

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
- Reference letter (RÜKO GmbH Baumaschinen): ${SITE_URL}/rueko-arbeitszeugnis.pdf
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
