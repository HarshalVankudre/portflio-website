import { Brain, Code, Container, Database, Search, Terminal } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { SectionHeader } from "./SectionHeader";

const ICON_MAP = {
  Code,
  Brain,
  Terminal,
  Database,
  Container,
  Search,
};

export function Skills({ title, aboutText, skillsHeading, skills }) {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <SectionHeader title={title} />
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-12">{aboutText}</p>
        </div>

        <GlassCard className="text-center">
          <h3 className="text-xl font-bold text-white mb-8">{skillsHeading}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {skills.map((skill) => {
              const Icon = ICON_MAP[skill.icon] ?? Code;
              return (
                <div
                  key={skill.name}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="text-blue-400">
                    <Icon size={18} />
                  </div>
                  <span className="text-sm font-medium text-white/80">{skill.name}</span>
                  <span className="text-xs uppercase tracking-wide text-white/40">{skill.level}</span>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
