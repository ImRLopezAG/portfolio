'use client'

import { cn } from '@lib/utils'
import { Check, RotateCcw } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

interface Lane {
	label: string
	meta?: string
	/**
	 * One entry per iteration of this way of working:
	 * 0 = idle · 1 = the user iterating (red) · 2 = the AI iterating (green)
	 * 3 = a second project's layer (blue) · 4 = a third layer (yellow)
	 */
	cells: number[]
	/**
	 * Extra parallel tracks stacked under `cells` — for modes that run several
	 * project layers at once. Each layer gets its own independent runner that
	 * advances and regresses on its own reds.
	 */
	layers?: number[][]
	/** Cell index where this lane's process settles into flow. */
	greenAt: number
	/**
	 * How the runner moves. Each mode regresses differently:
	 * steps      — tiny forward ticks, no setback (tab completion)
	 * hops       — small jumps, tiny setbacks at reds (extensions)
	 * bigswings  — jumps forward, thrown far back at reds (CLIs)
	 * leaps      — big leaps forward, heavy setbacks (skills + loops)
	 * glide      — big leaps, quick recoveries, smoothest run (agentic UIs)
	 */
	pace?: 'steps' | 'hops' | 'bigswings' | 'leaps' | 'glide'
}

interface RaceProps {
	badge?: string
	title: string
	subtitle?: string
	/** Big fraction, e.g. [6, 6]. */
	score: [number, number]
	scoreLabel: string
	axis: string[]
	lanes: Lane[]
	legend?: { cell: number; label: string }[]
	caption?: string
	duration?: number
}

/* Inline colors — arbitrary-value classes are unreliable in this CSS setup. */
const CELL = [
	'rgba(255,255,255,0.06)',
	'#f7768e',
	'#4ea96f',
	'#7aa2f7',
	'#e0af68',
] as const

const PACE = {
	steps: { step: 1, back: 0, dwell: 1 },
	hops: { step: 2, back: 1, dwell: 2 },
	bigswings: { step: 3, back: 5, dwell: 3 },
	leaps: { step: 5, back: 4, dwell: 3 },
	glide: { step: 6, back: 2, dwell: 1 },
} as const

/**
 * Build the runner's position over time for one lane, in that lane's own cell
 * units: it walks its iterations at its own stride, and every red cell (the
 * user stepping in) throws it back before it re-advances — so regressions are
 * visible as motion, not just as color.
 */
function buildPath(cells: number[], pace: Lane['pace']): number[] {
	const columns = cells.length
	const { step, back, dwell } = PACE[pace ?? 'hops']
	const start = cells.findIndex((c) => c !== 0)
	const path: number[] = [Math.max(0, start)]
	let pos = Math.max(0, start)
	const hitReds = new Set<number>()

	while (pos < columns) {
		const next = Math.min(pos + step, columns)
		// First red crossed in this stride triggers a regression.
		let red = -1
		for (let i = pos; i < next; i++) {
			if (cells[i] === 1 && !hitReds.has(i)) {
				red = i
				break
			}
		}
		if (red >= 0) {
			hitReds.add(red)
			path.push(red + 1)
			const fallback = Math.max(0, red + 1 - back)
			for (let d = 0; d < dwell; d++) path.push(fallback)
		} else {
			path.push(next)
		}
		pos = Math.max(pos, red >= 0 ? red + 1 : next)
	}
	path.push(columns)
	return path
}

/**
 * A multi-lane race where every lane shows the *shape of its process* — who
 * iterates (red = you, green = the AI, blue/yellow = parallel project layers)
 * — and every contender runs with its own gait: forward strides sized per
 * mode, and every red cell visibly throwing the runner back before it
 * recovers. The eye reads the churn, not just the final color.
 */
