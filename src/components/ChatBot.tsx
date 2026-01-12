"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// Professional chat icon component
function ChatIcon() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Sparkles 
        size={28} 
        className="text-purple-600" 
        strokeWidth={2.5} 
      />
    </motion.div>
  );
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isOnDarkSection, setIsOnDarkSection] = useState(false);
  const [buttonBottom, setButtonBottom] = useState(24);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  // Detect dark sections and adjust position/color
  const checkDarkSection = useCallback(() => {
    const footer = document.querySelector("footer");
    const projectsSection = document.getElementById("projects");
    const windowHeight = window.innerHeight;

    // Button position (bottom-right corner)
    const buttonY = windowHeight - buttonBottom - 32; // 32 is half the button height

    let onDark = false;
    let newBottom = 24;

    // Check if button overlaps with footer
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      if (footerRect.top < windowHeight - 20) {
        // Footer is visible, move button up
        newBottom = Math.max(24, windowHeight - footerRect.top + 24);
        onDark = buttonY >= footerRect.top;
      }
    }

    // Check if button overlaps with projects section (dark bg)
    if (projectsSection) {
      const projRect = projectsSection.getBoundingClientRect();
      // Check if button center is within projects section
      if (buttonY >= projRect.top && buttonY <= projRect.bottom) {
        onDark = true;
      }
    }

    setIsOnDarkSection(onDark);
    setButtonBottom(newBottom);
  }, [buttonBottom]);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(checkDarkSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    checkDarkSection(); // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [checkDarkSection]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    setHasInteracted(true);
    const userMessage: Message = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

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
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      // Add empty assistant message that we'll update
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  assistantMessage += parsed.content;
                  // Update the last message
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      role: "assistant",
                      content: assistantMessage,
                    };
                    return updated;
                  });
                }
              } catch {
                // Ignore parse errors for incomplete chunks
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
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

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            ref={buttonRef}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center transition-all duration-200 ease-out"
            style={{
              bottom: buttonBottom,
              backgroundColor: "#FFFEF5",
              border: "4px solid #000000",
              boxShadow: "4px 4px 0px 0px #000000",
            }}
            aria-label="Open chat"
          >
            <ChatIcon />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "500px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-2 left-2 sm:left-auto sm:right-6 z-50 sm:w-96 bg-[#FFFEF5] border-4 border-black neo-shadow-lg overflow-hidden flex flex-col"
            style={{ maxHeight: isMinimized ? "auto" : "85vh", bottom: Math.max(buttonBottom, 16) }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-primary border-b-4 border-black">
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div 
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center bg-white border-2 border-black"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles size={18} className="text-purple-600 sm:w-5 sm:h-5" strokeWidth={2.5} />
                </motion.div>
                <div>
                  <h3 className="font-black text-xs sm:text-sm uppercase tracking-wide">
                    Ask About Harshal
                  </h3>
                  <p className="text-[10px] sm:text-xs font-medium opacity-70">AI Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-black/10 transition-colors"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  <Minus size={16} strokeWidth={3} />
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(false);
                  }}
                  className="p-1.5 hover:bg-red-500 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={16} strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Welcome Message */}
                  {messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-8 h-8 border-2 border-black flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: "#4ECDC4" }}
                        >
                          <Bot size={16} />
                        </div>
                        <div className="bg-white border-2 border-black p-3 neo-shadow max-w-[85%]">
                          <p className="text-sm">
                            Hi! I'm Harshal's AI assistant. Ask me anything about
                            his skills, projects, experience, or how to get in
                            touch!
                          </p>
                        </div>
                      </div>

                      {/* Quick Questions */}
                      <div className="pl-11">
                        <p className="text-xs font-bold text-gray-500 mb-2 uppercase">
                          Quick questions:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {quickQuestions.map((q) => (
                            <button
                              key={q}
                              onClick={() => handleQuickQuestion(q)}
                              className="text-xs px-3 py-1.5 bg-white border-2 border-black hover:bg-primary transition-colors font-bold"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Messages */}
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-start gap-3 ${
                        msg.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className="w-8 h-8 border-2 border-black flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: msg.role === "user" ? "#A855F7" : "#4ECDC4",
                          color: msg.role === "user" ? "white" : "black"
                        }}
                      >
                        {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div
                        className={`p-3 border-2 border-black max-w-[85%] ${
                          msg.role === "user" ? "" : "neo-shadow"
                        }`}
                        style={{
                          backgroundColor: msg.role === "user" ? "#A855F7" : "white",
                          color: msg.role === "user" ? "white" : "black"
                        }}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Loading indicator */}
                  {isLoading && messages[messages.length - 1]?.role === "user" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-start gap-3"
                    >
                      <div 
                        className="w-8 h-8 border-2 border-black flex items-center justify-center"
                        style={{ backgroundColor: "#4ECDC4" }}
                      >
                        <Bot size={16} />
                      </div>
                      <div className="bg-white border-2 border-black p-3 neo-shadow">
                        <div className="flex items-center gap-2">
                          <Sparkles size={16} className="animate-spin" />
                          <span className="text-sm font-medium">Thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form
                  onSubmit={handleSubmit}
                  className="p-3 border-t-4 border-black bg-white"
                >
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      disabled={isLoading}
                      className="flex-1 px-3 py-2 border-2 border-black bg-[#FFFEF5] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="p-2 bg-primary border-2 border-black neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Send message"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
