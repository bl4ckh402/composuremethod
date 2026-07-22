import React, { useState } from 'react';
import { PARTNER_SCRIPTS } from '../data/guideData';

export const PartnerScriptsAccordion: React.FC = () => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2500);
  };

  return (
    <div className="my-6 p-6 md:p-8 bg-white rounded-2xl border border-[#173404]/10 shadow-sm space-y-6">
      <div className="border-b border-[#173404]/10 pb-4">
        <span className="text-xs font-mono-caps text-[#3e6a00] bg-[#b7f473]/30 px-3 py-1 rounded-full">
          BONUS ASSET B · PARTNER SCRIPTS
        </span>
        <h4 className="font-display text-xl font-bold text-[#081d00] mt-2">
          Partner Communication Scripts
        </h4>
        <p className="font-body text-xs text-[#43483e] mt-1">
          Low-stakes, shame-free frameworks for opening conversations with a partner.
        </p>
      </div>

      <div className="space-y-4">
        {PARTNER_SCRIPTS.map((item, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-[#fcf9f8] border border-[#173404]/10 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono-caps text-xs text-[#3e6a00] font-bold bg-[#b7f473]/20 px-2.5 py-0.5 rounded">
                {item.category}
              </span>
              <span className="font-body text-xs text-[#74796d] italic">
                Situation: {item.situation}
              </span>
            </div>

            <p className="font-body text-sm text-[#081d00] font-medium leading-relaxed bg-white p-4 rounded-lg border border-[#173404]/5">
              {item.script}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => handleCopy(item.script, idx)}
                className="inline-flex items-center gap-1.5 font-mono-caps text-xs text-[#173404] hover:text-[#081d00] bg-white border border-[#173404]/20 px-4 py-2 rounded-full transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">
                  {copiedIdx === idx ? 'check' : 'content_copy'}
                </span>
                <span>{copiedIdx === idx ? 'Copied to Clipboard' : 'Copy Script'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
