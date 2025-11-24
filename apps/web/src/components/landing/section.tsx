import { cn } from '@lib/utils'
import type React from 'react'

interface LandingSectionProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
	id: string
	title?: React.ReactNode
	desc?: string
	allowSplit?: boolean
}
export function LandingSection({
	title,
	desc,
	className,
	children,
	id,
	allowSplit = true,
	...props
}: LandingSectionProps) {
	return (
		<section
			id={id}
			className={cn('animate-view scroll-m-12 py-10 sm:scroll-m-14', className)}
			{...props}
		>
			<div className='space-y-8'>
				<div className='space-y-4 text-center'>
					{title && (
						<h2 className='font-bold text-3xl tracking-tight sm:text-4xl'>
							{title}
						</h2>
					)}
					{allowSplit && (
						<div className='mx-auto h-1 w-20 rounded-full bg-primary' />
					)}
					{desc && (
						<p className='mx-auto max-w-2xl text-muted-foreground'>{desc}</p>
					)}
				</div>
				{children}
			</div>
		</section>
	)
}
