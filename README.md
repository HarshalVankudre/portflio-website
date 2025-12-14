## Portfolio (Next.js)

Modern portfolio website for **Harshal Vankudre**, built with **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, **Radix UI**, **Three.js** (animated hero background), and a live **GitHub projects** browser.

### Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Update content

- Resume/CV content: `src/data/resume.ts`
- PDF CV file served at `/cv.pdf`: `public/cv.pdf`

### GitHub integration

Repositories are fetched from GitHub at build/runtime and cached for 1 hour.

Optional (recommended for deployments): set `GITHUB_TOKEN` to avoid GitHub rate limits.

```bash
setx GITHUB_TOKEN "ghp_..."
```
