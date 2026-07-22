import React from 'react';
import { ViewMode } from '../types';

interface CancelPageProps {
  onNavigate: (view: ViewMode) => void;
  onOpenCheckout: () => void;
}

export const CancelPage: React.FC<CancelPageProps> = ({ onNavigate, onOpenCheckout }) => {
  return (
    <div className="max-w-xl mx-auto py-16 px-4 text-center animate-fadeIn space-y-8">
      {/* Icon */}
      <div className="w-20 h-20 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto border-2 border-amber-200 shadow-md">
        <span className="material-symbols-outlined text-4xl">shopping_cart_checkout</span>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <span className="inline-flex items-center gap-2 font-mono-caps text-xs text-amber-800 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-200 font-bold">
          CHECKOUT INTERRUPTED
        </span>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-[#081d00]">
          Your Order Was Not Completed
        </h1>
        <p className="font-body text-sm md:text-base text-[#43483e] leading-relaxed max-w-md mx-auto">
          No charges were made to your card or account. Your special introductory price of{' '}
          <strong>$20.00 USD (Save $177)</strong> remains reserved for your current session.
        </p>
      </div>

      {/* What's waiting */}
      <div className="premium-card p-6 text-left space-y-4">
        <h3 className="font-display font-bold text-sm text-[#081d00] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#3e6a00] text-base">verified</span>
          What's waiting in your reserved bundle:
        </h3>
        <ul className="font-body text-xs text-[#43483e] space-y-2.5">
          {[
            'Modules 1–5 Core Physiological Mastery Guide',
            'Bonus #1: "Tonight" 5-Step In-Bed Quick Reference Protocol',
            'Bonus #2: Word-for-Word Partner Communication Playbook',
            'Bonus #3 & #4: 30/60/90 Day Practice Log & AI Personalizer',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#3e6a00] text-sm shrink-0">check</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="pt-3 border-t border-[#173404]/8 flex items-center justify-between">
          <span className="font-mono text-xs text-[#74796d]">Total Combined Value:</span>
          <div className="flex items-center gap-2">
            <span className="line-through text-gray-400 font-mono text-xs">$197</span>
            <span className="font-display font-bold text-[#173404] text-lg">$20 TODAY</span>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onOpenCheckout}
          className="btn-primary py-4 px-8 text-base w-full sm:w-auto group"
        >
          <span className="material-symbols-outlined text-[#b7f473] text-xl">lock_open</span>
          <span>Complete Checkout — $20</span>
          <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>

        <button
          onClick={() => onNavigate('home')}
          className="btn-ghost w-full sm:w-auto py-3.5 px-6"
        >
          Return to Overview
        </button>
      </div>
    </div>
  );
};
