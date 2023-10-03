import type { TechTypes } from '@/types'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { Link } from '@nextui-org/link'
import { CardModal } from './card-modal'
import { Map } from '@/components/icon/map'

interface ProjectCardProps {
  title: string
  description: string
  repo: string
  techs: TechTypes[]
  tech: TechTypes
  images?: string[]
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, repo, tech, techs, images }) => {
  return (
    <Card className='min-w-[22rem] max-w-[28rem] flex-col items-center'>
      <CardHeader className='flex gap-3'>
        <div className='h-16 w-16 flex justify-center'>
          <Map tech={tech} />
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
          className='text-lime-400'
          href={`https://github.com/ImRLopezAG/${repo}`}
        >
          open on GitHub.
        </Link>
        <CardModal title={title} techs={techs} images={images} />
      </CardFooter>
    </Card>
  )
}
