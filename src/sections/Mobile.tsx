import type { CSSProperties, ReactNode } from 'react';
import { FeaturePhone } from '../components/Devices';
import { FeatureItem, FloatChip, GlassCaption, Kicker } from '../components/ui';
import { Icon } from '../components/Icon';
import type { PhoneKind } from '../screens/PhoneScreens';
import { ic } from '../lib/icons';
import { img } from '../assets';
import s from './cs.module.css';

const PEACH: [string, string] = ['oklch(0.78 0.14 50)', 'oklch(0.66 0.19 28)'];
const ROSE: [string, string] = ['oklch(0.72 0.14 340)', 'oklch(0.6 0.16 310)'];
const MINT: [string, string] = ['oklch(0.76 0.14 150)', 'oklch(0.62 0.13 170)'];
const T_PEACH = 'oklch(0.95 0.04 55)', T_LILAC = 'oklch(0.95 0.03 300)', T_MINT = 'oklch(0.95 0.04 150)';

type Chip = { icon: string; c: [string, string]; label: string; at: CSSProperties };
type Feature = {
  label: string; kind: PhoneKind; n: string; name: string; glow: string; flip?: boolean;
  title: ReactNode; body: string; chips: [Chip, Chip]; items: [string, string, string, string][];
};

const FEATURES: Feature[] = [
  {
    label: '03a Library', kind: 'library', n: '01', name: 'Library', glow: 'oklch(0.86 0.1 55 / .8)',
    title: <>Everything you made, <b>in one calm place.</b></>,
    body: 'Images, research and voice notes collect into a single library, grouped by day so yesterday’s thinking is never more than a glance away.',
    chips: [
      { icon: ic.Gallery, c: PEACH, label: '6 renders today', at: { left: '4%', top: 190 } },
      { icon: ic.Clock, c: ROSE, label: 'Synced 2 min ago', at: { right: '2%', bottom: 200 } },
    ],
    items: [
      [ic.Gallery, T_PEACH, 'Visual first', 'Generated images lead each card, with the prompt in a glass caption.'],
      [ic.Clock, T_LILAC, 'Grouped by day', 'Today, Yesterday and earlier, the way people remember things.'],
      [ic.SearchNormal1, T_MINT, 'One tap to resume', 'Every card reopens the exact thread it came from.'],
    ],
  },
  {
    label: '03b Conversation', kind: 'conversation', n: '02', name: 'Conversation', glow: 'oklch(0.87 0.08 345 / .75)', flip: true,
    title: <>Answers that <b>do the reading for you.</b></>,
    body: 'Drop in two contracts and ask what changed. Orbita reads every page, then replies with the three things that matter and the next step to take.',
    chips: [
      { icon: ic.DocumentText, c: ROSE, label: '42 pages read in 6s', at: { right: '3%', top: 210 } },
      { icon: ic.MagicStar, c: PEACH, label: '3 changes flagged', at: { left: '3%', bottom: 230 } },
    ],
    items: [
      [ic.DocumentText, T_LILAC, 'Reads your files', 'PDFs, docs and notes, attached straight from the chat.'],
      [ic.MagicStar, T_PEACH, 'Short, structured replies', 'Numbered findings instead of walls of text.'],
      [ic.Calendar1, T_MINT, 'Actions, not just answers', 'Set the reminder or draft the reply in one tap.'],
    ],
  },
  {
    label: '03c Voice', kind: 'voice', n: '03', name: 'Voice mode', glow: 'oklch(0.86 0.1 40 / .8)',
    title: <>Say it once. <b>Watch it happen.</b></>,
    body: 'Voice mode shows its work. Your words appear as you speak, key details light up, and you see each action land before Orbita says it’s done.',
    chips: [
      { icon: ic.Microphone2, c: PEACH, label: 'Listening…', at: { left: '5%', top: 170 } },
      { icon: ic.Calendar1, c: MINT, label: 'Moved to Thu, 3:00 PM', at: { right: '0%', bottom: 190 } },
    ],
    items: [
      [ic.Microphone2, T_PEACH, 'Live transcript', 'Words appear as you say them, with names and times picked out.'],
      [ic.Flash, T_LILAC, 'Listening, thinking, done', 'A clear status so you always know what Orbita is doing.'],
      [ic.Calendar1, T_MINT, 'Real results', 'Calendar and mail updates confirmed with a check.'],
    ],
  },
];

