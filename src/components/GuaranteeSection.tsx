import React from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../lib/i18n';

export const GuaranteeSection: React.FC = () => {
  const { t, strings } = useI18n();
  const guarantee = strings.guarantee;
  return (
    <section className="py-12 relative">
      <div className="section-divider mb-12" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f6fef0] via-[#edfbd0] to-[#f6fef0] border border-[#b7f473]/50 shadow-lg p-8 md:p-12">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#b7f473]/30 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#173404]/6 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="shrink-0">
              <div className="w-28 h-28 rounded-full bg-[#173404] text-[#b7f473] flex flex-col items-center justify-center border-4 border-[#b7f473] shadow-xl text-center p-2 animate-float glow-accent">
                <span className="material-symbols-outlined text-3xl">verified</span>
                <span className="font-mono-caps text-[9px] font-bold leading-tight mt-1">30-DAY<br/>GUARANTEE</span>
              </div>
            </div>

            <div className="space-y-3 text-center md:text-left">
              <span className="font-mono-caps text-xs text-[#3e6a00] font-bold uppercase tracking-wider block">
                {guarantee.heading}
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-[#081d00]">
                {guarantee.subheading}
              </h3>
              <p className="font-body text-sm text-[#43483e] leading-relaxed max-w-2xl">
                {guarantee.body}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-1">
                <span className="flex items-center gap-1.5 font-mono text-xs text-[#3e6a00]">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  {guarantee.noQuestionsAsked}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-[#3e6a00]">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  {guarantee.keepAllContent}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-[#3e6a00]">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  {guarantee.fullRefund}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
