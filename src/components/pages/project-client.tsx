'use client'
import { useProject } from '@/hooks'

const ProjectClient = (): JSX.Element => {
  const { projects } = useProject()
  return (
    <>
      {projects}
    </>
  )
}

export default ProjectClient
