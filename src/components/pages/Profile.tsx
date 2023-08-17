import {
  AspIcon,
  BootstrapIcon,
  CsharpIcon,
  CssIcon,
  DartIcon,
  DotNetIcon,
  GitIcon,
  HTMLIcon,
  JSIcon,
  MongoDbIcon,
  NextJsIcon,
  NodeIcon,
  ReactIcon,
  SequelizeIcon,
  SqlIcon,
  TSIcon,
  TailwindIcon
} from '@/components/icon'
import Image from 'next/image'
import { DiscordCard } from './components'

export const Profile = (): JSX.Element => {
  const Tech: Record<string, JSX.Element> = {
    'dot net': <DotNetIcon className='w-16 h-16' />,
    'asp.net': <AspIcon className='w-16 h-16' />,
    bootstrap: <BootstrapIcon className='w-16 h-16' />,
    'c-sharp': <CsharpIcon className='w-16 h-16' />,
    css: <CssIcon className='w-16 h-16' />,
    git: <GitIcon className='w-16 h-16' />,
    html: <HTMLIcon className='w-16 h-16' />,
    javascript: <JSIcon className='w-16 h-16' />,
    mongoDb: <MongoDbIcon className='w-16 h-16' />,
    'next-js': <NextJsIcon className='w-16 h-16' />,
    node: <NodeIcon className='w-16 h-16' />,
    react: <ReactIcon className='w-16 h-16' />,
    sequelize: <SequelizeIcon className='w-16 h-16' />,
    sql: <SqlIcon className='w-16 h-16' />,
    tailwind: <TailwindIcon className='w-16 h-16' />,
    typescript: <TSIcon className='w-16 h-16' />,
    dart: <DartIcon className='w-16 h-16' />
  }
  return (
    <div className='flex max-[420px]:flex-col gap-20 items-start min-[420px]:mt-4 [&>section]:flex-col [&>section>h2]:font-bold [&>section>h2]:my-4 [&>section]:max-[420px]:w-full '>
      <section className='w-1/2 flex max-[420px]:hidden'>
        <h2 className='text-3xl'>Software Engineer</h2>
        <p className='text-lg'>
          A polyglot developer with a passion for build applications that
          improve the lives of others, and automating the boring stuff.
        </p>
        <p className='text-lg my-4 max-[420px]:hidden'>
          I have experience with a wide range of technologies, and I am always
          looking to learn more.
        </p>
        <section className='flex flex-col '>
          <h2 className='text-4xl font-bold my-4 min-[420px]:tex-center'>
            Technologies
          </h2>
          <div className='flex gap-3 min-[420px]:flex-wrap overflow-auto max-[420px]:flex-row hide-scrollbar'>
            {Array.from(Object.keys(Tech)).map((tech) => (
              <div
                className='bg-slate-700/40 p-2 rounded-md h-20 w-20 flex justify-center'
                key={tech}
              >
                {tech === 'mongoDb' ? (
                  <Image
                    src='technologies/mongoDb.svg'
                    alt='mongo db'
                    width='70'
                    height='70'
                  />
                ) : tech === 'node' ? (
                  <Image
                    src='technologies/node.svg'
                    alt='node'
                    width='70'
                    height='70'
                  />
                ) : (
                  Tech[tech]
                )}
              </div>
            ))}
          </div>
        </section>
      </section>
      <section className='w-1/2 flex h-full'>
        <DiscordCard />
      </section>
    </div>
  )
}
