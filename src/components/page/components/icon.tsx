import { GithubIcon, LinkedInIcon, ResumeIcon, TwitterIcon } from '@/components/icon/icons'
import { Tooltip } from '@nextui-org/tooltip'
import { Link } from '@nextui-org/link'

export const Icons = (): JSX.Element => {
  const Icon: Record<string, JSX.Element> = {
    Linkedin: <LinkedInIcon />,
    Resume: <ResumeIcon />,
    Github: <GithubIcon />,
    Twitter: <TwitterIcon />
  }

  const Urls: Record<string, string> = {
    Linkedin: 'linkedin.com/in/angel-gabriel-lopez',
    Resume: 'docs.google.com/document/d/176L3kfuVECauW3vadR9yKZREDEfgXDadVGqQ3zm51wc',
    Github: 'github.com/imrlopezag',
    Twitter: 'twitter.com/imr_lopez'
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
              href={`https://${Urls[icon]}`}
              target='_blank'
              className='flex items-center justify-center cursor-pointer w-6 h-6'
              rel='noreferrer'
              title={icon}
            >
              {Icon[icon]}
            </Link>
        </Tooltip>
      ))}
    </>
  )
}
