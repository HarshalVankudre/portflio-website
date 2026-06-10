"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const COPY = {
  en: {
    header: "ASK — HV·AI",
    greeting:
      "Hi! I'm HV·AI — Harshal's assistant. Ask me anything about his skills, projects, experience, or how to get in touch.",
    quickLabel: "Quick questions",
    questions: [
      "What are Harshal's skills?",
      "Tell me about his projects",
      "What's his experience?",
      "How can I contact him?",
    ],
    placeholder: "Ask me anything…",
    error: "Sorry, I had trouble processing that. Please try again.",
    thinking: "Thinking",
    you: "You",
    openChat: "Open chat",
    closeChat: "Close chat",
    minimize: "Minimize",
    expand: "Expand",
    dialog: "Chat with Harshal's AI assistant",
    conversation: "Conversation",
    inputLabel: "Your question",
    send: "Send message",
  },
  de: {
    header: "FRAG — HV·AI",
    greeting:
      "Hi! Ich bin HV·AI — Harshals Assistent. Frag mich alles über seine Skills, Projekte und Erfahrung oder wie du ihn erreichst.",
    quickLabel: "Schnelle Fragen",
    questions: [
      "Was sind Harshals Skills?",
      "Erzähl mir von seinen Projekten",
      "Welche Erfahrung hat er?",
      "Wie kann ich ihn kontaktieren?",
    ],
    placeholder: "Frag mich etwas…",
    error: "Sorry, da ist etwas schiefgelaufen. Versuch es bitte nochmal.",
    thinking: "Denkt nach",
    you: "Du",
    openChat: "Chat öffnen",
    closeChat: "Chat schließen",
    minimize: "Minimieren",
    expand: "Maximieren",
    dialog: "Chat mit Harshals KI-Assistent",
    conversation: "Unterhaltung",
    inputLabel: "Deine Frage",
    send: "Nachricht senden",
  },
} as const;

// Touch devices: focusing the input pops the on-screen keyboard over the
// dialog, so we only auto-focus on fine pointers.
const isCoarsePointer = () => window.matchMedia("(pointer: coarse)").matches;

