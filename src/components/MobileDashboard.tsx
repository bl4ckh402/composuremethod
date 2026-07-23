import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ViewMode } from '../types';
import { useCountUp } from '../hooks/useCountUp';

interface MobileDashboardProps {
  email: string;
  onNavigate: (view: ViewMode) => void;
}

interface DailyLog {
  id: string;
  date: string;
  types: string[];
  duration: number;
  controlRating: number;
  notes: string;
}

const TRAINING_TYPES = [
  { id: 'pelvic', label: 'Pelvic Floor', icon: 'fitness_center', color: 'from-[#173404] to-[#0d2202]' },
  { id: 'breathing', label: 'Breathing', icon: 'air', color: 'from-[#3e6a00] to-[#2c4f00]' },
  { id: 'arousal', label: 'Stop-Start', icon: 'speed', color: 'from-[#c2410c] to-[#9a3412]' },
  { id: 'partner', label: 'Partner', icon: 'diversity_1', color: 'from-[#6b7280] to-[#4b5563]' },
  { id: 'journal', label: 'Journal', icon: 'edit_note', color: 'from-[#4b5563] to-[#374151]' },
] as const;

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function calculateStreak(logs: DailyLog[]): number {
  if (!logs.length) return 0;
  const sorted = [...logs].sort((a, b) => b.date.localeCompare(a.date));
  const today = new Date(getToday());
  let streak = 0;
  let checkDate = new Date(today);
  for (let i = 0; i < 365; i++) {
    const dateStr = checkDate.toISOString().split('T')[0];
    const hasLog = sorted.some(l => l.date === dateStr);
    if (hasLog) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (i === 0) {
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function getWeeklyCompletion(logs: DailyLog[]): number {
  const today = new Date(getToday());
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 6);
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekAgo);
    d.setDate(d.getDate() + i);
    weekDates.push(d.toISOString().split('T')[0]);
  }
  const daysWithLogs = weekDates.filter(d => logs.some(l => l.date === d)).length;
  return Math.round((daysWithLogs / 7) * 100);
}

