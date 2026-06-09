"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Minus, User, Bot, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickQuestions = [
  "What are Harshal's skills?",
  "Tell me about his projects",
  "What's his experience?",
  "How can I contact him?",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [buttonBottom, setButtonBottom] = useState(24);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Latest assistant message text, mirrored into an sr-only aria-live region.
  const lastAssistantMessage =
    [...messages].reverse().find((m) => m.role === "assistant")?.content ?? "";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Close on Escape and trap Tab focus within the dialog while open.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        setIsMinimized(false);
        buttonRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusable = dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (e.shiftKey) {
          if (active === first || !dialog.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Detect when the button overlaps the footer and adjust its bottom offset.
  // Uses a functional setButtonBottom update so this callback can keep a stable
  // (empty) dep array and the scroll/resize listeners attach only once.
  const checkDarkSection = useCallback(() => {
    const footer = document.querySelector("footer");
    const windowHeight = window.innerHeight;

    let newBottom = 24;

    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      if (footerRect.top < windowHeight - 20) {
        newBottom = Math.max(24, windowHeight - footerRect.top + 24);
      }
    }

    setButtonBottom((prev) => (prev === newBottom ? prev : newBottom));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(checkDarkSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    checkDarkSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [checkDarkSection]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Throttle per-token re-renders: buffer accumulated text and flush on rAF.
    let rafId: number | null = null;
    let pendingFlush = false;
    const flush = () => {
      rafId = null;
      pendingFlush = false;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: assistantMessage,
        };
        return updated;
      });
    };
    const scheduleFlush = () => {
      pendingFlush = true;
      if (rafId === null) {
        rafId = requestAnimationFrame(flush);
      }
    };

    let assistantMessage = "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          history: messages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Chat API error:", errorData);
        throw new Error(errorData.details || "Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      // Add empty assistant message that we'll update
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        // Buffer carries any partial line between chunks so we never drop a
        // token when a chunk splits mid-line.
        let buffer = "";
        const applyStreamLine = (line: string) => {
          if (!line.startsWith("data: ")) return;

          const data = line.slice(6).trim();
          if (data === "[DONE]") return;

          try {
            const parsed = JSON.parse(data);
            // Handle both Groq API format and our custom format
            const content =
              parsed.choices?.[0]?.delta?.content || parsed.content || "";
            if (content) {
              assistantMessage += content;
              scheduleFlush();
            }
          } catch {
            // Ignore parse errors for incomplete chunks
          }
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          // Keep the last (possibly partial) line for the next iteration.
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            applyStreamLine(line);
          }
        }

        if (buffer.trim()) {
          applyStreamLine(buffer);
        }
      } else {
        throw new Error("No response stream available");
      }

      // Ensure any buffered text is committed before we finish.
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (pendingFlush) {
        flush();
      }
    } catch (error) {
      console.error("Chat error:", error);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I had trouble processing that. Please try again!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(true)}
          className="fade-up fixed right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-surface/90 backdrop-blur-sm transition-[border-color,transform] duration-300 hover:scale-105 hover:border-accent sm:right-6 sm:h-14 sm:w-14"
          style={{
            bottom: buttonBottom,
            boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
          }}
          aria-label="Open chat"
        >
          <Sparkles size={22} className="text-accent" strokeWidth={2} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Harshal's AI assistant"
          data-cursor="hide"
          className={`fade-up fixed left-2 right-2 z-50 flex flex-col overflow-hidden rounded-xl border border-line-strong bg-bg shadow-[0_24px_64px_rgba(0,0,0,0.6)] sm:left-auto sm:right-6 sm:w-96 ${
            isMinimized ? "h-auto" : "h-[500px] max-h-[85vh]"
          }`}
          style={{ bottom: Math.max(buttonBottom, 16) }}
        >
          {/* Screen-reader live region: mirrors the latest assistant message
              so updates are announced without re-announcement churn from the
              per-token-mutated message node. */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {lastAssistantMessage}
          </div>

          {/* Header */}
          <div className="flex items-center justify-between border-b border-line bg-surface px-3 py-2.5 sm:px-4 sm:py-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong bg-elevated sm:h-9 sm:w-9">
                <Sparkles size={16} className="text-accent" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-fg">
                  Ask About Harshal
                </h3>
                <p className="label-mono mt-0.5 flex items-center gap-1.5">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                    aria-hidden
                  />
                  AI Assistant — Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="rounded-md p-1.5 text-dim transition-colors hover:bg-elevated hover:text-fg"
                aria-label={isMinimized ? "Expand" : "Minimize"}
              >
                <Minus size={16} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                className="rounded-md p-1.5 text-dim transition-colors hover:bg-elevated hover:text-err"
                aria-label="Close"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {/* Welcome Message */}
                {messages.length === 0 && (
                  <div className="fade-up space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-line-strong bg-elevated text-accent">
                        <Bot size={15} />
                      </div>
                      <div className="max-w-[85%] rounded-lg border border-line bg-surface p-3">
                        <p className="text-sm text-dim">
                          Hi! I&apos;m Harshal&apos;s AI assistant. Ask me
                          anything about his skills, projects, experience, or
                          how to get in touch!
                        </p>
                      </div>
                    </div>

                    {/* Quick Questions */}
                    <div className="pl-11">
                      <p className="label-mono mb-2">Quick questions:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {quickQuestions.map((q) => (
                          <button
                            key={q}
                            onClick={() => sendMessage(q)}
                            className="cursor-pointer rounded-full border border-line-strong px-3 py-1 font-mono text-[11px] text-dim transition-colors hover:border-accent hover:text-accent"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Messages */}
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`fade-up flex items-start gap-3 ${
                      msg.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border ${
                        msg.role === "user"
                          ? "border-accent bg-accent text-accent-ink"
                          : "border-line-strong bg-elevated text-accent"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User size={15} />
                      ) : (
                        <Bot size={15} />
                      )}
                    </div>
                    <div
                      className={`max-w-[85%] rounded-lg border p-3 ${
                        msg.role === "user"
                          ? "border-accent bg-accent text-accent-ink"
                          : "border-line bg-surface text-dim"
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading &&
                  messages[messages.length - 1]?.role === "user" && (
                    <div className="fade-up flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong bg-elevated text-accent">
                        <Bot size={15} />
                      </div>
                      <div className="rounded-lg border border-line bg-surface p-3">
                        <div
                          className="flex items-center gap-2 text-dim"
                          role="status"
                        >
                          <span className="font-mono text-xs uppercase tracking-[0.14em]">
                            Thinking
                          </span>
                          <span
                            aria-hidden
                            className="cursor-blink inline-block h-3 w-1.5 bg-accent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form
                onSubmit={handleSubmit}
                className="border-t border-line bg-surface p-3"
              >
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                    className="flex-1 rounded-full border border-line-strong bg-bg px-4 py-2 text-sm text-fg placeholder:text-faint focus:border-accent focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-accent text-accent-ink transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Send message"
                  >
                    <Send size={15} />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
