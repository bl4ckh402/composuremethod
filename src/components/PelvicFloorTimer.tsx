import React, { useState, useEffect } from 'react';

export const PelvicFloorTimer: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'contract' | 'release'>('contract');
  const [timeLeft, setTimeLeft] = useState(4); // 4 seconds contract/release
  const [repCount, setRepCount] = useState(0);
  const [targetReps] = useState(10);
  const [totalCompletedSets, setTotalCompletedSets] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (phase === 'contract') {
              setPhase('release');
              return 4; // 4 seconds release
            } else {
              setPhase('contract');
              setRepCount((r) => {
                const next = r + 1;
                if (next >= targetReps) {
                  setTotalCompletedSets((s) => s + 1);
                  setIsActive(false);
                  return 0;
                }
                return next;
              });
              return 4; // 4 seconds contract
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, phase, targetReps]);

  const toggleTimer = () => {
    if (!isActive) {
      setPhase('contract');
      setTimeLeft(4);
    }
    setIsActive(!isActive);
  };

  const resetReps = () => {
    setIsActive(false);
    setPhase('contract');
    setTimeLeft(4);
    setRepCount(0);
  };

  return (
    <div className="my-6 p-6 md:p-8 bg-white rounded-2xl border border-[#173404]/10 shadow-sm space-y-6">
      <div className="border-b border-[#173404]/10 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <div>
          <span className="text-xs font-mono-caps text-[#3e6a00] bg-[#b7f473]/30 px-3 py-1 rounded-full">
            GUIDED TRAINER · LESSON 2.1
          </span>
          <h4 className="font-display text-xl font-bold text-[#081d00] mt-2">
            Pelvic Floor Neuromuscular Trainer
          </h4>
        </div>
        <div className="font-mono text-xs text-[#74796d]">
          Completed Sets Today: <span className="font-bold text-[#173404] text-sm">{totalCompletedSets} / 3</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6 py-4">
        {/* Animated Circle Container */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full transition-all duration-1000 ${
              phase === 'contract' && isActive
                ? 'bg-[#173404] scale-90 ring-8 ring-[#b7f473]'
                : phase === 'release' && isActive
                ? 'bg-[#8ba888] scale-105 ring-4 ring-[#173404]/20'
                : 'bg-[#f0ebe3] scale-100'
            }`}
          />
          <div className="relative z-10 text-center text-white space-y-1">
            <span className="font-mono-caps text-xs tracking-wider uppercase block text-white/80">
              {isActive ? (phase === 'contract' ? 'SQUEEZE & HOLD' : 'SLOW RELEASE') : 'READY TO TRAIN'}
            </span>
            <span className={`font-display text-5xl font-bold block ${!isActive && 'text-[#081d00]'}`}>
              {isActive ? `${timeLeft}s` : 'START'}
            </span>
            <span className={`font-mono text-xs block ${!isActive ? 'text-[#74796d]' : 'text-white/90'}`}>
              Rep {repCount + 1} of {targetReps}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md space-y-2">
          <div className="flex justify-between font-mono text-xs text-[#43483e]">
            <span>Set Progress</span>
            <span>{repCount} / {targetReps} Reps</span>
          </div>
          <div className="w-full bg-[#f0ebe3] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#173404] h-full transition-all duration-300"
              style={{ width: `${(repCount / targetReps) * 100}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTimer}
            className="bg-[#173404] text-white font-mono-caps px-8 py-3 rounded-full hover:bg-[#081d00] transition-colors cursor-pointer shadow-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">
              {isActive ? 'pause' : 'play_arrow'}
            </span>
            <span>{isActive ? 'Pause Trainer' : 'Begin 10-Rep Set'}</span>
          </button>

          <button
            onClick={resetReps}
            className="bg-[#f0ebe3] text-[#43483e] font-mono-caps px-5 py-3 rounded-full hover:bg-[#e4ddcf] transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="text-xs text-[#52574c] bg-[#f8f6f0] p-4 rounded-xl border border-[#173404]/5 space-y-1">
        <p className="font-bold text-[#081d00]">Technique Note:</p>
        <p>
          Do not hold your breath during contractions. Maintain smooth, abdominal breathing while gently lifting the pelvic floor upward and inward.
        </p>
      </div>
    </div>
  );
};
