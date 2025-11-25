import { useEffect, useState, useCallback } from "react";
import { Bot, ChevronDown, Loader2, Sparkles, ArrowRight, Download } from "lucide-react";
import { callGemini } from "@/lib/gemini";

const TYPING_SPEED = 50;
const PAUSE_DURATION = 2000;

export function Hero({ scrollToSection, personalInfo, heroContent, aiAssistantStrings }) {
  const [pitch, setPitch] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayedTagline, setDisplayedTagline] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setPitch("");
    setIsGenerating(false);
  }, [heroContent]);

  // Typing effect for tagline
  useEffect(() => {
    const tagline = personalInfo.tagline;
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      if (!isDeleting) {
        if (currentIndex <= tagline.length) {
          setDisplayedTagline(tagline.slice(0, currentIndex));
          currentIndex++;
          setIsTyping(true);
          timeoutId = setTimeout(type, TYPING_SPEED);
        } else {
          setIsTyping(false);
          timeoutId = setTimeout(() => {
            isDeleting = false;
            currentIndex = tagline.length;
          }, PAUSE_DURATION);
        }
      }
    };

    type();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [personalInfo.tagline]);

  const generatePitch = async () => {
    setIsGenerating(true);
    const prompt = heroContent.pitchPrompt.replace("{{name}}", personalInfo.name);
    const text = await callGemini(prompt, heroContent.pitchContext, aiAssistantStrings);
    setPitch(text);
    setIsGenerating(false);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden" aria-label="Hero section">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[120px] animate-pulse-slow" aria-hidden="true" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow delay-1000" aria-hidden="true" />

      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        {/* Role Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          {personalInfo.title}
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 pb-4 pt-4 animate-fadeInUp">
          {personalInfo.name}
        </h1>

        <div className="h-16 flex items-center justify-center">
          <p className={`text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed ${isTyping ? "typing-cursor" : ""}`}>
            {displayedTagline}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button
            onClick={() => scrollToSection("projects")}
            className="group px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {heroContent.viewProjects}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={generatePitch}
            disabled={isGenerating}
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 text-white font-semibold backdrop-blur-md hover:from-blue-600/30 hover:to-purple-600/30 transition-all active:scale-95 flex items-center gap-2 justify-center"
          >
            {isGenerating ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Sparkles size={20} className="text-yellow-400 group-hover:rotate-12 transition-transform" />
            )}
            {isGenerating ? heroContent.generating : heroContent.generatePitch}
          </button>
        </div>

        {pitch && (
          <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-2xl mx-auto animate-scaleIn">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-500/20">
                <Bot className="text-blue-400 shrink-0" size={20} />
              </div>
              <div className="text-left flex-1">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">{heroContent.pitchBadge}</h4>
                <p className="text-white/90 text-lg leading-relaxed italic">&ldquo;{pitch}&rdquo;</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => scrollToSection("experience")}
        className="absolute bottom-10 animate-bounce hover:text-white/60 transition-colors"
        aria-label="Scroll to experience section"
      >
        <ChevronDown className="text-white/30" size={32} />
      </button>
    </section>
  );
}
