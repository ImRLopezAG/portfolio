import { DeveloperIcon } from '@/components/icon'
import { Badged, Icons, Role, SLetter } from '.'

export const DiscordCard = (): JSX.Element => {
  return (
    <article
      className='flex flex-col h-fit w-full rounded-2xl bg-[#232428] gap-2 text-white'
      aria-label='Discord Card'
    >
      <span className='w-full h-[5em] bg-blue-600 rounded-t-2xl' />
      <header className='flex flex-col relative justify-center items-center z-10 w-24 h-24 -mt-14 left-4 rounded-full bg-[#232428]'>
        <img
          src='/me.jpg'
          className='w-[85%] h-[85%] rounded-full bg-blue-400'
          width={100}
          height={100}
          loading='lazy'
          alt='Image of Angel Gabriel Lopez'
          aria-label='Image of Angel Gabriel Lopez'
        />
      </header>
      <div className='flex flex-col pb-4 px-5 gap-3 -mt-12'>
        <section className='flex justify-end mb-2'>
          <SLetter
            content='Active Developer'
            badged='green-b'
            element='green-badged'
          />
          <SLetter
            content='HypeSquad Bravery'
            badged='purple-b'
            element='purple-badged'
          />
          <SLetter content='Nitro' badged='nitro-b' element='nitro-badged' />
          <SLetter
            content='Server Booster'
            badged='nitro-bts'
            element='nitro-booster'
          />
          <SLetter
            content='Knows as ImRLopez'
            badged='cat-b'
            element='cat-badged'
          />

          <div className='flex rounded-lg bg-black p-1'>
            <Badged name='green-badged' display='green-b' />
            <Badged name='purple-badged' display='purple-b' />
            <Badged name='nitro-badged' display='nitro-b' />
            <Badged name='nitro-booster' display='nitro-bts' />
            <Badged name='cat-badged' display='cat-b' />
          </div>
        </section>
        <main className='flex flex-col gap-2 bg-black rounded-lg p-3 divide-y-2 divide-[#2e2f34] '>
          <section className='flex flex-col h-full'>
            <span className=' text-base font-bold'>{'<ImRLopezAg />'}</span>
            <span className=' text-sm font-bold'>@imrlopez</span>
          </section>
          <section className='flex flex-col h-full max-[420px]:gap-2 gap-4 '>
            <div className='[&>span]: flex flex-col min-[420px]:hidden'>
              <span className='text-sm font-bold my-1'>ABOUT ME</span>
              <p className='text-lg'>
                A polyglot developer with a passion for build applications that
                improve the lives of others, and automating the boring stuff.
              </p>
            </div>
            <div className='[&>span]: flex flex-col'>
              <span className='text-sm font-bold my-1'>CONTACT</span>
              <div className='flex flex-row gap-2'>
                <Icons />
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-bold my-1'>DEVELOPER SINCE</span>
              <div className='flex flex-row gap-2 items-center'>
                <div className='flex flex-row'>
                  <DeveloperIcon className='h-5 w-5' />
                  <span className='text-x ml-1  text-sm'>Jan 24, 2021</span>
                </div>
                <span className='h-1 w-1 bg-gray-300 rounded-2xl' />
                <div className='flex flex-row'>
                  <img
                    src='/midu.webp'
                    className='w-5 h-5 rounded-full'
                    alt='Icon of midudev'
                    width={20}
                    height={20}
                    aria-label='Icon of midudev'
                  />
                  <span className='text-x ml-1  text-sm'>Sep 5, 2022</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col my-1'>
              <span className=' text-sm font-bold my-1'>ROLES</span>
              <div className='flex flex-wrap gap-2'>
                <Role name='Design Patterns' color='bg-green-500' />
                <Role name='Algorithms' color='bg-blue-500' />
                <Role name='OOP' color='bg-red-600' />
                <Role name='Solid' color='bg-yellow-500' />
                <Role name='Clean Code' color='bg-purple-500' />
                <Role name='MERN' color='bg-blue-400' />
                <Role name='Team Player' color='bg-pink-500' />
              </div>
            </div>
          </section>
        </main>
      </div>
    </article>
  )
}
