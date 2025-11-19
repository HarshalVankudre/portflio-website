import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageSquare, Send, X } from "lucide-react";
import { callGemini, getPortfolioContext } from "@/lib/gemini";
import ReactMarkdown from "react-markdown";

export function AIChatWidget({ personalInfo, aiAssistantStrings, experiences, projects, skills }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", text: aiAssistantStrings.welcome }]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([{ role: "assistant", text: aiAssistantStrings.welcome }]);
  }, [aiAssistantStrings]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg = { role: "user", text: inputValue };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    const response = await callGemini(
      inputValue,
      getPortfolioContext({ personalInfo, experiences, projects, skills }),
      aiAssistantStrings
    );

    setMessages((prev) => [...prev, { role: "assistant", text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <div
        className={`
          pointer-events-auto
          mb-4 w-[350px] sm:w-[400px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right
          ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10 pointer-events-none h-0"}
        `}
      >
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot size={20} className="text-blue-400" />
            <h3 className="font-semibold text-white text-sm">{aiAssistantStrings.headerTitle}</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="h-[400px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`
                  max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed
                  ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-sm" : "bg-white/10 text-white/90 rounded-bl-sm"}
                `}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown
                    className="prose prose-invert prose-sm max-w-none"
                    components={{
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2" {...props} />,
                      li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      code: ({node, inline, ...props}) =>
                        inline ?
                          <code className="bg-white/10 px-1 rounded" {...props} /> :
                          <code className="block bg-white/10 p-2 rounded my-2" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                      em: ({node, ...props}) => <em className="italic" {...props} />,
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 p-3 rounded-2xl rounded-bl-sm flex gap-2 items-center">
                <Loader2 size={16} className="animate-spin text-blue-400" />
                <span className="text-xs text-white/50">{aiAssistantStrings.thinking}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-white/10 bg-white/5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={aiAssistantStrings.placeholder}
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-2 bg-blue-600 rounded-xl text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:scale-105 transition-all duration-300 active:scale-95"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
