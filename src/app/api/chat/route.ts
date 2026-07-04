import { NextRequest } from "next/server";
import { getResumeContextForAI, portfolioData } from "@/lib/portfolioData";
import { getClientIp, rateLimit } from "@/lib/ratelimit";

interface ChatBody {
  message: string;
  history?: { role: string; content: string }[];
  language?: string;
}

type ChatLanguage = "en" | "de";

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_CONTENT_LENGTH = 4000;
const DEFAULT_GROQ_MODEL = "llama-3.1-8b-instant";

function createStreamResponse(text: string, fallback = false) {
  const encoder = new TextEncoder();
  const words = text.split(/(\s+)/).filter(Boolean);

  const stream = new ReadableStream({
    start(controller) {
      for (const word of words) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ content: word })}\n\n`)
        );
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      ...(fallback ? { "X-Chat-Fallback": "true" } : {}),
    },
  });
}

function getFallbackAnswer(message: string, language: ChatLanguage = "en") {
  const query = message.toLowerCase();
  const { personal, skills, experience, projects, languages, metrics } = portfolioData;
  const de = language === "de";

  if (
    query.includes("hire") ||
    query.includes("hiring") ||
    query.includes("available") ||
    query.includes("freelance") ||
    query.includes("recruit") ||
    query.includes("open to work") ||
    query.includes("einstellen") ||
    query.includes("verfügbar") ||
    query.includes("freiberuflich")
  ) {
    return de
      ? `Harshal hat im Juli 2026 bei Mercedes-Benz Tech Innovation angefangen (AI Cyber Security, Stuttgart) und sucht aktuell keine neue Stelle und keine Freelance-Projekte. Für Fragen, Ideen oder ein gutes Gespräch erreichst du ihn unter ${personal.email}.`
      : `Harshal joined Mercedes-Benz Tech Innovation in July 2026 (AI Cyber Security, Stuttgart) and is not looking for a new role or freelance work right now. For questions, ideas, or a good conversation, you can reach him at ${personal.email}.`;
  }

  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("reach") ||
    query.includes("kontakt") ||
    query.includes("erreich")
  ) {
    return de
      ? `Du erreichst Harshal unter ${personal.email}. Er ist in ${personal.location} ansässig; du findest ihn auch auf GitHub (${personal.github}) und LinkedIn (${personal.linkedin}).`
      : `You can contact Harshal at ${personal.email}. He is based in ${personal.location}, and you can also find him on GitHub (${personal.github}) and LinkedIn (${personal.linkedin}).`;
  }

  if (
    query.includes("project") ||
    query.includes("portfolio") ||
    query.includes("built") ||
    query.includes("projekt")
  ) {
    const featured = projects
      .slice(0, 3)
      .map((project) => `${project.name}: ${project.description}`)
      .join(" ");
    return de
      ? `Zu Harshals Projekten gehören ${featured} Sie zeigen seinen Fokus auf KI-Systeme, RAG, Automatisierung und pragmatische Full-Stack-Entwicklung.`
      : `Harshal's featured projects include ${featured} These show his focus on AI systems, RAG, automation, and practical full-stack delivery.`;
  }

  if (
    query.includes("experience") ||
    query.includes("work") ||
    query.includes("job") ||
    query.includes("erfahrung") ||
    query.includes("arbeit")
  ) {
    const current = experience.find((item) => item.current);
    return de
      ? `Harshal arbeitet seit Juli 2026 an KI in der Cyber Security bei ${current?.company} in Stuttgart. Davor hat er bei RÜKO GmbH Baumaschinen Rüko GPT gebaut — einen Enterprise-RAG-Chatbot für 50+ Mitarbeitende — und bei EnBW Chatbot-Automatisierung mit ~35% schnelleren Antworten und ~60% Tier-1-Automatisierung geliefert.`
      : `Since July 2026, Harshal works on AI in cyber security at ${current?.company} in Stuttgart. Before that he built Rüko GPT at RÜKO GmbH Baumaschinen — an enterprise RAG chatbot serving 50+ employees — and delivered chatbot automation at EnBW with ~35% faster responses and ~60% tier-1 automation.`;
  }

  if (
    query.includes("skill") ||
    query.includes("tech") ||
    query.includes("stack") ||
    query.includes("fähigkeit")
  ) {
    return de
      ? `Harshal arbeitet mit ${skills.languages.join(", ")} und Frameworks wie ${skills.frameworks.join(", ")}. Sein KI- und Daten-Stack umfasst ${skills.ai.join(", ")}, dazu Datenbanken wie ${skills.databases.join(", ")}.`
      : `Harshal works with ${skills.languages.join(", ")} and frameworks like ${skills.frameworks.join(", ")}. His AI and data stack includes ${skills.ai.join(", ")}, plus databases such as ${skills.databases.join(", ")}.`;
  }

  if (
    query.includes("language") ||
    query.includes("german") ||
    query.includes("english") ||
    query.includes("sprache") ||
    query.includes("deutsch") ||
    query.includes("englisch")
  ) {
    const spoken = languages
      .map((item) => `${item.language} (${item.level})`)
      .join(", ");
    return de
      ? `Harshal spricht ${spoken}. Er spricht fließend Deutsch und Englisch.`
      : `Harshal speaks ${spoken}. He is fluent in German and English.`;
  }

  return de
    ? `Harshal ist KI-Entwickler und Software Engineer in ${personal.location}. Er hat ${metrics.yearsExperience} Jahre Erfahrung, arbeitet in KI, Daten und Full-Stack-Entwicklung und hat Projekte mit RAG, Chatbots, Teams-Automatisierung und modernen Web-Apps gebaut.`
    : `Harshal is an AI Developer and Software Engineer based in ${personal.location}. He has ${metrics.yearsExperience} years of experience, works across AI, data, and full-stack development, and has built projects involving RAG, chatbots, Teams automation, and modern web apps.`;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { ok, retryAfter } = rateLimit(`chat:${ip}`, {
    limit: 20,
    windowMs: 5 * 60 * 1000,
  });
  if (!ok) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(retryAfter),
        },
      }
    );
  }

  try {
    let body: ChatBody;
    try {
      body = (await request.json()) as ChatBody;
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const { message } = body;
    const history = body.history;
    const language: ChatLanguage = body.language === "de" ? "de" : "en";

    if (!message || typeof message !== "string" || !message.trim()) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (history !== undefined && !Array.isArray(history)) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Sanitize history: keep only well-formed user/assistant turns, never
    // "system". Only the most recent turns matter, so cap the work up front
    // instead of iterating an arbitrarily large payload.
    const sanitizedHistory: { role: "user" | "assistant"; content: string }[] = [];
    if (Array.isArray(history)) {
      for (const msg of history.slice(-20)) {
        if (
          msg &&
          typeof msg.content === "string" &&
          (msg.role === "user" || msg.role === "assistant")
        ) {
          sanitizedHistory.push({
            role: msg.role,
            content: msg.content.slice(0, MAX_HISTORY_CONTENT_LENGTH),
          });
        }
      }
    }

    const trimmedMessage = message.slice(0, MAX_MESSAGE_LENGTH);

    const languageInstruction =
      language === "de"
        ? "Antworte auf Deutsch (du-Form), außer der Nutzer schreibt auf Englisch."
        : "Reply in English unless the user writes in German.";
    const systemPrompt = `${getResumeContextForAI()}\n\n${languageInstruction}`;
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.warn("GROQ_API_KEY is not set. Using portfolio fallback response.");
      return createStreamResponse(getFallbackAnswer(trimmedMessage, language), true);
    }

    // Build messages array with history
    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: systemPrompt },
    ];

    // Add conversation history (last 10 messages to keep context manageable)
    const recentHistory = sanitizedHistory.slice(-10);
    for (const msg of recentHistory) {
      messages.push({
        role: msg.role,
        content: msg.content,
      });
    }

    // Add current message
    messages.push({ role: "user", content: trimmedMessage });

    // Use Groq REST API directly instead of SDK
    let groqResponse: Response;
    try {
      groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || DEFAULT_GROQ_MODEL,
          messages,
          temperature: 0.7,
          max_tokens: 500,
          stream: true,
        }),
        signal: AbortSignal.timeout(25_000),
      });
    } catch (error) {
      // Timeout/abort or network failure — degrade to the canned answer.
      console.error(
        "Groq request failed:",
        error instanceof Error ? error.message : error
      );
      return createStreamResponse(getFallbackAnswer(trimmedMessage, language), true);
    }

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("Groq API error:", errorText);
      return createStreamResponse(getFallbackAnswer(trimmedMessage, language), true);
    }

    if (!groqResponse.body) {
      console.error("Groq API returned an empty response body");
      return createStreamResponse(getFallbackAnswer(trimmedMessage, language), true);
    }

    // Forward the streaming response
    return new Response(groqResponse.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error instanceof Error ? error.message : error);
    return new Response(
      JSON.stringify({ error: "Failed to process message" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
