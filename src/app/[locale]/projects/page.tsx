import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { GitHubProjectsBrowser } from "@/components/projects/github-projects-browser";
import { FeaturedProjects } from "@/components/projects/featured-projects";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { getResume } from "@/data/resume";
import { fetchGitHubRepos } from "@/lib/github";
import { isLocale, type Locale, ui } from "@/lib/i18n";

export const revalidate = 3600;

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const t = ui[locale];
  const resume = getResume(locale);

  const base = `/${locale}`;
  const repos = await fetchGitHubRepos(resume.githubUsernames);

  return (
    <main className="pb-20">
      <section className="py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow={t.projectsPage.eyebrow}
            title={t.projectsPage.title}
            description={t.projectsPage.desc}
          />
          <Button asChild variant="ghost">
            <Link href={`${base}#contact`}>
              {t.projectsPage.contactCta} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8">
          <FeaturedProjects projects={resume.featuredProjects} />
        </div>

        <div className="mt-12 space-y-6">
          <SectionHeading
            eyebrow="GitHub"
            title={t.projectsPage.githubTitle}
            description={`${t.projectsPage.githubDescPrefix} ${resume.githubUsernames.join(", ")} (${locale === "de" ? "stündlich gecached" : "cached hourly"}).`}
          />
          <GitHubProjectsBrowser repos={repos} locale={locale} />
        </div>
      </section>
    </main>
  );
}
