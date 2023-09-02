import { AspIcon, BootstrapIcon, CsharpIcon, CssIcon, DartIcon, DotNetIcon, ExpressIcon, FlutterIcon, GitIcon, HTMLIcon, JSIcon, MongoDbIcon, NextJsIcon, NodeIcon, ReactIcon, SequelizeIcon, SqlIcon, TSIcon, TailwindIcon } from '@/components/icon'

export type TechTypes = '.Net' | 'Asp.Net' | 'Bootstrap' | 'C-Sharp' | 'CSS' | 'Git' | 'HTML' | 'JavaScript' | 'MongoDb' | 'NextJs' | 'Node' | 'React' | 'Sequelize' | 'SQL' | 'TailwindCss' | 'TypeScript' | 'Dart' | 'Flutter' | 'Express'

interface TechProps {
  tech: TechTypes
}
export const Tech: React.FC<TechProps> = ({ tech }) => {
  const Technologies: Record<TechTypes, JSX.Element> = {
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
  return <>{ Technologies[tech] }</>
}
