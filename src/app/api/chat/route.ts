import { NextRequest } from "next/server";
import { getResumeContextForAI, portfolioData } from "@/lib/portfolioData";
import { getClientIp, rateLimit } from "@/lib/ratelimit";

interface ChatBody {
  message: string;
  history?: { role: string; content: string }[];
}

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

function getFallbackAnswer(message: string) {
  const query = message.toLowerCase();
  const { personal, skills, experience, projects, languages, metrics } = portfolioData;

  if (query.includes("contact") || query.includes("email") || query.includes("reach")) {
    return `You can contact Harshal at ${personal.email}. He is based in ${personal.location}, and you can also find him on GitHub (${personal.github}) and LinkedIn (${personal.linkedin}).`;
  }

  if (query.includes("project") || query.includes("portfolio") || query.includes("built")) {
    const featured = projects
      .slice(0, 3)
      .map((project) => `${project.name}: ${project.description}`)
      .join(" ");
    return `Harshal's featured projects include ${featured} These show his focus on AI systems, RAG, automation, and practical full-stack delivery.`;
  }

  if (query.includes("experience") || query.includes("work") || query.includes("job")) {
    const current = experience.find((item) => item.current);
    return `Harshal is currently an ${current?.role} at ${current?.company}, building enterprise AI tools for internal knowledge access. He also has experience at EnBW, Enpal, and Bhumi NGO, including chatbot automation, data workflows, financial analysis, and teaching.`;
  }

  if (query.includes("skill") || query.includes("tech") || query.includes("stack")) {
    return `Harshal works with ${skills.languages.join(", ")} and frameworks like ${skills.frameworks.join(", ")}. His AI and data stack includes ${skills.ai.join(", ")}, plus databases such as ${skills.databases.join(", ")}.`;
  }

  if (query.includes("language") || query.includes("german") || query.includes("english")) {
    return `Harshal speaks ${languages
      .map((item) => `${item.language} (${item.level})`)
      .join(", ")}. He is fluent in German and English.`;
  }

  return `Harshal is an AI Developer and Software Engineer based in ${personal.location}. He has ${metrics.yearsExperience} years of experience, works across AI, data, and full-stack development, and has built projects involving RAG, chatbots, Teams automation, and modern web apps.`;
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
    const body = (await request.json()) as ChatBody;
    const { message } = body;
    const history = body.history;

    if (!message || typeof message !== "string") {
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

    // Sanitize history: keep only well-formed user/assistant turns, never "system".
    const sanitizedHistory: { role: "user" | "assistant"; content: string }[] = [];
    if (Array.isArray(history)) {
      for (const msg of history) {
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

    const systemPrompt = getResumeContextForAI();
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.warn("GROQ_API_KEY is not set. Using portfolio fallback response.");
      return createStreamResponse(getFallbackAnswer(trimmedMessage), true);
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
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
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
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("Groq API error:", errorText);
      return createStreamResponse(getFallbackAnswer(trimmedMessage), true);
    }

    if (!groqResponse.body) {
      console.error("Groq API returned an empty response body");
      return createStreamResponse(getFallbackAnswer(trimmedMessage), true);
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
