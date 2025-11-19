export const SUPPORTED_LANGUAGES = {
  en: { label: "English" },
  de: { label: "Deutsch" }
};

export const DEFAULT_LANGUAGE = "en";

export const COUNTRY_LANGUAGE_MAP = {
  DE: "de"
};

const englishExperiences = [
  {
    id: 0,
    role: "AI Developer (Part-time)",
    company: "R\u00dcKO GmbH Baumaschinen",
    period: "Oct 2025 - Present",
    description:
      "Designing and deploying \"R\u00dcKO GPT\", an internal AI chatbot that answers company questions with Retrieval-Augmented Generation. Extending the platform with a dedicated REST API plus robust OpenAI, LangChain, and vector database integrations."
  },
  {
    id: 1,
    role: "Frontend Developer (Portfolio)",
    company: "Personal Project",
    period: "Present",
    description:
      "Building a modern, reactive personal site inspired by Apple-grade glassmorphism with a relentless focus on performance, accessibility, and cinematic motion."
  },
  {
    id: 2,
    role: "Working Student (Side Trading Ops)",
    company: "EnBW GmbH",
    period: "Sep 2024 - Feb 2025",
    description:
      "Launched chatbot automations that cut response times by 35% and piloted a GPT-based NLP workflow that resolved 60% of Tier-1 inquiries while orchestrating HubSpot and Excel data flows."
  },
  {
    id: 3,
    role: "Volunteer Tutor",
    company: "BHUMI.NGO",
    period: "Jun 2021 - Sep 2021",
    description:
      "Taught mathematics to underserved students and strengthened their critical thinking through patient mentorship."
  }
];

const englishProjects = [
  {
    id: 1,
    title: "R\u00dcKO GPT (Internal Tool)",
    description:
      "Advanced Retrieval-Augmented Generation chatbot for querying internal documentation. Ships hybrid search, admin controls, and secure auth with a React/Vite frontend and Python FastAPI backend.",
    tags: ["React", "Python", "LangChain", "Pinecone", "Docker", "PostgreSQL"],
    link: "https://github.com/HarshalVankudre/Baumachschinen-KI-Chatbot"
  },
  {
    id: 2,
    title: "Crawler Vector LLM",
    description:
      "Specialized pipeline that crawls the web, vectors content, and prepares clean datasets for downstream LLM and RAG workloads.",
    tags: ["Python", "Web Crawling", "Vector DB", "LLMs", "Automation"],
    link: "https://github.com/HarshalVankudre/crawler-vector-llm/tree/master"
  },
  {
    id: 3,
    title: "Game Rating Website",
    description:
      "React + TypeScript experience for browsing games with ESLint-enforced quality and frictionless Vercel deployments.",
    tags: ["React", "TypeScript", "Vite", "Vercel"],
    link: "https://github.com/HarshalVankudre/game"
  },
  {
    id: 4,
    title: "AI-BombGame",
    description:
      "Competitive game where players battle an AI agent powered by bespoke algorithms that deliver realistic, challenging move sequences.",
    tags: ["AI Algorithms", "Game Dev", "Logic"],
    link: "https://github.com/HarshalVankudre/AI-BombGame"
  }
];

const germanExperiences = [
  {
    id: 0,
    role: "KI-Entwickler (Teilzeit)",
    company: "R\u00dcKO GmbH Baumaschinen",
    period: "Okt 2025 - Heute",
    description:
      "Konzeption und Aufbau von \"R\u00dcKO GPT\", einem internen RAG-Chatbot f\u00fcr Unternehmensfragen. Integriert OpenAI, LangChain und Vektordatenbanken und erh\u00e4lt einen separaten REST-API-Layer f\u00fcr planbare Erweiterungen."
  },
  {
    id: 1,
    role: "Frontend-Entwickler (Portfolio)",
    company: "Eigenes Projekt",
    period: "Aktuell",
    description:
      "Entwicklung einer modernen, reaktiven Portfolioseite mit Apple-inspirierter Glasoptik und Fokus auf Performance, Barrierefreiheit und geschmeidige Animationen."
  },
  {
    id: 2,
    role: "Werkstudent (Side Trading Ops)",
    company: "EnBW GmbH",
    period: "Sep 2024 - Feb 2025",
    description:
      "Chatbot-L\u00f6sungen bereitgestellt, die Kundenanfragen um 35% beschleunigten, und ein GPT-basiertes NLP-Pilotprojekt geleitet, das 60% der Tier-1-Tickets automatisierte."
  },
  {
    id: 3,
    role: "Ehrenamtlicher Tutor",
    company: "BHUMI.NGO",
    period: "Jun 2021 - Sep 2021",
    description:
      "Mathematikunterricht f\u00fcr benachteiligte Jugendliche und gezielte F\u00f6rderung analytischer Denkweisen durch geduldiges Mentoring."
  }
];

