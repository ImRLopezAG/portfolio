interface SLetterProps {
  content: string
  badged: string
  element: string
}

export const SLetter: React.FC<SLetterProps> = ({ content, badged, element }) => {
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
