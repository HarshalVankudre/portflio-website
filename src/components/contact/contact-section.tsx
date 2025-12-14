import { Download, Github, Linkedin } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { CopyableLink } from "@/components/contact/copyable-link";
import { ContactForm } from "@/components/contact/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getResume } from "@/data/resume";
import { ui, type Locale } from "@/lib/i18n";

export function ContactSection({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const resume = getResume(locale);

  return (
    <section id="contact" className="scroll-mt-24 py-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="space-y-4">
          <SectionHeading
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            description={t.contact.desc}
          />
          <Card>
            <CardHeader className="space-y-2">
              <div className="text-sm font-semibold">{t.contact.quickLinks}</div>
              <p className="text-sm text-muted-foreground">
                {t.contact.quickLinksHint}
              </p>
            </CardHeader>
            <CardContent className="grid gap-2">
              <CopyableLink
                icon="mail"
                href={`mailto:${resume.email}`}
                value={resume.email}
                label={t.hero.email}
              />
              <CopyableLink
                icon="phone"
                href={`tel:${resume.phone.replace(/\s/g, "")}`}
                value={resume.phone}
                copyValue={resume.phone.replace(/\s/g, "")}
                label={locale === "de" ? "Telefon" : "Phone"}
              />
              <a
                className="flex items-center gap-3 rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-foreground/90 hover:bg-accent"
                href={resume.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">GitHub</span>
              </a>
              <a
                className="flex items-center gap-3 rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-foreground/90 hover:bg-accent"
                href={resume.links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">LinkedIn</span>
              </a>
              <Button asChild variant="outline" className="mt-2">
                <a href={resume.links.cv} target="_blank" rel="noreferrer">
                  <Download className="h-4 w-4" />
                  {t.contact.downloadCv}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="space-y-2">
            <div className="text-sm font-semibold">{t.contact.sendMessage}</div>
            <p className="text-sm text-muted-foreground">
              {t.contact.sendMessageHint}
            </p>
          </CardHeader>
          <CardContent>
            <ContactForm locale={locale} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
