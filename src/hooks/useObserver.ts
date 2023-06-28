import { useEffect, useRef, useState } from 'react'

interface ReturnObserver extends Array<any> {
  0: IntersectionObserverEntry[] | null
  1: React.MutableRefObject<IntersectionObserver> | undefined
  2: React.Dispatch<React.SetStateAction<IntersectionObserverEntry[] | null>>
}

export const useObserver = (): ReturnObserver => {
  const elements = typeof document !== 'undefined' ? document.querySelectorAll<HTMLDivElement>('.landing-section') : []
  const [entries, setEntries] = useState<IntersectionObserverEntry[] | null>(
    null
  )
  const obsOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.9
  }

  const observer = useRef<IntersectionObserver>()

  const { current } = observer

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      setEntries(entries)
    }, obsOptions)
  }, [])

  useEffect(() => {
    current?.disconnect()
    elements.forEach((element) => observer.current?.observe(element))
    return () => current?.disconnect()
  }, [elements, current])

  return [entries, observer as React.MutableRefObject<IntersectionObserver>, setEntries]
}
