import "./globals.css";
import { Inter } from "next/font/google";
import { detectPreferredLanguage } from "@/lib/detectLanguage";
import { DEFAULT_LANGUAGE } from "@/lib/localizedContent";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const metadataBase = new URL("https://harshalvankudre.com");

const METADATA_BY_LANGUAGE = {
  en: {
    title: "Harshal Vankudre | AI Developer & Full-Stack Engineer",
    titleTemplate: "%s | Harshal Vankudre",
    description:
      "Business informatics student and AI developer crafting intelligent products with React, Next.js, Python, and LangChain. Specialized in RAG systems and modern web applications.",
    keywords: ["AI Developer", "Full-Stack Developer", "React", "Next.js", "Python", "LangChain", "RAG", "TypeScript", "Portfolio"],
    openGraphLocale: "en_US",
  },
  de: {
    title: "Harshal Vankudre | KI-Entwickler & Full-Stack Engineer",
    titleTemplate: "%s | Harshal Vankudre",
    description:
      "Wirtschaftsinformatik-Student und KI-Entwickler, der intelligente Produkte mit React, Next.js, Python und LangChain baut. Spezialisiert auf RAG-Systeme und moderne Webanwendungen.",
    keywords: ["KI Entwickler", "Full-Stack Entwickler", "React", "Next.js", "Python", "LangChain", "RAG", "TypeScript", "Portfolio"],
    openGraphLocale: "de_DE",
  },
};

const LANGUAGE_ALTERNATES = {
  en: "/?lang=en",
  de: "/?lang=de",
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Harshal Vankudre",
  jobTitle: "AI Developer & Full-Stack Engineer",
  url: "https://harshalvankudre.com",
  knowsAbout: ["Artificial Intelligence", "React", "Next.js", "Python", "LangChain", "RAG Systems", "TypeScript"],
};

function resolveLanguage() {
  const detected = detectPreferredLanguage();
  return localizedLanguage(detected);
}

function localizedLanguage(language) {
  return METADATA_BY_LANGUAGE[language] ? language : DEFAULT_LANGUAGE;
}

function buildMetadata(language) {
  const copy = METADATA_BY_LANGUAGE[language] || METADATA_BY_LANGUAGE[DEFAULT_LANGUAGE];
  return {
    metadataBase,
    title: {
      default: copy.title,
      template: copy.titleTemplate,
    },
    description: copy.description,
    keywords: copy.keywords,
    authors: [{ name: "Harshal Vankudre" }],
    creator: "Harshal Vankudre",
    openGraph: {
      type: "website",
      locale: copy.openGraphLocale,
      url: metadataBase.href,
      title: copy.title,
      description: copy.description,
      siteName: "Harshal Vankudre Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      languages: LANGUAGE_ALTERNATES,
    },
  };
}

export async function generateMetadata() {
  const language = resolveLanguage();
  return buildMetadata(language);
}

export default function RootLayout({ children }) {
  const language = resolveLanguage();

  return (
    <html lang={language} suppressHydrationWarning className={inter.variable}>
      <head>
        <meta httpEquiv="Content-Language" content={language} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
