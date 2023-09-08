import { Tooltip } from '@nextui-org/react'

export const Badged = (): JSX.Element => {
  const display: Record<string, string> = {
    'green-badged': 'Active Developer',
    'purple-badged': 'HypeSquad Bravery',
    'nitro-badged': 'Nitro',
    'nitro-booster': 'Server Booster',
    'cat-badged': 'Knows as ImRLopez'
  }
  return (
    <>
      {Array.from(Object.keys(display)).map((badge) => (
        <Tooltip
          key={badge}
          content={display[badge]}
          classNames={{
            base: 'p-2 rounded-md  flex justify-center scale-up-top mb-3 right-4'
          }}
        >
          <img
            src={`/${badge}.webp`}
            className='w-7 h-7'
            alt={badge}
            width={30}
            height={30}
          />
        </Tooltip>
      ))}
    </>
  )
}
