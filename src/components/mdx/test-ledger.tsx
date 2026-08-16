'use client'

import { cn } from '@lib/utils'
import { Check, X } from 'lucide-react'
import { motion } from 'motion/react'

interface Row {
	name: string
	/** What this kind of test actually demonstrates. */
	proves: string
	/** The blind spot it leaves open. */
	misses: string
	/** 0–100: how much real end-to-end confidence it buys. */
	confidence: number
	/** Highlight this row as "where I actually am". */
	current?: boolean
}

interface TestLedgerProps {
	labels?: { proves: string; misses: string; confidence: string }
	rows: Row[]
	caption?: string
}

const EN = { proves: 'proves', misses: 'misses', confidence: 'confidence' }

/**
 * The honest test ledger: one card per kind of test, a green "proves" line, a
 * red "misses" line, and a confidence bar that fills on scroll — so the gap
 * between suite count and real confidence is visible, not tabular.
 */
export function TestLedger({ labels = EN, rows, caption }: TestLedgerProps) {
	return (
		<figure className='not-prose my-8 overflow-hidden rounded-xl border border-white/10 bg-[#101014] shadow-[0_18px_50px_-12px_rgba(0,0,0,0.9)]'>
			<div className='divide-y divide-white/8'>
				{rows.map((row) => (
					<div
						key={row.name}
						className={cn('px-5 py-4', row.current && 'bg-[#f7768e]/[0.04]')}
					>
						<div className='flex items-baseline justify-between gap-3'>
							<h4
								className={cn(
									'font-mono text-[13px]',
									row.current ? 'text-[#f7768e]' : 'text-white/85',
								)}
							>
								{row.name}
							</h4>
							<span className='font-mono text-[10px] text-white/30'>
								{row.confidence}% {labels.confidence}
							</span>
						</div>

						<div className='mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]'>
							<motion.div
								className={cn(
									'h-full rounded-full',
									row.current ? 'bg-[#f7768e]' : 'bg-[#4ea96f]',
								)}
								initial={{ width: 0 }}
								whileInView={{ width: `${row.confidence}%` }}
								viewport={{ once: true, amount: 0.6 }}
								transition={{ duration: 0.9, ease: 'easeOut' }}
							/>
						</div>

						<div className='mt-3 grid gap-x-6 gap-y-1.5 text-[12.5px] leading-relaxed sm:grid-cols-2'>
							<p className='flex gap-2 text-white/55'>
								<Check
									aria-hidden='true'
									className='mt-1 size-3 shrink-0 text-[#4ea96f]'
								/>
								<span>
									<span className='font-mono text-[#4ea96f]/80 text-[10px] uppercase tracking-[0.12em]'>
										{labels.proves}
									</span>{' '}
									— {row.proves}
								</span>
							</p>
							<p className='flex gap-2 text-white/55'>
								<X
									aria-hidden='true'
									className='mt-1 size-3 shrink-0 text-[#f7768e]'
								/>
								<span>
									<span className='font-mono text-[#f7768e]/80 text-[10px] uppercase tracking-[0.12em]'>
										{labels.misses}
									</span>{' '}
									— {row.misses}
								</span>
							</p>
						</div>
					</div>
				))}
			</div>

			{caption && (
				<figcaption className='border-white/8 border-t px-5 py-2.5 text-white/35 text-xs'>
					{caption}
				</figcaption>
			)}
		</figure>
	)
}
