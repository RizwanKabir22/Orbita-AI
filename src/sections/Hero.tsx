import { HeroDesktop, HeroPhone } from '../components/Devices';
import { img } from '../assets';
import s from './cs.module.css';

export function TopBar() {
  return (
    <nav className={`${s.wrap} ${s.topbar}`}>
      <img src={img.fullLogo} alt="Orbita AI" className={s.topLogo} />
      <div className={s.byline}>Designed by <span>Rizwan Kabir Khan</span></div>
      <div className={s.topMeta}><span className={s.gradDot} />Case study · 2026</div>
    </nav>
  );
}

export function Hero() {
  return (
    <section data-screen-label="01 Hero" className={`${s.wrap} ${s.hero}`}>
      <div className={s.heroGlowA} />
      <div className={s.heroGlowB} />
      <div className={s.heroStage}>
        <div className={s.heroDevices}>
          <HeroDesktop />
          <HeroPhone />
        </div>
      </div>

      <div data-reveal="" className={s.heroIntro}>
        <div className={s.heroPill}><img src={img.logo} alt="" width={22} height={22} />AI personal assistant · Desktop &amp; iOS</div>
        <h1 className={s.heroTitle}>Orbita AI</h1>
        <p className={s.heroLede}>A personal assistant designed to feel warm, calm and quietly capable.</p>
      </div>
    </section>
  );
}
