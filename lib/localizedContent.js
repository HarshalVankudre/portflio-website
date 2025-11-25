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
    link: "https://github.com/HarshalVankudre/Baumachschinen-KI-Chatbot",
    challenge: "Employees struggled to find answers in thousands of scattered documents, leading to wasted time and inconsistent responses.",
    solution: "Built a RAG-powered chatbot that indexes all company documents and provides instant, accurate answers with source citations.",
    features: ["Hybrid search combining semantic and keyword matching", "Admin dashboard for document management", "Secure authentication with role-based access", "Real-time streaming responses"]
  },
  {
    id: 2,
    title: "Crawler Vector LLM",
    description:
      "Specialized pipeline that crawls the web, vectors content, and prepares clean datasets for downstream LLM and RAG workloads.",
    tags: ["Python", "Web Crawling", "Vector DB", "LLMs", "Automation"],
    link: "https://github.com/HarshalVankudre/crawler-vector-llm/tree/master",
    challenge: "Manual data collection for AI training is tedious and doesn't scale.",
    solution: "Automated pipeline that crawls, cleans, chunks, and embeds web content into vector databases.",
    features: ["Configurable crawling depth and filters", "Automatic content cleaning and deduplication", "Support for multiple vector databases", "Batch processing for large datasets"]
  },
  {
    id: 3,
    title: "Game Rating Website",
    description:
      "React + TypeScript experience for browsing games with ESLint-enforced quality and frictionless Vercel deployments.",
    tags: ["React", "TypeScript", "Vite", "Vercel"],
    link: "https://github.com/HarshalVankudre/game",
    challenge: "Wanted to build a modern, type-safe frontend application to showcase React skills.",
    solution: "Created a responsive game catalog with filtering, sorting, and detailed game pages.",
    features: ["Type-safe codebase with TypeScript", "Responsive grid layout", "Dark mode support", "Instant deployments via Vercel"]
  },
  {
    id: 4,
    title: "AI-BombGame",
    description:
      "Competitive game where players battle an AI agent powered by bespoke algorithms that deliver realistic, challenging move sequences.",
    tags: ["AI Algorithms", "Game Dev", "Logic"],
    link: "https://github.com/HarshalVankudre/AI-BombGame",
    challenge: "Creating an AI opponent that feels challenging but fair.",
    solution: "Implemented minimax algorithm with alpha-beta pruning for efficient decision-making.",
    features: ["Intelligent AI opponent", "Multiple difficulty levels", "Clean game logic architecture", "Smooth animations"]
  }
];

const englishTestimonials = [
  {
    name: "Tech Colleague",
    role: "Senior Developer at R\u00dcKO GmbH",
    quote: "Harshal's RAG implementation transformed how our team accesses information. His attention to detail and problem-solving skills are exceptional.",
    rating: 5
  },
  {
    name: "Project Partner",
    role: "EnBW GmbH",
    quote: "Working with Harshal on the chatbot automation was a great experience. He delivered results that exceeded our expectations.",
    rating: 5
  },
  {
    name: "University Peer",
    role: "Business Informatics Student",
    quote: "Harshal has a unique ability to explain complex AI concepts in simple terms. His code is always clean and well-documented.",
    rating: 5
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
    link: "https://github.com/HarshalVankudre/Baumachschinen-KI-Chatbot",
    challenge: "Mitarbeiter hatten Schwierigkeiten, Antworten in tausenden verstreuten Dokumenten zu finden.",
    solution: "RAG-basierter Chatbot, der alle Firmendokumente indexiert und sofortige, pr\u00e4zise Antworten mit Quellenangaben liefert.",
    features: ["Hybride Suche mit semantischer und Keyword-Abfrage", "Admin-Dashboard zur Dokumentenverwaltung", "Sichere Authentifizierung mit Rollenkonzept", "Echtzeit-Streaming-Antworten"]
  },
  {
    id: 2,
    title: "Crawler Vector LLM",
    description:
      "Spezialisierte Crawler-Pipeline, die Webseiten extrahiert und Inhalte f\u00fcr Large Language Models vektorisiert, um Datenaufnahme zu automatisieren.",
    tags: ["Python", "Web Crawling", "Vector DB", "LLMs", "Automation"],
    link: "https://github.com/HarshalVankudre/crawler-vector-llm/tree/master",
    challenge: "Manuelle Datensammlung f\u00fcr KI-Training ist m\u00fchsam und skaliert nicht.",
    solution: "Automatisierte Pipeline zum Crawlen, Bereinigen und Einbetten von Webinhalten in Vektordatenbanken.",
    features: ["Konfigurierbare Crawling-Tiefe", "Automatische Inhaltsbereinigung", "Unterst\u00fctzung mehrerer Vektordatenbanken", "Batch-Verarbeitung"]
  },
  {
    id: 3,
    title: "Game Rating Website",
    description:
      "Moderne React- und TypeScript-Anwendung zum Erkunden von Games inklusive ESLint-Qualit\u00e4tssicherung und Vercel-Deployments.",
    tags: ["React", "TypeScript", "Vite", "Vercel"],
    link: "https://github.com/HarshalVankudre/game",
    challenge: "Aufbau einer modernen, typsicheren Frontend-Anwendung zur Demonstration von React-F\u00e4higkeiten.",
    solution: "Responsiver Spielekatalog mit Filter-, Sortier- und Detailseiten.",
    features: ["Typsichere Codebasis mit TypeScript", "Responsives Grid-Layout", "Dark-Mode-Unterst\u00fctzung", "Instant-Deployments via Vercel"]
  },
  {
    id: 4,
    title: "AI-BombGame",
    description:
      "Wettbewerbsorientiertes Spiel, in dem Spielende gegen eine KI antreten, die durch eigene Algorithmen realistische und herausfordernde Z\u00fcge liefert.",
    tags: ["AI Algorithms", "Game Dev", "Logic"],
    link: "https://github.com/HarshalVankudre/AI-BombGame",
    challenge: "Entwicklung eines KI-Gegners, der herausfordernd aber fair ist.",
    solution: "Minimax-Algorithmus mit Alpha-Beta-Pruning f\u00fcr effiziente Entscheidungsfindung.",
    features: ["Intelligenter KI-Gegner", "Mehrere Schwierigkeitsstufen", "Saubere Spiellogik-Architektur", "Fl\u00fcssige Animationen"]
  }
];

