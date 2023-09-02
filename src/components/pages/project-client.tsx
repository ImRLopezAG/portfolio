'use client'
import { useProject } from '@/hooks/useProjects'

const ProjectClient = (): JSX.Element => {
  const { projects } = useProject()
  return (
    <>
      {projects}
    </>
  )
}

export default ProjectClient
