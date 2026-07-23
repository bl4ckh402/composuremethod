import React, { useEffect } from 'react';
import { ViewMode } from '../types';
import { trackPurchase } from '../lib/redditPixel';
import { COPY } from '../lib/brand';

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
      <div className="relative inline-flex">
        <div className="w-24 h-24 bg-[#b7f473] text-[#081d00] rounded-full flex items-center justify-center mx-auto shadow-xl glow-accent animate-float">
          <span className="material-symbols-outlined text-5xl">check_circle</span>
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-[#b7f473]/30 animate-ping" style={{ animationDuration: '2s' }} />
      </div>

      <span className="badge-lime inline-flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3e6a00] animate-pulse" />
        ORDER CONFIRMED &amp; VERIFIED
      </span>

      <div className="space-y-3">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#081d00] tracking-tight">
          {COPY.checkoutSuccessTitle}
        </h1>
        <p className="font-body text-base text-[#43483e] max-w-lg mx-auto leading-relaxed">
          {COPY.checkoutSuccessBody}
        </p>
      </div>

      <button
        onClick={() => onNavigate('home')}
        className="btn-primary py-5 px-10 text-base group"
      >
        <span className="material-symbols-outlined text-xl text-[#b7f473]">auto_stories</span>
        <span>Access Your Digital Curriculum &amp; Guides</span>
        <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
      </button>

      <p className="font-mono text-[11px] text-[#74796d]">
        Need assistance?{' '}
        <a href={`mailto:${COPY.supportEmail}`} className="underline font-bold text-[#173404] hover:text-[#3e6a00] transition-colors">
          {COPY.supportEmail}
        </a>
      </p>
    </div>
  );
};
