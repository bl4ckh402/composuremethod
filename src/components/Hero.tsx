import React from 'react';
import { IMAGES } from '../data/initialData';
import lt from '../assets/images/lt.png';

interface HeroProps {
  onOpenCheckout: () => void;
  isMemberVerified?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckout, isMemberVerified = false }) => {
  const handlePrimaryClick = () => {
    if (isMemberVerified) {
      const el = document.getElementById('curriculum');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenCheckout();
    }
  };

  return (
    <section className="hero-bg pt-8 pb-16 md:py-16 relative overflow-hidden">
      {/* Subtle decorative orbs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#b7f473]/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-[#173404]/4 blur-3xl pointer-events-none" />

      <div className="relative space-y-8">
        {/* Social proof pill */}
        <div className="flex justify-center sm:justify-start">
          <div className="flex items-center gap-2.5 glass-panel-mint px-4 py-2 rounded-full shadow-sm">
            <div className="flex text-amber-400 text-sm gap-0.5">
              {'★'.repeat(5)}
            </div>
            <span className="font-mono-caps text-[11px] text-[#081d00] font-bold">
              4.9 / 5 Rating
            </span>
            <span className="hidden sm:block text-[11px] font-body text-[#43483e]">
              • 12,400+ Verified Men Trained
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ── LEFT: Headline & CTA ───────────────────── */}
          <div className="lg:col-span-7 space-y-5 text-center sm:text-left">
            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-[2.1rem] sm:text-[2.6rem] md:text-[3.0rem] lg:text-[3.0rem] font-bold text-[#081d00] tracking-tight leading-[1.1]">
                Master Pre-Ejaculation Control &amp; Build Lasting Stamina.
              </h1>
              <p className="font-body text-base md:text-lg text-[#333a2e] max-w-xl leading-relaxed mx-auto sm:mx-0">
                <strong className="text-[#081d00]">Overcome premature ejaculation naturally.</strong>{' '}
                No numbing sprays, pills, or awkward tricks. Retrain your autonomic nervous system with our proven neuromuscular pelvic &amp; arousal control framework.
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {[
                { icon: 'trending_up', label: 'Arousal Scale Regulation' },
                { icon: 'checklist', label: 'In-Bed 5-Step Protocol' },
                { icon: 'psychology', label: 'Partner Script Playbook' },
              ].map((f) => (
                <span key={f.label} className="inline-flex items-center gap-1.5 bg-white border border-[#173404]/12 px-3 py-1.5 rounded-full font-body text-xs text-[#081d00] shadow-sm">
                  <span className="material-symbols-outlined text-[#3e6a00] text-sm">{f.icon}</span>
                  {f.label}
                </span>
              ))}
            </div>

            {/* CTA block */}
            <div className="pt-1 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Primary button */}
                <button
                  id="hero-cta-btn"
                  onClick={handlePrimaryClick}
                  className="btn-primary text-base md:text-lg py-4 px-8 group"
                >
                  <span className="material-symbols-outlined text-[#b7f473] text-xl">lock_open</span>
                  <span>{isMemberVerified ? 'Access Member Curriculum' : 'Get Instant Access — $20'}</span>
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>

                {/* Price badge */}
                <div className="flex flex-col items-center sm:items-start">
                  {isMemberVerified ? (
                    <span className="badge-lime flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3e6a00] animate-pulse" />
                      Lifetime Member Unlocked
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="line-through text-gray-400 font-mono text-sm">$197</span>
                      <span className="badge-lime">Save $177 Today</span>
                    </div>
                  )}
                  <span className="text-[11px] font-mono text-[#74796d] mt-1">
                    {isMemberVerified ? '5 Core Modules & 4 Bonuses Active' : 'One-time · Lifetime Access · Instant Delivery'}
                  </span>
                </div>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1">
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#52574c]">
                  <span className="material-symbols-outlined text-sm text-[#3e6a00]">verified_user</span>
                  30-Day Money-Back Guarantee
                </span>
                <span className="text-[#ccc]">|</span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#52574c]">
                  <span className="material-symbols-outlined text-sm text-[#3e6a00]">lock</span>
                  Discreet Billing ("CM DIGITAL")
                </span>
                <span className="text-[#ccc]">|</span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#52574c]">
                  <span className="material-symbols-outlined text-sm text-[#3e6a00]">bolt</span>
                  Instant Digital Delivery
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Product mockup card ─────────────── */}
          <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none">
            {/* Glow behind card */}
            <div className="absolute inset-0 -m-6 bg-[#b7f473]/15 rounded-[40px] blur-2xl pointer-events-none animate-pulse-glow" />

            <div className="relative bg-white rounded-3xl border border-[#173404]/10 shadow-xl overflow-hidden group">
               {/* Image */}
               <div className="relative aspect-video overflow-hidden bg-[#173404]">
                 <img
                   src={lt}
                   alt="The Composure Method Digital Bundle"
                   fetchPriority="high"
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                 />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081d00]/75 via-[#081d00]/10 to-transparent" />

                {/* Floating badges on image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className="bg-[#b7f473] text-[#081d00] px-3 py-1.5 rounded-full font-display font-bold text-sm shadow-lg">
                    $20 USD
                  </span>
                </div>

                {/* Verified members badge – top right */}
                <div className="absolute top-4 right-4 glass-panel px-2.5 py-1.5 rounded-xl shadow-sm border-0">
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-400 text-[10px]">{'★'.repeat(5)}</div>
                    <span className="font-mono text-[10px] text-[#173404] font-bold">12,400+ men</span>
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#081d00]">
                    Composure — The Practical Confidence Guide
                  </h3>
                  <p className="font-body text-xs text-[#43483e] mt-0.5">
                    Six modules, exercises, worksheets & bonus resources. Instant access on any device.
                  </p>
                </div>

                {/* Mini feature list */}
                <div className="grid grid-cols-2 gap-1.5">
                  {['5-Module Master Guide', 'In-Bed Protocol Sheet', 'Partner Script Playbook'].map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#3e6a00] text-sm shrink-0">check_circle</span>
                      <span className="font-body text-[11px] text-[#43483e] leading-tight">{item}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handlePrimaryClick}
                  className="w-full btn-primary text-sm py-3.5 rounded-xl"
                >
                  <span>{isMemberVerified ? 'Access Unlocked Curriculum' : 'Claim Complete Bundle for $20 (Worth $197)'}</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
          {[
            { stat: '12,400+', label: 'Men Trained' },
            { stat: '89%', label: 'Results in 30 Days' },
            { stat: '$177', label: 'Saved Today' },
          ].map((s) => (
            <div key={s.stat} className="text-center premium-card p-2 sm:p-4 reveal-scale">
              <div className="stat-number">{s.stat}</div>
              <p className="font-mono text-[9px] sm:text-[11px] text-[#74796d] mt-1 uppercase tracking-wide leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
