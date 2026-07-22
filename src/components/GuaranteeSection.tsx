import React from 'react';

export const GuaranteeSection: React.FC = () => {
  return (
    <section className="py-12 relative">
      <div className="section-divider mb-12" />

      <div className="max-w-4xl mx-auto reveal-scale">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f6fef0] via-[#edfbd0] to-[#f6fef0] border border-[#b7f473]/50 shadow-lg p-8 md:p-12">
          {/* Decorative orbs */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#b7f473]/30 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#173404]/6 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Seal */}
            <div className="shrink-0">
              <div className="w-28 h-28 rounded-full bg-[#173404] text-[#b7f473] flex flex-col items-center justify-center border-4 border-[#b7f473] shadow-xl text-center p-2 animate-float glow-accent">
                <span className="material-symbols-outlined text-3xl">verified</span>
                <span className="font-mono-caps text-[9px] font-bold leading-tight mt-1">30-DAY<br/>GUARANTEE</span>
              </div>
            </div>

            {/* Copy */}
            <div className="space-y-3 text-center md:text-left">
              <span className="font-mono-caps text-xs text-[#3e6a00] font-bold uppercase tracking-wider block">
                100% RISK-FREE IRONCLAD GUARANTEE
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[#081d00]">
                Try The Composure Method For 30 Full Days — Zero Risk
              </h3>
              <p className="font-body text-sm text-[#43483e] leading-relaxed max-w-2xl">
                Take a full 30 days to go through the modules, practice the 4-2-7 breathwork, and try the pelvic exercises. If you don't notice a significant increase in your arousal control, stamina, and bedroom confidence, send us a simple one-line email for a prompt, 100% full refund. No questions asked. You keep the guides as our thanks for giving it an honest try.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-1">
                <span className="flex items-center gap-1.5 font-mono text-xs text-[#3e6a00]">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  No Questions Asked
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-[#3e6a00]">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Keep All Content
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-[#3e6a00]">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Full $20 Refund
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