export function Race({
	badge,
	title,
	subtitle,
	score,
	scoreLabel,
	axis,
	lanes,
	legend,
	caption,
	duration = 3200,
}: RaceProps) {
	const [progress, setProgress] = useState(1)
	const [playing, setPlaying] = useState(false)
	const frame = useRef<number>(undefined)

	// Every lane is one or more parallel tracks; each track gets its own path.
	const tracks = useMemo(
		() => lanes.map((lane) => [lane.cells, ...(lane.layers ?? [])]),
		[lanes],
	)
	const paths = useMemo(
		() => tracks.map((ts, i) => ts.map((c) => buildPath(c, lanes[i].pace))),
		[tracks, lanes],
	)

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

	// Per-track head position in that track's own cell units, sampled from its
	// own path — so every layer of every lane moves with its own rhythm.
	const heads = tracks.map((ts, i) =>
		ts.map((cells, j) => {
			if (!playing && progress >= 1) return cells.length
			const path = paths[i][j]
			const t = progress * (path.length - 1)
			const k = Math.floor(t)
			const frac = t - k
			const a = path[k]
			const b = path[Math.min(k + 1, path.length - 1)]
			return a + (b - a) * frac
		}),
	)

	// A track's revealed extent is the furthest its runner has been; the head
	// swinging back leaves the trail lit, so setbacks read as re-covered ground.
	const maxSeen = useRef<number[][]>(tracks.map((ts) => ts.map(() => 0)))
	if (progress === 0) maxSeen.current = tracks.map((ts) => ts.map(() => 0))
	maxSeen.current = maxSeen.current.map((ms, i) =>
		ms.map((m, j) => Math.max(m, heads[i][j])),
	)

	const greenSoFar = lanes.filter((l, i) => l.greenAt <= heads[i][0]).length

	return (
		<figure className='not-prose my-8 overflow-hidden rounded-xl border border-white/10 bg-[#0d0d10] shadow-[0_18px_50px_-12px_rgba(0,0,0,0.9)]'>
			<div className='flex flex-wrap items-center gap-x-3 gap-y-2 px-5 pt-5'>
				{badge && (
					<span className='rounded-full border border-[#f7768e]/40 px-2.5 py-0.5 font-mono text-[#f7768e] text-[10px] uppercase tracking-[0.14em]'>
						{badge}
					</span>
				)}
				<span className='font-mono text-[11px] text-white/40 uppercase tracking-[0.18em]'>
					{title}
				</span>
			</div>

			{subtitle && (
				<p className='px-5 pt-2 font-mono text-[13px] text-white/70'>
					{subtitle}
				</p>
			)}

			{legend && (
				<div className='flex flex-wrap items-center gap-x-4 gap-y-1.5 px-5 pt-3'>
					{legend.map((item) => (
						<span
							key={item.label}
							className='flex items-center gap-1.5 font-mono text-[10px] text-white/45'
						>
							<span
								className='size-2 rounded-[2px]'
								style={{ background: CELL[item.cell] }}
							/>
							{item.label}
						</span>
					))}
				</div>
			)}

			<div className='flex flex-wrap items-center gap-x-5 gap-y-3 px-5 pt-4 pb-5'>
				<p className='flex items-baseline gap-2'>
					<span className='font-bold text-4xl text-[#4ea96f] tabular-nums'>
						{greenSoFar}
					</span>
					<span className='text-2xl text-white/25'>/</span>
					<span className='font-bold text-4xl text-[#4ea96f] tabular-nums'>
						{score[1]}
					</span>
					<span className='ml-1 font-mono text-[13px] text-white/50'>
						{scoreLabel}
					</span>
				</p>

				<button
					type='button'
					onClick={() => {
						maxSeen.current = tracks.map((ts) => ts.map(() => 0))
						setProgress(0)
						setPlaying(true)
					}}
					disabled={playing}
					className='ml-auto inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.05] px-4 py-2 font-mono text-[13px] text-white/80 transition-colors hover:border-[#4ea96f]/40 hover:text-[#4ea96f] disabled:opacity-40'
				>
					{playing ? (
						<>
							<span className='size-1.5 animate-pulse rounded-full bg-[#4ea96f]' />
							playing
						</>
					) : (
						<>
							<RotateCcw aria-hidden='true' className='size-3.5' />
							replay
						</>
					)}
				</button>
			</div>

			<div className='overflow-x-auto px-5 pb-5'>
				<div className='min-w-[34rem]'>
					<div
						className='mb-1.5 grid font-mono text-[10px] text-white/30'
						style={{
							gridTemplateColumns: `10.5rem repeat(${axis.length}, 1fr) 1.25rem`,
						}}
					>
						<span />
						{axis.map((tick) => (
							<span key={tick}>{tick}</span>
						))}
						<span />
					</div>

					<div>
						{lanes.map((lane, laneIndex) => {
							const laneTracks = tracks[laneIndex]
							const green = lane.greenAt <= heads[laneIndex][0]
							return (
								<div
									key={lane.label}
									className='grid items-center gap-x-2 py-[3px]'
									style={{ gridTemplateColumns: '10.5rem 1fr 1.25rem' }}
								>
									<span className='truncate text-right font-mono text-[12px] text-white/70'>
										{lane.label}
										{lane.meta && (
											<span className='text-white/25'> · {lane.meta}</span>
										)}
									</span>

									{/* One strip per parallel track — a layered lane stacks
									    them, each with its own independent runner. */}
									{/* Every lane spans the full width; how many bars it holds
									    is the story. A layered lane stacks full-height tracks,
									    so each layer's bars match the other lanes' bars. */}
									<span className='flex flex-col' style={{ gap: 3 }}>
										{laneTracks.map((cells, trackIndex) => {
											const cols = cells.length
											const head = heads[laneIndex][trackIndex]
											const seen = Math.max(
												maxSeen.current[laneIndex][trackIndex],
												head,
											)
											return (
												<span
													// biome-ignore lint/suspicious/noArrayIndexKey: tracks are a fixed stack
													key={trackIndex}
													className='relative flex gap-[1px]'
													style={{ height: 16 }}
												>
													{cells.map((cell, index) => (
														<span
															// biome-ignore lint/suspicious/noArrayIndexKey: cells are a fixed positional grid
															key={`${lane.label}-${trackIndex}-${index}`}
															className={cn(
																'flex-1 rounded-[1px] transition-opacity duration-150',
																index < seen ? 'opacity-100' : 'opacity-20',
																// The stretch the runner was thrown back
																// over glows dimmer until re-covered.
																index >= head && index < seen && 'opacity-45',
															)}
															style={{ background: CELL[cell] }}
														/>
													))}

													{playing && (
														<span
															aria-hidden='true'
															className='pointer-events-none absolute inset-y-[-2px] w-[3px] rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.45)]'
															style={{
																left: `${(Math.min(head, cols) / cols) * 100}%`,
															}}
														/>
													)}
												</span>
											)
										})}
									</span>

									<span className='flex justify-center'>
										{green && (
											<Check
												aria-hidden='true'
												className='size-3 text-[#4ea96f]'
											/>
										)}
									</span>
								</div>
							)
						})}
					</div>
				</div>
			</div>

			{caption && (
				<figcaption className='border-white/8 border-t px-5 py-3.5 text-[12.5px] text-white/45 leading-relaxed'>
					{caption}
				</figcaption>
			)}
		</figure>
	)
}
