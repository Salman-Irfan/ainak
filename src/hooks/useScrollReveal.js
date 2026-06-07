// hooks/useScrollReveal.js
// Usage: const ref = useScrollReveal(delay?)
// Attach the ref to any element — it fades up into view when it enters the viewport.
// The element must start with: opacity-0 translate-y-8 transition-all duration-700

'use client';

import { useEffect, useRef } from 'react';

export function useScrollReveal(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}
