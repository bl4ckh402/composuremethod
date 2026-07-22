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
      icon: 'psychology'
    },
    {
      num: '02',
      title: 'Neuromuscular Pelvic Training',
      tagline: 'The 1–10 Scale & Stop-Start Trainer',
      desc: 'Map your arousal threshold, identify your Level 7 point of no return, and condition your pelvic muscles to regulate nerve signal intensity.',
      icon: 'fitness_center'
    },
    {
      num: '03',
      title: 'Parasympathetic Breath Control',
      tagline: '4-2-7 Vagus Nerve Regulation',
      desc: 'Activate parasympathetic dominance using slow 4-count inhale / 7-count exhale breathwork to calm rapid heart rate and extend timing.',
      icon: 'air'
    },
    {
      num: '04',
      title: 'Shame-Free Partner Alignment',
      tagline: 'Word-for-Word Scripts & Pacing',
      desc: 'Shift intimacy from a solo performance test into a relaxed, shared experience with low-stakes communication frameworks.',
      icon: 'diversity_1'
    }
  ];

  return (
    <section id="the-method" className="py-12 md:py-16 space-y-10 border-t border-[#173404]/10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono-caps text-[#3e6a00] bg-[#b7f473]/30 px-3.5 py-1 rounded-full">
          THE 4-PILLAR METHODOLOGY
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#081d00] tracking-tight">
          A Complete, 4-Pillar System For Lasting Control
        </h2>
        <p className="font-body text-sm md:text-base text-[#43483e] leading-relaxed">
          The Composure Method combines physiological education, pelvic conditioning, parasympathetic breathwork, and partner scripts into a simple daily habit loop.
        </p>
      </div>

      {/* 4 Pillars Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((pillar) => (
          <div
            key={pillar.num}
            className="bg-white p-8 rounded-2xl border border-[#173404]/10 shadow-sm space-y-4 hover:border-[#173404]/30 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="flex items-center justify-between border-b border-[#173404]/10 pb-4">
              <span className="w-10 h-10 rounded-xl bg-[#173404] text-white font-mono font-bold text-sm flex items-center justify-center">
                {pillar.num}
              </span>
              <span className="material-symbols-outlined text-[#3e6a00] text-2xl group-hover:scale-110 transition-transform">
                {pillar.icon}
              </span>
            </div>

            <div className="space-y-1">
              <span className="font-mono-caps text-[11px] text-[#3e6a00] block font-bold">
                {pillar.tagline}
              </span>
              <h3 className="font-display text-2xl font-bold text-[#081d00]">
                {pillar.title}
              </h3>
            </div>

            <p className="font-body text-xs md:text-sm text-[#43483e] leading-relaxed">
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Mid-Page Call to Action Banner */}
      <div className="bg-[#f0ebe3] p-8 md:p-10 rounded-3xl border border-[#173404]/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-display text-xl md:text-2xl font-bold text-[#081d00]">
            Ready to retrain your nervous system and regain complete bedroom confidence?
          </h3>
          <p className="font-body text-xs md:text-sm text-[#52574c]">
            Get immediate access to all Assets + 4 Free Bonuses for $20 (Full Value $197).
          </p>
        </div>

        <button
          onClick={handleClick}
          className="bg-[#173404] text-white font-mono-caps text-xs px-8 py-4 rounded-full hover:bg-[#081d00] transition-colors shadow-sm shrink-0 cursor-pointer flex items-center gap-2 font-bold"
        >
          <span>{isMemberVerified ? 'Access Unlocked 4-Pillar System' : 'Get Started Now — $20 (Worth $197)'}</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </section>
  );
};
