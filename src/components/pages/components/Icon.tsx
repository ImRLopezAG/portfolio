import { EmailIcon, GithubIcon, LinkedInIcon, ResumeIcon, TwitterIcon } from '@/components/icon/icons'
import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'

export const Icons = (): JSX.Element => {
  const Icon: Record<string, JSX.Element> = {
    linkedin: <LinkedInIcon className='h-10 w-10' />,
    resume: <ResumeIcon className='h-10 w-10' />,
    github: <GithubIcon className='h-10 w-10' />,
    twitter: <TwitterIcon className='h-10 w-10' />,
    email: <EmailIcon className='h-10 w-10' />
  }

  const Urls: Record<string, string> = {
    linkedin: 'linkedin.com/in/angel-gabriel-lopez',
    resume: 'docs.google.com/document/d/176L3kfuVECauW3vadR9yKZREDEfgXDadVGqQ3zm51wc',
    github: 'github.com/imrlopezag',
    twitter: 'twitter.com/imr_lopez',
    email: 'angelg00lopez@gmail.com',
  }

  return (
    <>
      {Array.from(Object.keys(Icon)).map((icon) => (
      <Tooltip
          key={icon}
          content={icon}
          color='primary'
        >
          <Link
            href={
              icon === 'email' ? `mailto:${Urls[icon]}` : `https://${Urls[icon]}`
            }
            target='_blank'
            className='flex items-center justify-center cursor-pointer'
            rel='noreferrer'
          >
              {Icon[icon]}
          </Link>
        </Tooltip>
      ))}
    </>    
  )
}
