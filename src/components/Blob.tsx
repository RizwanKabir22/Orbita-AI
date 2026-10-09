import { memo, type CSSProperties } from 'react';
import { blobStyle } from '../lib/blob';

type Props = {
  size: number;
  blur: number;
  color: string;
  opacity: number;
  /** Placement of the original disc (left/top/right/bottom/transform). */
  at: CSSProperties;
  /** Optional motion hook, e.g. `drift` for the phone screens. */
  anim?: string;
  i?: number;
};

/** A soft colour glow, geometry-identical to a blurred disc but paint-once. */
export const Blob = memo(function Blob({ size, blur, color, opacity, at, anim, i }: Props) {
  return (
    <div
      data-anim={anim}
      data-i={i}
      style={{ position: 'absolute', width: size, height: size, pointerEvents: 'none', ...at }}
    >
      <div style={{ position: 'absolute', ...blobStyle(size, blur, color, opacity) }} />
    </div>
  );
});
