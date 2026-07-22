import React from 'react';
import { IMAGES } from '../data/initialData';

export const TestimonialQuote: React.FC = () => {
  return (
    <section className="py-12 my-8 bg-[#f6f3f2] rounded-3xl p-8 md:p-16 border-botanical flex flex-col items-center text-center relative overflow-hidden shadow-sm">
      {/* Quote Symbol */}
      <span className="material-symbols-outlined text-[#081d00] text-5xl mb-6 opacity-20" style={{ fontVariationSettings: "'FILL' 1" }}>
        format_quote
      </span>

      {/* Quote text */}
      <blockquote className="font-display text-xl md:text-2xl text-[#081d00] max-w-3xl leading-relaxed italic mb-8">
        "In an era defined by constant noise, the ComposureMethod provided the architecture I needed to rebuild my focus. It is not just wellness; it is a tactical advantage."
      </blockquote>

      {/* Author Card */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full border-botanical overflow-hidden bg-white shadow-sm shrink-0">
          <img
            src={IMAGES.executiveAvatar}
            alt="Elena Rostova"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="text-left">
          <div className="font-mono-caps text-xs text-[#081d00] font-bold">Elena Rostova</div>
          <div className="font-mono-caps text-xs text-[#43483e]">CEO, Apex Dynamics</div>
        </div>
      </div>
    </section>
  );
};
