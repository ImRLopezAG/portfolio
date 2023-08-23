import { useEffect, useCallback } from 'react'
import { useObserver } from './'

interface ReturnObserver {
  header: HTMLHeadElement | null
  handleScroll: (link: string) => void
}

export function useHeader (): ReturnObserver {
  const header: HTMLHeadElement | null =
    typeof document !== 'undefined'
      ? document.getElementById('landing-header')
      : null
  const listItem: NodeListOf<HTMLLIElement> | undefined =
    header?.querySelectorAll('li')
  const menuBackdrop = header?.querySelector('#menu-backdrop') as HTMLDivElement

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

  const [entries, observer] = useObserver()

  useEffect(() => {
    entries?.forEach((entry) => {
      const { isIntersecting } = entry
      if (isIntersecting && header !== null) {
        const color = entry.target.getAttribute('data-header-color') ?? 'white'
        header.style.color = color === 'white' ? 'black' : 'white'
      }
    })
    return () => observer?.current?.disconnect()
  }, [entries])

  const handleScroll = useCallback((link: string) => {
    const element = document.getElementById(link)
    if (element !== null) {
      element.classList.add('scroll-behavior-smooth')
      element.scrollIntoView({ behavior: 'smooth' })
      element.classList.remove('scroll-behavior-smooth')
    }
  }, [])

  return {
    header,
    handleScroll
  }
}
