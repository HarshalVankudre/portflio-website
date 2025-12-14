"use client";

import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getResume } from "@/data/resume";
import { ui, type Locale } from "@/lib/i18n";

export function ContactForm({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const resume = getResume(locale);

  const schema = React.useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(
            2,
            locale === "de"
              ? "Bitte gib deinen Namen ein."
              : "Please enter your name.",
          ),
        email: z
          .string()
          .email(
            locale === "de"
              ? "Bitte gib eine gültige E-Mail-Adresse ein."
              : "Please enter a valid email address.",
          ),
        message: z
          .string()
          .min(
            10,
            locale === "de"
              ? "Bitte schreibe eine etwas längere Nachricht."
              : "Please write a slightly longer message.",
          ),
      }),
    [locale],
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    const subject = encodeURIComponent(
      `${locale === "de" ? "Portfolio Kontakt" : "Portfolio contact"} - ${values.name}`,
    );
    const body = encodeURIComponent(
      `${values.message}\n\nFrom: ${values.name} <${values.email}>`,
    );
    const mailto = `mailto:${resume.email}?subject=${subject}&body=${body}`;

    try {
      await navigator.clipboard?.writeText(
        `Message:\n${values.message}\n\nFrom: ${values.name} <${values.email}>`,
      );
      toast.success(t.contact.copied);
    } catch {
      toast.message(t.contact.openingMail);
    }

    window.location.assign(mailto);
    reset();
  }

  return (
    <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-1">
          <Input placeholder={t.contact.formName} {...register("name")} />
          {errors.name ? (
            <p className="text-xs text-red-600">{errors.name.message}</p>
          ) : null}
        </div>
        <div className="grid gap-1">
          <Input placeholder={t.contact.formEmail} {...register("email")} />
          {errors.email ? (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-1">
        <Textarea placeholder={t.contact.formMessage} {...register("message")} />
        {errors.message ? (
          <p className="text-xs text-red-600">{errors.message.message}</p>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {t.contact.formSend}
        </Button>
        <a
          className="text-sm text-muted-foreground hover:text-foreground"
          href={`mailto:${resume.email}`}
        >
          {t.contact.formDirectEmail}
        </a>
      </div>
    </form>
  );
}
