'use client'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@ui/collapsible'
import { ChevronDown } from 'lucide-react'
import {
	type ComponentProps,
	type HTMLAttributes,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { cn } from '@/lib/utils'
import { createContext } from './create'
import * as Primitive from './primitive'
import { useEffectEvent } from './use-effect-event'

const TocPopoverContext = createContext<{
	open: boolean
	setOpen: (open: boolean) => void
}>('TocPopoverContext')

export interface TOCItemType {
	title: React.ReactNode
	url: string
	depth: number
}

export function TocPopoverTrigger({
	items,
	path,
	...props
}: ComponentProps<'button'> & { items: TOCItemType[]; path: string }) {
	const { open } = TocPopoverContext.use()
	const active = Primitive.useActiveAnchor()
	const selected = useMemo(
		() => items.findIndex((item) => active === item.url.slice(1)),
		[items, active],
	)
	const showCurrent = selected !== -1 && !open

	return (
		<CollapsibleTrigger
			{...props}
			className={cn(
				'flex flex-row items-center gap-2.5 px-8 py-2.5 text-start text-muted-foreground text-sm focus-visible:outline-none md:px-10 [&_svg]:size-4 [&_svg]:shrink-0',
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
					'grid flex-1 *:col-start-1 *:row-start-1',
					open && 'text-foreground',
				)}
			>
				<span
					className={cn(
						'truncate transition-all',
						showCurrent && '-translate-y-full pointer-events-none opacity-0',
					)}
				>
					{path}
				</span>
				<span
					className={cn(
						'truncate transition-all',
						!showCurrent && 'pointer-events-none translate-y-full opacity-0',
					)}
				>
					{items[selected]?.title}
				</span>
			</span>
			<ChevronDown
				className={cn('transition-transform', open && 'rotate-180')}
			/>
		</CollapsibleTrigger>
	)
}

interface ProgressCircleProps
	extends Omit<React.ComponentProps<'svg'>, 'strokeWidth'> {
	value: number
	strokeWidth?: number
	size?: number
	min?: number
	max?: number
}

function clamp(input: number, min: number, max: number): number {
	if (input < min) return min
	if (input > max) return max
	return input
}

function ProgressCircle({
	value,
	strokeWidth = 2,
	size = 24,
	min = 0,
	max = 100,
	...restSvgProps
}: ProgressCircleProps) {
	const normalizedValue = clamp(value, min, max)
	const radius = (size - strokeWidth) / 2
	const circumference = 2 * Math.PI * radius
	const progress = (normalizedValue / max) * circumference
	const circleProps = {
		cx: size / 2,
		cy: size / 2,
		r: radius,
		fill: 'none',
		strokeWidth,
	}

	return (
		<div
			role='progressbar'
			aria-valuenow={normalizedValue}
			aria-valuemin={min}
			aria-valuemax={max}
			className={restSvgProps.className}
			style={restSvgProps.style}
		>
			<svg viewBox={`0 0 ${size} ${size}`}>
				<title>Progress Circle</title>
				<circle {...circleProps} className='stroke-current/25' />
				<circle
					{...circleProps}
					stroke='currentColor'
					strokeDasharray={circumference}
					strokeDashoffset={circumference - progress}
					strokeLinecap='round'
					transform={`rotate(-90 ${size / 2} ${size / 2})`}
					className='transition-all'
				/>
			</svg>
		</div>
	)
}

export function TocPopoverContent(props: ComponentProps<'div'>) {
	return (
		<CollapsibleContent
			data-toc-popover=''
			{...props}
			className={cn('flex flex-col px-6', props.className)}
		>
			{props.children}
		</CollapsibleContent>
	)
}

export function TocPopover(props: HTMLAttributes<HTMLDivElement>) {
	const ref = useRef<HTMLElement>(null)
	const [open, setOpen] = useState(false)

	const onClick = useEffectEvent((e: Event) => {
		if (!open) return

		if (ref.current && !ref.current.contains(e.target as HTMLElement))
			setOpen(false)
	})

	useEffect(() => {
		window.addEventListener('click', onClick)

		return () => {
			window.removeEventListener('click', onClick)
		}
	}, [onClick])

	return (
		<div
			{...props}
			className={cn('sticky z-10 overflow-visible', props.className)}
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
							'border-foreground/10 border-b backdrop-blur-sm transition-colors',
							open && 'bg-background/90',
							open && 'shadow-lg',
						)}
					>
						{props.children}
					</header>
				</Collapsible>
			</TocPopoverContext.Provider>
		</div>
	)
}
