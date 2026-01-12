// Dynamic resume context builder - fetches data from translations
import { translations } from "@/context/LanguageContext";

// Static data that doesn't change with translations
const staticData = {
  personal: {
    name: "Harshal Vankudre",
    email: "harshalvankudre@gmail.com",
    github: "https://github.com/HarshalVankudre",
    linkedin: "https://linkedin.com/in/harshalvankudre",
  },
  skills: {
    languages: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "HTML/CSS"],
    frameworks: ["Next.js", "React", "FastAPI", "Node.js", "Prisma", "Tailwind CSS"],
    databases: ["PostgreSQL", "MongoDB", "Pinecone", "Vector Databases"],
    cloud: ["AWS", "Google Cloud", "Azure", "Docker", "Vercel"],
    ai: ["OpenAI API", "LangChain", "RAG", "Ollama", "Prompt Engineering"],
    tools: ["Git", "VS Code", "Jira", "HubSpot", "Microsoft Excel"],
  },
  languages: [
    { language: "German", level: "Fluent" },
    { language: "English", level: "Fluent" },
    { language: "Hindi", level: "Native" },
    { language: "Marathi", level: "Native" },
  ],
};

export function getResumeContextForAI(lang: "en" | "de" = "en"): string {
  const t = translations[lang];

  // Build experience data dynamically from translations
  const experiences = [
    {
      company: "RÜKO GmbH Baumaschinen",
      role: t["exp.ruko.role"],
      location: t["hero.location"],
      period: "Oct 2025 - Present",
      current: true,
      highlights: [
        t["exp.ruko.h1"],
        t["exp.ruko.h2"],
        t["exp.ruko.h3"],
        t["exp.ruko.h4"],
        t["exp.ruko.h5"],
      ],
      technologies: ["Python", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI API", "NextAuth.js"],
    },
    {
      company: "EnBW GmbH",
      role: t["exp.enbw.role"],
      location: t["hero.location"],
      period: "Sep 2024 - Feb 2025",
      highlights: [
        t["exp.enbw.h1"],
        t["exp.enbw.h2"],
        t["exp.enbw.h3"],
        t["exp.enbw.h4"],
        t["exp.enbw.h5"],
        t["exp.enbw.h6"],
      ],
      technologies: ["HubSpot", "Excel", "Data Analysis", "GPT Integration"],
    },
    {
      company: "Enpal GmbH",
      role: t["exp.enpal.role"],
      location: "Berlin, Germany",
      period: "Sep 2022 - Sep 2023",
      highlights: [
        t["exp.enpal.h1"],
        t["exp.enpal.h2"],
        t["exp.enpal.h3"],
        t["exp.enpal.h4"],
      ],
      technologies: ["Financial Analysis", "Data Analytics", "Solar Tech"],
    },
    {
      company: "Bhumi NGO",
      role: t["exp.bhumi.role"],
      location: "India",
      period: "Jun 2021 - Sep 2021",
      highlights: [
        t["exp.bhumi.h1"],
        t["exp.bhumi.h2"],
        t["exp.bhumi.h3"],
      ],
      technologies: ["Teaching", "Mathematics", "Community Service"],
    },
  ];

  // Build education data dynamically
  const education = [
    {
      institution: "Hochschule Karlsruhe (HKA)",
      degree: t["edu.hka.degree"],
      period: "2024 - Present",
      current: true,
      highlights: [t["edu.hka.h1"], t["edu.hka.h2"]],
    },
    {
      institution: "HTWG Konstanz",
      degree: t["edu.htwg.degree"],
      period: "2021 - 2022",
      highlights: [t["edu.htwg.h1"]],
    },
  ];

  // Build projects data dynamically
  const projects = [
    {
      name: t["proj.chatbot.title"],
      description: t["proj.chatbot.desc"],
      technologies: ["Python", "FastAPI", "OpenAI", "RAG", "Vector DB"],
    },
    {
      name: t["proj.teams.title"],
      description: t["proj.teams.desc"],
      technologies: ["Python", "Microsoft Teams API", "Multi-agent AI"],
    },
    {
      name: t["proj.course.title"],
      description: t["proj.course.desc"],
      technologies: ["JavaScript", "React", "Node.js"],
    },
  ];

  const { personal, skills, languages } = staticData;

  return `
You are an AI assistant that answers questions about Harshal Vankudre's professional background.
Be helpful, concise, and friendly. Only answer based on the information provided below.
If asked something not covered in this data, politely say you don't have that information.
Keep responses concise but informative.

## About Harshal
- Name: ${personal.name}
- Location: ${t["hero.location"]}
- Current Role: ${t["exp.ruko.role"]} at RÜKO GmbH Baumaschinen
- Email: ${personal.email}
- GitHub: ${personal.github}
- LinkedIn: ${personal.linkedin}

Summary: ${t["hero.description"]}

## What Harshal is Looking For
${t["about.looking"]}

## Technical Skills
- Programming Languages: ${skills.languages.join(", ")}
- Frameworks & Web: ${skills.frameworks.join(", ")}
- Databases: ${skills.databases.join(", ")}
- Cloud & DevOps: ${skills.cloud.join(", ")}
- AI & ML Tools: ${skills.ai.join(", ")}
- Work Tools: ${skills.tools.join(", ")}

## Work Experience
${experiences
  .map(
    (exp) => `
### ${exp.company} - ${exp.role} (${exp.period})${exp.current ? " [CURRENT]" : ""}
Location: ${exp.location}
Key Achievements:
${exp.highlights.map((h) => `- ${h}`).join("\n")}
Technologies: ${exp.technologies.join(", ")}
`
  )
  .join("\n")}

## Education
${education
  .map(
    (edu) => `
### ${edu.institution} - ${edu.degree} (${edu.period})${edu.current ? " [CURRENT]" : ""}
${edu.highlights.map((h) => `- ${h}`).join("\n")}
`
  )
  .join("\n")}

## Projects
${projects
  .map(
    (proj) => `
### ${proj.name}
${proj.description}
Technologies: ${proj.technologies.join(", ")}
`
  )
  .join("\n")}

## Languages Spoken
${languages.map((l) => `- ${l.language}: ${l.level}`).join("\n")}

---
Answer the user's question based on the above information. Be conversational and helpful.
If they ask about contacting Harshal, provide the email: ${personal.email}
If they ask about hiring or opportunities, mention he's open to roles combining software engineering and data analysis.
`.trim();
}

// Export for backwards compatibility
export const resumeData = {
  personal: staticData.personal,
  skills: staticData.skills,
  languages: staticData.languages,
};
