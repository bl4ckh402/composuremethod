import React, { useState, useEffect } from 'react';

interface StickyCtaProps {
  onOpenCheckout: () => void;
  isMemberVerified?: boolean;
}

export const StickyCtaBar: React.FC<StickyCtaProps> = ({ onOpenCheckout, isMemberVerified = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (isMemberVerified) {
      const el = document.getElementById('curriculum');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenCheckout();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 sticky-cta-enter">
      {/* Gradient border at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#b7f473]/60 to-transparent" />

      <div className="glass-panel-dark border-0 py-3.5 px-4 shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Product info */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="relative">
              <span className="w-3 h-3 rounded-full bg-[#b7f473] animate-ping absolute inset-0" />
              <span className="w-3 h-3 rounded-full bg-[#b7f473] relative block" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white leading-none">The Composure Method Bundle</h4>
              <p className="font-mono text-[10px] text-[#b7f473] mt-0.5">
                {isMemberVerified ? 'Lifetime Member Access Active' : '5 Modules + 4 Free Bonuses • Worth $197 (Save $177)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            {/* Price */}
            <div className="text-left sm:text-right">
              {isMemberVerified ? (
                <span className="font-mono-caps text-[11px] font-bold text-[#b7f473] uppercase tracking-wider">
                  MEMBER UNLOCKED
                </span>
              ) : (
                <div>
                  <span className="line-through text-white/40 font-mono text-xs block leading-none">$197</span>
                  <span className="font-display font-bold text-xl text-[#b7f473] leading-none">$20 USD</span>
                </div>
              )}
            </div>

            {/* CTA button */}
            <button
              id="sticky-cta-btn"
              onClick={handleClick}
              className="btn-accent text-xs py-3 px-6 rounded-full shrink-0"
            >
              <span className="material-symbols-outlined text-sm">{isMemberVerified ? 'auto_stories' : 'lock_open'}</span>
              <span>{isMemberVerified ? 'Access My Curriculum' : 'Get Instant Access ($20)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
