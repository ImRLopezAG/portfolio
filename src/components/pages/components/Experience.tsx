import { BracketIcon } from '@/components/icon'

interface ExperienceProps {
  title: string
  date: string
  description: string
  duration?: number
}

export const Experience: React.FC<ExperienceProps> = ({ title, date, description, duration = 0.2 }) => {
  const style: React.CSSProperties = {
    animationName: 'cascade',
    animationDuration: `${duration}s`,
    animationDelay: `${duration - 0.5}s`,
    animationTimingFunction: 'linear'
  }

  return (
    <li className='ml-6'>
      <span className='absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900'>
        <BracketIcon className='w-6' />
      </span>
      <div style={style}>
        <h3 className='mb-1 text-lg font-semibold text-gray-900 dark:text-white'>
          {title}
        </h3>
        <time className='block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
          {date}
        </time>
        <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
          {description}
        </p>
      </div>
    </li>
  )
}
