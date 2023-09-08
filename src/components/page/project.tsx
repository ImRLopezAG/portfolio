import type { Projects } from '@/types'
import { ProjectCard } from './components/project-card'

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
        {projects.map((project, index) => {
          const { title, tech, description, repo, techs, images } = project
          return (
            <ProjectCard
              key={index}
              title={title}
              tech={tech}
              description={description}
              repo={repo}
              techs={techs}
              images={images}
            />
          )
        })}
      </div>
    </section>
  )
}
