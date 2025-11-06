'use client';

import {
  type ComponentProps,
  type HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffectEvent } from './use-effect-event';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import * as Primitive from './primitive';
import { createContext } from './create';

const TocPopoverContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
}>('TocPopoverContext');

export interface TOCItemType {
  title: React.ReactNode;
  url: string;
  depth: number;
}

export function TocPopoverTrigger({
  items,
  path,
  ...props
}: ComponentProps<'button'> & { items: TOCItemType[], path: string  }) {
  const { open } = TocPopoverContext.use();
  const active = Primitive.useActiveAnchor();
  const selected = useMemo(
    () => items.findIndex((item) => active === item.url.slice(1)),
    [items, active],
  );
  const showCurrent = selected !== -1 && !open;

  return (
    <CollapsibleTrigger
      {...props}
      className={cn(
        'flex flex-row items-center text-sm text-muted-foreground gap-2.5 px-8 py-2.5 text-start focus-visible:outline-none [&_svg]:shrink-0 [&_svg]:size-4 md:px-10',
        props.className,
      )}
    >
      <ProgressCircle
        value={(selected + 1) / items.length}
        max={1}
        className={cn(open && 'text-primary')}
      />
      <span
        className={cn(
          'grid flex-1 *:row-start-1 *:col-start-1',
          open && 'text-foreground',
        )}
      >
        <span
          className={cn(
            'truncate transition-all',
            showCurrent && 'opacity-0 -translate-y-full pointer-events-none',
          )}
        >
          {path}
        </span>
        <span
          className={cn(
            'truncate transition-all',
            !showCurrent && 'opacity-0 translate-y-full pointer-events-none',
          )}
        >
          {items[selected]?.title}
        </span>
      </span>
      <ChevronDown
        className={cn('transition-transform', open && 'rotate-180')}
      />
    </CollapsibleTrigger>
  );
}

interface ProgressCircleProps
  extends Omit<React.ComponentProps<'svg'>, 'strokeWidth'> {
  value: number;
  strokeWidth?: number;
  size?: number;
  min?: number;
  max?: number;
}

function clamp(input: number, min: number, max: number): number {
  if (input < min) return min;
  if (input > max) return max;
  return input;
}

function ProgressCircle({
  value,
  strokeWidth = 2,
  size = 24,
  min = 0,
  max = 100,
  ...restSvgProps
}: ProgressCircleProps) {
  const normalizedValue = clamp(value, min, max);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (normalizedValue / max) * circumference;
  const circleProps = {
    cx: size / 2,
    cy: size / 2,
    r: radius,
    fill: 'none',
    strokeWidth,
  };

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      aria-valuenow={normalizedValue}
      aria-valuemin={min}
      aria-valuemax={max}
      {...restSvgProps}
    >
      <title>Progress Circle</title>
      <circle {...circleProps} className="stroke-current/25" />
      <circle
        {...circleProps}
        stroke="currentColor"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-all"
      />
    </svg>
  );
}

export function TocPopoverContent(props: ComponentProps<'div'>) {
  return (
    <CollapsibleContent
      data-toc-popover=""
      {...props}
      className={cn('flex flex-col px-6', props.className)}
    >
      {props.children}
    </CollapsibleContent>
  );
}

export function TocPopover(props: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);


  const onClick = useEffectEvent((e: Event) => {
    if (!open) return;

    if (ref.current && !ref.current.contains(e.target as HTMLElement))
      setOpen(false);
  });

  useEffect(() => {
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [onClick]);

  return (
    <div
      {...props}
      className={cn('sticky overflow-visible z-10', props.className)}
      style={{
        ...props.style,
        top: 'calc(var(--banner-height) + var(--nav-height))',
      }}
    >
      <TocPopoverContext.Provider
        value={useMemo(
          () => ({
            open,
            setOpen,
          }),
          [open],
        )}
      >
        <Collapsible open={open} onOpenChange={setOpen} asChild>
          <header
            ref={ref}
            {...props}
            className={cn(
              'border-b border-foreground/10 backdrop-blur-sm transition-colors',
              (open) && 'bg-background/90',
              open && 'shadow-lg',
            )}
          >
            {props.children}
          </header>
        </Collapsible>
      </TocPopoverContext.Provider>
    </div>
  );
}
