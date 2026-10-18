import { useCallback, useEffect, useRef, useState } from 'react';
import { Scaled } from './Scaled';
import { DesktopApp } from '../screens/DesktopApp';
import { PHONES, type PhoneKind } from '../screens/PhoneScreens';
import { useInView, prefersReducedMotion } from '../lib/env';
import s from './Devices.module.css';

/** Live desktop app in a soft-black outline (hero), paired with HeroPhone. */
export function HeroDesktop() {
  return (
    <div className={s.deskFrame}>
      <div className={s.deskBezel}>
        <Scaled w={1440} h={920} className={s.deskScreen}>
          <div data-mock inert><DesktopApp /></div>
        </Scaled>
      </div>
    </div>
  );
}

/** Live dark desktop app in a hairline glass frame. */
export function DarkDesktop() {
  return (
    <div className={s.darkFrame}>
      <Scaled w={1440} h={920} className={s.darkScreen}>
        <div data-mock inert><DesktopApp theme="dark" /></div>
      </Scaled>
    </div>
  );
}

/** One animated phone in the thin outline, used by the three feature rows. */
export function FeaturePhone({ kind }: { kind: PhoneKind }) {
  const ref = useRef<HTMLDivElement>(null);
  const playing = useInView(ref, '0px');
  const Phone = PHONES[kind];
  return (
    <div ref={ref} className={s.phoneBox}>
      <Scaled w={396} h={850} innerStyle={{ borderRadius: 52, overflow: 'hidden', clipPath: 'inset(0 round 52px)' }}>
        <div data-mock inert><Phone playing={playing} /></div>
      </Scaled>
    </div>
  );
}

const ORDER: PhoneKind[] = ['library', 'conversation', 'voice'];
const SWITCH_EVERY = 9000;
const EASE = 'cubic-bezier(.7,0,.2,1)';

/**
 * Hero iPhone: cycles Library → Conversation → Voice. The next screen opens as
 * a circle growing from the nav button and sharpens from blur while the old
 * one recedes; each screen restarts its own loop as it arrives.
 */
export function HeroPhone() {
  const box = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const glow = useRef<HTMLDivElement>(null);
  const inView = useInView(box, '0px');
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState(-1);
  const [epochs, setEpochs] = useState([0, 0, 0]);

  const current = useRef(0);

  const next = useCallback(() => {
    const cur = current.current;
    const ni = (cur + 1) % ORDER.length;
    const a = slides.current[cur], b = slides.current[ni];
    if (!a || !b) return;
    current.current = ni;
    slides.current.forEach((el, i) => {
      if (!el) return;
      el.style.zIndex = i === ni ? '2' : i === cur ? '1' : '0';
      el.style.visibility = i === ni || i === cur ? 'visible' : 'hidden';
    });
    b.style.opacity = '1';
    setEpochs((e) => e.map((v, i) => (i === ni ? v + 1 : v)));
    setActive(ni);

    const settle = () => {
      a.style.opacity = '0';
      a.style.visibility = 'hidden';
      setLeaving(-1);
    };
    if (prefersReducedMotion()) return settle();

    setLeaving(cur);
    const opts = { duration: 1100, easing: EASE, fill: 'forwards' as const };
    const out = a.animate([
      { transform: 'scale(1)', filter: 'blur(0px) brightness(1)' },
      { transform: 'scale(.92)', filter: 'blur(6px) brightness(.96)' },
    ], opts);
    const inn = b.animate([
      { clipPath: 'circle(0% at 50% 92%)', transform: 'scale(1.12)', filter: 'blur(10px)' },
      { clipPath: 'circle(140% at 50% 92%)', transform: 'scale(1)', filter: 'blur(0px)' },
    ], opts);
    glow.current?.animate([{ opacity: 0 }, { opacity: 1, offset: 0.35 }, { opacity: 0 }], { duration: 1300, easing: 'ease-out' });
    inn.finished.then(() => {
      // Drop the filter/clip layers once settled so the idle phone is cheap.
      out.cancel();
      inn.cancel();
      settle();
    }, () => {});
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(next, SWITCH_EVERY);
    return () => clearInterval(t);
  }, [inView, next]);

  return (
    <div ref={box} className={s.iphone}>
      <div className={s.iphoneScreen}>
        {ORDER.map((k, i) => {
          const Phone = PHONES[k];
          return (
            <div
              key={k}
              ref={(el) => { slides.current[i] = el; }}
              className={s.slide}
              style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? 'visible' : 'hidden' }}
            >
              <Scaled w={390} h={844}>
                <div data-mock inert>
                  <Phone bare playing={inView && (i === active || i === leaving)} epoch={epochs[i]} />
                </div>
              </Scaled>
            </div>
          );
        })}
        <div ref={glow} className={s.heroGlow} />
        {/* Hardware stays put while the screens change underneath it. */}
        <div className={s.island} />
        <div className={s.homeBar} />
      </div>
      <div className={s.dots} aria-hidden="true">
        {ORDER.map((k, i) => <div key={k} className={`${s.dot} ${i === active ? s.dotOn : ''}`} />)}
      </div>
    </div>
  );
}
