import { ContactForm } from '@components/contact-form'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@ui/card'
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { AnimatedSection } from './section'

export function Contact() {
	return (
		<AnimatedSection id='contact'>
			<div className='space-y-4 text-center'>
				<h2 className='font-bold text-3xl tracking-tight sm:text-4xl'>
					Get In Touch
				</h2>
				<div className='mx-auto h-1 w-20 rounded-full bg-primary' />
				<p className='mx-auto max-w-2xl text-muted-foreground'>
					Have a project in mind or want to collaborate? Feel free to reach out!
				</p>
			</div>

			<div className='grid gap-8 lg:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Contact Information</CardTitle>
						<CardDescription>
							Feel free to reach out through any of these channels
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-6'>
						<div className='flex items-center gap-4'>
							<div className='rounded-full bg-primary/10 p-3'>
								<Mail className='h-6 w-6 text-primary' />
							</div>
							<div>
								<p className='font-medium'>Email</p>
								<a
									href='mailto:contact@imrlopez.dev'
									className='text-muted-foreground transition-colors hover:text-primary'
								>
									contact@imrlopez.dev
								</a>
							</div>
						</div>

						<div className='flex items-center gap-4'>
							<div className='rounded-full bg-primary/10 p-3'>
								<Phone className='h-6 w-6 text-primary' />
							</div>
							<div>
								<p className='font-medium'>Phone</p>
								<a
									href='tel:+18492679236'
									className='text-muted-foreground transition-colors hover:text-primary'
								>
									+1 849 267 9236
								</a>
							</div>
						</div>

						<div className='flex items-center gap-4'>
							<div className='rounded-full bg-primary/10 p-3'>
								<MapPin className='h-6 w-6 text-primary' />
							</div>
							<div>
								<p className='font-medium'>Location</p>
								<p className='text-muted-foreground'>
									Santo Domingo, Dominican Republic
								</p>
							</div>
						</div>

						<div className='pt-4'>
							<p className='mb-3 font-medium'>Social Profiles</p>
							<div className='flex gap-4'>
								<a
									href='https://github.com/ImRLopezAG'
									target='_blank'
									rel='noopener noreferrer'
									className='rounded-full bg-muted p-3 transition-colors hover:bg-primary/20'
								>
									<Github className='h-5 w-5' />
									<span className='sr-only'>GitHub</span>
								</a>
								<a
									href='https://www.linkedin.com/in/angel-gabriel-lopez/'
									target='_blank'
									rel='noopener noreferrer'
									className='rounded-full bg-muted p-3 transition-colors hover:bg-primary/20'
								>
									<Linkedin className='h-5 w-5' />
									<span className='sr-only'>LinkedIn</span>
								</a>
							</div>
						</div>
					</CardContent>
				</Card>
				<ContactForm />
			</div>
		</AnimatedSection>
	)
}
