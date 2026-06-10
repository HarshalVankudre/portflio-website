"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import RevealText from "@/components/ui/RevealText";
import Magnetic from "@/components/ui/Magnetic";

const EMAIL = "harshalvankudre@gmail.com";
const [EMAIL_USER, EMAIL_DOMAIN] = EMAIL.split("@");

export default function ContactSection() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "", // honeypot — humans never see or fill this
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      // Non-JSON bodies (proxy errors, timeouts) must not surface raw
      // exception text to the visitor.
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error || t("contact.errorFallback"));
      }
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", company: "" });
      resetTimer.current = setTimeout(() => setStatus("idle"), 6000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : t("contact.errorFallback")
      );
      // Errors stay visible until the visitor retries — no auto-dismiss.
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="relative px-gutter py-section">
      <div className="mb-14 border-b border-line pb-5">
        <h2 className="label-mono">03 — {t("contact.tag")}</h2>
      </div>

      <RevealText
        key={language}
        as="p"
        className="max-w-5xl font-display text-display-md text-fg [text-wrap:balance]"
      >
        {`${t("contact.title")} ${t("contact.titleHighlight")}.`}
      </RevealText>

      <Magnetic className="mt-12" strength={0.2}>
        <a
          href={`mailto:${EMAIL}`}
          className="link-giant break-words font-display text-display-sm italic text-dim"
        >
          {/* Wrap only at the @, never mid-token */}
          {EMAIL_USER}
          <wbr />
          @{EMAIL_DOMAIN}
        </a>
      </Magnetic>

      <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-[1.4fr_1fr]">
        {/* Form */}
        <form onSubmit={handleSubmit} data-cursor="hide">
          <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="label-mono">
                {t("contact.name")} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="field mb-10 mt-1"
                placeholder={t("contact.namePlaceholder")}
              />
            </div>
            <div>
              <label htmlFor="email" className="label-mono">
                {t("contact.email")} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="field mb-10 mt-1"
                placeholder={t("contact.emailPlaceholder")}
              />
            </div>
          </div>

          <label htmlFor="subject" className="label-mono">
            {t("contact.subject")}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="field mb-10 mt-1"
            placeholder={t("contact.subjectPlaceholder")}
          />

          <label htmlFor="message" className="label-mono">
            {t("contact.message")} *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="field mb-10 mt-1 resize-none"
            placeholder={t("contact.messagePlaceholder")}
          />

          {/* Honeypot — visually removed, ignored by humans, filled by bots */}
          <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div aria-live="polite" className="min-h-6">
            {status === "success" && (
              <p className="font-mono text-sm text-accent">
                {t("contact.successMessage")}
              </p>
            )}
            {status === "error" && (
              <p className="font-mono text-sm text-err">{errorMessage}</p>
            )}
          </div>

          <Magnetic className="mt-6" strength={0.25}>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex h-14 items-center rounded-full bg-accent px-10 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-ink transition-[transform,opacity] hover:scale-[1.04] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "loading"
                ? t("contact.sending")
                : t("contact.sendMessage")}
            </button>
          </Magnetic>
        </form>

        {/* Channels */}
        <aside className="space-y-10">
          <div>
            <h3 className="label-mono mb-4">{t("contact.quickLinks")}</h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="https://github.com/HarshalVankudre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-9 items-center"
                >
                  <span className="link-draw font-mono text-sm uppercase tracking-[0.14em] text-dim">
                    GitHub ↗
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/harshal-vankudre/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-9 items-center"
                >
                  <span className="link-draw font-mono text-sm uppercase tracking-[0.14em] text-dim">
                    LinkedIn ↗
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/cv.pdf"
                  download
                  className="group inline-flex min-h-9 items-center"
                >
                  <span className="link-draw font-mono text-sm uppercase tracking-[0.14em] text-dim">
                    {t("contact.downloadCv")} ↓
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="label-mono mb-4">{t("contact.location")}</h3>
            <p className="font-mono text-sm text-dim">{t("hero.location")}</p>
            <p className="label-mono mt-1">49.0069° N — 8.4037° E</p>
          </div>

          <p className="border-l border-line-strong pl-4 text-sm leading-relaxed text-faint">
            {t("contact.respondFastest")}
          </p>
        </aside>
      </div>
    </section>
  );
}
