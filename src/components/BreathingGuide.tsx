import React, { useState, useEffect, useRef } from 'react';
import { PRESET_BREATHING_PATTERNS } from '../data/initialData';
import { BreathworkPattern, ViewMode } from '../types';

interface BreathingGuideProps {
  customPattern?: BreathworkPattern | null;
  onLogSession: (minutes: number, patternName: string) => void;
  onNavigate: (view: ViewMode) => void;
}

export const BreathingGuide: React.FC<BreathingGuideProps> = ({
  customPattern,
  onLogSession,
  onNavigate
}) => {
  const [selectedPreset, setSelectedPreset] = useState<BreathworkPattern>(
    customPattern || PRESET_BREATHING_PATTERNS[0]
  );

  const [isActive, setIsActive] = useState<boolean>(false);
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [timeLeft, setTimeLeft] = useState<number>(selectedPreset.inhale);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState<number>(0);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  // Audio tone synthesizer using Web Audio API for soft subtle cues
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playTone = (freq = 440, duration = 0.15) => {
    if (!audioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio fallback
    }
  };

  // Reset timer when preset changes
  useEffect(() => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(selectedPreset.inhale);
    setCompletedCycles(0);
    setTotalSecondsElapsed(0);
  }, [selectedPreset]);

  // Main breathing timer loop
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isActive) {
      timer = setInterval(() => {
        setTotalSecondsElapsed(prev => prev + 1);

        setTimeLeft((prev) => {
          if (prev > 1) {
            return prev - 1;
          }

          // Advance phase
          if (phase === 'inhale') {
            if (selectedPreset.hold1 > 0) {
              setPhase('hold1');
              playTone(330);
              return selectedPreset.hold1;
            } else {
              setPhase('exhale');
              playTone(260);
              return selectedPreset.exhale;
            }
          } else if (phase === 'hold1') {
            setPhase('exhale');
            playTone(260);
            return selectedPreset.exhale;
          } else if (phase === 'exhale') {
            if (selectedPreset.hold2 > 0) {
              setPhase('hold2');
              playTone(330);
              return selectedPreset.hold2;
            } else {
              // Cycle finished
              setCompletedCycles(c => c + 1);
              setPhase('inhale');
              playTone(520);
              return selectedPreset.inhale;
            }
          } else { // hold2
            setCompletedCycles(c => c + 1);
            setPhase('inhale');
            playTone(520);
            return selectedPreset.inhale;
          }
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, phase, selectedPreset]);

  const toggleTimer = () => {
    if (!isActive) {
      playTone(520);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(selectedPreset.inhale);
    setCompletedCycles(0);
    setTotalSecondsElapsed(0);
  };

  const handleFinishAndLog = () => {
    const minutes = Math.max(1, Math.round(totalSecondsElapsed / 60));
    onLogSession(minutes, selectedPreset.name);
    onNavigate('journal');
  };

  // Compute ring scaling for visual feedback
  const getScaleClass = () => {
    if (phase === 'inhale') return 'scale-125 bg-[#b7f473]/30 border-[#3e6a00]';
    if (phase === 'hold1' || phase === 'hold2') return 'scale-110 bg-[#173404]/10 border-[#173404]';
    if (phase === 'exhale') return 'scale-90 bg-[#f0edec] border-[#74796d]';
    return 'scale-100';
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Inhale Deeply';
      case 'hold1': return 'Hold Breath';
      case 'exhale': return 'Exhale Slowly';
      case 'hold2': return 'Rest / Hold';
    }
  };

  return (
    <section className="py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="font-mono-caps text-[#3e6a00] mb-2 tracking-widest block">PILLAR 01: COGNITIVE RESET</span>
        <h2 className="font-display text-3xl font-bold text-[#081d00] mb-2">
          Cortisol Reduction Breathwork
        </h2>
        <p className="font-body text-base text-[#43483e] max-w-xl mx-auto">
          Synchronize your respiratory rate to stimulate the vagus nerve and immediately reduce serum cortisol levels.
        </p>
      </div>

      {/* Preset Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {PRESET_BREATHING_PATTERNS.map((preset) => {
          const selected = selectedPreset.name === preset.name;
          return (
            <button
              key={preset.id}
              onClick={() => setSelectedPreset(preset)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selected
                  ? 'bg-white border-[#173404] ring-1 ring-[#173404] shadow-sm'
                  : 'bg-[#fcf9f8] border-[#173404]/10 hover:border-[#173404]/30'
              }`}
            >
              <span className="font-mono-caps text-[10px] text-[#3e6a00] font-bold block mb-1">
                {preset.subtitle}
              </span>
              <h4 className="font-display text-sm font-bold text-[#081d00] mb-1">
                {preset.name}
              </h4>
              <p className="font-body text-xs text-[#74796d] leading-relaxed">
                {preset.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Breathing Canvas */}
      <div className="bg-white border border-[#173404]/10 rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden min-h-[420px]">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#b7f473]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Audio Toggle */}
        <button
          onClick={() => setAudioEnabled(!audioEnabled)}
          className="absolute top-4 right-4 flex items-center gap-1.5 font-mono-caps text-xs text-[#74796d] bg-[#fcf9f8] border border-[#173404]/10 px-3 py-1.5 rounded-full hover:text-[#081d00]"
        >
          <span className="material-symbols-outlined text-base">
            {audioEnabled ? 'volume_up' : 'volume_off'}
          </span>
          <span>{audioEnabled ? 'Audio On' : 'Muted'}</span>
        </button>

        {/* Breathing Animation Circle */}
        <div className="relative my-8 flex items-center justify-center">
          {/* Outer Pulsing Aura Ring */}
          <div
            className={`w-64 h-64 md:w-72 md:h-72 rounded-full border-2 border-dashed border-[#173404]/20 transition-all duration-1000 ease-in-out flex items-center justify-center ${getScaleClass()}`}
          >
            {/* Core Solid Ring */}
            <div className="w-48 h-48 md:w-52 md:h-52 bg-[#173404] text-white rounded-full flex flex-col items-center justify-center shadow-lg transition-transform duration-700">
              <span className="font-display text-5xl font-bold tracking-tight">
                {timeLeft}s
              </span>
              <span className="font-mono-caps text-xs text-[#b7f473] mt-1 tracking-widest">
                {getPhaseText()}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2 z-10">
          <button
            onClick={toggleTimer}
            className="bg-[#173404] text-white font-mono-caps text-sm px-8 py-3.5 rounded-full hover:bg-[#081d00] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">
              {isActive ? 'pause' : 'play_arrow'}
            </span>
            <span>{isActive ? 'Pause Protocol' : 'Start Protocol'}</span>
          </button>

          <button
            onClick={resetTimer}
            className="bg-[#fcf9f8] text-[#173404] border border-[#173404]/20 font-mono-caps text-sm px-6 py-3.5 rounded-full hover:bg-[#ebe7e7] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">restart_alt</span>
            <span>Reset</span>
          </button>

          {totalSecondsElapsed > 10 && (
            <button
              onClick={handleFinishAndLog}
              className="bg-[#3e6a00] text-white font-mono-caps text-sm px-6 py-3.5 rounded-full hover:bg-[#081d00] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span>Log Session ({Math.round(totalSecondsElapsed / 60)} min)</span>
            </button>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-[#173404]/10 w-full max-w-md text-center">
          <div>
            <span className="font-mono-caps text-[10px] text-[#74796d]">CYCLES DONE</span>
            <div className="font-display text-xl font-bold text-[#081d00]">
              {completedCycles} / {selectedPreset.cycles}
            </div>
          </div>
          <div>
            <span className="font-mono-caps text-[10px] text-[#74796d]">ELAPSED TIME</span>
            <div className="font-display text-xl font-bold text-[#081d00]">
              {Math.floor(totalSecondsElapsed / 60)}m {totalSecondsElapsed % 60}s
            </div>
          </div>
          <div>
            <span className="font-mono-caps text-[10px] text-[#74796d]">CORTISOL IMPACT</span>
            <div className="font-display text-xl font-bold text-[#3e6a00]">
              -{Math.min(35, completedCycles * 6)}%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
