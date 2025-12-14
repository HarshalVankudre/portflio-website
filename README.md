<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<h1 align="center">✨ Harshal Vankudre — Portfolio</h1>

<p align="center">
  <strong>A modern, interactive portfolio website featuring 3D animations, bilingual support, and real-time GitHub integration.</strong>
</p>

<p align="center">
  <a href="https://github.com/HarshalVankudre">
    <img src="https://img.shields.io/badge/View%20Live-Portfolio-blueviolet?style=for-the-badge" alt="View Portfolio" />
  </a>
</p>

---

## 🌟 Features

<table>
  <tr>
    <td align="center" width="33%">
      <h3>🌐 Bilingual</h3>
      <p>Full English & German (EN/DE) language support with dynamic locale switching</p>
    </td>
    <td align="center" width="33%">
      <h3>🎨 3D Hero Section</h3>
      <p>Interactive Three.js particle system with pointer tracking and theme-aware colors</p>
    </td>
    <td align="center" width="33%">
      <h3>🌓 Dark/Light Mode</h3>
      <p>Seamless theme switching with persistent preferences via <code>next-themes</code></p>
    </td>
  </tr>
  <tr>
    <td align="center" width="33%">
      <h3>🔍 Command Menu</h3>
      <p>Spotlight-style navigation (<kbd>⌘</kbd>+<kbd>K</kbd>) for quick access to any section</p>
    </td>
    <td align="center" width="33%">
      <h3>📊 Impact Stats</h3>
      <p>Animated counters showcasing real-world achievements and metrics</p>
    </td>
    <td align="center" width="33%">
      <h3>💻 GitHub Integration</h3>
      <p>Live project browser pulling repositories directly from GitHub API</p>
    </td>
  </tr>
</table>

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **3D Graphics** | [Three.js](https://threejs.org/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) (Dialog, Tooltip, Popover) |
| **Command Menu** | [cmdk](https://cmdk.paco.me/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |

---

## 📸 Preview

<p align="center">
  <img src="https://i.imgur.com/placeholder.png" alt="Portfolio Preview" width="100%" />
</p>

> **Note:** Replace the placeholder image above with an actual screenshot of your deployed site.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/HarshalVankudre/portflio-website.git
cd portflio-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/           # Internationalized pages (EN/DE)
│   │   ├── page.tsx        # Home page
│   │   ├── projects/       # Projects page
│   │   └── resume/         # Resume page
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/
│   ├── contact/            # Contact form & section
│   ├── projects/           # Featured projects & GitHub browser
│   ├── resume/             # Experience, education, skills
│   ├── stats/              # Impact statistics
│   ├── three/              # Three.js 3D background
│   ├── ui/                 # Reusable UI components
│   ├── command-menu.tsx    # Spotlight search
│   ├── site-header.tsx     # Navigation header
│   └── site-footer.tsx     # Footer component
├── data/
│   └── resume.ts           # Localized resume content
└── lib/
    ├── github.ts           # GitHub API integration
    ├── i18n.ts             # Internationalization config
    └── utils.ts            # Utility functions
```

---

## ✨ Key Sections

### 🏠 Hero Section
Interactive 3D particle background with animated introduction and quick navigation links.

### 📈 Impact Stats
Showcasing quantified achievements:
- **35%** faster response times through chatbot automation
- **60%** Tier-1 inquiries automated via GPT-based NLP
- **40%** reduction in manual handling time

### 💼 Experience Timeline
Professional experience at:
- **EnBW GmbH** — Working Student (Side Trading Operations)
- **Enpal GmbH** — Working Student (Data Analysis & Solar Configuration)
- **Bhumi NGO** — Volunteer Tutor (Mathematics)

### 🎓 Education
- **Hochschule Karlsruhe** — Business Informatics (BSc) *(Current)*
- **HTWG Konstanz** — Studienkolleg

### 🛠️ Skills Grid
Categorized skills including:
- **Languages & Core:** Java, Python, JavaScript, SQL
- **Frameworks & Web:** React, Vue.js, Spring Boot
- **AI & LLM Tooling:** Ollama, LangChain, Stable Diffusion, Flux

### 📂 Projects
Featured projects with GitHub integration:
- **AI-BombGame** — AI-powered game with challenging opponent
- **File Sorter** — Automated file organization tool
- **Game Rating Website** — Modern React + Vite web app

---

## 🌍 Internationalization

The site supports **English** and **German** with seamless switching:

- `/en` — English version
- `/de` — German version

All content (headlines, descriptions, experience bullets) is fully translated.

---

## 🎨 Theming

The portfolio features a sophisticated dark/light mode system:

| Mode | Primary Accent |
|------|---------------|
| 🌙 Dark | Purple (`#a855f7`) |
| ☀️ Light | Sky Blue (`#0ea5e9`) |

Theme preferences are automatically persisted across sessions.

---

## 📬 Contact

<p align="center">
  <a href="mailto:harshalvankudre@gmail.com">
    <img src="https://img.shields.io/badge/Email-harshalvankudre%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
  <a href="https://www.linkedin.com/in/harshal-vankudre">
    <img src="https://img.shields.io/badge/LinkedIn-Harshal%20Vankudre-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://github.com/HarshalVankudre">
    <img src="https://img.shields.io/badge/GitHub-HarshalVankudre-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
</p>

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <sub>Built with 💜 using Next.js, Three.js, and Tailwind CSS</sub>
</p>
