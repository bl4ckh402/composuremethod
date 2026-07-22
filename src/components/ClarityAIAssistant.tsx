import React, { useState } from 'react';
import { ClarityProtocol, ViewMode, BreathworkPattern } from '../types';

interface ClarityAIAssistantProps {
  onStartBreathwork: (pattern: BreathworkPattern) => void;
  onNavigate: (view: ViewMode) => void;
}

export const ClarityAIAssistant: React.FC<ClarityAIAssistantProps> = ({ onStartBreathwork, onNavigate }) => {
  const [stressLevel, setStressLevel] = useState<number>(6);
  const [primaryStressor, setPrimaryStressor] = useState<string>('Scattered focus and conflicting priorities');
  const [currentContext, setCurrentContext] = useState<string>('Desk / Workstation');
  const [energyLevel, setEnergyLevel] = useState<string>('Medium');
  const [loading, setLoading] = useState<boolean>(false);
  const [protocol, setProtocol] = useState<ClarityProtocol | null>(null);

  const generateProtocol = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/clarity-protocol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stressLevel,
          primaryStressor,
          currentContext,
          energyLevel
        })
      });

      if (!response.ok) {
        throw new Error('Server error generating protocol');
      }

      const data = await response.json();
      setProtocol(data);
    } catch (err) {
      console.error(err);
      // Fallback protocol if request fails
      setProtocol({
        protocolTitle: "Tactical Cortisol Dump & Focal Reset",
        cortisolTarget: "Lower acute stress response by ~35% within 6 minutes",
        breathworkPattern: {
          name: "Box Breathing (4-4-4-4)",
          inhale: 4,
          hold1: 4,
          exhale: 4,
          hold2: 4,
          cycles: 6
        },
        pillars: [
          {
            step: 1,
            title: "Cognitive De-escalation",
            action: `Isolate "${primaryStressor}". Name the single highest-leverage outcome required today and discard secondary noise.`
          },
          {
            step: 2,
            title: "Somatic Grounding",
            action: "Drop shoulders, lengthen spine, unclench jaw. Gaze at a fixed point 10 feet away for 60 seconds."
          },
          {
            step: 3,
            title: "Environmental Discipline",
            action: "Close all unneeded tabs. Put phone in Do Not Disturb and out of line-of-sight."
          }
        ],
        quote: "Order is not the absence of pressure, but the architecture through which pressure is rendered harmless."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 font-mono-caps text-[#3e6a00] bg-[#b7f473]/30 px-3 py-1 rounded-full mb-3">
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
          <span>AI CLARITY ARCHITECT</span>
        </div>
        <h2 className="font-display text-3xl font-bold text-[#081d00] mb-2">
          Generate Tactical Protocol
        </h2>
        <p className="font-body text-base text-[#43483e]">
          Input your current cognitive & physiological state. The AI Clarity Architect formulates a customized 3-step composure protocol.
        </p>
      </div>

      {/* Input Form & Output Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Panel */}
        <div className="lg:col-span-5 bg-white border border-[#173404]/10 rounded-2xl p-6 shadow-sm">
          <form onSubmit={generateProtocol} className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-mono-caps text-xs text-[#081d00] font-bold">
                  STRESS LEVEL ({stressLevel}/10)
                </label>
                <span className="font-mono-caps text-xs text-[#74796d]">
                  {stressLevel >= 8 ? 'High Cortisol' : stressLevel >= 5 ? 'Elevated' : 'Controlled'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={stressLevel}
                onChange={(e) => setStressLevel(Number(e.target.value))}
                className="w-full accent-[#173404] cursor-pointer"
              />
            </div>

            <div>
              <label className="font-mono-caps text-xs text-[#081d00] font-bold block mb-1">
                PRIMARY STRESSOR / FOCUS BLOCK
              </label>
              <input
                type="text"
                value={primaryStressor}
                onChange={(e) => setPrimaryStressor(e.target.value)}
                placeholder="e.g. Too many tasks, presentation anxiety..."
                className="w-full bg-[#fcf9f8] border border-[#173404]/15 rounded-lg px-3 py-2 text-sm text-[#1c1b1b] focus:outline-none focus:border-[#173404]"
                required
              />
            </div>

            <div>
              <label className="font-mono-caps text-xs text-[#081d00] font-bold block mb-1">
                ENVIRONMENT / CONTEXT
              </label>
              <select
                value={currentContext}
                onChange={(e) => setCurrentContext(e.target.value)}
                className="w-full bg-[#fcf9f8] border border-[#173404]/15 rounded-lg px-3 py-2 text-sm text-[#1c1b1b] focus:outline-none focus:border-[#173404]"
              >
                <option value="Desk / Workstation">Desk / Workstation</option>
                <option value="Pre-Meeting / Presentation">Pre-Meeting / Presentation</option>
                <option value="Transit / Travelling">Transit / Travelling</option>
                <option value="Home / Evening Winddown">Home / Evening Winddown</option>
              </select>
            </div>

            <div>
              <label className="font-mono-caps text-xs text-[#081d00] font-bold block mb-1">
                CURRENT ENERGY LEVEL
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Low', 'Medium', 'High'].map((energy) => (
                  <button
                    key={energy}
                    type="button"
                    onClick={() => setEnergyLevel(energy)}
                    className={`py-2 px-3 text-xs font-mono-caps rounded-lg border transition-all ${
                      energyLevel === energy
                        ? 'bg-[#173404] text-white border-[#173404]'
                        : 'bg-[#fcf9f8] text-[#43483e] border-[#173404]/15 hover:border-[#173404]/30'
                    }`}
                  >
                    {energy}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#173404] text-white font-mono-caps py-3.5 px-4 rounded-xl hover:bg-[#081d00] transition-colors flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                  <span>Synthesizing Protocol...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                  <span>Generate Composure Protocol</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7">
          {protocol ? (
            <div className="bg-white border border-[#173404]/10 rounded-2xl p-6 shadow-sm space-y-6 animate-fadeIn">
              <div className="flex justify-between items-start border-b border-[#173404]/10 pb-4">
                <div>
                  <span className="font-mono-caps text-xs text-[#3e6a00] font-bold">SYNTHESIZED PROTOCOL</span>
                  <h3 className="font-display text-2xl font-bold text-[#081d00] mt-1">
                    {protocol.protocolTitle}
                  </h3>
                  <p className="font-body text-xs text-[#74796d] mt-1">
                    {protocol.cortisolTarget}
                  </p>
                </div>
                <button
                  onClick={() => setProtocol(null)}
                  className="text-xs font-mono-caps text-[#74796d] hover:text-[#081d00]"
                >
                  Clear
                </button>
              </div>

              {/* Breathwork Trigger Card */}
              {protocol.breathworkPattern && (
                <div className="bg-[#f6f3f2] border border-[#173404]/10 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <span className="font-mono-caps text-[10px] text-[#3e6a00] uppercase font-bold">RECOMMENDED BREATHWORK</span>
                    <h4 className="font-display text-base font-bold text-[#081d00]">
                      {protocol.breathworkPattern.name}
                    </h4>
                    <p className="font-mono-caps text-xs text-[#43483e]">
                      Inhale {protocol.breathworkPattern.inhale}s • Hold {protocol.breathworkPattern.hold1}s • Exhale {protocol.breathworkPattern.exhale}s
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onStartBreathwork(protocol.breathworkPattern);
                      onNavigate('breathing');
                    }}
                    className="bg-[#173404] text-white font-mono-caps text-xs px-4 py-2.5 rounded-full hover:bg-[#081d00] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">play_arrow</span>
                    <span>Launch Pacer</span>
                  </button>
                </div>
              )}

              {/* 3 Pillars */}
              <div className="space-y-4">
                <span className="font-mono-caps text-xs font-bold text-[#081d00] block">TACTICAL STEPS</span>
                {protocol.pillars.map((pillar, idx) => (
                  <div key={idx} className="flex gap-4 p-3 bg-[#fcf9f8] rounded-xl border border-[#173404]/05 items-start">
                    <span className="font-mono-caps text-xs font-bold bg-[#173404] text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      0{pillar.step}
                    </span>
                    <div>
                      <h4 className="font-display text-sm font-bold text-[#081d00]">{pillar.title}</h4>
                      <p className="font-body text-xs text-[#43483e] leading-relaxed mt-0.5">{pillar.action}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="p-4 bg-[#b7f473]/15 rounded-xl border border-[#3e6a00]/20 text-center">
                <p className="font-display text-sm italic text-[#081d00]">
                  "{protocol.quote}"
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-[#f6f3f2] border border-dashed border-[#173404]/20 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[360px]">
              <span className="material-symbols-outlined text-5xl text-[#3e6a00] mb-3">
                psychology
              </span>
              <h3 className="font-display text-lg font-bold text-[#081d00] mb-1">
                Awaiting Inputs
              </h3>
              <p className="font-body text-xs text-[#43483e] max-w-sm">
                Set your stress level and primary stressor on the left, then click Generate to receive your tailored Botanical Technicality protocol.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
