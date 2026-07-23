import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import lt from '../assets/images/lt.png';
import { COPY } from '../lib/brand';

gsap.registerPlugin(ScrollTrigger);

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

  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 0, scale: 1 },
        {
          y: 60,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, imageRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-bg pt-24 pb-20 md:pt-32 md:pb-28 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="space-y-5">
              <h1 className="font-display text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-bold text-[#081d00] tracking-tight leading-[1.08]">
                {COPY.heroHeadline}
              </h1>
              <p className="font-body text-base md:text-lg text-[#43483e] max-w-xl leading-relaxed mx-auto lg:mx-0">
                {COPY.heroSubtext}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                id="hero-cta-btn"
                onClick={handlePrimaryClick}
                className="btn-primary text-base md:text-lg py-4 px-10"
              >
                <span className="material-symbols-outlined text-[#b7f473] text-xl">lock_open</span>
                <span>{isMemberVerified ? 'Access Member Curriculum' : COPY.ctaPrimary}</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#52574c]">
                <span className="material-symbols-outlined text-sm text-[#3e6a00]">verified_user</span>
                30-Day Money-Back Guarantee
              </span>
              <span className="text-[#ccc]">|</span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#52574c]">
                <span className="material-symbols-outlined text-sm text-[#3e6a00]">lock</span>
                Discreet Billing
              </span>
              <span className="text-[#ccc]">|</span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#52574c]">
                <span className="material-symbols-outlined text-sm text-[#3e6a00]">bolt</span>
                Instant Digital Delivery
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 relative w-full">
            <div
              ref={imageRef}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#173404]/10 bg-white will-change-transform"
            >
              <div className="aspect-video">
                <img
                  src={lt}
                  alt="The Composure Method Digital Bundle"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#081d00]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#b7f473] text-[#081d00] px-3 py-1.5 rounded-full font-display font-bold text-sm shadow-lg">
                  $20 USD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
