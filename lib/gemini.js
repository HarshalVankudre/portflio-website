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

    CRITICAL RULES:
    1. MAXIMUM 10 WORDS PER RESPONSE. No exceptions.
    2. Use format: "Harshal is [role]. He builds [what]."
    3. Ultra-concise. Omit articles when possible.
    4. Use powerful, technical terms: "architects," "engineers," "orchestrates."
    5. For unknown queries: "Contact Harshal directly for details."
    6. Example: "Full-stack AI architect building intelligent, scalable applications."
  `;
}

function logDevError(error) {
  if (process.env.NODE_ENV !== "production") {
    console.error(error);
  }
}
