import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import TransitionProvider from "@/components/providers/TransitionProvider";
import GradientField from "@/components/effects/GradientField";
import Cursor from "@/components/effects/Cursor";
import Preloader from "@/components/Preloader";
import SwRegistrar from "@/components/SwRegistrar";

const fraunces = Fraunces({
  subsets: ["latin"],
  // opsz for display rendering; true italics for the hero/CTA flourishes.
  // SOFT/WONK were loaded but never used — dropped to cut font bytes.
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-instrument",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vankudre.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#060607",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Harshal Vankudre | AI Developer",
    template: "%s | Harshal Vankudre",
  },
  description:
    "Portfolio of Harshal Vankudre — AI Developer working on AI in cyber security at Mercedes-Benz Tech Innovation. Builder of enterprise RAG systems, multi-agent chatbots, and modern web products with Python, Next.js, and OpenAI. Based in Karlsruhe, Germany.",
  keywords: [
    "AI Developer",
    "Software Engineer",
    "Portfolio",
    "Harshal Vankudre",
    "Machine Learning",
    "RAG",
    "Chatbot",
    "AI Security",
    "Cyber Security",
    "Next.js",
    "Python",
    "Karlsruhe",
    "Stuttgart",
    "Germany",
  ],
  authors: [{ name: "Harshal Vankudre", url: SITE_URL }],
  creator: "Harshal Vankudre",
  manifest: "/manifest.json",
  // favicon.ico is served by the app/favicon.ico file convention — listing it
  // here too produced duplicate <link rel="icon"> tags.
  icons: {
    icon: [
      { url: "/favicon.svg?v=hv2", type: "image/svg+xml" },
      { url: "/icon-192.png?v=hv2", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png?v=hv2", sizes: "192x192", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
    // The UI is fully bilingual (client-side toggle); ?lang= makes each
    // language directly linkable for crawlers and shared links.
    languages: {
      en: "/",
      de: "/?lang=de",
      "x-default": "/",
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HV Portfolio",
  },
  openGraph: {
    title: "Harshal Vankudre | AI Developer",
    description:
      "AI Developer building enterprise RAG systems and intelligent products with Python, Next.js, and OpenAI.",
    url: SITE_URL,
    siteName: "Harshal Vankudre",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshal Vankudre | AI Developer",
    description:
      "AI Developer building enterprise RAG systems and intelligent products.",
    creator: "@HarshalVankudre",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Harshal Vankudre",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  jobTitle: "AI Cyber Security",
  worksFor: {
    "@type": "Organization",
    name: "Mercedes-Benz Tech Innovation",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Hochschule Karlsruhe",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karlsruhe",
    addressCountry: "DE",
  },
  email: "mailto:harshalvankudre@gmail.com",
  sameAs: [
    "https://github.com/HarshalVankudre",
    "https://www.linkedin.com/in/harshal-vankudre/",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Retrieval Augmented Generation",
    "AI Security",
    "Full-Stack Development",
    "Python",
    "TypeScript",
    "Next.js",
    "OpenAI API",
  ],
  knowsLanguage: ["English", "German"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Harshal Vankudre — Portfolio",
  url: SITE_URL,
  author: { "@type": "Person", name: "Harshal Vankudre" },
  inLanguage: ["en", "de"],
};

/* Runs before paint: covers the page on first visit so nothing flashes
   before the React preloader mounts. The .preloading class is removed by
   the Preloader (with a CSS animation failsafe if hydration never runs). */
const preloaderCoverScript = `try{if(!sessionStorage.getItem("portfolio_loaded"))document.documentElement.classList.add("preloading")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the pre-paint cover script (and the language
    // preference) legitimately mutate <html> attributes before/after hydration.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preloaderCoverScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${instrumentSans.variable} ${geistMono.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widest focus:text-accent-ink"
        >
          Skip to content
        </a>
        <LanguageProvider>
          <SmoothScrollProvider>
            <TransitionProvider>
              <GradientField />
              <div className="relative z-10">{children}</div>
              <Preloader />
              <Cursor />
              <SwRegistrar />
            </TransitionProvider>
          </SmoothScrollProvider>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
