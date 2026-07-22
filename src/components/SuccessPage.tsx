import React, { useEffect } from 'react';
import { ViewMode } from '../types';
import { trackPurchase } from '../lib/redditPixel';

interface SuccessPageProps {
  userEmail?: string;
  onNavigate: (view: ViewMode) => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ userEmail, onNavigate }) => {
  const email = userEmail || localStorage.getItem('composure_user_email') || 'your email address';

  useEffect(() => {
    const emailToTrack = email && email !== 'your email address' ? email : undefined;
    trackPurchase({
      value: 20,
      currency: 'USD',
      orderId: `polar_${Date.now()}`,
      email: emailToTrack,
    });
  }, [email]);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center animate-fadeIn space-y-8">
      {/* Success icon */}
      <div className="relative inline-flex">
        <div className="w-24 h-24 bg-[#b7f473] text-[#081d00] rounded-full flex items-center justify-center mx-auto shadow-xl glow-accent animate-float">
          <span className="material-symbols-outlined text-5xl">check_circle</span>
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-[#b7f473]/30 animate-ping" style={{ animationDuration: '2s' }} />
      </div>

      {/* Status badge */}
      <span className="badge-lime inline-flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3e6a00] animate-pulse" />
        ORDER CONFIRMED &amp; VERIFIED
      </span>

      {/* Heading */}
      <div className="space-y-3">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#081d00] tracking-tight">
          Welcome to The Composure Method
        </h1>
        <p className="font-body text-base text-[#333a2e] max-w-lg mx-auto leading-relaxed">
          Your payment has been successfully processed. We have dispatched your digital access token, core modules, and 4 bonus playbooks directly to{' '}
          <strong className="text-[#081d00] underline decoration-[#b7f473]">{email}</strong>.
        </p>
      </div>

      {/* Digital receipt */}
      <div className="premium-card p-6 text-left max-w-md mx-auto space-y-3 font-mono text-xs">
        <p className="font-mono-caps text-[10px] text-[#74796d] font-bold uppercase tracking-wider border-b border-[#173404]/8 pb-2 mb-3">
          DIGITAL ORDER RECEIPT
        </p>
        {[
          ['FULFILLMENT AGENT', 'POLAR SOFTWARE INC.'],
          ['PRODUCT BUNDLE', 'Composure Master System'],
          ['CREDIT CARD STATEMENT', 'POLAR.SH*COMPOSURE'],
          ['DISPATCH STATUS', '✓ DISPATCHED TO EMAIL'],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between items-start gap-2">
            <span className="text-[#74796d]">{label}</span>
            <span className={`text-[#081d00] font-bold text-right ${label === 'DISPATCH STATUS' ? 'text-[#3e6a00]' : ''}`}>{value}</span>
          </div>
        ))}
        <div className="flex justify-between border-t border-[#173404]/10 pt-3 font-bold text-[#081d00] text-sm">
          <span>AMOUNT BILLED</span>
          <span>$20.00 USD</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => {
          onNavigate('home');
          setTimeout(() => {
            const el = document.getElementById('curriculum');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        className="btn-primary py-5 px-10 text-base group"
      >
        <span className="material-symbols-outlined text-xl text-[#b7f473]">auto_stories</span>
        <span>Access Your Digital Curriculum &amp; Guides</span>
        <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
      </button>

      <p className="font-mono text-[11px] text-[#74796d]">
        Need assistance?{' '}
        <a href="mailto:support@composuremethod.com" className="underline font-bold text-[#173404] hover:text-[#3e6a00] transition-colors">
          support@composuremethod.com
        </a>
      </p>
    </div>
  );
};
