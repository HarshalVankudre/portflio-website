import { useEffect } from "react";
import { X, ExternalLink, Github, Layers, Lightbulb, Wrench, BookOpen } from "lucide-react";

export function ProjectModal({ project, isOpen, onClose, content }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl animate-scaleIn">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10">
          <h2 id="modal-title" className="text-2xl font-bold text-white">
            {project.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-blue-400 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-white/5 shrink-0">
                <BookOpen size={18} className="text-white/60" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white/80 mb-2">{content?.overview || "Overview"}</h3>
                <p className="text-white/60 leading-relaxed">{project.description}</p>
              </div>
            </div>

            {/* Problem/Challenge */}
            {project.challenge && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/5 shrink-0">
                  <Lightbulb size={18} className="text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white/80 mb-2">{content?.challenge || "Challenge"}</h3>
                  <p className="text-white/60 leading-relaxed">{project.challenge}</p>
                </div>
              </div>
            )}

            {/* Solution/Approach */}
            {project.solution && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/5 shrink-0">
                  <Wrench size={18} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white/80 mb-2">{content?.solution || "Solution"}</h3>
                  <p className="text-white/60 leading-relaxed">{project.solution}</p>
                </div>
              </div>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white/5 shrink-0">
                  <Layers size={18} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white/80 mb-2">{content?.features || "Key Features"}</h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/60">
                        <span className="text-blue-400 mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-medium hover:scale-105 transition-transform"
            >
              <Github size={18} />
              {content?.viewCode || "View Code"}
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/10 text-white font-medium hover:bg-white/20 transition-colors"
              >
                <ExternalLink size={18} />
                {content?.liveDemo || "Live Demo"}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
