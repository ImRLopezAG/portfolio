'use client'
import { useCallback } from 'react'

interface BadgedProps {
  name: string
  display: string
}

const Badged: React.FC<BadgedProps> = ({ name, display }) => {
  const handleMouseMovement = useCallback((): void => {
    const element = document.getElementById(name)
    const box = document.getElementById(display)
    if (element === null || box === null) return
    box.classList.toggle('transition-all')
    box.classList.toggle('duration100')
    box.classList.toggle('ease-in-out')
    box.classList.toggle('translate-y-2')
    element.classList.toggle('hidden')
  }, [display, name])

  return (
    <img
      src={`/${name}.webp`}
      className='w-7 h-7'
      alt={name}
      onMouseLeave={handleMouseMovement}
      onMouseEnter={handleMouseMovement}
      width={30}
      height={30}
    />
  )
}

export default Badged
