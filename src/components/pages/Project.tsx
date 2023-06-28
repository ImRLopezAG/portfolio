import { Card } from './components/Card'
import { Skeleton } from './components/Skeleton'

interface Repo {
  id: number
  name: string
  description: string
  html_url: string
  language: string
  fork: boolean
  topics: string[]
}

interface ProjectProps {
  repositories: Repo[]
  loading: boolean
  isFirst: boolean
}

export const Project: React.FC<ProjectProps> = ({ repositories, loading, isFirst }) => {
  return (
    <section className='flex flex-col h-screen mt-8 max-[420px]:w-full'>
      {isFirst && (
        <h2 className='text-3xl font-bold text-center my-3'>Projects</h2>
      )}
      <div className='grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-2 max-w-full'>
        {loading
          ? (
            <Skeleton />
            )
          : (
              repositories.map((repo) => (
                <div className='max-w-full' key={repo.id}>
                  <Card
                    title={repo.name}
                    desc={repo.description}
                    url={repo.html_url}
                    tech={repo.language}
                  />
                </div>
              ))
            )}
      </div>
    </section>
  )
}
