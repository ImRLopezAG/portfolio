import { useCallback, useRef } from 'react'

interface ReturnObserver {
  header: React.MutableRefObject<HTMLHeadElement | null>
  handleScroll: (link: string) => void
}

export const useHeader = (): ReturnObserver => {
  const handleScroll = useCallback((link: string) => {
    const element = document.getElementById(link)
    if (element) {
      element.classList.add('scroll-behavior-smooth')
      element.scrollIntoView({ behavior: 'smooth' })
      element.classList.remove('scroll-behavior-smooth')
    }
  }, [])

  const header = useRef<HTMLHeadElement>(null)

  const { current } = header
  const listItem = current?.querySelectorAll('li')
  const menuBackdrop = current?.querySelector(
    '#menu-backdrop'
  ) as HTMLDivElement

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

  return {
    header,
    handleScroll
  }
}
