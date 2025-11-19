const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function callGemini(prompt, systemInstruction, assistantStrings) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

  if (!apiKey) {
    return assistantStrings.apiKeyMissing;
  }

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error (${response.status})`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || assistantStrings.fallback;
  } catch (error) {
    logDevError(error);
    return assistantStrings.offline;
  }
}

export function getPortfolioContext({ personalInfo, experiences, projects, skills }) {
  return `
    You are an AI assistant for Harshal Vankudre's portfolio website.
    Your name is "Harshal's AI Agent".

    Here is Harshal's data:
    Personal Info: ${JSON.stringify(personalInfo)}
    Skills: ${JSON.stringify(skills)}
    Experience: ${JSON.stringify(experiences)}
    Projects: ${JSON.stringify(projects)}

    Rules:
    1. Deliver exceptionally concise, impactful responses (1-2 sentences maximum).
    2. Leverage sophisticated technical terminology and industry-specific lexicon.
    3. Emphasize Harshal's technical prowess, architectural expertise, and innovative contributions.
    4. Use powerful descriptors: "architected," "engineered," "orchestrated," "optimized," "pioneered."
    5. For unknown queries, professionally redirect to direct communication channels.
    6. Maintain an authoritative yet approachable tone befitting a senior technologist.
  `;
}

function logDevError(error) {
  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  }
}
