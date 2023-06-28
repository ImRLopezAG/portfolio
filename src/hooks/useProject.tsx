import { useCallback, useEffect, useState } from 'react'
import { Sections } from '@/components'
import { Project } from '@/components/pages'
import { useRepo } from './useRepo'

interface ReturnType {
  projects: React.ReactNode[]
  loaded: boolean
}

export const useProject = (): ReturnType => {
  const { repositories, loading, loaded } = useRepo()

  const [projects, setProjects] = useState<React.ReactNode[]>([])

  const handleResize = useCallback((): React.ReactNode[] => {
    const numSections = Math.ceil(
      repositories.length / (window.innerWidth <= 420 ? 3 : 8)
    )
    const sections = Array.from({ length: numSections }, (_, i) => {
      const start = i * (window.innerWidth <= 420 ? 3 : 8)
      const end = start + (window.innerWidth <= 420 ? 3 : 8)
      return (
        <Sections
          key={i}
          title={i === 0 ? 'Projects' : ''}
          color={i % 2 === 0 ? 'white' : 'black'}
        >
          <Project
            isFirst={i === 0}
            repositories={repositories.slice(start, end)}
            loading={loading}
          />
        </Sections>
      )
    })
    return sections
  }, [loading, repositories])

  useEffect(() => {
    const resizeHandler = (): void => setProjects(handleResize())
    resizeHandler()
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [loaded])

  return { projects, loaded }
}
