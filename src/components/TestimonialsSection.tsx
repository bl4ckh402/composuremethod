import React from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../lib/i18n';

export const TestimonialsSection: React.FC = () => {
  const { t, strings } = useI18n();
  const reviews = strings.testimonials.reviews;
  const stats = strings.stats;

  return (
    <section id="reviews" className="py-16 md:py-20 space-y-12 relative">
      <div className="section-divider mb-12" />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2">
          <div className="flex text-amber-400 text-sm">{'★'.repeat(5)}</div>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl md:text-[2.6rem] font-bold text-[#081d00] tracking-tight"
        >
          {strings.testimonials.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-sm md:text-base text-[#43483e] leading-relaxed"
        >
          {strings.testimonials.subtitle}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reviews.map((rev, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card p-7 md:p-8 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#b7f473]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 text-base gap-0.5">
                  {'★'.repeat(rev.rating)}
                </div>
                <span className="badge-lime text-[10px]">
                  {rev.stat}
                </span>
              </div>

              <blockquote className="font-display font-bold text-base md:text-lg text-[#081d00] leading-snug">
                "{rev.headline}"
              </blockquote>

              <p className="font-body text-xs md:text-sm text-[#43483e] leading-relaxed">
                {rev.text}
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#173404]/8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#173404] text-[#b7f473] flex items-center justify-center font-display font-bold text-sm shrink-0">
                  {rev.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#081d00]">{rev.name}</h4>
                  <p className="font-mono text-[11px] text-[#74796d]">{rev.role}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-[11px] text-[#3e6a00] font-bold block">{rev.age}</span>
                <span className="font-mono text-[10px] text-[#74796d]">{rev.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-gradient-to-r from-[#f6fef0] via-[#edfbd0] to-[#f6fef0] rounded-3xl border border-[#b7f473]/40 p-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '12,400+', label: stats.menTrained },
            { num: '4.9 / 5', label: stats.averageRating },
            { num: '89%', label: stats.resultsIn30Days },
            { num: '30-Day', label: stats.moneyBackGuarantee },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="stat-number text-[#173404]">{item.num}</div>
              <p className="font-mono text-[11px] text-[#43483e] uppercase tracking-wide">{item.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
