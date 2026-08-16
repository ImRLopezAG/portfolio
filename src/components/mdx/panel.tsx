import { cn } from '@lib/utils'
import type { ReactNode } from 'react'

/**
 * Shared chrome for the interactive figures. The opacity matters: the site
 * renders an animated 3D field behind the article, and anything lighter than
 * this lets particles bleed through the panel and wreck legibility.
 */
export function Panel({
	className,
	children,
}: {
	className?: string
	children: ReactNode
}) {
	return (
		<figure
			className={cn(
				'not-prose my-8 overflow-hidden rounded-xl border border-white/10',
				'bg-neutral-950/92 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_18px_50px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl',
				className,
			)}
		>
			{children}
		</figure>
	)
}

export function PanelBar({
	left,
	right,
}: {
	left: ReactNode
	right?: ReactNode
}) {
	return (
		<div className='flex items-center justify-between gap-3 border-white/8 border-b bg-gradient-to-r from-white/[0.04] to-transparent px-4 py-2.5'>
			<div className='min-w-0 font-mono text-[11px] text-white/45 uppercase tracking-[0.18em]'>
				{left}
			</div>
			{right}
		</div>
	)
}

export function PanelButton({
	onClick,
	children,
	disabled,
}: {
	onClick: () => void
	children: ReactNode
	disabled?: boolean
}) {
	return (
		<button
			type='button'
			onClick={onClick}
			disabled={disabled}
			className='inline-flex shrink-0 items-center gap-2 rounded-md border border-white/12 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-white/80 transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary disabled:opacity-40'
		>
			{children}
		</button>
	)
}
