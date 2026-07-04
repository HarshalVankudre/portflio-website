import type { Metadata } from "next";
import AboutView from "@/components/about/AboutView";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vankudre.com";

const DESCRIPTION =
  "Who Harshal Vankudre is — working on AI in cyber security at Mercedes-Benz Tech Innovation, Data Science student at Hochschule Karlsruhe, builder of RAG systems and enterprise chatbots.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: {
    canonical: "/about",
    languages: {
      en: "/about",
      de: "/about?lang=de",
      "x-default": "/about",
    },
  },
  openGraph: {
    title: "About | Harshal Vankudre",
    description: DESCRIPTION,
    url: `${SITE_URL}/about`,
    type: "profile",
  },
};

export default function AboutPage() {
  return <AboutView />;
}
