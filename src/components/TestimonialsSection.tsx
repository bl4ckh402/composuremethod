import React from 'react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Marcus T.',
      age: 'Age 34 • Verified Member',
      role: 'Architect, Chicago IL',
      rating: 5,
      headline: 'Shifted from constant 90-second panic to complete 15-minute relaxed control.',
      text: 'When I turned 33, performance anxiety hit me out of nowhere. I tried numbing sprays from pharmacy shelves and hated losing all physical sensation. The 1-to-10 arousal scale in Module 2 was the exact missing link. Learning to spot Level 7 arousal early and using the 4-2-7 parasympathetic breathing reset allowed me to stay present and relaxed without losing my rhythm.',
      stat: '15+ Min Consistent Control',
      date: 'Purchased May 2026',
    },
    {
      name: 'Richard K.',
      age: 'Age 41 • Verified Member',
      role: 'Software Director, Austin TX',
      rating: 5,
      headline: 'The partner communication scripts eliminated years of unspoken tension.',
      text: 'Bringing this topic up with my partner was what kept me up at night. The word-for-word conversation scripts in Bonus #2 gave me a neutral, confident framework to talk about somatic arousal regulation as a shared skill. The 8-minute daily reverse-kegel pelvic floor routine completely eliminated my involuntary pelvic muscle spasms within 3 weeks.',
      stat: '90% Reduction in Pre-Anxiety',
      date: 'Purchased June 2026',
    },
    {
      name: 'David S.',
      age: 'Age 38 • Verified Member',
      role: 'Operations Manager, Denver CO',
      rating: 5,
      headline: 'Groundbreaking physiology-first approach. No gimmick tricks or pills.',
      text: 'I was deeply skeptical because of the sheer amount of scam supplements online. Composure is fundamentally different—it\'s based on human autonomic nervous system science. The 5-step "Tonight" reference sheet gave me immediate tactical adjustments on night one, and the 30-day roadmap kept me accountable.',
      stat: 'Noticeable Results in 12 Days',
      date: 'Purchased April 2026',
    },
    {
      name: 'Jason L.',
      age: 'Age 47 • Verified Member',
      role: 'Financial Analyst, Boston MA',
      rating: 5,
      headline: 'Restored my confidence in the bedroom after feeling stuck for 4 years.',
      text: 'I thought getting into my late 40s meant accepting loss of control. This program proved that ejaculation control is a trainable neuromuscular reflex, not a mystery. Understanding bulbospongiosus muscle isolation vs. deep relaxation changed everything for me.',
      stat: 'Lasting Bedroom Confidence',
      date: 'Purchased May 2026',
    }
  ];

  return (
    <section id="reviews" className="py-16 md:py-20 space-y-12 relative">
      <div className="section-divider mb-12" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 reveal-slide-up">
        <div className="inline-flex items-center gap-2">
          <div className="flex text-amber-400 text-sm">{'★'.repeat(5)}</div>
        </div>
        <h2 className="font-display text-3xl md:text-[2.6rem] font-bold text-[#081d00] tracking-tight">
          What Men Experience With The Composure Method
        </h2>
        <p className="font-body text-sm md:text-base text-[#43483e] leading-relaxed">
          Read verified feedback from men who applied the 4-pillar neuromuscular and breathwork framework to retrain their autonomic nervous system.
        </p>
      </div>

      {/* Reviews grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="reveal-scale premium-card p-7 md:p-8 flex flex-col justify-between group overflow-hidden relative"
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#b7f473]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="space-y-4">
              {/* Stars + stat badge */}
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 text-base gap-0.5">
                  {'★'.repeat(rev.rating)}
                </div>
                <span className="badge-lime text-[10px]">
                  {rev.stat}
                </span>
              </div>

              {/* Headline */}
              <blockquote className="font-display font-bold text-base md:text-lg text-[#081d00] leading-snug">
                "{rev.headline}"
              </blockquote>

              {/* Body */}
              <p className="font-body text-xs md:text-sm text-[#43483e] leading-relaxed">
                {rev.text}
              </p>
            </div>

            {/* Author row */}
            <div className="mt-6 pt-5 border-t border-[#173404]/8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar initials */}
                <div className="w-10 h-10 rounded-full bg-[#173404] text-[#b7f473] flex items-center justify-center font-display font-bold text-sm shrink-0">
                  {rev.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#081d00]">{rev.name}</h4>
                  <p className="font-mono text-[11px] text-[#74796d]">{rev.role}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-[11px] text-[#3e6a00] font-bold block">{rev.age}</span>
                <span className="font-mono text-[10px] text-[#74796d]">{rev.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Social proof numbers */}
      <div className="bg-gradient-to-r from-[#f6fef0] via-[#edfbd0] to-[#f6fef0] rounded-3xl border border-[#b7f473]/40 p-8 reveal-scale">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '12,400+', label: 'Men Trained' },
            { num: '4.9 / 5', label: 'Average Rating' },
            { num: '89%', label: 'Report Results in 30 Days' },
            { num: '30-Day', label: 'Money-Back Guarantee' },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="stat-number text-[#173404]">{item.num}</div>
              <p className="font-mono text-[11px] text-[#43483e] uppercase tracking-wide">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
