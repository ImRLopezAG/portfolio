import Image from 'next/image'
import Link from 'next/link'

interface IconProps {
  name: string
  src: string
  url: string
}

export const Icon = ({ name, src, url }: IconProps): JSX.Element => {
  const isEmail = name === 'email'

  return (
    <Link
      href={isEmail ? `mailto:${url}` : `https://${url}`}
      target={isEmail ? '' : '_blank'}
      rel='noreferrer'
      title={name}
    >
      <Image
        alt={name}
        src={`${src}.svg`}
        className='w-12 h-12 rounded-md p-2'
        width='48'
        height='48'
      />
    </Link>
  )
}
