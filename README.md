# vankudre.com

Personal site of Harshal Vankudre — a single static page with projects,
experience, skills, and CV downloads.

Built with Next.js 16, React 19, and Tailwind CSS 4. Deployed on Vercel.

## Development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`; it feeds
the canonical URL, sitemap, robots.txt, and Open Graph metadata.

## Notes

- Page content mirrors [`public/cv.pdf`](public/cv.pdf) and never goes beyond it.
- `public/sw.js` is a teardown worker: an earlier version of the site was a PWA,
  and this worker unregisters the old service worker and clears its caches for
  returning visitors. Keep it deployed.
- `src/fonts/` holds latin WOFF subsets used only to render the Open Graph
  image at build time; the page itself loads fonts via `next/font`.
