import { Tech } from '@landing/sections/tech-stack/tech'
import { profile } from '@lib/schemas/strapi'
import { cn } from '@lib/utils'
import { Card, CardContent, CardFooter, CardHeader } from '@ui/card'
import type { LucideIcon } from 'lucide-react'
import type { z } from 'zod'

const project = profile.shape.projects.element
interface WorkProps {
	project: z.infer<typeof project>
	icon: LucideIcon
}

export function Work({ icon: Icon, project }: WorkProps) {
	const {
		name,
		styles = {
			from: 'from-stone-900/20',
			icon: 'text-stone-700',
			iconHover: 'group-hover:text-stone-500',
		},
		state = 'WIP',
		desc,
		techStack,
	} = project
	return (
		<Card className='group translucent flex h-full flex-col gap-0 overflow-hidden rounded-xl border border-white/10 py-0 transition-all duration-300 hover:border-white/20'>
			<CardHeader className='relative aspect-video w-full overflow-hidden'>
				<div
					className={cn(
						'absolute inset-0 bg-linear-to-br to-white transition-transform duration-500 group-hover:scale-105 dark:to-black',
						styles.from,
					)}
				/>
				<div className='absolute inset-0 flex items-center justify-center'>
					<Icon
						data-lucide='box'
						className={cn(
							'size-12 transition-colors',
							styles.icon,
							styles.iconHover,
						)}
					/>
				</div>
			</CardHeader>
			<CardContent className='flex-1 p-6'>
				<div className='mb-3 flex items-center justify-between'>
					<h3 className='font-medium tracking-tight'>{name}</h3>
					<span className='rounded border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider'>
						{state}
					</span>
				</div>
				<p className='mb-4 font-light text-sm leading-relaxed'>{desc}</p>
			</CardContent>
			<CardFooter className='flex flex-wrap gap-3 border-white/5 p-6'>
				{techStack?.map((tech) => (
					<div key={`${tech.name}-${name}`} className='flex items-center gap-1'>
						<Tech name={tech.logo || tech.name} />
					</div>
				))}
			</CardFooter>
		</Card>
	)
}
