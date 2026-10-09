import { useLayoutEffect, useRef, type RefObject } from 'react';
import { TopBar, Hero } from './sections/Hero';
import { Brief, Marquee, Mockups, Challenge, Principles } from './sections/Story';
import { MobileIntro, MobileFeatures, People } from './sections/Mobile';
import { DesignSystem } from './sections/DesignSystem';
import { DarkMode, Flow, Closing } from './sections/Closing';
import { prefersReducedMotion } from './lib/env';

const DESIGN_W = 1440;
const TOP_H = 98;

/**
 * ≥1024px: the 1440px design is zoomed to the window (CSS `zoom`, so layout,
 * hit-testing and scroll height stay correct). Below that the page reflows.
 * The hero always fits both devices into the first screen.
 */
function useFit(page: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const fit = () => {
      raf = 0;
      const w = root.clientWidth;
      const vh = window.innerHeight;
      const wide = w >= 1024;
      const z = wide ? Math.min(1, w / DESIGN_W) : 1;
      if (page.current) page.current.style.zoom = z === 1 ? '' : String(z);
      root.style.setProperty('--z', String(z));
      if (wide) {
        const h = vh / z - TOP_H;
        root.style.setProperty('--hero-h', `${Math.round(h)}px`);
        root.style.setProperty('--hero-s', String(Math.min(1, (h - 48) / 690)));
      } else {
        root.style.setProperty('--hero-s', String(Math.min(1, (w - 56) / 1237)));
      }
      root.style.setProperty('--phone-z', String(Math.min(1, (w - 40) / 329)));
    };
    const onResize = () => { if (!raf) raf = requestAnimationFrame(fit); };
    fit();
    window.addEventListener('resize', onResize, { passive: true });
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); };
  }, [page]);
}

/** Scroll reveals, staggered ambient floats, and pausing loops that are off-screen. */
function useAmbient() {
  useLayoutEffect(() => {
    document.querySelectorAll<HTMLElement>('[data-float]').forEach((el, i) => {
      el.style.setProperty('--fi', String(i));
      el.style.setProperty('--fdir', i % 2 ? '-1' : '1');
    });

    const reveal = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        (e.target as HTMLElement).dataset.reveal = 'in';
        reveal.unobserve(e.target);
      }
    }, { threshold: 0.12 });
    if (!prefersReducedMotion()) {
      const fold = window.innerHeight * 0.9;
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top > fold) {
          // Blurring a huge layer in is the single most expensive thing on
          // scroll; big blocks rise and fade, smaller ones also de-blur.
          el.dataset.reveal = r.width * r.height > 360_000 ? 'pending-lg' : 'pending';
          reveal.observe(el);
        }
      });
    }

    const pause = new IntersectionObserver((entries) => {
      for (const e of entries) (e.target as HTMLElement).toggleAttribute('data-off', !e.isIntersecting);
    }, { rootMargin: '120px 0px' });
    document.querySelectorAll('section').forEach((el) => pause.observe(el));
    const track = document.querySelector('[data-marquee]');
    if (track?.parentElement) pause.observe(track.parentElement);

    return () => { reveal.disconnect(); pause.disconnect(); };
  }, []);
}

export function App() {
  const page = useRef<HTMLDivElement>(null);
  useFit(page);
  useAmbient();
  return (
    <div ref={page} className="page">
      <TopBar />
      <Hero />
      <Brief />
      <Marquee />
      <Mockups />
      <Challenge />
      <Principles />
      <MobileIntro />
      <MobileFeatures />
      <People />
      <DesignSystem />
      <DarkMode />
      <Flow />
      <Closing />
    </div>
  );
}
