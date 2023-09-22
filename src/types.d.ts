export type TechTypes = '.Net' | 'Asp.Net' | 'Bootstrap' | 'C-Sharp' | 'CSS' | 'Git' | 'HTML' | 'JavaScript' | 'MongoDb' | 'NextJs' | 'Node' | 'React' | 'Sequelize' | 'SQL' | 'TailwindCss' | 'TypeScript' | 'Dart' | 'Flutter' | 'Express'

export interface Projects {
  title: string
  tech: TechTypes
  description: string
  repo: string
  techs: TechTypes[]
  images?: string[]
}
