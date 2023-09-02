import { Tooltip } from '@nextui-org/tooltip'
import { AspIcon, BootstrapIcon, CsharpIcon, CssIcon, DartIcon, DotNetIcon, ExpressIcon, FlutterIcon, GitIcon, HTMLIcon, JSIcon, MongoDbIcon, NextJsIcon, NodeIcon, ReactIcon, SequelizeIcon, SqlIcon, TSIcon, TailwindIcon } from '@/components/icon'

type TechTypes = '.Net' | 'Asp.Net' | 'Bootstrap' | 'C-Sharp' | 'CSS' | 'Git' | 'HTML' | 'JavaScript' | 'MongoDb' | 'NextJs' | 'Node' | 'React' | 'Sequelize' | 'SQL' | 'TailwindCss' | 'TypeScript' | 'Dart' | 'Flutter' | 'Express'

export const Technologies = (): JSX.Element => {
  const technologies: Record<TechTypes, JSX.Element> = {
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
  }
  return (
    <div className='flex gap-3 min-[420px]:flex-wrap overflow-auto max-[420px]:flex-row hide-scrollbar'>
      {Array.from(Object.keys(technologies)).map((tech) => (
        <Tooltip key={tech} color='primary' content={tech}>
        <div className='bg-slate-700/40 p-2 rounded-md h-16 w-16 flex justify-center scale-up-top-left'>
          {technologies[tech as TechTypes]}
        </div>
      </Tooltip>
      ))}
    </div>
  )
}
