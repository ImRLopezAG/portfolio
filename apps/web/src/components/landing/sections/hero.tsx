import { LandingSection } from '@landing/section'
import { strapi } from '@services/strapi.service'
import { Link } from '@ui/link'
import { AlbumIcon, Github, Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'
export async function HeroSection() {
	const { basics } = await strapi.profile()
	return (
		<LandingSection id='hero' allowSplit={false}>
			<div className='grid items-center gap-8 lg:grid-cols-2'>
				<div className='motion-preset-slide-right-lg motion-duration-700 motion-delay-500 motion-ease-bounce space-y-6'>
					<div className='space-y-2'>
						<h1 className='font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl'>
							<span className='block leading-tight'>Hi, I&apos;m</span>
							<span className='block bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent leading-tight'>
								{basics.name}
							</span>
						</h1>
						<p className='text-muted-foreground text-xl'>{basics.label}</p>
					</div>

					<div className='flex flex-wrap gap-4'>
						<Link
							href='#contact'
							size='lg'
							variant='link'
							className='bg-transparent text-foreground'
						>
							Get in touch
						</Link>
						<Link
							href='#projects'
							size='lg'
							variant='link'
							className='bg-transparent text-foreground'
						>
							View projects
						</Link>
					</div>
					<div className='flex gap-4'>
						<Link
							href='https://github.com/ImRLopezAG'
							target='_blank'
							rel='noreferrer'
							title='GitHub'
							variant='ghost'
							size='icon'
						>
							<Github className='h-5 w-5' />
							<span className='sr-only'>GitHub</span>
						</Link>
						<Link
							href='https://www.aedin.com/in/angel-gabriel-lopez/'
							target='_blank'
							rel='noreferrer'
							title='aedIn'
							variant='ghost'
							size='icon'
						>
							<Linkedin className='h-5 w-5' />
							<span className='sr-only'>Linkedin</span>
						</Link>
						<Link
							href='https://www.instagram.com/angelglopez_/'
							target='_blank'
							rel='noreferrer'
							title='Instagram'
							variant='ghost'
							size='icon'
						>
							<Instagram className='h-5 w-5' />
							<span className='sr-only'>Instagram</span>
						</Link>
						<Link
							href='/blog'
							title='Visit my blog'
							className='rounded-full bg-muted'
							variant='ghost'
							size='icon'
						>
							<AlbumIcon className='h-5 w-5' />
							<span className='sr-only'>Blog</span>
						</Link>
					</div>
				</div>
				<div className='motion-translate-y-in-50 relative flex aspect-square items-center justify-center rounded-full bg-linear-to-br from-primary/20 to-blue-600/20'>
					<div className='absolute inset-4 flex items-center justify-center overflow-hidden rounded-full bg-muted'>
						<Image
							src={basics.image.url}
							alt='Angel Gabriel Lopez'
							className='h-full w-full object-cover'
							loading='eager'
							width={400}
							height={400}
						/>
					</div>
				</div>
			</div>
		</LandingSection>
	)
}
