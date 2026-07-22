import React, { useState } from 'react';
import { FAQ_LIST } from '../data/guideData';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleIdx = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-12 md:py-16 space-y-10 border-t border-[#173404]/10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono-caps text-[#3e6a00] bg-[#b7f473]/30 px-3.5 py-1 rounded-full">
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#081d00] tracking-tight">
          Everything You Need To Know
        </h2>
        <p className="font-body text-sm md:text-base text-[#43483e] leading-relaxed">
          Common questions about discreet billing, instant digital access, and how the program works.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {FAQ_LIST.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#173404]/10 overflow-hidden shadow-xs transition-colors"
            >
              <button
                onClick={() => toggleIdx(idx)}
                className="w-full text-left p-5 flex justify-between items-center gap-4 cursor-pointer hover:bg-[#fcf9f8]"
              >
                <h3 className="font-display font-bold text-sm md:text-base text-[#081d00]">
                  {faq.q}
                </h3>
                <span className="material-symbols-outlined text-[#173404] text-xl shrink-0">
                  {isOpen ? 'remove_circle_outline' : 'add_circle_outline'}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-[#173404]/5 font-body text-xs md:text-sm text-[#43483e] leading-relaxed animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
