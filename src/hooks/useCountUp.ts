import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useCountUp(target: number, duration = 1.4, options: { suffix?: string; prefix?: string; decimals?: number } = {}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { suffix = '', prefix = '', decimals = 0 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const obj = { value: 0 };
      gsap.to(obj, {
        value: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${obj.value.toFixed(decimals)}${suffix}`;
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [target, duration, suffix, prefix, decimals]);

  return ref;
}
