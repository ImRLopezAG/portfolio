import { type HTMLAttributes, type RefObject, useEffect, useRef } from 'react';
import * as Primitive from './primitive';
import { useOnChange } from './use-on-change';
import { useEffectEvent } from './use-effect-event';

export type TOCThumb = [top: number, height: number];

function calc(container: HTMLElement, active: string[]): TOCThumb {
  if (active.length === 0 || container.clientHeight === 0) {
    return [0, 0];
  }

  let upper = Number.MAX_VALUE;
  let lower = 0;

  for (const item of active) {
    const element = container.querySelector<HTMLElement>(`a[href="#${item}"]`);
    if (!element) continue;

    const styles = getComputedStyle(element);
    upper = Math.min(upper, element.offsetTop + Number.parseFloat(styles.paddingTop));
    lower = Math.max(
      lower,
      element.offsetTop +
        element.clientHeight -
        Number.parseFloat(styles.paddingBottom),
    );
  }

  return [upper, lower - upper];
}

function update(element: HTMLElement, info: TOCThumb): void {
  element.style.setProperty('--top', `${info[0]}px`);
  element.style.setProperty('--height', `${info[1]}px`);
}

export function TocThumb({
  containerRef,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const active = Primitive.useActiveAnchors();
  const thumbRef = useRef<HTMLDivElement>(null);

  const onResize = useEffectEvent(() => {
    if (!containerRef.current || !thumbRef.current) return;

    update(thumbRef.current, calc(containerRef.current, active));
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    onResize();
    const observer = new ResizeObserver(onResize);
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [containerRef, onResize]);

  useOnChange(active, () => {
    if (!containerRef.current || !thumbRef.current) return;

    update(thumbRef.current, calc(containerRef.current, active));
  });

  return <div ref={thumbRef} {...props} />;
}
