<div align="center">

# Harshal Vankudre Portfolio

### An engineered-dark portfolio built with Next.js, TypeScript, Tailwind CSS, Groq, and Resend.

[![Live Site](https://img.shields.io/badge/Live-vankudre.com-FF5C00?style=for-the-badge&labelColor=0A0B0D)](https://vankudre.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-FF5C00?style=for-the-badge&logo=tailwindcss&logoColor=0A0B0D)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-9BA0A6?style=for-the-badge&logo=framer&logoColor=0A0B0D)](https://www.framer.com/motion)

![Portfolio preview](https://vankudre.com/opengraph-image)

</div>

---

## Overview

This repository powers my personal portfolio website: a precise, responsive, instrument-panel-inspired dark interface for presenting my work in AI, data, and full-stack development.

The site includes a bilingual portfolio, animated career timeline, live GitHub section, contact form, AI assistant, and a hidden terminal interface. Portfolio content is centralized so the website and chatbot answer from the same source of truth.

## Highlights

| Area | What it does |
| --- | --- |
| Visual system | "Engineered dark" instrument panel — graphite surfaces, hairline rules, blueprint grids, mono annotations, signal-orange accent |
| AI assistant | Streams answers through `/api/chat` using Groq, with a portfolio-data fallback |
| Contact form | Sends messages through `/api/send` using Resend |
| GitHub stats | Shows repository, language, project, and tech stats with optional contribution data |
| Terminal mode | Hidden command palette-style terminal with portfolio commands and easter eggs |
| Internationalization | English/German language toggle using local React context |
| PWA basics | Manifest, app icons, and service worker caching |

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16, React 19, App Router |
| Language | TypeScript |
| Styling | Tailwind CSS 4, custom global design tokens |
| Animation | Framer Motion |
| Icons | Lucide React |
| AI | Groq Chat Completions API |
| Email | Resend |
| Data | GitHub REST/GraphQL APIs, local portfolio data |
| Deployment | Vercel-ready |

## Features

- Responsive single-page portfolio with section navigation
- Hero section with animated identity card and project metrics
- About, skills, experience, education, projects, GitHub stats, and contact sections
- AI chatbot that answers questions about skills, projects, experience, and contact details
- Contact form with validation, rate limiting, HTML escaping, and Resend delivery
- GitHub integration with REST fallback and optional GraphQL contribution calendar
- Hidden terminal opened with the backtick key
- Session-aware loading screen and service worker caching
- SEO metadata, sitemap, robots.txt, manifest, and generated Open Graph image

## Quick Start

```bash
git clone https://github.com/HarshalVankudre/portflio-website.git
cd portflio-website
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local` in the project root. Do not put real secrets in `.env.example`; that file is only a template.

```env
GROQ_API_KEY=your_groq_key
GROQ_MODEL=llama-3.1-8b-instant

RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
RESEND_TO_EMAIL=harshalvankudre@gmail.com

GITHUB_TOKEN=your_github_token_optional
NEXT_PUBLIC_SITE_URL=https://vankudre.com
```

### Resend sender note

Use `onboarding@resend.dev` while testing. After verifying your domain in Resend, you can switch to:

```env
RESEND_FROM_EMAIL=Portfolio Contact <contact@vankudre.com>
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start local development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server after build |
| `npm run lint` | Run ESLint |
| `npm run video` | Open Remotion Studio for the animated portfolio graphic |
| `npm run video:poster` | Render a poster frame to `out/portfolio-poster.png` |
| `npm run video:render` | Render the video to `out/portfolio-graphic.mp4` |

## Project Structure

```text
src/
  app/
    api/
      chat/       AI chatbot route
      github/     GitHub stats route
      send/       Contact form route
    globals.css   Design tokens and shared utilities
    layout.tsx    Metadata, fonts, JSON-LD
    page.tsx      Home page composition
  components/
    Hero.tsx
    About.tsx
    Skills.tsx
    Experience.tsx
    Education.tsx
    Projects.tsx
    GitHubStats.tsx
    Contact.tsx
    ChatBot.tsx
    Terminal.tsx
  context/
    LanguageContext.tsx
  hooks/
    useKonamiCode.ts
  lib/
    portfolioData.ts
    ratelimit.ts
public/
  manifest.json
  sw.js
  cv.pdf
assets/
  cv.pdf
  cv.docx
```

## API Routes

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/chat` | `POST` | Streams AI assistant responses using Groq, with local fallback |
| `/api/send` | `POST` | Sends contact form messages through Resend |
| `/api/github` | `GET` | Returns GitHub profile, language, activity, and optional contribution data |

## Terminal Easter Egg

Press the backtick key <kbd>`</kbd> on the website to open the hidden terminal.

Useful commands include:

```text
help
about
skills
projects
experience
contact
open github
open linkedin
neofetch
matrix
```

## Troubleshooting

### Chatbot or email form is not working locally

Make sure `.env.local` exists in the project root:

```text
C:\Users\canno\Desktop\portflio-website\.env.local
```

Then restart the dev server. Next.js only reads environment files at server startup.

### Email sending fails with Resend

Use `RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>` for initial testing. Custom domains such as `contact@vankudre.com` must be verified in Resend first.

### GitHub contribution graph is hidden

The contribution calendar requires `GITHUB_TOKEN`. Without it, the site uses the public REST fallback and still shows the main GitHub stats.

## Contact

| Platform | Link |
| --- | --- |
| Website | [vankudre.com](https://vankudre.com) |
| Email | [harshalvankudre@gmail.com](mailto:harshalvankudre@gmail.com) |
| GitHub | [github.com/HarshalVankudre](https://github.com/HarshalVankudre) |
| LinkedIn | [linkedin.com/in/harshal-vankudre](https://www.linkedin.com/in/harshal-vankudre/) |

---

<div align="center">

Built in Karlsruhe, Germany.

</div>
