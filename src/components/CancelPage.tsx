import React from 'react';
import { ViewMode } from '../types';

interface CancelPageProps {
  onNavigate: (view: ViewMode) => void;
  onOpenCheckout: () => void;
}

export const CancelPage: React.FC<CancelPageProps> = ({ onNavigate, onOpenCheckout }) => {
  return (
    <div className="max-w-xl mx-auto py-12 px-4 text-center animate-fadeIn">
      <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-200 shadow-xs">
        <span className="material-symbols-outlined text-3xl">shopping_cart_checkout</span>
      </div>

      <div className="inline-flex items-center gap-2 font-mono-caps text-xs text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 mb-4">
        <span>CHECKOUT INTERRUPTED</span>
      </div>

      <h1 className="font-display text-3xl font-bold text-[#081d00] mb-3">
        Your Order Was Not Completed
      </h1>

      <p className="font-body text-sm md:text-base text-[#43483e] mb-8 leading-relaxed max-w-md mx-auto">
        No charges were made to your card or account. Your special introductory price of <strong>$20.00 USD (Save $177)</strong> remains reserved for your current session.
      </p>

      <div className="bg-white border border-[#173404]/10 rounded-2xl p-6 mb-8 text-left space-y-3 shadow-xs">
        <h3 className="font-display font-bold text-sm text-[#081d00] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#3e6a00] text-base">verified</span>
          <span>What's waiting in your reserved bundle:</span>
        </h3>
        <ul className="font-body text-xs text-[#43483e] space-y-2">
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3e6a00] text-sm">check</span>
            <span>Modules 1–5 Core Physiological Mastery Guide</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3e6a00] text-sm">check</span>
            <span>Bonus #1: "Tonight" 5-Step In-Bed Quick Reference Protocol</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3e6a00] text-sm">check</span>
            <span>Bonus #2: Word-for-Word Partner Communication Playbook</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3e6a00] text-sm">check</span>
            <span>Bonus #3 & #4: 30/60/90 Day Practice Log & AI Personalizer</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onOpenCheckout}
          className="w-full sm:w-auto bg-[#173404] text-white font-display text-base font-bold px-8 py-3.5 rounded-2xl hover:bg-[#081d00] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
        >
          <span>Complete Checkout — $20</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>

        <button
          onClick={() => onNavigate('home')}
          className="w-full sm:w-auto bg-[#f0ebe3] text-[#173404] font-mono-caps text-xs font-bold px-6 py-3.5 rounded-2xl hover:bg-[#e2dbcf] transition-all cursor-pointer"
        >
          Return to Overview
        </button>
      </div>
    </div>
  );
};
