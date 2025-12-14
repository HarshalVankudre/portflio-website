import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

import { ContactSection } from "@/components/contact/contact-section";
import { FeaturedProjects } from "@/components/projects/featured-projects";
import { GitHubProjectsPreview } from "@/components/projects/github-projects-preview";
import { Reveal } from "@/components/reveal";
import { EducationList } from "@/components/resume/education-list";
import { ExperienceTimeline } from "@/components/resume/experience-timeline";
import { SkillsGrid } from "@/components/resume/skills-grid";
import { SectionHeading } from "@/components/section-heading";
import { ImpactStats } from "@/components/stats/impact-stats";
import { HeroThreeBackground } from "@/components/three/hero-three-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getResume } from "@/data/resume";
import { fetchGitHubRepos } from "@/lib/github";
import { isLocale, type Locale, ui } from "@/lib/i18n";

export const revalidate = 3600;

export default async function Home({
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
  const topSkills = Object.values(resume.skills).flat().slice(0, 10);
  const repos = await fetchGitHubRepos(resume.githubUsernames);

  return (
    <main className="pb-20">
      <section className="relative isolate overflow-hidden py-16 sm:py-20">
        <HeroThreeBackground />
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <Reveal>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {resume.location}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                <span className="bg-gradient-to-r from-foreground via-fuchsia-600 to-cyan-500 bg-clip-text text-transparent">
                  {resume.name}
                </span>
                <span className="mt-3 block text-lg font-medium text-muted-foreground sm:text-xl">
                  {resume.headline}
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {resume.summary}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild>
                  <Link href={`${base}/projects`}>
                    {t.hero.viewProjects} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href={resume.links.cv} target="_blank" rel="noreferrer">
                    {t.hero.downloadCv}
                  </a>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href={`${base}#contact`}>{t.hero.contact}</Link>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-2">
                {topSkills.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:sticky lg:top-24">
            <Card className="overflow-hidden">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold">{t.hero.onGithub}</div>
                    <p className="text-sm text-muted-foreground">
                      {t.hero.onGithubDesc}
                    </p>
                  </div>
                  <Button asChild size="sm" variant="secondary">
                    <a href={resume.links.github} target="_blank" rel="noreferrer">
                      {t.hero.profile} <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={`https://github.com/${resume.githubUsernames[0]}.png`}
                    alt={`${resume.name} avatar`}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-2xl border border-border"
                  />
                  <div className="grid gap-1">
                    <div className="text-sm font-semibold">{resume.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {resume.email}
                    </div>
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <a
                    href={`mailto:${resume.email}`}
                    className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <Mail className="h-4 w-4" /> {t.hero.email}
                  </a>
                  <a
                    href={resume.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                  <a
                    href={resume.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
        <div className="mt-12">
          <ImpactStats items={resume.impact} eyebrow={t.common.impact} />
        </div>
      </section>

      <section id="about" className="scroll-mt-24 py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow={t.sections.aboutEyebrow}
            title={t.sections.aboutTitle}
            description={t.sections.aboutDesc}
          />
          <Card>
            <CardHeader className="space-y-2">
              <div className="text-sm font-semibold">
                {locale === "de" ? "Zusammenfassung" : "Summary"}
              </div>
              <p className="text-sm text-muted-foreground">{resume.summary}</p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                {locale === "de"
                  ? `Aktuell in ${resume.location}. Ich suche Möglichkeiten, Softwareentwicklung und Datenanalyse zu verbinden, um messbaren Impact zu schaffen.`
                  : `Currently based in ${resume.location}. I’m looking for opportunities where I can combine software engineering and data analysis to create measurable impact.`}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Java</Badge>
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">SQL</Badge>
                <Badge variant="secondary">HubSpot</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="experience" className="scroll-mt-24 py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow={t.sections.experienceEyebrow}
            title={t.sections.experienceTitle}
            description={t.sections.experienceDesc}
          />
          <ExperienceTimeline items={resume.experience} />
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 py-16">
        <div className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow={t.sections.projectsEyebrow}
              title={t.sections.projectsTitle}
              description={t.sections.projectsDesc}
            />
            <Button asChild variant="outline">
              <Link href={`${base}/projects`}>
                {t.projectsPage.exploreAll} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <FeaturedProjects projects={resume.featuredProjects} />
          {repos.length ? (
            <div className="pt-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <SectionHeading
                  eyebrow={t.sections.latestEyebrow}
                  title={t.sections.latestTitle}
                  description={t.sections.latestDesc}
                />
                <Button asChild variant="ghost">
                  <Link href={`${base}/projects`}>
                    {t.projectsPage.fullList} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-6">
                <GitHubProjectsPreview repos={repos} locale={locale} />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section id="skills" className="scroll-mt-24 py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow={t.sections.skillsEyebrow}
            title={t.sections.skillsTitle}
            description={t.sections.skillsDesc}
          />
          <SkillsGrid skills={resume.skills} />
        </div>
      </section>

      <section id="education" className="scroll-mt-24 py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow={t.sections.educationEyebrow}
            title={t.sections.educationTitle}
            description={t.sections.educationDesc}
          />
          <EducationList items={resume.education} />
        </div>
      </section>

      <ContactSection locale={locale} />
    </main>
  );
}
