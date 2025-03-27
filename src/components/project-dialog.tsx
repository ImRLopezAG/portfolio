import { Badge } from '@ui/badge'
import { Button } from '@ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@ui/dialog'
import { ExternalLink, Github, Search } from 'lucide-react'
import Link from 'next/link'

interface ProjectDialogProps {
	project: Projects
}

export const ProjectDialog: React.FC<ProjectDialogProps> = ({ project }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' size='sm'>
					<Search className='mr-2 h-4 w-4' />
					Details
				</Button>
			</DialogTrigger>
			<DialogContent className='max-w-2xl'>
				<DialogHeader>
					<DialogTitle>{project.name}</DialogTitle>
					<DialogDescription>
						{project.isActive && (
							<span className='mb-2 flex items-center text-green-500 text-xs'>
								<span className='mr-1 h-2 w-2 rounded-full bg-green-500' />
								Active Project
							</span>
						)}
					</DialogDescription>
				</DialogHeader>
				<div className='space-y-4'>
					<p className='text-muted-foreground'>{project.description}</p>

					<div>
						<h4 className='mb-2 font-medium'>Technologies</h4>
						<div className='flex flex-wrap gap-2'>
							{project.highlights.map((tech) => (
								<Badge key={tech} variant='outline' className='bg-muted/50'>
									{tech}
								</Badge>
							))}
						</div>
					</div>

					<div className='flex gap-4 pt-4'>
						{project.github && (
							<Button asChild>
								<Link href={project.github} target='_blank'>
									<Github className='mr-2 h-4 w-4' />
									View Source
								</Link>
							</Button>
						)}
						{project.url && (
							<Button asChild variant='outline'>
								<Link href={project.url} target='_blank'>
									<ExternalLink className='mr-2 h-4 w-4' />
									Live Demo
								</Link>
							</Button>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
