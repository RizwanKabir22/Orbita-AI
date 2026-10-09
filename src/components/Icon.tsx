import { memo, type CSSProperties } from 'react';

type Props = {
  d: string;
  size?: number;
  stroke?: string;
  width?: number;
  style?: CSSProperties;
  className?: string;
};

/** A 24-grid outline icon drawn from a single path. */
export const Icon = memo(function Icon({ d, size = 20, stroke = 'currentColor', width = 1.5, style, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
});
