import React from 'react';
import { ViewMode } from '../types';

interface TermsOfServiceProps {
  onNavigate: (view: ViewMode) => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-0">
      <header className="mb-8 border-b border-[#173404]/10 pb-6">
        <div className="inline-flex items-center gap-2 font-mono-caps text-xs text-[#3e6a00] bg-[#173404]/5 px-3 py-1 rounded-full border border-[#173404]/10 mb-3">
          <span>LEGAL & COMPLIANCE</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#081d00] mb-2">Terms of Service</h1>
        <p className="font-body text-sm text-[#43483e]">Effective Date: January 1, 2026</p>
      </header>

      <article className="space-y-8 max-w-3xl font-body text-sm sm:text-base text-[#43483e] leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-bold text-[#081d00] mb-3">1. Acceptance of Terms</h2>
          <p className="mb-3">
            By accessing or purchasing "The Composure Method: Pre-Ejaculation" (the "Product" or "Services"), you agree to be legally bound by these Terms of Service.
          </p>
          <p>
            These terms govern your digital purchase and access to our 5 core modules, breathing audio tools, pelvic conditioning programs, and partner communication playbooks.
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl border border-[#173404]/10 shadow-xs space-y-3">
          <h2 className="font-display text-xl font-bold text-[#081d00] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#173404]">credit_card</span>
            <span>2. Orders & Merchant of Record (Polar.sh)</span>
          </h2>
          <p>
            All financial transactions, checkout sessions, and order fulfillments are processed through our Merchant of Record partner, <strong>Polar Software Inc. (Polar.sh)</strong>.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm">
            <li>Polar.sh handles secure payment processing, tax compliance, and PCI-compliant encryption.</li>
            <li>Charges will appear discreetly on your credit card statement as <strong>"POLAR.SH*COMPOSURE"</strong> or <strong>"CM DIGITAL"</strong>.</li>
            <li>Purchases provide lifetime personal digital access to the materials.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-[#081d00] mb-3">3. 30-Day Money-Back Guarantee</h2>
          <p className="mb-3">
            We stand fully behind the physiological effectiveness of the Composure Method framework:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>If you do not see measurable improvements in arousal regulation within 30 days, you are entitled to a 100% full refund.</li>
            <li>Refund requests can be initiated directly through Polar receipt emails or by contacting <a href="mailto:support@composuremethod.com" className="text-[#173404] font-bold underline">support@composuremethod.com</a>.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-[#081d00] mb-3">4. Intellectual Property</h2>
          <p>
            All text, diagrams, audio breathwork, pelvic training guides, and partner communication scripts are protected under copyright law © 2026. Materials are provided solely for personal, non-commercial use.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-[#081d00] mb-3">5. Disclaimer</h2>
          <p>
            The Composure Method is an educational somatic wellness and neuromuscular training program. It does not constitute medical advice or substitute for consultation with a licensed physician or urologist.
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

