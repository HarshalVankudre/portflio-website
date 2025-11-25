import { useState } from "react";
import { Code, ExternalLink, Layers, Eye, Github } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { SectionHeader } from "./SectionHeader";
import { ProjectModal } from "./ProjectModal";
import { AnimateOnScroll } from "@/hooks/useInView";

export function Projects({ title, projects, modalContent }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 px-6 bg-black/20" aria-label="Projects section">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <SectionHeader title={title} icon={Layers} />
        </AnimateOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <AnimateOnScroll key={project.id} delay={index * 100}>
              <GlassCard className="flex flex-col justify-between min-h-[300px] hover:-translate-y-2 group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-colors">
                      <Code size={24} className="text-blue-400" />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                        aria-label={`View details for ${project.title}`}
                      >
                        <Eye size={20} />
                      </button>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                        aria-label={`View GitHub repository for ${project.title}`}
                      >
                        <Github size={20} />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">{project.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-6 line-clamp-3">{project.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-xs font-medium text-white/70 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-xs font-medium text-white/50 px-3 py-1.5">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    {modalContent?.viewDetails || "View Details"}
                  </button>
                </div>
              </GlassCard>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        content={modalContent}
      />
    </section>
  );
}
