import React from 'react';

export const SelfQualification: React.FC = () => {
  return (
    <section className="py-12 md:py-16 space-y-10 border-t border-[#173404]/10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono-caps text-[#3e6a00] bg-[#b7f473]/30 px-3.5 py-1 rounded-full">
          DIRECT SELF-QUALIFICATION
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[#081d00] tracking-tight">
          Is The Composure Method Right For You?
        </h2>
        <p className="font-body text-sm md:text-base text-[#43483e] leading-relaxed">
          We designed this system specifically for men who value evidence-based physical & mental mastery over artificial quick fixes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* THIS IS FOR YOU IF */}
        <div className="bg-white p-8 rounded-3xl border border-emerald-300 shadow-sm space-y-6 relative overflow-hidden">
          <div className="flex items-center gap-3 border-b border-emerald-100 pb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
              ✓
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-[#081d00]">This IS For You If...</h3>
              <p className="font-mono-caps text-[11px] text-[#3e6a00]">THE IDEAL CANDIDATE</p>
            </div>
          </div>

          <ul className="space-y-4 font-body text-xs md:text-sm text-[#333a2e]">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-emerald-700 text-base shrink-0 mt-0.5">check_circle</span>
              <span><strong>You are a man age 30+</strong> experiencing faster-than-desired climax or elevated pre-intimacy anxiety.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-emerald-700 text-base shrink-0 mt-0.5">check_circle</span>
              <span><strong>You want a permanent physical skill</strong> you can retain for life without relying on sprays, creams, or pills.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-emerald-700 text-base shrink-0 mt-0.5">check_circle</span>
              <span><strong>You can dedicate 10 minutes a day</strong> to simple, discrete pelvic floor and parasympathetic breathing exercises.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-emerald-700 text-base shrink-0 mt-0.5">check_circle</span>
              <span><strong>You value discretion:</strong> You want a clean, private digital system you can access on your phone or laptop.</span>
            </li>
          </ul>
        </div>

        {/* THIS IS NOT FOR YOU IF */}
        <div className="bg-[#fcf9f8] p-8 rounded-3xl border border-red-200 shadow-sm space-y-6 relative overflow-hidden">
          <div className="flex items-center gap-3 border-b border-red-100 pb-4">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-800 flex items-center justify-center font-bold text-lg">
              ✕
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-[#081d00]">This IS NOT For You If...</h3>
              <p className="font-mono-caps text-[11px] text-red-700">UNSUITABLE CASES</p>
            </div>
          </div>

          <ul className="space-y-4 font-body text-xs md:text-sm text-[#43483e]">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-red-600 text-base shrink-0 mt-0.5">cancel</span>
              <span><strong>You want a magic overnight pill:</strong> This program retrains muscle memory and requires 4–8 weeks of consistency.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-red-600 text-base shrink-0 mt-0.5">cancel</span>
              <span><strong>You prefer numbing products:</strong> If you enjoy losing all physical sensation during intimacy, this is not for you.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-red-600 text-base shrink-0 mt-0.5">cancel</span>
              <span><strong>You are experiencing severe acute medical symptoms:</strong> Sudden pain, bleeding, or underlying prostate conditions require direct urologist care.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