export const MobileDashboard: React.FC<MobileDashboardProps> = ({ email, onNavigate }) => {
  const [logs, setLogs] = useState<DailyLog[]>(() => {
    try {
      const saved = localStorage.getItem('composure_training_logs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(10);
  const [controlRating, setControlRating] = useState<number>(5);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'log' | 'history' | 'tools'>('log');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const streak = calculateStreak(logs);
  const weeklyCompletion = getWeeklyCompletion(logs);
  const totalSessions = logs.length;
  const avgControl = logs.length > 0 ? Math.round(logs.reduce((a, b) => a + b.controlRating, 0) / logs.length) : 0;

  const streakRef = useCountUp(streak);
  const sessionsRef = useCountUp(totalSessions);
  const weeklyRef = useCountUp(weeklyCompletion, undefined, { suffix: '%' });
  const avgRef = useCountUp(avgControl, undefined, { suffix: '/10' });

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    localStorage.setItem('composure_training_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const toggleType = (id: string) => {
    setSelectedTypes(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTypes.length === 0) return;
    const newLog: DailyLog = {
      id: `log-${Date.now()}`,
      date: getToday(),
      types: selectedTypes,
      duration,
      controlRating,
      notes: notes.trim(),
    };
    setLogs([newLog, ...logs]);
    setSelectedTypes([]);
    setDuration(10);
    setControlRating(5);
    setNotes('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const recentLogs = logs.slice(0, 5);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] pb-24">
      {/* Header */}
      <div className="px-5 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="badge-lime inline-flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3e6a00] animate-pulse" />
              TRAINING MODE
            </span>
            <h1 className="font-display text-2xl font-bold text-[#081d00] tracking-tight">
              Daily Logger
            </h1>
            <p className="font-body text-xs text-[#74796d] mt-0.5">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="w-9 h-9 rounded-full bg-white border border-[#173404]/10 flex items-center justify-center text-[#173404] hover:bg-[#f0ebe3] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">home</span>
          </button>
        </div>

        {/* Streak Flame + Stats */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <defs>
                <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#173404" />
                  <stop offset="50%" stopColor="#3e6a00" />
                  <stop offset="100%" stopColor="#b7f473" />
                </linearGradient>
              </defs>
              <motion.path
                d="M32 4 C28 16, 8 20, 8 32 C8 44, 20 52, 32 56 C44 52, 56 44, 56 32 C56 20, 36 16, 32 4 Z"
                fill="url(#flameGrad)"
                initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.path
                d="M32 16 C30 24, 18 26, 18 34 C18 42, 24 46, 32 48 C40 46, 46 42, 46 34 C46 26, 34 24, 32 16 Z"
                fill="#b7f473"
                initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span ref={streakRef} className="font-display text-sm font-bold text-white relative z-10">
                {streak}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <p className="font-display text-sm font-bold text-[#081d00] mb-1">
              {streak === 1 ? '1 Day Streak' : `${streak} Day Streak`}
            </p>
            <p className="font-body text-xs text-[#74796d]">
              {streak >= 7 ? 'Incredible consistency. Keep it going.' : streak >= 3 ? 'Building momentum. Do not break the chain.' : 'Complete your first session today.'}
            </p>
          </div>
        </div>

        {/* Compact Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Sessions', value: totalSessions, ref: sessionsRef, suffix: '' },
            { label: 'Weekly', value: weeklyCompletion, ref: weeklyRef, suffix: '%' },
            { label: 'Avg Control', value: avgControl, ref: avgRef, suffix: '/10' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-3 border border-[#173404]/8">
              <span className="font-mono text-[9px] text-[#74796d] uppercase tracking-wider block mb-0.5">
                {stat.label}
              </span>
              <div className="flex items-baseline gap-0.5">
                <span ref={stat.ref} className="font-display text-lg font-bold text-[#081d00] tabular-nums">
                  {stat.value}
                </span>
                {stat.suffix && <span className="font-mono text-[10px] text-[#74796d]">{stat.suffix}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#f0ebe3] rounded-full p-1 mb-4">
          {(['log', 'history', 'tools'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-full font-mono-caps text-xs font-medium transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-white text-[#081d00] shadow-sm'
                  : 'text-[#52574c] hover:text-[#173404]'
              }`}
            >
              {tab === 'log' ? 'Log' : tab === 'history' ? 'History' : 'Tools'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'log' && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="px-5"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Training Types */}
            <div className="space-y-2">
              <label className="font-mono-caps text-[11px] text-[#43483e] block font-bold">
                WHAT DID YOU TRAIN?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {TRAINING_TYPES.map(type => {
                  const selected = selectedTypes.includes(type.id);
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => toggleType(type.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        selected
                          ? 'bg-[#173404] text-white border-[#173404] shadow-sm'
                          : 'bg-white border-[#173404]/10 text-[#43483e] hover:border-[#173404]/25'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-lg ${selected ? 'text-[#b7f473]' : 'text-[#74796d]'}`}>
                        {type.icon}
                      </span>
                      <span className="font-body text-sm font-medium flex-1">{type.label}</span>
                      {selected && <span className="material-symbols-outlined text-sm text-[#b7f473]">check_circle</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Timer + Duration */}
            <div className="bg-white rounded-2xl p-4 border border-[#173404]/8">
              <div className="flex items-center justify-between mb-3">
                <label className="font-mono-caps text-[11px] text-[#43483e] font-bold">
                  SESSION TIMER
                </label>
                <span className="font-display text-2xl font-bold text-[#081d00] tabular-nums">
                  {formatTime(timerSeconds)}
                </span>
              </div>
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex-1 py-3 rounded-xl font-mono-caps text-sm font-medium transition-all cursor-pointer ${
                    isTimerRunning
                      ? 'bg-[#c2410c] text-white'
                      : 'bg-[#173404] text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{isTimerRunning ? 'pause' : 'play_arrow'}</span>
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>
                <button
                  type="button"
                  onClick={() => { setIsTimerRunning(false); setTimerSeconds(0); }}
                  className="px-4 py-3 rounded-xl bg-[#f0ebe3] text-[#43483e] font-mono-caps text-sm font-medium hover:bg-[#e4ddcf] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">restart_alt</span>
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-[#52574c]">Duration: {duration} min</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full accent-[#173404]"
                />
              </div>
            </div>

            {/* Control Rating */}
            <div className="bg-white rounded-2xl p-4 border border-[#173404]/8">
              <label className="font-mono-caps text-[11px] text-[#43483e] block mb-3 font-bold">
                CONTROL RATING: {controlRating}/10
              </label>
              <div className="flex gap-1.5">
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setControlRating(num)}
                    className={`flex-1 h-10 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer border ${
                      controlRating === num
                        ? num >= 7
                          ? 'bg-[#c2410c] text-white border-[#c2410c]'
                          : 'bg-[#173404] text-white border-[#173404]'
                        : 'bg-white border-[#173404]/10 text-[#43483e] hover:border-[#173404]/25'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="font-mono-caps text-[11px] text-[#43483e] block mb-2 font-bold">
                NOTES (OPTIONAL)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Observed triggers, protocol outcome, key wins..."
                className="w-full bg-white border border-[#173404]/15 rounded-2xl px-4 py-3 text-sm text-[#1c1b1b] focus:outline-none focus:border-[#173404] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={selectedTypes.length === 0}
              className="w-full bg-[#173404] text-white font-mono-caps py-4 px-4 rounded-2xl hover:bg-[#081d00] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              <span className="font-medium">Save Training Log</span>
            </button>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center font-mono text-xs text-[#3e6a00] font-bold bg-[#f4fce8] py-3 rounded-xl"
              >
                ✓ Log saved successfully
              </motion.div>
            )}
          </form>
        </motion.div>
      )}

      {activeTab === 'history' && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="px-5"
        >
          {recentLogs.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-4xl text-[#ccc] mb-2 block">edit_note</span>
              <p className="font-body text-sm text-[#74796d]">No logs yet. Start training above.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentLogs.map(log => (
                <motion.div
                  key={log.id}
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl p-4 border border-[#173404]/8"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#173404] bg-[#f0ebe3] px-2.5 py-1 rounded-lg">
                      {new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] text-[#74796d]">{log.duration} min</span>
                      <span className={`font-mono text-xs font-bold ${log.controlRating >= 7 ? 'text-[#c2410c]' : 'text-[#173404]'}`}>
                        {log.controlRating}/10
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {log.types.map(typeId => {
                      const type = TRAINING_TYPES.find(t => t.id === typeId);
                      return type ? (
                        <span key={typeId} className="inline-flex items-center gap-1 bg-[#f4fce8] text-[#173404] text-[10px] font-mono-caps font-bold px-2 py-1 rounded-full">
                          <span className="material-symbols-outlined text-xs">{type.icon}</span>
                          {type.label}
                        </span>
                      ) : null;
                    })}
                  </div>
                  {log.notes && (
                    <p className="font-body text-xs text-[#43483e] italic border-t border-[#173404]/5 pt-2">
                      "{log.notes}"
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'tools' && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="px-5"
        >
          <div className="space-y-3">
            {[
              { id: 'breathing' as ViewMode, label: 'Breathing Pacer', desc: 'Guided parasympathetic breathwork', icon: 'air' },
              { id: 'pelvic' as ViewMode, label: 'Pelvic Trainer', desc: 'Timed neuromuscular rep tracker', icon: 'fitness_center' },
              { id: 'arousal' as ViewMode, label: 'Arousal Scale', desc: 'Interactive stop-start trainer', icon: 'speed' },
              { id: 'clarity-ai' as ViewMode, label: 'Clarity Protocol', desc: 'AI-generated reset protocol', icon: 'psychology' },
            ].map(tool => (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                className="w-full bg-white rounded-2xl p-4 border border-[#173404]/8 flex items-center gap-4 text-left hover:border-[#173404]/20 hover:shadow-sm transition-all cursor-pointer active:scale-[0.98]"
              >
                <div className="w-11 h-11 rounded-xl bg-[#173404] text-white flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">{tool.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-sm font-bold text-[#081d00]">{tool.label}</div>
                  <div className="font-body text-xs text-[#74796d]">{tool.desc}</div>
                </div>
                <span className="material-symbols-outlined text-[#173404] text-lg">arrow_forward</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
