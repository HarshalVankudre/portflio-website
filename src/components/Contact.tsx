"use client";

import { motion, useInView } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const EASE = [0.22, 1, 0.36, 1] as const;

const fieldClass =
  "w-full border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-3 text-[var(--foreground)] outline-none transition-colors placeholder:text-muted-2 focus:border-[var(--foreground)]";

export default function Contact() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const links = [
    {
      label: t("contact.email"),
      value: "harshalvankudre@gmail.com",
      href: "mailto:harshalvankudre@gmail.com",
      icon: Mail,
    },
    {
      label: t("contact.phone"),
      value: "+49 176 87451632",
      href: "tel:+4917687451632",
      icon: Phone,
    },
    {
      label: t("contact.location"),
      value: t("hero.location"),
      href: null,
      icon: MapPin,
    },
    {
      label: "GitHub",
      value: "HarshalVankudre",
      href: "https://github.com/HarshalVankudre",
      icon: Github,
    },
    {
      label: "LinkedIn",
      value: "harshal-vankudre",
      href: "https://www.linkedin.com/in/harshal-vankudre/",
      icon: Linkedin,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section ref={ref} id="contact" className="record-section bg-[var(--foreground)] text-[var(--background)]">
      <div className="record-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="grid gap-5 border-b border-[var(--background)] pb-6 lg:grid-cols-[0.62fr_0.38fr] lg:items-end"
        >
          <div>
            <span className="font-mono text-xs uppercase text-[#F06A50]">{t("contact.tag")}</span>
            <h2 className="mt-3 max-w-4xl text-[clamp(2.7rem,7vw,6rem)] font-black uppercase leading-[0.9]">
              {t("contact.title")} {t("contact.titleHighlight")}
            </h2>
          </div>
          <p className="max-w-md leading-7 text-[var(--background)]/72">
            {t("contact.respondFastest")} Open to AI tooling, software engineering, and product-facing data work.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
            className="border-y border-[var(--background)]"
          >
            {links.map((link) => {
              const Icon = link.icon;
              const content = (
                <span className="grid gap-2 border-b border-white/20 py-4 last:border-b-0 sm:grid-cols-[8rem_1fr]">
                  <span className="inline-flex items-center gap-2 font-mono text-xs uppercase text-[var(--background)]/60">
                    <Icon size={14} />
                    {link.label}
                  </span>
                  <span className="break-words font-medium">{link.value}</span>
                </span>
              );

              return link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block transition-colors hover:text-[#F06A50]"
                >
                  {content}
                </a>
              ) : (
                <div key={link.label}>{content}</div>
              );
            })}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.16, ease: EASE }}
            className="bg-[var(--background)] p-4 text-[var(--foreground)] sm:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-xs uppercase text-muted">{t("contact.name")} *</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={fieldClass}
                  placeholder={t("contact.namePlaceholder")}
                />
              </label>

              <label className="block">
                <span className="mb-2 block font-mono text-xs uppercase text-muted">{t("contact.email")} *</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={fieldClass}
                  placeholder={t("contact.emailPlaceholder")}
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block font-mono text-xs uppercase text-muted">{t("contact.subject")}</span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={fieldClass}
                placeholder={t("contact.subjectPlaceholder")}
              />
            </label>

            <label className="mt-4 block">
              <span className="mb-2 block font-mono text-xs uppercase text-muted">{t("contact.message")} *</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className={`${fieldClass} resize-none`}
                placeholder={t("contact.messagePlaceholder")}
              />
            </label>

            {status === "success" && (
              <div className="mt-4 flex items-center gap-2 border border-[var(--success)] bg-green-50 p-3 text-[var(--success)]">
                <CheckCircle size={18} />
                <span className="font-semibold">{t("contact.successMessage")}</span>
              </div>
            )}

            {status === "error" && (
              <div className="mt-4 flex items-center gap-2 border border-[var(--primary)] bg-red-50 p-3 text-[var(--primary)]">
                <AlertCircle size={18} />
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="neo-btn neo-btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {t("contact.sending")}
                </>
              ) : (
                <>
                  <Send size={18} />
                  {t("contact.sendMessage")}
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
