"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Send, Github, Linkedin, Mail, Phone, Download, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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

  return (
    <section id="contact" className="relative py-24 neo-stripes">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="neo-tag neo-tag-primary mb-4">{t("contact.tag")}</span>
          <h2 className="neo-title mt-4">
            {t("contact.title")}{" "}
            <span className="neo-highlight">{t("contact.titleHighlight")}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-black uppercase mb-6">{t("contact.quickLinks")}</h3>
            <p className="text-gray-600 mb-6">{t("contact.respondFastest")}</p>

            {/* Email */}
            <a
              href="mailto:harshalvankudre@gmail.com"
              className="neo-card p-4 flex items-center gap-4 hover:bg-[var(--primary)] group"
            >
              <div className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent-cyan)] transition-colors">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold">{t("contact.email")}</div>
                <div className="text-gray-600">harshalvankudre@gmail.com</div>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+4917687451632"
              className="neo-card p-4 flex items-center gap-4 hover:bg-[var(--accent-cyan)] group"
            >
              <div className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--primary)] transition-colors">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold">{t("contact.phone")}</div>
                <div className="text-gray-600">+49 176 87451632</div>
              </div>
            </a>

            {/* Location */}
            <div className="neo-card p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold">{t("contact.location")}</div>
                <div className="text-gray-600">{t("hero.location")}</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <motion.a
                href="https://github.com/HarshalVankudre"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neo-btn neo-btn-white"
                aria-label="GitHub"
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/harshal-vankudre"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neo-btn neo-btn-cyan"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a
                href="/cv.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neo-btn neo-btn-primary"
                aria-label="Download CV"
              >
                <Download size={24} />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="neo-card p-0 overflow-hidden">
              {/* Header */}
              <div className="p-6 bg-[var(--primary)] border-b-3 border-black">
                <h3 className="text-2xl font-black uppercase">{t("contact.sendMessage")}</h3>
                <p className="text-gray-800 mt-2">
                  {t("contact.formSubtitle")}
                </p>
              </div>

              {/* Form Fields */}
              <div className="p-6 bg-white space-y-4">
                <div>
                  <label htmlFor="name" className="font-bold uppercase text-sm block mb-2">
                    {t("contact.name")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full neo-border p-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    placeholder={t("contact.namePlaceholder")}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="font-bold uppercase text-sm block mb-2">
                    {t("contact.email")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full neo-border p-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    placeholder={t("contact.emailPlaceholder")}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="font-bold uppercase text-sm block mb-2">
                    {t("contact.subject")}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full neo-border p-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    placeholder={t("contact.subjectPlaceholder")}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="font-bold uppercase text-sm block mb-2">
                    {t("contact.message")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full neo-border p-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
                    placeholder={t("contact.messagePlaceholder")}
                  />
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <div className="flex items-center gap-2 p-3 bg-green-100 border-3 border-green-600 text-green-800">
                    <CheckCircle size={20} />
                    <span className="font-bold">{t("contact.successMessage")}</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 bg-red-100 border-3 border-red-600 text-red-800">
                    <AlertCircle size={20} />
                    <span className="font-bold">{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="neo-btn neo-btn-primary w-full justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                  whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      {t("contact.sending")}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {t("contact.sendMessage")}
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
