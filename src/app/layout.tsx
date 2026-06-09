import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, Geist_Mono } from "next/font/google";
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
  axes: ["opsz", "SOFT", "WONK"],
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
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Harshal Vankudre | AI Developer",
    template: "%s | Harshal Vankudre",
  },
  description:
    "Portfolio of Harshal Vankudre — AI Developer building enterprise RAG systems, multi-agent chatbots, and modern web products with Python, Next.js, and OpenAI. Based in Karlsruhe, Germany.",
  keywords: [
    "AI Developer",
    "Software Engineer",
    "Portfolio",
    "Harshal Vankudre",
    "Machine Learning",
    "RAG",
    "Chatbot",
    "Next.js",
    "Python",
    "Karlsruhe",
    "Germany",
  ],
  authors: [{ name: "Harshal Vankudre", url: SITE_URL }],
  creator: "Harshal Vankudre",
  manifest: "/manifest.json",
  alternates: {
    canonical: "/",
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
  jobTitle: "AI Developer",
  worksFor: {
    "@type": "Organization",
    name: "RÜKO GmbH Baumaschinen",
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
    "Full-Stack Development",
    "Python",
    "TypeScript",
    "Next.js",
    "OpenAI API",
  ],
  knowsLanguage: ["English", "German"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${instrumentSans.variable} ${geistMono.variable} ${fraunces.variable} font-sans antialiased`}
      >
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
      </body>
    </html>
  );
}
