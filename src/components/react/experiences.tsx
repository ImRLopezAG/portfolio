import { Experience } from './experience'
import { EXPERIENCES } from '@/constants'

export const Experiences = (): JSX.Element => {
  return (
    <ol className='relative border-l border-gray-200 dark:border-gray-700'>
      {EXPERIENCES.map(({ title, date, description, duration }) => (
        <Experience
          key={crypto.randomUUID()}
          title={title}
          date={date}
          description={description}
          duration={duration}
        />
      ))}
    </ol>
  )
}
