import React, { useState } from 'react';
import { motion } from 'motion/react';
import { COMPOSURE_MODULES } from '../data/guideData';
import { ViewMode } from '../types';

interface FoundationGuideProps {
  onNavigate: (view: ViewMode) => void;
  onOpenCheckout: () => void;
  isMemberVerified?: boolean;
}

export const FoundationGuide: React.FC<FoundationGuideProps> = ({
  onNavigate,
  onOpenCheckout,
  isMemberVerified,
}) => {
  const [selectedModule, setSelectedModule] = useState<string>('module-1');

  const bonuses = [
    { num: '01', title: 'In-Bed 5-Step Quick Sheet', desc: 'Use tonight. Reference during intimacy without breaking flow.', value: '$30', icon: 'article' },
    { num: '02', title: 'Partner Communication Playbook', desc: 'Word-for-word scripts to share this journey together.', value: '$25', icon: 'chat_bubble' },
    { num: '03', title: '30/60/90-Day Progress Roadmap', desc: 'Track your arousal milestones with a daily practice log.', value: '$25', icon: 'insights' },
    { num: '04', title: 'AI Personalization Protocol', desc: 'Custom nervous system reset protocol tailored to your stress state.', value: '$20', icon: 'smart_toy' },
  ];

  return (
    <section id="curriculum" className="py-16 md:py-20 space-y-12 relative">
      <div className="section-divider mb-12" />

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl md:text-[2.6rem] font-bold text-[#081d00] tracking-tight"
        >
          What You Get Inside The Composure Method
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-sm md:text-base text-[#43483e] leading-relaxed"
        >
          5 structured digital modules, step-by-step physical protocols, and 4 free instant bonuses designed for rapid, discreet implementation.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {COMPOSURE_MODULES.map((mod, i) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card p-6 flex flex-col justify-between space-y-5 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="badge-lime text-[10px]">MODULE 0{mod.moduleNumber}</span>
                <span className={`flex items-center gap-1 font-mono text-[11px] ${isMemberVerified ? 'text-[#3e6a00]' : 'text-[#74796d]'}`}>
                  <span className="material-symbols-outlined text-sm">
                    {isMemberVerified ? 'lock_open' : 'lock'}
                  </span>
                  {isMemberVerified ? 'Unlocked' : 'Members Only'}
                </span>
              </div>

              <h3 className="font-display text-lg font-bold text-[#081d00] leading-snug">
                {mod.title}
              </h3>
              <p className="font-body text-xs text-[#43483e] leading-relaxed">
                {mod.description}
              </p>

              <div className="pt-3 border-t border-[#173404]/8 space-y-2">
                <span className="font-mono-caps text-[10px] text-[#74796d] block uppercase tracking-wider">
                  Key Lessons:
                </span>
                <ul className="space-y-1.5 font-body text-xs text-[#1c1b1b]">
                  {mod.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#3e6a00] text-sm shrink-0 mt-0.5">check_circle</span>
                      <span className="line-clamp-1">{lesson.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={isMemberVerified ? () => setSelectedModule(mod.id) : onOpenCheckout}
              className="w-full btn-ghost py-2.5 rounded-xl border-[#173404]/15 group-hover:border-[#173404]/30 group-hover:bg-[#f6fef0] transition-all"
            >
              {isMemberVerified ? (
                <>
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  <span>View Module Content</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>Unlock Module ($20)</span>
                </>
              )}
            </button>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="dark-card p-6 flex flex-col justify-between space-y-5 relative overflow-hidden ring-1 ring-[#b7f473]/30"
        >
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#b7f473]/12 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-3 relative z-10">
            <span className="badge-lime text-[10px]">4 FREE BONUSES</span>
            <h3 className="font-display text-xl font-bold text-white">
              Instant Action Digital Assets
            </h3>
            <p className="font-body text-xs text-white/70 leading-relaxed">
              Includes the "Tonight" In-Bed 5-Step Sheet, Partner Communication Playbook, 30/60/90 Progress Roadmap, and AI Assessor.
            </p>
            <div className="space-y-2">
              {['Bonus #1: In-Bed Quick Sheet ($30 Value)', 'Bonus #2: Partner Script Playbook ($25 Value)', 'Bonus #3: 30/60/90 Roadmap ($45 Value)',].map(b => (
                <div key={b} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#b7f473] text-sm">check_circle</span>
                  <span className="font-body text-xs text-white/90">{b}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={onOpenCheckout}
            className="btn-accent w-full text-sm py-3 relative z-10"
          >
            <span>Claim All Bonuses for $20</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </motion.div>
      </div>

      <div className="space-y-4">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-xl font-bold text-[#081d00] text-center"
        >
          Your 4 Free Bonuses — Included Instantly
        </motion.h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bonuses.map((bonus, i) => (
            <motion.div
              key={bonus.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="premium-card p-5 space-y-3 text-center group hover:bg-gradient-to-b hover:from-white hover:to-[#f6fef0]"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#b7f473]/20 border border-[#b7f473]/40 flex items-center justify-center mx-auto group-hover:bg-[#b7f473]/40 transition-colors">
                <span className="material-symbols-outlined text-[#3e6a00] text-2xl">{bonus.icon}</span>
              </div>
              <div>
                <span className="font-mono-caps text-[9px] text-[#3e6a00] font-bold block mb-1">BONUS #{bonus.num}</span>
                <h4 className="font-display text-sm font-bold text-[#081d00] leading-snug">{bonus.title}</h4>
                <p className="font-body text-xs text-[#43483e] mt-1 leading-relaxed">{bonus.desc}</p>
              </div>
              <span className="inline-block font-mono text-xs text-[#74796d] line-through">{bonus.value} Value</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
