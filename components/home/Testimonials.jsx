import { Quote, Star } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { SectionHeader } from "./SectionHeader";
import { AnimateOnScroll } from "@/hooks/useInView";

function TestimonialCard({ testimonial, index }) {
  return (
    <AnimateOnScroll delay={index * 150}>
      <GlassCard className="h-full flex flex-col">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-xl bg-blue-500/10 shrink-0">
            <Quote size={20} className="text-blue-400" />
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-white/20"}
              />
            ))}
          </div>
        </div>

        <blockquote className="text-white/70 leading-relaxed mb-6 flex-1 italic">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
            {testimonial.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <div className="font-medium text-white/90">{testimonial.name}</div>
            <div className="text-sm text-white/50">{testimonial.role}</div>
          </div>
        </div>
      </GlassCard>
    </AnimateOnScroll>
  );
}

export function Testimonials({ title, testimonials }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-20 px-6" aria-label="Testimonials section">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll>
          <SectionHeader title={title} />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
