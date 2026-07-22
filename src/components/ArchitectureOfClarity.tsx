import React from 'react';

interface ArchitectureProps {
  onOpenCheckout: () => void;
  isMemberVerified?: boolean;
}

export const ArchitectureOfClarity: React.FC<ArchitectureProps> = ({ onOpenCheckout, isMemberVerified = false }) => {
  const handleClick = () => {
    if (isMemberVerified) {
      const el = document.getElementById('curriculum');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenCheckout();
    }
  };

  const pillars = [
    {
      num: '01',
      title: 'Physiological Decoding',
      tagline: 'Deconstructing the Anxiety & Shame Loop',
      desc: 'Learn why changes occur in your 30s due to nervous system sensitivity. Normalize the mind-body response to permanently remove performance pressure.',
      icon: 'psychology',
      color: 'from-purple-50 to-indigo-50',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-700',
    },
    {
      num: '02',
      title: 'Neuromuscular Pelvic Training',
      tagline: 'The 1–10 Scale & Stop-Start Trainer',
      desc: 'Map your arousal threshold, identify your Level 7 point of no return, and condition your pelvic muscles to regulate nerve signal intensity.',
      icon: 'fitness_center',
      color: 'from-emerald-50 to-green-50',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-700',
    },
    {
      num: '03',
      title: 'Parasympathetic Breath Control',
      tagline: '4-2-7 Vagus Nerve Regulation',
      desc: 'Activate parasympathetic dominance using slow 4-count inhale / 7-count exhale breathwork to calm rapid heart rate and extend timing.',
      icon: 'air',
      color: 'from-sky-50 to-blue-50',
      iconBg: 'bg-sky-100',
      iconColor: 'text-sky-700',
    },
    {
      num: '04',
      title: 'Shame-Free Partner Alignment',
      tagline: 'Word-for-Word Scripts & Pacing',
      desc: 'Shift intimacy from a solo performance test into a relaxed, shared experience with low-stakes communication frameworks.',
      icon: 'diversity_1',
      color: 'from-rose-50 to-pink-50',
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-700',
    }
  ];

  return (
    <section id="the-method" className="py-16 md:py-20 space-y-12 relative">
      <div className="section-divider mb-12" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 reveal-slide-up">
        <h2 className="font-display text-3xl md:text-[2.6rem] font-bold text-[#081d00] tracking-tight">
          A Complete, 4-Pillar System For Lasting Control
        </h2>
        <p className="font-body text-sm md:text-base text-[#43483e] leading-relaxed">
          The Composure Method combines physiological education, pelvic conditioning, parasympathetic breathwork, and partner scripts into a simple daily habit loop.
        </p>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {pillars.map((pillar, i) => (
          <div
            key={pillar.num}
            className="reveal-scale premium-card p-8 overflow-hidden relative group"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {/* Decorative background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[20px]`} />

            <div className="relative z-10 space-y-4">
              {/* Number + icon row */}
              <div className="flex items-center justify-between pb-4 border-b border-[#173404]/8">
                <span className="w-10 h-10 rounded-xl bg-[#173404] text-white font-mono font-bold text-sm flex items-center justify-center">
                  {pillar.num}
                </span>
                <div className={`w-11 h-11 rounded-xl ${pillar.iconBg} ${pillar.iconColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <span className="material-symbols-outlined text-2xl">{pillar.icon}</span>
                </div>
              </div>

              {/* Text */}
              <div>
                <span className="font-mono-caps text-[10px] text-[#3e6a00] font-bold block mb-1">
                  {pillar.tagline}
                </span>
                <h3 className="font-display text-xl font-bold text-[#081d00] mb-2">
                  {pillar.title}
                </h3>
                <p className="font-body text-sm text-[#43483e] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mid-page CTA banner */}
      <div className="reveal-scale dark-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -right-24 -top-24 w-64 h-64 bg-[#b7f473]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-[#b7f473]/8 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-2 text-center md:text-left relative z-10">
          <h3 className="font-display text-xl md:text-2xl font-bold text-white">
            Ready to retrain your nervous system and regain complete bedroom confidence?
          </h3>
          <p className="font-body text-sm text-white/70">
            Get immediate access to all Assets + 4 Free Bonuses for $20 (Full Value $197).
          </p>
        </div>

        <button
          onClick={handleClick}
          className="btn-accent shrink-0 text-sm py-4 px-8 relative z-10"
        >
          <span className="material-symbols-outlined text-[#081d00] text-lg">lock_open</span>
          <span>{isMemberVerified ? 'Access Unlocked 4-Pillar System' : 'Get Started Now — $20 (Worth $197)'}</span>
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>
    </section>
  );
};
