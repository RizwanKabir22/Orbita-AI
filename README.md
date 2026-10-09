# Orbita AI — Case Study (production build)

The *Orbita Case Study* design from `../project`, rebuilt as a fast static site
with Vite, React 19 and TypeScript.

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build → dist/
npm run preview    # serve dist/
npm run assets     # re-generate optimised images (needs the Claude Design export at ../../project)
```

`dist/` is fully static (relative paths), so it can be dropped on any host:
Netlify, Vercel, Cloudflare Pages, GitHub Pages or S3.

**GitHub Pages:** `.github/workflows/deploy.yml` builds and deploys on every
push to `main`. One-time setup: *Settings → Pages → Build and deployment →
Source: GitHub Actions*. The site is then live at
`https://rizwankabir22.github.io/Orbita-AI/`.

## What changed from the prototype, and why it's smoother

| Prototype | This build |
|---|---|
| 7 `<iframe>`s, each booting React + Babel in the browser to show the app screens | The desktop (light/dark) and the three phone screens are native components; ~1.8k DOM nodes instead of ~5.2k |
| `filter: blur(90–130px)` glows, re-blurred every frame while drifting | Same falloff baked into a static radial-gradient (`lib/blob.ts`), so moving it is free |
| Pulsing glows animated `box-shadow` (repaint every frame) | A disc that scales and fades behind the button, on the GPU only |
| Every loop ran forever, on or off screen | Phone timelines, floats, the logo spin and the marquee pause off-screen and in background tabs |
| 4.5 MB of PNG/JPEG | 0.5 MB of right-sized WebP |
| Google Fonts, render-blocking | Self-hosted variable fonts (Urbanist, Manrope) + JetBrains Mono |
| The page scaled with a JS transform and a measured height | CSS `zoom` at ≥1024px (layout stays correct); a real reflowed layout on tablets and phones |

Measured in headless Chromium (software rendering, 1440×900): hero idle went
from 13 fps to 60 fps, and a full-page scroll from 29 fps to ~51 fps.
`prefers-reduced-motion` is honoured: loops stop and the phones freeze on a
finished frame.

## Map

- `src/screens/DesktopApp.tsx`: the 1440×920 desktop app, `theme="light" | "dark"`
- `src/screens/PhoneScreens.tsx`: Library, Conversation and Voice (390×844), driven by `lib/useMotion.ts`
- `src/lib/useMotion.ts`: the phone animation timeline (a typed port of the prototype's motion script)
- `src/components/Devices.tsx`: hero desktop frame, hero iPhone slideshow, feature phones, dark desktop
- `src/sections/*`: the case study, top to bottom; styles in `cs.module.css`
- `scripts/optimize-assets.mjs`: WebP conversion, plus baking the crops you set on the three dropped-in mockups

## Notes

- The mockup photos you placed in the prototype's image slots (phone in hand, app
  icon, person) are kept with the crop you chose, re-framed to the grid. In the
  prototype that row overflowed past the right edge.
- In the hero iPhone, the frame's own camera island stays visible. In the prototype
  it disappeared after the first screen switch, because of a stacking bug.
- The brief quote still reads "Founder · Orbita AI"; swap in the real name when you have it.
