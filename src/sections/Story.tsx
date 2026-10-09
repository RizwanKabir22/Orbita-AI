import { Icon } from '../components/Icon';
import { GlassCaption, Kicker } from '../components/ui';
import { ic } from '../lib/icons';
import { img } from '../assets';
import s from './cs.module.css';

export function Brief() {
  return (
    <section className={`${s.wrap} ${s.brief}`}>
      <div data-reveal="" className={s.briefDoc}>
        <div className={s.briefBadges}>
          <div className={s.badge} style={{ background: 'oklch(0.95 0.03 300)', color: 'oklch(0.48 0.14 300)' }}>DOC</div>
          <div className={s.badge} style={{ background: 'oklch(0.95 0.04 50)', color: 'oklch(0.55 0.17 38)' }}>PDF</div>
        </div>
        <div className={s.briefDocText}>Compare these and flag <b>anything that changes our renewal terms.</b></div>
      </div>
      <div data-reveal="" className={s.briefCard}>
        <div className={s.monoLabel}>Brief</div>
        <div className={s.quote}>“We wanted an assistant people <b>actually look forward to opening</b> every morning.”</div>
        <div className={s.cite}>
          <div className={s.citeAvatar} />
          <div><div className={s.citeName}>Founder</div><div className={s.citeRole}>Orbita AI</div></div>
        </div>
      </div>
      <div data-reveal="" className={s.audioTile}>
        <img data-float="" src={img.toolVoice} alt="" className={s.audioArt} width={150} height={150} loading="lazy" decoding="async" />
        <div className={s.audioTag}>
          <div className={s.audioTagIcon}><Icon d={ic.Microphone2} size={14} width={1.6} /></div>Audio chat
        </div>
      </div>
    </section>
  );
}

const WORDS = ['Listen', 'Understand', 'Act', 'Remember'];

export function Marquee() {
  const run = (k: number) => WORDS.flatMap((w) => [<span key={`${k}${w}`}>{w}</span>, <span key={`${k}${w}✦`} className={s.spark}>✦</span>]);
  return (
    <div className={s.marquee} aria-label="Listen, Understand, Act, Remember">
      <div data-marquee="" className={s.marqueeTrack} aria-hidden="true">{[0, 1, 2].flatMap(run)}</div>
    </div>
  );
}

export function Mockups() {
  return (
    <section className={`${s.wrap} ${s.mockups}`}>
      <div data-reveal="" className={s.mockTall}>
        <img src={img.phoneHand} alt="Orbita on an iPhone, held in hand" className={s.mockImg} loading="lazy" decoding="async" />
        <div className={s.photoFade} />
        <GlassCaption icon={ic.MagicStar} title="Good morning, Leo." sub="Three things need you today. I’ve drafted the rest." />
      </div>
      <div className={s.mockCol}>
        <div data-reveal="" className={s.mockShort}>
          <img src={img.appIcon} alt="Orbita app icon mockup" className={s.mockImg} loading="lazy" decoding="async" />
        </div>
        <div data-reveal="" className={s.mockShort}>
          <img src={img.portrait} alt="Person using Orbita" className={s.mockImg} loading="lazy" decoding="async" />
          <div className={s.photoFade} />
          <GlassCaption icon={ic.Microphone2} title="Where calm meets capable" sub="Just say it. Orbita handles the rest." />
        </div>
      </div>
    </section>
  );
}

export function Challenge() {
  return (
    <section data-screen-label="02 Challenge" className={`${s.wrap} ${s.challenge}`}>
      <div data-reveal="" className={s.challengeHead}>
        <Kicker>01 — The challenge</Kicker>
        <h2 className={s.h52}>Make AI feel <b>less like a tool,</b> more like a companion.</h2>
      </div>
      <div data-reveal="" className={s.challengeBody}>
        <p>Most assistants look like developer consoles: cold blues, dense chat logs and settings everywhere. Orbita needed to earn a place in someone's morning routine.</p>
        <p>We designed around three ideas: warmth over sterility, layered glass that keeps focus on the conversation, and a voice mode that shows its work as it listens, thinks and acts.</p>
      </div>
    </section>
  );
}

const PRINCIPLES = [
  ['01', 'Warm by default', 'Peach light, human tone and real names instead of system jargon.', 'radial-gradient(circle at 30% 25%,#fff,rgba(255,236,224,.6))'],
  ['02', 'Glass, not noise', 'Layered surfaces that stay out of the way and keep focus on the answer.', 'radial-gradient(circle at 30% 25%,rgba(255,255,255,.9),rgba(250,226,236,.55))'],
  ['03', 'Voice first', 'Speak naturally. Orbita listens, understands and acts, out loud.', 'radial-gradient(circle at 30% 25%,rgba(255,255,255,.9),rgba(255,240,214,.6))'],
] as const;

export function Principles() {
  return (
    <section className={`${s.wrap} ${s.principles}`}>
      <div data-reveal="" className={s.circles}>
        {PRINCIPLES.map(([n, t, b, bg], i) => (
          <div key={n} className={`${s.circle} ${s[`circle${i}`]}`} style={{ background: bg }}>
            <div className={s.circleN}>{n}</div>
            <div className={s.circleTitle}>{t}</div>
            <div className={s.circleBody}>{b}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
