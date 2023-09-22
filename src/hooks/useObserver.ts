import { useEffect, useRef, useState } from 'react'

interface ReturnObserver extends Array<any> {
  0: IntersectionObserverEntry[] | null
  1: React.MutableRefObject<IntersectionObserver> | undefined
}

export function useObserver (): ReturnObserver {
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

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      setEntries(entries)
    }, obsOptions)
  }, [])

  useEffect(() => {
    observer.current?.disconnect()
    elements.forEach((element) => observer.current?.observe(element))
    return () => observer.current?.disconnect()
  }, [elements, observer.current])

  return [entries, observer as React.MutableRefObject<IntersectionObserver>]
}
