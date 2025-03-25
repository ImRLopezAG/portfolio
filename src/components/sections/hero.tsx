'use client'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { AlbumIcon, ArrowDown, Github, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
export function Hero() {
	const heroRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-fade-in')
					}
				}
			},
			{ threshold: 0.1 },
		)

		if (heroRef.current) {
			observer.observe(heroRef.current)
		}

		return () => {
			if (heroRef.current) {
				observer.unobserve(heroRef.current)
			}
		}
	}, [])

	return (
		<section
			id='home'
			ref={heroRef}
			className='flex min-h-screen flex-col justify-center pt-16 opacity-0'
		>
			<div className='grid items-center gap-8 lg:grid-cols-2'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='space-y-6'
				>
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
				</motion.div>
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className='relative flex aspect-square items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20'
				>
					<div className='absolute inset-4 flex items-center justify-center overflow-hidden rounded-full bg-muted'>
						<img
							src='/me.jpeg'
							alt='Angel Gabriel Lopez'
							className='h-full w-full object-cover'
						/>
					</div>
				</motion.div>
			</div>
			<div className='mt-16 flex justify-center'>
				<Button
					variant='ghost'
					size='icon'
					className='animate-bounce'
					onClick={() => {
						document
							.getElementById('about')
							?.scrollIntoView({ behavior: 'smooth' })
					}}
				>
					<ArrowDown className='h-6 w-6' />
					<span className='sr-only'>Scroll down</span>
				</Button>
			</div>
		</section>
	)
}
