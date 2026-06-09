<div align="center">

# Harshal Vankudre Portfolio

### A cinematic personal portfolio for AI, data, and full-stack work.

[![Live Site](https://img.shields.io/badge/Live-vankudre.com-ceff00?style=for-the-badge&labelColor=060607&color=ceff00)](https://vankudre.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploys_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

![Portfolio preview](https://vankudre.com/opengraph-image)

</div>

---

## Overview

This repository powers [vankudre.com](https://vankudre.com), the portfolio of Harshal Vankudre: an AI Developer and Software Engineer based in Karlsruhe, Germany.

The current site is a multi-page, motion-rich portfolio built with the Next.js App Router. It presents selected case studies, an about page, a `/now` page, a contact section, and an AI assistant that answers from portfolio context.

## What Changed

The app has moved from a single-page section layout to a more polished portfolio system:

- Home page with a full-viewport cinematic hero, selected work list, about teaser, contact section, and AI assistant
- Dedicated `/about` route with experience, skills, education, and language sections
- Case-study routing at `/work/[slug]` with static params, localized content, metrics, parallax imagery, and next-project navigation
- `/work` redirects to the home page work index at `/#work`
- `/now` remains available as a current-status page
- GSAP, ScrollTrigger, Lenis, and OGL power smooth scrolling, route transitions, custom cursor behavior, reveal effects, and background visuals
- Service worker cache was bumped to `hv-portfolio-v2` for the redesign

## Live Routes

| Route | Purpose |
| --- | --- |
| `/` | Main portfolio landing page |
| `/about` | Detailed bio, experience, education, skills, and languages |
| `/work/[slug]` | Long-form case studies generated from `src/lib/caseStudies.ts` |
| `/work` | Redirects to `/#work` |
| `/now` | Current snapshot page |
| `/api/chat` | Streaming AI assistant endpoint using Groq with a local fallback |
| `/api/send` | Contact form endpoint using Resend |
| `/opengraph-image` | Dynamic Open Graph image |
| `/sitemap.xml` | Dynamic sitemap |
| `/robots.txt` | Robots configuration |

## Featured Work

Case studies are defined in `src/lib/caseStudies.ts` and rendered by `/work/[slug]`.

| Slug | Project | Focus |
| --- | --- | --- |
| `ruko-gpt` | Ruko GPT | Enterprise RAG chatbot for internal knowledge access |
| `teams-bot` | Teams-BOT | Multi-agent Microsoft Teams bot for equipment data |
| `courseviewer` | CourseViewer | Full-stack educational content browser |

Hero artwork for each case study lives in `public/work/<slug>/hero.svg`.

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16, React 19, App Router |
| Language | TypeScript |
| Styling | Tailwind CSS 4 with custom global tokens |
| Motion | GSAP, ScrollTrigger, Lenis, OGL |
| UI | Lucide React, custom transition and reveal components |
| AI | Groq Chat Completions API with server-side fallback responses |
| Email | Resend |
| Media | Remotion for optional animated portfolio assets |
| Deployment | Vercel Git integration from `main` |

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

Create `.env.local` in the project root. Never commit real secrets.

```env
GROQ_API_KEY=your_groq_key
GROQ_MODEL=llama-3.1-8b-instant

RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
RESEND_TO_EMAIL=harshalvankudre@gmail.com

GITHUB_TOKEN=optional_or_unused_by_current_public_routes
NEXT_PUBLIC_SITE_URL=https://vankudre.com
```

### Notes

- `GROQ_API_KEY` enables live AI responses in `/api/chat`.
- If `GROQ_API_KEY` is missing, the chatbot streams deterministic fallback answers from local portfolio data.
- `RESEND_API_KEY` is required for the contact form to send email.
- `RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>` is useful for local testing. Use a verified sender/domain in production.
- `NEXT_PUBLIC_SITE_URL` is used by metadata, sitemap, robots, and Open Graph generation.
- `GITHUB_TOKEN` is optional for the current public app state.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server after build |
| `npm run lint` | Run ESLint |
| `npm run music:generate` | Generate the Remotion audio bed |
| `npm run video` | Open Remotion Studio |
| `npm run video:poster` | Render a poster frame to `out/portfolio-poster.png` |
| `npm run video:render` | Render the portfolio video to `out/portfolio-graphic.mp4` |

## Project Structure

```text
src/
  app/
    about/page.tsx
    api/chat/route.ts
    api/send/route.ts
    now/page.tsx
    work/page.tsx
    work/[slug]/page.tsx
    globals.css
    layout.tsx
    opengraph-image.tsx
    page.tsx
    robots.ts
    sitemap.ts
  components/
    about/
    effects/
    home/
    providers/
    ui/
    work/
    ChatBot.tsx
    Footer.tsx
    Navbar.tsx
    Preloader.tsx
    SwRegistrar.tsx
  context/
    LanguageContext.tsx
  lib/
    caseStudies.ts
    gsap.ts
    motion.ts
    portfolioData.ts
    ratelimit.ts
  remotion/
public/
  audio/
  work/
  manifest.json
  profile.jpg
  sw.js
```

## Architecture Notes

- `src/app/layout.tsx` wires global fonts, JSON-LD, providers, background effects, preloader, custom cursor, and service-worker registration.
- `src/components/providers/SmoothScrollProvider.tsx` owns Lenis smooth scrolling.
- `src/components/providers/TransitionProvider.tsx` wraps App Router navigation with a GSAP curtain transition.
- `src/lib/gsap.ts` centralizes GSAP and ScrollTrigger setup.
- `src/lib/motion.ts` keeps reduced-motion and pointer checks reusable.
- `src/context/LanguageContext.tsx` provides English/German copy through `t(...)`.
- `src/lib/caseStudies.ts` is the source of truth for long-form project pages.
- `src/lib/portfolioData.ts` is kept lean for chatbot context and fallback responses.

## Deployment

The project is connected to Vercel through GitHub. Pushing to `main` creates a production deployment for [vankudre.com](https://vankudre.com).

Typical deploy flow:

```bash
git status --short --branch
npm run lint
npm run build
git add -A
git commit -m "Update portfolio"
git push origin main
```

Vercel production deployments can be checked in the Vercel dashboard for the `portfolio-website` project. Preview deployments are created for non-production branches.

## Troubleshooting

### Vercel does not look updated

- Confirm the latest commit is on `main`, not only on a feature branch.
- Open the public domain: [https://vankudre.com](https://vankudre.com).
- Unique Vercel deployment URLs may be protected by Vercel Authentication.
- Try a cache-busting URL such as `https://vankudre.com/?v=<commit-sha>`.
- If the old UI persists locally, unregister the service worker or hard refresh with cache disabled.

### Chatbot returns fallback answers

Set `GROQ_API_KEY` in `.env.local` or in Vercel environment variables. Restart the dev server after changing local env files.

### Contact form cannot send

Set `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `RESEND_TO_EMAIL`. Use a verified sender/domain in Resend for production mail.

### Motion feels heavy

The app checks `prefers-reduced-motion` and disables or shortens several effects. Browser/device settings can be used to reduce motion globally.

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
