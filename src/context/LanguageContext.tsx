"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
type Language = "en" | "de";

type TranslationKey = keyof (typeof translations)["en"];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const translations = {
  en: {
    // Navbar
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.letsTalk": "Let's Talk",

    // Shared
    "hero.location": "Karlsruhe, Germany",

    // About
    "about.summary": "I build AI systems that survive contact with real users — RAG pipelines, enterprise chatbots, and the full-stack products around them. By day I'm the AI Developer at RÜKO GmbH Baumaschinen; alongside, I'm finishing a B.Sc. in Data Science at Hochschule Karlsruhe.",
    "about.chess": "Off hours: long chess games when I should be sleeping, and too many retrieval papers. Based in",
    "about.looking": "I'm drawn to problems where the model is the easy part — where the real work is the data, the evaluation, and an interface people trust.",

    // Skill groups
    "skills.languages": "Languages & Core",
    "skills.frameworks": "Frameworks & Web",
    "skills.databases": "Databases",
    "skills.cloud": "Cloud & DevOps",
    "skills.ai": "AI & LLM Tooling",
    "skills.tools": "Work Tools",

    // Experience highlights (Timeline on /about)
    // RÜKO
    "exp.ruko.role": "AI Developer",
    "exp.ruko.h1": "Designing and building Rüko GPT — the company's internal AI assistant for querying its own knowledge",
    "exp.ruko.h2": "Full-stack development with Next.js, TypeScript, Prisma, and PostgreSQL",
    "exp.ruko.h3": "Integrating the OpenAI API for intelligent responses",
    "exp.ruko.h4": "Implementing user authentication with NextAuth.js",
    "exp.ruko.h5": "Extending with a separate REST API server to improve internal knowledge management",
    // EnBW
    "exp.enbw.role": "Working Student",
    "exp.enbw.h1": "Supported Side Trading Operations and Direct Marketing",
    "exp.enbw.h2": "Worked with HubSpot and Microsoft Excel for data management",
    "exp.enbw.h3": "Contributed to optimizing internal processes and workflows",
    "exp.enbw.h4": "Created reports and presentations for stakeholders",
    "exp.enbw.h5": "Delivered a 4-month chatbot project, improving response time by ~35%",
    "exp.enbw.h6": "Led a 3-month pilot integrating GPT-based NLP, automating ~60% of tier-1 inquiries",
    // Enpal
    "exp.enpal.role": "Working Student",
    "exp.enpal.h1": "Analyzed historical and current financial data to identify trends",
    "exp.enpal.h2": "Coordinated with on-site teams to gather customer data",
    "exp.enpal.h3": "Designed tailored solar panel configurations based on requirements",
    "exp.enpal.h4": "Supported quoting by calculating project costs",
    // Bhumi
    "exp.bhumi.role": "Volunteer Tutor",
    "exp.bhumi.h1": "Tutored underprivileged students in mathematics",
    "exp.bhumi.h2": "Explained concepts through exercises to build thinking skills",
    "exp.bhumi.h3": "Contributed to tackling educational inequality",

    // Education
    "education.tag": "Academic Background",
    "education.current": "Current",
    "edu.hka.degree": "B.Sc. Data Science",
    "edu.hka.h1": "Statistics, machine learning, and data engineering fundamentals",
    "edu.hka.h2": "Applied focus on AI systems, analytics, and modern data pipelines",

    // Contact
    "contact.tag": "Get In Touch",
    "contact.title": "Have a problem worth solving?",
    "contact.titleHighlight": "Tell me about it",
    "contact.quickLinks": "Elsewhere",
    "contact.respondFastest": "I usually respond fastest on email.",
    "contact.email": "Email",
    "contact.location": "Location",
    "contact.sendMessage": "Send a Message",
    "contact.name": "Name",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.namePlaceholder": "Your name",
    "contact.emailPlaceholder": "your@email.com",
    "contact.subjectPlaceholder": "What's this about?",
    "contact.messagePlaceholder": "Your message...",
    "contact.sending": "Sending...",
    "contact.successMessage": "Sent. I'll reply within a day — usually sooner.",
    "contact.errorFallback": "That didn't go through. Email me directly instead.",
    "contact.downloadCv": "Download CV",

    // Footer
    "footer.backToTop": "Back to Top",
    "footer.localTime": "Local time",
    "footer.menu": "Menu",
    "footer.connect": "Connect",

    // Noir home
    "nav.work": "Work",
    "nav.now": "Now",
    "home.role": "AI Developer",
    "home.tagline": "Building RAG systems and enterprise chatbots that people actually use.",
    "home.status": "Now shipping Rüko GPT",
    "home.scroll": "Scroll",
    "home.selectedWork": "Selected Work",
    "home.viewCase": "View case study",
    "home.aboutLabel": "About",
    "home.aboutStatement": "I turn messy, undocumented problems into working software — RAG systems with daily users, agents that hold up in production, and interfaces that don't need a manual.",
    "home.moreAbout": "More about me",
    "home.metricYears": "Years of experience",
    "home.metricUsers": "Internal users served",
    "home.metricAutomation": "Tier-1 inquiries automated",
    "home.metricFaster": "Faster responses",

    // Capabilities strip
    "home.capabilitiesLabel": "What I do",
    "home.cap1.title": "RAG & multi-agent systems",
    "home.cap1.desc":
      "Retrieval pipelines and agent teams grounded in real data — built for production, measured by evaluation.",
    "home.cap2.title": "Full-stack products",
    "home.cap2.desc":
      "From schema to interface: Next.js, TypeScript and Python applications people use daily.",
    "home.cap3.title": "Automation & integrations",
    "home.cap3.desc":
      "Bots and APIs that meet people where they already work — Teams, internal tools, existing systems.",
    "home.capTerm1": "RAG Systems",
    "home.capTerm2": "Multi-Agent",
    "home.capTerm3": "Full-Stack",
    "home.capTerm4": "Automation",
    "home.capTerm5": "Retrieval",
    "home.capTerm6": "Evaluation",

    // About page
    "aboutPage.label": "About",
    "aboutPage.statement": "I turn messy problems into tools people rely on.",
    "aboutPage.experienceLabel": "Experience",
    "aboutPage.educationLabel": "Education",
    "aboutPage.languagesLabel": "Languages",
    "aboutPage.skillsLabel": "Skills",
    "aboutPage.cta": "Let's work together",

    // Case studies
    "work.problem": "Problem",
    "work.approach": "Approach",
    "work.result": "Result",
    "work.next": "Next project",
    "work.back": "All work",
    "work.year": "Year",
    "work.role": "Role",
    "work.client": "Client",
    "work.stack": "Stack",
  },
  de: {
    // Navbar
    "nav.about": "Über mich",
    "nav.contact": "Kontakt",
    "nav.letsTalk": "Kontakt",

    // Shared
    "hero.location": "Karlsruhe, Deutschland",

    // About
    "about.summary": "Ich baue KI-Systeme, die den Kontakt mit echten Nutzern überleben — RAG-Pipelines, Enterprise-Chatbots und die Full-Stack-Produkte drumherum. Tagsüber bin ich KI-Entwickler bei RÜKO GmbH Baumaschinen; nebenher mache ich meinen B.Sc. in Data Science an der Hochschule Karlsruhe fertig.",
    "about.chess": "Nach Feierabend: lange Schachpartien, wenn ich eigentlich schlafen sollte — und zu viele Retrieval-Paper. Zuhause in",
    "about.looking": "Mich reizen Probleme, bei denen das Modell der einfache Teil ist — und die eigentliche Arbeit in den Daten, der Evaluation und einer Oberfläche steckt, der man vertraut.",

    // Skill groups
    "skills.languages": "Sprachen & Core",
    "skills.frameworks": "Frameworks & Web",
    "skills.databases": "Datenbanken",
    "skills.cloud": "Cloud & DevOps",
    "skills.ai": "KI & LLM Tools",
    "skills.tools": "Arbeits-Tools",

    // Experience highlights (Timeline on /about)
    // RÜKO
    "exp.ruko.role": "KI-Entwickler",
    "exp.ruko.h1": "Konzeption und Entwicklung von Rüko GPT — dem internen KI-Assistenten für das Unternehmenswissen",
    "exp.ruko.h2": "Full-Stack-Entwicklung mit Next.js, TypeScript, Prisma und PostgreSQL",
    "exp.ruko.h3": "Integration der OpenAI API für intelligente Antworten",
    "exp.ruko.h4": "Implementierung der Benutzerauthentifizierung mit NextAuth.js",
    "exp.ruko.h5": "Erweiterung mit separatem REST-API-Server zur Verbesserung des internen Wissensmanagements",
    // EnBW
    "exp.enbw.role": "Werkstudent",
    "exp.enbw.h1": "Unterstützung von Side Trading Operations und Direktvermarktung",
    "exp.enbw.h2": "Arbeit mit HubSpot und Microsoft Excel für Datenmanagement",
    "exp.enbw.h3": "Beitrag zur Optimierung interner Prozesse und Workflows",
    "exp.enbw.h4": "Erstellung von Berichten und Präsentationen für Stakeholder",
    "exp.enbw.h5": "Lieferung eines 4-monatigen Chatbot-Projekts mit ~35% schnellerer Reaktionszeit",
    "exp.enbw.h6": "Leitung eines 3-monatigen Pilotprojekts zur GPT-basierten NLP-Integration, ~60% Tier-1-Anfragen automatisiert",
    // Enpal
    "exp.enpal.role": "Werkstudent",
    "exp.enpal.h1": "Analyse historischer und aktueller Finanzdaten zur Trendidentifikation",
    "exp.enpal.h2": "Koordination mit Vor-Ort-Teams zur Erfassung von Kundendaten",
    "exp.enpal.h3": "Entwicklung maßgeschneiderter Solarpanel-Konfigurationen nach Kundenanforderungen",
    "exp.enpal.h4": "Unterstützung bei der Angebotserstellung durch Projektkostenberechnung",
    // Bhumi
    "exp.bhumi.role": "Freiwilliger Tutor",
    "exp.bhumi.h1": "Nachhilfe für benachteiligte Schüler in Mathematik",
    "exp.bhumi.h2": "Vermittlung von Konzepten durch Übungen zum Aufbau von Denkfähigkeiten",
    "exp.bhumi.h3": "Beitrag zur Bekämpfung von Bildungsungleichheit",

    // Education
    "education.tag": "Ausbildung",
    "education.current": "Aktuell",
    "edu.hka.degree": "B.Sc. Data Science",
    "edu.hka.h1": "Statistik, Machine Learning und Data-Engineering-Grundlagen",
    "edu.hka.h2": "Praxisfokus auf KI-Systeme, Analytik und moderne Datenpipelines",

    // Contact
    "contact.tag": "Kontakt aufnehmen",
    "contact.title": "Ein Problem, das sich lohnt?",
    "contact.titleHighlight": "Erzähl mir davon",
    "contact.quickLinks": "Anderswo",
    "contact.respondFastest": "Ich antworte am schnellsten per E-Mail.",
    "contact.email": "E-Mail",
    "contact.location": "Standort",
    "contact.sendMessage": "Nachricht senden",
    "contact.name": "Name",
    "contact.subject": "Betreff",
    "contact.message": "Nachricht",
    "contact.namePlaceholder": "Dein Name",
    "contact.emailPlaceholder": "deine@email.de",
    "contact.subjectPlaceholder": "Worum geht es?",
    "contact.messagePlaceholder": "Deine Nachricht...",
    "contact.sending": "Wird gesendet...",
    "contact.successMessage": "Gesendet. Ich melde mich innerhalb eines Tages — meist schneller.",
    "contact.errorFallback": "Das hat nicht geklappt. Schreib mir stattdessen direkt per E-Mail.",
    "contact.downloadCv": "Lebenslauf",

    // Footer
    "footer.backToTop": "Nach oben",
    "footer.localTime": "Ortszeit",
    "footer.menu": "Menü",
    "footer.connect": "Vernetzen",

    // Noir home
    "nav.work": "Projekte",
    "nav.now": "Jetzt",
    "home.role": "KI-Entwickler",
    "home.tagline": "Ich baue RAG-Systeme und Enterprise-Chatbots, die wirklich genutzt werden.",
    "home.status": "Gerade live: Rüko GPT",
    "home.scroll": "Scrollen",
    "home.selectedWork": "Ausgewählte Arbeiten",
    "home.viewCase": "Fallstudie ansehen",
    "home.aboutLabel": "Über mich",
    "home.aboutStatement": "Ich verwandle unübersichtliche, undokumentierte Probleme in funktionierende Software — RAG-Systeme mit täglichen Nutzern, Agenten, die der Produktion standhalten, und Oberflächen, die kein Handbuch brauchen.",
    "home.moreAbout": "Mehr über mich",
    "home.metricYears": "Jahre Erfahrung",
    "home.metricUsers": "Interne Nutzer",
    "home.metricAutomation": "Tier-1 automatisiert",
    "home.metricFaster": "Schnellere Antworten",

    // Capabilities strip
    "home.capabilitiesLabel": "Was ich mache",
    "home.cap1.title": "RAG- & Multi-Agent-Systeme",
    "home.cap1.desc":
      "Retrieval-Pipelines und Agenten-Teams auf Basis echter Daten — gebaut für die Produktion, gemessen per Evaluation.",
    "home.cap2.title": "Full-Stack-Produkte",
    "home.cap2.desc":
      "Vom Schema bis zur Oberfläche: Next.js-, TypeScript- und Python-Anwendungen im täglichen Einsatz.",
    "home.cap3.title": "Automatisierung & Integrationen",
    "home.cap3.desc":
      "Bots und APIs dort, wo bereits gearbeitet wird — Teams, interne Tools, bestehende Systeme.",
    "home.capTerm1": "RAG-Systeme",
    "home.capTerm2": "Multi-Agent",
    "home.capTerm3": "Full-Stack",
    "home.capTerm4": "Automatisierung",
    "home.capTerm5": "Retrieval",
    "home.capTerm6": "Evaluation",

    // About page
    "aboutPage.label": "Über mich",
    "aboutPage.statement": "Ich verwandle unübersichtliche Probleme in Werkzeuge, auf die man sich verlässt.",
    "aboutPage.experienceLabel": "Erfahrung",
    "aboutPage.educationLabel": "Ausbildung",
    "aboutPage.languagesLabel": "Sprachen",
    "aboutPage.skillsLabel": "Fähigkeiten",
    "aboutPage.cta": "Lass uns zusammenarbeiten",

    // Case studies
    "work.problem": "Problem",
    "work.approach": "Ansatz",
    "work.result": "Ergebnis",
    "work.next": "Nächstes Projekt",
    "work.back": "Alle Projekte",
    "work.year": "Jahr",
    "work.role": "Rolle",
    "work.client": "Kunde",
    "work.stack": "Stack",
  },
} satisfies Record<Language, Record<string, string>>;

// Export translations for use in API routes
export { translations };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "hv-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Restore the saved preference after hydration (SSR always renders EN,
  // so reading localStorage in the initializer would mismatch).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "de") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLanguage("de");
      }
    } catch {
      // Storage unavailable — stay with the default.
    }
  }, []);

  // Keep assistive tech and persistence in sync with the active language.
  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Storage unavailable — language just won't persist.
    }
  }, [language]);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[language][key] || key;
    },
    [language]
  );

  const value = useMemo<LanguageContextType>(
    () => ({ language, setLanguage, t }),
    [language, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
