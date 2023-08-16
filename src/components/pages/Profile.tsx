import { technologies } from '@/api'
import Image from 'next/image'
import { DiscordCard } from './components'

export const Profile = (): JSX.Element => {
  return (
    <div className='flex max-[420px]:flex-col gap-20 items-start min-[420px]:mt-4 [&>section]:flex-col [&>section>h2]:font-bold [&>section>h2]:my-4 [&>section]:max-[420px]:w-full '>
      <section className='w-1/2 flex'>
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
            {technologies.map((technology) => (
              <Image
                key={technology.id}
                src={`technologies/${technology.name}.svg`}
                alt={technology.name}
                className='bg-slate-700/40 p-2 rounded-md h-20 w-20'
                width='70'
                height='70'
              />
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
