import Image from 'next/image'
import { Badged, Icon, Role, SLetter } from './'

export const DiscordCard = (): JSX.Element => {
  return (
    <section className='dc-card flex flex-col h-full w-full max-[420px]:w-full rounded-2xl bg-[#232428] gap-2 text-white'>
      <span
        className='w-full h-[6.56em] bg-blue-600 rounded-t-2xl'
      />
      <header className='flex flex-col relative justify-center items-center z-10 w-24 h-24 -mt-14 ml-3 rounded-full bg-[#232428]'>
        <Image
          src='/me.jpg'
          className='w-[85%] h-[85%] rounded-full bg-blue-400'
          width={100}
          height={100}
          alt='my self'
        />
      </header>
      <div className='flex flex-col px-5 gap-3 -mt-12'>
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
                <Icon
                  name='twitter'
                  src='twitter'
                  url='twitter.com/imr_lopez'
                />
                <Icon name='email' src='email' url='angelg00lopez@gmail.com' />
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-bold my-1'>MEMBER SINCE</span>
              <div className='flex flex-row gap-2 items-center'>
                <div className='flex flex-row'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='inline-block h-5 w-5 fill-slate-400'
                    viewBox='0 0 28 20'
                  >
                    <path d='M23.02 1.68A21.23 21.23 0 0 0 17.66 0c-.25.46-.49.93-.69 1.42-1.97-.3-3.97-.3-5.94 0-.21-.49-.44-.96-.7-1.41a21.2 21.2 0 0 0-5.36 1.67A22.21 22.21 0 0 0 1.1 16.65 21.5 21.5 0 0 0 7.7 20c.53-.73 1-1.5 1.4-2.3-.76-.3-1.5-.66-2.21-1.09.19-.13.37-.27.54-.43a15.23 15.23 0 0 0 13.16 0c.17.15.36.3.54.43-.71.43-1.46.79-2.22 1.08.4.8.87 1.58 1.4 2.3a21.5 21.5 0 0 0 6.58-3.34c.55-5.68-.91-10.6-3.86-14.97ZM9.68 13.64c-1.28 0-2.34-1.2-2.34-2.65s1.03-2.64 2.34-2.64c1.3 0 2.36 1.2 2.34 2.64 0 1.46-1.04 2.65-2.34 2.65Zm8.64 0c-1.29 0-2.34-1.2-2.34-2.65S17 8.35 18.32 8.35c1.3 0 2.36 1.2 2.33 2.64 0 1.46-1.03 2.65-2.33 2.65Z' />
                  </svg>
                  <span className='text-x ml-1  text-sm'>Dec 24, 2016</span>
                </div>
                <span className='h-1 w-1 bg-gray-300 rounded-2xl' />
                <div className='flex flex-row'>
                  <img
                    src='/midu.webp'
                    className='w-5 h-5 rounded-full'
                    alt='midu icon'
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
    </section>
  )
}
