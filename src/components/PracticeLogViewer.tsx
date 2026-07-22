import React, { useState } from 'react';
import { PracticeLogEntry } from '../types';
import { INITIAL_PRACTICE_LOGS } from '../data/guideData';

export const PracticeLogViewer: React.FC = () => {
  const [logs, setLogs] = useState<PracticeLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem('composure_practice_logs');
      return saved ? JSON.parse(saved) : INITIAL_PRACTICE_LOGS;
    } catch {
      return INITIAL_PRACTICE_LOGS;
    }
  });

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [pelvicReps, setPelvicReps] = useState(15);
  const [breathingDone, setBreathingDone] = useState(true);
  const [controlRating, setControlRating] = useState(7);
  const [notes, setNotes] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const saveLogs = (updated: PracticeLogEntry[]) => {
    setLogs(updated);
    try {
      localStorage.setItem('composure_practice_logs', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: PracticeLogEntry = {
      id: `log-${Date.now()}`,
      date,
      pelvicReps,
      breathingDone,
      controlRating,
      notes
    };
    const updated = [newEntry, ...logs];
    saveLogs(updated);
    setNotes('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    const updated = logs.filter(l => l.id !== id);
    saveLogs(updated);
  };

  const averageRating = logs.length > 0 
    ? (logs.reduce((acc, curr) => acc + curr.controlRating, 0) / logs.length).toFixed(1) 
    : '0';

  return (
    <div className="my-6 p-6 md:p-8 bg-white rounded-2xl border border-[#173404]/10 shadow-sm space-y-6">
      <div className="border-b border-[#173404]/10 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-xs font-mono-caps text-[#3e6a00] bg-[#b7f473]/30 px-3 py-1 rounded-full">
            BONUS ASSET C · PRACTICE LOG
          </span>
          <h4 className="font-display text-xl font-bold text-[#081d00] mt-2">
            Interactive Practice & Trend Tracker
          </h4>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#173404] text-white font-mono-caps px-5 py-2.5 rounded-full hover:bg-[#081d00] transition-colors cursor-pointer text-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm">{isAdding ? 'close' : 'add'}</span>
          <span>{isAdding ? 'Cancel' : 'Log Today\'s Practice'}</span>
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#fcf9f8] border border-[#173404]/10 text-center">
          <span className="font-mono-caps text-[11px] text-[#74796d] block">30-DAY AVG CONTROL</span>
          <span className="font-display text-2xl font-bold text-[#081d00]">{averageRating} / 10</span>
        </div>
        <div className="p-4 rounded-xl bg-[#fcf9f8] border border-[#173404]/10 text-center">
          <span className="font-mono-caps text-[11px] text-[#74796d] block">TOTAL SESSIONS LOGGED</span>
          <span className="font-display text-2xl font-bold text-[#173404]">{logs.length}</span>
        </div>
        <div className="p-4 rounded-xl bg-[#fcf9f8] border border-[#173404]/10 text-center">
          <span className="font-mono-caps text-[11px] text-[#74796d] block">PELVIC REPS CUMULATIVE</span>
          <span className="font-display text-2xl font-bold text-[#3e6a00]">
            {logs.reduce((acc, curr) => acc + (curr.pelvicReps || 0), 0)}
          </span>
        </div>
      </div>

      {/* Add Form */}
      {isAdding && (
        <form onSubmit={handleAddEntry} className="p-5 rounded-xl bg-[#f4fce8] border border-[#3e6a00]/30 space-y-4">
          <h5 className="font-display font-bold text-sm text-[#081d00]">Record Daily Session</h5>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-mono-caps text-xs text-[#43483e] mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs font-mono"
                required
              />
            </div>
            <div>
              <label className="block font-mono-caps text-xs text-[#43483e] mb-1">Pelvic Floor Reps</label>
              <input
                type="number"
                value={pelvicReps}
                onChange={(e) => setPelvicReps(parseInt(e.target.value) || 0)}
                className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs font-mono"
                min={0}
              />
            </div>
            <div>
              <label className="block font-mono-caps text-xs text-[#43483e] mb-1">Self-Rated Control (1–10)</label>
              <input
                type="number"
                value={controlRating}
                onChange={(e) => setControlRating(parseInt(e.target.value) || 1)}
                className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs font-mono"
                min={1}
                max={10}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="breathCheck"
              checked={breathingDone}
              onChange={(e) => setBreathingDone(e.target.checked)}
              className="accent-[#173404] w-4 h-4"
            />
            <label htmlFor="breathCheck" className="font-body text-xs text-[#081d00] cursor-pointer">
              Completed 4-2-7 Parasympathetic Breathing Reset today
            </label>
          </div>

          <div>
            <label className="block font-mono-caps text-xs text-[#43483e] mb-1">Notes / Observations</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Noticed arousal threshold clearly around level 7 solo practice"
              className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs font-body"
            />
          </div>

          <button
            type="submit"
            className="bg-[#173404] text-white font-mono-caps px-6 py-2.5 rounded-full hover:bg-[#081d00] transition-colors cursor-pointer text-xs"
          >
            Save Session to Log
          </button>
        </form>
      )}

      {/* Log History */}
      <div className="space-y-3">
        <h5 className="font-display font-bold text-sm text-[#081d00]">Logged Entries</h5>
        {logs.length === 0 ? (
          <p className="font-body text-xs text-[#74796d]">No practice logs recorded yet.</p>
        ) : (
          <div className="space-y-2">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-xl bg-[#fcf9f8] border border-[#173404]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3 font-mono">
                    <span className="font-bold text-[#081d00]">{log.date}</span>
                    <span className="bg-[#b7f473]/30 text-[#173404] px-2 py-0.5 rounded text-[10px] font-mono-caps">
                      Control Rating: {log.controlRating}/10
                    </span>
                    {log.breathingDone && (
                      <span className="text-emerald-700 font-bold text-[10px]">✓ Breathing Done</span>
                    )}
                  </div>
                  <p className="font-body text-[#43483e]">{log.notes || 'No specific notes recorded.'}</p>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  <span className="font-mono text-[#74796d] text-[11px]">{log.pelvicReps} pelvic reps</span>
                  <button
                    onClick={() => handleDelete(log.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Delete entry"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
