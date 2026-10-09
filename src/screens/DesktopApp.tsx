import { memo, useState } from 'react';
import { Blob } from '../components/Blob';
import { Icon } from '../components/Icon';
import { desk } from '../lib/icons';
import { img } from '../assets';
import s from './DesktopApp.module.css';

const RAIL = [['Home', desk.home], ['Chats', desk.chat], ['Spaces', desk.spaces], ['Calendar', desk.cal], ['Files', desk.files]] as const;
const TABS = ['All', 'Images', 'Docs', 'Voice'];
const TOOLS = [
  ['Chat files', desk.toolFiles, img.toolFiles],
  ['Imagine', desk.toolImagine, img.toolImagine],
  ['Translate', desk.toolTranslate, img.toolTranslate],
  ['Voice', desk.toolVoice, img.toolVoice],
] as const;
const SIDE = [['Edit', desk.edit], ['Copy', desk.copy], ['More', desk.more]] as const;
const FINDINGS = [
  ['Renewal notice window:', 'cut from 60 to 30 days, or it rolls into another year.'],
  ['Price escalator:', 'capped at 4% a year, replacing the open CPI clause.'],
  ['Termination for convenience:', 'removed. Early exit now needs a material breach.'],
] as const;

type Props = { theme?: 'light' | 'dark' };

