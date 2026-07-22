import React, { useState } from 'react';

export const ArousalScaleInteractive: React.FC = () => {
  const [level, setLevel] = useState<number>(6);

  const getLevelInfo = (lvl: number) => {
    if (lvl <= 3) {
      return {
        zone: 'Low Arousal Zone (1 - 3)',
        color: 'text-blue-700 bg-blue-50 border-blue-200',
        status: 'Warm-up / Baseline',
        guidance: 'Relaxed state. Focus on nasal breathing and gentle sensory awareness without rush.',
        action: 'Normal rhythm and steady breathing.'
      };
    } else if (lvl <= 6) {
      return {
        zone: 'Optimal Practice Zone (4 - 6)',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        status: 'Building Arousal',
        guidance: 'Arousal is building naturally. Maintain awareness of bodily sensation and pelvic floor relaxation.',
        action: 'Great window for stop-start solo practice. Prepare to notice the shift to 7.'
      };
    } else if (lvl === 7) {
      return {
        zone: 'CRITICAL THRESHOLD (Level 7)',
        color: 'text-amber-800 bg-amber-50 border-amber-300 ring-2 ring-amber-400',
        status: 'Point of No Return Threshold',
        guidance: 'This is your cue! Stop stimulation completely or drastically lower intensity. Execute 3 slow 4-2-7 exhales.',
        action: 'PAUSE OR EDGE HERE: Pause for 15-30 seconds until arousal drops back to 4-5.'
      };
    } else {
      return {
        zone: 'High Arousal Zone (8 - 10)',
        color: 'text-red-800 bg-red-50 border-red-200',
        status: 'Ejaculatory Inevitability',
        guidance: 'Past level 7, neurological signals commit to completion. In practice, the goal is catching arousal BEFORE reaching level 8.',
        action: 'In solo practice, if reached, reset calmly without self-criticism.'
      };
    }
  };

  const info = getLevelInfo(level);

  return (
    <div className="my-6 p-6 md:p-8 bg-white rounded-2xl border border-[#173404]/10 shadow-sm space-y-6">
      <div className="border-b border-[#173404]/10 pb-4">
        <span className="text-xs font-mono-caps text-[#3e6a00] bg-[#b7f473]/30 px-3 py-1 rounded-full">
          INTERACTIVE TOOL · LESSON 2.2
        </span>
        <h4 className="font-display text-xl font-bold text-[#081d00] mt-2">
          The 1–10 Arousal Scale & Stop-Start Trainer
        </h4>
        <p className="font-body text-xs text-[#43483e] mt-1">
          Drag the slider to explore how to navigate arousal zones and recognize Level 7 (Point of No Return).
        </p>
      </div>

      {/* Slider */}
      <div className="space-y-4">
        <div className="flex justify-between items-center font-mono text-xs text-[#74796d]">
          <span>1 (Baseline)</span>
          <span className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">
            ⚡ 7 = POINT OF NO RETURN
          </span>
          <span>10 (Climax)</span>
        </div>

        <input
          type="range"
          min={1}
          max={10}
          value={level}
          onChange={(e) => setLevel(parseInt(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#173404]"
        />

        {/* Level Markers */}
        <div className="grid grid-cols-10 gap-1 text-center font-mono text-xs">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              onClick={() => setLevel(num)}
              className={`py-2 rounded-lg font-bold transition-all cursor-pointer ${
                level === num
                  ? num === 7
                    ? 'bg-amber-600 text-white shadow'
                    : num > 7
                    ? 'bg-red-600 text-white'
                    : 'bg-[#173404] text-white'
                  : 'bg-[#f0ebe3] text-[#43483e] hover:bg-[#e4ddcf]'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Active Zone Display */}
      <div className={`p-5 rounded-xl border ${info.color} space-y-3`}>
        <div className="flex items-center justify-between">
          <span className="font-mono-caps text-xs tracking-wider uppercase font-bold">
            {info.zone}
          </span>
          <span className="font-display font-bold text-2xl">{level} / 10</span>
        </div>
        <div>
          <h5 className="font-display font-bold text-base mb-1">{info.status}</h5>
          <p className="font-body text-xs leading-relaxed mb-2">{info.guidance}</p>
          <div className="bg-white/80 p-3 rounded-lg text-xs font-mono text-[#081d00] border border-current/20">
            <strong>Recommended Protocol:</strong> {info.action}
          </div>
        </div>
      </div>
    </div>
  );
};
