export const LaptopMock = (): JSX.Element => {
  return (
    <section className='min-w-[25rem]'>
      <article className='relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[5.6px] rounded-t-xl h-[120.4px] max-w-[210.7px] md:h-[205.8px] md:max-w-[358.4px]'>
        <div className='rounded-lg overflow-hidden h-[109.2px] md:h-[194.6px] bg-white'>
          <h2 className='text-2xl font-bold text-gray-800  px-3 pt-4'>Laptop</h2>
        </div>
      </article>
      <footer className='relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[11.9px] max-w-[243px] md:h-[15.7px] md:max-w-[414px]'>
        <span className='absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[39.2px] h-[3.5px] md:w-[67.2px] md:h-[5.6px] bg-gray-800' />
      </footer>
    </section>
  )
}
