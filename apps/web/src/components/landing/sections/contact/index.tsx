import { LandingSection } from '@landing/section'
import { strapi } from '@services/strapi.service'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@ui/card'
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { ContactForm } from './form'
export async function ContactSection() {
	const { basics } = await strapi.profile()
	return (
		<LandingSection
			id='contact'
			title='Get In Touch'
			desc='Have a project in mind or want to collaborate? Feel free to reach out!'
		>
			<div className='grid gap-8 lg:grid-cols-2'>
				<Card className='translucent'>
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
									href={`mailto:${basics.email}`}
									className='text-muted-foreground transition-colors hover:text-primary'
								>
									{basics.email}
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
									href={`tel:${basics.phone}`}
									className='text-muted-foreground transition-colors hover:text-primary'
								>
									{basics.phone}
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
									{basics.location.city}, {basics.location.region}
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
		</LandingSection>
	)
}
