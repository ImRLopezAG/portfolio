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
          'landing-section flex flex-col pt-9 pb-4 px-3 justify-center h-screen' +
          (color === 'white' ? ' bg-white text-black' : ' bg-black text-white')
        }
        data-header-color={color}
      >
        {children}
      </section>
    </div>
  )
}
