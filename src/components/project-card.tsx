import { cn } from '@shared/utils'
import { Badge } from '@ui/badge'
import { Button } from '@ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card'
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'

interface ProjectCardProps {
	project: Projects
	footerDetails?: React.ReactNode
	applyAnimation?: boolean
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
	project,
	footerDetails,
	applyAnimation,
}) => {
	return (
		<Card
			className={cn('group flex h-full flex-col overflow-hidden', {
				'animate-view-projects': applyAnimation,
			})}
		>
			<CardHeader className='pb-2'>
				<CardTitle className='flex items-center justify-between'>
					<span>{project.name}</span>
					{project.isActive && (
						<span className='flex items-center text-green-500 text-xs'>
							<span className='mr-1 h-2 w-2 rounded-full bg-green-500' />
							Active
						</span>
					)}
				</CardTitle>
			</CardHeader>
			<CardContent className='flex-grow'>
				<p className='mb-4 line-clamp-3 text-muted-foreground'>
					{project.description}
				</p>
				<div className='flex flex-wrap gap-2'>
					{project.highlights.map((tech) => (
						<Badge key={tech} variant='outline' className='bg-muted/50'>
							{tech}
						</Badge>
					))}
				</div>
			</CardContent>
			<CardFooter className='flex justify-between pt-2'>
				{footerDetails && (
					// biome-ignore lint/complexity/noUselessFragments: <explanation>
					<>{footerDetails}</>
				)}
				<div className='flex gap-2'>
					{project.github && (
						<Button asChild variant='ghost' size='icon' className='h-8 w-8'>
							<Link href={project.github} target='_blank'>
								<Github className='h-4 w-4' />
								<span className='sr-only'>GitHub</span>
							</Link>
						</Button>
					)}
					{project.url && (
						<Button asChild variant='ghost' size='icon' className='h-8 w-8'>
							<Link href={project.url} target='_blank'>
								<ExternalLink className='h-4 w-4' />
								<span className='sr-only'>Live Demo</span>
							</Link>
						</Button>
					)}
				</div>
			</CardFooter>
		</Card>
	)
}
