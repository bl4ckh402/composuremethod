import React from 'react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="why-it-works" className="py-16 md:py-20 space-y-12 relative">
      <div className="section-divider mb-12" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 reveal-slide-up">
        <span className="badge-lime">THE PHYSIOLOGICAL SHIFT IN YOUR 30S</span>
        <h2 className="font-display text-3xl md:text-[2.6rem] font-bold text-[#081d00] tracking-tight leading-tight">
          Why Does This Happen in Your 30s — And Why Traditional "Solutions" Fail?
        </h2>
        <p className="font-body text-sm md:text-base text-[#43483e] leading-relaxed">
          Starting in your 30s, lifestyle load, career stress, and subtle hormonal shifts heighten your sympathetic nervous system. When performance pressure enters the equation, arousal accelerates faster than your conscious control can catch it.
        </p>
      </div>

      {/* Comparison grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Numbing Sprays */}
        <div className="reveal-scale bg-white p-6 rounded-2xl border border-red-100 shadow-sm space-y-4 relative overflow-hidden group hover:border-red-200 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl font-bold relative z-10">
            ✕
          </div>
          <div className="relative z-10">
            <h3 className="font-display font-bold text-base text-[#081d00] mb-2">
              Numbing Sprays &amp; Creams
            </h3>
            <p className="font-body text-xs text-[#52574c] leading-relaxed">
              Dulls all physical sensation. Turns intimacy into a numb, mechanical chore and often transfers to your partner, ruining mutual pleasure.
            </p>
          </div>
          <div className="relative z-10 pt-2 border-t border-red-50 font-mono text-[10px] text-red-600 font-bold uppercase tracking-wide">
            Result: Loss of sensation &amp; connection
          </div>
        </div>

        {/* Pills */}
        <div className="reveal-scale bg-white p-6 rounded-2xl border border-red-100 shadow-sm space-y-4 relative overflow-hidden group hover:border-red-200 transition-colors" style={{animationDelay:'0.1s'}}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl font-bold relative z-10">
            ✕
          </div>
          <div className="relative z-10">
            <h3 className="font-display font-bold text-base text-[#081d00] mb-2">
              Unapproved Pills &amp; Supplements
            </h3>
            <p className="font-body text-xs text-[#52574c] leading-relaxed">
              Creates unpredictable side-effects (headaches, flushing). Treats timing as a chemical problem rather than retraining nervous system control.
            </p>
          </div>
          <div className="relative z-10 pt-2 border-t border-red-50 font-mono text-[10px] text-red-600 font-bold uppercase tracking-wide">
            Result: Psychological dependency &amp; side effects
          </div>
        </div>

        {/* Mental distraction */}
        <div className="reveal-scale bg-white p-6 rounded-2xl border border-red-100 shadow-sm space-y-4 relative overflow-hidden group hover:border-red-200 transition-colors" style={{animationDelay:'0.2s'}}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
          <div className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl font-bold relative z-10">
            ✕
          </div>
          <div className="relative z-10">
            <h3 className="font-display font-bold text-base text-[#081d00] mb-2">
              Distraction &amp; Mental Counting
            </h3>
            <p className="font-body text-xs text-[#52574c] leading-relaxed">
              Counting backwards or thinking about sports pulls your mind entirely out of the room. Destroys emotional intimacy and fails under high arousal.
            </p>
          </div>
          <div className="relative z-10 pt-2 border-t border-red-50 font-mono text-[10px] text-red-600 font-bold uppercase tracking-wide">
            Result: Disconnected &amp; unnatural experience
          </div>
        </div>

        {/* The Composure Method — highlighted */}
        <div className="reveal-scale dark-card p-6 space-y-4 relative overflow-hidden ring-2 ring-[#b7f473]/60 glow-accent" style={{animationDelay:'0.3s'}}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#b7f473]/10 rounded-full -translate-y-16 translate-x-16 pointer-events-none" />
          <div className="w-11 h-11 rounded-xl bg-[#b7f473] text-[#081d00] flex items-center justify-center text-xl font-bold">
            ✓
          </div>
          <div>
            <span className="badge-lime text-[9px] mb-2 inline-block">THE SOLUTION</span>
            <h3 className="font-display font-bold text-base text-white mb-2">
              The Composure Method
            </h3>
            <p className="font-body text-xs text-[#b7f473]/80 leading-relaxed">
              Retrains your pelvic neuromuscular response and parasympathetic nervous system. Builds genuine, natural stamina you retain for life.
            </p>
          </div>
          <div className="pt-2 border-t border-[#b7f473]/20 font-mono text-[10px] text-[#b7f473] font-bold uppercase tracking-wide">
            Result: Lasting confidence, presence &amp; control
          </div>
        </div>
      </div>

      {/* Science callout */}
      <div className="reveal-scale bg-white rounded-3xl border border-[#173404]/8 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <div className="md:col-span-8 p-8 md:p-10 space-y-3">
            <div className="flex items-center gap-2">
              <span className="badge-lime">THE NEURO-PHYSIOLOGICAL MECHANISM</span>
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-[#081d00]">
              How Retraining Parasympathetic Control Delays Climax Naturally
            </h3>
            <p className="font-body text-sm text-[#43483e] leading-relaxed">
              Ejaculation is governed by the autonomic nervous system. When anxiety or fast breathing shifts your body into sympathetic ("fight or flight") mode, nerve impulse velocity speeds up dramatically. By combining 4-2-7 parasympathetic breath exhales with targeted pelvic floor releases, you lower nerve signal pressure and maintain arousal smoothly in the optimal 4–6 range on the 1–10 scale.
            </p>
          </div>

          <div className="md:col-span-4 bg-gradient-to-br from-[#173404] to-[#0d2202] p-8 md:p-10 flex flex-col items-center justify-center text-center space-y-2">
            <span className="font-display text-5xl font-bold text-[#b7f473]">89%</span>
            <p className="font-body text-sm text-white/70 leading-relaxed">
              of men report noticeable improvement in arousal control within 3 to 4 weeks of daily 10-minute practice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
