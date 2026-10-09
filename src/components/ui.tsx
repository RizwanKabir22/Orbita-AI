import type { CSSProperties, ReactNode } from 'react';
import { Icon } from './Icon';
import s from '../sections/cs.module.css';

/** Small spaced monospace label ("TYPEFACE", "COLOUR"…). */
export function Mono({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <span className={s.mono} style={style}>{children}</span>;
}

/** Section number + name in tangerine mono ("01 — The challenge"). */
export function Kicker({ children, dark, ...rest }: { children: ReactNode; dark?: boolean } & Record<`data-${string}`, string>) {
  return <div className={`${s.kicker} ${dark ? s.kickerDark : ''}`} {...rest}>{children}</div>;
}

/** Frosted caption that sits over a photo. */
export function GlassCaption({ icon, title, sub, big }: { icon: string; title: string; sub: string; big?: boolean }) {
  return (
    <div className={`${s.glassCap} ${big ? s.glassCapBig : ''}`}>
      <Icon d={icon} size={big ? 24 : 22} stroke="oklch(0.58 0.17 40)" width={1.6} />
      <div className={s.glassCapText}>
        <div className={s.glassCapTitle}>{title}</div>
        <div className={s.glassCapSub}>{sub}</div>
      </div>
    </div>
  );
}

/** Floating glass pill with a gradient icon disc (around the feature phones). */
export function FloatChip({ icon, from, to, children, style }: { icon: string; from: string; to: string; children: ReactNode; style: CSSProperties }) {
  return (
    <div data-float="" className={s.floatChip} style={style}>
      <div className={s.floatChipIcon} style={{ background: `linear-gradient(150deg, ${from}, ${to})` }}>
        <Icon d={icon} size={16} width={1.7} />
      </div>
      {children}
    </div>
  );
}

/** Icon tile + title + body row in the feature lists. */
export function FeatureItem({ icon, tint, title, children }: { icon: string; tint: string; title: string; children: ReactNode }) {
  return (
    <div className={s.featItem}>
      <div className={s.featIcon} style={{ background: tint }}><Icon d={icon} width={1.6} /></div>
      <div className={s.featText}><div className={s.featTitle}>{title}</div><div className={s.featBody}>{children}</div></div>
    </div>
  );
}
