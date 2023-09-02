'use client'
import { Button } from '@nextui-org/button'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/modal'
import { Tech, type TechTypes } from './Tech'

interface CardModalProps {
  title: string
  techs: TechTypes[]
  images?: string[]
}

const CardModal: React.FC<CardModalProps> = ({ title, techs, images }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <>
      <Button onPress={onOpen} color='primary' variant='ghost'>
        More information
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop='blur'
        size='xl'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
              <ModalBody>
                {images !== undefined && (
                  <section className='flex flex-col gap-3'>
                    <article>
                      Screenshots:
                      <div className='flex gap-2'>
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
                <article className='flex-col gap-3'>
                  Technologies:
                  <div className='flex gap-2'>
                    {techs.map((tech) => (
                      <span
                        key={tech}
                        className='bg-slate-700/40 p-2 rounded-md h-16 w-16 flex justify-center'
                      >
                        <Tech tech={tech} />
                      </span>
                    ))}
                  </div>
                </article>
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

export default CardModal
