import React from 'react';

export const SelfQualification: React.FC = () => {
  return (
    <section className="py-16 md:py-20 space-y-12 relative">
      <div className="section-divider mb-12" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 reveal-slide-up">
        <h2 className="font-display text-3xl md:text-[2.6rem] font-bold text-[#081d00] tracking-tight">
          Is The Composure Method Right For You?
        </h2>
        <p className="font-body text-sm md:text-base text-[#43483e] leading-relaxed">
          We designed this system specifically for men who value evidence-based physical &amp; mental mastery over artificial quick fixes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* THIS IS FOR YOU */}
        <div className="reveal-scale premium-card p-8 space-y-6 relative overflow-hidden border-emerald-200/80 group hover:border-emerald-300 transition-colors">
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

          <div className="flex items-center gap-3 border-b border-emerald-100 pb-4 relative z-10">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl font-bold shrink-0">
              ✓
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-[#081d00]">This IS For You If...</h3>
              <p className="font-mono-caps text-[10px] text-[#3e6a00] font-bold">THE IDEAL CANDIDATE</p>
            </div>
          </div>

          <ul className="space-y-4 font-body text-xs md:text-sm text-[#333a2e] relative z-10">
            {[
              ['You are a man age 30+', 'experiencing faster-than-desired climax or elevated pre-intimacy anxiety.'],
              ['You want a permanent physical skill', 'you can retain for life without relying on sprays, creams, or pills.'],
              ['You can dedicate 10 minutes a day', 'to simple, discrete pelvic floor and parasympathetic breathing exercises.'],
              ['You value discretion:', 'You want a clean, private digital system you can access on your phone or laptop.'],
            ].map(([bold, rest]) => (
              <li key={bold} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-600 text-base shrink-0 mt-0.5">check_circle</span>
                <span><strong>{bold}</strong> {rest}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* THIS IS NOT FOR YOU */}
        <div className="reveal-scale premium-card p-8 space-y-6 relative overflow-hidden border-red-100 group hover:border-red-200 transition-colors" style={{animationDelay:'0.1s'}}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-red-50 rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

          <div className="flex items-center gap-3 border-b border-red-100 pb-4 relative z-10">
            <div className="w-11 h-11 rounded-xl bg-red-100 text-red-700 flex items-center justify-center text-xl font-bold shrink-0">
              ✕
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-[#081d00]">This IS NOT For You If...</h3>
              <p className="font-mono-caps text-[10px] text-red-600 font-bold">UNSUITABLE CASES</p>
            </div>
          </div>

          <ul className="space-y-4 font-body text-xs md:text-sm text-[#43483e] relative z-10">
            {[
              ['You want a magic overnight pill:', 'This program retrains muscle memory and requires 4–8 weeks of consistency.'],
              ['You prefer numbing products:', 'If you enjoy losing all physical sensation during intimacy, this is not for you.'],
              ['You are experiencing severe acute medical symptoms:', 'Sudden pain, bleeding, or underlying prostate conditions require direct urologist care.'],
            ].map(([bold, rest]) => (
              <li key={bold as string} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-red-500 text-base shrink-0 mt-0.5">cancel</span>
                <span><strong>{bold}</strong> {rest}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
