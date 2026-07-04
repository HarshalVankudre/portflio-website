// Shared portfolio data - used by both client components and API routes
// Update this file to update the AI chatbot's knowledge

export const portfolioData = {
  personal: {
    name: "Harshal Vankudre",
    location: "Karlsruhe, Germany",
    email: "harshalvankudre@gmail.com",
    github: "https://github.com/HarshalVankudre",
    linkedin: "https://www.linkedin.com/in/harshal-vankudre/",
    title: "AI Developer & Software Engineer",
    summary:
      "AI developer based in Karlsruhe building enterprise RAG systems, multi-agent chatbots, and the full-stack products around them. Since July 2026 he works on AI in cyber security at Mercedes-Benz Tech Innovation in Stuttgart, while finishing a B.Sc. in Data Science at Hochschule Karlsruhe. Fluent in German and English.",
    focus:
      "He focuses on AI systems that hold up in production — retrieval quality, evaluation, and interfaces people trust.",
    availability:
      "Harshal recently started a new role at Mercedes-Benz Tech Innovation and is NOT looking for a new job or freelance work right now. He is still happy to hear about interesting ideas, questions, and conversations via email.",
  },

  skills: {
    languages: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "HTML/CSS"],
    frameworks: ["Next.js", "React", "FastAPI", "Node.js", "Prisma", "Tailwind CSS"],
    databases: ["PostgreSQL", "MongoDB", "Pinecone", "Vector Databases"],
    cloud: ["AWS", "Google Cloud", "Azure", "Docker", "Vercel"],
    ai: ["OpenAI API", "LangChain", "RAG", "Ollama", "Prompt Engineering"],
    tools: ["Git", "VS Code", "Jira", "HubSpot", "Microsoft Excel"],
  },

  experience: [
    {
      company: "Mercedes-Benz Tech Innovation",
      role: "AI Cyber Security",
      location: "Stuttgart, Germany (Hybrid)",
      period: "Jul 2026 - Present",
      current: true,
      highlights: [
        "Working on AI applications in cyber security at Mercedes-Benz Tech Innovation",
        "Building on production experience with RAG systems, multi-agent setups, and enterprise chatbots",
      ],
      technologies: ["Python", "AI Security", "LLMs"],
      impact: "AI in cyber security for one of the world's leading automotive technology companies",
    },
    {
      company: "RÜKO GmbH Baumaschinen",
      role: "AI Developer (Working Student)",
      location: "Karlsruhe, Germany",
      period: "Oct 2025 - Apr 2026",
      current: false,
      highlights: [
        "Designing and building Rüko GPT — the company's internal AI assistant for querying its own knowledge",
        "Full-stack development with Next.js, TypeScript, Prisma, and PostgreSQL",
        "Integrating the OpenAI API for intelligent responses",
        "Implementing user authentication with NextAuth.js",
        "Extending with a separate REST API server to improve internal knowledge management",
        "Employer reference letter (Arbeitszeugnis) available at /rueko-arbeitszeugnis.pdf",
      ],
      technologies: ["Python", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI API", "NextAuth.js"],
      impact: "Built enterprise AI solutions serving 50+ employees",
    },
    {
      company: "EnBW GmbH",
      role: "Working Student",
      location: "Karlsruhe, Germany",
      period: "Sep 2024 - Feb 2025",
      current: false,
      highlights: [
        "Supported Side Trading Operations and Direct Marketing",
        "Worked with HubSpot and Microsoft Excel for data management",
        "Contributed to optimizing internal processes and workflows",
        "Created reports and presentations for stakeholders",
        "Delivered a 4-month chatbot project, improving response time by ~35%",
        "Led a 3-month pilot integrating GPT-based NLP, automating ~60% of tier-1 inquiries",
      ],
      technologies: ["HubSpot", "Excel", "Data Analysis", "GPT Integration"],
      impact: "35% faster response time, 60% tier-1 automation",
    },
    {
      company: "Enpal GmbH",
      role: "Working Student",
      location: "Berlin, Germany",
      period: "Sep 2022 - Sep 2023",
      current: false,
      highlights: [
        "Analyzed historical and current financial data to identify trends",
        "Coordinated with on-site teams to gather customer data",
        "Designed tailored solar panel configurations based on requirements",
        "Supported quoting by calculating project costs",
      ],
      technologies: ["Financial Analysis", "Data Analytics", "Solar Tech"],
      impact: "1 year supporting Germany's solar energy transition",
    },
    {
      company: "Bhumi NGO",
      role: "Volunteer Tutor",
      location: "India",
      period: "Jun 2021 - Sep 2021",
      current: false,
      highlights: [
        "Tutored underprivileged students in mathematics",
        "Explained concepts through exercises to build thinking skills",
        "Contributed to tackling educational inequality",
      ],
      technologies: ["Teaching", "Mathematics", "Community Service"],
      impact: "Helped 20+ students improve their math skills",
    },
  ],

  projects: [
    {
      name: "Rüko GPT",
      description:
        "Enterprise RAG chatbot for RÜKO GmbH Baumaschinen. Lets 50+ employees query internal company knowledge in plain language, with answers grounded in real company documents. Built end to end with Next.js, TypeScript, Prisma, PostgreSQL, and the OpenAI API.",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI API", "RAG"],
      highlight: "Production system serving 50+ employees",
    },
    {
      name: "Teams-BOT",
      description:
        "Multi-agent AI bot for Microsoft Teams with equipment database. Features parallel agent execution, 2,395+ construction equipment records, and cloud-native deployment.",
      technologies: ["Python", "Microsoft Teams API", "Multi-agent AI"],
      highlight: "2,395+ equipment records indexed",
    },
    {
      name: "EnBW Chatbot",
      description:
        "A 4-month chatbot project plus a 3-month GPT-based NLP pilot at EnBW, improving response times by ~35% and automating ~60% of tier-1 inquiries.",
      technologies: ["GPT Integration", "NLP", "HubSpot", "Data Analysis"],
      highlight: "35% faster responses, 60% tier-1 automation",
    },
    {
      name: "CourseViewer",
      description:
        "A modern course viewing application built with JavaScript. Clean UI for browsing and managing educational content.",
      technologies: ["JavaScript", "React", "Node.js"],
      highlight: "Full-stack learning project",
    },
  ],

  languages: [
    { language: "German", level: "Fluent" },
    { language: "English", level: "Fluent" },
    { language: "Hindi", level: "Native" },
    { language: "Marathi", level: "Native" },
  ],

  // Key metrics for display
  metrics: {
    yearsExperience: "2+",
    projectsCompleted: "10+",
    technologiesUsed: "20+",
    languagesSpoken: 4,
    automationRate: "60%", // tier-1 automation at EnBW
    responseImprovement: "35%", // chatbot response time improvement
    equipmentRecords: "2,395+", // Teams-BOT database
  },
};

