import { Icon } from '../components/Icon';
import { Kicker, Mono } from '../components/ui';
import { ic, type IconName } from '../lib/icons';
import { img } from '../assets';
import s from './cs.module.css';

const SCALE = [
  ['Display 56', 'Good morning.', s.tsDisplay],
  ['Title 34', 'What should we tackle?', s.tsTitle],
  ['Heading 22', 'Deep research', s.tsHeading],
  ['Body 16', 'Orbita reads every page, then replies with what matters.', s.tsBody],
  ['Caption 12', 'TODAY · 9 OCTOBER · 6 RENDERS', s.tsCaption],
] as const;

const SPECTRUM = [['Tangerine', '#FF8A5B', 6], ['Coral', '#FF6B4A', 36], ['Rose', '#E9507A', 66], ['Violet', '#8F5BD6', 94]] as const;
const NEUTRALS = [['Paper', '#FBF8F5', 'inset 0 0 0 1px rgba(31,26,23,.1)'], ['Cream', '#F3E3D7', 'inset 0 0 0 1px rgba(31,26,23,.06)'], ['Ink', '#1F1A17', 'none']] as const;
const TOOLS = [['Files', img.toolFiles], ['Imagine', img.toolImagine], ['Translate', img.toolTranslate], ['Voice', img.toolVoice]] as const;
const ICONS: IconName[] = ['Home2', 'MessageText1', 'MagicStar', 'Calendar1', 'DocumentText', 'Gallery', 'Microphone2', 'Translate', 'SearchNormal1', 'Edit2', 'Setting2', 'Notification'];

function CardHead({ a, b }: { a: string; b: string }) {
  return <div className={s.cardHead}><Mono>{a}</Mono><Mono>{b}</Mono></div>;
}

