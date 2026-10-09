import { memo, useRef, useState, type ReactNode } from 'react';
import { Blob } from '../components/Blob';
import { Icon } from '../components/Icon';
import { ic } from '../lib/icons';
import { useMotion } from '../lib/useMotion';
import { img } from '../assets';
import s from './Phone.module.css';

export type PhoneKind = 'library' | 'conversation' | 'voice';

export type PhoneProps = {
  /** Drop the thin outline, camera island and home bar (for use inside a device frame). */
  bare?: boolean;
  /** Animate while true. */
  playing: boolean;
  /** Bump to restart the loop from its first frame. */
  epoch?: number;
};

const PERIOD: Record<PhoneKind, number> = { library: 9000, conversation: 9000, voice: 12000 };
const REST_AT: Record<PhoneKind, number> = { library: 4600, conversation: 5200, voice: 9600 };

function Shell({ kind, bare, playing, epoch, bg, glows, children }: PhoneProps & { kind: PhoneKind; bg?: string; glows: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useMotion(ref, { period: PERIOD[kind], playing, epoch, restAt: REST_AT[kind] });
  return (
    <div ref={ref} className={`${s.screen} ${bare ? s.bare : ''}`} style={bg ? { background: bg } : undefined}>
      <div className={s.glows}>{glows}</div>
      {!bare && <div className={s.island} />}
      <div className={s.status}>
        <span>9:41</span>
        <div className={s.statusRight}>
          <div className={s.signal}><i style={{ height: 4 }} /><i style={{ height: 6 }} /><i style={{ height: 9 }} /><i style={{ height: 12 }} /></div>
          <div className={s.battery}><div /></div>
        </div>
      </div>
      {children}
      {!bare && <div className={s.homeBar} />}
    </div>
  );
}

/** Ring that pulses out from behind a round button (compositor-only glow). */
function Glow({ children }: { children: ReactNode }) {
  return (
    <span className={s.glowWrap}>
      <span data-anim="glow" className={s.glowRing} />
      {children}
    </span>
  );
}

/* ───────────────────────── 04 Library ───────────────────────── */

const LIB_TABS = ['All', 'Images', 'Docs', 'Voice'];

export const PhoneLibrary = memo(function PhoneLibrary(p: PhoneProps) {
  const [tab, setTab] = useState(0);
  const [nav, setNav] = useState(1);
  return (
    <Shell kind="library" {...p} glows={<>
        <Blob anim="drift" i={0} size={420} blur={90} color="oklch(0.82 0.12 50)" opacity={0.85} at={{ left: -180, top: -120 }} />
        <Blob anim="drift" i={1} size={380} blur={100} color="oklch(0.8 0.1 345)" opacity={0.7} at={{ right: -200, top: 300 }} />
        <Blob anim="drift" i={2} size={360} blur={90} color="oklch(0.9 0.1 85)" opacity={0.8} at={{ left: -80, bottom: -160 }} />
      </>}>

      <div data-anim="down" data-d="100" className={s.topBar}>
        <button className={s.glassBtn}><Icon d={ic.ArrowLeft} /></button>
        <div className={s.libTitle}>Recent work</div>
        <button className={s.glassBtn}><Icon d={ic.HambergerMenu} /></button>
      </div>

      <div data-anim="up" data-d="250" className={s.tabs}>
        {LIB_TABS.map((t, i) => (
          <button key={t} className={`${s.tab} ${tab === i ? s.tabOn : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>

      <div className={s.libList}>
        <div data-anim="grow" data-d="420" className={s.card}>
          <div className={s.cardHead}>
            <div className={s.cardIcon}><Icon d={ic.Gallery} /></div>
            <div className={s.cardMeta}><div className={s.cardTitle}>Imagine</div><div className={s.cardSub}>Today · 9 October</div></div>
            <button className={s.cardOpen}><Icon d={ic.ArrowUp} size={18} style={{ transform: 'rotate(45deg)' }} /></button>
          </div>
          <div className={s.photo}>
            <img data-anim="kenburns" src={img.balloon2} alt="" decoding="async" />
            <div data-anim="up" data-d="1000" className={s.photoCaption}>
              <Icon d={ic.MagicStar} stroke="oklch(0.58 0.17 40)" />
              <div className={s.capText}>
                <div className={s.capTitle}>Cappadocia at sunrise</div>
                <div className={s.capSub}>Hot air balloons, peach sky, golden hour</div>
              </div>
            </div>
          </div>
        </div>

        <div data-anim="grow" data-d="700" className={s.card}>
          <div className={s.cardHead}>
            <div className={s.cardIcon}><Icon d={ic.SearchNormal1} /></div>
            <div className={s.cardMeta}><div className={s.cardTitle}>Deep research</div><div className={s.cardSub}>Yesterday · 8 October</div></div>
            <button className={s.cardOpen}><Icon d={ic.ArrowUp} size={18} style={{ transform: 'rotate(45deg)' }} /></button>
          </div>
          <div data-anim="right" data-d="1150" className={s.threadRow}>
            <div className={s.bullet} />
            <div className={s.minw0}><div className={s.threadTitle}>Best two weeks to visit Kyoto?</div><div className={s.threadSub}>Late November balances foliage and crowds…</div></div>
          </div>
        </div>
      </div>

      <div className={s.bottomFade} />
      <div data-anim="up" data-d="1300" className={s.navBar}>
        {[ic.Add, ic.MessageText1, ic.MagicStar, ic.DocumentText].map((d, i) => (
          <button key={i} data-anim="pop" data-d="1500" data-step="90" className={`${s.navBtn} ${nav === i ? s.navOn : ''}`} onClick={() => setNav(i)}>
            <Icon d={d} size={22} />
          </button>
        ))}
      </div>
    </Shell>
  );
});

/* ─────────────────────── 05 Conversation ─────────────────────── */

const FINDINGS = [
  ['Notice window:', 'cut from 60 to 30 days.'],
  ['Price escalator:', 'capped at 4% a year.'],
  ['Exit clause:', 'now needs a material breach.'],
] as const;
const TOOLS = [
  ['Files', ic.DocumentText, img.toolFiles],
  ['Imagine', ic.Gallery, img.toolImagine],
  ['Translate', ic.Translate, img.toolTranslate],
  ['Voice', ic.VoiceSquare, img.toolVoice],
] as const;

export const PhoneConversation = memo(function PhoneConversation(p: PhoneProps) {
  const [draft, setDraft] = useState('');
  return (
    <Shell kind="conversation" {...p} glows={<>
        <Blob anim="drift" i={0} size={400} blur={90} color="oklch(0.9 0.1 85)" opacity={0.85} at={{ right: -180, top: -140 }} />
        <Blob anim="drift" i={1} size={420} blur={100} color="oklch(0.82 0.12 50)" opacity={0.8} at={{ left: -200, top: 280 }} />
        <Blob anim="drift" i={2} size={380} blur={90} color="oklch(0.8 0.1 345)" opacity={0.7} at={{ right: -160, bottom: -120 }} />
      </>}>

      <div data-anim="down" data-d="100" className={s.topBar}>
        <div className={s.logoTile}><img src={img.logo} alt="" width={32} height={32} /></div>
        <div className={s.convHead}>
          <div className={s.convTitle}>New conversation</div>
          <div className={s.modelPill}><img src={img.logo} alt="" width={14} height={14} />Orbita 3 · Deep<Icon d={ic.ArrowDown2} size={11} width={2} /></div>
        </div>
        <button className={s.glassBtn}><Icon d={ic.Edit2} /></button>
      </div>

      <div className={s.convBody}>
        <div data-anim="up" data-d="250" className={s.greetRow}>
          <div className={s.avatar} />
          <div className={s.greet}>
            <div className={s.greetSoft}>Good morning, Leo.</div>
            <div className={s.greetBold}>What should we tackle?</div>
          </div>
        </div>

        <div data-anim="right" data-d="650" className={s.youRow}>
          <div className={s.you}>
            <div className={s.youText}>Compare these agreements and flag <b>anything that changes our renewal terms.</b></div>
            <div className={s.attachments}>
              <div className={s.attach} style={{ background: 'oklch(0.96 0.02 300)' }}><div className={s.attBadge} style={{ background: 'oklch(0.9 0.05 300)', color: 'oklch(0.45 0.14 300)' }}>DOC</div><span>MSA 2025</span></div>
              <div className={s.attach} style={{ background: 'oklch(0.96 0.03 50)' }}><div className={s.attBadge} style={{ background: 'oklch(0.92 0.06 40)', color: 'oklch(0.55 0.18 35)' }}>PDF</div><span>MSA 2026</span></div>
            </div>
          </div>
        </div>

        <div className={s.botRow}>
          <div data-anim="pop" data-d="1250" className={s.botTile}><img src={img.logo} alt="" width={24} height={24} /></div>
          <div data-anim="typing" data-d="1450" className={s.typing}>
            <i data-anim="dot" /><i data-anim="dot" /><i data-anim="dot" />
          </div>
          <div data-anim="grow" data-d="2350" className={s.reply}>
            <div className={s.replyMeta}><span className={s.chip}>3 changes found</span>42 pages · 6s</div>
            {FINDINGS.map(([t, b], i) => (
              <div key={t} data-anim="left" data-d="2700" data-step="200" className={s.finding}>
                <div className={s.findingN}>{i + 1}.</div>
                <div className={s.findingBody}><b>{t}</b> {b}</div>
              </div>
            ))}
            <div data-anim="up" data-d="3400" className={s.replyActions}>
              <button className={s.primary}><Icon d={ic.Calendar1} size={13} width={1.6} />Remind me 1 Sep</button>
              <button className={s.secondary}>Draft reply</button>
            </div>
          </div>
        </div>
      </div>

      <div className={s.dock}>
        <div className={s.dockFade} />
        <div className={s.toolRow}>
          {TOOLS.map(([label, d, src]) => (
            <div key={label} data-anim="right" data-d="600" data-step="110" className={s.tool}>
              <img data-anim="float" src={src} alt="" width={96} height={96} className={s.toolArt} decoding="async" />
              <div className={s.toolFrost} />
              <div className={s.toolLabel}>
                <div className={s.toolIcon}><Icon d={d} size={13} width={1.6} /></div>
                <span>{label}</span>
              </div>
            </div>
          ))}
        </div>
        <div data-anim="up" data-d="450" className={s.composer}>
          <button className={s.addBtn}><Icon d={ic.Add} size={18} width={1.6} /></button>
          <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ask Orbita anything…" className={s.input} aria-label="Message" tabIndex={-1} />
          <Glow><button className={s.micBtn}><Icon d={ic.Microphone2} size={20} width={1.6} /></button></Glow>
        </div>
      </div>
    </Shell>
  );
});

/* ───────────────────────── 06 Voice ───────────────────────── */

const WORDS: [string, number, boolean?][] = [
  ['Move', 900], ['my', 1280], ['3pm', 1660, true], ['with', 2040], ['Dana', 2420, true], ['to', 2800],
  ['Thursday', 3180, true], ['and', 3560], ['send', 3940], ['her', 4320], ['a', 4700], ['quick', 5080], ['note', 5460],
];
const BAR_H = [6, 10, 16, 24, 14, 30, 40, 26, 36, 44, 32, 22, 38, 28, 18, 34, 24, 14, 20, 12, 8, 10, 6, 4];

export const PhoneVoice = memo(function PhoneVoice(p: PhoneProps) {
  return (
    <Shell kind="voice" bg="#f1ded2" {...p} glows={<>
        <Blob anim="drift" i={0} size={460} blur={110} color="oklch(0.78 0.15 40)" opacity={0.75} at={{ left: -35, top: 150 }} />
        <Blob anim="drift" i={1} size={300} blur={90} color="oklch(0.75 0.13 345)" opacity={0.7} at={{ left: -60, top: 330 }} />
        <Blob anim="drift" i={2} size={300} blur={90} color="oklch(0.9 0.11 85)" opacity={0.8} at={{ right: -80, top: 120 }} />
      </>}>

      <div data-anim="down" data-d="100" className={s.topBar}>
        <button className={`${s.glassBtn} ${s.flat}`}><Icon d={ic.ArrowDown2} /></button>
        <div className={s.statePill}>
          <div data-anim="show" data-d="0" data-e="6200" className={s.state}><div data-anim="pulse" className={s.stateDot} style={{ ['--c' as string]: 'oklch(0.65 0.2 30)' }} />Listening</div>
          <div data-anim="show" data-d="6200" data-e="7600" className={s.state}><div data-anim="pulse" className={s.stateDot} style={{ ['--c' as string]: 'oklch(0.68 0.15 300)' }} />Thinking</div>
          <div data-anim="show" data-d="7600" data-e="11200" className={s.state}><div className={s.stateDot} style={{ ['--c' as string]: 'oklch(0.68 0.15 150)' }} />Done</div>
        </div>
        <button className={`${s.glassBtn} ${s.flat}`}><Icon d={ic.More} /></button>
      </div>

      <div className={s.orbStage}>
        <div data-anim="ripple" data-d="0" className={s.ripple} style={{ width: 280, height: 280, borderColor: 'rgba(255,255,255,.7)', background: 'rgba(255,255,255,.12)' }} />
        <div data-anim="ripple" data-d="1600" className={s.ripple} style={{ width: 236, height: 236, borderColor: 'rgba(255,255,255,.8)', background: 'rgba(255,255,255,.18)' }} />
        <div data-anim="show" data-d="6000" data-e="7700" className={s.thinkRing}><div data-anim="spinfast" /></div>
        <div data-anim="breathe" className={s.orb}>
          <img data-anim="spin" src={img.logo} alt="" width={104} height={104} />
        </div>
      </div>

      <div className={s.wave}>
        <div data-anim="show" data-d="0" data-e="6000" className={s.bars}>
          {BAR_H.map((h, i) => (
            <div key={i} data-anim="bar" className={s.bar} style={{ height: h, opacity: +(0.3 + 0.7 * (1 - Math.abs(i - 11.5) / 11.5)).toFixed(2) }} />
          ))}
        </div>
        <div data-anim="show" data-d="6100" data-e="11200" className={s.calm}>
          {[0, 1, 2, 3, 4].map((i) => <div key={i} data-anim="calm" className={s.calmDot} />)}
        </div>
      </div>

      <div className={s.transcriptBox}>
        <div data-anim="show" data-d="0" data-e="7400" className={s.transcript}>
          {WORDS.map(([w, d, accent], i) => (
            <span key={w}>
              <span data-anim="word" data-d={d} data-c={accent ? 'accent' : undefined} className={s.word}>{w}</span>
              {i < WORDS.length - 1 ? ' ' : ''}
            </span>
          ))}
        </div>
        <div data-anim="show" data-d="7600" data-e="11200" className={s.results}>
          <div data-anim="up" data-d="7800" className={s.result}>
            <div className={s.resultIcon} style={{ background: 'oklch(0.94 0.04 50)' }}><Icon d={ic.Calendar1} width={1.6} /></div>
            <div className={s.resultText}><div className={s.resultTitle}>Sync with Dana moved</div><div className={s.resultSub}>Thu, 15 Oct · 3:00 – 3:30 PM</div></div>
            <div data-anim="pop" data-d="8150" className={s.check}><Icon d="M5 12.5l4.5 4.5L19 7.5" size={14} width={2.4} /></div>
          </div>
          <div data-anim="up" data-d="8150" className={s.result}>
            <div className={s.resultIcon} style={{ background: 'oklch(0.95 0.03 300)' }}><Icon d={ic.MessageText1} width={1.6} /></div>
            <div className={s.resultText}><div className={s.resultTitle}>Note sent to Dana</div><div className={s.resultSub}>“Hi Dana, can we move our 3pm to Thursday?”</div></div>
            <div data-anim="pop" data-d="8500" className={s.check}><Icon d="M5 12.5l4.5 4.5L19 7.5" size={14} width={2.4} /></div>
          </div>
        </div>
      </div>

      <div data-anim="show" data-d="0" data-e="7400" className={s.chips}>
        <div data-anim="pop" data-d="3700" className={s.vchip}><Icon d={ic.Calendar1} size={14} width={1.6} stroke="oklch(0.58 0.17 40)" />Calendar</div>
        <div data-anim="pop" data-d="5300" className={s.vchip}><Icon d={ic.MessageText1} size={14} width={1.6} stroke="oklch(0.58 0.17 40)" />Mail</div>
      </div>

      <div data-anim="up" data-d="350" className={s.controls}>
        <button className={s.ctl}><Icon d={ic.Keyboard} size={24} /></button>
        <Glow><button className={s.pause}><Icon d={ic.Pause} size={30} width={1.6} /></button></Glow>
        <button className={s.ctl}><Icon d={ic.Add} size={24} style={{ transform: 'rotate(45deg)' }} /></button>
      </div>
    </Shell>
  );
});

export const PHONES = { library: PhoneLibrary, conversation: PhoneConversation, voice: PhoneVoice } as const;