export default function ChatWidget() {
  const { language } = useLanguage();
  const copy = COPY[language];

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [buttonBottom, setButtonBottom] = useState(24);
  // Last COMPLETED assistant reply for the sr-only live region — updated only
  // when a reply finishes so it isn't re-announced on every stream flush.
  const [announcement, setAnnouncement] = useState("");
  // Dialog offsets driven by the visualViewport so the window stays above the
  // on-screen keyboard.
  const [dialogStyle, setDialogStyle] = useState<{
    bottom: number;
    maxHeight?: number;
  }>({ bottom: 16 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && !isCoarsePointer()) {
      inputRef.current?.focus();
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
        // Launcher stays mounted (only visually hidden) so this restore works.
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

  // Lock page scroll behind the dialog on small viewports (same pattern as
  // the Navbar overlay menu).
  useEffect(() => {
    if (!isOpen) return;

    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => {
      document.documentElement.style.overflow = mq.matches ? "hidden" : "";
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // Keep the dialog above the on-screen keyboard: when the visual viewport
  // shrinks, raise the bottom offset and cap the height to what remains.
  useEffect(() => {
    if (!isOpen) return;

    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => {
      const inset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      const next =
        inset > 0
          ? { bottom: 16 + inset, maxHeight: Math.max(vv.height - 32, 220) }
          : { bottom: 16 };
      setDialogStyle((prev) =>
        prev.bottom === next.bottom && prev.maxHeight === next.maxHeight
          ? prev
          : next
      );
    };
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      setDialogStyle({ bottom: 16 });
    };
  }, [isOpen]);

  // Detect when the launcher overlaps the footer and adjust its bottom offset.
  // Uses a functional setButtonBottom update so this callback can keep a stable
  // (empty) dep array and the scroll/resize listeners attach only once.
  const checkDarkSection = useCallback(() => {
    const footer = document.querySelector("footer");
    const windowHeight = window.innerHeight;

    let newBottom = 24;

    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      if (footerRect.top < windowHeight - 20) {
        // Clamp so a tall footer can't push the launcher off-screen.
        newBottom = Math.max(
          24,
          Math.min(windowHeight - footerRect.top + 24, windowHeight - 120)
        );
      }
    }

    setButtonBottom((prev) => (prev === newBottom ? prev : newBottom));
  }, []);

  useEffect(() => {
    // Coalesce scroll/resize bursts into at most one rAF at a time.
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        checkDarkSection();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    checkDarkSection();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
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

    // Drops an orphaned empty assistant placeholder before appending the
    // error bubble.
    const appendAssistantError = (text: string) => {
      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        const next =
          lastMsg?.role === "assistant" && lastMsg.content === ""
            ? prev.slice(0, -1)
            : prev;
        return [...next, { role: "assistant", content: text }];
      });
      setAnnouncement(text);
    };

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
          language,
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as {
          error?: string;
          details?: string;
        };
        console.error("Chat API error:", errorData);
        // Server errors return { error } (incl. the 429 rate-limit copy).
        appendAssistantError(errorData.error || errorData.details || copy.error);
        return;
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

      if (assistantMessage.trim()) {
        setAnnouncement(assistantMessage);
      } else {
        // Stream ended without content: swap the empty bubble for the error.
        setMessages((prev) => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg?.role === "assistant" && !lastMsg.content.trim()) {
            return [...prev.slice(0, -1), { role: "assistant", content: copy.error }];
          }
          return prev;
        });
        setAnnouncement(copy.error);
      }
    } catch (error) {
      console.error("Chat error:", error);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      appendAssistantError(copy.error);
    } finally {
      setIsLoading(false);
      if (!isCoarsePointer()) {
        inputRef.current?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const lastMessage = messages[messages.length - 1];
  const showThinking =
    isLoading &&
    (lastMessage?.role === "user" ||
      (lastMessage?.role === "assistant" && lastMessage.content === ""));

  return (
    <>
      {/* Chat launcher — stays mounted while the dialog is open (only visually
          hidden) so Escape can restore focus to it. */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
        tabIndex={isOpen ? -1 : undefined}
        aria-hidden={isOpen || undefined}
        className={`fixed right-4 z-50 grid h-12 w-12 place-items-center rounded-sm border border-line-strong bg-surface/90 font-mono text-[10px] uppercase tracking-[0.18em] text-accent backdrop-blur-sm transition-[border-color,opacity] duration-300 hover:border-accent sm:right-6 sm:h-14 sm:w-14 ${
          // fade-up's fill-mode would pin opacity:1 and beat the opacity-0
          // class, so the entrance animation only applies while closed.
          isOpen ? "pointer-events-none opacity-0" : "fade-up"
        }`}
        style={{
          bottom: buttonBottom,
          boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
        }}
        aria-label={copy.openChat}
      >
        ASK
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={copy.dialog}
          data-cursor="hide"
          className={`fade-up fixed left-2 right-2 z-50 flex flex-col overflow-hidden rounded-sm border border-line-strong bg-bg shadow-[0_24px_64px_rgba(0,0,0,0.6)] sm:left-auto sm:right-6 sm:w-96 ${
            isMinimized ? "h-auto" : "h-[min(500px,70dvh)]"
          }`}
          style={{
            bottom: dialogStyle.bottom,
            maxHeight: dialogStyle.maxHeight,
          }}
        >
          {/* Screen-reader live region: announces only the last completed
              assistant reply, not every streaming flush. */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {announcement}
          </div>

          {/* Header */}
          <div className="flex items-center justify-between border-b border-line bg-surface pl-4 pr-1">
            <h3 className="label-mono">{copy.header}</h3>
            <div className="flex items-center">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="grid h-11 w-11 place-items-center font-mono text-base text-dim transition-colors hover:text-fg"
                aria-label={isMinimized ? copy.expand : copy.minimize}
              >
                <span aria-hidden>–</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                className="grid h-11 w-11 place-items-center font-mono text-base text-dim transition-colors hover:text-fg"
                aria-label={copy.closeChat}
              >
                <span aria-hidden>×</span>
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div
                role="log"
                aria-label={copy.conversation}
                tabIndex={0}
                className="flex-1 space-y-4 overflow-y-auto overscroll-contain p-4"
              >
                {/* Welcome Message */}
                {messages.length === 0 && (
                  <div className="fade-up space-y-4">
                    <div className="flex flex-col items-start">
                      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                        HV·AI
                      </p>
                      <div className="max-w-[85%] rounded-sm border border-line bg-surface p-3">
                        <p className="text-sm text-dim">{copy.greeting}</p>
                      </div>
                    </div>

                    {/* Quick Questions */}
                    <div>
                      <p className="label-mono mb-2">{copy.quickLabel}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {copy.questions.map((q) => (
                          <button
                            key={q}
                            onClick={() => sendMessage(q)}
                            className="min-h-11 cursor-pointer rounded-sm border border-line-strong px-4 font-mono text-[11px] text-dim transition-colors hover:border-accent hover:text-accent"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Messages — sender shown by alignment + mono prefix, no avatars.
                    The still-empty streaming placeholder is covered by the
                    thinking indicator instead of an empty bubble. */}
                {messages.map((msg, index) =>
                  msg.role === "assistant" &&
                  msg.content === "" &&
                  index === messages.length - 1 ? null : (
                    <div
                      key={index}
                      className={`fade-up flex flex-col ${
                        msg.role === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <p
                        className={`mb-1 font-mono text-[10px] uppercase tracking-[0.18em] ${
                          msg.role === "user" ? "text-faint" : "text-accent"
                        }`}
                      >
                        {msg.role === "user" ? copy.you : "HV·AI"}
                      </p>
                      <div
                        className={`max-w-[85%] rounded-sm border border-line p-3 ${
                          msg.role === "user"
                            ? "bg-elevated text-fg"
                            : "bg-surface text-dim"
                        }`}
                      >
                        <p className="whitespace-pre-wrap text-sm">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  )
                )}

                {/* Thinking indicator */}
                {showThinking && (
                  <div
                    className="fade-up flex items-center gap-2 text-dim"
                    role="status"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                      {copy.thinking}
                    </span>
                    <span
                      aria-hidden
                      className="cursor-blink inline-block h-3 w-1.5 bg-accent"
                    />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form
                onSubmit={handleSubmit}
                className="border-t border-line p-3"
              >
                <div className="flex items-center gap-2">
                  {/* Stays enabled while loading so focus isn't lost;
                      submission is guarded in sendMessage. */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={copy.placeholder}
                    aria-label={copy.inputLabel}
                    className="h-11 min-w-0 flex-1 rounded-sm border border-line-strong bg-surface px-4 text-sm text-fg placeholder:text-faint focus:border-accent focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-sm bg-accent text-accent-ink transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={copy.send}
                  >
                    <span aria-hidden>↑</span>
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
