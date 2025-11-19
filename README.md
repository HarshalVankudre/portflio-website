# ⚡ Harshal's AI Portfolio

> Apple-inspired storytelling powered by on-page AI copilots and instant localization.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-20232a?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-0ea5e9?logo=tailwind-css)](https://tailwindcss.com/)
[![Gemini API](https://img.shields.io/badge/Gemini%20API-Live-4285f4?logo=googlecloud)](https://ai.google.dev/)

![Hero preview](./public/preview.png)
<sub>Add a screenshot of the hero section at `public/preview.png` to activate this banner.</sub>

## 📚 Table of Contents

1. [✨ Highlights](#-highlights)
2. [🤖 AI Experiences](#-ai-experiences)
3. [🌐 Localization & Personalization](#-localization--personalization)
4. [🧱 Tech Stack & Architecture](#-tech-stack--architecture)
5. [🗂️ Project Structure](#️-project-structure)
6. [🧩 Customization Ideas](#-customization-ideas)
7. [🛣️ Roadmap](#️-roadmap)

## ✨ Highlights

- 🎨 **Cinematic glassmorphism** — Floating gradients, parallax-friendly blur, and buttery micro-interactions that mimic Apple hero sections.
- 🧠 **Gemini-native storytelling** — Real-time elevator pitch generator and contextual chat assistant bring the resume to life.
- 🕶️ **Dark-mode first** — High contrast typography paired with Lucide icons keeps the UI readable yet moody.
- 📈 **Data-driven cards** — Experiences, projects, and skills all hydrate from structured JSON to keep updates painless.
- 🚀 **Edge-optimized locale detection** — Middleware inspects geo, cookies, query params, and `Accept-Language` before the page ever renders.

## 🤖 AI Experiences

| Feature | Details |
| --- | --- |
| 💬 **Floating AI chat** | A docked assistant (Gemini 2.5 Flash) greets visitors, answers resume questions, and gracefully admits when data is unavailable. |
| ✍️ **Instant pitch generator** | One tap prompts Gemini to craft a unique elevator pitch, ideal for interviews or new site visitors. |
| 🧾 **Structured context** | `lib/gemini.js` feeds the assistant with localized personal info, skills, experiences, and projects so every reply sounds tailored. |
| 🔒 **Resilient UX** | Missing API key? Offline? The UI degrades with friendly fallbacks so the page never feels broken. |

## 🌐 Localization & Personalization

- 🗺️ **Geo-aware middleware** (`middleware.js`) stamps `x-detected-language`, `Content-Language`, and `portfolio-language` cookies for cache-safe locale variants.
- 🧭 **Three-tier preference** — Server defaults → cookie/localStorage sync → browser language sniffing ensures first-class support for English + German.
- ✍️ **Localized metadata** — `<html lang>`, OpenGraph, Twitter, and structured data switch per locale (see `app/layout.jsx`).
- 🧮 **Data parity** — Resume entries, CTAs, prompts, and AI strings live in `lib/localizedContent.js`, guaranteeing translated UI + AI outputs.

## 🧱 Tech Stack & Architecture

- 🧱 **Framework** — Next.js 14 App Router with React 18 client modules for the animated hero and chat widget.
- 🎛️ **Styling** — Tailwind CSS + custom blur animations, Lucide icons, and glass cards to maintain a single design vocabulary.
- 🌩️ **Edge middleware** — Negotiates language, sets caching hints, and keeps hydration consistent between SSR + client.
- 🔌 **AI integration** — A thin `lib/gemini.js` helper wraps the Gemini REST API, centralizing prompts, error handling, and logging.
- 📦 **Bundle hygiene** — `.gitignore` and `.env.example` keep secrets safe while `npm run analyze` (bundle analyzer) remains available when needed.

## 🗂️ Project Structure

```
portfolio/
├─ app/
│  ├─ layout.jsx                 # Locale-aware metadata + schema markup
│  ├─ page.jsx                   # Dynamic page resolving preferred language
│  └─ api/clear-language/        # Helper endpoint to reset the cookie
├─ components/
│  ├─ Home.jsx                   # Lightweight orchestrator
│  └─ home/                      # Modular, themed sections
│     ├─ AIChatWidget.jsx
│     ├─ Experience.jsx
│     ├─ Footer.jsx
│     ├─ GlassCard.jsx
│     ├─ Hero.jsx
│     ├─ Navbar.jsx
│     ├─ Projects.jsx
│     ├─ SectionHeader.jsx
│     └─ Skills.jsx
├─ lib/
│  ├─ detectLanguage.js          # Server-side locale resolution
│  ├─ gemini.js                  # Gemini API helper + prompt builder
│  ├─ i18n.js                    # Cookie/localStorage keys
│  ├─ languageMatch.js           # Accept-Language parser
│  ├─ localizedContent.js        # EN/DE copy, experiences, projects
│  └─ skills.js                  # Skill metadata reused in UI + AI context
├─ middleware.js
└─ public/
   └─ preview.png                # Drop a hero screenshot for README banner
```

## 🧩 Customization Ideas

- 🎯 Swap in your own data within `lib/localizedContent.js` and `lib/skills.js`—the UI + AI will adapt automatically.
- 🖼️ Add more locales by extending `SUPPORTED_LANGUAGES`, copy dictionaries, and metadata definitions.
- 🧪 Wire the chat widget to a custom RAG service by redirecting `callGemini` to your backend.
- 🧰 Introduce CMS/MDX pipelines for essays or experiment sections while reusing the glass card system.

## 🛣️ Roadmap

- [ ] Expand localization beyond EN/DE (e.g., 🇪🇸, 🇫🇷).
- [ ] Persist chat transcripts for analytics + personalization.
- [ ] Add integration tests for middleware negotiation + locale hydration.
- [ ] Layer in CMS-powered case studies or blog posts that inherit the glass aesthetic.
