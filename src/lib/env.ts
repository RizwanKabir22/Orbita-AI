import { useEffect, useState, type RefObject } from 'react';

const rm = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

export const prefersReducedMotion = () => !!rm?.matches;

/** True while the element is within `margin` of the viewport and the tab is visible. */
export function useInView(ref: RefObject<Element | null>, margin = '200px') {
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(() => typeof document === 'undefined' || !document.hidden);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);

  useEffect(() => {
    const on = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', on);
    return () => document.removeEventListener('visibilitychange', on);
  }, []);

  return inView && visible;
}
