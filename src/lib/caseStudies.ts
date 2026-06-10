// Case-study content for /work/[slug] and the home work list.
// Long-form, localized (EN/DE). Kept separate from portfolioData.ts so the
// chatbot context stays lean. All numbers here are real — no invented metrics.

export type Localized<T = string> = { en: T; de: T };

export interface CaseStudy {
  slug: "ruko-gpt" | "teams-bot" | "courseviewer";
  index: string; // "01"…"03"
  title: string;
  year: string;
  client: string;
  role: Localized;
  stack: string[];
  oneLiner: Localized;
  problem: Localized<string[]>;
  approach: Localized<string[]>;
  result: Localized<string[]>;
  metrics: { value: string; label: Localized }[];
  hero: { src: string; alt: Localized };
  links?: { live?: string; repo?: string };
  nextSlug: CaseStudy["slug"];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "ruko-gpt",
    index: "01",
    title: "Rüko GPT",
    year: "2025 —",
    client: "RÜKO GmbH Baumaschinen",
    role: { en: "AI Developer", de: "KI-Entwickler" },
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "OpenAI API",
      "NextAuth.js",
      "RAG",
    ],
    oneLiner: {
      en: "An enterprise RAG chatbot that lets 50+ employees of a construction-machinery company query internal knowledge in plain language.",
      de: "Ein Enterprise-RAG-Chatbot, mit dem 50+ Mitarbeitende eines Baumaschinen-Unternehmens internes Wissen in natürlicher Sprache abfragen.",
    },
    problem: {
      en: [
        "RÜKO's institutional knowledge — machine specs, internal processes, project documents — lived scattered across folders and in people's heads. Finding an answer meant knowing whom to ask, and asking cost both sides time.",
        "Off-the-shelf chatbots couldn't be used: the data is confidential, the questions are domain-specific, and answers need to be grounded in the company's own documents rather than a model's imagination.",
      ],
      de: [
        "Das institutionelle Wissen von RÜKO — Maschinendaten, interne Prozesse, Projektdokumente — lag verstreut in Ordnern und in den Köpfen der Mitarbeitenden. Eine Antwort zu finden hieß zu wissen, wen man fragt — und Fragen kostete beide Seiten Zeit.",
        "Chatbots von der Stange kamen nicht in Frage: Die Daten sind vertraulich, die Fragen domänenspezifisch, und Antworten müssen auf den eigenen Dokumenten basieren statt auf der Fantasie eines Modells.",
      ],
    },
    approach: {
      en: [
        "I design and build Rüko GPT end to end: a Next.js + TypeScript application with Prisma and PostgreSQL underneath, NextAuth.js for company-account authentication, and the OpenAI API for generation.",
        "Documents are processed into a retrieval pipeline so every answer is grounded in real company sources. A separate REST API server extends the system into the company's wider knowledge-management landscape.",
        "Rollout is iterative — shipping to real users early, then tuning retrieval quality and UX based on how employees actually ask questions.",
      ],
      de: [
        "Ich konzipiere und entwickle Rüko GPT von Anfang bis Ende: eine Next.js + TypeScript-Anwendung mit Prisma und PostgreSQL darunter, NextAuth.js für die Authentifizierung mit Firmenkonten und der OpenAI API für die Generierung.",
        "Dokumente laufen durch eine Retrieval-Pipeline, sodass jede Antwort auf echten Unternehmensquellen basiert. Ein separater REST-API-Server bindet das System an das weitere Wissensmanagement des Unternehmens an.",
        "Der Rollout ist iterativ — früh zu echten Nutzern, dann Retrieval-Qualität und UX anhand echter Fragen verbessern.",
      ],
    },
    result: {
      en: [
        "Rüko GPT is in production as the company's internal answer machine, serving 50+ employees. Instead of digging through folders or interrupting a colleague, people ask the bot — and get answers grounded in RÜKO's own documents.",
      ],
      de: [
        "Rüko GPT ist produktiv im Einsatz als interne Antwortmaschine des Unternehmens — für 50+ Mitarbeitende. Statt in Ordnern zu suchen oder Kolleg:innen zu unterbrechen, fragt man den Bot — und bekommt Antworten auf Basis der eigenen RÜKO-Dokumente.",
      ],
    },
    metrics: [
      { value: "50+", label: { en: "Employees served", de: "Mitarbeitende" } },
      {
        value: "2025",
        label: { en: "In production since", de: "Produktiv im Einsatz seit" },
      },
      {
        value: "E2E",
        label: { en: "Designed and built solo", de: "Allein konzipiert und gebaut" },
      },
    ],
    hero: {
      src: "/work/ruko-gpt/hero.svg",
      alt: {
        en: "Rüko GPT — enterprise RAG chatbot interface",
        de: "Rüko GPT — Enterprise-RAG-Chatbot-Oberfläche",
      },
    },
    nextSlug: "teams-bot",
  },
  {
    slug: "teams-bot",
    index: "02",
    title: "Teams-BOT",
    year: "2025",
    client: "RÜKO GmbH Baumaschinen",
    role: { en: "AI Developer", de: "KI-Entwickler" },
    stack: [
      "Python",
      "Microsoft Teams API",
      "Multi-agent AI",
      "Vector DB",
      "Cloud-native",
    ],
    oneLiner: {
      en: "A multi-agent AI bot living inside Microsoft Teams, answering equipment questions from a database of 2,395+ construction machines.",
      de: "Ein Multi-Agent-KI-Bot direkt in Microsoft Teams, der Gerätefragen aus einer Datenbank mit 2.395+ Baumaschinen beantwortet.",
    },
    problem: {
      en: [
        "Equipment data for thousands of construction machines sat in a database that most employees never touched directly. Looking up a machine's details meant switching tools, knowing the schema, or asking someone who did.",
        "The audience already lived in Microsoft Teams all day — the answer had to come to them, not the other way around.",
      ],
      de: [
        "Die Gerätedaten von Tausenden Baumaschinen lagen in einer Datenbank, mit der die meisten Mitarbeitenden nie direkt arbeiteten. Maschinendetails nachzuschlagen hieß Tool-Wechsel, Schema-Wissen — oder jemanden fragen, der beides hat.",
        "Die Zielgruppe verbringt ihren Tag ohnehin in Microsoft Teams — die Antwort musste zu ihnen kommen, nicht umgekehrt.",
      ],
    },
    approach: {
      en: [
        "I built a Python bot that plugs directly into the Microsoft Teams API, so asking about a machine is as easy as messaging a colleague.",
        "Under the hood, multiple specialized agents run in parallel — one resolves what machine is meant, others fetch and compose the answer — which keeps responses fast even when a question touches several data sources.",
        "The system is deployed cloud-native and indexes 2,395+ equipment records.",
      ],
      de: [
        "Ich habe einen Python-Bot gebaut, der direkt an die Microsoft Teams API andockt — eine Maschine abzufragen ist so einfach wie eine Nachricht an Kolleg:innen.",
        "Unter der Haube laufen mehrere spezialisierte Agenten parallel — einer löst auf, welche Maschine gemeint ist, andere holen und komponieren die Antwort. Das hält die Antwortzeiten kurz, auch wenn eine Frage mehrere Datenquellen berührt.",
        "Das System ist cloud-native deployt und indexiert 2.395+ Gerätedatensätze.",
      ],
    },
    result: {
      en: [
        "Equipment knowledge that used to require database access is now one Teams message away. The bot answers from 2,395+ indexed records, with parallel agent execution keeping latency low.",
      ],
      de: [
        "Gerätewissen, das früher Datenbankzugriff erforderte, ist jetzt eine Teams-Nachricht entfernt. Der Bot antwortet aus 2.395+ indexierten Datensätzen — parallele Agenten halten die Latenz niedrig.",
      ],
    },
    metrics: [
      {
        value: "2,395+",
        label: { en: "Equipment records indexed", de: "Indexierte Datensätze" },
      },
      {
        value: "0",
        label: { en: "Tool switches needed", de: "Tool-Wechsel nötig" },
      },
    ],
    hero: {
      src: "/work/teams-bot/hero.svg",
      alt: {
        en: "Teams-BOT — multi-agent equipment bot in Microsoft Teams",
        de: "Teams-BOT — Multi-Agent-Gerätebot in Microsoft Teams",
      },
    },
    nextSlug: "courseviewer",
  },
  {
    slug: "courseviewer",
    index: "03",
    title: "CourseViewer",
    year: "2024",
    client: "Personal project",
    role: { en: "Full-stack Developer", de: "Full-Stack-Entwickler" },
    stack: ["JavaScript", "React", "Node.js"],
    oneLiner: {
      en: "A clean full-stack application for browsing and managing educational content — built to learn the craft properly.",
      de: "Eine aufgeräumte Full-Stack-Anwendung zum Durchsuchen und Verwalten von Lerninhalten — gebaut, um das Handwerk richtig zu lernen.",
    },
    problem: {
      en: [
        "Course material tends to end up as a pile of files and links with no structure. I wanted a single clean interface for browsing and managing educational content — and a project meaty enough to practice real full-stack architecture on.",
      ],
      de: [
        "Kursmaterial endet oft als Haufen von Dateien und Links ohne Struktur. Ich wollte eine einzige aufgeräumte Oberfläche zum Durchsuchen und Verwalten von Lerninhalten — und ein Projekt, das groß genug ist, um echte Full-Stack-Architektur zu üben.",
      ],
    },
    approach: {
      en: [
        "A React front end backed by Node.js, with the UI doing the heavy lifting: clear hierarchy, fast browsing, and an interface that gets out of the way of the content.",
        "The project doubled as deliberate practice in component architecture, state management and clean API design — patterns I now use professionally every day.",
      ],
      de: [
        "Ein React-Frontend mit Node.js dahinter — die UI übernimmt die Hauptarbeit: klare Hierarchie, schnelles Browsen und eine Oberfläche, die den Inhalten nicht im Weg steht.",
        "Das Projekt war zugleich gezieltes Training in Komponentenarchitektur, State-Management und sauberem API-Design — Muster, die ich heute täglich beruflich einsetze.",
      ],
    },
    result: {
      en: [
        "A working full-stack application with a clean UI — and the foundation for the production systems I build today. The code lives on my GitHub.",
      ],
      de: [
        "Eine funktionierende Full-Stack-Anwendung mit aufgeräumter UI — und das Fundament für die Produktionssysteme, die ich heute baue. Der Code liegt auf meinem GitHub.",
      ],
    },
    metrics: [
      {
        value: "2024",
        label: { en: "Built from scratch", de: "Von Grund auf gebaut" },
      },
      {
        value: "Open",
        label: { en: "Code on GitHub", de: "Code auf GitHub" },
      },
    ],
    hero: {
      src: "/work/courseviewer/hero.svg",
      alt: {
        en: "CourseViewer — course browsing application",
        de: "CourseViewer — Anwendung zum Durchsuchen von Kursen",
      },
    },
    links: { repo: "https://github.com/HarshalVankudre" },
    nextSlug: "ruko-gpt",
  },
];

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug);
