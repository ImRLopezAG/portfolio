import { useHeader, useObserver } from '@/hooks'
import Link from 'next/link'
import { useEffect } from 'react'
import { Logo } from './Logo'

export const LandingHeader = (): JSX.Element => {
  const { header, handleScroll } = useHeader()

  const [entries, observer] = useObserver()

  useEffect(() => {
    entries?.forEach((entry) => {
      const { isIntersecting } = entry
      if (isIntersecting && header.current) {
        const color = entry.target.getAttribute('data-header-color') ?? 'white'
        header.current.style.color = color === 'white' ? 'black' : 'white'
      }
    })
    return () => observer?.current?.disconnect()
  }, [entries])

  return (
    <header
      ref={header}
      className='flex items-center justify-between fixed top-0 w-full p-2 z-10 max-[420px]:p-0 '
    >
      <div className='flex flex-grow basis-0'>
        <Logo />
      </div>
      <nav className='flex flex-grow justify-start'>
        <ul className='flex text-sm [&>li>a]:font-medium [&>li>a]:text-current [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2'>
          <li onClick={() => handleScroll('Home')}>
            <Link href='#Home'>Home</Link>
          </li>
          <li onClick={() => handleScroll('Projects')}>
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
