import { Button } from '@/components/ui/button'
import { ScrollNext } from '@components/scroll-next'
import { AlbumIcon, Github, Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from './section'
export function Hero() {
	return (
		<AnimatedSection
			id='home'
			className='flex min-h-screen flex-col justify-center pt-16'
		>
			<div className='grid items-center gap-8 lg:grid-cols-2'>
				<div className='motion-preset-slide-right-lg motion-duration-700 motion-delay-500 motion-ease-bounce space-y-6'>
					<div className='space-y-2'>
						<h1 className='font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl'>
							<span className='block'>Hi, I&apos;m</span>
							<span className='block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent'>
								Angel Gabriel Lopez
							</span>
						</h1>
						<p className='text-muted-foreground text-xl'>
							Full-Stack developer with +2 years of experience & basketball
							player
						</p>
					</div>
					<p className='max-w-prose text-lg text-muted-foreground'>
						Results-driven software developer crafting impactful, real-world
						applications in .NET, Next.js, and Dynamics 365.
					</p>
					<div className='flex flex-wrap gap-4'>
						<Button asChild size='lg'>
							<Link href='#contact'>Get in touch</Link>
						</Button>
						<Button asChild variant='outline' size='lg'>
							<Link href='#projects'>View projects</Link>
						</Button>
					</div>
					<div className='flex gap-4'>
						<Button asChild variant='ghost' size='icon'>
							<Link
								href='https://github.com/ImRLopezAG'
								target='_blank'
								title='GitHub'
							>
								<Github className='h-5 w-5' />
								<span className='sr-only'>GitHub</span>
							</Link>
						</Button>
						<Button asChild variant='ghost' size='icon'>
							<Link
								href='https://www.linkedin.com/in/angel-gabriel-lopez/'
								target='_blank'
								title='LinkedIn'
							>
								<Linkedin className='h-5 w-5' />
								<span className='sr-only'>LinkedIn</span>
							</Link>
						</Button>
						<Button asChild variant='ghost' size='icon'>
							<Link
								href='https://www.instagram.com/angelglopez_/'
								target='_blank'
								title='Instagram'
							>
								<Instagram className='h-5 w-5' />
								<span className='sr-only'>Instagram</span>
							</Link>
						</Button>
						<Button asChild variant='ghost' size='icon'>
							<Link
								href='/blog'
								title='Visit my blog'
								className='rounded-full bg-muted p-3 transition-colors hover:bg-primary/20'
							>
								<AlbumIcon className='h-5 w-5' />
								<span className='sr-only'>Blog</span>
							</Link>
						</Button>
					</div>
				</div>
				<div className='motion-translate-y-in-50 relative flex aspect-square items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20'>
					<div className='absolute inset-4 flex items-center justify-center overflow-hidden rounded-full bg-muted'>
						<Image
							src='/me.webp'
							alt='Angel Gabriel Lopez'
							className='h-full w-full object-cover'
							priority
							quality={80}
							width={400}
							height={400}
						/>
					</div>
				</div>
			</div>
			<div className='mt-16 flex justify-center'>
				<ScrollNext elementId='about' />
			</div>
		</AnimatedSection>
	)
}
