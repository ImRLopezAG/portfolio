'use client'
import { useEffect } from 'react'

type colors = 'white' | 'black'

interface SectionProps {
  title: string
  color: colors
  children: React.ReactNode
}
export const Sections: React.FC<SectionProps> = ({
  title,
  color,
  children
}) => {
  useEffect(() => {
    window.location.hash = title
  }, [title])
  return (
    <div id={title} className='snap-center'>
      <section
        className={
          'landing-section flex flex-col p-9 max-[420px]:p-5 justify-center h-screen' +
          (color === 'white' ? ' bg-black text-white' : ' bg-white text-black')
        }
        data-header-color={color}
      >
        {children}
      </section>
    </div>
  )
}
