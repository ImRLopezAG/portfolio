export const PhoneMock = (): JSX.Element => {
  return (
    <div className='relative border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[400px] w-[200px] shadow-xl'>
      <div className='w-[100px] h-[12px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute' />
      <div className='h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg' />
      <div className='h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg' />
      <div className='h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg' />
      <div className='rounded-[2rem] overflow-hidden w-full h-full bg-white'>
        <h2 className='text-2xl font-bold text-gray-800  px-3 pt-4'>Phone</h2>
      </div>
    </div>
  )
}
