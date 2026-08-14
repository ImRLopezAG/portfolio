'use client'

import { formatMonthRange, formatTenure, parseDay } from '@lib/date'
import type { Company, Position } from '@lib/schemas/strapi'
import { cn } from '@lib/utils'
import { Badge } from '@ui/badge'
import { Card, CardContent } from '@ui/card'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@ui/collapsible'
import { ChevronDown, Gem } from 'lucide-react'
import { useEffect, useState } from 'react'

/** Shared by the expandable and static role rows so both align identically. */
const ROW = 'flex w-full items-start justify-between gap-3 py-5 text-left'

/**
 * Tenure for a date range. Ongoing roles depend on the current time, which
 * isn't available while prerendering under `cacheComponents`, so they resolve
 * after mount instead — the server and first client render agree on `null`.
 */
function Tenure({ start, end }: { start: string; end: string | null }) {
	const [live, setLive] = useState<string | null>(null)
	useEffect(() => {
		if (!end) setLive(formatTenure(start, new Date()))
	}, [start, end])

	const tenure = end ? formatTenure(start, parseDay(end)) : live
	if (!tenure) return null
	return <> · {tenure}</>
}

/** Company mark, falling back to a monogram when there's no logo on file. */
function CompanyMark({ logo, company }: { logo?: string; company: string }) {
	if (logo) {
		return (
			// biome-ignore lint/performance/noImgElement: arbitrary remote logo host
			<img
				src={logo}
				alt=''
				aria-hidden='true'
				className='size-10 shrink-0 rounded-md object-contain'
			/>
		)
	}
	return (
		<span
			aria-hidden='true'
			className='flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted font-semibold text-muted-foreground text-sm'
		>
			{company.slice(0, 1).toUpperCase()}
		</span>
	)
}

/**
 * The always-visible part of a role. Uses spans rather than `<p>`, since this
 * renders inside the trigger's `<button>`, which only accepts phrasing content.
 *
 * Laid out as `flex-col items-start` rather than stacked blocks: a `<button>`
 * parent centers text by UA default, and shrink-to-fit children make that
 * centering a no-op. Alignment then can't depend on `text-left` winning.
 */
function PositionSummary({ position }: { position: Position }) {
	return (
		<span className='flex min-w-0 flex-1 flex-col items-start text-left'>
			<span className='font-medium leading-snug'>{position.title}</span>
			<span className='mt-2 text-muted-foreground text-xs'>
				{formatMonthRange(position.startedDate, position.endDate)}
				<Tenure start={position.startedDate} end={position.endDate} />
			</span>
			{position.skills.length > 0 && (
				<span className='mt-4 flex items-start gap-2 text-foreground/80 text-xs leading-relaxed'>
					<Gem aria-hidden='true' className='mt-0.5 size-3 shrink-0' />
					<span>{position.skills.join(', ')}</span>
				</span>
			)}
		</span>
	)
}

/** One role. Expands on click when there's anything more to show. */
function PositionItem({ position }: { position: Position }) {
	const [open, setOpen] = useState(false)
	const hasDetail =
		position.summary.length > 0 || position.highlights.length > 0

	if (!hasDetail) {
		return (
			<div className={ROW}>
				<PositionSummary position={position} />
			</div>
		)
	}

	return (
		<Collapsible open={open} onOpenChange={setOpen}>
			<CollapsibleTrigger
				className={cn(ROW, 'transition-colors hover:text-primary')}
			>
				<PositionSummary position={position} />
				<ChevronDown
					aria-hidden='true'
					className={cn(
						'mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform',
						open && 'rotate-180',
					)}
				/>
			</CollapsibleTrigger>
			<CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
				<div className='pb-4'>
					{position.summary.length > 0 && (
						<p className='mb-3 text-foreground text-sm'>
							{position.summary.map((s) => s.text).join(' ')}
						</p>
					)}
					<ul className='list-disc space-y-1 pl-4 text-muted-foreground text-sm'>
						{position.highlights.map((item) => (
							<li key={item.id}>{item.text}</li>
						))}
					</ul>
				</div>
			</CollapsibleContent>
		</Collapsible>
	)
}

export function CompanyExperience({
	company,
	url,
	logo,
	positions,
	startDate,
	endDate,
	employmentType,
	location,
	workMode,
}: Company) {
	const contextLine = [location, workMode].filter(Boolean).join(' · ')

	return (
		<Card className='translucent'>
			<CardContent>
				<div className='flex items-start gap-3'>
					<CompanyMark logo={logo} company={company} />

					{/* Roles live in this same column, so they can't drift out of
					    alignment with the company name the way a fixed indent did. */}
					<div className='min-w-0 flex-1'>
						<div className='flex items-start justify-between gap-3'>
							<div className='min-w-0'>
								<h4 className='truncate font-semibold leading-tight'>
									{url ? (
										<a
											href={url}
											target='_blank'
											rel='noopener noreferrer'
											className='transition-colors hover:text-primary'
										>
											{company}
										</a>
									) : (
										company
									)}
								</h4>
								<p className='mt-2 text-muted-foreground text-sm'>
									{employmentType ? `${employmentType} · ` : null}
									{formatMonthRange(startDate, endDate)}
									<Tenure start={startDate} end={endDate} />
								</p>
								{contextLine && (
									<p className='mt-1 text-muted-foreground/70 text-xs'>
										{contextLine}
									</p>
								)}
							</div>
							{positions.length > 1 && (
								<Badge variant='secondary' className='shrink-0'>
									{positions.length} roles
								</Badge>
							)}
						</div>

						<div className='mt-4 divide-y divide-border/40'>
							{positions.map((position) => (
								<PositionItem key={position.id} position={position} />
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
