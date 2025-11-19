import { Github, Linkedin, Mail } from "lucide-react";

export function Footer({ personalInfo, footerContent }) {
  const rights = footerContent.rights.replace("{{year}}", new Date().getFullYear());

  return (
    <footer className="py-12 px-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-1">{personalInfo.name}</h3>
          <p className="text-white/40 text-sm">{rights}</p>
        </div>

        <div className="flex gap-6">
          <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-white/60 hover:text-blue-300 transition-colors">
            <Mail size={18} />
            <span className="text-sm">{footerContent.contactCta}</span>
          </a>
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
