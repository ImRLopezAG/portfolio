import { Tooltip } from '@nextui-org/tooltip'
import { Tech, type TechTypes } from '.'

export const Technologies = (): JSX.Element => {
  const Technologies: TechTypes[] = [
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
      {Technologies.map((tech) => (
        <Tooltip key={tech} color='primary' content={tech}>
          <div className='bg-slate-700/40 p-2 rounded-md h-16 w-16 flex justify-center scale-up-top-left'>
            <Tech tech={tech} />
          </div>
        </Tooltip>
      ))}
    </div>
  )
}
