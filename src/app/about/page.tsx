import type { Metadata } from "next";
import AboutView from "@/components/about/AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Harshal Vankudre is — AI Developer at RÜKO GmbH, Data Science student at Hochschule Karlsruhe, builder of RAG systems and enterprise chatbots.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutView />;
}
