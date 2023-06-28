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
  return (
    <div id={title} className='snap-center'>
      <section
        className={
          'landing-section flex flex-col p-9 max-[420px]:p-5 justify-center h-screen' +
          (color === 'white' ? ' bg-white text-black' : ' bg-black text-white')
        }
        data-header-color={color}
      >
        {children}
      </section>
    </div>
  )
}
