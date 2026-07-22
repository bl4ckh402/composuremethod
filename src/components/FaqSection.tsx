import React, { useState } from 'react';
import { FAQ_LIST } from '../data/guideData';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleIdx = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-20 space-y-12 relative">
      <div className="section-divider mb-12" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 reveal-slide-up">
        <h2 className="font-display text-3xl md:text-[2.6rem] font-bold text-[#081d00] tracking-tight">
          Everything You Need To Know
        </h2>
        <p className="font-body text-sm md:text-base text-[#43483e] leading-relaxed">
          Common questions about discreet billing, instant digital access, and how the program works.
        </p>
      </div>

      {/* FAQ accordion */}
      <div className="max-w-3xl mx-auto space-y-3">
        {FAQ_LIST.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`reveal-scale rounded-2xl border overflow-hidden transition-all duration-300 ${
                isOpen
                  ? 'border-[#173404]/20 shadow-md bg-white'
                  : 'border-[#173404]/8 bg-white hover:border-[#173404]/15 shadow-sm'
              }`}
              style={{ animationDelay: `${idx * 0.04}s` }}
            >
              <button
                id={`faq-btn-${idx}`}
                onClick={() => toggleIdx(idx)}
                className="w-full text-left p-5 flex justify-between items-center gap-4 cursor-pointer"
              >
                <h3 className="font-display font-bold text-sm md:text-base text-[#081d00]">
                  {faq.q}
                </h3>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isOpen ? 'bg-[#173404] text-[#b7f473]' : 'bg-[#f0ebe3] text-[#173404]'
                }`}>
                  <span className="material-symbols-outlined text-lg">
                    {isOpen ? 'remove' : 'add'}
                  </span>
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-0 border-t border-[#173404]/6 font-body text-sm text-[#43483e] leading-relaxed animate-fadeIn">
                  <div className="pt-4">{faq.a}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
