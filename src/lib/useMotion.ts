import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react';
import { prefersReducedMotion } from './env';

/**
 * Timeline engine for the animated phone screens.
 *
 * Elements opt in with `data-anim="<kind>"` plus optional `data-d` (start, ms),
 * `data-e` (end, ms, for `show`), `data-step` (stagger between siblings that
 * share kind+delay), `data-c="accent"` and `data-i` (index for drift).
 * Everything runs as Web Animations on compositor-friendly properties
 * (opacity, transform parts, filter), so loops never touch layout.
 */

const EASE = 'cubic-bezier(.16,1,.3,1)';
const REST = { opacity: 1, translate: '0px 0px', scale: '1', filter: 'blur(0px)' } as const;
type Pose = Partial<Record<keyof typeof REST, string | number>>;

const FROM: Record<string, Pose> = {
  up: { opacity: 0, translate: '0 28px', filter: 'blur(10px)' },
  down: { opacity: 0, translate: '0 -22px', filter: 'blur(8px)' },
  right: { opacity: 0, translate: '56px 0', filter: 'blur(8px)' },
  left: { opacity: 0, translate: '-24px 0', filter: 'blur(6px)' },
  pop: { opacity: 0, scale: '.55', filter: 'blur(6px)' },
  grow: { opacity: 0, scale: '.9', translate: '0 40px', filter: 'blur(14px)' },
};

