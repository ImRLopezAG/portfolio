'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@components/project-card'
import { cn } from '@shared/utils'
import Link from 'next/link'
import { useState } from 'react'
import { ProjectDialog } from '../project-dialog'
import { AnimatedSection } from './section'

interface ProjectsProps {
	projects: Projects[]
}
export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
	const [filter, setFilter] = useState('all')

	const filteredProjects =
		filter === 'all'
			? projects
			: projects.filter((project) =>
					project.highlights.some((tech) =>
						tech.toLowerCase().includes(filter.toLowerCase()),
					),
				)

	const technologies = [
		...new Set(projects.flatMap((p) => p.highlights)),
	].sort()
	const isAll = filter === 'all'
	return (
		<AnimatedSection id='projects'>
			<div className='space-y-4 text-center'>
				<h2 className='font-bold text-3xl tracking-tight sm:text-4xl'>
					Featured Projects
				</h2>
				<div className='mx-auto h-1 w-20 rounded-full bg-primary' />
				<p className='mx-auto max-w-2xl text-muted-foreground'>
					A selection of my recent work and personal projects
				</p>
			</div>

			<div className='flex flex-wrap justify-center gap-2'>
				<Badge
					className={cn(
						'cursor-pointer text-black dark:text-white',
						{ 'bg-primary': isAll },
						{ 'bg-muted': !isAll },
					)}
					onClick={() => setFilter('all')}
				>
					All
				</Badge>
				{technologies.map((tech) => (
					<Badge
						key={tech}
						className={cn(
							'cursor-pointer text-black dark:text-white',
							{ 'bg-primary': filter === tech },
							{ 'bg-muted': filter !== tech },
						)}
						onClick={() => setFilter(tech)}
					>
						{tech}
					</Badge>
				))}
			</div>

			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{filteredProjects.map((project) => (
					<ProjectCard
						key={crypto.randomUUID()}
						applyAnimation
						project={project}
						footerDetails={<ProjectDialog project={project} />}
					/>
				))}
			</div>

			<div className='text-center'>
				<Button asChild variant='outline'>
					<Link href='/projects'>View All Projects</Link>
				</Button>
			</div>
		</AnimatedSection>
	)
}
