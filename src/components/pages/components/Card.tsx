import Link from 'next/link'

interface CardProps {
  title: string
  desc: string
  url: string
  tech: string
}
interface Color {
  [key: string]: string
}

export const Card = ({ title, desc, url, tech }: CardProps): JSX.Element => {
  const Color: Color = {
    'C#': '#37CB19',
    JavaScript: '#F7DF1E',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    Handlebars: '#f7931e'
  }

  const color: string = Color[tech] ?? '#FFFFFF'

  return (
    <div className='flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] w-70 h-52'>
      <div className='p-2 md:p-8'>
        <h3 className='text-lg font-bold text-gray-800 dark:text-white truncate'>
          {title}
        </h3>
        <p
          className='text-gray-800 dark:text-gray-400 flex-wrap overflow-hidden'
          style={{ maxHeight: '3.5rem' }}
        >
          {desc}
        </p>
        <div className='flex flex-row gap-4 items-center mt-4 justify-between'>
          {tech && (
            <div className='flex flex-row gap-2'>
              <span
                className='w-4 h-4 rounded-full'
                style={{
                  background: color
                }}
              />
              <p className='text-gray-500'>{tech}</p>
            </div>
          )}
          <Link
            className='inline-flex items-center gap-2 font-medium text-blue-500 hover:text-blue-700'
            href={url}
          >
            Repo link
            <svg
              className='w-2.5 h-auto'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
