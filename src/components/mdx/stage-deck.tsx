'use client'

import { cn } from '@lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

interface Stage {
	label: string
	headline: string
	body: string
	/** Short right-aligned note, e.g. the ceiling this stage broke. */
	note?: string
}

interface StageDeckProps {
	stages: Stage[]
	caption?: string
}

const variants = {
	enter: (direction: number) => ({
		x: direction > 0 ? 56 : -56,
		opacity: 0,
		filter: 'blur(4px)',
	}),
	center: { x: 0, opacity: 1, filter: 'blur(0px)' },
	exit: (direction: number) => ({
		x: direction > 0 ? -56 : 56,
		opacity: 0,
		filter: 'blur(4px)',
	}),
}

/**
 * A swipeable deck: one stage on screen at a time with a progress rail, arrow
 * controls and drag-to-swipe. Cards slide and cross-fade with a spring so the
 * deck reads as one continuous strip rather than swapped text.
 */
export function StageDeck({ stages, caption }: StageDeckProps) {
	const [[index, direction], setState] = useState([0, 0])

	const go = (next: number) => {
		const clamped = Math.max(0, Math.min(stages.length - 1, next))
		if (clamped !== index) setState([clamped, clamped > index ? 1 : -1])
	}

	const stage = stages[index]

	return (
		<figure className='not-prose my-8 overflow-hidden rounded-xl border border-white/10 bg-[#101014] shadow-[0_18px_50px_-12px_rgba(0,0,0,0.9)]'>
			<div className='flex items-center gap-1 border-white/8 border-b px-2 py-2'>
				{stages.map((item, i) => (
					<button
						key={item.label}
						type='button'
						onClick={() => go(i)}
						className='group flex-1 py-1'
						aria-label={item.label}
						aria-current={i === index}
					>
						<span className='block h-0.5 w-full overflow-hidden rounded-full bg-white/10 transition-colors group-hover:bg-white/20'>
							<motion.span
								className='block h-full rounded-full bg-primary'
								initial={false}
								animate={{
									scaleX: i <= index ? 1 : 0,
									opacity: i === index ? 1 : 0.4,
								}}
								style={{ originX: 0 }}
								transition={{ type: 'spring', stiffness: 260, damping: 30 }}
							/>
						</span>
					</button>
				))}
			</div>

			<div className='overflow-hidden px-5 py-6'>
				<AnimatePresence mode='popLayout' custom={direction} initial={false}>
					<motion.div
						key={index}
						custom={direction}
						variants={variants}
						initial='enter'
						animate='center'
						exit='exit'
						transition={{ type: 'spring', stiffness: 320, damping: 32 }}
						drag='x'
						dragConstraints={{ left: 0, right: 0 }}
						dragElastic={0.25}
						onDragEnd={(_, info) => {
							if (info.offset.x < -48 || info.velocity.x < -400) go(index + 1)
							else if (info.offset.x > 48 || info.velocity.x > 400)
								go(index - 1)
						}}
						className='cursor-grab select-none active:cursor-grabbing'
					>
						<div className='flex items-baseline gap-3'>
							<span className='font-mono text-[11px] text-primary tabular-nums'>
								{String(index + 1).padStart(2, '0')}
							</span>
							<span className='font-mono text-[11px] text-white/35 uppercase tracking-[0.16em]'>
								{stage.label}
							</span>
							{stage.note && (
								<span className='ml-auto hidden font-mono text-[10px] text-white/25 sm:inline'>
									{stage.note}
								</span>
							)}
						</div>

						<h4 className='mt-3 font-semibold text-lg text-white leading-snug'>
							{stage.headline}
						</h4>
						<p className='mt-2 min-h-[5.5rem] text-[14px] text-white/55 leading-relaxed'>
							{stage.body}
						</p>
					</motion.div>
				</AnimatePresence>
			</div>

			<div className='flex items-center justify-between border-white/8 border-t px-3 py-2'>
				<button
					type='button'
					onClick={() => go(index - 1)}
					disabled={index === 0}
					className='inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 font-mono text-[11px] text-white/50 transition-colors hover:bg-white/[0.05] hover:text-white disabled:opacity-25'
				>
					<ChevronLeft aria-hidden='true' className='size-3.5' />
					prev
				</button>

				<div className='flex items-center gap-1.5'>
					{stages.map((item, i) => (
						<motion.span
							key={item.label}
							className={cn(
								'size-1.5 rounded-full',
								i === index ? 'bg-primary' : 'bg-white/15',
							)}
							animate={{ scale: i === index ? 1.25 : 1 }}
							transition={{ type: 'spring', stiffness: 400, damping: 20 }}
						/>
					))}
				</div>

				<button
					type='button'
					onClick={() => go(index + 1)}
					disabled={index === stages.length - 1}
					className='inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 font-mono text-[11px] text-white/50 transition-colors hover:bg-white/[0.05] hover:text-white disabled:opacity-25'
				>
					next
					<ChevronRight aria-hidden='true' className='size-3.5' />
				</button>
			</div>

			{caption && (
				<figcaption className='border-white/8 border-t px-5 py-2.5 text-white/35 text-xs'>
					{caption}
				</figcaption>
			)}
		</figure>
	)
}