export function DesignSystem() {
  return (
    <section data-screen-label="04 Design system" className={`${s.wrap} ${s.ds}`}>
      <div data-reveal="" className={s.sectionHead}>
        <div className={s.sectionHeadL}>
          <Kicker>03 — Design system</Kicker>
          <h2 className={s.h60}>Built from <b>light and glass.</b></h2>
        </div>
        <p className={s.sideNote}>Two typefaces, one warm spectrum and surfaces that layer like frosted glass. Small on purpose.</p>
      </div>

      {/* Type */}
      <div data-reveal="" className={`${s.dsCard} ${s.typeCard}`}>
        <div className={s.specimen}>
          <CardHead a="Typeface" b="Urbanist · Manrope" />
          <div className={s.specimenArt}>
            <div className={s.guide} style={{ top: 46 }} /><Mono style={{ position: 'absolute', right: 0, top: 30, fontSize: 10 }}>Cap height</Mono>
            <div className={s.guide} style={{ top: 104 }} /><Mono style={{ position: 'absolute', right: 0, top: 88, fontSize: 10 }}>x-height</Mono>
            <div className={s.baseline} /><Mono style={{ position: 'absolute', right: 0, top: 212, fontSize: 10, color: 'oklch(0.6 0.17 40)' }}>Baseline</Mono>
            <div className={s.specimenWord}>Orbita</div>
          </div>
          <div className={s.weights}>
            <span style={{ fontWeight: 300 }}>Light 300</span>
            <span style={{ fontWeight: 500 }}>Medium 500</span>
            <span className={s.weightOn}>Bold 700</span>
          </div>
        </div>
        <div className={s.scale}>
          {SCALE.map(([k, t, cls]) => (
            <div key={k} className={s.scaleRow}><Mono>{k}</Mono><div className={cls}>{t}</div></div>
          ))}
        </div>
      </div>

      {/* Colour */}
      <div data-reveal="" className={`${s.dsCard} ${s.colorCard}`}>
        <CardHead a="Colour" b="The orbit spectrum" />
        <div className={s.swatchLabels}>
          {SPECTRUM.map(([n, hex, at]) => (
            <div key={n} className={s.swatchLabel} style={{ left: `${at}%` }}><b>{n}</b><span>{hex}</span></div>
          ))}
        </div>
        <div className={s.spectrum} />
        <div className={s.colorFoot}>
          <div className={s.colorGroup}>
            <Mono>Neutrals</Mono>
            <div className={s.neutrals}>
              {NEUTRALS.map(([n, hex, sh]) => (
                <div key={n} className={s.neutral}>
                  <div className={s.neutralDot} style={{ background: hex, boxShadow: sh }} />
                  <div className={s.neutralText}><b>{n}</b><span>{hex}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className={s.colorGroup} style={{ gap: 18 }}>
            <Mono>In use</Mono>
            <div className={s.inUse}>
              <span className={s.sendPill}>Send</span>
              <span className={s.pill} style={{ background: 'oklch(0.94 0.04 50)', color: 'oklch(0.52 0.16 40)' }}>3 changes found</span>
              <span className={s.pill} style={{ background: 'oklch(0.95 0.03 300)', color: 'oklch(0.48 0.14 300)' }}>Thinking</span>
              <span className={s.pill} style={{ background: 'oklch(0.95 0.04 150)', color: 'oklch(0.45 0.12 150)' }}>Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Icons */}
      <div className={s.iconRow}>
        <div data-reveal="" className={s.glassIcons}>
          <CardHead a="3D glass icons" b="Tools" />
          <div className={s.glassIconRow}>
            {TOOLS.map(([n, src]) => (
              <div key={n} className={s.glassIcon}>
                <img data-float="" src={src} alt="" width={132} height={132} loading="lazy" decoding="async" />
                <div className={s.glassIconShadow} />
                <div className={s.glassIconTag}>{n}</div>
              </div>
            ))}
          </div>
        </div>
        <div data-reveal="" className={`${s.dsCard} ${s.outlineCard}`}>
          <CardHead a="Outline icons" b="24 grid · 1.5 stroke" />
          <div className={s.outlineBody}>
            <div className={s.construct}>
              <div className={s.constructCircle} />
              <div className={s.constructSquare} />
              <Icon d={ic.MagicStar} size={138} width={1} stroke="#1f1a17" style={{ position: 'relative' }} />
            </div>
            <div className={s.iconGrid}>
              {ICONS.map((n) => <div key={n}><Icon d={ic[n]} size={24} /></div>)}
            </div>
          </div>
        </div>
      </div>

      {/* Brand */}
      <div className={s.brandRow}>
        <div data-reveal="" className={`${s.dsCard} ${s.brandCard}`}>
          <CardHead a="Logomark" b="Two orbits, one spark" />
          <div className={s.logomark}>
            <div className={s.lmDashed} /><div className={s.lmSolid} /><div className={s.lmV} /><div className={s.lmH} />
            <img src={img.logo} alt="Orbita logomark" width={150} height={150} style={{ position: 'relative' }} />
          </div>
        </div>
        <div data-reveal="" className={`${s.dsCard} ${s.brandCard} ${s.col}`}>
          <CardHead a="Glass surface" b="Live sample" />
          <div className={s.glassStage}>
            <div data-float="" className={s.orbA} />
            <div data-float="" className={s.orbB} />
            <div data-float="" className={s.orbC} />
            <div className={s.glassSample}>
              <div className={s.glassSampleIcon}><img src={img.logo} alt="" width={26} height={26} /></div>
              <div className={s.minw0}><div className={s.glassSampleTitle}>Cappadocia at sunrise</div><div className={s.glassSampleSub}>Hot air balloons, golden hour</div></div>
            </div>
          </div>
          <div className={s.glassSpecs}>
            {[['Fill', '55%'], ['Blur', '28px'], ['Edge', '1px'], ['Radius', '20']].map(([k, v]) => (
              <div key={k}><Mono style={{ fontSize: 10 }}>{k}</Mono><span>{v}</span></div>
            ))}
          </div>
        </div>
        <div data-reveal="" className={`${s.dsCard} ${s.brandCard} ${s.col}`}>
          <CardHead a="App icon" b="Light · Dark" />
          <div className={s.appIcons}>
            <div className={s.appIconLight}><img src={img.logo} alt="Light app icon" width={84} height={84} /></div>
            <div className={s.appIconDark}><img src={img.logo} alt="Dark app icon" width={84} height={84} /></div>
          </div>
          <img src={img.fullLogo} alt="Orbita AI" className={s.appIconWordmark} />
        </div>
      </div>
    </section>
  );
}
