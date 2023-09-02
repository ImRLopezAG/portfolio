import { Experience } from './experience'

export const Experiences = (): JSX.Element => {
  return (
    <ol className='relative border-l border-gray-200 dark:border-gray-700'>
      <Experience
        title='Tech Path'
        date='Aug-2023 / Current'
        description='This is a platform which upgrade the performance of the principal web pages of ITLA which is the university where I study.'
        duration={0.35}
      />
      <Experience
        title='Cash Banking'
        date='May-2023 / Aug-2023'
        description='Based on Paypal UI and UX, this product is a MVP to get knowledge about the financial sector.'
        duration={0.4}
      />
      <Experience
        title='Air Estate'
        date='Jan-2023 / Apr-2023'
        description='I was developing a MVP like Airbnb, but for real estate, this product was developed with a team of 3'
        duration={0.45}
      />
      <Experience
        title='VillaCampa School of Technology'
        date='Jan-2021 / Dec-2021'
        description='My labor was teach to children the basic concepts of programming and computer science.'
        duration={0.5}
      />
    </ol>
  )
}
