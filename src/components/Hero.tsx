import React from 'react';
import heroBundleImg from '../assets/images/composure_hero_bundle_1784675960820.jpg';

interface HeroProps {
  onOpenCheckout: () => void;
  isMemberVerified?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckout, isMemberVerified = false }) => {
  const handlePrimaryClick = () => {
    if (isMemberVerified) {
      const el = document.getElementById('curriculum');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenCheckout();
    }
  };
  return (
    <section className="pt-6 pb-10 md:py-12 space-y-8">
      {/* Top Rating Pill */}
      <div className="flex items-center justify-center sm:justify-start gap-2.5 bg-[#b7f473]/30 border border-[#173404]/15 px-4 py-1.5 rounded-full w-fit mx-auto sm:mx-0">
        <div className="flex text-amber-500 text-xs">
          {"★".repeat(5)}
        </div>
        <span className="font-mono-caps text-xs text-[#081d00] font-bold">
          4.9 / 5 Rating
        </span>
        <span className="text-xs text-[#43483e] font-body hidden sm:inline">
          • 12,400+ Verified Men Trained
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Direct, High-Converting Hero Messaging */}
        <div className="lg:col-span-7 space-y-5 text-center sm:text-left">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#081d00] tracking-tight leading-[1.1]">
            Master Pre-Ejaculation Control & Build Lasting Stamina.
          </h1>

          <p className="font-body text-base md:text-lg text-[#333a2e] max-w-xl leading-relaxed">
            <strong className="text-[#081d00]">Overcome premature ejaculation naturally.</strong> No numbing sprays, pills, or awkward tricks. Retrain your autonomic nervous system with our proven neuromuscular pelvic & arousal control framework.
          </p>

          {/* Streamlined Key Highlights */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-left justify-center sm:justify-start font-body text-xs md:text-sm text-[#081d00]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3e6a00] text-base shrink-0">check_circle</span>
              <span>Arousal Scale Regulation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3e6a00] text-base shrink-0">check_circle</span>
              <span>In-Bed 5-Step Protocol</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#3e6a00] text-base shrink-0">check_circle</span>
              <span>Partner Script Playbook</span>
            </div>
          </div>

          {/* Primary CTA Block */}
          <div className="pt-3 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handlePrimaryClick}
                className="bg-[#173404] text-white font-display text-base md:text-lg font-bold px-8 py-4 rounded-2xl hover:bg-[#081d00] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2.5 group"
              >
                <span>{isMemberVerified ? 'Access Member Curriculum' : 'Get Instant Access — $20'}</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>

              <div className="flex flex-col justify-center text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  {isMemberVerified ? (
                    <span className="bg-[#b7f473] text-[#081d00] font-mono-caps font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#081d00] animate-pulse"></span>
                      <span>LIFETIME MEMBER UNLOCKED</span>
                    </span>
                  ) : (
                    <>
                      <span className="line-through text-gray-400 font-mono text-sm">$197</span>
                      <span className="bg-[#b7f473]/50 text-[#081d00] font-mono-caps font-bold text-xs px-2.5 py-0.5 rounded-full">
                        SPECIAL $20 OFFER
                      </span>
                    </>
                  )}
                </div>
                <span className="text-[11px] font-mono text-[#74796d] mt-0.5">
                  {isMemberVerified ? '5 Core Modules & 4 Bonuses Active' : 'Save $177 Today • Lifetime Access'}
                </span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 font-mono text-[11px] text-[#52574c]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#3e6a00]">verified_user</span>
                30-Day Money-Back Guarantee
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#3e6a00]">lock</span>
                Discreet Billing ("CM DIGITAL")
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Sleek Product Bundle Mockup Image & Floating Card */}
        <div className="lg:col-span-5 relative">
          <div className="bg-white p-3 rounded-3xl border border-[#173404]/15 shadow-xl space-y-4 overflow-hidden relative group">
            {/* High Quality Rendered Bundle Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#173404]">
              <img
                src={heroBundleImg}
                alt="The Composure Method Digital Bundle Mockup"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081d00]/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between font-mono-caps text-xs">
                <span className="bg-[#173404]/80 backdrop-blur-md px-3 py-1 rounded-full text-[#b7f473] font-bold border border-white/10">
                  5 MODULES + 4 BONUSES
                </span>
                <span className="bg-[#b7f473] text-[#081d00] px-3 py-1 rounded-full font-bold">
                  $20 USD
                </span>
              </div>
            </div>

            {/* Bundle Caption & Action */}
            <div className="p-2 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#081d00]">
                    The Complete Composure Bundle
                  </h3>
                  <p className="font-body text-xs text-[#43483e]">
                    Instant access across mobile, tablet, & desktop.
                  </p>
                </div>
              </div>

              <button
                onClick={handlePrimaryClick}
                className="w-full bg-[#173404] text-white hover:bg-[#081d00] font-mono-caps text-xs font-bold py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isMemberVerified ? 'Access Unlocked Curriculum' : 'Claim Complete Bundle for $20 (Worth $197)'}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

