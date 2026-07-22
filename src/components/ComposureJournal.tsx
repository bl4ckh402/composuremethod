import React, { useState, useEffect } from 'react';
import { INITIAL_JOURNAL_LOGS } from '../data/initialData';
import { JournalEntry } from '../types';

export const ComposureJournal: React.FC = () => {
  const [logs, setLogs] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('composure_journal_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_JOURNAL_LOGS;
      }
    }
    return INITIAL_JOURNAL_LOGS;
  });

  const [score, setScore] = useState<number>(85);
  const [cortisol, setCortisol] = useState<'Low' | 'Moderate' | 'Elevated' | 'High'>('Low');
  const [focusMinutes, setFocusMinutes] = useState<number>(90);
  const [selectedPillar, setSelectedPillar] = useState<string>('Pillar 01: Cognitive Reset');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('composure_journal_logs', JSON.stringify(logs));
  }, [logs]);

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: JournalEntry = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      composureScore: score,
      cortisolIndex: cortisol,
      focusMinutes,
      selectedPillar,
      notes: notes.trim() || 'Baseline composure session logged.'
    };

    setLogs([newEntry, ...logs]);
    setNotes('');
  };

  const deleteLog = (id: string) => {
    setLogs(prev => prev.filter(item => item.id !== id));
  };

  const averageScore = Math.round(
    logs.reduce((acc, curr) => acc + curr.composureScore, 0) / (logs.length || 1)
  );

  const totalFocus = logs.reduce((acc, curr) => acc + curr.focusMinutes, 0);

  return (
    <section className="py-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="font-mono-caps text-[#3e6a00] mb-2 tracking-widest block">COMPOSURE LOG & ANALYTICS</span>
        <h2 className="font-display text-3xl font-bold text-[#081d00] mb-2">
          Baseline Clarity Journal
        </h2>
        <p className="font-body text-base text-[#43483e] max-w-xl mx-auto">
          Track your daily composure score, physiological stress indicators, and deep focus window metrics.
        </p>
      </div>

      {/* Analytics Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-[#173404]/10 rounded-2xl p-5 shadow-sm">
          <span className="font-mono-caps text-[10px] text-[#74796d] block mb-1">AVG COMPOSURE SCORE</span>
          <div className="font-display text-3xl font-bold text-[#081d00]">
            {averageScore} / 100
          </div>
          <span className="font-mono-caps text-xs text-[#3e6a00] font-semibold mt-1 inline-block">
            +12% vs last week
          </span>
        </div>

        <div className="bg-white border border-[#173404]/10 rounded-2xl p-5 shadow-sm">
          <span className="font-mono-caps text-[10px] text-[#74796d] block mb-1">CORTISOL CONTROL</span>
          <div className="font-display text-3xl font-bold text-[#173404]">
            OPTIMAL
          </div>
          <span className="font-mono-caps text-xs text-[#74796d] mt-1 inline-block">
            85% Low-Cortisol days
          </span>
        </div>

        <div className="bg-white border border-[#173404]/10 rounded-2xl p-5 shadow-sm">
          <span className="font-mono-caps text-[10px] text-[#74796d] block mb-1">TOTAL DEEP FOCUS</span>
          <div className="font-display text-3xl font-bold text-[#081d00]">
            {totalFocus} MIN
          </div>
          <span className="font-mono-caps text-xs text-[#3e6a00] font-semibold mt-1 inline-block">
            Logged across {logs.length} sessions
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* New Log Form */}
        <div className="lg:col-span-5 bg-white border border-[#173404]/10 rounded-2xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-bold text-[#081d00] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3e6a00]">edit_note</span>
            <span>Record Daily Baseline</span>
          </h3>

          <form onSubmit={handleAddLog} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-mono-caps text-xs text-[#081d00] font-bold">
                  COMPOSURE SCORE ({score}/100)
                </label>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                className="w-full accent-[#173404] cursor-pointer"
              />
            </div>

            <div>
              <label className="font-mono-caps text-xs text-[#081d00] font-bold block mb-1">
                ESTIMATED CORTISOL INDEX
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Low', 'Moderate', 'Elevated', 'High'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setCortisol(level)}
                    className={`py-2 px-3 text-xs font-mono-caps rounded-lg border transition-all ${
                      cortisol === level
                        ? 'bg-[#173404] text-white border-[#173404]'
                        : 'bg-[#fcf9f8] text-[#43483e] border-[#173404]/15 hover:border-[#173404]/30'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-mono-caps text-xs text-[#081d00] font-bold block mb-1">
                DEEP FOCUS WINDOW (MINUTES)
              </label>
              <input
                type="number"
                min="0"
                max="600"
                value={focusMinutes}
                onChange={(e) => setFocusMinutes(Number(e.target.value))}
                className="w-full bg-[#fcf9f8] border border-[#173404]/15 rounded-lg px-3 py-2 text-sm text-[#1c1b1b] focus:outline-none focus:border-[#173404]"
              />
            </div>

            <div>
              <label className="font-mono-caps text-xs text-[#081d00] font-bold block mb-1">
                PRIMARY PILLAR APPLIED
              </label>
              <select
                value={selectedPillar}
                onChange={(e) => setSelectedPillar(e.target.value)}
                className="w-full bg-[#fcf9f8] border border-[#173404]/15 rounded-lg px-3 py-2 text-sm text-[#1c1b1b] focus:outline-none focus:border-[#173404]"
              >
                <option value="Pillar 01: Cognitive Reset">Pillar 01: Cognitive Reset</option>
                <option value="Pillar 02: Somatic Alignment">Pillar 02: Somatic Alignment</option>
                <option value="Pillar 03: Environmental Discipline">Pillar 03: Environmental Discipline</option>
              </select>
            </div>

            <div>
              <label className="font-mono-caps text-xs text-[#081d00] font-bold block mb-1">
                NOTES & OBSERVATIONS
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Observed mental friction, key wins, protocol outcome..."
                className="w-full bg-[#fcf9f8] border border-[#173404]/15 rounded-lg p-3 text-sm text-[#1c1b1b] focus:outline-none focus:border-[#173404]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#173404] text-white font-mono-caps py-3 px-4 rounded-xl hover:bg-[#081d00] transition-colors flex justify-center items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Log Composure Baseline</span>
            </button>
          </form>
        </div>

        {/* History Timeline */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-display text-lg font-bold text-[#081d00]">
              Historical Logs ({logs.length})
            </h3>
            {logs.length > 0 && (
              <button
                onClick={() => setLogs([])}
                className="font-mono-caps text-xs text-[#74796d] hover:text-[#ba1a1a]"
              >
                Clear History
              </button>
            )}
          </div>

          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-white border border-[#173404]/10 rounded-2xl p-5 shadow-sm flex flex-col justify-between relative group hover:border-[#173404]/30 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-mono-caps text-[10px] text-[#3e6a00] font-bold block">
                    {log.selectedPillar}
                  </span>
                  <div className="font-mono-caps text-xs text-[#74796d]">
                    {new Date(log.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-mono-caps text-[10px] text-[#74796d] block">SCORE</span>
                    <span className="font-display text-lg font-bold text-[#081d00]">
                      {log.composureScore}/100
                    </span>
                  </div>
                  <button
                    onClick={() => deleteLog(log.id)}
                    className="text-[#74796d] hover:text-[#ba1a1a] opacity-0 group-hover:opacity-100 transition-opacity p-1"
                    title="Delete log"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>

              <p className="font-body text-sm text-[#43483e] my-2 leading-relaxed bg-[#fcf9f8] p-3 rounded-xl border border-[#173404]/05">
                "{log.notes}"
              </p>

              <div className="flex items-center gap-4 text-xs font-mono-caps text-[#74796d] pt-2 border-t border-[#173404]/05">
                <span>Cortisol: <strong className="text-[#081d00]">{log.cortisolIndex}</strong></span>
                <span>•</span>
                <span>Focus Window: <strong className="text-[#081d00]">{log.focusMinutes} min</strong></span>
              </div>
            </div>
          ))}

          {logs.length === 0 && (
            <div className="bg-[#f6f3f2] border border-dashed border-[#173404]/20 rounded-2xl p-12 text-center text-[#74796d] font-mono-caps text-xs">
              No journal logs recorded yet. Use the form on the left to record your daily baseline.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
