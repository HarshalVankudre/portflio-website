"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  MapPin,
  Send,
  Github,
  Linkedin,
  Mail,
  Phone,
  Loader2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/SectionHeader";

export default function Contact() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

  const channels = [
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
  ];

  return (
    <section id="contact" className="blueprint relative py-24 sm:py-28">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="07"
          code="TRANSMIT"
          isInView={isInView}
          title={
            <>
              {t("contact.title")}{" "}
              <span className="text-accent">{t("contact.titleHighlight")}</span>
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Channels */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <div className="panel corners">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="tech-label">
                  CHANNELS <span className="text-accent">{"//"}</span>{" "}
                  {t("contact.quickLinks")}
                </span>
                <span aria-hidden className="crosshair" />
              </div>

              <p className="border-b border-line px-5 py-4 text-sm text-dim">
                {t("contact.respondFastest")}
              </p>

              <ul className="divide-y divide-line">
                {channels.map((channel) => {
                  const inner = (
                    <>
                      <channel.icon
                        size={15}
                        className="shrink-0 text-faint transition-colors group-hover:text-accent"
                        aria-hidden
                      />
                      <span className="tech-label w-20 shrink-0">
                        {channel.label}
                      </span>
                      <span className="min-w-0 flex-1 truncate font-mono text-sm text-fg">
                        {channel.value}
                      </span>
                      {channel.href && (
                        <ArrowUpRight
                          size={14}
                          className="shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                          aria-hidden
                        />
                      )}
                    </>
                  );

                  return (
                    <li key={channel.label}>
                      {channel.href ? (
                        <a
                          href={channel.href}
                          className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-overlay"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="group flex items-center gap-4 px-5 py-4">
                          {inner}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Social Links */}
              <div className="flex items-center gap-6 border-t border-line bg-overlay px-5 py-4 font-mono text-xs uppercase tracking-[0.14em]">
                <span className="tech-label">EXT</span>
                <a
                  href="https://github.com/HarshalVankudre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw inline-flex items-center gap-1.5 text-dim"
                >
                  <Github size={13} aria-hidden />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/harshal-vankudre/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw inline-flex items-center gap-1.5 text-dim"
                >
                  <Linkedin size={13} aria-hidden />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Response-time note */}
            <div className="panel hidden items-center gap-3 border-l-2 border-l-accent px-5 py-4 lg:flex">
              <span className="led led-ok" aria-hidden />
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-dim">
                Open to opportunities — AI / ML & full-stack
              </p>
            </div>
          </motion.div>

          {/* Transmission form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <form onSubmit={handleSubmit} className="panel corners">
              {/* Header */}
              <div className="border-b border-line px-5 py-4 sm:px-6">
                <span className="tech-label">
                  MSG <span className="text-accent">{"//"}</span>{" "}
                  {t("contact.sendMessage")}
                </span>
                <p className="mt-2 text-sm text-dim">{t("contact.formSubtitle")}</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-5 px-5 py-5 sm:px-6">
                <div>
                  <label
                    htmlFor="name"
                    className="tech-label mb-2 block text-dim"
                  >
                    {t("contact.name")} <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="field"
                    placeholder={t("contact.namePlaceholder")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="tech-label mb-2 block text-dim"
                  >
                    {t("contact.email")} <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="field"
                    placeholder={t("contact.emailPlaceholder")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="tech-label mb-2 block text-dim"
                  >
                    {t("contact.subject")}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="field"
                    placeholder={t("contact.subjectPlaceholder")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="tech-label mb-2 block text-dim"
                  >
                    {t("contact.message")} <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="field resize-none"
                    placeholder={t("contact.messagePlaceholder")}
                  />
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <div className="flex items-center gap-2.5 border border-ok/40 bg-ok/10 p-3 font-mono text-sm text-ok">
                    <span className="led led-ok" aria-hidden />
                    {t("contact.successMessage")}
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-2.5 border border-err/40 bg-err/10 p-3 font-mono text-sm text-err">
                    <AlertCircle size={15} aria-hidden />
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn btn-solid w-full disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      {t("contact.sending")}
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      {t("contact.sendMessage")}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
