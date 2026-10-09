import type { CSSProperties } from 'react';

// Error-function approximation (Abramowitz–Stegun 7.1.26), |ε| < 1.5e-7.
function erf(x: number) {
  const s = Math.sign(x);
  x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return s * y;
}
const phi = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2));

/**
 * The design uses `filter: blur(90–130px)` on solid discs for its soft colour
 * glows. A GPU blur of that radius is re-rasterised whenever the layer moves,
 * which is what made the prototype stutter. This returns the same falloff as a
 * static radial-gradient, so the glow costs one paint and moves for free.
 *
 * `size` is the disc diameter, `blur` the CSS blur radius (σ), `color` an
 * `oklch(L C H)` triple without alpha, `opacity` the layer opacity.
 */
export function blobStyle(size: number, blur: number, color: string, opacity: number): CSSProperties {
  const r = size / 2;
  const reach = Math.ceil(2.6 * blur);
  const R = r + reach;
  const stops: string[] = [];
  const n = 14;
  for (let i = 0; i <= n; i++) {
    const d = (R * i) / n;
    const a = opacity * phi((r - d) / blur) * (i === n ? 0 : 1);
    stops.push(`${color.replace(')', ` / ${a.toFixed(3)})`)} ${((d / R) * 100).toFixed(1)}%`);
  }
  return {
    inset: -reach,
    background: `radial-gradient(closest-side, ${stops.join(', ')})`,
  };
}
