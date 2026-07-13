// Case-study content for /work/[slug] and the home work list.
// Long-form, localized (EN/DE). Kept separate from portfolioData.ts so the
// chatbot context stays lean. All numbers here come from the shipped products.

export type Localized<T = string> = { en: T; de: T };

export interface CaseMediaItem {
  src: string;
  alt: Localized;
  /** Use contain for portrait or UI captures that should never be cropped. */
  fit?: "cover" | "contain";
  /** Rendered as a label-mono figure caption. */
  caption?: Localized;
}

export interface CaseMediaSection {
  /** "full" = full-bleed break · "duo" = 2-up grid · "figure" = captioned single */
  layout: "full" | "duo" | "figure";
  /** Which prose chapter this renders after. */
  after: "problem" | "approach" | "result";
  /** 1 item for full/figure, 2 for duo. */
  items: CaseMediaItem[];
}

export interface CaseStudy {
  slug:
    | "studyos"
    | "ember"
    | "marq"
    | "teams-bot"
    | "machinery-ai"
    | "harshal-hand";
  index: string; // "01"…"06"
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
  hero: { src: string; alt: Localized; fit?: "cover" | "contain" };
  /** Optional in-flow visuals; absent → the page renders prose-only. */
  media?: CaseMediaSection[];
  links?: {
    live?: string;
    repo?: string;
    download?: string;
    reference?: string;
  };
  nextSlug: CaseStudy["slug"];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "studyos",
    index: "01",
    title: "StudyOS",
    year: "2026",
    client: "Harshal Vankudre",
    role: { en: "Product Engineer", de: "Produktentwickler" },
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "AI SDK",
      "Clerk",
      "Stripe",
    ],
    oneLiner: {
      en: "An AI-native study workspace that turns one sentence about a semester into structured courses, assignments, planners and reading lists — ready in seconds.",
      de: "Ein KI-nativer Lern-Workspace, der aus einem Satz über das Semester strukturierte Kurse, Aufgaben, Planer und Leselisten erstellt — in Sekunden einsatzbereit.",
    },
    problem: {
      en: [
        "Students often start a semester by rebuilding the same planning system across notes, calendars and spreadsheets. Generic templates still begin empty, so the setup work arrives before the actual studying can start.",
        "The useful context already exists in a syllabus or a short description of the courses. The product needed to turn that context into editable, structured data instead of another page of generated prose.",
      ],
      de: [
        "Studierende beginnen ein Semester oft damit, dasselbe Planungssystem aus Notizen, Kalendern und Tabellen neu zusammenzubauen. Allgemeine Vorlagen starten trotzdem leer — die Einrichtungsarbeit kommt vor dem eigentlichen Lernen.",
        "Der relevante Kontext steckt bereits im Lehrplan oder in einer kurzen Kursbeschreibung. Das Produkt musste daraus bearbeitbare, strukturierte Daten machen statt nur eine weitere Seite mit generiertem Text.",
      ],
    },
    approach: {
      en: [
        "I built StudyOS as a production Next.js application: a guided prompt becomes typed courses, assignments and readings backed by Prisma and PostgreSQL, then appears immediately in a complete workspace.",
        "The same records power table, board and calendar views. Inline edits autosave, while the built-in assistant can add or update workspace data from plain-language requests without forcing the user through menus.",
        "The product includes authentication, billing, syllabus import, calendar feeds and full localization across ten languages, including right-to-left layout for Arabic.",
      ],
      de: [
        "Ich habe StudyOS als produktive Next.js-Anwendung gebaut: Aus einem geführten Prompt entstehen typisierte Kurse, Aufgaben und Lektüren in Prisma und PostgreSQL, die sofort in einem vollständigen Workspace erscheinen.",
        "Dieselben Datensätze treiben Tabellen-, Board- und Kalenderansicht an. Änderungen speichern automatisch; der integrierte Assistent ergänzt oder aktualisiert Workspace-Daten über natürliche Sprache, ohne Menüsuche.",
        "Das Produkt umfasst Authentifizierung, Abrechnung, Lehrplan-Import, Kalender-Feeds und eine vollständige Lokalisierung in zehn Sprachen — inklusive RTL-Layout für Arabisch.",
      ],
    },
    result: {
      en: [
        "StudyOS is live as an end-to-end SaaS product. Its public product flow demonstrates a complete workspace built in an average of 9.4 seconds, with one data set staying synchronized across three planning views.",
      ],
      de: [
        "StudyOS ist als vollständiges SaaS-Produkt live. Der öffentliche Produkt-Flow zeigt einen kompletten Workspace, der durchschnittlich in 9,4 Sekunden entsteht — mit einem Datensatz, der über drei Planungsansichten synchron bleibt.",
      ],
    },
    metrics: [
      {
        value: "9.4s",
        label: { en: "Average workspace build", de: "Ø Workspace-Erstellung" },
      },
      {
        value: "10",
        label: { en: "Localized languages", de: "Lokalisierte Sprachen" },
      },
      {
        value: "3",
        label: { en: "Views from one data set", de: "Ansichten aus einem Datensatz" },
      },
    ],
    hero: {
      src: "/work/studyos/hero.png",
      alt: {
        en: "StudyOS landing page showing an AI-generated semester workspace",
        de: "StudyOS-Startseite mit einem KI-generierten Semester-Workspace",
      },
    },
    media: [
      {
        layout: "full",
        after: "approach",
        items: [
          {
            src: "/work/studyos/organize.png",
            alt: {
              en: "StudyOS product capabilities for generation, spaced repetition, calendar sync, syllabus import and structured data",
              de: "StudyOS-Funktionen für Generierung, verteilte Wiederholung, Kalendersync, Lehrplan-Import und strukturierte Daten",
            },
          },
        ],
      },
      {
        layout: "figure",
        after: "result",
        items: [
          {
            src: "/work/studyos/ask.png",
            alt: {
              en: "StudyOS assistant adding a weighted midterm to a workspace from a natural-language request",
              de: "StudyOS-Assistent fügt per natürlicher Sprache eine gewichtete Zwischenprüfung zum Workspace hinzu",
            },
            caption: {
              en: "Fig. 03 — A plain-language request becomes a structured database change.",
              de: "Abb. 03 — Eine natürliche Anfrage wird zur strukturierten Datenbankänderung.",
            },
          },
        ],
      },
    ],
    links: {
      live: "https://studyos-mu-henna.vercel.app",
      repo: "https://github.com/HarshalVankudre/StudyOS",
    },
    nextSlug: "ember",
  },
  {
    slug: "ember",
    index: "02",
    title: "Ember",
    year: "2026",
    client: "Harshal Vankudre",
    role: { en: "Desktop Product Engineer", de: "Desktop-Produktentwickler" },
    stack: ["Electron", "JavaScript", "Node.js", "Claude Code", "Codex", "Windows"],
    oneLiner: {
      en: "A privacy-first Windows widget that combines Claude Code and Codex usage, plan limits, tokens and API-equivalent cost in one live view.",
      de: "Ein datenschutzfreundliches Windows-Widget, das Claude-Code- und Codex-Nutzung, Planlimits, Tokens und API-äquivalente Kosten live zusammenführt.",
    },
    problem: {
      en: [
        "Using Claude Code and Codex means watching two different sets of session limits, weekly limits and local logs. The important numbers were fragmented — or invisible until a limit interrupted the work.",
        "A useful tracker also had to respect the local nature of coding sessions. Requiring another account or uploading detailed project activity would defeat the point.",
      ],
      de: [
        "Wer Claude Code und Codex parallel nutzt, hat zwei verschiedene Sätze aus Session-Limits, Wochenlimits und lokalen Logs. Die wichtigen Zahlen waren verteilt — oder unsichtbar, bis ein Limit die Arbeit unterbrach.",
        "Ein sinnvoller Tracker musste außerdem den lokalen Charakter der Coding-Sessions respektieren. Ein weiteres Konto oder das Hochladen detaillierter Projektaktivität kam nicht infrage.",
      ],
    },
    approach: {
      en: [
        "I merged two earlier single-provider widgets into Ember, one Electron desktop product that reads both providers' local session data and refreshes the interface every second.",
        "Each provider is priced with its own billing rules before totals are combined. The UI exposes plan meters, reset countdowns, model filters, daily spend, cache behavior and durable project history without double-counting reasoning tokens.",
        "Everything is read-only and local: no Ember account, no telemetry and no session upload. The app ships as both a one-click Windows installer and a portable executable.",
      ],
      de: [
        "Ich habe zwei frühere Ein-Anbieter-Widgets in Ember zusammengeführt: ein Electron-Desktopprodukt, das lokale Session-Daten beider Anbieter liest und die Oberfläche jede Sekunde aktualisiert.",
        "Jeder Anbieter wird zunächst nach seinen eigenen Abrechnungsregeln berechnet. Die Oberfläche zeigt Planlimits, Reset-Countdowns, Modellfilter, Tageskosten, Cache-Verhalten und dauerhafte Projektverläufe, ohne Reasoning-Tokens doppelt zu zählen.",
        "Alles bleibt lokal und schreibgeschützt: kein Ember-Konto, keine Telemetrie, kein Upload von Sessions. Die App erscheint als Ein-Klick-Installer und als portable Windows-Datei.",
      ],
    },
    result: {
      en: [
        "Ember turns two opaque usage systems into one glanceable desktop instrument. It ships through GitHub Releases and keeps the numbers useful even after original session logs have been deleted.",
      ],
      de: [
        "Ember macht aus zwei undurchsichtigen Nutzungssystemen ein Desktop-Instrument, das auf einen Blick verständlich ist. Die App wird über GitHub Releases ausgeliefert und behält die Historie, selbst wenn ursprüngliche Session-Logs gelöscht wurden.",
      ],
    },
    metrics: [
      { value: "2", label: { en: "Providers in one view", de: "Anbieter in einer Ansicht" } },
      { value: "1s", label: { en: "Live refresh interval", de: "Live-Aktualisierung" } },
      { value: "0", label: { en: "Accounts or telemetry", de: "Konten oder Telemetrie" } },
    ],
    hero: {
      src: "/work/ember/hero.png",
      fit: "contain",
      alt: {
        en: "Ember desktop widget with Claude and Codex limits, costs and token statistics",
        de: "Ember-Desktop-Widget mit Claude- und Codex-Limits, Kosten und Token-Statistiken",
      },
    },
    links: {
      download: "https://github.com/HarshalVankudre/Ember-usage-widget/releases/latest",
      repo: "https://github.com/HarshalVankudre/Ember-usage-widget",
    },
    nextSlug: "marq",
  },
  {
    slug: "marq",
    index: "03",
    title: "Marq",
    year: "2026",
    client: "Harshal Vankudre",
    role: { en: "Windows Desktop Engineer", de: "Windows-Desktop-Entwickler" },
    stack: ["Rust", "Tauri", "comrak", "syntect", "HTML", "CSS"],
    oneLiner: {
      en: "A native Windows Markdown reader that opens instantly, typesets documents like a book and exports print-ready PDFs with one keystroke.",
      de: "Ein nativer Markdown-Reader für Windows, der sofort öffnet, Dokumente wie ein Buch setzt und per Tastendruck druckfertige PDFs exportiert.",
    },
    problem: {
      en: [
        "Markdown files are pleasant to write but often disappointing to read. Opening one usually means raw text, a full editor, or a browser preview that feels temporary rather than finished.",
        "The ideal reader had to feel native: launch instantly from Explorer, stay out of the way, render the complete Markdown surface safely and export without browser chrome.",
      ],
      de: [
        "Markdown-Dateien lassen sich angenehm schreiben, aber oft enttäuschend lesen. Beim Öffnen landet man meist in Rohtext, einem vollständigen Editor oder einer Browser-Vorschau, die unfertig wirkt.",
        "Der ideale Reader musste sich nativ anfühlen: sofort aus dem Explorer starten, unauffällig bleiben, die gesamte Markdown-Oberfläche sicher darstellen und ohne Browser-Rahmen exportieren.",
      ],
    },
    approach: {
      en: [
        "I built Marq as a small Rust and Tauri application. comrak handles GitHub-flavored Markdown, syntect provides native syntax highlighting, and sanitized rendering blocks scripts and unsafe embeds.",
        "A tray-resident process makes repeated opens immediate. File changes re-render in about 200 ms while preserving scroll position, and Windows file association turns a double-click on any .md file into the complete reading experience.",
        "The same rendering pipeline powers interactive reading and headless PDF export, including embedded fonts, highlighted code and predictable A4 output.",
      ],
      de: [
        "Ich habe Marq als kleine Rust- und Tauri-Anwendung gebaut. comrak verarbeitet GitHub-Flavored Markdown, syntect liefert natives Syntax-Highlighting und die bereinigte Darstellung blockiert Skripte und unsichere Einbettungen.",
        "Ein Prozess im Infobereich macht wiederholtes Öffnen sofort möglich. Dateiänderungen werden in etwa 200 ms neu gerendert, die Scrollposition bleibt erhalten, und die Windows-Dateizuordnung macht den Doppelklick auf jede .md-Datei zum vollständigen Leseerlebnis.",
        "Dieselbe Rendering-Pipeline treibt interaktives Lesen und den headless PDF-Export an — mit eingebetteten Schriften, hervorgehobenem Code und reproduzierbarem A4-Layout.",
      ],
    },
    result: {
      en: [
        "Marq ships as a 2.3 MB Windows installer and a 7.5 MB application. When parked in the tray it releases the renderer and settles at roughly 33 MB, while remaining ready for the next Markdown file.",
      ],
      de: [
        "Marq wird als 2,3-MB-Windows-Installer und 7,5-MB-Anwendung ausgeliefert. Im Infobereich gibt die App den Renderer frei und liegt bei ungefähr 33 MB — bereit für die nächste Markdown-Datei.",
      ],
    },
    metrics: [
      { value: "7.5 MB", label: { en: "Installed application", de: "Installierte Anwendung" } },
      { value: "2.3 MB", label: { en: "Windows installer", de: "Windows-Installer" } },
      { value: "~33 MB", label: { en: "Parked memory", de: "Speicher im Ruhezustand" } },
    ],
    hero: {
      src: "/work/marq/hero.png",
      alt: {
        en: "Marq rendering a Markdown showcase in its dark reading theme",
        de: "Marq zeigt ein Markdown-Dokument im dunklen Lesethema",
      },
    },
    media: [
      {
        layout: "full",
        after: "approach",
        items: [
          {
            src: "/work/marq/light.png",
            alt: {
              en: "Marq light theme with typeset text, emoji and Rust syntax highlighting",
              de: "Marq im hellen Thema mit gesetztem Text, Emoji und Rust-Syntax-Highlighting",
            },
          },
        ],
      },
    ],
    links: {
      download: "https://github.com/HarshalVankudre/marq/releases/latest",
      repo: "https://github.com/HarshalVankudre/marq",
    },
    nextSlug: "teams-bot",
  },
  {
    slug: "teams-bot",
    index: "04",
    title: "Teams-BOT",
    year: "2025 — 2026",
    client: "RÜKO GmbH Baumaschinen",
    role: { en: "AI Developer", de: "KI-Entwickler" },
    stack: ["FastAPI", "LangGraph", "Gemini", "PostgreSQL", "Pinecone", "Redis"],
    oneLiner: {
      en: "A German-language equipment assistant inside Microsoft Teams that combines inventory lookup, document retrieval and advisory planning in one service.",
      de: "Ein deutschsprachiger Geräteassistent in Microsoft Teams, der Bestandssuche, Dokumenten-Retrieval und Projektberatung in einem Dienst verbindet.",
    },
    problem: {
      en: [
        "Equipment data for thousands of construction machines was split between structured inventory, manuals and specialist knowledge. Answering a field question meant switching tools, knowing the database, or finding the right colleague.",
        "Employees already worked in Microsoft Teams, so the answer needed to arrive in the conversation — with the system choosing the right knowledge path behind the scenes.",
      ],
      de: [
        "Gerätedaten für Tausende Baumaschinen waren auf strukturierten Bestand, Handbücher und Spezialwissen verteilt. Eine Frage aus dem Feld zu beantworten bedeutete Tool-Wechsel, Datenbankwissen oder die Suche nach der richtigen Person.",
        "Die Mitarbeitenden arbeiteten bereits in Microsoft Teams. Die Antwort musste deshalb direkt im Gespräch ankommen — während das System im Hintergrund den passenden Wissenspfad auswählt.",
      ],
    },
    approach: {
      en: [
        "I built a FastAPI service around the Teams webhook and used LangGraph to route each request to the right capability: PostgreSQL inventory lookup, Pinecone retrieval over manuals, or Gemini-based advisory planning.",
        "The orchestration keeps structured facts and document evidence separate until answer composition. Redis preserves per-thread context when available, while health, reset and admin surfaces make the service operable beyond the happy path.",
        "The result is one deployable backend for direct equipment queries and open-ended project recommendations, rather than a collection of disconnected demos.",
      ],
      de: [
        "Ich habe einen FastAPI-Dienst um den Teams-Webhook gebaut und LangGraph genutzt, um jede Anfrage an die passende Fähigkeit zu leiten: PostgreSQL-Bestandssuche, Pinecone-Retrieval über Handbücher oder Gemini-basierte Projektberatung.",
        "Die Orchestrierung hält strukturierte Fakten und Dokumentbelege bis zur Antwortgenerierung getrennt. Redis speichert bei Verfügbarkeit den Kontext pro Thread; Health-, Reset- und Admin-Oberflächen machen den Dienst auch jenseits des Idealpfads betreibbar.",
        "So entstand ein deploybares Backend für direkte Gerätefragen und offene Projektempfehlungen statt einer Sammlung unverbundener Demos.",
      ],
    },
    result: {
      en: [
        "Equipment knowledge covering 2,395+ indexed records is available from the Teams conversation employees already use. The same assistant can move from an exact machine lookup to supporting documents or a broader advisory request without changing tools.",
      ],
      de: [
        "Gerätewissen aus 2.395+ indexierten Datensätzen ist direkt im gewohnten Teams-Gespräch verfügbar. Derselbe Assistent wechselt von der exakten Maschinensuche zu passenden Dokumenten oder einer breiteren Beratungsanfrage — ohne Tool-Wechsel.",
      ],
    },
    metrics: [
      { value: "2,395+", label: { en: "Equipment records indexed", de: "Indexierte Gerätedatensätze" } },
      { value: "3", label: { en: "Connected knowledge paths", de: "Verbundene Wissenspfade" } },
      { value: "1", label: { en: "Teams conversation surface", de: "Teams-Gesprächsoberfläche" } },
    ],
    hero: {
      src: "/work/teams-bot/hero.svg",
      alt: {
        en: "Teams-BOT answering an equipment question with an orchestration trace",
        de: "Teams-BOT beantwortet eine Gerätefrage mit Orchestrierungs-Trace",
      },
    },
    media: [
      {
        layout: "full",
        after: "approach",
        items: [
          {
            src: "/work/teams-bot/detail-01.svg",
            alt: {
              en: "Teams-BOT routing an equipment question through specialist retrieval capabilities",
              de: "Teams-BOT leitet eine Gerätefrage durch spezialisierte Retrieval-Fähigkeiten",
            },
          },
        ],
      },
      {
        layout: "figure",
        after: "result",
        items: [
          {
            src: "/work/teams-bot/detail-02.svg",
            alt: {
              en: "Teams-BOT execution lanes and outcome figures",
              de: "Ausführungswege und Ergebniszahlen des Teams-BOT",
            },
            caption: {
              en: "Fig. 03 — One Teams message can draw on structured records and retrieved context.",
              de: "Abb. 03 — Eine Teams-Nachricht greift auf strukturierte Datensätze und Retrieval-Kontext zu.",
            },
          },
        ],
      },
    ],
    links: {
      repo: "https://github.com/HarshalVankudre/Teams-BOT",
      reference: "/rueko-arbeitszeugnis.pdf",
    },
    nextSlug: "machinery-ai",
  },
  {
    slug: "machinery-ai",
    index: "05",
    title: "Machinery AI",
    year: "2026",
    client: "Open-source product",
    role: { en: "AI Product Engineer", de: "KI-Produktentwickler" },
    stack: ["FastAPI", "React", "TypeScript", "Weaviate", "MongoDB", "Docker"],
    oneLiner: {
      en: "An enterprise-ready RAG support system that turns machinery manuals, tables and images into secure, source-backed answers with a complete admin and observability layer.",
      de: "Ein unternehmenstaugliches RAG-Supportsystem, das Maschinenhandbücher, Tabellen und Bilder in sichere, quellenbasierte Antworten überführt — inklusive Admin- und Observability-Ebene.",
    },
    problem: {
      en: [
        "Technical support knowledge lives across manuals, scanned pages, tables and the memories of specialists. Keyword search alone misses the relationship between a symptom, a component and the right procedure, while a generic chatbot cannot show where an answer came from.",
        "For an enterprise workflow, retrieval quality was only half the problem. The system also needed controlled access, isolated user data, document operations and enough telemetry to diagnose a weak answer in production.",
      ],
      de: [
        "Wissen für den technischen Support steckt in Handbüchern, gescannten Seiten, Tabellen und den Köpfen von Fachleuten. Reine Stichwortsuche übersieht den Zusammenhang zwischen Symptom, Bauteil und passender Anleitung; ein allgemeiner Chatbot kann zudem keine belastbare Quelle nennen.",
        "Für einen Unternehmens-Workflow war die Retrieval-Qualität nur die halbe Aufgabe. Das System brauchte außerdem geregelte Zugriffe, isolierte Nutzerdaten, Dokumentenverwaltung und genug Telemetrie, um schwache Antworten im Betrieb nachvollziehen zu können.",
      ],
    },
    approach: {
      en: [
        "I built a React and TypeScript workspace around a FastAPI backend, with server-sent events for responsive chat and dedicated surfaces for documents, profiles and administration.",
        "The ingestion pipeline accepts PDF, DOCX, PPTX, XLSX, JPG and PNG files, then combines OCR, table extraction, semantic chunking and metadata enrichment. At query time, Weaviate blends vector and BM25 search before Cohere reranking and context compression; every composed answer retains source attribution.",
        "Argon2 password hashing, JWT sessions, email verification, role-based access and Weaviate multi-tenancy protect the workflow. Docker Compose, Prometheus, Grafana, Sentry and structured logs make the complete system operable instead of leaving it as a retrieval demo.",
      ],
      de: [
        "Ich habe einen React- und TypeScript-Workspace um ein FastAPI-Backend gebaut — mit Server-Sent Events für reaktionsschnellen Chat und eigenen Oberflächen für Dokumente, Profile und Administration.",
        "Die Ingestion-Pipeline verarbeitet PDF, DOCX, PPTX, XLSX, JPG und PNG und kombiniert OCR, Tabellenextraktion, semantisches Chunking und Metadaten-Anreicherung. Bei einer Anfrage verbindet Weaviate Vektor- und BM25-Suche, bevor Cohere-Reranking und Kontextkompression greifen; jede Antwort behält ihre Quellenangaben.",
        "Argon2-Passworthashing, JWT-Sitzungen, E-Mail-Verifizierung, rollenbasierter Zugriff und Weaviate-Mandantentrennung sichern den Workflow. Docker Compose, Prometheus, Grafana, Sentry und strukturierte Logs machen aus dem Retrieval-Prototyp ein betreibbares Gesamtsystem.",
      ],
    },
    result: {
      en: [
        "The repository delivers a container-ready support platform spanning streaming chat, document intelligence, authentication, admin workflows and monitoring. It demonstrates how a serious RAG product is assembled around retrieval — not just how to call a model with a few chunks.",
      ],
      de: [
        "Das Repository liefert eine containerfähige Supportplattform mit Streaming-Chat, Dokumentenintelligenz, Authentifizierung, Admin-Workflows und Monitoring. Es zeigt, wie ein belastbares RAG-Produkt rund um Retrieval entsteht — nicht nur, wie ein Modell einige Chunks erhält.",
      ],
    },
    metrics: [
      { value: "2", label: { en: "Retrieval modes", de: "Retrieval-Modi" } },
      { value: "6", label: { en: "Document formats", de: "Dokumentformate" } },
      { value: "3", label: { en: "Access roles", de: "Zugriffsrollen" } },
    ],
    hero: {
      src: "/work/machinery-ai/hero.svg",
      fit: "contain",
      alt: {
        en: "Machinery AI support conversation beside a transparent RAG execution trace",
        de: "Machinery-AI-Supportgespräch neben einem transparenten RAG-Ausführungs-Trace",
      },
    },
    media: [
      {
        layout: "full",
        after: "approach",
        items: [
          {
            src: "/work/machinery-ai/architecture.svg",
            fit: "contain",
            alt: {
              en: "Machinery AI architecture from document ingestion through hybrid retrieval to a source-backed answer",
              de: "Machinery-AI-Architektur von der Dokumentenaufnahme über hybrides Retrieval bis zur quellenbasierten Antwort",
            },
          },
        ],
      },
    ],
    links: {
      repo: "https://github.com/HarshalVankudre/Baumachschinen-KI-Chatbot",
    },
    nextSlug: "harshal-hand",
  },
  {
    slug: "harshal-hand",
    index: "06",
    title: "Harshal Hand",
    year: "2026",
    client: "Harshal Vankudre",
    role: { en: "Typeface Designer", de: "Schriftdesigner" },
    stack: ["TrueType", "CSS @font-face", "Typography", "Web & Desktop"],
    oneLiner: {
      en: "A 19 KB TrueType font that turns Harshal's real handwriting into a warm, reusable typeface for websites, documents and design tools.",
      de: "Eine 19 KB große TrueType-Schrift, die Harshals echte Handschrift in eine warme, wiederverwendbare Schrift für Websites, Dokumente und Design-Tools verwandelt.",
    },
    problem: {
      en: [
        "Handwritten notes carry a character that standard script fonts usually polish away. The challenge was to preserve the uneven rhythm and recognizable forms of one person's writing while making every character reusable and consistent enough for digital composition.",
        "The result also needed to travel easily: one small file that works in a browser, installs on a desktop and can be selected inside common design tools.",
      ],
      de: [
        "Handschriftliche Notizen haben einen Charakter, den Standardschriften meist glattbügeln. Die Aufgabe bestand darin, den unregelmäßigen Rhythmus und die wiedererkennbaren Formen einer persönlichen Handschrift zu bewahren und zugleich jedes Zeichen digital wiederverwendbar zu machen.",
        "Das Ergebnis musste außerdem leicht mitkommen: eine kleine Datei, die im Browser funktioniert, sich auf dem Desktop installieren lässt und in gängigen Design-Tools auswählbar ist.",
      ],
    },
    approach: {
      en: [
        "I digitized the uppercase alphabet, lowercase alphabet and numerals from my own handwriting, keeping the human variation visible instead of forcing every stroke into a geometric system.",
        "The complete character set is packaged as a 19 KB TrueType file. A documented CSS @font-face path covers web use, while the same file installs directly into Windows, creative applications and document workflows.",
        "A specimen sheet tests the full alphabet, digits and pangrams together, making spacing, scale and the voice of the typeface visible before download.",
      ],
      de: [
        "Ich habe Großbuchstaben, Kleinbuchstaben und Ziffern aus meiner eigenen Handschrift digitalisiert und die menschlichen Abweichungen sichtbar gelassen, statt jeden Strich in ein geometrisches System zu zwingen.",
        "Der vollständige Zeichensatz steckt in einer 19 KB großen TrueType-Datei. Ein dokumentierter CSS-@font-face-Weg deckt die Web-Nutzung ab; dieselbe Datei lässt sich direkt unter Windows, in Kreativprogrammen und Dokument-Workflows installieren.",
        "Ein Schriftmuster prüft Alphabet, Ziffern und Pangramme gemeinsam und macht Abstände, Größenwirkung und die Stimme der Schrift schon vor dem Download sichtbar.",
      ],
    },
    result: {
      en: [
        "Harshal Hand turns a personal visual signature into a practical digital asset: 62 letter and number glyphs, one lightweight file and the same recognizable voice across web and desktop use.",
      ],
      de: [
        "Harshal Hand macht aus einer persönlichen visuellen Signatur ein praktisches digitales Asset: 62 Buchstaben- und Zahlzeichen, eine kompakte Datei und dieselbe erkennbare Stimme in Web- und Desktop-Anwendungen.",
      ],
    },
    metrics: [
      { value: "62", label: { en: "Letter & number glyphs", de: "Buchstaben & Ziffern" } },
      { value: "19 KB", label: { en: "TrueType file", de: "TrueType-Datei" } },
      { value: "2", label: { en: "Web & desktop modes", de: "Web- & Desktop-Modi" } },
    ],
    hero: {
      src: "/work/harshal-hand/preview.png",
      fit: "contain",
      alt: {
        en: "Harshal Hand specimen with handwritten alphabets, numerals and pangrams",
        de: "Harshal-Hand-Schriftmuster mit handgeschriebenen Alphabeten, Ziffern und Pangrammen",
      },
    },
    media: [
      {
        layout: "figure",
        after: "approach",
        items: [
          {
            src: "/work/harshal-hand/banner.png",
            fit: "contain",
            alt: {
              en: "Complete Harshal Hand type specimen on ruled paper",
              de: "Vollständiges Harshal-Hand-Schriftmuster auf liniertem Papier",
            },
            caption: {
              en: "Fig. 02 — One personal hand, translated into a reusable digital character set.",
              de: "Abb. 02 — Eine persönliche Handschrift, übersetzt in einen wiederverwendbaren digitalen Zeichensatz.",
            },
          },
        ],
      },
    ],
    links: {
      download: "https://raw.githubusercontent.com/HarshalVankudre/harshal-hand-font/main/HarshalHand-Regular.ttf",
      repo: "https://github.com/HarshalVankudre/harshal-hand-font",
    },
    nextSlug: "studyos",
  },
];

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((caseStudy) => caseStudy.slug === slug);
