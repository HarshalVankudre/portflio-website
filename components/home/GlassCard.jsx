export function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/10 ${className}`}
    >
      {children}
    </div>
  );
}
