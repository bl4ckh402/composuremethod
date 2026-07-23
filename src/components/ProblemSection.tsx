import React from 'react';
import { motion } from 'motion/react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="why-it-works" className="py-16 md:py-20 space-y-12 relative">
      <div className="section-divider mb-12" />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl md:text-[2.6rem] font-bold text-[#081d00] tracking-tight leading-tight"
        >
          Why Does This Happen in Your 30s — And Why Traditional "Solutions" Fail?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-sm md:text-base text-[#43483e] leading-relaxed"
        >
          Starting in your 30s, lifestyle load, career stress, and subtle hormonal shifts heighten your sympathetic nervous system. When performance pressure enters the equation, arousal accelerates faster than your conscious control can catch it.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: 'Numbing Sprays & Creams', desc: 'Dulls all physical sensation. Turns intimacy into a numb, mechanical chore and often transfers to your partner, ruining mutual pleasure.', result: 'Loss of sensation & connection', icon: '✕' },
          { title: 'Unapproved Pills & Supplements', desc: 'Creates unpredictable side-effects (headaches, flushing). Treats timing as a chemical problem rather than retraining nervous system control.', result: 'Psychological dependency & side effects', icon: '✕' },
          { title: 'Distraction & Mental Counting', desc: 'Counting backwards or thinking about sports pulls your mind entirely out of the room. Destroys emotional intimacy and fails under high arousal.', result: 'Disconnected & unnatural experience', icon: '✕' },
          { title: 'The Composure Method', desc: 'Retrains your pelvic neuromuscular response and parasympathetic nervous system. Builds genuine, natural stamina you retain for life.', result: 'Lasting confidence, presence & control', icon: '✓', highlight: true },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`${item.highlight ? 'dark-card glow-accent ring-2 ring-[#b7f473]/60 text-white' : 'bg-white'} p-6 rounded-2xl border ${item.highlight ? '' : 'border-red-100'} shadow-sm space-y-4 relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold relative z-10 ${item.highlight ? 'bg-[#b7f473] text-[#081d00]' : 'bg-red-100 text-red-600'}`}>
              {item.icon}
            </div>
            <div className="relative z-10">
              <h3 className={`font-display font-bold text-base mb-2 ${item.highlight ? 'text-white' : 'text-[#081d00]'}`}>{item.title}</h3>
              <p className={`font-body text-xs leading-relaxed ${item.highlight ? 'text-white/80' : 'text-[#52574c]'}`}>{item.desc}</p>
            </div>
            <div className={`relative z-10 pt-2 border-t ${item.highlight ? 'border-[#b7f473]/20' : 'border-red-50'} font-mono text-[10px] font-bold uppercase tracking-wide ${item.highlight ? 'text-[#b7f473]' : 'text-red-600'}`}>
              Result: {item.result}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-3xl border border-[#173404]/8 shadow-sm overflow-hidden"
      >
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
      </motion.div>
    </section>
  );
};