/** Orbita desktop home screen, 1440×920 design px. */
export const DesktopApp = memo(function DesktopApp({ theme = 'light' }: Props) {
  const [rail, setRail] = useState(1);
  const [tab, setTab] = useState(0);
  const [tool, setTool] = useState(-1);
  const [libOpen, setLibOpen] = useState(true);
  const [draft, setDraft] = useState('');
  const dark = theme === 'dark';

  return (
    <div className={`${s.app} ${dark ? s.dark : ''}`} data-theme={theme}>
      {dark ? (
        <div className={s.darkGlow} />
      ) : (
        <div className={s.blobs}>
          <Blob size={720} blur={120} color="oklch(0.82 0.12 50)" opacity={0.85} at={{ left: -160, top: -220 }} />
          <Blob size={640} blur={130} color="oklch(0.8 0.1 345)" opacity={0.75} at={{ left: 520, top: 360 }} />
          <Blob size={560} blur={120} color="oklch(0.9 0.1 85)" opacity={0.85} at={{ right: -120, top: -120 }} />
          <Blob size={420} blur={110} color="oklch(0.78 0.12 25)" opacity={0.6} at={{ right: 120, bottom: -160 }} />
        </div>
      )}

      <nav className={s.rail}>
        <div className={s.logoTile}><img src={img.logo} alt="Orbita AI" width={30} height={30} /></div>
        <div className={s.railRule} />
        {RAIL.map(([label, d], i) => (
          <button key={label} title={label} className={`${s.railBtn} ${rail === i ? s.on : ''}`} onClick={() => setRail(i)}>
            <Icon d={d} />
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button className={s.settings} title="Settings"><Icon d={desk.settings} /></button>
        <div className={s.me}><div className={s.presence} /></div>
      </nav>

      {libOpen && (
        <aside className={s.library}>
          <div className={s.libHead}>
            <div className={s.stack2}>
              <div className={s.eyebrow}>Your library</div>
              <div className={s.libTitle}>Recent work</div>
            </div>
            <button className={s.iconBtn44}><Icon d={desk.search} size={18} /></button>
          </div>
          <div className={s.tabs}>
            {TABS.map((t, i) => (
              <button key={t} className={`${s.tab} ${tab === i ? s.tabOn : ''}`} onClick={() => setTab(i)}>{t}</button>
            ))}
          </div>

          <div className={s.libList}>
            <div className={s.day}>Today</div>
            <div className={s.card}>
              <div className={s.cardHead}>
                <div className={s.cardIcon}><div className={s.spectrumDot} /></div>
                <div className={s.cardMeta}>
                  <div className={s.cardTitle}>Imagine</div>
                  <div className={s.cardSub}>Today · 9 October · 6 renders</div>
                </div>
                <button className={s.openBtn}><Icon d={desk.arrow} size={16} style={{ transform: 'rotate(45deg)' }} /></button>
              </div>
              <div className={s.photo}><img src={img.balloon2} alt="" loading="lazy" decoding="async" /></div>
              <div className={s.caption}>
                <Icon d={desk.star} size={18} className={s.accentIcon} />
                <div className={s.captionText}>
                  <div className={s.captionTitle}>Cappadocia at sunrise</div>
                  <div className={s.captionSub}>Hot air balloons, peach sky, golden hour</div>
                </div>
              </div>
            </div>

            <div className={s.day} style={{ marginTop: 8 }}>Yesterday</div>
            <div className={s.card}>
              <div className={s.cardHead}>
                <div className={`${s.cardIcon} ${s.accentIcon}`}><Icon d={desk.search} size={18} /></div>
                <div className={s.cardMeta}>
                  <div className={s.cardTitle}>Deep research</div>
                  <div className={s.cardSub}>Yesterday · 8 October · 2 threads</div>
                </div>
                <button className={s.openBtn}><Icon d={desk.arrow} size={16} style={{ transform: 'rotate(45deg)' }} /></button>
              </div>
              <div className={s.threads}>
                <div className={s.thread}>
                  <div className={s.bullet} style={{ background: 'oklch(0.72 0.16 40)' }} />
                  <div className={s.minw0}><div className={s.threadTitle}>Best two weeks to visit Kyoto?</div><div className={s.threadSub}>Late November balances foliage and crowds…</div></div>
                </div>
                <div className={s.thread}>
                  <div className={s.bullet} style={{ background: 'oklch(0.72 0.12 300)' }} />
                  <div className={s.minw0}><div className={s.threadTitle}>Draft Q4 OKRs for the design team</div><div className={s.threadSub}>Three objectives, nine measurable results…</div></div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      <main className={s.main}>
        {dark && <><div className={s.topLine} /><div className={s.topGlow} /></>}
        <header className={s.header}>
          <button className={`${s.iconBtn46} ${s.accentIcon}`}><Icon d={desk.star} /></button>
          <div className={s.titleBlock}>
            <div className={s.convTitle}>New conversation</div>
            <div className={s.model}>
              <img src={img.logo} alt="" width={16} height={16} />Orbita 3 · Deep mode
              <Icon d={desk.chevron} size={12} />
            </div>
          </div>
          <button className={s.iconBtn46} onClick={() => setLibOpen((v) => !v)} aria-label="Toggle library">
            <Icon d={desk.plus} style={{ transform: 'rotate(45deg)' }} />
          </button>
        </header>

        <div className={s.sideActions}>
          {SIDE.map(([label, d]) => (
            <button key={label} title={label} className={s.sideBtn}><Icon d={d} size={18} /></button>
          ))}
        </div>

        <section className={s.thread0}>
          <div className={s.greetRow}>
            <div className={s.bigAvatar} />
            <div className={s.greet}>
              <div className={s.greetSoft}>Good morning, Leo.</div>
              <div className={s.greetBold}>What should we tackle today?</div>
            </div>
          </div>

          <div className={s.askRow}>
            <div className={s.ask}>Act as my <b>contracts lead</b> and compare these two agreements. Flag <b>anything that changes our renewal terms.</b></div>
            <div className={s.docs}>
              <div className={s.docBack}>
                <div className={s.badgeDoc}>DOC</div>
                <div className={s.docName}>MSA 2025</div>
                <div className={s.line} /><div className={s.line} style={{ width: '80%' }} /><div className={s.line} style={{ width: '60%' }} />
              </div>
              <div className={s.docFront}>
                <div className={s.docGlow} />
                <div className={s.badgePdf}>PDF</div>
                <div className={s.docName} style={{ position: 'relative' }}>MSA 2026 · Draft</div>
                <div className={s.docText}>Term renews automatically unless notice is given 30 days prior…</div>
              </div>
            </div>
          </div>

          <div className={s.replyRow}>
            <div className={s.botTile}><img src={img.logo} alt="Orbita AI" width={32} height={32} /></div>
            <div className={s.reply}>
              <div className={s.replyMeta}><span className={s.chip}>3 changes found</span>Read 42 pages in 6s</div>
              {FINDINGS.map(([t, b], i) => (
                <div key={t} className={s.finding}>
                  <div className={s.findingN}>{i + 1}.</div>
                  <div className={s.findingBody}><b>{t}</b> {b}</div>
                </div>
              ))}
              <div className={s.actions}>
                <button className={s.primary}><Icon d={desk.cal} size={14} />Remind me 1 Sep</button>
                <button className={s.secondary}>Draft reply to vendor</button>
                <button className={s.secondary}>Show redline</button>
              </div>
            </div>
          </div>
        </section>

        <footer className={s.footer}>
          <div className={s.footerFade} />
          <div className={s.tools}>
            {TOOLS.map(([label, d, src], i) => (
              <button key={label} className={`${s.tool} ${tool === i ? s.toolOn : ''}`} onClick={() => setTool(tool === i ? -1 : i)}>
                <img src={src} alt="" className={s.toolArt} width={132} height={132} loading="lazy" decoding="async" />
                <div className={s.toolFrost} />
                <div className={s.toolLabel}>
                  <div className={s.toolIcon}><Icon d={d} size={16} /></div>
                  <span>{label}</span>
                </div>
              </button>
            ))}
          </div>
          <div className={s.composer}>
            <button className={s.addBtn}><Icon d={desk.plus} /></button>
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ask Orbita anything…" className={s.input} aria-label="Message" />
            <button className={s.micBtn}><Icon d={desk.mic} size={19} /></button>
            <button className={s.send}><Icon d={desk.arrow} size={18} /></button>
          </div>
        </footer>
      </main>
    </div>
  );
});