function build(screen: HTMLElement, P: number): Animation[] {
  const out: Animation[] = [];
  const counters: Record<string, number> = {};
  const o = (x: number) => Math.min(Math.max(x / P, 0), 1);
  const loop = { duration: P, iterations: Infinity } as const;

  screen.querySelectorAll<HTMLElement>('[data-anim]').forEach((el) => {
    const ds = el.dataset;
    const k = ds.anim!;
    let d = +(ds.d || 0);
    const step = +(ds.step || 0);
    const key = `${k}:${d}`;
    const idx = (counters[key] = (counters[key] ?? -1) + 1);
    if (step) d += idx * step;
    const push = (kf: Keyframe[], opts: KeyframeAnimationOptions) => out.push(el.animate(kf, opts));

    const from = FROM[k];
    if (from) {
      const to: Pose = {};
      for (const p in from) to[p as keyof Pose] = REST[p as keyof typeof REST];
      const o1 = d / P;
      const o2 = Math.min((d + 1000) / P, 0.9);
      push(
        [
          { ...from, offset: 0 },
          { ...from, offset: o1, easing: EASE },
          { ...to, offset: o2 },
          { ...to, offset: 0.93, easing: 'cubic-bezier(.5,0,.75,0)' },
          { ...from, offset: 0.99 },
          { ...from, offset: 1 },
        ],
        loop,
      );
      return;
    }

    switch (k) {
      case 'show': {
        const e = +(ds.e || P);
        const hid = { opacity: 0, filter: 'blur(8px)' };
        const vis = { opacity: 1, filter: 'blur(0px)' };
        push(
          [
            { ...hid, offset: 0 },
            { ...hid, offset: o(d), easing: EASE },
            { ...vis, offset: o(d + 450) },
            { ...vis, offset: o(e), easing: 'ease-in' },
            { ...hid, offset: o(e + 400) },
            { ...hid, offset: 1 },
          ],
          loop,
        );
        break;
      }
      case 'word': {
        const fin = ds.c === 'accent' ? 'oklch(0.56 0.17 38)' : '#1f1a17';
        const hid = { opacity: 0, translate: '0 12px', filter: 'blur(8px)', color: 'rgba(31,26,23,.3)' };
        const on = { opacity: 1, translate: '0 0', filter: 'blur(0px)' };
        push(
          [
            { ...hid, offset: 0 },
            { ...hid, offset: o(d), easing: EASE },
            { ...on, color: 'rgba(31,26,23,.32)', offset: o(d + 280) },
            { ...on, color: fin, offset: o(d + 1100) },
            { ...on, color: fin, offset: 1 },
          ],
          loop,
        );
        break;
      }
      case 'typing':
        push(
          [
            { opacity: 0, scale: '.7', offset: 0 },
            { opacity: 0, scale: '.7', offset: d / P, easing: EASE },
            { opacity: 1, scale: '1', offset: (d + 350) / P },
            { opacity: 1, scale: '1', offset: (d + 800) / P },
            { opacity: 0, scale: '.9', offset: (d + 1000) / P },
            { opacity: 0, scale: '.7', offset: 1 },
          ],
          loop,
        );
        break;
      case 'spinfast':
        push([{ rotate: '0deg' }, { rotate: '360deg' }], { duration: 1200, iterations: Infinity });
        break;
      case 'spin':
        push([{ rotate: '0deg' }, { rotate: '360deg' }], { duration: 14000, iterations: Infinity });
        break;
      case 'calm':
        push([{ scale: '1', opacity: 0.5 }, { scale: '1.6', opacity: 1 }, { scale: '1', opacity: 0.5 }], {
          duration: 1200, iterations: Infinity, delay: -idx * 200, easing: 'ease-in-out',
        });
        break;
      case 'dot':
        push([{ translate: '0 0', opacity: 0.35 }, { translate: '0 -5px', opacity: 1 }, { translate: '0 0', opacity: 0.35 }], {
          duration: 800, iterations: Infinity, delay: (idx % 3) * 140, easing: 'ease-in-out',
        });
        break;
      case 'drift': {
        const i = +(ds.i || 0);
        const dir = i % 2 ? -1 : 1;
        push(
          [
            { translate: '0 0', scale: '1' },
            { translate: `${50 * dir}px ${60 * ((i % 3) - 1 || 1)}px`, scale: '1.2' },
            { translate: '0 0', scale: '1' },
          ],
          { duration: 11000 + i * 2500, iterations: Infinity, easing: 'ease-in-out' },
        );
        break;
      }
      case 'kenburns':
        push([{ scale: '1.16', translate: '3% 1%' }, { scale: '1', translate: '0 0' }], {
          duration: P, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out',
        });
        break;
      case 'ripple':
        push([{ scale: '.85', opacity: 0 }, { scale: '1', opacity: 1, offset: 0.25 }, { scale: '1.5', opacity: 0 }], {
          duration: 3200, iterations: Infinity, delay: -d, easing: 'ease-out',
        });
        break;
      case 'breathe':
        push([{ scale: '1' }, { scale: '1.06' }, { scale: '1' }], { duration: 3200, iterations: Infinity, easing: 'ease-in-out' });
        break;
      case 'bar':
        push([{ scale: '1 .3' }, { scale: '1 1.15' }, { scale: '1 .45' }, { scale: '1 .9' }, { scale: '1 .3' }], {
          duration: 1000 + (idx % 5) * 140, iterations: Infinity, delay: -idx * 85, easing: 'ease-in-out',
        });
        break;
      case 'float':
        push([{ translate: '0 0', rotate: '0deg' }, { translate: '0 -7px', rotate: `${idx % 2 ? -3 : 3}deg` }, { translate: '0 0', rotate: '0deg' }], {
          duration: 3200, iterations: Infinity, delay: -idx * 500, easing: 'ease-in-out',
        });
        break;
      case 'pulse':
        push([{ scale: '1', opacity: 1 }, { scale: '1.5', opacity: 0.5 }, { scale: '1', opacity: 1 }], {
          duration: 1200, iterations: Infinity, easing: 'ease-in-out',
        });
        break;
      case 'glow': {
        // The prototype animated box-shadow (a repaint every frame). This is a
        // disc behind the button that scales out instead: same look, GPU only.
        const w = el.offsetWidth || 44;
        push([{ scale: '1', opacity: 1 }, { scale: String((w + 36) / w), opacity: 0 }], {
          duration: 1800, iterations: Infinity, easing: 'ease-out',
        });
        break;
      }
    }
  });
  return out;
}

type Options = {
  /** Loop length in ms (9000 for most screens, 12000 for voice). */
  period: number;
  /** Run while true; paused (and cheap) while false. */
  playing: boolean;
  /** Bump to restart the timeline from 0. */
  epoch?: number;
  /** Where to freeze the timeline when the user prefers reduced motion. */
  restAt: number;
};

export function useMotion(ref: RefObject<HTMLElement | null>, { period, playing, epoch = 0, restAt }: Options) {
  const anims = useRef<Animation[]>([]);
  const reduced = prefersReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const list = build(el, period);
    anims.current = list;
    for (const a of list) {
      a.pause();
      if (reduced) a.currentTime = restAt;
    }
    return () => {
      for (const a of list) a.cancel();
      anims.current = [];
    };
  }, [ref, period, reduced, restAt]);

  useEffect(() => {
    if (reduced) return;
    for (const a of anims.current) a.currentTime = 0;
  }, [epoch, reduced]);

  useEffect(() => {
    if (reduced) return;
    for (const a of anims.current) {
      if (playing) a.play();
      else a.pause();
    }
  }, [playing, reduced, epoch]);
}