const germanProjects = [
  {
    id: 1,
    title: "R\u00dcKO GPT (Internes Tool)",
    description:
      "Fortgeschrittener RAG-Chatbot zum Abfragen interner Dokumente mit hybrider Suche, Admin-Dashboard und sicherer Authentifizierung auf Basis von React/Vite und FastAPI.",
    tags: ["React", "Python", "LangChain", "Pinecone", "Docker", "PostgreSQL"],
    link: "https://github.com/HarshalVankudre/Baumachschinen-KI-Chatbot"
  },
  {
    id: 2,
    title: "Crawler Vector LLM",
    description:
      "Spezialisierte Crawler-Pipeline, die Webseiten extrahiert und Inhalte f\u00fcr Large Language Models vektorisiert, um Datenaufnahme zu automatisieren.",
    tags: ["Python", "Web Crawling", "Vector DB", "LLMs", "Automation"],
    link: "https://github.com/HarshalVankudre/crawler-vector-llm/tree/master"
  },
  {
    id: 3,
    title: "Game Rating Website",
    description:
      "Moderne React- und TypeScript-Anwendung zum Erkunden von Games inklusive ESLint-Qualit\u00e4tssicherung und Vercel-Deployments.",
    tags: ["React", "TypeScript", "Vite", "Vercel"],
    link: "https://github.com/HarshalVankudre/game"
  },
  {
    id: 4,
    title: "AI-BombGame",
    description:
      "Wettbewerbsorientiertes Spiel, in dem Spielende gegen eine KI antreten, die durch eigene Algorithmen realistische und herausfordernde Z\u00fcge liefert.",
    tags: ["AI Algorithms", "Game Dev", "Logic"],
    link: "https://github.com/HarshalVankudre/AI-BombGame"
  }
];

export const localizedContent = {
  en: {
    personalInfo: {
      name: "Harshal Vankudre",
      title: "Business Informatics Student & AI Developer",
      tagline: "Building intelligent systems with React, Python, and AI.",
      about:
        "Forward-thinking business informatics scholar fluent in German and English, obsessed with building elegant software ecosystems and extracting deep insights from data. Experienced across Java, Python, and modern web frameworks, I thrive where AI experimentation meets robust engineering, leveraging analytical instincts, creative foresight, and decisive problem-solving discipline.",
      email: "harshalvankudre@gmail.com",
      github: "https://github.com/HarshalVankudre",
      linkedin: "https://www.linkedin.com/in/harshal-vankudre/"
    },
    nav: [
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" }
    ],
    hero: {
      viewProjects: "View Projects",
      generatePitch: "Generate AI Pitch",
      generating: "Generating...",
      pitchPrompt:
        "Generate a unique, creative, and punchy 1-sentence elevator pitch for {{name}} based on his skills (React, Python, AI, RAG) and experience. Make it sound impressive and professional but modern.",
      pitchContext: "You are a creative copywriter.",
      pitchBadge: "Gemini Generated Pitch"
    },
    sections: {
      experience: "Experience",
      projects: "Selected Projects",
      about: "About & Skills",
      skillsHeading: "Technical Arsenal"
    },
    experiences: englishExperiences,
    projects: englishProjects,
    aiAssistant: {
      welcome: "Hi! I'm Harshal's AI assistant. Ask me anything about his skills or projects!",
      headerTitle: "Harshal's AI Companion",
      placeholder: "Ask about Harshal's RAG experience...",
      thinking: "Thinking...",
      apiKeyMissing: "Please configure your Gemini API key in the .env file to enable AI features.",
      offline: "Currently offline. Please try again later.",
      fallback: "I couldn't think of a response."
    },
    footer: {
      rights: "\u00a9 {{year}} All rights reserved.",
      contactCta: "Contact Me"
    }
  },
  de: {
    personalInfo: {
      name: "Harshal Vankudre",
      title: "Wirtschaftsinformatik-Student & KI-Entwickler",
      tagline: "Ich baue intelligente Systeme mit React, Python und KI.",
      about:
        "Vorausschauender Wirtschaftsinformatiker mit flie\u00dfenden Deutsch- und Englischkenntnissen, begeistert von eleganten Software-\u00d6kosystemen und tiefen Datenanalysen. Erfahrung in Java, Python und modernen Web-Frameworks verbindet KI-Experimente mit solider Ingenieurskunst.",
      email: "harshalvankudre@gmail.com",
      github: "https://github.com/HarshalVankudre",
      linkedin: "https://www.linkedin.com/in/harshal-vankudre/"
    },
    nav: [
      { id: "about", label: "\u00dcber mich" },
      { id: "experience", label: "Erfahrung" },
      { id: "projects", label: "Projekte" }
    ],
    hero: {
      viewProjects: "Projekte ansehen",
      generatePitch: "KI-Pitch erstellen",
      generating: "Erstelle...",
      pitchPrompt:
        "Formuliere einen einzigartigen, kreativen und pr\u00e4gnanten Elevator-Pitch f\u00fcr {{name}} auf Deutsch basierend auf seinen Skills (React, Python, KI, RAG) und seiner Erfahrung. Er soll beeindruckend, professionell und modern klingen.",
      pitchContext: "Du bist ein kreativer deutschsprachiger Copywriter.",
      pitchBadge: "Von Gemini generierter Pitch"
    },
    sections: {
      experience: "Erfahrung",
      projects: "Ausgew\u00e4hlte Projekte",
      about: "\u00dcber mich & Skills",
      skillsHeading: "Technisches Arsenal"
    },
    experiences: germanExperiences,
    projects: germanProjects,
    aiAssistant: {
      welcome: "Hi! Ich bin Harshals KI-Assistent. Frag mich alles \u00fcber seine Skills oder Projekte!",
      headerTitle: "Harshals KI-Begleiter",
      placeholder: "Frag nach Harshals RAG-Erfahrung...",
      thinking: "Denke...",
      apiKeyMissing: "Bitte trage deinen Gemini-API-Schl\u00fcssel in der .env ein, um die KI-Funktionen zu aktivieren.",
      offline: "Derzeit offline. Bitte versuche es sp\u00e4ter erneut.",
      fallback: "Mir f\u00e4llt dazu gerade nichts ein."
    },
    footer: {
      rights: "\u00a9 {{year}} Alle Rechte vorbehalten.",
      contactCta: "Kontaktiere mich"
    }
  }
};
