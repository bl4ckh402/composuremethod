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
    <footer className="w-full bg-[#173404] text-white pt-16 pb-12 px-5 md:px-16 text-[#e0e3da] mt-16 border-t border-[#173404]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-white/10 pb-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <button 
              onClick={() => onNavigate('home')}
              className="text-left block group"
            >
              <span className="font-display text-2xl font-bold text-white tracking-tight group-hover:text-[#b7f473] transition-colors block">
                ComposureMethod
              </span>
              <span className="font-mono-caps text-[10px] text-[#b7f473] uppercase tracking-wider block">
                Control & Confidence System
              </span>
            </button>
            <p className="font-body text-xs md:text-sm text-white/80 max-w-sm leading-relaxed">
              The evidence-based physiological and psychological system designed for men 30 and older to master arousal control, eliminate performance anxiety, and restore bedroom confidence.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#b7f473]">
              <span className="material-symbols-outlined text-sm">lock</span>
              <span>Discreet Card Billing ("CM DIGITAL")</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 font-mono-caps text-xs">
            <div className="space-y-3">
              <span className="text-[#b7f473] font-bold block uppercase tracking-wider">NAVIGATION</span>
              <button onClick={() => scrollTo('why-it-works')} className="block hover:text-[#b7f473] transition-colors text-left">Why It Works</button>
              <button onClick={() => scrollTo('the-method')} className="block hover:text-[#b7f473] transition-colors text-left">4-Pillar System</button>
              <button onClick={() => scrollTo('curriculum')} className="block hover:text-[#b7f473] transition-colors text-left">Curriculum & Bonuses</button>
              <button onClick={() => scrollTo('reviews')} className="block hover:text-[#b7f473] transition-colors text-left">Verified Reviews</button>
              <button onClick={() => scrollTo('faq')} className="block hover:text-[#b7f473] transition-colors text-left">FAQ</button>
            </div>

            <div className="space-y-3">
              <span className="text-[#b7f473] font-bold block uppercase tracking-wider">LEGAL & POLICIES</span>
              <button onClick={() => onNavigate('terms')} className="block hover:text-[#b7f473] transition-colors text-left">Terms of Service</button>
              <button onClick={() => onNavigate('privacy')} className="block hover:text-[#b7f473] transition-colors text-left">Privacy Policy</button>
              <button onClick={onOpenCheckout} className="block text-[#b7f473] font-bold hover:underline text-left">Get Instant Access ($20)</button>
            </div>
          </div>

          {/* Guarantee Seal Box */}
          <div className="md:col-span-3 bg-white/5 p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-[#b7f473] font-mono-caps text-xs font-bold">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span>30-DAY GUARANTEE</span>
            </div>
            <p className="font-body text-xs text-white/70 leading-relaxed">
              100% risk-free. If you don't feel noticeably more in control within 30 days, receive a full refund.
            </p>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="space-y-4 text-[11px] font-body text-white/60 leading-relaxed max-w-4xl">
          <p>
            <strong>Medical Disclaimer:</strong> The Composure Method is an educational digital system designed to teach somatic arousal regulation, pelvic neuromuscular conditioning, and parasympathetic breath control. It is not medical advice, diagnosis, or treatment. Consult a licensed healthcare provider or urologist for medical conditions.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 font-mono text-[10px] text-white/50 pt-2 border-t border-white/10">
            <span>© 2026 SAVITY LLC / COMPOSURE METHOD. ALL RIGHTS RESERVED.</span>
            <span>ENCRYPTED 256-BIT SSL DIGITAL CHECKOUT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
