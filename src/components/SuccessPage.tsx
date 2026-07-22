import React from 'react';
import { ViewMode } from '../types';

interface SuccessPageProps {
  userEmail?: string;
  onNavigate: (view: ViewMode) => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ userEmail, onNavigate }) => {
  const email = userEmail || localStorage.getItem('composure_user_email') || 'your email address';

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center animate-fadeIn">
      <div className="w-20 h-20 bg-[#b7f473] text-[#081d00] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-2 border-[#173404]/20">
        <span className="material-symbols-outlined text-4xl font-bold">check_circle</span>
      </div>

      <div className="inline-flex items-center gap-2 font-mono-caps text-xs text-[#3e6a00] bg-[#173404]/5 px-3.5 py-1.5 rounded-full border border-[#173404]/10 mb-4">
        <span className="w-2 h-2 rounded-full bg-[#3e6a00] animate-pulse"></span>
        <span>POLAR.SH ORDER CONFIRMED & VERIFIED</span>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#081d00] mb-3 tracking-tight">
        Welcome to The Composure Method
      </h1>

      <p className="font-body text-base text-[#333a2e] mb-8 max-w-lg mx-auto leading-relaxed">
        Your payment has been successfully processed by Polar.sh. We have dispatched your digital access token, 5 core modules, and 4 bonus playbooks directly to <strong className="text-[#081d00] underline">{email}</strong>.
      </p>

      {/* Digital Order Receipt Card */}
      <div className="bg-white border border-[#173404]/15 rounded-2xl p-6 mb-8 text-left shadow-xs max-w-md mx-auto space-y-3 font-mono text-xs">
        <div className="flex justify-between text-[#74796d]">
          <span>FULFILLMENT AGENT</span>
          <span className="text-[#081d00] font-bold">POLAR SOFTWARE INC.</span>
        </div>
        <div className="flex justify-between text-[#74796d]">
          <span>PRODUCT BUNDLE</span>
          <span className="text-[#081d00] font-bold">Composure Master System</span>
        </div>
        <div className="flex justify-between text-[#74796d]">
          <span>CREDIT CARD STATEMENT</span>
          <span className="text-[#081d00] font-bold">POLAR.SH*COMPOSURE</span>
        </div>
        <div className="flex justify-between text-[#74796d]">
          <span>DISPATCH STATUS</span>
          <span className="text-[#3e6a00] font-bold">DISPATCHED TO EMAIL</span>
        </div>
        <div className="flex justify-between border-t border-[#173404]/10 pt-3 font-bold text-[#081d00] text-sm">
          <span>AMOUNT BILLED</span>
          <span>$20.00 USD</span>
        </div>
      </div>

      {/* Direct Curriculum Access Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={() => {
            onNavigate('home');
            setTimeout(() => {
              const el = document.getElementById('curriculum');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="w-full sm:w-auto bg-[#173404] text-white font-display text-base font-bold px-8 py-4 rounded-2xl hover:bg-[#081d00] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 group"
        >
          <span>Access Your Digital Curriculum & Guides</span>
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </div>

      <p className="font-mono text-[11px] text-[#74796d] mt-6">
        Need assistance or customized access support? Contact <a href="mailto:support@composuremethod.com" className="underline font-bold text-[#173404]">support@composuremethod.com</a>
      </p>
    </div>
  );
};
