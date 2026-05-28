import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vankudre.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#FFE500",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Harshal Vankudre | AI Developer & Data Science Student",
    template: "%s | Harshal Vankudre",
  },
  description:
    "Portfolio of Harshal Vankudre — AI Developer specializing in RAG systems, chatbots, and modern web development. Building intelligent solutions with Python, Next.js, and OpenAI.",
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
      "AI Developer & Data Science Student building intelligent systems with Python, Next.js, and OpenAI.",
    url: SITE_URL,
    siteName: "Harshal Vankudre",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshal Vankudre | AI Developer",
    description:
      "AI Developer & Data Science Student building intelligent systems.",
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
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${bricolage.variable} font-sans antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
