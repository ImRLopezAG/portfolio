'use client'

import { cn } from '@lib/utils'
import { Play, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Panel, PanelBar, PanelButton } from './panel'

interface Stat {
	label: string
	value: number
	prefix?: string
	suffix?: string
}

interface Marker {
	/** Position along the series, 0–1. */
	at: number
	label: string
}

interface ReplayProps {
	title?: string
	note?: string
	stats: Stat[]
	/** Relative bar heights. Values are normalised, so any scale works. */
	series: number[]
	markers?: Marker[]
	duration?: number
}

function format({ value, prefix = '', suffix = '' }: Stat, progress: number) {
	return `${prefix}${Math.round(value * progress).toLocaleString('en-US')}${suffix}`
}

/**
 * A replayable activity chart: bars grow left to right behind a sweeping
 * playhead while the counters climb. Renders finished by default so the post
 * reads without interaction.
 */
export function Replay({
	title,
	note,
	stats,
	series,
	markers = [],
	duration = 2600,
}: ReplayProps) {
	const [progress, setProgress] = useState(1)
	const [playing, setPlaying] = useState(false)
	const frame = useRef<number>(undefined)

	const peak = Math.max(...series, 1)

	useEffect(() => {
		if (!playing) return
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setProgress(1)
			setPlaying(false)
			return
		}

		let start: number | null = null
		const step = (now: number) => {
			start ??= now
			const next = Math.min((now - start) / duration, 1)
			setProgress(next)
			if (next < 1) frame.current = requestAnimationFrame(step)
			else setPlaying(false)
		}
		frame.current = requestAnimationFrame(step)
		return () => {
			if (frame.current) cancelAnimationFrame(frame.current)
		}
	}, [playing, duration])

	const revealed = Math.round(series.length * progress)

	return (
		<Panel>
			<PanelBar
				left={
					<div className='flex items-baseline gap-3'>
						{title && <span>{title}</span>}
						{note && (
							<span className='truncate text-white/25 normal-case tracking-normal'>
								{note}
							</span>
						)}
					</div>
				}
				right={
					<PanelButton
						onClick={() => {
							setProgress(0)
							setPlaying(true)
						}}
						disabled={playing}
					>
						{playing ? (
							<>
								<span className='size-1.5 animate-pulse rounded-full bg-primary' />
								playing
							</>
						) : (
							<>
								{progress === 1 ? (
									<RotateCcw aria-hidden='true' className='size-3' />
								) : (
									<Play aria-hidden='true' className='size-3' />
								)}
								replay
							</>
						)}
					</PanelButton>
				}
			/>

			{/* Fixed columns — a wrapping flex row let long numbers collide. */}
			<dl className='grid grid-cols-3 gap-px border-white/8 border-b bg-white/[0.03]'>
				{stats.map((stat) => (
					<div key={stat.label} className='bg-neutral-950/80 px-4 py-4'>
						<dd className='font-bold text-2xl text-white tabular-nums leading-none sm:text-3xl'>
							{format(stat, progress)}
						</dd>
						<dt className='mt-2 font-mono text-[9px] text-white/35 uppercase leading-tight tracking-[0.14em]'>
							{stat.label}
						</dt>
					</div>
				))}
			</dl>

			<div className='relative px-4 pt-6 pb-4'>
				<div className='relative flex h-28 items-end gap-[3px]'>
					{series.map((value, index) => {
						const on = index < revealed
						return (
							<span
								key={`${index}-${value}`}
								className={cn(
									'flex-1 rounded-t-[2px] bg-gradient-to-t from-primary/25 to-primary transition-all duration-300',
									on ? 'opacity-100' : 'opacity-0',
								)}
								style={{
									height: `${Math.max((value / peak) * 100, 3)}%`,
									boxShadow: on
										? '0 0 12px -2px var(--color-primary)'
										: undefined,
								}}
							/>
						)
					})}

					{playing && (
						<span
							aria-hidden='true'
							className='pointer-events-none absolute inset-y-0 w-px bg-primary/70 shadow-[0_0_14px_2px_var(--color-primary)]'
							style={{ left: `${progress * 100}%` }}
						/>
					)}
				</div>

				<div className='mt-3 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent' />

				{markers.length > 0 && (
					<div className='relative mt-2 h-4'>
						{markers.map((marker) => (
							<span
								key={marker.label}
								className='absolute whitespace-nowrap font-mono text-[10px] text-white/30'
								style={{
									left: `${marker.at * 100}%`,
									transform:
										marker.at > 0.8
											? 'translateX(-100%)'
											: marker.at < 0.1
												? 'none'
												: 'translateX(-50%)',
								}}
							>
								{marker.label}
							</span>
						))}
					</div>
				)}
			</div>
		</Panel>
	)
}
