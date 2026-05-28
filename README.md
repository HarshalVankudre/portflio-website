# 🟨 Harshal Vankudre | Portfolio

A modern, neobrutalist portfolio website built with Next.js 16, TypeScript, and Tailwind CSS. Features an AI chatbot, secret terminal easter egg, and lightning-fast performance with service worker caching.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff69b4?style=flat-square&logo=framer)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=flat-square&logo=openai)

---

## ✨ Features

### Core
- **Neobrutalist Design** — Bold borders, harsh shadows, high-contrast colors
- **Bilingual Support** — English & German language toggle
- **Contact Form** — Powered by Resend API
- **Responsive** — Mobile-first, works on all devices
- **Animations** — Smooth transitions with Framer Motion

### AI Chatbot
- **GPT-4 Powered** — Ask questions about my skills, projects, and experience
- **Streaming Responses** — Real-time typing effect
- **Quick Questions** — Pre-built prompts for common queries
- **Context-Aware** — Knows my entire portfolio

### Secret Terminal (Easter Egg)
Press **`** to open a fully-functional terminal with 20+ commands:

| Command | Description |
|---------|-------------|
| `help` | List all available commands |
| `about`, `skills`, `projects` | View portfolio info |
| `cd <section>` | Navigate to any section |
| `open github/linkedin/email` | Open external links |
| `hack` | Try to "hack" the system |
| `matrix` | Enter the Matrix |
| `fortune` | Get a random fortune |
| `neofetch` | System info display |
| `coffee` | Coffee break ASCII art |

### Performance
- **Loading Screen** — Animated progress bar on first visit
- **Service Worker Caching** — Instant loads on repeat visits
- **Static Site Generation** — Pre-rendered pages for maximum speed
- **Session-Based Loading** — Loading screen only shows once per session

### GitHub Integration
- **Live Stats** — Real-time GitHub contribution data
- **Repository Showcase** — Featured repos with stars and forks

---

## 🎨 Design System

| Color | Hex | Usage |
|-------|-----|-------|
| 🟨 Primary | `#FFE500` | Highlights, CTAs |
| 🔴 Red | `#FF6B6B` | Accents |
| 🔵 Cyan | `#4ECDC4` | Accents |
| 🟣 Purple | `#A855F7` | Accents, Chatbot |
| 🟢 Lime | `#84CC16` | Accents |

---

## 🛠️ Tech Stack

```
Frontend        Next.js 16, React 19, TypeScript
Styling         Tailwind CSS 4, Framer Motion
AI              OpenAI GPT-4, Streaming API
Email           Resend API
Caching         Service Worker, Session Storage
Deployment      Vercel
```

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/HarshalVankudre/portfolio.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Add your API keys to `.env.local`:
```env
GROQ_API_KEY=your_groq_key
RESEND_API_KEY=your_resend_key
GITHUB_TOKEN=your_github_token (optional — without it the GitHub section hides contribution stats)
NEXT_PUBLIC_SITE_URL=https://vankudre.com
```

```bash
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/      # AI chatbot API (streaming)
│   │   ├── github/    # GitHub stats API
│   │   └── send/      # Contact form API
│   ├── globals.css    # Global styles
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Home page
├── components/
│   ├── ChatBot.tsx    # AI chatbot widget
│   ├── Terminal.tsx   # Secret terminal easter egg
│   ├── LoadingScreen.tsx # Loading progress bar
│   ├── GitHubStats.tsx # GitHub integration
│   ├── Hero.tsx       # Landing section
│   ├── About.tsx      # About section
│   ├── Skills.tsx     # Skills grid
│   ├── Experience.tsx # Work timeline
│   ├── Projects.tsx   # Featured projects
│   ├── Education.tsx  # Academic background
│   ├── Contact.tsx    # Contact form
│   ├── Navbar.tsx     # Navigation
│   └── Footer.tsx     # Footer
├── hooks/
│   └── useKonamiCode.tsx # Terminal activation hook
├── lib/
│   └── portfolioData.ts  # Portfolio content + single source for AI chatbot context
├── context/
│   └── LanguageContext.tsx # i18n
└── public/
    ├── sw.js          # Service worker
    └── manifest.json  # PWA manifest
```

---

## 🎮 Easter Eggs

1. **Secret Terminal** — Press **`** (backtick) anywhere to open
2. **Matrix Mode** — Type `matrix` in the terminal
3. **Hack Animation** — Type `hack` for a fun sequence
4. **Neofetch** — Type `neofetch` for system info

---

## 📧 Contact

**Harshal Vankudre**

- 🌐 [vankudre.com](https://vankudre.com)
- 📧 harshalvankudre@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/harshal-vankudre/)
- 🐙 [GitHub](https://github.com/HarshalVankudre)

---

<p align="center">
  <strong>Built with ☕ in Karlsruhe, Germany</strong>
</p>
