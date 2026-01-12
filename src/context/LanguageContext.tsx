"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.education": "Education",
    "nav.contact": "Contact",
    "nav.letsTalk": "Let's Talk",

    // Hero
    "hero.location": "Karlsruhe, Germany",
    "hero.role1": "Software Developer",
    "hero.role2": "Business Informatics Student",
    "hero.role3": "Data Enthusiast",
    "hero.role4": "Problem Solver",
    "hero.description": "Ambitious Business Informatics student with fluent German and English. Passionate about software development and data analysis, with hands-on experience in Java, Python, and modern web frameworks.",
    "hero.viewProjects": "View Projects",
    "hero.downloadCV": "Download CV",
    "hero.contact": "Contact",
    "hero.fasterResponses": "Faster Responses",
    "hero.tierAutomated": "Tier-1 Automated",
    "hero.lessManualTime": "Less Manual Time",

    // About
    "about.tag": "About Me",
    "about.title": "Building software with a",
    "about.titleHighlight": "product mindset",
    "about.intro": "I enjoy turning messy problems into clean, usable tools — from internal automation to web apps.",
    "about.summary": "Ambitious Business Informatics student with fluent German and English. Passionate about software development and data analysis, with hands-on experience in Java, Python, and modern web frameworks.",
    "about.chess": "Strategic board games like chess sharpen my analytical and problem-solving skills, which I apply in study and work. Currently based in",
    "about.looking": "I'm looking for opportunities where I can combine software engineering and data analysis to create measurable impact.",
    "about.softwareDev": "Software Development",
    "about.dataAnalysis": "Data Analysis",
    "about.languages": "German & English Fluent",
    "about.problemSolving": "Problem Solving",
    "about.yearsExp": "Years of Experience",

    // Skills
    "skills.tag": "Technical Expertise",
    "skills.title": "Tools I like to",
    "skills.titleHighlight": "Use",
    "skills.subtitle": "A mix of software engineering, data, and AI tooling.",
    "skills.languages": "Languages & Core",
    "skills.frameworks": "Frameworks & Web",
    "skills.databases": "Databases",
    "skills.cloud": "Cloud & DevOps",
    "skills.ai": "AI & LLM Tooling",
    "skills.tools": "Work Tools",

    // Experience
    "experience.tag": "Career Journey",
    "experience.title": "Work &",
    "experience.titleHighlight": "Impact",
    "experience.subtitle": "A quick snapshot of roles and projects from my CV.",
    "experience.current": "Current",
    // RÜKO
    "exp.ruko.role": "AI Developer",
    "exp.ruko.h1": "Designing and building 'Rüko GPT' - an internal AI chatbot for querying company data",
    "exp.ruko.h2": "Full-stack development with Next.js, TypeScript, Prisma, and PostgreSQL",
    "exp.ruko.h3": "Integrating the OpenAI API for intelligent responses",
    "exp.ruko.h4": "Implementing user authentication with NextAuth.js/route.ts",
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

    // Projects
    "projects.tag": "Featured Work",
    "projects.title": "Selected",
    "projects.titleHighlight": "Work",
    "projects.subtitle": "Featured projects from my CV, plus a live list on GitHub.",
    "projects.recentGithub": "Recent on GitHub",
    "projects.viewProfile": "View Full Profile",
    "projects.code": "Code",
    "projects.live": "Live",
    "proj.chatbot.title": "Baumaschinen KI-Chatbot",
    "proj.chatbot.desc": "Enterprise-grade AI chatbot for construction machinery support. Features RAG with document processing, OpenAI integration, and comprehensive analytics.",
    "proj.teams.title": "Teams-BOT",
    "proj.teams.desc": "Multi-agent AI bot for Microsoft Teams with equipment database. Features parallel agent execution, 2,395+ construction equipment records, and cloud-native deployment.",
    "proj.course.title": "CourseViewer",
    "proj.course.desc": "A modern course viewing application built with JavaScript. Clean UI for browsing and managing educational content.",

    // Education
    "education.tag": "Academic Background",
    "education.title": "Academic",
    "education.titleHighlight": "Background",
    "education.subtitle": "Study focus and foundations.",
    "education.current": "Current",
    "edu.hka.degree": "Business Informatics (BSc)",
    "edu.hka.h1": "Focus areas: software engineering, databases, and business applications",
    "edu.hka.h2": "Hands-on coursework in Java, Python, data analysis, and agile methods (Scrum)",
    "edu.htwg.degree": "Studienkolleg",
    "edu.htwg.h1": "Foundation in CS, math, German, economics, and law",

    // Contact
    "contact.tag": "Get In Touch",
    "contact.title": "Let's build something",
    "contact.titleHighlight": "together",
    "contact.quickLinks": "Quick Links",
    "contact.respondFastest": "I usually respond fastest on email.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "contact.sendMessage": "Send a Message",
    "contact.formSubtitle": "Fill out the form and I'll get back to you soon.",
    "contact.name": "Name",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.namePlaceholder": "Your name",
    "contact.emailPlaceholder": "your@email.com",
    "contact.subjectPlaceholder": "What's this about?",
    "contact.messagePlaceholder": "Your message...",
    "contact.sending": "Sending...",
    "contact.successMessage": "Message sent successfully!",

    // Footer
    "footer.backToTop": "Back to Top",
  },
  de: {
    // Navbar
    "nav.home": "Start",
    "nav.about": "Über mich",
    "nav.skills": "Fähigkeiten",
    "nav.experience": "Erfahrung",
    "nav.projects": "Projekte",
    "nav.education": "Ausbildung",
    "nav.contact": "Kontakt",
    "nav.letsTalk": "Kontakt",

    // Hero
    "hero.location": "Karlsruhe, Deutschland",
    "hero.role1": "Softwareentwickler",
    "hero.role2": "Wirtschaftsinformatik-Student",
    "hero.role3": "Daten-Enthusiast",
    "hero.role4": "Problemlöser",
    "hero.description": "Ambitionierter Wirtschaftsinformatik-Student mit fließenden Deutsch- und Englischkenntnissen. Leidenschaftlich für Softwareentwicklung und Datenanalyse, mit praktischer Erfahrung in Java, Python und modernen Web-Frameworks.",
    "hero.viewProjects": "Projekte ansehen",
    "hero.downloadCV": "Lebenslauf",
    "hero.contact": "Kontakt",
    "hero.fasterResponses": "Schnellere Antworten",
    "hero.tierAutomated": "Tier-1 Automatisiert",
    "hero.lessManualTime": "Weniger manuelle Arbeit",

    // About
    "about.tag": "Über mich",
    "about.title": "Software entwickeln mit",
    "about.titleHighlight": "Produkt-Mindset",
    "about.intro": "Ich verwandle gerne komplexe Probleme in saubere, nutzbare Werkzeuge — von interner Automatisierung bis zu Web-Apps.",
    "about.summary": "Ambitionierter Wirtschaftsinformatik-Student mit fließenden Deutsch- und Englischkenntnissen. Leidenschaftlich für Softwareentwicklung und Datenanalyse, mit praktischer Erfahrung in Java, Python und modernen Web-Frameworks.",
    "about.chess": "Strategische Brettspiele wie Schach schärfen meine analytischen und problemlösenden Fähigkeiten, die ich in Studium und Arbeit anwende. Derzeit wohnhaft in",
    "about.looking": "Ich suche nach Möglichkeiten, Software-Engineering und Datenanalyse zu kombinieren, um messbaren Impact zu schaffen.",
    "about.softwareDev": "Softwareentwicklung",
    "about.dataAnalysis": "Datenanalyse",
    "about.languages": "Deutsch & Englisch fließend",
    "about.problemSolving": "Problemlösung",
    "about.yearsExp": "Jahre Erfahrung",

    // Skills
    "skills.tag": "Technische Expertise",
    "skills.title": "Tools die ich gerne",
    "skills.titleHighlight": "nutze",
    "skills.subtitle": "Eine Mischung aus Software-Engineering, Daten und KI-Tools.",
    "skills.languages": "Sprachen & Core",
    "skills.frameworks": "Frameworks & Web",
    "skills.databases": "Datenbanken",
    "skills.cloud": "Cloud & DevOps",
    "skills.ai": "KI & LLM Tools",
    "skills.tools": "Arbeits-Tools",

    // Experience
    "experience.tag": "Karriereweg",
    "experience.title": "Arbeit &",
    "experience.titleHighlight": "Wirkung",
    "experience.subtitle": "Ein kurzer Überblick über Rollen und Projekte aus meinem Lebenslauf.",
    "experience.current": "Aktuell",
    // RÜKO
    "exp.ruko.role": "KI-Entwickler",
    "exp.ruko.h1": "Entwicklung von 'Rüko GPT' - einem internen KI-Chatbot zur Abfrage von Unternehmensdaten",
    "exp.ruko.h2": "Full-Stack-Entwicklung mit Next.js, TypeScript, Prisma und PostgreSQL",
    "exp.ruko.h3": "Integration der OpenAI API für intelligente Antworten",
    "exp.ruko.h4": "Implementierung der Benutzerauthentifizierung mit NextAuth.js/route.ts",
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

    // Projects
    "projects.tag": "Ausgewählte Arbeiten",
    "projects.title": "Ausgewählte",
    "projects.titleHighlight": "Arbeiten",
    "projects.subtitle": "Ausgewählte Projekte aus meinem Lebenslauf, plus eine Live-Liste auf GitHub.",
    "projects.recentGithub": "Aktuell auf GitHub",
    "projects.viewProfile": "Vollständiges Profil",
    "projects.code": "Code",
    "projects.live": "Live",
    "proj.chatbot.title": "Baumaschinen KI-Chatbot",
    "proj.chatbot.desc": "Enterprise-KI-Chatbot für Baumaschinen-Support. RAG mit Dokumentenverarbeitung, OpenAI-Integration und umfassender Analytik.",
    "proj.teams.title": "Teams-BOT",
    "proj.teams.desc": "Multi-Agent-KI-Bot für Microsoft Teams mit Geräte-Datenbank. Parallele Agent-Ausführung, 2.395+ Baumaschinen-Datensätze und Cloud-Native-Deployment.",
    "proj.course.title": "CourseViewer",
    "proj.course.desc": "Moderne Kurs-Anwendung mit JavaScript. Übersichtliche UI zum Durchsuchen und Verwalten von Lerninhalten.",

    // Education
    "education.tag": "Akademischer Hintergrund",
    "education.title": "Akademischer",
    "education.titleHighlight": "Hintergrund",
    "education.subtitle": "Studienschwerpunkte und Grundlagen.",
    "education.current": "Aktuell",
    "edu.hka.degree": "Wirtschaftsinformatik (BSc)",
    "edu.hka.h1": "Schwerpunkte: Software-Engineering, Datenbanken und Geschäftsanwendungen",
    "edu.hka.h2": "Praktische Kurse in Java, Python, Datenanalyse und agilen Methoden (Scrum)",
    "edu.htwg.degree": "Studienkolleg",
    "edu.htwg.h1": "Grundlagen in Informatik, Mathematik, Deutsch, Wirtschaft und Recht",

    // Contact
    "contact.tag": "Kontakt aufnehmen",
    "contact.title": "Lass uns etwas",
    "contact.titleHighlight": "zusammen bauen",
    "contact.quickLinks": "Schnelllinks",
    "contact.respondFastest": "Ich antworte am schnellsten per E-Mail.",
    "contact.email": "E-Mail",
    "contact.phone": "Telefon",
    "contact.location": "Standort",
    "contact.sendMessage": "Nachricht senden",
    "contact.formSubtitle": "Füllen Sie das Formular aus und ich melde mich bald.",
    "contact.name": "Name",
    "contact.subject": "Betreff",
    "contact.message": "Nachricht",
    "contact.namePlaceholder": "Ihr Name",
    "contact.emailPlaceholder": "ihre@email.de",
    "contact.subjectPlaceholder": "Worum geht es?",
    "contact.messagePlaceholder": "Ihre Nachricht...",
    "contact.sending": "Wird gesendet...",
    "contact.successMessage": "Nachricht erfolgreich gesendet!",

    // Footer
    "footer.backToTop": "Nach oben",
  },
};

// Export translations for use in API routes
export { translations };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
