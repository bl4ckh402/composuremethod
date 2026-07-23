import React from 'react';
import { motion } from 'motion/react';
import { ViewMode } from '../types';

interface MemberDashboardProps {
  email: string;
  onNavigate: (view: ViewMode) => void;
}

const toolGroups = [
  {
    title: 'Daily Practice',
    items: [
      { id: 'breathing' as ViewMode, label: 'Breathing Pacer', desc: 'Guided parasympathetic breathwork for arousal regulation.', icon: 'air' },
      { id: 'pelvic' as ViewMode, label: 'Pelvic Floor Trainer', desc: 'Structured neuromuscular rep tracker with timed contractions.', icon: 'fitness_center' },
      { id: 'arousal' as ViewMode, label: 'Arousal Scale', desc: 'Interactive 1–10 stop-start awareness trainer.', icon: 'speed' },
    ],
  },
  {
    title: 'AI Guidance',
    items: [
      { id: 'clarity-ai' as ViewMode, label: 'Clarity Protocol', desc: 'AI-generated 3-step reset protocol based on your current state.', icon: 'psychology' },
    ],
  },
  {
    title: 'Progress & Communication',
    items: [
      { id: 'journal' as ViewMode, label: 'Practice Journal', desc: 'Log sessions, track composure score, and view trends.', icon: 'edit_note' },
      { id: 'roadmap' as ViewMode, label: 'Roadmap Tracker', desc: '30/60/90-day execution checklist with persistence.', icon: 'route' },
      { id: 'scripts' as ViewMode, label: 'Partner Scripts', desc: 'Low-stakes communication frameworks for honest conversation.', icon: 'chat' },
      { id: 'shame-cycle' as ViewMode, label: 'Shame Cycle Map', desc: 'Interactive diagram showing loop interruption mechanics.', icon: 'loop' },
    ],
  },
];

export const MemberDashboard: React.FC<MemberDashboardProps> = ({ email, onNavigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-7xl mx-auto px-5 md:px-12 py-16 md:py-24"
    >
      <div className="max-w-2xl mb-12">
        <span className="badge-lime inline-flex items-center gap-1.5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3e6a00] animate-pulse" />
          MEMBER ACCESS ACTIVE
        </span>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-[#081d00] tracking-tight leading-[1.1] mb-3">
          Welcome back.
        </h1>
        <p className="font-body text-base text-[#43483e]">
          Logged in as <span className="font-mono text-[#173404]">{email}</span>. Pick a tool to continue your practice.
        </p>
      </div>

      <div className="space-y-10">
        {toolGroups.map((group, gi) => (
          <div key={group.title}>
            <h2 className="font-mono-caps text-[11px] text-[#74796d] tracking-widest uppercase mb-4">
              {group.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {group.items.map((tool, i) => (
                <motion.button
                  key={tool.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: gi * 0.1 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate(tool.id)}
                  className="premium-card p-6 text-left group"
                >
                  <span className="material-symbols-outlined text-[#3e6a00] text-2xl mb-3 block">{tool.icon}</span>
                  <span className="font-display text-sm font-bold text-[#081d00] block mb-1">{tool.label}</span>
                  <span className="font-body text-xs text-[#74796d] leading-relaxed">{tool.desc}</span>
                  <span className="material-symbols-outlined text-[#173404] text-sm mt-4 block group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
