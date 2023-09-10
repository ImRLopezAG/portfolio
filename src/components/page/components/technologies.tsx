import { Tooltip } from '@nextui-org/tooltip'
import type { TechTypes } from '@/types'
import { Map } from '@/components/icon/map'

export const Technologies = (): JSX.Element => {
  const technologies: TechTypes[] = [
    '.Net',
    'Asp.Net',
    'Bootstrap',
    'C-Sharp',
    'CSS',
    'Git',
    'HTML',
    'JavaScript',
    'MongoDb',
    'NextJs',
    'Node',
    'React',
    'Sequelize',
    'SQL',
    'TailwindCss',
    'TypeScript',
    'Dart',
    'Flutter',
    'Express'
  ]
  return (
    <div className='flex gap-3 min-[420px]:flex-wrap overflow-auto max-[420px]:flex-row hide-scrollbar'>
      {technologies.map((tech) => (
        <Tooltip key={tech} color='primary' content={tech}>
        <div className='bg-slate-700/40 p-2 rounded-md h-16 w-16 flex justify-center animate-scale-up-top-left'>
          <Map tech={tech} />
        </div>
      </Tooltip>
      ))}
    </div>
  )
}
