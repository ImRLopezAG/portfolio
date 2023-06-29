import Image from 'next/image'
import { useCallback } from 'react'

interface BadgedProps {
  name: string
  display: string
}
interface SLetterProps {
  content: string
  badged: string
  element: string
}
export const Badged: React.FC<BadgedProps> = ({ name, display }) => {
  const handleMouseMovement = useCallback((): void => {
    const element = document.getElementById(name)
    const box = document.getElementById(display)
    if (element && box) {
      box.classList.toggle('transition-all')
      box.classList.toggle('duration100')
      box.classList.toggle('ease-in-out')
      box.classList.toggle('translate-y-2')
      element.classList.toggle('hidden')
    }
  }, [])

  return (
    <Image
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
export const SLetter: React.FC<SLetterProps> = ({
  content,
  badged,
  element
}) => {
  return (
    <div
      id={badged}
      className='[&>span]:relative [&>span]:p-2 [&>span]:rounded-md [&>span]:bg-black [&>span]:flex-wrap [&>span]:-top-12 [&>span]:left-32'
    >
      <span id={element} className='hidden text-sm font-bold'>
        {content}
      </span>
    </div>
  )
}
