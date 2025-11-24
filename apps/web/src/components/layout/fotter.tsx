import { Github, Linkedin, Mail } from 'lucide-react'
export function Footer() {
	return (
		<footer className='mt-20 py-12 px-4'>
			<div className='translucent container mx-auto rounded-3xl border border-white/5 p-12 px-4'>
				<div className='grid grid-cols-2 gap-8 lg:grid-cols-4'>
					<div className='space-y-4'>
						<a
							href='/'
							className='bg-linear-to-r from-primary to-blue-600 bg-clip-text font-bold text-transparent text-xl'
						>
							Angel Lopez
						</a>
						<p className='text-muted-foreground'>
							Full-Stack developer with +2 years of experience & basketball
							player
						</p>
						<div className='flex gap-4'>
							<a
								href='https://github.com/ImRLopezAG'
								target='_blank'
								rel='noopener noreferrer'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								<Github className='h-5 w-5' />
								<span className='sr-only'>GitHub</span>
							</a>
							<a
								href='https://www.aedin.com/in/angel-gabriel-lopez/'
								target='_blank'
								rel='noopener noreferrer'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								<Linkedin className='h-5 w-5' />
								<span className='sr-only'>aedIn</span>
							</a>
							<a
								href='mailto:contact@imrlopez.dev'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								<Mail className='h-5 w-5' />
								<span className='sr-only'>Email</span>
							</a>
						</div>
					</div>

					<div className='space-y-4'>
						<h3 className='font-medium'>Quick as</h3>
						<nav className='flex flex-col gap-2'>
							<a
								href='/#home'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								Home
							</a>
							<a
								href='/#about'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								About
							</a>
							<a
								href='/#experience'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								Experience
							</a>
							<a
								href='/#skills'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								Skills
							</a>
							<a
								href='/#projects'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								Projects
							</a>
							<a
								href='/#contact'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								Contact
							</a>
						</nav>
					</div>

					<div className='space-y-4'>
						<h3 className='font-medium'>Blog</h3>
						<nav className='flex flex-col gap-2'>
							<a
								href='/blog'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								All Posts
							</a>
							<a
								href='/blog?category=web-development'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								Web Development
							</a>
							<a
								href='/blog?category=programming'
								className='text-muted-foreground transition-colors hover:text-primary'
							>
								Programming
							</a>
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
					<p>© 2025 Angel Gabriel Lopez. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}
