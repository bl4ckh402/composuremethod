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

  const items = [
    { label: 'The Composure Method 5-Module Master Guide', value: '$97' },
    { label: 'Bonus #1: The "Tonight" In-Bed 5-Step Reference Sheet', value: '$30' },
    { label: 'Bonus #2: Word-for-Word Partner Communication Playbook', value: '$25' },
    { label: 'Bonus #3: 30/60/90-Day Interactive Progress Roadmap & Log', value: '$45' },
  ];

  return (
    <section className="py-16 md:py-20 relative">
      <div className="section-divider mb-12" />

      <div className="dark-card p-8 md:p-14 relative overflow-hidden max-w-4xl mx-auto space-y-10 reveal-scale">
        {/* Glow orbs */}
        <div className="absolute -right-24 -top-24 w-80 h-80 bg-[#b7f473]/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-60 h-60 bg-[#b7f473]/8 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-3 relative z-10">
          <span className="badge-lime">SPECIAL LIMITED OFFER · $20 TODAY (FULL RETAIL VALUE $197)</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
            Get The Complete Composure System Today
          </h2>
          <p className="font-body text-sm md:text-base text-white/70 max-w-xl mx-auto">
            Everything you need to master arousal control, pelvic conditioning, and partner confidence in one discrete digital bundle.
          </p>
        </div>

        {/* Value stack table */}
        <div className="bg-white/8 rounded-2xl p-6 border border-white/10 backdrop-blur-sm space-y-1 relative z-10">
          <div className="flex justify-between items-center font-mono-caps text-[10px] text-[#b7f473] border-b border-white/12 pb-3 mb-3">
            <span>INCLUDED DIGITAL ASSETS</span>
            <span>RETAIL VALUE</span>
          </div>

          <div className="space-y-0">
            {items.map((item, i) => (
              <div
                key={i}
                className={`flex justify-between items-center py-3 px-3 rounded-xl transition-colors ${i === 0 ? 'feature-row-highlight' : 'hover:bg-white/5'}`}
              >
                <span className="flex items-center gap-2.5 font-body text-xs md:text-sm text-white">
                  <span className="material-symbols-outlined text-[#b7f473] text-base shrink-0">check_circle</span>
                  <span dangerouslySetInnerHTML={{ __html: item.label.replace(/^(Bonus #\d+:)/, '<strong>$1</strong>') }} />
                </span>
                <span className="font-mono text-white/90 text-sm font-bold shrink-0 ml-4">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/15 flex justify-between items-center">
            <span className="font-display text-sm md:text-base text-white font-bold">TOTAL COMBINED RETAIL VALUE:</span>
            <span className="font-mono text-[#b7f473] font-bold text-lg">$197.00</span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="text-center space-y-6 relative z-10">
          <div className="space-y-1">
            <span className="font-mono-caps text-xs text-white/60 uppercase">TODAY'S SPECIAL DISCOUNT PRICE</span>
            <div className="flex items-center justify-center gap-4">
              <span className="font-mono text-white/40 line-through text-2xl">$197</span>
              <div className="flex items-center gap-3">
                <span className="font-display text-6xl md:text-7xl font-bold gradient-text-lime">$20</span>
                <div className="text-left">
                  <div className="font-mono-caps text-xs text-[#b7f473] font-bold">USD</div>
                  <div className="font-mono text-xs text-white/60">Save $177 Today</div>
                </div>
              </div>
            </div>
            <p className="font-mono text-[11px] text-white/60">
              One-time payment • No subscriptions • Instant digital delivery
            </p>
          </div>

          <button
            onClick={handleClick}
            className="btn-accent w-full sm:w-auto mx-auto text-base md:text-lg py-5 px-12 group"
          >
            <span className="material-symbols-outlined text-[#081d00] text-xl">lock_open</span>
            <span>{isMemberVerified ? 'Access Complete Unlocked System' : 'Claim My Instant Access for $20 (Worth $197)'}</span>
            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-mono text-white/70">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#b7f473]">shield</span>
              30-Day 100% Risk-Free Guarantee
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#b7f473]">lock</span>
              Discreet Card Billing ("CM DIGITAL")
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#b7f473]">bolt</span>
              Instant Digital Access
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
