import React from 'react';
import { useI18n } from '../lib/i18n';

export const SelfQualification: React.FC = () => {
  const { t, strings } = useI18n();
  const sq = strings.selfQualification;

  return (
    <section className="py-16 md:py-20 space-y-12 relative">
      <div className="section-divider mb-12" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 reveal-slide-up">
        <h2 className="font-display text-3xl md:text-[2.6rem] font-bold text-[#081d00] tracking-tight">
          {sq.headline}
        </h2>
        <p className="font-body text-sm md:text-base text-[#43483e] leading-relaxed">
          {sq.subtext}
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
              <h3 className="font-display font-bold text-xl text-[#081d00]">{sq.forYouTitle}</h3>
              <p className="font-mono-caps text-[10px] text-[#3e6a00] font-bold">{sq.forYouLabel}</p>
            </div>
          </div>

          <ul className="space-y-4 font-body text-xs md:text-sm text-[#333a2e] relative z-10">
            {sq.forYouBullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-600 text-base shrink-0 mt-0.5">check_circle</span>
                <span>{bullet}</span>
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
              <h3 className="font-display font-bold text-xl text-[#081d00]">{sq.notForYouTitle}</h3>
              <p className="font-mono-caps text-[10px] text-red-600 font-bold">{sq.notForYouLabel}</p>
            </div>
          </div>

          <ul className="space-y-4 font-body text-xs md:text-sm text-[#43483e] relative z-10">
            {sq.notForYouBullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-red-500 text-base shrink-0 mt-0.5">cancel</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
