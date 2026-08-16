'use client'

import { cn } from '@lib/utils'
import { RotateCcw } from 'lucide-react'
import { animate, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

interface Phase {
	label: string
	/** 0–100: share of the day spent writing code in this phase. */
	code: number
}

interface RoleShiftProps {
	phases: Phase[]
	legend?: { code: string; decisions: string }
	/** Where the shift ends up, e.g. "Technical Lead Engineer". */
	outcome: string
	caption?: string
}

const EN = { code: 'writing code', decisions: 'deciding & verifying' }

const STEP_DELAY = 0.55

/** A number that counts up to its target when the phase's turn arrives. */
function Count({ value, delay }: { value: number; delay: number }) {
	const ref = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		const controls = animate(0, value, {
			delay,
			duration: 0.8,
			ease: 'easeOut',
			onUpdate: (v) => {
				if (ref.current) ref.current.textContent = `${Math.round(v)}%`
			},
		})
		return () => controls.stop()
	}, [value, delay])

	return (
		<span ref={ref} className='tabular-nums'>
			0%
		</span>
	)
}

/**
 * The job changing shape as an iteration, not a chart: each phase plays in
 * turn — the bar drains code-time and fills decision-time while the number
 * counts up and a marker steps down the list. Replayable.
 */
export function RoleShift({
	phases,
	legend = EN,
	outcome,
	caption,
}: RoleShiftProps) {
	// Remount the animated block to replay the whole sequence.
	const [run, setRun] = useState(0)
	const total = phases.length * STEP_DELAY

	return (
		<figure className='not-prose my-8 overflow-hidden rounded-xl border border-white/10 bg-[#101014] shadow-[0_18px_50px_-12px_rgba(0,0,0,0.9)]'>
			<div className='flex items-center gap-4 px-5 pt-4 font-mono text-[10px] text-white/40'>
				<span className='flex items-center gap-1.5'>
					<span className='size-2 rounded-[2px] bg-[#7aa2f7]/70' />
					{legend.code}
				</span>
				<span className='flex items-center gap-1.5'>
					<span className='size-2 rounded-[2px] bg-[#4ea96f]/80' />
					{legend.decisions}
				</span>
				<button
					type='button'
					onClick={() => setRun((n) => n + 1)}
					className='ml-auto inline-flex items-center gap-1.5 rounded-md border border-white/12 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-white/70 transition-colors hover:border-[#4ea96f]/40 hover:text-[#4ea96f]'
				>
					<RotateCcw aria-hidden='true' className='size-3' />
					replay
				</button>
			</div>

			<div key={run} className='space-y-3 px-5 py-4'>
				{phases.map((phase, index) => {
					const delay = index * STEP_DELAY
					return (
						<motion.div
							key={phase.label}
							initial={{ opacity: 0.35, x: -6 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay, duration: 0.3 }}
						>
							<div className='mb-1 flex items-baseline justify-between'>
								<span className='flex items-center gap-2 font-mono text-[11px] text-white/60'>
									<motion.span
										className='size-1.5 rounded-full bg-[#4ea96f]'
										initial={{ scale: 0 }}
										animate={{ scale: [0, 1.6, 1] }}
										transition={{ delay, duration: 0.45 }}
									/>
									{phase.label}
								</span>
								<span className='font-mono text-[10px] text-white/25'>
									<Count value={100 - phase.code} delay={delay} />
								</span>
							</div>
							<div className='flex h-2.5 overflow-hidden rounded-full bg-white/[0.05]'>
								<motion.span
									className='h-full bg-[#7aa2f7]/70'
									initial={{ width: '100%' }}
									animate={{ width: `${phase.code}%` }}
									transition={{ delay, duration: 0.8, ease: 'easeOut' }}
								/>
								<motion.span
									className='h-full bg-[#4ea96f]/80'
									initial={{ width: '0%' }}
									animate={{ width: `${100 - phase.code}%` }}
									transition={{ delay, duration: 0.8, ease: 'easeOut' }}
								/>
							</div>
						</motion.div>
					)
				})}

				<motion.p
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: total + 0.3 }}
					className={cn(
						'mt-4 inline-flex items-center gap-2 rounded-full border border-[#4ea96f]/30',
						'bg-[#4ea96f]/10 px-3 py-1 font-mono text-[#4ea96f] text-[11px]',
					)}
				>
					<span className='size-1.5 animate-pulse rounded-full bg-[#4ea96f]' />
					{outcome}
				</motion.p>
			</div>

			{caption && (
				<figcaption className='border-white/8 border-t px-5 py-2.5 text-white/35 text-xs'>
					{caption}
				</figcaption>
			)}
		</figure>
	)
}
