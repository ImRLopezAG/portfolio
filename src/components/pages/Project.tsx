import { LaptopMock, PhoneMock } from './components'

interface ProjectProps {
  props?: unknown
}

export const Project: React.FC<ProjectProps> = () => {
  return (
    <section className='flex flex-col p-3'>
      <h1 className='mb-3 text-3xl font-bold  text-center'><text className='text-blue-500 text-4xl rounded-2xl'>P</text>rojects<text className='text-blue-500 text-4xl rounded-2xl'>.</text></h1>
      <div className='flex gap-4'>
        <PhoneMock />
        <LaptopMock />
      </div>
    </section>
  )
}
