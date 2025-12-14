import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import { EducationList } from "@/components/resume/education-list";
import { ExperienceTimeline } from "@/components/resume/experience-timeline";
import { SkillsGrid } from "@/components/resume/skills-grid";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getResume } from "@/data/resume";
import { isLocale, type Locale, ui } from "@/lib/i18n";

export default async function ResumePage({
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

  return (
    <main className="pb-20">
      <section className="py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeading
              eyebrow={t.resumePage.eyebrow}
              title={t.resumePage.title}
              description={t.resumePage.desc}
            />
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href={resume.links.cv} target="_blank" rel="noreferrer">
                  <Download className="h-4 w-4" /> {t.resumePage.download}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={resume.links.github} target="_blank" rel="noreferrer">
                  GitHub <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={resume.links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="ghost">
                <Link href={`${base}#contact`}>{t.nav.contact}</Link>
              </Button>
            </div>

            <Card>
              <CardHeader className="space-y-2">
                <div className="text-sm font-semibold">
                  {locale === "de" ? "Zusammenfassung" : "Summary"}
                </div>
                <p className="text-sm text-muted-foreground">{resume.summary}</p>
              </CardHeader>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="space-y-1">
              <div className="text-sm font-semibold">
                {t.resumePage.cvPreviewTitle}
              </div>
              <p className="text-sm text-muted-foreground">
                {t.resumePage.cvPreviewDesc}
              </p>
            </CardHeader>
            <CardContent>
              <object
                aria-label="CV preview"
                data={`${resume.links.cv}#view=FitH`}
                type="application/pdf"
                className="h-[70vh] w-full rounded-xl border border-border bg-background"
              >
                <div className="grid place-items-center gap-3 rounded-xl border border-dashed border-border bg-background p-6 text-center">
                  <div className="text-sm font-semibold">
                    {locale === "de"
                      ? "Vorschau im Browser nicht verfügbar"
                      : "Browser preview unavailable"}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {locale === "de"
                      ? "Öffne den Lebenslauf in einem neuen Tab oder lade ihn herunter."
                      : "Open the CV in a new tab or download it."}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button asChild>
                      <a href={resume.links.cv} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />{" "}
                        {locale === "de" ? "Öffnen" : "Open"}
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href={resume.links.cv} download>
                        <Download className="h-4 w-4" /> {t.resumePage.download}
                      </a>
                    </Button>
                  </div>
                </div>
              </object>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow={t.sections.experienceEyebrow}
            title={t.sections.experienceTitle}
            description={
              locale === "de"
                ? "Highlights aus Werkstudentenrollen und ehrenamtlicher Arbeit."
                : "Highlights from working student roles and volunteering."
            }
          />
          <ExperienceTimeline items={resume.experience} />
        </div>
      </section>

      <section className="py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow={t.sections.skillsEyebrow}
            title={locale === "de" ? "Werkzeugkasten" : "Toolbox"}
            description={
              locale === "de"
                ? "Wichtige Sprachen, Frameworks und Tools."
                : "Core languages, frameworks, and tools."
            }
          />
          <SkillsGrid skills={resume.skills} />
        </div>
      </section>

      <section className="py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow={t.sections.educationEyebrow}
            title={t.sections.educationTitle}
            description={t.sections.educationDesc}
          />
          <EducationList items={resume.education} />
        </div>
      </section>
    </main>
  );
}
