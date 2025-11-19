import { useEffect, useState } from "react";
import { Bot, ChevronDown, Loader2, Sparkles } from "lucide-react";
import { callGemini } from "@/lib/gemini";

export function Hero({ scrollToSection, personalInfo, heroContent, aiAssistantStrings }) {
  const [pitch, setPitch] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setPitch("");
    setIsGenerating(false);
  }, [heroContent]);

  const generatePitch = async () => {
    setIsGenerating(true);
    const prompt = heroContent.pitchPrompt.replace("{{name}}", personalInfo.name);
    const text = await callGemini(prompt, heroContent.pitchContext, aiAssistantStrings);
    setPitch(text);
    setIsGenerating(false);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow delay-1000" />

      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 pb-4 pt-12">
          {personalInfo.name}
        </h1>

        <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
          {personalInfo.tagline}
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
          <button
            onClick={() => scrollToSection("projects")}
            className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform active:scale-95"
          >
            {heroContent.viewProjects}
          </button>
          <button
            onClick={generatePitch}
            disabled={isGenerating}
            className="px-8 py-4 rounded-full bg-white/10 border border-white/10 text-white font-semibold backdrop-blur-md hover:bg-white/20 transition-all active:scale-95 flex items-center gap-2 justify-center"
          >
            {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} className="text-yellow-400" />}
            {isGenerating ? heroContent.generating : heroContent.generatePitch}
          </button>
        </div>

        {pitch && (
          <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <Bot className="text-blue-400 shrink-0 mt-1" size={24} />
              <div className="text-left">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">{heroContent.pitchBadge}</h4>
                <p className="text-white/90 text-lg leading-relaxed italic">&ldquo;{pitch}&rdquo;</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-10 animate-bounce">
        <ChevronDown className="text-white/30" size={32} />
      </div>
    </section>
  );
}
