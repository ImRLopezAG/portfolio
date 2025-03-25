import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
	const currentYear = new Date().getFullYear()
	
	return (
		<footer className='border-t bg-muted/40 py-12'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-2 gap-8 lg:grid-cols-4'>
					<div className='space-y-4'>
						<Link
							href='/'
							className='bg-gradient-to-r from-primary to-purple-600 bg-clip-text font-bold text-transparent text-xl'
						>
							Angel Lopez
						</Link>
						<p className='text-muted-foreground'>
							Full-Stack developer with +2 years of experience & basketball
							player
						</p>
						<div className='flex gap-4'>
							<Link
								href='https://github.com/ImRLopezAG'
								target='_blank'
								rel='noopener noreferrer'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								<Github className='h-5 w-5' />
								<span className='sr-only'>GitHub</span>
							</Link>
							<Link
								href='https://www.linkedin.com/in/angel-gabriel-lopez/'
								target='_blank'
								rel='noopener noreferrer'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								<Linkedin className='h-5 w-5' />
								<span className='sr-only'>LinkedIn</span>
							</Link>
							<Link
								href='mailto:contact@imrlopez.dev'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								<Mail className='h-5 w-5' />
								<span className='sr-only'>Email</span>
							</Link>
						</div>
					</div>

					<div className='space-y-4'>
						<h3 className='font-medium'>Quick Links</h3>
						<nav className='flex flex-col gap-2'>
							<Link
								href='/#home'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								Home
							</Link>
							<Link
								href='/#about'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								About
							</Link>
							<Link
								href='/#experience'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								Experience
							</Link>
							<Link
								href='/#skills'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								Skills
							</Link>
							<Link
								href='/#projects'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								Projects
							</Link>
							<Link
								href='/#contact'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								Contact
							</Link>
						</nav>
					</div>

					<div className='space-y-4'>
						<h3 className='font-medium'>Blog</h3>
						<nav className='flex flex-col gap-2'>
							<Link
								href='/blog'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								All Posts
							</Link>
							<Link
								href='/blog?category=web-development'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								Web Development
							</Link>
							<Link
								href='/blog?category=programming'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								Programming
							</Link>
						</nav>
					</div>

					<div className='space-y-4'>
						<h3 className='font-medium'>Contact</h3>
						<div className='space-y-2'>
							<p className='text-muted-foreground'>
								Santo Domingo, Dominican Republic
							</p>
							<p className='text-muted-foreground'>contact@imrlopez.dev</p>
							<p className='text-muted-foreground'>+1 849 267 9236</p>
						</div>
					</div>
				</div>

				<div className='mt-12 border-t pt-6 text-center text-muted-foreground'>
					<p>© {currentYear} Angel Gabriel Lopez. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}
