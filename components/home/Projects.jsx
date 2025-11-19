import { Code, ExternalLink, Layers } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { SectionHeader } from "./SectionHeader";

export function Projects({ title, projects }) {
  return (
    <section id="projects" className="py-20 px-6 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={title} icon={Layers} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <GlassCard key={project.id} className="flex flex-col justify-between min-h-[300px] hover:-translate-y-2">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <Code size={24} className="text-blue-400" />
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{project.title}</h3>
                <p className="text-white/60 leading-relaxed mb-6">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-medium text-white/70 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
