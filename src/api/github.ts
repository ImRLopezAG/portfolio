const API = 'https://api.github.com/users/ImRLopezAG/repos'

interface Repo {
  id: number
  name: string
  description: string
  html_url: string
  language: string
  topics: string[]
  fork: boolean
}

export const fetchRepos = async (): Promise<Repo[]> => {
  const data: Repo[] = await fetch(API)
    .then(async (response) => await response.json())
    .then((data) => {
      return data.map(
        ({ id, name, description, html_url: url, language, topics, fork }: Repo) => ({
          id,
          name,
          description,
          url,
          language,
          topics,
          fork
        })
      )
    })
  return data
}
