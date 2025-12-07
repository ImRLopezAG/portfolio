import { LandingSection } from '@landing/section'
import { strapi } from '@services/strapi.service'
import { Link } from '@ui/link'
import { AlbumIcon, Github, Instagram, Linkedin, Terminal } from 'lucide-react'
import Image from 'next/image'
import { Tech } from './tech-stack/tech'

export async function HeroSection() {
	const { basics, skills } = await strapi.profile()
	const orbitSkills = skills.slice(0, 6) // Take top 6 skills for the orbit

	return (
		<LandingSection id='hero' allowSplit={false} className='py-0'>
			<div className='grid items-center gap-12 lg:grid-cols-2'>
				<div className='motion-preset-slide-right-lg motion-duration-700 motion-delay-500 order-last space-y-8 lg:order-first'>
					<div className='translucent inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-primary text-sm'>
						<Terminal className='h-4 w-4' />
						<span className='font-medium font-mono'>Hello World, I&apos;m</span>
					</div>

					<div className='space-y-4'>
						<h1 className='font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl'>
							<span className='bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
								{basics.name}
							</span>
						</h1>
						<p className='max-w-lg text-muted-foreground text-xl leading-relaxed'>
							{basics.label}
						</p>
					</div>

					<div className='flex flex-wrap gap-4'>
						<Link
							href='#contact'
							size='lg'
							className='group relative overflow-hidden'
						>
							<span className='relative z-10'>Get in touch</span>
							<div className='-translate-x-full absolute inset-0 bg-white/20 transition-transform group-hover:translate-x-0' />
						</Link>
						<Link
							href='#projects'
							size='lg'
							variant='outline'
							className='group'
						>
							View projects
						</Link>
					</div>

					<div className='flex gap-4 border-border/50 border-t pt-8'>
						<Link
							href='https://github.com/ImRLopezAG'
							target='_blank'
							rel='noreferrer'
							title='GitHub'
							variant='ghost'
							size='icon'
							className='hover:bg-primary/10 hover:text-primary'
						>
							<Github className='h-5 w-5' />
							<span className='sr-only'>GitHub</span>
						</Link>
						<Link
							href='https://www.linkedin.com/in/angel-gabriel-lopez/'
							target='_blank'
							rel='noreferrer'
							title='LinkedIn'
							variant='ghost'
							size='icon'
							className='hover:bg-primary/10 hover:text-primary'
						>
							<Linkedin className='h-5 w-5' />
							<span className='sr-only'>LinkedIn</span>
						</Link>
						<Link
							href='https://www.instagram.com/angelglopez_/'
							target='_blank'
							rel='noreferrer'
							title='Instagram'
							variant='ghost'
							size='icon'
							className='hover:bg-primary/10 hover:text-primary'
						>
							<Instagram className='h-5 w-5' />
							<span className='sr-only'>Instagram</span>
						</Link>
						<Link
							href='/blog'
							title='Blog'
							variant='ghost'
							size='icon'
							className='hover:bg-primary/10 hover:text-primary'
						>
							<AlbumIcon className='h-5 w-5' />
							<span className='sr-only'>Blog</span>
						</Link>
					</div>
				</div>

				<div className='relative flex aspect-square items-center justify-center'>
					{/* Decorative Background Elements */}
					<div className='absolute inset-0 bg-linear-to-tr from-primary/20 via-transparent to-blue-500/20 blur-3xl' />

					{/* Main Orbit Container */}
					<div className='relative flex size-96 items-center justify-center [--orbit-radius:190px] sm:size-128 sm:[--orbit-radius:208px]'>
						{/* Orbit Rings */}
						<div className='absolute inset-0 rounded-full border border-primary/10' />
						<div className='absolute inset-12 rounded-full border border-primary/10' />

						{/* Profile Image */}
						<div className='relative z-10 size-64 overflow-hidden rounded-full border-4 border-background shadow-2xl sm:size-80'>
							<Image
								src={basics.image.url}
								alt={basics.name}
								className='h-full w-full object-cover'
								loading='eager'
								width={600}
								height={600}
								priority={false}
							/>
						</div>

						{/* Orbiting Skills */}
						<div className='absolute inset-0 animate-[spin_20s_linear_infinite]'>
							{orbitSkills.map((skill, index) => {
								return (
									<div
										key={skill.name}
										className='-ml-6 -mt-6 absolute top-1/2 left-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-background/80 shadow-lg backdrop-blur-sm transition-transform hover:scale-110'
										style={{
											transform: `rotate(${index * (360 / orbitSkills.length)}deg) translate(var(--orbit-radius)) rotate(-${index * (360 / orbitSkills.length)}deg)`,
										}}
									>
										<div className='animate-[spin_20s_linear_infinite_reverse]'>
											<Tech
												name={skill.logo || skill.name}
												invert={skill.invert}
												className='h-6 w-6'
											/>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</div>
		</LandingSection>
	)
}
