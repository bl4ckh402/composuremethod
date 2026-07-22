import React, { useState } from 'react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenCheckout: () => void;
  onOpenMemberAccess: () => void;
  isMemberVerified?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenCheckout,
  onOpenMemberAccess,
  isMemberVerified,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="flex justify-between items-center h-16 md:h-18 px-4 md:px-10 w-full sticky top-0 z-50 bg-[#fcf9f8]/95 backdrop-blur-md border-b border-[#173404]/10">
      {/* Brand Logo */}
      <button 
        onClick={() => onNavigate('home')}
        className="text-left group cursor-pointer flex items-center gap-2"
      >
        <span className="w-8 h-8 rounded-lg bg-[#173404] text-[#b7f473] font-display font-bold text-lg flex items-center justify-center shrink-0">
          C
        </span>
        <div>
          <span className="font-display text-sm md:text-xl font-bold text-[#081d00] tracking-tight group-hover:text-[#3e6a00] transition-colors leading-none block">
            composuremethod.help
          </span>
        </div>
      </button>


      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {isMemberVerified ? (
          <div className="bg-[#f4fce8] border border-[#3e6a00]/30 text-[#081d00] font-mono-caps text-[11px] px-3.5 py-2 rounded-full flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#3e6a00] animate-pulse"></span>
            <span className="font-bold">MEMBER</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMemberAccess}
              className="hidden lg:inline-block font-mono-caps text-[11px] text-[#52574c] hover:text-[#081d00] transition-colors cursor-pointer"
            >
              Member Login
            </button>
            <button
              onClick={onOpenCheckout}
              className="bg-[#173404] text-white font-mono-caps text-xs px-4 md:px-5 py-2.5 rounded-full hover:bg-[#081d00] transition-all duration-200 shadow-sm cursor-pointer flex items-center gap-1.5 font-bold"
            >
              <span className="material-symbols-outlined text-sm">lock</span>
              <span>Get Access ($20)</span>
            </button>
          </div>
        )}

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#081d00] hover:bg-[#ebe7e7] rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle Navigation"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#fcf9f8] border-b border-[#173404]/10 p-5 flex flex-col gap-3 shadow-xl z-50 animate-fadeIn">
          <div className="pt-2 border-t border-[#173404]/10 space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenMemberAccess(); }}
              className="w-full text-center font-mono-caps text-xs text-[#173404] py-2 rounded-lg bg-[#f0ebe3] font-bold"
            >
              Member Login / Check Access
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenCheckout(); }}
              className="w-full bg-[#173404] text-white font-mono-caps text-xs py-3 rounded-full hover:bg-[#081d00] transition-colors text-center font-bold"
            >
              Get Instant Access — $20
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

