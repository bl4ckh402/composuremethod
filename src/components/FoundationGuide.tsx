import React, { useState } from 'react';
import { COMPOSURE_MODULES, TONIGHT_CHEAT_SHEET } from '../data/guideData';
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

  const activeMod = COMPOSURE_MODULES.find(m => m.id === selectedModule) || COMPOSURE_MODULES[0];

  return (
    <section id="curriculum" className="py-12 md:py-16 space-y-10 border-t border-[#173404]/10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono-caps text-[#3e6a00] bg-[#b7f473]/30 px-3.5 py-1 rounded-full">
          COMPLETE DIGITAL CURRICULUM
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#081d00] tracking-tight">
          What You Get Inside The Composure Method
        </h2>
        <p className="font-body text-sm md:text-base text-[#43483e] leading-relaxed">
          5 structured digital modules, step-by-step physical protocols, and 4 free instant bonuses designed for rapid, discreet implementation.
        </p>
      </div>

      {/* 5 Core Modules Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMPOSURE_MODULES.map((mod) => (
          <div
            key={mod.id}
            className="bg-white p-6 rounded-2xl border border-[#173404]/10 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#173404]/30 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-caps text-xs text-[#3e6a00] bg-[#b7f473]/30 px-3 py-1 rounded-full font-bold">
                  MODULE 0{mod.moduleNumber}
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px] text-[#74796d]">
                  <span className="material-symbols-outlined text-sm text-[#173404]">
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

              {/* Lesson Highlights List */}
              <div className="pt-2 border-t border-[#173404]/10 space-y-2">
                <span className="font-mono-caps text-[10px] text-[#74796d] block uppercase tracking-wider">
                  KEY LESSONS INCLUDED:
                </span>
                <ul className="space-y-1.5 font-body text-xs text-[#1c1b1b]">
                  {mod.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#3e6a00] text-sm shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span className="line-clamp-1">{lesson.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#173404]/10">
              <button
                onClick={isMemberVerified ? () => setSelectedModule(mod.id) : onOpenCheckout}
                className="w-full bg-[#f0ebe3] text-[#173404] hover:bg-[#173404] hover:text-white font-mono-caps text-xs py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 font-bold"
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
            </div>
          </div>
        ))}

        {/* Bonus Stack Highlight Card */}
        <div className="bg-[#173404] text-white p-6 rounded-2xl border border-[#173404] shadow-md flex flex-col justify-between space-y-4 relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <span className="font-mono-caps text-xs text-[#b7f473] bg-[#b7f473]/20 px-3 py-1 rounded-full font-bold">
              4 FREE BONUSES
            </span>
            <h3 className="font-display text-xl font-bold text-white">
              Instant Action Digital Assets
            </h3>
            <p className="font-body text-xs text-[#e0e3da] leading-relaxed">
              Includes the "Tonight" In-Bed 5-Step Sheet, Partner Communication Playbook, 30/60/90 Progress Roadmap, and AI Assessor.
            </p>
            <div className="pt-2 space-y-1.5 font-body text-xs text-white/90">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b7f473] text-sm">check_circle</span>
                <span>Bonus #1: In-Bed Quick Sheet ($30 Value)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b7f473] text-sm">check_circle</span>
                <span>Bonus #2: Partner Script Playbook ($25 Value)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b7f473] text-sm">check_circle</span>
                <span>Bonus #3: 30/60/90 Roadmap ($25 Value)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b7f473] text-sm">check_circle</span>
                <span>Bonus #4: AI Protocol Assessor ($20 Value)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/15 relative z-10">
            <button
              onClick={onOpenCheckout}
              className="w-full bg-[#b7f473] text-[#081d00] font-mono-caps text-xs font-bold py-3 rounded-xl hover:bg-white transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Claim All Bonuses for $20</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
