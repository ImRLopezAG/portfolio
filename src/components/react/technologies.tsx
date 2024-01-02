import type { TechTypes } from '@/types'
import { AspIcon, BootstrapIcon, CsharpIcon, CssIcon, DartIcon, DotNetIcon, ExpressIcon, FlutterIcon, GitIcon, HTMLIcon, JSIcon, MongoDbIcon, NextJsIcon, NodeIcon, ReactIcon, SequelizeIcon, SqlIcon, TSIcon, TailwindIcon } from '@components/icon'
import { Tooltip } from '@nextui-org/react'

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
        <Tooltip key={tech} color='success' content={tech} className='p-3'>
        <div className='bg-slate-700/40 p-2 rounded-md h-16 w-16 flex justify-center animate-scale-up-top-left'>
          {
            {
              '.Net': <DotNetIcon />,
              'Asp.Net': <AspIcon />,
              Bootstrap: <BootstrapIcon />,
              'C-Sharp': <CsharpIcon />,
              CSS: <CssIcon />,
              Git: <GitIcon />,
              HTML: <HTMLIcon />,
              JavaScript: <JSIcon />,
              MongoDb: <MongoDbIcon />,
              NextJs: <NextJsIcon />,
              Node: <NodeIcon />,
              React: <ReactIcon />,
              Sequelize: <SequelizeIcon />,
              SQL: <SqlIcon />,
              TailwindCss: <TailwindIcon />,
              TypeScript: <TSIcon />,
              Dart: <DartIcon />,
              Flutter: <FlutterIcon />,
              Express: <ExpressIcon />
            }[tech]
          }
        </div>
      </Tooltip>
      ))}
    </div>
  )
}
