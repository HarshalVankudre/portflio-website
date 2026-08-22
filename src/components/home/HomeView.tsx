const EMAIL = "harshalvankudre@gmail.com";

const PROJECTS = [
  {
    title: "RAG assistant & Teams bot (RÜKO)",
    tags: "Python · FastAPI · LangGraph · OpenAI API · Pinecone · PostgreSQL",
    body: "Production RAG assistant in daily use by ~50 staff, and a Teams bot answering equipment questions across a fleet of 2,395 construction machines — SQL inventory lookups, manual search, advisory answers. Built both as sole AI developer, plus the shared document-ingestion pipeline.",
    github: "https://github.com/HarshalVankudre/Teams-BOT",
  },
  {
    title: "WinMux",
    tags: "TypeScript · Electron · ConPTY · xterm.js · Claude Code",
    body: "tmux-style tiling terminal for Windows that runs a fleet of parallel Claude Code sessions in one window, on real ConPTY shells. Open source, in daily use.",
    github: "https://github.com/HarshalVankudre/WinMux",
  },
  {
    title: "StudyOS",
    tags: "Next.js · TypeScript · Prisma · Vercel AI SDK",
    body: "Turns one sentence about a student’s courses into a populated semester workspace — planner, assignment board, reading list.",
    github: "https://github.com/HarshalVankudre/StudyOS",
  },
  {
    title: "Harshal’s Hand Font",
    tags: "TrueType · Glyph design · CSS",
    body: "TrueType font drawn from my own handwriting.",
    github: "https://github.com/HarshalVankudre/harshal-hand-font",
  },
];

const JOBS = [
  {
    period: "Jun 2026 —",
    text: "Mercedes-Benz Tech Innovation — Working student, agentic AI security. Researching sandboxing and isolation for AI agents that run unattended.",
  },
  {
    period: "Oct 2025 – Apr 2026",
    text: "RÜKO GmbH Baumaschinen — Working student and sole AI developer. Built the RAG assistant, the Teams equipment bot, and the document pipeline behind both — requirements through production.",
  },
  {
    period: "Sep 2024 – Feb 2025",
    text: "EnBW — Working student, NLP and automation. Co-developed a customer-service chatbot and a GPT pilot that automated ~60% of tier-1 inquiries.",
  },
];

const SKILLS = [
  {
    label: "Languages",
    items: "Python · TypeScript · JavaScript · Java · SQL",
  },
  {
    label: "AI",
    items: "RAG architecture · Prompt engineering · OpenAI API · MCP servers · Claude Code",
  },
  {
    label: "Stack",
    items: "FastAPI · Next.js · React · PostgreSQL · Docker · Azure · Git",
  },
];

export default function HomeView() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative mx-auto flex min-h-svh w-full max-w-2xl flex-col justify-center px-6 py-14 outline-none sm:py-16"
    >
      {/* Header */}
      <header>
        <h1 className="font-display text-3xl text-fg sm:text-4xl">
          Harshal Vankudre
        </h1>
        <p className="mt-3 max-w-xl leading-relaxed text-dim">
          AI engineer in Karlsruhe, Germany. I build internal AI tools end to end
          — RAG assistants, Teams bots, and the pipelines behind them. Working
          student at Mercedes-Benz Tech Innovation: AI security and AI agent
          sandboxing.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li>
            <a
              href={`mailto:${EMAIL}`}
              className="link-draw -mx-1 -my-2 inline-block px-1 py-2 text-fg"
            >
              Email
            </a>
          </li>
          <li>
            <a
              href="https://github.com/HarshalVankudre"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw -mx-1 -my-2 inline-block px-1 py-2 text-fg"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/harshal-vankudre/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw -mx-1 -my-2 inline-block px-1 py-2 text-fg"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <span className="text-dim">CV</span>{" "}
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw -mx-1 -my-2 inline-block px-1 py-2 text-fg"
              aria-label="CV in English (PDF)"
            >
              EN
            </a>
            <span className="text-dim" aria-hidden="true">
              {" · "}
            </span>
            <a
              href="/cv-de.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw -mx-1 -my-2 inline-block px-1 py-2 text-fg"
              aria-label="CV in German (PDF)"
            >
              DE
            </a>
          </li>
          <li>
            <a
              href="/rueko-arbeitszeugnis.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw -mx-1 -my-2 inline-block px-1 py-2 text-fg"
              aria-label="RÜKO reference letter, German, PDF"
            >
              Reference letter (German)
            </a>
          </li>
        </ul>
      </header>

      {/* Projects */}
      <section aria-labelledby="projects-title" className="mt-12">
        <h2 id="projects-title" className="section-label">
          Projects
        </h2>
        <ul className="mt-4 space-y-7">
          {PROJECTS.map((project) => (
            <li key={project.title}>
              <h3 className="font-display text-lg text-fg">{project.title}</h3>
              <p className="mt-1 text-sm text-faint">{project.tags}</p>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-dim">
                {project.body}
              </p>
              <p className="mt-1.5 text-sm">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw text-fg"
                  aria-label={`${project.title} on GitHub`}
                >
                  GitHub
                </a>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience-title" className="mt-12">
        <h2 id="experience-title" className="section-label">
          Experience
        </h2>
        <ul className="mt-4 space-y-3.5">
          {JOBS.map((job) => (
            <li
              key={job.period}
              className="grid gap-x-6 gap-y-0.5 sm:grid-cols-[9.5rem_1fr]"
            >
              <span className="text-sm text-faint">{job.period}</span>
              <span className="max-w-xl text-sm leading-relaxed text-dim">
                {job.text}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills-title" className="mt-12">
        <h2 id="skills-title" className="section-label">
          Skills
        </h2>
        <ul className="mt-4 space-y-3.5">
          {SKILLS.map((skill) => (
            <li
              key={skill.label}
              className="grid gap-x-6 gap-y-0.5 sm:grid-cols-[9.5rem_1fr]"
            >
              <span className="text-sm text-faint">{skill.label}</span>
              <span className="max-w-xl text-sm leading-relaxed text-dim">
                {skill.items}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer line */}
      <p className="mt-12 max-w-xl text-sm leading-relaxed text-faint">
        B.Sc. Data Science at Karlsruhe University of Applied Sciences (HKA),
        in progress. German (C1), English (near-native), Hindi (native).
      </p>
    </main>
  );
}
