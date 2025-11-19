import { Sparkles } from "lucide-react";

export function SectionHeader({ title, icon: Icon = Sparkles }) {
  return (
    <div className="flex items-center gap-3 mb-12">
      <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
        <Icon size={24} />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
    </div>
  );
}
