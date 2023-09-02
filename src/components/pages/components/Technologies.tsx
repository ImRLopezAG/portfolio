import { Tooltip } from '@nextui-org/tooltip'
import { Tech } from './tech'

export const Technologies = (): JSX.Element => {
  return (
    <div className='flex gap-3 min-[420px]:flex-wrap overflow-auto max-[420px]:flex-row hide-scrollbar'>
      {Array.from(Object.keys(Tech)).map((tech) => (
        <Tooltip key={tech} color='primary' content={tech}>
          <div className='bg-slate-700/40 p-2 rounded-md h-16 w-16 flex justify-center scale-up-top-left'>
            {Tech[tech as keyof typeof Tech]}
          </div>
        </Tooltip>
      ))}
    </div>
  )
}
