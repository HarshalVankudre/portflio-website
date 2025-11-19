import { Briefcase } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

export function Experience({ title, experiences }) {
  return (
    <section id="experience" className="py-20 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title={title} icon={Briefcase} />
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full border border-white/20 bg-[#0a0a0a] shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center z-10 -translate-x-0 md:-translate-x-1/2">
                <div className="w-3 h-3 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
              </div>

              <div className="ml-16 md:ml-0 w-full md:w-[calc(50%-3rem)] p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <span className="text-sm font-medium text-blue-300 py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 mt-2 sm:mt-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-white/70 mb-2 font-medium">{exp.company}</p>
                <p className="text-white/50 text-sm leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
