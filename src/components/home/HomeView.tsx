const EMAIL = "harshalvankudre@gmail.com";

const PROJECTS = [
  {
    title: "Teams-BOT",
    desc: "Multi-agent bot that answers questions about 2,395 construction machines inside Microsoft Teams. Built at RÜKO.",
    github: "https://github.com/HarshalVankudre/Teams-BOT",
  },
  {
    title: "WinMux",
    desc: "A tiling terminal for Windows that runs a fleet of Claude Code sessions in one window. Electron, ConPTY, xterm.",
    github: "https://github.com/HarshalVankudre/WinMux",
  },
  {
    title: "Harshal's Hand Font",
    desc: "A TrueType font digitized from my own handwriting.",
    github: "https://github.com/HarshalVankudre/harshal-hand-font",
  },
];

const JOBS = [
  {
    period: "2026 —",
    text: "Mercedes-Benz Tech Innovation — AI Cyber Security",
  },
  {
    period: "2025 – 26",
    text: "RÜKO GmbH Baumaschinen — AI Developer. Built the internal RAG assistant (~50 users) and the Teams equipment bot.",
  },
  {
    period: "2024 – 25",
    text: "EnBW — Working student. Chatbot project and GPT pilot: ~60% of tier-1 inquiries automated, ~35% faster responses.",
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
          AI engineer at Mercedes-Benz Tech Innovation, working on AI in cyber
          security. Based in Karlsruhe, Germany.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li>
            <a href={`mailto:${EMAIL}`} className="link-draw text-fg">
              Email
            </a>
          </li>
          <li>
            <a
              href="https://github.com/HarshalVankudre"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw text-fg"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/harshal-vankudre/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw text-fg"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw text-fg"
            >
              CV
            </a>
          </li>
          <li>
            <a
              href="/rueko-arbeitszeugnis.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw text-fg"
            >
              Reference letter
            </a>
          </li>
        </ul>
      </header>

      {/* Projects */}
      <section aria-labelledby="projects-title" className="mt-12">
        <h2 id="projects-title" className="label-mono">
          Projects
        </h2>
        <ul className="mt-4 space-y-5">
          {PROJECTS.map((project) => (
            <li key={project.title}>
              <h3 className="font-display text-lg text-fg">{project.title}</h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-dim">
                {project.desc}
              </p>
              <p className="mt-1.5 text-sm">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw text-fg"
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
        <h2 id="experience-title" className="label-mono">
          Experience
        </h2>
        <ul className="mt-4 space-y-3.5">
          {JOBS.map((job) => (
            <li
              key={job.period}
              className="grid gap-x-6 gap-y-0.5 sm:grid-cols-[6.5rem_1fr]"
            >
              <span className="text-sm text-faint">{job.period}</span>
              <span className="max-w-xl text-sm leading-relaxed text-dim">
                {job.text}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer line */}
      <p className="mt-12 max-w-xl text-sm leading-relaxed text-faint">
        B.Sc. Data Science at Hochschule Karlsruhe (in progress)
      </p>
    </main>
  );
}
