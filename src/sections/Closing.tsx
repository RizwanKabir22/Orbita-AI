import { DarkDesktop } from '../components/Devices';
import { GlassCaption, Kicker } from '../components/ui';
import { Icon } from '../components/Icon';
import { ic } from '../lib/icons';
import { img } from '../assets';
import s from './cs.module.css';

const LISTEN_BARS: [number, number][] = [[8, 1], [14, 1], [22, 1], [30, 1], [18, 1], [34, 1], [26, 1], [38, 1], [20, 1], [30, 1], [16, 1], [24, .4], [12, .4], [8, .4]];

export function DarkMode() {
  return (
    <section data-screen-label="06 Dark mode" className={`${s.wrap} ${s.dark}`}>
      <div className={s.darkGlow} />
      <div data-reveal="" className={`${s.sectionHead} ${s.rel}`}>
        <div className={s.sectionHeadL}>
          <Kicker dark>05 — Dark mode</Kicker>
          <h2 className={s.h64}>After <b>hours.</b></h2>
        </div>
        <p className={`${s.sideNote} ${s.darkNote}`}>Warm near-black instead of pure black, smoked glass instead of grey panels, and an accent that glows rather than shouts.</p>
      </div>
      <div data-reveal="" className={s.darkStage}><DarkDesktop /></div>
      <div data-reveal="" className={s.darkCards}>
        <div className={s.darkCard}>
          <div className={s.listenPill}>
            <div className={s.listenLabel}><div className={s.listenDot} />Listening</div>
            <div className={s.listenBars}>{LISTEN_BARS.map(([h, o], i) => <div key={i} style={{ height: h, opacity: o }} />)}</div>
          </div>
          <div className={s.darkCardText}><b>Voice at night</b><span>Speak softly. The waveform glows instead of shouting.</span></div>
        </div>
        <div className={s.darkCard}>
          <div className={s.darkResult}>
            <div className={s.darkResultIcon}><Icon d={ic.Calendar1} width={1.6} /></div>
            <div className={s.grow}><div className={s.darkResultTitle}>Sync with Dana moved</div><div className={s.darkResultSub}>Thu, 15 Oct · 3:00 PM</div></div>
            <div className={s.darkCheck}><Icon d="M5 12.5l4.5 4.5L19 7.5" size={13} width={2.6} /></div>
          </div>
          <div className={s.darkCardText}><b>Smoked glass cards</b><span>Results sit on 5% warm glass with a hairline edge.</span></div>
        </div>
        <div className={s.darkCard}>
          <div className={s.darkAsk}>
            <span>Ask Orbita anything…</span>
            <div className={s.darkMic}><Icon d={ic.Microphone2} size={18} width={1.6} /></div>
          </div>
          <div className={s.darkCardText}><b>A glow, not a spotlight</b><span>The one accent left on screen is the action you need.</span></div>
        </div>
      </div>
    </section>
  );
}

/** Deterministic waveform behind the four steps (the prototype's random bars, frozen). */
const FLOW_BARS = [6, 21, 30, 30, 22, 12, 7, 8, 9, 15, 17, 11, 14, 27, 35, 34, 23, 8, 17, 23, 21, 14, 7, 6, 12, 20, 26, 25, 14, 13, 27, 34, 32, 21, 9, 12, 13, 9, 9, 11, 6, 17, 28, 34, 30, 17, 11, 24, 29, 25, 16, 8, 7, 9, 16, 21, 18, 8, 19, 31, 36, 31, 18, 8, 18, 19, 14, 8, 7, 9];
const FLOW_OP = [.35, .43, .5, .58, .65, .72, .78, .83, .88, .92, .96, .98, .99, 1, 1, .98, .96, .93, .89, .84, .79, .73, .66, .59, .52, .44, .36, .41, .49, .57, .64, .71, .77, .82, .87, .92, .95, .98, .99, 1, 1, .99, .97, .94, .9, .85, .8, .74, .67, .61, .53, .46, .38, .4, .48, .55, .62, .69, .76, .81, .87, .91, .95, .97, .99, 1, 1, .99, .97, .94];
const STEPS = [['1 · Ask', img.stepAsk, '4%', 20], ['2 · Understand', img.stepUnderstand, '30%', 190], ['3 · Act', img.stepAct, '56%', 20], ['4 · Done', img.stepDone, '82%', 190]] as const;

export function Flow() {
  return (
    <section data-screen-label="06b How it works" className={`${s.wrap} ${s.flow}`}>
      <div data-reveal="" className={s.sectionHead}>
        <div className={s.sectionHeadL}>
          <Kicker>06 — How it flows</Kicker>
          <h2 className={s.h52}>One request, <b>four quiet steps.</b></h2>
        </div>
        <p className={s.sideNote}>Every task moves the same way, so people always know where Orbita is and what comes next.</p>
      </div>
      <div className={s.flowStage}>
        <div className={s.flowWave} aria-hidden="true">
          {FLOW_BARS.map((h, i) => <div key={i} style={{ height: h, opacity: FLOW_OP[i] }} />)}
        </div>
        {STEPS.map(([label, src, left, top]) => (
          <div key={label} data-reveal="" className={s.step} style={{ left, top }}>
            <div className={s.stepTile}><img data-float="" src={src} alt="" width={108} height={108} loading="lazy" decoding="async" /></div>
            <div className={s.stepTag}>{label}</div>
          </div>
        ))}
        <div data-reveal="" className={s.thinking}>Thinking…</div>
      </div>
      <div className={s.statRow}>
        <div data-reveal="" className={s.stat}>
          <img data-float="" src={img.toolFiles} alt="" className={s.statArt} width={110} height={110} loading="lazy" decoding="async" />
          <img src={img.fullLogo} alt="" className={s.statLogo} />
          <div className={s.statText}><div className={s.statNum}>4</div><b>Core tools</b><span>Files, Imagine, Translate, Voice</span></div>
        </div>
        <div data-reveal="" className={s.statPhoto}>
          <img src={img.balloon1} alt="Hot air balloons over Cappadocia at sunrise" loading="lazy" decoding="async" />
          <GlassCaption icon={ic.Gallery} title="Imagine" sub="Cappadocia at sunrise · 6 renders" />
        </div>
        <div data-reveal="" className={s.stat}>
          <div className={s.themes}><div className={s.themeLight} /><div className={s.themeDark} /></div>
          <img src={img.fullLogo} alt="" className={s.statLogo} />
          <div className={s.statText}><div className={s.statNum}>2</div><b>Themes</b><span>Light for the day, dark for after hours</span></div>
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <>
      <section data-screen-label="08 Closing" className={`${s.wrap} ${s.closing}`}>
        <div className={s.closingGlow} />
        <img data-reveal="" data-spin="" src={img.logo} alt="" width={120} height={120} className={s.rel} />
        <h2 data-reveal="" className={s.thanks}><span>Thanks for</span><span>scrolling.</span></h2>
        <p data-reveal="" className={s.closingNote}>Orbita AI · Product, brand and motion design · 2026</p>
      </section>
      <footer className={`${s.wrap} ${s.footer}`}>
        <img src={img.fullLogo} alt="Orbita AI" className={s.footerLogo} />
        <div className={s.footerBy}>Designed by Rizwan Kabir Khan</div>
      </footer>
    </>
  );
}
