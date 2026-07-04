<div align="center">

# vankudre.com

### Cinematic Noir — the portfolio of Harshal Vankudre, AI Developer (AI Cyber Security @ Mercedes-Benz Tech Innovation).

[![Live Site](https://img.shields.io/badge/Live-vankudre.com-ceff00?style=for-the-badge&labelColor=060607&color=ceff00)](https://vankudre.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

![Portfolio preview](https://vankudre.com/opengraph-image)

*Noir black `#060607` · volt `#CEFF00` · Fraunces / Instrument Sans / Geist Mono*

</div>

---

## What this is

A multi-page, motion-rich portfolio built on the Next.js App Router — case studies with real production metrics, a bilingual (EN/DE) interface, and an AI assistant that answers from the portfolio's own data. Designed as one coherent system: a WebGL gradient field breathing behind everything, film grain on top, GSAP-choreographed entrances, Lenis smooth scrolling on a single rAF loop, and a curtain transition between routes.

## Highlights

- **Cinematic opening** — a once-per-session preloader (counter + wipe) with a pre-paint cover script so nothing ever flashes, gated on font readiness, hands off to the hero via a custom event
- **Interactive hero** — after the entrance, the name splits into characters whose variable-font weight blooms around the cursor while the shader's volt pool swells behind the headline; fast scrolling shears the type and it settles back
- **WebGL gradient field** — an OGL fragment shader (domain-warped simplex noise) that drifts with scroll and pointer, brightens on request via an `hv:glow` event, throttled on mobile, with context-loss recovery and a CSS fallback
- **Work list with presence** — oversized rows with a volt clip-sweep across titles and a cursor-trailing preview that crossfades between projects and tilts with pointer velocity
- **Capabilities band** — outlined oversized terms drifting in a marquee that accelerates with scroll velocity (decorative; the cards below carry the content), over three capability cards
- **Case studies** at `/work/[slug]` — localized long-form problem → approach → result with in-flow architecture and outcome plates (art-directed FIG. panels driven by a `media` schema), a chapter-aware scroll rail, count-up metrics, clip-reveal parallax covers, per-page Open Graph images
- **AI assistant** — streaming chat (Groq) grounded in `portfolioData.ts`, bilingual, with deterministic local fallback answers when no API key is set, lazy-loaded out of the initial bundle
- **Fully bilingual** — EN/DE with persisted preference, synced `<html lang>`, and consistent du-register German
- **Accessible** — WCAG AA contrast, focus traps + Escape on overlays, skip links, live regions, reduced-motion paths through every effect, 44px touch targets
- **PWA done right** — versioned service worker (cache-first immutable assets, network-first HTML, capped runtime cache), designed offline page, installable manifest
- **SEO/AI-ready** — JSON-LD (Person/WebSite/CreativeWork), per-route metadata + OG images, sitemap, robots, and an `/llms.txt` generated from the same data that powers the site
- **Hardened** — Content-Security-Policy, security headers, rate-limited APIs, honeypot + auto-reply on the contact form

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Hero, selected work, capabilities, about teaser, contact |
| `/about` | Experience timeline, skills, education, languages, CV download |
| `/work/[slug]` | Case studies: `ruko-gpt`, `teams-bot`, `enbw-chatbot`, `courseviewer` |
| `/now` | What I'm building / learning / reading right now |
| `/offline` | Service-worker fallback when the network is gone |
| `/llms.txt` | Machine-readable summary for AI crawlers |
| `/api/chat` | Streaming assistant endpoint (Groq + local fallback) |
| `/api/send` | Contact form via Resend (notification + visitor auto-reply) |

A designed 404 and error boundary cover everything else.

## Stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS 4 + custom design tokens in `globals.css` |
| Motion | GSAP + ScrollTrigger + SplitText, Lenis (driven by the GSAP ticker), OGL |
| AI | Groq Chat Completions (streaming) with portfolio-grounded fallback |
| Email | Resend |
| Analytics | Vercel Analytics + Speed Insights |
| Media | Remotion pipeline for animated portfolio assets (local-only, excluded from deploys) |
| Hosting | Vercel — pushes to `main` deploy production |

## Quick start

```bash
git clone https://github.com/HarshalVankudre/portflio-website.git
cd portflio-website
npm install
cp .env.example .env.local   # fill in keys (all optional for local dev)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without any keys, the chatbot streams fallback answers and the contact form reports that email is unconfigured — everything else works.

## Environment

```env
GROQ_API_KEY=            # live AI responses in /api/chat (optional — falls back)
GROQ_MODEL=llama-3.1-8b-instant
RESEND_API_KEY=          # required for the contact form to send
RESEND_FROM_EMAIL=       # verified sender, e.g. "Harshal <hi@vankudre.com>"
RESEND_TO_EMAIL=         # where inquiries land
NEXT_PUBLIC_SITE_URL=https://vankudre.com
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run video` | Remotion Studio (motion-graphic pipeline) |
| `npm run video:render` | Render `out/portfolio-graphic.mp4` |

## Architecture notes

- `src/app/layout.tsx` — fonts (Fraunces with true italics + optical sizing), JSON-LD, the pre-paint preloader cover script, providers, analytics
- `src/components/providers/SmoothScrollProvider.tsx` — Lenis on the GSAP ticker via a `useLenis` bridge component (see the comment in that file before touching it — wheel scrolling depends on it)
- `src/components/providers/TransitionProvider.tsx` — clip-path curtain transitions with a stuck-curtain failsafe; shows the destination's label mid-wipe; emits `hv:navigate` / `hv:page-revealed`
- `src/lib/preloader.ts` / `src/lib/glow.ts` — event contracts: the preloader→hero handoff (`hv:preloader-done`) and the gradient-field swell (`hv:glow`)
- `src/components/ui/ScrambleLabel.tsx`, `src/components/effects/VelocityLean.tsx`, `src/components/effects/ScrollRail.tsx` — reusable motion primitives (scramble-in labels, scroll-velocity skew, progress rail with optional chapter ticks)
- `src/lib/caseStudies.ts` — single source of truth for case studies, including the in-flow `media` sections (pages, OG images, llms.txt all derive from it; real screenshots slot in as `src` changes)
- `src/lib/portfolioData.ts` — lean knowledge base for the chatbot and its fallback answers
- `src/context/LanguageContext.tsx` — EN/DE copy via `t(...)`, persisted, synced to `<html lang>`

## Deployment

Connected to Vercel via GitHub — pushing to `main` deploys [vankudre.com](https://vankudre.com). `.vercelignore` keeps local-only artifacts (Remotion audio, renders, CV sources) out of the deployment.

If an old UI persists after a deploy, the service worker may be serving a cached shell: hard-refresh, or unregister it in DevTools → Application. The SW skips registration on `localhost` entirely.

## Contact

| | |
| --- | --- |
| Website | [vankudre.com](https://vankudre.com) |
| Email | [harshalvankudre@gmail.com](mailto:harshalvankudre@gmail.com) |
| GitHub | [github.com/HarshalVankudre](https://github.com/HarshalVankudre) |
| LinkedIn | [linkedin.com/in/harshal-vankudre](https://www.linkedin.com/in/harshal-vankudre/) |

---

<div align="center">

Built in Karlsruhe, Germany — rebuilt from scratch more times than I'd like to admit.

</div>
