import { NextRequest } from "next/server";
import { getResumeContextForAI } from "@/lib/portfolioData";
import { getClientIp, rateLimit } from "@/lib/ratelimit";

interface ChatBody {
  message: string;
  history?: { role: string; content: string }[];
}

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_CONTENT_LENGTH = 4000;

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

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY is not set");
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemPrompt = getResumeContextForAI();

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
        model: "llama-3.1-8b-instant",
        messages,
        temperature: 0.7,
        max_tokens: 500,
        stream: true,
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error("Groq API error:", errorText);
      throw new Error(`Groq API error: ${groqResponse.status}`);
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
