import { Map } from '@/components/icon/map'
import type { TechTypes } from '@/types'
import { Button } from '@nextui-org/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'

interface CardModalProps {
  title: string
  techs: TechTypes[]
  images?: string[]
}

export const CardModal: React.FC<CardModalProps> = ({ title, techs, images }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <Button onPress={onOpen} variant='ghost'>
        More information
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop='blur'
        size='xl'
        classNames={{
          footer: 'py-2 px-4'
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                {title}
              </ModalHeader>
              <ModalBody>
                {images !== undefined && (
                  <section className='flex flex-col gap-2'>
                    <span>Screenshots</span>
                    <article className='gap-2'>
                      <div className='flex gap-2 overflow-x-auto mb-2 rounded-lg'>
                        {images?.map((image) => (
                          <img
                            key={title + image}
                            src={image}
                            alt='Screenshot from the project'
                            className='rounded-xl shadow hover:shadow-2xl transition-all duration-200 h-64'
                          />
                        ))}
                      </div>
                    </article>
                  </section>
                )}
                <section className='flex flex-col gap-2'>
                  <span>Technologies</span>
                  <div className='flex gap-2'>
                    {techs.map((tech) => (
                      <span
                        key={tech}
                        className='bg-slate-700/40 p-2 rounded-md h-16 w-16 flex justify-center'
                      >
                        <Map tech={tech} />
                      </span>
                    ))}
                  </div>
                </section>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
