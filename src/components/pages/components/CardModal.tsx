'use client'
import { Button } from '@nextui-org/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { AspIcon, BootstrapIcon, CsharpIcon, CssIcon, DartIcon, DotNetIcon, ExpressIcon, FlutterIcon, GitIcon, HTMLIcon, JSIcon, MongoDbIcon, NextJsIcon, NodeIcon, ReactIcon, SequelizeIcon, SqlIcon, TSIcon, TailwindIcon } from '@/components/icon'

interface CardModalProps {
  title: string
  techs: TechTypes[]
  images?: string[]
}

type TechTypes = '.Net' | 'Asp.Net' | 'Bootstrap' | 'C-Sharp' | 'CSS' | 'Git' | 'HTML' | 'JavaScript' | 'MongoDb' | 'NextJs' | 'Node' | 'React' | 'Sequelize' | 'SQL' | 'TailwindCss' | 'TypeScript' | 'Dart' | 'Flutter' | 'Express'

const CardModal: React.FC<CardModalProps> = ({ title, techs, images }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const Technologies: Record<TechTypes, JSX.Element> = {
    '.Net': <DotNetIcon />,
    'Asp.Net': <AspIcon />,
    Bootstrap: <BootstrapIcon />,
    'C-Sharp': <CsharpIcon />,
    CSS: <CssIcon />,
    Git: <GitIcon />,
    HTML: <HTMLIcon />,
    JavaScript: <JSIcon />,
    MongoDb: <MongoDbIcon />,
    NextJs: <NextJsIcon />,
    Node: <NodeIcon />,
    React: <ReactIcon />,
    Sequelize: <SequelizeIcon />,
    SQL: <SqlIcon />,
    TailwindCss: <TailwindIcon />,
    TypeScript: <TSIcon />,
    Dart: <DartIcon />,
    Flutter: <FlutterIcon />,
    Express: <ExpressIcon />
  }
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
                        { Technologies[tech] }
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
