import React from 'react';
import { ViewMode } from '../types';

interface PrivacyPolicyProps {
  onNavigate: (view: ViewMode) => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-0">
      <header className="mb-8 border-b border-[#173404]/10 pb-6">
        <div className="inline-flex items-center gap-2 font-mono-caps text-xs text-[#3e6a00] bg-[#173404]/5 px-3 py-1 rounded-full border border-[#173404]/10 mb-3">
          <span>PRIVACY & DATA SOVEREIGNTY</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#081d00] mb-2">Privacy Policy</h1>
        <p className="font-body text-sm text-[#43483e]">Effective Date: January 1, 2026</p>
      </header>

      <article className="space-y-8 max-w-3xl font-body text-sm sm:text-base text-[#43483e] leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-bold text-[#081d00] mb-3">1. Information Collection & Minimal Data Principle</h2>
          <p className="mb-3">
            At The Composure Method, privacy and anonymity are fundamental. We only collect the minimal information necessary to deliver your digital access:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Email Address:</strong> Used strictly to deliver digital access tokens, order receipts, and program updates.</li>
            <li><strong>Payment & Billing Data:</strong> Payment information is submitted directly to our PCI-compliant Merchant of Record, <strong>Polar.sh</strong>. We do NOT store or process your raw credit card numbers on our servers.</li>
            <li><strong>Local Application State:</strong> Interactive logs, pelvic timer progress, and journal notes remain stored locally in your browser.</li>
          </ul>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-[#173404]/10 shadow-xs space-y-3">
          <h2 className="font-display text-xl font-bold text-[#081d00] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#173404]">shield</span>
            <span>2. Payment Processing via Polar.sh</span>
          </h2>
          <p>
            When purchasing, your order is fulfilled through Polar Software Inc. (Polar.sh). Polar collects necessary transaction information in accordance with global financial and data protection standards (GDPR, CCPA).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-[#081d00] mb-3">3. Zero Spam & Strict Confidentiality</h2>
          <p>
            We strictly do NOT sell, rent, trade, or share your email address or personal details with any third-party advertisers. All communication is discrete and focused purely on program delivery.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-[#081d00] mb-3">4. Contacting Privacy Support</h2>
          <p>
            For any questions or data deletion requests, contact our privacy team at <a href="mailto:privacy@composuremethod.com" className="text-[#173404] font-bold underline">privacy@composuremethod.com</a>.
          </p>
        </section>
      </article>

      <div className="mt-12 pt-6 border-t border-[#173404]/10 flex justify-end">
        <button
          onClick={() => onNavigate('home')}
          className="bg-[#173404] text-white rounded-full font-mono-caps text-xs px-6 py-3 hover:bg-[#081d00] transition-colors flex items-center gap-2 cursor-pointer font-bold"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Return to Site</span>
        </button>
      </div>
    </div>
  );
};

