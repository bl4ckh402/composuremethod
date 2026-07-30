import React, { useState } from 'react';
import { Locale, useI18n } from '../lib/i18n';

const LOCALE_OPTIONS: { value: Locale; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
  { value: 'it', label: 'Italiano', flag: '🇮🇹' },
  { value: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const current = LOCALE_OPTIONS.find(o => o.value === locale) || LOCALE_OPTIONS[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 font-mono-caps text-[11px] text-[#52574c] hover:text-[#173404] transition-colors cursor-pointer bg-transparent border-none p-1"
        aria-label="Select language"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span className="material-symbols-outlined text-sm">expand_more</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-40 bg-[#fcf9f8] border border-[#173404]/10 rounded-xl shadow-xl z-50 py-1 animate-fadeIn">
            {LOCALE_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => { setLocale(opt.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 font-mono text-xs flex items-center gap-2 hover:bg-[#f0ebe3] transition-colors ${
                  locale === opt.value ? 'text-[#173404] font-bold' : 'text-[#43483e]'
                }`}
              >
                <span>{opt.flag}</span>
                <span>{opt.label}</span>
                {locale === opt.value && (
                  <span className="material-symbols-outlined text-sm ml-auto text-[#3e6a00]">check</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};