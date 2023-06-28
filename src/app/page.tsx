'use client'
import { LandingHeader, Sections } from '@/components'
import { Profile } from '@/components/pages'
import { useProject } from '@/hooks/useProject'

export default function Home (): JSX.Element {
  const { projects } = useProject()
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
