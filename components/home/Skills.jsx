import { Bot, Brain, Cloud, Code, Coffee, Container, Database, Search, Terminal } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { SectionHeader } from "./SectionHeader";
import { AnimateOnScroll, useInView } from "@/hooks/useInView";

const ICON_MAP = {
  Code,
  Brain,
  Terminal,
  Coffee,
  Database,
  Container,
  Search,
  Bot,
  Cloud,
};

const CATEGORY_COLORS = {
  frontend: "from-blue-500 to-cyan-500",
  backend: "from-green-500 to-emerald-500",
  ai: "from-purple-500 to-pink-500",
  devops: "from-orange-500 to-yellow-500",
};

function SkillBar({ skill, index, isVisible }) {
  const Icon = ICON_MAP[skill.icon] ?? Code;
  const colorClass = CATEGORY_COLORS[skill.category] || "from-blue-500 to-blue-400";

  return (
    <div
      className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClass} bg-opacity-20`}>
          <Icon size={18} className="text-white" />
        </div>
        <span className="text-sm font-medium text-white/90 flex-1">{skill.name}</span>
        <span className="text-xs text-white/50">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${colorClass} rounded-full progress-bar`}
          style={{
            width: isVisible ? `${skill.level}%` : "0%",
            transitionDelay: `${index * 100 + 200}ms`,
          }}
        />
      </div>
    </div>
  );
}

export function Skills({ title, aboutText, skillsHeading, skills, categoryLabels }) {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  const categoryOrder = ["frontend", "ai", "backend", "devops"];

  return (
    <section id="about" className="py-20 px-6" aria-label="About and Skills section">
      <div className="max-w-5xl mx-auto">
        <AnimateOnScroll>
          <div className="text-center mb-12">
            <SectionHeader title={title} />
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">{aboutText}</p>
          </div>
        </AnimateOnScroll>

        <div ref={ref}>
          <AnimateOnScroll delay={200}>
            <GlassCard>
              <h3 className="text-xl font-bold text-white mb-8 text-center">{skillsHeading}</h3>

              <div className="space-y-8">
                {categoryOrder.map((categoryKey) => {
                  const categorySkills = groupedSkills[categoryKey];
                  if (!categorySkills || categorySkills.length === 0) return null;

                  const label = categoryLabels?.[categoryKey] || categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);

                  return (
                    <div key={categoryKey}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${CATEGORY_COLORS[categoryKey]}`} />
                        <h4 className="text-sm font-semibold text-white/70 uppercase tracking-wider">{label}</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {categorySkills.map((skill, index) => (
                          <SkillBar
                            key={skill.name}
                            skill={skill}
                            index={index}
                            isVisible={isVisible}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