export function MobileIntro() {
  return (
    <section data-screen-label="03 Mobile intro" className={`${s.wrap} ${s.mobileIntro}`}>
      <Kicker data-reveal="">02 — In your pocket</Kicker>
      <h2 data-reveal="" className={s.h60}>The same calm, <b>one thumb away.</b></h2>
      <p data-reveal="" className={s.lede}>Three moments from the iOS app, shown as they really move.</p>
    </section>
  );
}

function FeatureRow({ f, i }: { f: Feature; i: number }) {
  const stage = (
    <div data-reveal="" className={s.phoneStage}>
      <div className={s.stageGlow} style={{ background: `radial-gradient(closest-side, ${f.glow}, transparent)` }} />
      <div className={s.stageRing} />
      <div className={s.stageRingDashed} />
      <FeaturePhone kind={f.kind} />
      {f.chips.map((c) => (
        <FloatChip key={c.label} icon={c.icon} from={c.c[0]} to={c.c[1]} style={c.at}>{c.label}</FloatChip>
      ))}
    </div>
  );
  const copy = (
    <div data-reveal="" className={s.featCopy}>
      <div className={s.featNum}><span>{f.n}</span><span className={s.monoLabel}>{f.name}</span></div>
      <h2 className={s.h52}>{f.title}</h2>
      <p className={s.featLede}>{f.body}</p>
      <div className={s.featList}>
        {f.items.map(([icon, tint, t, b]) => <FeatureItem key={t} icon={icon} tint={tint} title={t}>{b}</FeatureItem>)}
      </div>
    </div>
  );
  return (
    <section data-screen-label={f.label} className={`${s.wrap} ${s.featRow} ${s[`featRow${i}`]} ${f.flip ? s.flip : ''}`}>
      {f.flip ? <>{copy}{stage}</> : <>{stage}{copy}</>}
    </section>
  );
}

export function MobileFeatures() {
  return <>{FEATURES.map((f, i) => <FeatureRow key={f.kind} f={f} i={i} />)}</>;
}

export function People() {
  return (
    <section className={`${s.wrap} ${s.people}`}>
      <div data-reveal="" className={s.personCard}>
        <img src={img.personVoice} alt="Man recording a voice message" loading="lazy" decoding="async" />
        <div className={s.personFade} />
        <GlassCaption big icon={ic.Microphone2} title="Simplify life, one ask at a time" sub="Let Orbita handle the busywork." />
      </div>
      <div data-reveal="" className={`${s.personCard} ${s.researchCard}`}>
        <div className={s.researchGlow} />
        <div data-float="" className={s.research}>
          <div className={s.researchHead}>
            <div className={s.researchIcon}><Icon d={ic.SearchNormal1} size={18} stroke="oklch(0.6 0.17 40)" width={1.6} /></div>
            <div className={s.grow}><div className={s.researchTitle}>Deep research</div><div className={s.researchSub}>Yesterday · 8 October</div></div>
            <div className={s.researchGo}><Icon d={ic.ArrowUp} size={15} width={1.6} /></div>
          </div>
          {([
            [ic.MessageText1, 'Best two weeks for Kyoto?', 'Late November balances foliage and…', 1],
            [ic.DocumentText, 'Draft Q4 design OKRs', 'Three objectives, nine results…', 1],
            [ic.Calendar1, 'Plan Dana’s offsite', 'Two venues shortlisted near…', 0.5],
          ] as const).map(([d, t, b, o]) => (
            <div key={t} className={s.researchItem} style={{ opacity: o }}>
              <Icon d={d} size={18} width={1.6} />
              <div className={s.minw0}><div className={s.researchItemTitle}>{t}</div><div className={s.researchItemSub}>{b}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div data-reveal="" className={s.personCard}>
        <img src={img.personJoy} alt="Woman laughing with coffee and her phone" loading="lazy" decoding="async" />
        <div className={s.personFade} />
        <GlassCaption big icon={ic.MagicStar} title="Where calm meets capable" sub="Your day, quietly sorted by AI." />
      </div>
    </section>
  );
}
