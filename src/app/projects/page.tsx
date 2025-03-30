import { ProjectCard } from '@components/project-card'
import { projects } from '@shared/cv'
export default async function ProjectsPage() {
	return (
		<div className='container mx-auto px-4 py-20'>
			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{projects.map((project) => (
					<ProjectCard key={project.name} project={project} />
				))}
			</div>
		</div>
	)
}
