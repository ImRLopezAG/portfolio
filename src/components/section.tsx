interface SectionProps {
  title: string
  color: 'white' | 'black'
  children: React.ReactNode
}

export const Sections: React.FC<SectionProps> = ({ title, color, children }) => {
  return (
    <section
      id={title}
      data-header-color={color}
      className={
        'snap-center landing-section flex flex-col pt-9 pb-4 px-3 h-screen ' +
        (color === 'white' ? 'bg-white text-black' : 'bg-black text-white')
      }
    >
      {children}
    </section>
  )
}
