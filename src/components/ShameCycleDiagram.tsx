import React, { useState } from 'react';

export const ShameCycleDiagram: React.FC = () => {
  const [interrupted, setInterrupted] = useState(false);

  const steps = [
    { num: 1, title: 'Performance Anxiety', icon: 'psychology_alt', desc: 'Pre-intimacy worry about timing & expectations' },
    { num: 2, title: 'Heightened Arousal Sensitivity', icon: 'speed', desc: 'Sympathetic nervous system triggers rapid climax reaction' },
    { num: 3, title: 'Early Finish', icon: 'timer_off', desc: 'Unintended completion before desired duration' },
    { num: 4, title: 'Shame & Avoidance', icon: 'lock', desc: 'Self-criticism, pulling back, and fearing future encounters' }
  ];

  return (
    <div className="my-6 p-6 md:p-8 bg-white rounded-2xl border border-[#173404]/10 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#173404]/10 pb-4">
        <div>
          <span className="text-xs font-mono-caps text-[#3e6a00] bg-[#b7f473]/30 px-3 py-1 rounded-full">
            INTERACTIVE DIAGRAM · LESSON 1.3
          </span>
          <h4 className="font-display text-xl font-bold text-[#081d00] mt-2">
            The Shame Cycle & Interruption Mechanics
          </h4>
        </div>
        <button
          onClick={() => setInterrupted(!interrupted)}
          className={`px-5 py-2.5 rounded-full font-mono-caps text-xs transition-all cursor-pointer flex items-center gap-2 ${
            interrupted
              ? 'bg-[#173404] text-white shadow-sm'
              : 'bg-[#f0ebe3] text-[#43483e] hover:bg-[#e4ddcf]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">
            {interrupted ? 'check_circle' : 'bolt'}
          </span>
          <span>{interrupted ? 'Awareness Active (Loop Interrupted)' : 'Simulate Loop Interruption'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => {
          const isInterruptedStep = step.num === 1;
          return (
            <div
              key={step.num}
              className={`p-5 rounded-xl border transition-all duration-300 relative ${
                interrupted && isInterruptedStep
                  ? 'bg-[#f4fce8] border-[#3e6a00] ring-2 ring-[#3e6a00]/20'
                  : interrupted && step.num > 1
                  ? 'bg-gray-50 border-gray-200 opacity-60'
                  : 'bg-[#fcf9f8] border-[#173404]/10 hover:border-[#173404]/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`w-8 h-8 rounded-full font-mono font-bold text-xs flex items-center justify-center ${
                  interrupted && isInterruptedStep ? 'bg-[#173404] text-white' : 'bg-[#e4edd8] text-[#173404]'
                }`}>
                  0{step.num}
                </span>
                <span className="material-symbols-outlined text-[#3e6a00]">{step.icon}</span>
              </div>
              <h5 className="font-display font-bold text-sm text-[#081d00] mb-1">{step.title}</h5>
              <p className="font-body text-xs text-[#43483e] leading-relaxed">{step.desc}</p>

              {interrupted && isInterruptedStep && (
                <div className="mt-3 pt-3 border-t border-[#3e6a00]/20 text-[11px] font-mono text-[#173404] bg-[#b7f473]/40 p-2 rounded-lg">
                  ✓ Normalized understanding & parasympathetic breathing resets baseline. Loop stops here.
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-xs text-[#52574c] bg-[#f8f6f0] p-4 rounded-xl border border-[#173404]/5 flex items-start gap-3">
        <span className="material-symbols-outlined text-[#173404] text-lg shrink-0">lightbulb</span>
        <span>
          <strong>Key Insight:</strong> Understanding that arousal control is a physical & nervous system response—not a character flaw—removes the emotional charge from Step 1, halting the cycle before physiological escalation occurs.
        </span>
      </div>
    </div>
  );
};
