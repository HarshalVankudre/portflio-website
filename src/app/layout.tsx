import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import SwRegistrar from "@/components/SwRegistrar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vankudre.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#faf9f5",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Harshal Vankudre | AI Engineer",
    template: "%s | Harshal Vankudre",
  },
  description:
    "AI engineer in Karlsruhe, Germany. Internal AI tools built end to end — RAG assistants, Teams bots and the pipelines behind them. Working student at Mercedes-Benz Tech Innovation.",
  keywords: [
    "AI Engineer",
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
  // favicon.ico is served by the app/favicon.ico file convention — listing it
  // here too produced duplicate <link rel="icon"> tags.
  icons: {
    icon: [
      { url: "/favicon.svg?v=hv3", type: "image/svg+xml" },
      { url: "/icon-192.png?v=hv3", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png?v=hv3", sizes: "192x192", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Harshal Vankudre | AI Engineer",
    description:
      "AI engineer in Karlsruhe, Germany. Internal AI tools built end to end — RAG assistants, Teams bots and the pipelines behind them. Working student at Mercedes-Benz Tech Innovation.",
    url: SITE_URL,
    siteName: "Harshal Vankudre",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshal Vankudre | AI Engineer",
    description:
      "AI engineer in Karlsruhe, Germany. Internal AI tools built end to end — RAG assistants, Teams bots and the pipelines behind them. Working student at Mercedes-Benz Tech Innovation.",
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
  jobTitle: "AI Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Mercedes-Benz Tech Innovation",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Karlsruhe University of Applied Sciences (HKA)",
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
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Harshal Vankudre — Portfolio",
  url: SITE_URL,
  author: { "@type": "Person", name: "Harshal Vankudre" },
  inLanguage: "en",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${sourceSerif.variable} font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-accent focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widest focus:text-accent-ink"
        >
          Skip to content
        </a>
        {children}
        <SwRegistrar />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
