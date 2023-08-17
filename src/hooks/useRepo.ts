import { useEffect, useState } from 'react'

import { fetchRepos } from '@/api'

interface Repo {
  id: number
  name: string
  description: string
  html_url: string
  language: string
  fork: boolean
  topics: string[]
}
interface UseRepo {
  repositories: Repo[]
  loading: boolean
  loaded: boolean
}
export const useRepo = (): UseRepo => {
  const [repo, setRepo] = useState<Repo[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const getRepos = async (): Promise<void> => {
    const repos: Repo[] = await fetchRepos()
    setRepo(repos)
    repos.length >= 1 && setLoading(false)
  }

  useEffect(() => {
    getRepos().catch((error) => console.error(error))
  }, [])

  return {
    repositories: repo.filter((rep) => rep.description != null),
    loading,
    loaded: !loading
  }
}
