// Shared portfolio data - used by both client components and API routes
// Update this file to update the AI chatbot's knowledge

export const portfolioData = {
  personal: {
    name: "Harshal Vankudre",
    location: "Karlsruhe, Germany",
    email: "harshalvankudre@gmail.com",
    github: "https://github.com/HarshalVankudre",
    linkedin: "https://linkedin.com/in/harshalvankudre",
    title: "AI Developer & Business Informatics Student",
    summary:
      "Ambitious Business Informatics student with fluent German and English. Passionate about software development and data analysis, with hands-on experience in Java, Python, and modern web frameworks.",
    lookingFor:
      "I'm looking for opportunities where I can combine software engineering and data analysis to create measurable impact.",
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
      company: "RÜKO GmbH Baumaschinen",
      role: "AI Developer",
      location: "Karlsruhe, Germany",
      period: "Oct 2025 - Present",
      current: true,
      highlights: [
        "Designing and building 'Rüko GPT' - an internal AI chatbot for querying company data",
        "Full-stack development with Next.js, TypeScript, Prisma, and PostgreSQL",
        "Integrating the OpenAI API for intelligent responses",
        "Implementing user authentication with NextAuth.js",
        "Extending with a separate REST API server to improve internal knowledge management",
      ],
      technologies: ["Python", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI API", "NextAuth.js"],
      impact: "Building enterprise AI solutions for 50+ employees",
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

  education: [
    {
      institution: "Hochschule Karlsruhe (HKA)",
      degree: "Business Informatics (BSc)",
      period: "2024 - Present",
      current: true,
      highlights: [
        "Focus areas: software engineering, databases, and business applications",
        "Hands-on coursework in Java, Python, data analysis, and agile methods (Scrum)",
      ],
    },
    {
      institution: "HTWG Konstanz",
      degree: "Studienkolleg",
      period: "2021 - 2022",
      current: false,
      highlights: ["Foundation in CS, math, German, economics, and law"],
    },
  ],

  projects: [
    {
      name: "Baumaschinen KI-Chatbot",
      description:
        "Enterprise-grade AI chatbot for construction machinery support. Features RAG with document processing, OpenAI integration, and comprehensive analytics.",
      technologies: ["Python", "FastAPI", "OpenAI", "RAG", "Vector DB"],
      highlight: "Production system serving real users",
    },
    {
      name: "Teams-BOT",
      description:
        "Multi-agent AI bot for Microsoft Teams with equipment database. Features parallel agent execution, 2,395+ construction equipment records, and cloud-native deployment.",
      technologies: ["Python", "Microsoft Teams API", "Multi-agent AI"],
      highlight: "2,395+ equipment records indexed",
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
  const { personal, skills, experience, education, projects, languages, metrics } = portfolioData;

  return `
You are an AI assistant for Harshal Vankudre's portfolio website.
IMPORTANT: His name is "Harshal Vankudre" - always spell it correctly as "Harshal" (not "Har" or any other variation).
Be helpful, concise, and friendly. Only answer based on the information provided below.
If asked something not covered in this data, politely say you don't have that information.
Keep responses concise (2-4 sentences) but informative. Use a professional yet approachable tone.

## About Harshal
- Name: ${personal.name}
- Location: ${personal.location}
- Current Role: AI Developer at RÜKO GmbH Baumaschinen
- Email: ${personal.email}
- GitHub: ${personal.github}
- LinkedIn: ${personal.linkedin}

Summary: ${personal.summary}

What he's looking for: ${personal.lookingFor}

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
- If they ask about hiring, mention he's open to roles combining software engineering and AI/data analysis
- Highlight specific achievements with numbers when relevant (35% faster, 60% automation, etc.)
`.trim();
}
