import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/caseStudies";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vankudre.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Pin to the last real content change — new Date() would tell crawlers
  // every page changed on every build.
  const lastModified = new Date("2026-06-13");
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...caseStudies.map((cs) => ({
      url: `${SITE_URL}/work/${cs.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/now`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];
}
