import React from 'react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: "Marcus T.",
      age: "Age 34 • Verified Member",
      role: "Architect, Chicago IL",
      rating: 5,
      headline: "Shifted from constant 90-second panic to complete 15-minute relaxed control.",
      text: "When I turned 33, performance anxiety hit me out of nowhere. I tried numbing sprays from pharmacy shelves and hated losing all physical sensation. The 1-to-10 arousal scale in Module 2 was the exact missing link. Learning to spot Level 7 arousal early and using the 4-2-7 parasympathetic breathing reset allowed me to stay present and relaxed without losing my rhythm.",
      stat: "Outcome: 15+ Min Consistent Control",
      date: "Purchased May 2026"
    },
    {
      name: "Richard K.",
      age: "Age 41 • Verified Member",
      role: "Software Director, Austin TX",
      rating: 5,
      headline: "The partner communication scripts eliminated years of unspoken tension.",
      text: "Bringing this topic up with my partner was what kept me up at night. The word-for-word conversation scripts in Bonus #2 gave me a neutral, confident framework to talk about somatic arousal regulation as a shared skill. The 8-minute daily reverse-kegel pelvic floor routine completely eliminated my involuntary pelvic muscle spasms within 3 weeks.",
      stat: "Outcome: 90% Reduction in Pre-Anxiety",
      date: "Purchased June 2026"
    },
    {
      name: "David S.",
      age: "Age 38 • Verified Member",
      role: "Operations Manager, Denver CO",
      rating: 5,
      headline: "Groundbreaking physiology-first approach. No gimmick tricks or pills.",
      text: "I was deeply skeptical because of the sheer amount of scam supplements online. Composure is fundamentally different—it's based on human autonomic nervous system science. The 5-step 'Tonight' reference sheet gave me immediate tactical adjustments on night one, and the 30-day roadmap kept me accountable.",
      stat: "Outcome: Noticeable Results in 12 Days",
      date: "Purchased April 2026"
    },
    {
      name: "Jason L.",
      age: "Age 47 • Verified Member",
      role: "Financial Analyst, Boston MA",
      rating: 5,
      headline: "Restored my confidence in the bedroom after feeling stuck for 4 years.",
      text: "I thought getting into my late 40s meant accepting loss of control. This program proved that ejaculation control is a trainable neuromuscular reflex, not a mystery. Understanding bulbospongiosus muscle isolation vs. deep relaxation changed everything for me.",
      stat: "Outcome: Lasting Bedroom Confidence",
      date: "Purchased May 2026"
    }
  ];

  return (
    <section id="reviews" className="py-12 md:py-16 space-y-10 border-t border-[#173404]/10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 font-mono-caps text-xs text-[#081d00] bg-[#b7f473]/30 px-3.5 py-1 rounded-full">
          <div className="flex text-amber-500">{"★".repeat(5)}</div>
          <span>REAL MEMBER EXPERIENCES & RESULTS</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#081d00] tracking-tight">
          What Men Experience With The Composure Method
        </h2>
        <p className="font-body text-sm md:text-base text-[#43483e] leading-relaxed">
          Read verified feedback from men who applied the 4-pillar neuromuscular and breathwork framework to retrain their autonomic nervous system.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="bg-white p-6 md:p-8 rounded-2xl border border-[#173404]/10 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-500 text-sm">
                  {"★".repeat(rev.rating)}
                </div>
                <span className="font-mono text-[11px] text-[#3e6a00] bg-[#b7f473]/20 px-2.5 py-0.5 rounded-full font-bold">
                  {rev.stat}
                </span>
              </div>

              <h3 className="font-display font-bold text-base text-[#081d00]">
                "{rev.headline}"
              </h3>

              <p className="font-body text-xs md:text-sm text-[#43483e] leading-relaxed">
                {rev.text}
              </p>
            </div>

            <div className="pt-4 border-t border-[#173404]/10 flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-xs text-[#081d00]">{rev.name}</h4>
                <p className="font-mono text-[11px] text-[#74796d]">{rev.role}</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-[11px] text-[#3e6a00] font-bold block">
                  {rev.age}
                </span>
                <span className="font-mono text-[10px] text-[#74796d]">
                  {rev.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
