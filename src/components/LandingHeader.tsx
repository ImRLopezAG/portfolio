'use client'
import { Logo } from '@/components/icon'
import { useHeader } from '@/hooks'
import Link from 'next/link'

const LandingHeader = (): JSX.Element => {
  useHeader()

  return (
    <header
      id='landing-header'
      className='flex items-center justify-between fixed top-0 w-full p-2 mb-3 z-10 max-[420px]:p-0 '
    >
      <div className='flex flex-grow basis-0'>
      <Link href='#Home'><Logo className='h-5 hover:text-blue-500' /></Link>
      </div>
      <nav className='flex flex-grow justify-start'>
        <ul className='flex text-sm [&>li>a]:font-medium [&>li>a]:text-current [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2'>
          <li className='hover:text-blue-400'>
            <Link href='#Home'>Home</Link>
          </li>
          <li className='hover:text-blue-400'>
            <Link href='#Projects'>Projects</Link>
          </li>
        </ul>
      </nav>
      <div
        id='menu-backdrop'
        className='bg-slate-300/50 absolute backdrop-blur-lg rounded translate-x-[var(--left)] translate-y-[var(--top)] left-0 top-0 w-[var(--width)] h-[var(--height)] transition-all duration-500 ease-in-out opacity-0 -z-10'
      />
    </header>
  )
}

export default LandingHeader
