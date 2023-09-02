import { ProjectCard } from './components/project-card'
import type { TechTypes } from './components/tech'
interface Projects {
  title: string
  tech: TechTypes
  description: string
  repo: string
  techs: TechTypes[]
  images?: string[]
}
interface ProjectProps {
  isFirst: boolean
  projects: Projects[]
}

export const Project: React.FC<ProjectProps> = ({ projects, isFirst }) => {
  return (
    <section className='flex flex-col p-3'>
      {isFirst && (
        <h1 className='mb-3 text-3xl font-bold  text-center'>
          <span className='text-blue-500 text-4xl rounded-2xl'>P</span>rojects
          <span className='text-blue-500 text-4xl rounded-2xl'>.</span>
        </h1>
      )}
      <div className='grid grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-2 max-w-full'>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            tech={project.tech}
            description={project.description}
            repo={project.repo}
            techs={project.techs}
            images={project.images}
          />
        ))}
      </div>
    </section>
  )
}
