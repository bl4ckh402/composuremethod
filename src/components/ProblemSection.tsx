import React from 'react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="why-it-works" className="py-12 md:py-16 space-y-10 border-t border-[#173404]/10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono-caps text-[#3e6a00] bg-[#b7f473]/30 px-3.5 py-1 rounded-full">
          THE PHYSIOLOGICAL SHIFT IN YOUR 30S
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#081d00] tracking-tight">
          Why Does This Happen in Your 30s — And Why Traditional "Solutions" Fail?
        </h2>
        <p className="font-body text-sm md:text-base text-[#43483e] leading-relaxed">
          Starting in your 30s, lifestyle load, career stress, and subtle hormonal shifts heighten your sympathetic nervous system. When performance pressure enters the equation, arousal accelerates faster than your conscious control can catch it.
        </p>
      </div>

      {/* Comparison Grid: Traditional Quick Fixes vs The Composure Method */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Numbing Sprays */}
        <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-xs space-y-3 relative overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-lg">
            ✕
          </div>
          <h3 className="font-display font-bold text-base text-[#081d00]">
            Numbing Sprays & Creams
          </h3>
          <p className="font-body text-xs text-[#52574c] leading-relaxed">
            Dulls all physical sensation. Turns intimacy into a numb, mechanical chore and often transfers to your partner, ruining mutual pleasure.
          </p>
          <div className="pt-2 font-mono text-[11px] text-red-700 font-bold">
            • Result: Loss of sensation & connection
          </div>
        </div>

        {/* Pills & Supplements */}
        <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-xs space-y-3 relative overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-lg">
            ✕
          </div>
          <h3 className="font-display font-bold text-base text-[#081d00]">
            Unapproved Pills & Supplements
          </h3>
          <p className="font-body text-xs text-[#52574c] leading-relaxed">
            Creates unpredictable side-effects (headaches, flushing). Treats timing as a chemical problem rather than retraining nervous system control.
          </p>
          <div className="pt-2 font-mono text-[11px] text-red-700 font-bold">
            • Result: Psychological dependency & side effects
          </div>
        </div>

        {/* Mental Distraction */}
        <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-xs space-y-3 relative overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-lg">
            ✕
          </div>
          <h3 className="font-display font-bold text-base text-[#081d00]">
            Distraction & Mental Counting
          </h3>
          <p className="font-body text-xs text-[#52574c] leading-relaxed">
            Counting backwards or thinking about sports pulls your mind entirely out of the room. Destroys emotional intimacy and fails under high arousal.
          </p>
          <div className="pt-2 font-mono text-[11px] text-red-700 font-bold">
            • Result: Disconnected & unnatural experience
          </div>
        </div>

        {/* The Composure Method */}
        <div className="bg-[#173404] text-white p-6 rounded-2xl border border-[#173404] shadow-md space-y-3 relative overflow-hidden ring-2 ring-[#b7f473]">
          <div className="w-10 h-10 rounded-full bg-[#b7f473] text-[#081d00] flex items-center justify-center font-bold text-lg">
            ✓
          </div>
          <h3 className="font-display font-bold text-base text-white">
            The Composure Method
          </h3>
          <p className="font-body text-xs text-[#e0e3da] leading-relaxed">
            Retrains your pelvic neuromuscular response and parasympathetic nervous system. Builds genuine, natural stamina you retain for life.
          </p>
          <div className="pt-2 font-mono text-[11px] text-[#b7f473] font-bold">
            • Result: Lasting confidence, presence & control
          </div>
        </div>
      </div>

      {/* Science Breakdown Callout */}
      <div className="bg-white p-8 rounded-3xl border border-[#173404]/10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center gap-2 font-mono-caps text-xs text-[#3e6a00]">
            <span className="material-symbols-outlined text-sm">neurology</span>
            <span>THE NEURO-PHYSIOLOGICAL MECHANISM</span>
          </div>
          <h3 className="font-display text-xl font-bold text-[#081d00]">
            How Retraining Parasympathetic Control Delays Climax Naturally
          </h3>
          <p className="font-body text-xs md:text-sm text-[#43483e] leading-relaxed">
            Ejaculation is governed by the autonomic nervous system. When anxiety or fast breathing shifts your body into sympathetic ("fight or flight") mode, nerve impulse velocity speeds up dramatically. By combining 4-2-7 parasympathetic breath exhales with targeted pelvic floor releases, you lower nerve signal pressure and maintain arousal smoothly in the optimal 4–6 range on the 1–10 scale.
          </p>
        </div>

        <div className="md:col-span-4 bg-[#fcf9f8] p-5 rounded-2xl border border-[#173404]/10 space-y-2 text-center">
          <span className="font-display text-3xl font-bold text-[#173404]">89%</span>
          <p className="font-body text-xs text-[#43483e]">
            of men report noticeable improvement in arousal control within 3 to 4 weeks of daily 10-minute practice.
          </p>
        </div>
      </div>
    </section>
  );
};
