import { useCallback, useEffect, useRef } from 'react'
import { Logo } from './Logo'

export const LandingHeader = (): JSX.Element => {
  const header = useRef<HTMLHeadElement>(null)
  const observer = useRef<IntersectionObserver>()

  const sectionElements = global.document?.querySelectorAll('.landing-section')
  sectionElements?.forEach((section) => observer.current?.observe(section))

  const listItem = header.current?.querySelectorAll('li')

  const menuBackdrop = header.current?.querySelector(
    '#menu-backdrop'
  ) as HTMLDivElement

  const handleScroll = useCallback((link: string) => {
    const element = document.getElementById(link)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      element.classList.add('scroll-behavior-smooth')
    }
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.9
    }
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { isIntersecting } = entry
        if (isIntersecting && header.current) {
          const color = entry.target.getAttribute('data-header-color') ?? ''
          header.current.style.color = color
        }
      })
    }, observerOptions)
  }, [])

  listItem?.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      const { left, top, width, height } = item.getBoundingClientRect()

      menuBackdrop.style.setProperty('--left', `${left}px`)
      menuBackdrop.style.setProperty('--top', `${top}px`)
      menuBackdrop.style.setProperty('--width', `${width}px`)
      menuBackdrop.style.setProperty('--height', `${height}px`)
      menuBackdrop.style.opacity = '1'
      menuBackdrop.style.visibility = 'visible'
    })

    item.addEventListener('mouseleave', () => {
      menuBackdrop.style.opacity = '0'
      menuBackdrop.style.visibility = 'hidden'
    })
  })

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
            <a href='#Home'>Home</a>
          </li>
          <li onClick={() => handleScroll('Projects')}>
            <a href='#Projects'>Projects</a>
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
