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
    <div className='grid grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] gap-2'>
      {technologies.map((tech) => (
        <Tooltip key={tech} color='success' content={tech}>
        <div className='bg-slate-700/40 p-2 rounded-md h-16 w-16 flex justify-center animate-scale-up-top-left'>
          <Map tech={tech} />
        </div>
      </Tooltip>
      ))}
    </div>
  )
}
