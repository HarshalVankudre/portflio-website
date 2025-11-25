export const SKILLS = [
  // Frontend
  { name: "React & Next.js", icon: "Code", category: "frontend", level: 90 },
  { name: "TypeScript", icon: "Terminal", category: "frontend", level: 85 },
  { name: "Tailwind CSS", icon: "Code", category: "frontend", level: 88 },

  // AI/ML
  { name: "Python & LangChain", icon: "Brain", category: "ai", level: 88 },
  { name: "RAG Systems", icon: "Search", category: "ai", level: 85 },
  { name: "Vector DBs", icon: "Search", category: "ai", level: 82 },
  { name: "Ollama & Local LLMs", icon: "Bot", category: "ai", level: 80 },

  // Backend
  { name: "Java", icon: "Coffee", category: "backend", level: 75 },
  { name: "PostgreSQL & Prisma", icon: "Database", category: "backend", level: 80 },
  { name: "FastAPI", icon: "Terminal", category: "backend", level: 82 },

  // DevOps
  { name: "Docker & Nginx", icon: "Container", category: "devops", level: 78 },
  { name: "Google Cloud (GCP)", icon: "Cloud", category: "devops", level: 75 },
];

export const SKILL_CATEGORIES = {
  en: {
    frontend: "Frontend Development",
    ai: "AI & Machine Learning",
    backend: "Backend Development",
    devops: "DevOps & Cloud",
  },
  de: {
    frontend: "Frontend-Entwicklung",
    ai: "KI & Maschinelles Lernen",
    backend: "Backend-Entwicklung",
    devops: "DevOps & Cloud",
  },
};