const germanTestimonials = [
  {
    name: "Tech-Kollege",
    role: "Senior Developer bei R\u00dcKO GmbH",
    quote: "Harshals RAG-Implementierung hat die Art und Weise, wie unser Team auf Informationen zugreift, transformiert. Seine Liebe zum Detail und seine Probleml\u00f6sungsf\u00e4higkeiten sind au\u00dfergew\u00f6hnlich.",
    rating: 5
  },
  {
    name: "Projektpartner",
    role: "EnBW GmbH",
    quote: "Die Zusammenarbeit mit Harshal bei der Chatbot-Automatisierung war eine tolle Erfahrung. Er lieferte Ergebnisse, die unsere Erwartungen \u00fcbertrafen.",
    rating: 5
  },
  {
    name: "Kommilitone",
    role: "Wirtschaftsinformatik-Student",
    quote: "Harshal hat die einzigartige F\u00e4higkeit, komplexe KI-Konzepte einfach zu erkl\u00e4ren. Sein Code ist immer sauber und gut dokumentiert.",
    rating: 5
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
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" }
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
      skillsHeading: "Technical Arsenal",
      contact: "Get In Touch",
      testimonials: "What People Say"
    },
    experiences: englishExperiences,
    projects: englishProjects,
    testimonials: englishTestimonials,
    projectModal: {
      viewDetails: "View Details",
      overview: "Overview",
      challenge: "The Challenge",
      solution: "The Solution",
      features: "Key Features",
      viewCode: "View Code",
      liveDemo: "Live Demo"
    },
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
    },
    contact: {
      heading: "Let's Work Together",
      subheading: "Have a project in mind or just want to chat? Drop me a message and I'll get back to you as soon as possible.",
      firstName: "First Name",
      firstNamePlaceholder: "John",
      lastName: "Last Name",
      lastNamePlaceholder: "Doe",
      email: "Email",
      emailPlaceholder: "john@example.com",
      message: "Message",
      messagePlaceholder: "Tell me about your project or just say hi...",
      submit: "Send Message",
      sending: "Sending...",
      successMessage: "Thanks for reaching out! I'll get back to you soon.",
      errorMessage: "Oops! Something went wrong. Please try again or email me directly."
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
      { id: "projects", label: "Projekte" },
      { id: "contact", label: "Kontakt" }
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
      skillsHeading: "Technisches Arsenal",
      contact: "Kontakt",
      testimonials: "Was andere sagen"
    },
    experiences: germanExperiences,
    projects: germanProjects,
    testimonials: germanTestimonials,
    projectModal: {
      viewDetails: "Details ansehen",
      overview: "\u00dcbersicht",
      challenge: "Die Herausforderung",
      solution: "Die L\u00f6sung",
      features: "Hauptfunktionen",
      viewCode: "Code ansehen",
      liveDemo: "Live Demo"
    },
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
    },
    contact: {
      heading: "Lass uns zusammenarbeiten",
      subheading: "Hast du ein Projekt im Kopf oder möchtest einfach nur plaudern? Schreib mir eine Nachricht und ich melde mich so schnell wie möglich.",
      firstName: "Vorname",
      firstNamePlaceholder: "Max",
      lastName: "Nachname",
      lastNamePlaceholder: "Mustermann",
      email: "E-Mail",
      emailPlaceholder: "max@beispiel.de",
      message: "Nachricht",
      messagePlaceholder: "Erzähl mir von deinem Projekt oder sag einfach hallo...",
      submit: "Nachricht senden",
      sending: "Wird gesendet...",
      successMessage: "Danke für deine Nachricht! Ich melde mich so bald wie möglich.",
      errorMessage: "Ups! Etwas ist schief gelaufen. Bitte versuche es erneut oder schreib mir direkt eine E-Mail."
    }
  }
};
