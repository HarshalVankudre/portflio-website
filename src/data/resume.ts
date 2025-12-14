import type { Locale } from "@/lib/i18n";

export type ResumeExperience = {
  title: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
};

export type ResumeEducation = {
  program: string;
  school: string;
  start: string;
  end: string;
  details: string[];
};

export type ResumeProject = {
  name: string;
  description: string;
  href: string;
  tags?: string[];
};

export type ImpactStat = {
  value: number;
  suffix?: string;
  label: string;
  description: string;
};

export type LocalizedResume = {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  links: {
    github: string;
    linkedin: string;
    cv: string;
  };
  githubUsernames: readonly string[];
  summary: string;
  impact: readonly ImpactStat[];
  experience: readonly ResumeExperience[];
  education: readonly ResumeEducation[];
  featuredProjects: readonly ResumeProject[];
  skills: Record<string, readonly string[]>;
};

type Localized<T> = { en: T; de: T };

const resumeContent = {
  name: "Harshal Vankudre",
  headline: {
    en: "Business Informatics (BSc) student • Software & Data",
    de: "Wirtschaftsinformatik (BSc) Student • Software & Daten",
  },
  location: { en: "Karlsruhe, Germany", de: "Karlsruhe, Deutschland" },
  email: "harshalvankudre@gmail.com",
  phone: "+49 176 87451632",
  links: {
    github: "https://github.com/HarshalVankudre",
    linkedin: "https://www.linkedin.com/in/harshal-vankudre",
    cv: "/cv.pdf",
  },
  githubUsernames: ["HarshalVankudre", "HarshalVankudre777"] as const,
  summary: {
    en: "Ambitious Business Informatics student with fluent German and English. Passionate about software development and data analysis, with hands-on experience in Java, Python, and modern web frameworks. Strategic board games like chess sharpen my analytical and problem-solving skills, which I apply in study and work.",
    de: "Ambitionierter Wirtschaftsinformatik-Student mit fließenden Deutsch- und Englischkenntnissen. Begeistert von Softwareentwicklung und Datenanalyse, mit Erfahrung in Java, Python und modernen Web-Frameworks. Strategische Brettspiele wie Schach schärfen meine analytischen und problemlösenden Fähigkeiten, die ich gezielt in Studium und Beruf einsetze.",
  },
  impact: [
    {
      value: 35,
      suffix: "%",
      label: { en: "Faster responses", de: "Schnellere Antworten" },
      description: {
        en: "Chatbot automation integrated with HubSpot + Excel workflows.",
        de: "Chatbot-Automatisierung integriert mit HubSpot + Excel-Workflows.",
      },
    },
    {
      value: 60,
      suffix: "%",
      label: { en: "Tier‑1 automated", de: "Tier‑1 automatisiert" },
      description: {
        en: "GPT-based NLP pilot for customer support channels.",
        de: "GPT-basierter NLP-Pilot für Kundensupport-Kanäle.",
      },
    },
    {
      value: 40,
      suffix: "%",
      label: { en: "Less manual time", de: "Weniger manuell" },
      description: {
        en: "Reduced manual handling for repetitive inquiries.",
        de: "Reduzierte manuelle Bearbeitung repetitiver Anfragen.",
      },
    },
  ] satisfies Array<{
    value: number;
    suffix: string;
    label: Localized<string>;
    description: Localized<string>;
  }>,
  experience: [
    {
      title: { en: "Working Student", de: "Werkstudent" },
      company: "EnBW GmbH",
      start: { en: "Sep 2024", de: "Sep 2024" },
      end: { en: "Feb 2025", de: "Feb 2025" },
      bullets: {
        en: [
          "Supported Side Trading Operations and Direct Marketing.",
          "Worked with HubSpot and Microsoft Excel for data management and analysis.",
          "Contributed to optimizing internal processes and workflows.",
          "Created reports and presentations for stakeholders.",
          "Delivered a 4‑month chatbot project, improving response time by ~35% via HubSpot + Excel workflows.",
          "Led a 3‑month pilot integrating GPT-based NLP, automating ~60% of tier‑1 inquiries and reducing manual handling time by ~40%.",
        ],
        de: [
          "Unterstützung im Bereich Side Trading Operations und Direktvermarktung.",
          "Arbeit mit HubSpot und Microsoft Excel zur Datenverwaltung und -analyse.",
          "Mitwirkung bei der Optimierung interner Prozesse und Arbeitsabläufe.",
          "Unterstützung bei der Erstellung von Berichten und Präsentationen.",
          "Umsetzung eines 4‑monatigen Chatbot-Projekts und Verbesserung der Antwortzeit um ~35% (HubSpot + Excel).",
          "Leitung eines 3‑monatigen NLP-Piloten (GPT), Automatisierung von ~60% der Tier‑1-Anfragen und Reduzierung der manuellen Bearbeitungszeit um ~40%.",
        ],
      },
    },
    {
      title: { en: "Working Student", de: "Werkstudent" },
      company: "Enpal GmbH",
      start: { en: "Sep 2022", de: "Sep 2022" },
      end: { en: "Sep 2023", de: "Sep 2023" },
      bullets: {
        en: [
          "Analyzed historical and current financial data to identify trends and opportunities.",
          "Coordinated with on-site teams to gather customer data and preferences.",
          "Designed tailored solar panel configurations based on customer requirements.",
          "Supported quoting by calculating project costs and preparing customer-focused presentations.",
        ],
        de: [
          "Analyse aktueller und historischer Finanzdaten zur Identifikation von Trends und Chancen.",
          "Koordination mit dem Vor-Ort-Team zur Zusammenstellung von Kundendaten und -präferenzen.",
          "Entwurf maßgeschneiderter Solarmodul-Konfigurationen basierend auf Kundenanforderungen.",
          "Unterstützung bei der Angebotserstellung durch Kalkulation projektbezogener Kosten und Ausarbeitung kundenorientierter Präsentationen.",
        ],
      },
    },
    {
      title: { en: "Volunteer Tutor", de: "Freiwilliger Tutor" },
      company: "Bhumi NGO",
      start: { en: "Jun 2021", de: "Jun 2021" },
      end: { en: "Sep 2021", de: "Sep 2021" },
      bullets: {
        en: [
          "Tutored underprivileged students in mathematics.",
          "Explained concepts patiently through exercises to build strong thinking skills.",
          "Contributed to tackling educational inequality and empowering communities.",
        ],
        de: [
          "Ehrenamtlicher Tutor für benachteiligte Schüler in Mathematik.",
          "Geduldiges Erklären von Konzepten und Übungen zur Förderung von Denkfähigkeiten.",
          "Beitrag zur Verringerung von Bildungsungleichheit und Stärkung benachteiligter Communities.",
        ],
      },
    },
  ] satisfies Array<{
    title: Localized<string>;
    company: string;
    start: Localized<string>;
    end: Localized<string>;
    bullets: Localized<string[]>;
  }>,
  education: [
    {
      program: {
        en: "Business Informatics (BSc)",
        de: "Wirtschaftsinformatik (BSc)",
      },
      school: "Hochschule Karlsruhe",
      start: { en: "Sep 2024", de: "Sep 2024" },
      end: { en: "Present", de: "Aktuell" },
      details: {
        en: [
          "Focus areas: software engineering, databases, and business applications.",
          "Hands-on coursework in Java, Python, data analysis, and agile methods (Scrum).",
        ],
        de: [
          "Schwerpunkte: Softwareentwicklung, Datenbanken und betriebswirtschaftliche Anwendungen.",
          "Praxisnahe Inhalte zu Java, Python, Datenanalyse und agilen Methoden (Scrum).",
        ],
      },
    },
    {
      program: { en: "Studienkolleg", de: "Studienkolleg" },
      school: "HTWG Konstanz",
      start: { en: "Sep 2021", de: "Sep 2021" },
      end: { en: "Sep 2022", de: "Sep 2022" },
      details: {
        en: ["Foundation in CS, math, German, economics, and law."],
        de: ["Grundlagen in Informatik, Mathematik, Deutsch, VWL und Recht."],
      },
    },
  ] satisfies Array<{
    program: Localized<string>;
    school: string;
    start: Localized<string>;
    end: Localized<string>;
    details: Localized<string[]>;
  }>,
  featuredProjects: [
    {
      name: "AI-BombGame",
      href: "https://github.com/HarshalVankudre777/AI-BombGame",
      description: {
        en: "An AI-powered game where a player competes against an opponent AI with challenging, realistic moves.",
        de: "KI-gestütztes Spiel, bei dem ein Spieler gegen eine KI mit realistischen und herausfordernden Zügen antritt.",
      },
      tags: ["Java", "AI"],
    },
    {
      name: "File Sorter",
      href: "https://github.com/HarshalVankudre777/FileSorter",
      description: {
        en: "Java app that automatically organizes files into folders by extension (e.g., TextFiles, Images) with efficient file operations and easy extensibility.",
        de: "Java-Anwendung, die Dateien anhand ihrer Erweiterungen automatisch in Ordner sortiert (z. B. TextFiles, Images) — effizient und leicht erweiterbar.",
      },
      tags: ["Java", "Automation"],
    },
    {
      name: "Game Rating Website",
      href: "https://github.com/HarshalVankudre777/game",
      description: {
        en: "Modern web app built with React + TypeScript + Vite and deployed to Vercel, with ESLint and clean navigation.",
        de: "Moderne Web-App mit React + TypeScript + Vite, deployed auf Vercel — inklusive ESLint und sauberer Navigation.",
      },
      tags: ["React", "TypeScript", "Vite"],
    },
  ] satisfies Array<{
    name: string;
    href: string;
    description: Localized<string>;
    tags: string[];
  }>,
  skills: {
    en: {
      "Languages & Core": ["Java", "Python", "JavaScript", "SQL"],
      "Frameworks & Web": ["React", "Vue.js", "Spring Boot"],
      "Data & Analytics": ["Pandas", "Excel"],
      "AI & LLM Tooling": [
        "Ollama",
        "Stable Diffusion",
        "LangChain",
        "Flux",
        "LM Studio",
      ],
      "Work Tools": [
        "HubSpot",
        "Microsoft Office (Excel, Word, PowerPoint, Outlook)",
      ],
    },
    de: {
      "Sprachen & Grundlagen": ["Java", "Python", "JavaScript", "SQL"],
      "Frameworks & Web": ["React", "Vue.js", "Spring Boot"],
      "Data & Analyse": ["Pandas", "Excel"],
      "AI & LLM Tooling": [
        "Ollama",
        "Stable Diffusion",
        "LangChain",
        "Flux",
        "LM Studio",
      ],
      "Arbeits-Tools": [
        "HubSpot",
        "Microsoft Office (Excel, Word, PowerPoint, Outlook)",
      ],
    },
  } as const,
} as const;

export function getResume(locale: Locale): LocalizedResume {
  return {
    name: resumeContent.name,
    headline: resumeContent.headline[locale],
    location: resumeContent.location[locale],
    email: resumeContent.email,
    phone: resumeContent.phone,
    links: resumeContent.links,
    githubUsernames: resumeContent.githubUsernames,
    summary: resumeContent.summary[locale],
    impact: resumeContent.impact.map((i) => ({
      value: i.value,
      suffix: i.suffix,
      label: i.label[locale],
      description: i.description[locale],
    })),
    experience: resumeContent.experience.map((r) => ({
      title: r.title[locale],
      company: r.company,
      start: r.start[locale],
      end: r.end[locale],
      bullets: r.bullets[locale],
    })),
    education: resumeContent.education.map((e) => ({
      program: e.program[locale],
      school: e.school,
      start: e.start[locale],
      end: e.end[locale],
      details: e.details[locale],
    })),
    featuredProjects: resumeContent.featuredProjects.map((p) => ({
      name: p.name,
      href: p.href,
      description: p.description[locale],
      tags: p.tags,
    })),
    skills: resumeContent.skills[locale],
  };
}

