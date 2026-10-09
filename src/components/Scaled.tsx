import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from 'react';

type Props = {
  /** Design size of the content. */
  w: number;
  h: number;
  className?: string;
  style?: CSSProperties;
  innerStyle?: CSSProperties;
  children: ReactNode;
};

/**
 * Renders `children` at their fixed design size and scales them to whatever
 * width CSS gives the box. The scale is written straight to the DOM from a
 * ResizeObserver, so resizing never re-renders the (large) app screens.
 */
export function Scaled({ w, h, className, style, innerStyle, children }: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const o = outer.current, i = inner.current;
    if (!o || !i) return;
    const apply = (width: number) => { if (width > 0) i.style.transform = `scale(${width / w})`; };
    apply(o.clientWidth);
    const ro = new ResizeObserver(([e]) => apply(e.contentRect.width));
    ro.observe(o);
    return () => ro.disconnect();
  }, [w]);

  return (
    <div ref={outer} className={className} style={{ position: 'relative', aspectRatio: `${w} / ${h}`, ...style }}>
      <div ref={inner} style={{ position: 'absolute', left: 0, top: 0, width: w, height: h, transformOrigin: '0 0', ...innerStyle }}>
        {children}
      </div>
    </div>
  );
}
