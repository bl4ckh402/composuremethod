import React from 'react';

export const GuaranteeSection: React.FC = () => {
  return (
    <section className="py-12 border-t border-[#173404]/10">
      <div className="bg-[#f6f3f2] rounded-3xl p-8 md:p-12 border border-[#173404]/15 shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Seal Icon */}
        <div className="w-24 h-24 rounded-full bg-[#173404] text-[#b7f473] flex flex-col items-center justify-center shrink-0 border-4 border-[#b7f473] shadow-md text-center p-2">
          <span className="material-symbols-outlined text-3xl">verified</span>
          <span className="font-mono-caps text-[9px] font-bold leading-none mt-1">30-DAY GUARANTEE</span>
        </div>

        {/* Guarantee Text */}
        <div className="space-y-3 text-center md:text-left">
          <span className="font-mono-caps text-xs text-[#3e6a00] font-bold uppercase tracking-wider block">
            100% RISK-FREE IRONCLAD GUARANTEE
          </span>
          <h3 className="font-display text-2xl font-bold text-[#081d00]">
            Try The Composure Method For 30 Full Days — Zero Risk
          </h3>
          <p className="font-body text-xs md:text-sm text-[#43483e] leading-relaxed">
            Take a full 30 days to go through the modules, practice the 4-2-7 breathwork, and try the pelvic exercises. If you don't notice a significant increase in your arousal control, stamina, and bedroom confidence, send us a simple one-line email for a prompt, 100% full refund. No questions asked. You keep the guides as our thanks for giving it an honest try.
          </p>
        </div>
      </div>
    </section>
  );
};
