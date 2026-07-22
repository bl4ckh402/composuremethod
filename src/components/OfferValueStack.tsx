import React from 'react';

interface OfferProps {
  onOpenCheckout: () => void;
  isMemberVerified?: boolean;
}

export const OfferValueStack: React.FC<OfferProps> = ({ onOpenCheckout, isMemberVerified = false }) => {
  const handleClick = () => {
    if (isMemberVerified) {
      const el = document.getElementById('curriculum');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenCheckout();
    }
  };
  return (
    <section className="py-12 md:py-16 border-t border-[#173404]/10 space-y-8">
      <div className="bg-[#173404] text-white rounded-3xl p-8 md:p-14 shadow-xl border border-[#173404] relative overflow-hidden max-w-4xl mx-auto space-y-8">
        {/* Glow backdrop */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#b7f473]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center space-y-3 relative z-10">
          <span className="font-mono-caps text-xs text-[#b7f473] bg-[#b7f473]/20 px-3.5 py-1 rounded-full uppercase tracking-wider">
            SPECIAL LIMITED OFFER · $20 TODAY (FULL RETAIL VALUE $197)
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
            Get The Complete Composure System Today
          </h2>
          <p className="font-body text-sm md:text-base text-[#e0e3da] max-w-xl mx-auto">
            Everything you need to master arousal control, pelvic conditioning, and partner confidence in one discrete digital bundle.
          </p>
        </div>

        {/* Retail Value Stack List */}
        <div className="bg-white/10 rounded-2xl p-6 border border-white/15 backdrop-blur-sm space-y-4 relative z-10">
          <div className="flex justify-between items-center text-xs font-mono-caps text-[#b7f473] border-b border-white/15 pb-2">
            <span>INCLUDED DIGITAL ASSETS</span>
            <span>RETAIL VALUE</span>
          </div>

          <div className="space-y-3 font-body text-xs md:text-sm">
            <div className="flex justify-between items-center text-white">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b7f473] text-base">check_circle</span>
                <span>The Composure Method 5-Module Master Guide</span>
              </span>
              <span className="font-mono text-white/90">$97</span>
            </div>

            <div className="flex justify-between items-center text-white">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b7f473] text-base">check_circle</span>
                <span><strong>Bonus #1:</strong> The "Tonight" In-Bed 5-Step Reference Sheet</span>
              </span>
              <span className="font-mono text-white/90">$30</span>
            </div>

            <div className="flex justify-between items-center text-white">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b7f473] text-base">check_circle</span>
                <span><strong>Bonus #2:</strong> Word-for-Word Partner Communication Playbook</span>
              </span>
              <span className="font-mono text-white/90">$25</span>
            </div>

            <div className="flex justify-between items-center text-white">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b7f473] text-base">check_circle</span>
                <span><strong>Bonus #3:</strong> 30/60/90-Day Interactive Progress Roadmap & Log</span>
              </span>
              <span className="font-mono text-white/90">$25</span>
            </div>

            <div className="flex justify-between items-center text-white">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b7f473] text-base">check_circle</span>
                <span><strong>Bonus #4:</strong> AI Personalization Protocol & Custom Assessor</span>
              </span>
              <span className="font-mono text-white/90">$20</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/15 flex justify-between items-center font-display text-sm md:text-base text-white">
            <span>TOTAL COMBINED RETAIL VALUE:</span>
            <span className="font-mono text-[#b7f473] font-bold">$197.00</span>
          </div>
        </div>

        {/* Pricing CTA Block */}
        <div className="text-center space-y-4 relative z-10 pt-2">
          <div className="space-y-1">
            <span className="font-mono-caps text-xs text-white/70 uppercase">TODAY'S SPECIAL DISCOUNT PRICE (WORTH $197)</span>
            <div className="flex items-center justify-center gap-3">
              <span className="font-display text-5xl md:text-6xl font-bold text-[#b7f473]">$20</span>
              <span className="text-xs font-mono text-white/80 text-left leading-snug">
                USD<br/>
                <span className="text-[#b7f473]">Save $177 Today</span>
              </span>
            </div>
            <p className="font-mono text-[11px] text-white/70">
              One-time payment • No subscriptions • Instant digital delivery
            </p>
          </div>

          <button
            onClick={handleClick}
            className="w-full sm:w-auto bg-[#b7f473] text-[#081d00] font-display text-lg font-bold px-10 py-5 rounded-2xl hover:bg-white transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-3 mx-auto group"
          >
            <span>{isMemberVerified ? 'Access Complete Unlocked System' : 'Claim My Instant Access for $20 (Worth $197)'}</span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>

          {/* Guarantees micro-copy */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-white/80 pt-2">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#b7f473]">shield</span>
              30-Day 100% Risk-Free Guarantee
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#b7f473]">lock</span>
              Discreet Card Billing ("CM DIGITAL")
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
