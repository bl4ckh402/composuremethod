import React, { useState, useEffect } from 'react';
import { ViewMode } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useI18n } from '../lib/i18n';

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
  const { t, strings } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <nav className={`flex justify-between items-center h-16 md:h-[68px] px-4 md:px-10 w-full sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[#fcf9f8]/95 backdrop-blur-md shadow-sm border-b border-[#173404]/8'
        : 'bg-transparent'
    }`}>
      {/* Brand */}
      <button
        onClick={() => onNavigate('home')}
        className="text-left group cursor-pointer flex items-center gap-2.5"
      >
        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1e4205] to-[#173404] text-[#b7f473] font-display font-bold text-base flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
          C
        </span>
        <div>
          <span className="font-display text-xs sm:text-sm md:text-lg font-bold text-[#081d00] tracking-tight group-hover:text-[#3e6a00] transition-colors leading-none block">
            composuremethod.help
          </span>
          <span className="hidden md:block font-mono text-[9px] text-[#74796d] uppercase tracking-wider leading-none mt-0.5">
            {t('footer.tagline')}
          </span>
        </div>
      </button>

      {/* Desktop nav links */}
      <div className="hidden lg:flex items-center gap-6 font-mono-caps text-[11px] text-[#52574c]">
        <button onClick={() => scrollToSection('why-it-works')} className="hover:text-[#173404] transition-colors cursor-pointer">{t('nav.whyItWorks')}</button>
        <button onClick={() => scrollToSection('the-method')} className="hover:text-[#173404] transition-colors cursor-pointer">{t('nav.theMethod')}</button>
        <button onClick={() => scrollToSection('curriculum')} className="hover:text-[#173404] transition-colors cursor-pointer">{t('nav.curriculum')}</button>
        <button onClick={() => scrollToSection('reviews')} className="hover:text-[#173404] transition-colors cursor-pointer">{t('nav.reviews')}</button>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2.5">
        {isMemberVerified ? (
          <div className="flex items-center gap-2 bg-[#f4fce8] border border-[#3e6a00]/25 text-[#081d00] font-mono-caps text-[11px] px-3.5 py-2 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#3e6a00] animate-pulse" />
            <span className="font-bold">{t('nav.accessGranted')}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <button
                onClick={onOpenMemberAccess}
                className="btn-ghost text-[10px] py-1.5 px-3"
              >
                {t('nav.memberLogin')}
              </button>
            </div>
            <div className="hidden sm:block">
              <button
                id="header-cta-btn"
                onClick={onOpenCheckout}
                className="btn-primary text-[10px] py-1.5 px-3 rounded-full"
              >
                <span className="material-symbols-outlined text-sm text-[#b7f473]">lock</span>
                <span>{t('nav.getAccess')}</span>
              </button>
            </div>
          </div>
        )}

        <div className="hidden lg:block">
          <LanguageSwitcher />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#081d00] hover:bg-[#f0ebe3] rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle Navigation"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full glass-panel border-b border-[#173404]/10 p-5 flex flex-col gap-3 shadow-xl z-50 animate-slideDown">
          <div className="grid grid-cols-2 gap-2 font-mono-caps text-[11px]">
            {[
              ['why-it-works', 'nav.whyItWorks'],
              ['the-method', 'nav.theMethod'],
              ['curriculum', 'nav.curriculum'],
              ['reviews', 'nav.reviews'],
              ['faq', 'faq'],
            ].map(([id, labelKey]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-center font-bold py-2.5 rounded-xl bg-[#f0ebe3] text-[#173404] hover:bg-[#e0dada] transition-colors"
              >
                {t(labelKey)}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-[#173404]/10 space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenMemberAccess(); }}
              className="w-full text-center font-mono-caps text-xs text-[#173404] py-2.5 rounded-xl bg-[#f0ebe3] font-bold hover:bg-[#e0dada] transition-colors"
            >
              {t('nav.memberLoginCheck')}
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenCheckout(); }}
              className="w-full btn-primary text-xs py-3 rounded-xl"
            >
              <span className="material-symbols-outlined text-sm text-[#b7f473]">lock</span>
              {t('nav.getAccess')}
            </button>
            <div className="pt-1 flex justify-center">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
