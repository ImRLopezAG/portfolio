import { ProjectCard } from '@components/project-card'
import { api } from '@shared/trpc'
export default async function ProjectsPage() {
	const projects = await api.cv.getProjects()

	return (
		<div className='container mx-auto px-4 py-20'>
			<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
				{projects.map((project, _index) => (
					<ProjectCard key={project.name} project={project} />
				))}
			</div>
		</div>
	)
}
