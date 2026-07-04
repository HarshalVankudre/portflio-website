import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import CaseStudyView from "@/components/work/CaseStudyView";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vankudre.com";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.oneLiner.en,
    alternates: {
      canonical: `/work/${cs.slug}`,
      languages: {
        en: `/work/${cs.slug}`,
        de: `/work/${cs.slug}?lang=de`,
        "x-default": `/work/${cs.slug}`,
      },
    },
    openGraph: {
      title: `${cs.title} | Harshal Vankudre`,
      description: cs.oneLiner.en,
      url: `${SITE_URL}/work/${cs.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.title} | Harshal Vankudre`,
      description: cs.oneLiner.en,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cs.title,
    description: cs.oneLiner.en,
    url: `${SITE_URL}/work/${cs.slug}`,
    author: {
      "@type": "Person",
      name: "Harshal Vankudre",
      url: SITE_URL,
    },
    dateCreated: cs.year.slice(0, 4),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyView slug={cs.slug} />
    </>
  );
}
