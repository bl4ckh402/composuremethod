import React, { useState, useEffect } from 'react';
import { ViewMode } from '../types';
import { useCountUp } from '../hooks/useCountUp';

interface MemberDashboardProps {
  email: string;
  onNavigate: (view: ViewMode) => void;
}

interface DailyLog {
  id: string;
  date: string; // YYYY-MM-DD
  types: string[];
  duration: number;
  controlRating: number;
  notes: string;
}

const TRAINING_TYPES = [
  { id: 'pelvic', label: 'Pelvic Floor Reps', icon: 'fitness_center' },
  { id: 'breathing', label: 'Parasympathetic Breathing', icon: 'air' },
  { id: 'arousal', label: 'Stop-Start / Arousal Practice', icon: 'speed' },
  { id: 'partner', label: 'Partner Communication / Practice', icon: 'diversity_1' },
  { id: 'journal', label: 'Journal / Reflection', icon: 'edit_note' },
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
      // Allow today to be incomplete if it's still early
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

export const MemberDashboard: React.FC<MemberDashboardProps> = ({ email, onNavigate }) => {
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

  const streak = calculateStreak(logs);
  const weeklyCompletion = getWeeklyCompletion(logs);
  const totalSessions = logs.length;
  const avgControl = logs.length > 0 ? Math.round(logs.reduce((a, b) => a + b.controlRating, 0) / logs.length) : 0;

  const streakRef = useCountUp(streak);
  const sessionsRef = useCountUp(totalSessions);
  const weeklyRef = useCountUp(weeklyCompletion, undefined, { suffix: '%' });
  const avgRef = useCountUp(avgControl, undefined, { suffix: '/10' });

  useEffect(() => {
    localStorage.setItem('composure_training_logs', JSON.stringify(logs));
  }, [logs]);

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

  const recentLogs = logs.slice(0, 7);

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-12 py-8 md:py-12 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="badge-lime inline-flex items-center gap-1.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3e6a00] animate-pulse" />
            MEMBER ACCESS ACTIVE
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[#081d00] tracking-tight mb-1">
            Daily Training Log
          </h1>
          <p className="font-body text-sm text-[#43483e]">
            Logged in as <span className="font-mono text-[#173404]">{email}</span> • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onNavigate('home')} className="btn-ghost text-xs py-2 px-4">
            <span className="material-symbols-outlined text-sm">home</span>
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Current Streak', value: streak, suffix: ' days', ref: streakRef },
          { label: 'Total Sessions', value: totalSessions, suffix: '', ref: sessionsRef },
          { label: 'Weekly Completion', value: weeklyCompletion, suffix: '%', ref: weeklyRef },
          { label: 'Avg Control Rating', value: avgControl, suffix: '/10', ref: avgRef },
        ].map((stat) => (
          <div key={stat.label} className="premium-card p-5">
            <span className="font-mono-caps text-[10px] text-[#74796d] block mb-1">{stat.label.toUpperCase()}</span>
            <div className="flex items-baseline gap-1">
              <span ref={stat.ref} className="font-display text-2xl md:text-3xl font-bold text-[#081d00] tabular-nums">
                {stat.value}
              </span>
              {stat.suffix && <span className="font-mono text-xs text-[#74796d]">{stat.suffix}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Logger */}
        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit} className="premium-card p-6 space-y-5">
            <h2 className="font-display text-lg font-bold text-[#081d00]">Log Today's Training</h2>

            <div>
              <label className="font-mono-caps text-[11px] text-[#43483e] block mb-2 font-bold">
                WHAT DID YOU TRAIN TODAY?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {TRAINING_TYPES.map(type => {
                  const selected = selectedTypes.includes(type.id);
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => toggleType(type.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selected
                          ? 'bg-[#173404] text-white border-[#173404]'
                          : 'bg-white border-[#173404]/10 hover:border-[#173404]/30 text-[#43483e]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">{type.icon}</span>
                      <span className="font-body text-sm font-medium">{type.label}</span>
                      {selected && <span className="material-symbols-outlined text-sm ml-auto">check_circle</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="font-mono-caps text-[11px] text-[#43483e] block mb-2 font-bold">
                DURATION: <span className="text-[#173404]">{duration} min</span>
              </label>
              <input
                type="range"
                min="1"
                max="60"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-[#173404] cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#74796d] mt-1">
                <span>1 min</span>
                <span>60 min</span>
              </div>
            </div>

            <div>
              <label className="font-mono-caps text-[11px] text-[#43483e] block mb-2 font-bold">
                CONTROL RATING: <span className="text-[#173404]">{controlRating}/10</span>
              </label>
              <div className="flex gap-2">
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setControlRating(num)}
                    className={`flex-1 py-2 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer border ${
                      controlRating === num
                        ? num >= 7
                          ? 'bg-[#c2410c] text-white border-[#c2410c]'
                          : 'bg-[#173404] text-white border-[#173404]'
                        : 'bg-white border-[#173404]/10 text-[#43483e] hover:border-[#173404]/30'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono-caps text-[11px] text-[#43483e] block mb-2 font-bold">
                NOTES (OPTIONAL)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Observed triggers, protocol outcome, key wins..."
                className="w-full bg-white border border-[#173404]/15 rounded-xl px-4 py-3 text-sm text-[#1c1b1b] focus:outline-none focus:border-[#173404] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={selectedTypes.length === 0}
              className="w-full bg-[#173404] text-white font-mono-caps py-3.5 px-4 rounded-xl hover:bg-[#081d00] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              <span>Save Training Log</span>
            </button>

            {submitted && (
              <div className="text-center font-mono text-xs text-[#3e6a00] font-bold animate-fadeIn">
                ✓ Log saved successfully
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Quick Tools + Recent Logs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick Tools */}
          <div className="premium-card p-6">
            <h2 className="font-display text-lg font-bold text-[#081d00] mb-4">Quick Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'breathing' as ViewMode, label: 'Breathing Pacer', icon: 'air' },
                { id: 'pelvic' as ViewMode, label: 'Pelvic Trainer', icon: 'fitness_center' },
                { id: 'arousal' as ViewMode, label: 'Arousal Scale', icon: 'speed' },
                { id: 'clarity-ai' as ViewMode, label: 'Clarity Protocol', icon: 'psychology' },
              ].map(tool => (
                <button
                  key={tool.id}
                  onClick={() => onNavigate(tool.id)}
                  className="p-4 rounded-xl border border-[#173404]/10 bg-white hover:border-[#173404]/30 hover:shadow-sm transition-all text-center group cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[#3e6a00] text-2xl mb-2 block">{tool.icon}</span>
                  <span className="font-mono text-[11px] text-[#081d00] font-medium block">{tool.label}</span>
                  <span className="material-symbols-outlined text-[#173404] text-sm mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Logs */}
          <div className="premium-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-bold text-[#081d00]">Recent Sessions</h2>
              {logs.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Clear all training history? This cannot be undone.')) {
                      setLogs([]);
                    }
                  }}
                  className="font-mono text-[11px] text-[#74796d] hover:text-[#ba1a1a] transition-colors"
                >
                  Clear History
                </button>
              )}
            </div>

            {recentLogs.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-[#173404]/10 rounded-xl">
                <span className="material-symbols-outlined text-4xl text-[#74796d] mb-2 block">edit_note</span>
                <p className="font-body text-sm text-[#74796d]">No training logs yet. Log your first session above.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentLogs.map(log => (
                  <div
                    key={log.id}
                    className="p-4 rounded-xl border border-[#173404]/8 bg-white hover:border-[#173404]/15 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#173404] bg-[#f0ebe3] px-2 py-1 rounded">
                          {new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        <span className="font-mono text-[11px] text-[#74796d]">
                          {log.duration} min
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-[#74796d]">Control:</span>
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
