import { AspIcon, BootstrapIcon, CsharpIcon, CssIcon, DartIcon, DotNetIcon, ExpressIcon, FlutterIcon, GitIcon, HTMLIcon, JSIcon, MongoDbIcon, NextJsIcon, NodeIcon, ReactIcon, SequelizeIcon, SqlIcon, TSIcon, TailwindIcon } from '@/components/icon'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { Link } from '@nextui-org/link'
import NextLink from 'next/link'
import CardModal from './CardModal'
import type { TechTypes } from '@/types'

interface ProjectCardProps {
  title: string
  description: string
  repo: string
  techs: TechTypes[]
  tech: TechTypes
  images?: string[]
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, repo, tech, techs, images }) => {
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
    <Card className='min-w-[22rem] flex-col items-center'>
      <CardHeader className='flex gap-3'>
        <div className='h-16 w-16 flex justify-center'>
          {technologies[tech]}
        </div>
        <p className='text-md'>{title}</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{description}</p>
      </CardBody>
      <CardFooter className='justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden before:rounded-xl rounded-large w-[calc(100%_-_8px)] shadow-small mb-1'>
        <Link
          isExternal
          showAnchorIcon
          href={`https://github.com/ImRLopezAG/${repo}`}
          as={NextLink}
        >
          open on GitHub.
        </Link>
        <CardModal title={title} techs={techs} images={images} />
      </CardFooter>
    </Card>
  )
}
