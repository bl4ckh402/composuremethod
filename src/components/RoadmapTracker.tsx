import React, { useState } from 'react';

export const RoadmapTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'30' | '60' | '90'>('30');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('composure_roadmap_checks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleCheck = (id: string) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updated);
    try {
      localStorage.setItem('composure_roadmap_checks', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const phases = {
    '30': {
      title: 'Days 1–30: Foundation Phase',
      subtitle: 'Build solo baseline control & neuromuscular habits',
      tasks: [
        { id: 'r-1', title: 'Daily Pelvic Floor Training', desc: '10-15 reps of 3-5s contractions, 2-3 sets daily' },
        { id: 'r-2', title: 'Solo Stop-Start Practice', desc: 'Map arousal 1-10 solo and practice pausing at Level 7 threshold' },
        { id: 'r-3', title: 'Daily Parasympathetic Breathing', desc: '4-2-7 breathwork for 5-10 minutes daily to condition nervous system' },
        { id: 'r-4', title: 'Practice Log Routine', desc: 'Log ratings weekly to monitor 30-day directional trends' }
      ]
    },
    '60': {
      title: 'Days 31–60: Integration Phase',
      subtitle: 'Bring awareness and techniques into partnered intimacy',
      tasks: [
        { id: 'r-5', title: 'Partner Conversation', desc: 'Use matter-of-fact framing script during a low-stakes daytime moment' },
        { id: 'r-6', title: 'Pre-Intimacy Mindset Protocol', desc: 'Execute 2-minute 4-2-7 breathing reset prior to intimacy' },
        { id: 'r-7', title: 'Partnered Arousal Awareness', desc: 'Pace stimulation and drop intensity smoothly near level 7' },
        { id: 'r-8', title: 'Sensate Focus Exploration', desc: 'Engage in structured touch without intercourse pressure' }
      ]
    },
    '90': {
      title: 'Days 61–90: Refinement & Mastery',
      subtitle: 'Automate techniques into sustainable confidence',
      tasks: [
        { id: 'r-9', title: 'Automatic Control Execution', desc: 'Breathing and pelvic awareness become natural background habits' },
        { id: 'r-10', title: 'Non-Intercourse Foreplay Expansion', desc: 'Maintain extended pacing and shared connection' },
        { id: 'r-11', title: 'Weekly Maintenance Schedule', desc: 'Sustain light weekly pelvic floor reps & monthly log check' },
        { id: 'r-12', title: 'Positive Feedback Cycle Active', desc: 'Enjoy reduced performance anxiety and compounding confidence' }
      ]
    }
  };

  const currentPhase = phases[activeTab];

  return (
    <div className="my-6 p-6 md:p-8 bg-white rounded-2xl border border-[#173404]/10 shadow-sm space-y-6">
      <div className="border-b border-[#173404]/10 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-xs font-mono-caps text-[#3e6a00] bg-[#b7f473]/30 px-3 py-1 rounded-full">
            LESSON 5.1 · ROADMAP TRACKER
          </span>
          <h4 className="font-display text-xl font-bold text-[#081d00] mt-2">
            The 30 / 60 / 90-Day Execution Roadmap
          </h4>
        </div>

        {/* Phase Selector Tabs */}
        <div className="flex items-center gap-2 bg-[#f0ebe3] p-1 rounded-full font-mono-caps text-xs">
          {(['30', '60', '90'] as const).map((day) => (
            <button
              key={day}
              onClick={() => setActiveTab(day)}
              className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
                activeTab === day
                  ? 'bg-[#173404] text-white font-bold shadow-sm'
                  : 'text-[#43483e] hover:text-[#081d00]'
              }`}
            >
              Days {day}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h5 className="font-display text-lg font-bold text-[#081d00]">{currentPhase.title}</h5>
          <p className="font-body text-xs text-[#74796d]">{currentPhase.subtitle}</p>
        </div>

        <div className="space-y-3">
          {currentPhase.tasks.map((task) => {
            const isDone = !!checkedItems[task.id];
            return (
              <div
                key={task.id}
                onClick={() => toggleCheck(task.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isDone
                    ? 'bg-[#f4fce8] border-[#3e6a00]/40 text-[#081d00]'
                    : 'bg-[#fcf9f8] border-[#173404]/10 hover:border-[#173404]/30'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                    isDone ? 'bg-[#173404] border-[#173404] text-white' : 'bg-white border-gray-300'
                  }`}
                >
                  {isDone && <span className="material-symbols-outlined text-sm">check</span>}
                </div>
                <div>
                  <h6 className={`font-display font-bold text-sm ${isDone ? 'line-through text-[#3e6a00]' : 'text-[#081d00]'}`}>
                    {task.title}
                  </h6>
                  <p className="font-body text-xs text-[#43483e] mt-0.5">{task.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
