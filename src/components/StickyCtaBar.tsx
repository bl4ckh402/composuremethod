import React, { useState, useEffect } from 'react';

interface StickyCtaProps {
  onOpenCheckout: () => void;
  isMemberVerified?: boolean;
}

export const StickyCtaBar: React.FC<StickyCtaProps> = ({ onOpenCheckout, isMemberVerified = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
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
    <div className="fixed bottom-0 left-0 w-full z-40 bg-[#081d00]/95 text-white backdrop-blur-md border-t border-[#b7f473]/30 py-3.5 px-4 shadow-2xl transition-all duration-300 animate-slideUp">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#b7f473] animate-ping"></span>
          <div>
            <h4 className="font-display font-bold text-xs text-white">The Composure Method Bundle</h4>
            <p className="font-mono text-[10px] text-[#b7f473]">
              {isMemberVerified ? 'Lifetime Member Access Active' : '5 Modules + 4 Free Bonuses • Worth $197 (Save $177)'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-left sm:text-right">
            {isMemberVerified ? (
              <span className="font-mono-caps text-[11px] font-bold text-[#b7f473] uppercase tracking-wider block">
                MEMBER UNLOCKED
              </span>
            ) : (
              <>
                <span className="line-through text-gray-400 font-mono text-xs block">$197</span>
                <span className="font-display font-bold text-lg text-[#b7f473]">$20 USD</span>
              </>
            )}
          </div>

          <button
            onClick={handleClick}
            className="bg-[#b7f473] text-[#081d00] font-mono-caps text-xs font-bold px-6 py-3 rounded-full hover:bg-white transition-all shadow-md cursor-pointer shrink-0 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">{isMemberVerified ? 'auto_stories' : 'lock'}</span>
            <span>{isMemberVerified ? 'Access My Curriculum' : 'Get Instant Access ($20)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
