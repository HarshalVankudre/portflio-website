import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vankudre.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Pin to the last real content change — new Date() would tell crawlers
  // the page changed on every build.
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-08-18"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
