import {
  CsharpIcon,
  DartIcon,
  HTMLIcon,
  HandlebarsIcon,
  JSIcon,
  TSIcon
} from '@/components/icon'
import * as next from '@nextui-org/react'
import NextLink from 'next/link'

interface CardProps {
  title: string
  desc: string
  url: string
  tech: string
}

export const Card = ({ title, desc, url, tech }: CardProps): JSX.Element => {
  const Color: Record<string, `#${string}`> = {
    'C#': '#37CB19',
    JavaScript: '#F7DF1E',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    Handlebars: '#f7931e',
    Dart: '#00B4AB'
  }

  const Tech: Record<string, JSX.Element> = {
    'C#': <CsharpIcon />,
    JavaScript: <JSIcon />,
    TypeScript: <TSIcon />,
    HTML: <HTMLIcon />,
    Handlebars: <HandlebarsIcon />,
    Dart: <DartIcon />
  }

  const color: string = Color[tech] ?? '#808080'

  return (
    <next.Card className='max-w-[400px] max-h-[250px]'>
      <next.CardHeader className='flex gap-3'>
        {Tech[tech] ?? (
          <next.Image
            alt='nextui logo'
            height={40}
            radius='sm'
            src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
            width={40}
          />
        )}
        <section className='flex flex-col truncate'>
          <p className='text-md'>{title}</p>
          <div className='text-small text-default-500 flex gap-2 items-center'>
            <div
              className='w-4 h-4 rounded-full'
              style={{
                background: color
              }}
            />
            <p>{tech ?? 'Fork'}</p>
          </div>
        </section>
      </next.CardHeader>
      <next.Divider />
      <next.CardBody>
        <p>{desc}</p>
      </next.CardBody>
      <next.Divider />
      <next.CardFooter>
        <next.Link isExternal showAnchorIcon href={url} as={NextLink}>
          Visit source code on GitHub.
        </next.Link>
      </next.CardFooter>
    </next.Card>
  )
}
