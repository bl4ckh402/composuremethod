import React from 'react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onOpenCheckout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCheckout }) => {
  const scrollTo = (id: string) => {
    onNavigate('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="w-full relative overflow-hidden mt-16">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#b7f473]/40 to-transparent" />

      <div className="bg-gradient-to-b from-[#173404] via-[#0f2503] to-[#081d00] pt-16 pb-12 px-5 md:px-16">
        {/* Decorative orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#b7f473]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#b7f473]/4 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto space-y-14 relative z-10">
          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start border-b border-white/8 pb-12">
            {/* Brand column */}
            <div className="md:col-span-5 space-y-5">
              <button
                onClick={() => onNavigate('home')}
                className="text-left group block"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#b7f473] text-[#081d00] font-display font-bold text-xl flex items-center justify-center shadow-md">
                    C
                  </span>
                  <div>
                    <span className="font-display text-2xl font-bold text-white tracking-tight group-hover:text-[#b7f473] transition-colors block leading-none">
                      ComposureMethod
                    </span>
                    <span className="font-mono-caps text-[10px] text-[#b7f473]/70 block mt-0.5">
                      Control &amp; Confidence System
                    </span>
                  </div>
                </div>
              </button>

              <p className="font-body text-sm text-white/65 max-w-sm leading-relaxed">
                The evidence-based physiological and psychological system designed for men 30 and older to master arousal control, eliminate performance anxiety, and restore bedroom confidence.
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#b7f473]/80">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>Discreet Card Billing ("CM DIGITAL")</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#b7f473]/80">
                  <span className="material-symbols-outlined text-sm">verified_user</span>
                  <span>30-Day Risk-Free Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#b7f473]/80">
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  <span>Instant Digital Delivery After Payment</span>
                </div>
              </div>
            </div>

            {/* Navigation columns */}
            <div className="md:col-span-4 grid grid-cols-2 gap-8 font-mono-caps text-[11px]">
              <div className="space-y-3">
                <span className="text-[#b7f473] font-bold block uppercase tracking-wider border-b border-[#b7f473]/20 pb-2">
                  NAVIGATION
                </span>
                {[
                  ['why-it-works', 'Why It Works'],
                  ['the-method', '4-Pillar System'],
                  ['curriculum', 'Curriculum & Bonuses'],
                  ['reviews', 'Verified Reviews'],
                  ['faq', 'FAQ'],
                ].map(([id, label]) => (
                  <button key={id} onClick={() => scrollTo(id)} className="block text-white/60 hover:text-[#b7f473] transition-colors text-left">
                    {label}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <span className="text-[#b7f473] font-bold block uppercase tracking-wider border-b border-[#b7f473]/20 pb-2">
                  LEGAL &amp; POLICIES
                </span>
                <button onClick={() => onNavigate('terms')} className="block text-white/60 hover:text-[#b7f473] transition-colors text-left">Terms of Service</button>
                <button onClick={() => onNavigate('privacy')} className="block text-white/60 hover:text-[#b7f473] transition-colors text-left">Privacy Policy</button>
                <button onClick={onOpenCheckout} className="block text-[#b7f473] font-bold hover:underline text-left">Get Instant Access ($20)</button>
              </div>
            </div>

            {/* Guarantee box */}
            <div className="md:col-span-3">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/8 space-y-3 hover:border-[#b7f473]/20 transition-colors">
                <div className="flex items-center gap-2 text-[#b7f473] font-mono-caps text-xs font-bold">
                  <span className="material-symbols-outlined text-lg">verified_user</span>
                  <span>30-DAY GUARANTEE</span>
                </div>
                <p className="font-body text-xs text-white/60 leading-relaxed">
                  100% risk-free. If you don't feel noticeably more in control within 30 days, receive a full refund. No questions asked.
                </p>

                <button
                  onClick={onOpenCheckout}
                  className="w-full btn-accent text-[10px] py-2.5 px-4 rounded-xl mt-2"
                >
                  <span>Get Access for $20</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom disclaimer */}
          <div className="space-y-4">
            <p className="text-[11px] font-body text-white/45 leading-relaxed max-w-4xl">
              <strong className="text-white/60">Medical Disclaimer:</strong> The Composure Method is an educational digital system designed to teach somatic arousal regulation, pelvic neuromuscular conditioning, and parasympathetic breath control. It is not medical advice, diagnosis, or treatment. Consult a licensed healthcare provider or urologist for medical conditions.
            </p>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 font-mono text-[10px] text-white/35 pt-2 border-t border-white/8">
              <span>© 2026 SAVITY LLC / COMPOSURE METHOD. ALL RIGHTS RESERVED.</span>
              <span>ENCRYPTED 256-BIT SSL DIGITAL CHECKOUT</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
