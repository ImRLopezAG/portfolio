import { LandingSection } from '@landing/section'
import { strapi } from '@services/strapi.service'
import { Github, Linkedin } from '@ui/brand-icons'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@ui/card'
import { Mail, MapPin, Phone } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { ContactForm } from './form'
export async function ContactSection() {
	const t = await getTranslations('contact')
	const { basics } = strapi.profile(await getLocale())
	return (
		<LandingSection id='contact' title={t('title')} desc={t('desc')}>
			<div className='grid gap-8 lg:grid-cols-2'>
				<Card className='translucent'>
					<CardHeader>
						<CardTitle>{t('info')}</CardTitle>
						<CardDescription>{t('infoDesc')}</CardDescription>
					</CardHeader>
					<CardContent className='space-y-6'>
						<div className='flex items-center gap-4'>
							<div className='rounded-full bg-primary/10 p-3'>
								<Mail className='h-6 w-6 text-primary' />
							</div>
							<div>
								<p className='font-medium'>{t('email')}</p>
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
								<p className='font-medium'>{t('phone')}</p>
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
								<p className='font-medium'>{t('location')}</p>
								<p className='text-muted-foreground'>
									{basics.location.city}, {basics.location.region}
								</p>
							</div>
						</div>

						<div className='pt-4'>
							<p className='mb-3 font-medium'>{t('social')}</p>
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
