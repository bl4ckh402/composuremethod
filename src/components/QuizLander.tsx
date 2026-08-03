import React from "react";
import RingMotif from "./RingMotif";
import { track } from "../lib/mixpanel";

export default function QuizLander({ onStartQuiz }) {
  const handleStart = () => {
    track("quiz_started", {
      source: "quiz_lander",
      url: typeof window !== "undefined" ? window.location.href : undefined,
    });
    onStartQuiz();
  };

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const section = target.closest('section')?.getAttribute('id') || target.closest('header')?.tagName.toLowerCase() || target.closest('footer')?.tagName.toLowerCase() || 'unknown';
      track('quiz_lander_click', {
        element_tag: target.tagName.toLowerCase(),
        element_text: (target.textContent || '').trim().slice(0, 120),
        element_id: target.id || null,
        element_classes: target.className || null,
        section,
        page: 'quiz_lander',
      });
    };
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const sections = Array.from(document.querySelectorAll('section'));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target as HTMLElement;
            const id = section.getAttribute('id') || section.getAttribute('data-section') || 'unknown';
            track('quiz_lander_section_viewed', {
              section_id: id,
              section_heading: section.querySelector('h1, h2, h3')?.textContent?.trim()?.slice(0, 120) || null,
              page: 'quiz_lander',
            });
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const startTime = Date.now();
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') {
        const scrollDepth = Math.round(
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        track('quiz_lander_exited', {
          time_on_page_seconds: Math.round((Date.now() - startTime) / 1000),
          scroll_depth_percent: isFinite(scrollDepth) ? scrollDepth : 0,
          page: 'quiz_lander',
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);
  return (
    <div className="min-h-screen bg-cream text-ink font-body">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-2.5">
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <circle cx="13" cy="13" r="13" fill="var(--color-mid)" />
            <line x1="6" y1="13" x2="20" y2="13" stroke="var(--color-sage)" strokeWidth="1.6" />
            <circle cx="13" cy="13" r="1.6" fill="var(--color-sage)" />
          </svg>
          <span className="font-display text-lg text-forest">composure</span>
        </div>
        <button
          onClick={handleStart}
          className="hidden sm:inline-flex items-center rounded-full border border-forest/15 px-4 py-2 text-sm font-medium text-forest hover:border-forest/40 transition-colors"
        >
          Take the assessment
        </button>
      </header>

      {/* Hero */}
      <section id="hero" data-section="hero" className="relative overflow-hidden bg-forest px-6 py-16 text-center sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[140%] -translate-x-1/2 -translate-y-1/2 sm:w-[85%]">
          <RingMotif className="h-full w-full" tone="light" />
        </div>

        <div className="relative">
          <p className="mb-4 text-sm font-medium tracking-wide text-light">
            steady. in control. together.
          </p>
          <h1 className="font-display text-[clamp(2.1rem,8vw,3.75rem)] leading-[1.08] text-cream">
            Last longer in Bed
            <br className="hidden sm:block" /> with Just 5 Minutes a Day
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white sm:text-base">
            A private, step-by-step path to lasting control, confidence, and
            connection — built for men 30 and older.
          </p>

          <button
            onClick={handleStart}
            className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-full bg-amber px-7 py-4 text-[15px] font-bold text-forest shadow-lg shadow-black/30 transition-transform active:scale-[0.98] hover:bg-amber-light sm:text-base"
          >
            Take the 60-second assessment
          </button>
          <p className="mt-3 text-xs text-sage/70">
            Private &middot; no account needed &middot; get a plan for your situation
          </p>
        </div>
      </section>

      {/* Normalize */}
      <section id="normalize" data-section="normalize" className="bg-sage px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-lg italic text-dark sm:text-xl">
            "It's more common — and more fixable — than it feels."
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Most guys never bring this up to anyone, which is usually what
            keeps it feeling bigger than it is. Anxiety and arousal share the
            same nervous-system wiring — which means this responds to
            training, not just willpower.
          </p>
        </div>
      </section>

      {/* How it works — full width arc */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mb-12 text-center">
          <h2 className="font-display text-2xl text-forest sm:text-3xl">The arc</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-ink/60 sm:text-base">
            One guide, three stages, in order.
          </p>
        </div>

        <div className="relative flex flex-col gap-10 sm:flex-row sm:gap-6">
          <div className="absolute left-[27px] top-0 h-full w-px bg-mid/25 sm:left-0 sm:top-[27px] sm:h-px sm:w-full" />

          {[
            {
              title: "Understand it",
              copy: "Why this happens, starting in your 30s — and why it isn't about masculinity or willpower.",
            },
            {
              title: "Build the toolkit",
              copy: "Pelvic floor training, breathing, and arousal awareness — practiced solo before it matters.",
            },
            {
              title: "Make it stick",
              copy: "A 30/60/90-day structure so progress compounds instead of fading after week one.",
            },
          ].map((step) => (
            <div key={step.title} className="relative flex flex-1 gap-4 sm:flex-col sm:gap-3">
              <div className="relative z-10 flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-cream ring-1 ring-mid/25">
                <RingMotif className="h-8 w-8" tone="dark" />
              </div>
              <div className="pt-1 sm:pt-2">
                <h3 className="font-display text-lg text-forest">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">{step.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-forest px-6 py-10 sm:py-12">
        <div className="flex flex-col gap-6 text-center sm:flex-row sm:justify-between sm:gap-4 sm:text-left">
          {[
            "Delivered as a private download",
            "No recurring charges, ever",
            "Nothing awkward on your statement",
          ].map((line) => (
            <p key={line} className="flex items-center justify-center gap-2 text-sm text-sage sm:justify-start">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-light" aria-hidden="true" />
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section id="start-quiz-section" className="px-6 py-16 text-center sm:py-24">
        <h2 className="font-display text-2xl text-forest sm:text-3xl">
          Ready to see your plan?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-ink/70 sm:text-base">
          Sixty seconds, a few questions, a plan built around your answers.
        </p>
        <button
          onClick={handleStart}
          className="mt-7 inline-flex min-h-[44px] items-center justify-center rounded-full bg-amber px-7 py-4 text-[15px] font-bold text-forest shadow-lg shadow-black/30 transition-transform active:scale-[0.98] hover:bg-amber-light sm:text-base"
        >
          Take the 60-second assessment
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-forest/10 px-6 py-8 text-center">
        <p className="font-display text-sm text-forest">composuremethod.help</p>
        <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-ink/50">
          Educational content, not medical advice. If symptoms are new or
          sudden, or come with pain, talk with a doctor.
        </p>
      </footer>
    </div>
  );
}
