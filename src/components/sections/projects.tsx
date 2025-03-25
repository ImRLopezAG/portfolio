'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { ProjectCard } from '@components/project-card'
import { cn } from '@shared/utils'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, Search } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'

interface ProjectsProps {
	projects: Projects[]
}
export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
	const ref = useRef<HTMLElement>(null)
	const isInView = useInView(ref, { once: true, amount: 0.1 })
	const [selectedProject, setSelectedProject] = useState<Projects | null>(null)
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
		<section id='projects' ref={ref} className='scroll-mt-20 py-20'>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
				transition={{ duration: 0.8 }}
				className='space-y-12'
			>
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
					{filteredProjects.map((project, index) => (
						<motion.div
							key={project.name}
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<ProjectCard
								project={project}
								footerDetails={
									<Button
										variant='ghost'
										size='sm'
										onClick={() => setSelectedProject(project)}
									>
										<Search className='mr-2 h-4 w-4' />
										Details
									</Button>
								}
							/>
						</motion.div>
					))}
				</div>

				<div className='text-center'>
					<Button asChild variant='outline'>
						<Link href='/projects'>View All Projects</Link>
					</Button>
				</div>
			</motion.div>

			<Dialog
				open={!!selectedProject}
				onOpenChange={() => setSelectedProject(null)}
			>
				{selectedProject && (
					<DialogContent className='max-w-2xl'>
						<DialogHeader>
							<DialogTitle>{selectedProject.name}</DialogTitle>
							<DialogDescription>
								{selectedProject.isActive && (
									<span className='mb-2 flex items-center text-green-500 text-xs'>
										<span className='mr-1 h-2 w-2 rounded-full bg-green-500' />
										Active Project
									</span>
								)}
							</DialogDescription>
						</DialogHeader>
						<div className='space-y-4'>
							<p className='text-muted-foreground'>
								{selectedProject.description}
							</p>

							<div>
								<h4 className='mb-2 font-medium'>Technologies</h4>
								<div className='flex flex-wrap gap-2'>
									{selectedProject.highlights.map((tech) => (
										<Badge key={tech} variant='outline' className='bg-muted/50'>
											{tech}
										</Badge>
									))}
								</div>
							</div>

							<div className='flex gap-4 pt-4'>
								{selectedProject.github && (
									<Button asChild>
										<Link href={selectedProject.github} target='_blank'>
											<Github className='mr-2 h-4 w-4' />
											View Source
										</Link>
									</Button>
								)}
								{selectedProject.url && (
									<Button asChild variant='outline'>
										<Link href={selectedProject.url} target='_blank'>
											<ExternalLink className='mr-2 h-4 w-4' />
											Live Demo
										</Link>
									</Button>
								)}
							</div>
						</div>
					</DialogContent>
				)}
			</Dialog>
		</section>
	)
}
