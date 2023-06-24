'use client'
import { LandingHeader, Sections } from '@/components'
import { Profile, Project } from '@/components/pages'
import { useRepo } from '@/hooks/useRepo'
import { useEffect, useState } from 'react'

export default function Home (): JSX.Element {
  const { repositories, loading } = useRepo()

  const [projects, setProjects] = useState<React.ReactNode[]>([])

  const handleResize = (): void => {
    const numSections = Math.ceil(
      repositories.length / (window.innerWidth <= 420 ? 3 : 8)
    )
    const sections = Array.from({ length: numSections }, (_, i) => {
      const start = i * (window.innerWidth <= 420 ? 3 : 8)
      const end = start + (window.innerWidth <= 420 ? 3 : 8)
      return (
        <Sections
          key={i}
          title='Projects'
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
    setProjects(sections)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [repositories, window.innerWidth])

  return (
    <>
      <LandingHeader />
      <main className='snap-y snap-mandatory relative h-screen overflow-auto'>
        <Sections title='Home' color='black'>
          <Profile />
        </Sections>
        {projects}
      </main>
    </>
  )
}
