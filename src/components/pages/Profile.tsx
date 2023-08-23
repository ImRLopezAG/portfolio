import { DiscordCard, ProfileTab } from './components'

export const Profile = (): JSX.Element => {
  return (
    <div className='flex max-[420px]:flex-col gap-20 items-start min-[420px]:mt-4 [&>section]:flex-col [&>section>h2]:font-bold [&>section>h2]:my-4 [&>section]:max-[420px]:w-full '>
      <section className='w-1/2 flex max-[420px]:hidden'>
          <h2 className='text-3xl type-blinking'>Angel <span className='text-blue-500'>Gabriel</span> Lopez.</h2>
        <p className='text-lg'>
          Software Engineer a{' '}
          <span className='text-blue-500'>polyglot developer</span> with +2
          years of personal projects,{' '}
          <span className='text-blue-500'>building applications</span> and
          automating the boring stuff.
        </p>
        <p className='text-lg my-4 max-[420px]:hidden'>
          I have experience with{' '}
          <span className='text-blue-500'>a wide range of technologies</span>,
          from <span className='text-blue-500'>Back-end</span> to{' '}
          <span className='text-blue-500'>Front-end</span> and looking forward
          to learn more.
        </p>
        <section className='flex flex-col '>
          <ProfileTab />
        </section>
      </section>
      <section className='w-1/2 flex h-full'>
        <DiscordCard />
      </section>
    </div>
  )
}
