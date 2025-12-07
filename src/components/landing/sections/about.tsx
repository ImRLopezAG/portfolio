import { LandingSection } from '@landing/section'
import { strapi } from '@services/strapi.service'
import { Card, CardContent } from '@ui/card'
import { Mail, MapPin, Phone } from 'lucide-react'
export async function AboutSection() {
	const { basics, languages } = await strapi.profile()
	return (
		<LandingSection id='about' title='About Me'>
			<div className='grid gap-8 lg:grid-cols-2'>
				<Card className='overflow-hidden'>
					<CardContent className='p-6'>
						<div className='space-y-4'>
							<h3 className='font-bold text-2xl'>Who I Am</h3>
							{basics.summary.map(({ text, id }) => (
								<p
									key={id}
									className='max-w-prose text-lg text-muted-foreground'
								>
									{text}
								</p>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className='p-6'>
						<div className='space-y-6'>
							<h3 className='font-bold text-2xl'>Personal Info</h3>
							<div className='grid gap-4'>
								<div className='flex items-center gap-3'>
									<MapPin className='h-5 w-5 text-primary' />
									<div>
										<p className='font-medium'>Location</p>
										<p className='text-muted-foreground text-sm'>
											{basics.location.city}, {basics.location.region}
										</p>
									</div>
								</div>
								<div className='flex items-center gap-3'>
									<Mail className='h-5 w-5 text-primary' />
									<div>
										<p className='font-medium'>Email</p>
										<p className='text-muted-foreground text-sm'>
											{basics.email}
										</p>
									</div>
								</div>
								<div className='flex items-center gap-3'>
									<Phone className='h-5 w-5 text-primary' />
									<div>
										<p className='font-medium'>Phone</p>
										<p className='text-muted-foreground text-sm'>
											{basics.phone}
										</p>
									</div>
								</div>
							</div>

							<div className='space-y-2'>
								<h4 className='font-medium'>Languages</h4>
								<div className='grid gap-2'>
									{languages.map((lang) => (
										<div key={lang.id} className='flex justify-between'>
											<span>{lang.language}</span>
											<span className='text-muted-foreground text-sm'>
												{lang.fluency}
											</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</LandingSection>
	)
}