export function getResumeContextForAI(): string {
  const { personal, skills, experience, projects, languages, metrics } = portfolioData;

  return `
You are an AI assistant for Harshal Vankudre's portfolio website.
IMPORTANT: His name is "Harshal Vankudre" - always spell it correctly as "Harshal" (not "Har" or any other variation).
Be helpful, concise, and friendly. Only answer based on the information provided below.
If asked something not covered in this data, politely say you don't have that information.
Keep responses concise (2-4 sentences) but informative. Use a professional yet approachable tone.

## About Harshal
- Name: ${personal.name}
- Location: ${personal.location}
- Current Role: AI Cyber Security at Mercedes-Benz Tech Innovation (Stuttgart, since July 2026)
- Email: ${personal.email}
- GitHub: ${personal.github}
- LinkedIn: ${personal.linkedin}

Summary: ${personal.summary}

Current focus: ${personal.focus}

Availability: ${personal.availability}

## Key Achievements
- ${metrics.yearsExperience} years of professional experience
- ${metrics.projectsCompleted} projects completed
- ${metrics.technologiesUsed} technologies in active use
- ${metrics.automationRate} tier-1 inquiry automation achieved at EnBW
- ${metrics.responseImprovement} faster response times with AI chatbot
- ${metrics.equipmentRecords} equipment records in Teams-BOT database

## Technical Skills
- Programming Languages: ${skills.languages.join(", ")}
- Frameworks & Web: ${skills.frameworks.join(", ")}
- Databases: ${skills.databases.join(", ")}
- Cloud & DevOps: ${skills.cloud.join(", ")}
- AI & ML Tools: ${skills.ai.join(", ")}
- Work Tools: ${skills.tools.join(", ")}

## Work Experience
${experience
  .map(
    (exp) => `
### ${exp.company} - ${exp.role} (${exp.period})${exp.current ? " [CURRENT]" : ""}
Location: ${exp.location}
Impact: ${exp.impact}
Key Achievements:
${exp.highlights.map((h) => `- ${h}`).join("\n")}
Technologies: ${exp.technologies.join(", ")}
`
  )
  .join("\n")}

## Projects
${projects
  .map(
    (proj) => `
### ${proj.name}
${proj.description}
Highlight: ${proj.highlight}
Technologies: ${proj.technologies.join(", ")}
`
  )
  .join("\n")}

## Languages Spoken
${languages.map((l) => `- ${l.language}: ${l.level}`).join("\n")}

---
RESPONSE GUIDELINES:
- Be conversational and helpful
- Keep answers to 2-4 sentences unless more detail is requested
- If they ask about contacting Harshal, provide email: ${personal.email}
- If they ask about hiring or recruiting him: politely explain he just started at Mercedes-Benz Tech Innovation and is not looking for a new role or freelance work right now, but his inbox is open for questions and conversations
- When relevant, speak to the impact of his work in general terms rather than asserting exact figures
`.trim();
}
