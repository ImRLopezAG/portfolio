'use client'
import { DevFolder, ExperienceIcon } from '@/components/icon'
import { Tab, Tabs } from '@nextui-org/tabs'
import type { Key } from 'react'
import { useCallback, useState } from 'react'
import { Experiences } from './Experiences'
import { Technologies } from './Technologies'

const ProfileTab = (): JSX.Element => {
  const [selection, setSelection] = useState<Key>('Experiences')

  const handleSelection = useCallback((selected: Key) => {
    setSelection(selected)
  }, [])

  return (
    <Tabs
      variant='underlined'
      aria-label='about me'
      color='primary'
      selectedKey={selection}
      onSelectionChange={handleSelection}
      classNames={{
        tabList:
          'gap-6 w-full relative rounded-none p-0 border-b border-divider',
        cursor: 'w-full bg-blue-500',
        tab: 'max-w-fit px-0 h-12 tex-white',
        tabContent: 'group-data-[selected=true]:text-white'
      }}
    >
      <Tab
        key='Experiences'
        title={
          <div className='flex items-center gap-2'>
            <ExperienceIcon className='w-8' />
            <span className='text-3xl font-bold '>Experiences{ selection === 'Experiences'
              ? (
              <span className='text-blue-500'>.</span>
                )
              : null}
            </span>
          </div>
        }
      >
        <div className='pl-3'>
          <Experiences />
        </div>
      </Tab>
      <Tab
        key='Technologies'
        title={
          <div className='flex items-center gap-2'>
            <DevFolder className='w-8' />
            <span className='text-3xl font-bold '>Technologies{ selection === 'Technologies'
              ? (
              <span className='text-blue-500'>.</span>
                )
              : null}
            </span>
          </div>
        }
      >
        <Technologies />
      </Tab>
    </Tabs>
  )
}

export default ProfileTab
