import { useProject } from '@/hooks'
export const ProjectsLoad = (): JSX.Element => {
  const { projects } = useProject()
  return <>{projects}</>
}
