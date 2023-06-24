import Image from 'next/image'
import { technologies } from '../../api'
import { Icon } from './components/Icon'

export const Profile = (): JSX.Element => {
  return (
    <div className='flex max-[420px]:flex-col items-start min-[420px]:mt-4 [&>section]:flex-col [&>section>h2]:font-bold [&>section>h2]:my-4 [&>section]:max-[420px]:w-full '>
      <section className='w-1/2 flex h-full items-center'>
        <h2 className='text-3xl'>Angel Gabriel Lopez</h2>
        <Image
          src='/me.jpg'
          height='400'
          width='400'
          className='rounded-full w-80 h-80 max-[420px]:w-40 max-[420px]:h-40 mb-4'
          alt='Angel Lopez'
        />
        <div className='flex flex-row gap-2'>
          <Icon
            name='linkedin'
            src='linkedin'
            url='linkedin.com/in/angel-gabriel-lopez'
          />
          <Icon
            name='resume'
            src='resume'
            url='docs.google.com/document/d/176L3kfuVECauW3vadR9yKZREDEfgXDadVGqQ3zm51wc'
          />
          <Icon name='github' src='github' url='github.com/imrlopezag' />
          <Icon name='twitter' src='twitter' url='twitter.com/imr_lopez' />
          <Icon name='email' src='email' url='angelg00lopez@gmail.com' />
        </div>
      </section>
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
                loading='lazy'
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
    </div>
  )
}
