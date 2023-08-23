import { Sections } from '@/components'
import { Profile } from '@/components/pages'

export default function Home (): JSX.Element {
  return (
    <main className='snap-y snap-mandatory relative h-screen overflow-auto'>
      <Sections title='Home' color='black'>
        <Profile />
      </Sections>
    </main>
  )
}
