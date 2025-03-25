import { Card, CardContent } from '@/components/ui/card'
import { basics } from '@shared/cv'
import { Mail, MapPin, Phone } from 'lucide-react'
import { AnimatedSection } from './section'
export async function About() {
	return (
		<AnimatedSection id='about'>
			<div className='space-y-4 text-center'>
				<h2 className='font-bold text-3xl tracking-tight sm:text-4xl'>
					About Me
				</h2>
				<div className='mx-auto h-1 w-20 rounded-full bg-primary' />
			</div>

			<div className='grid gap-8 lg:grid-cols-2'>
				<Card className='overflow-hidden'>
					<CardContent className='p-6'>
						<div className='space-y-4'>
							<h3 className='font-bold text-2xl'>Who I Am</h3>
							{basics.summary.map((summary, index) => (
								<p key={index} className='text-muted-foreground'>
									{summary}
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
											Santo Domingo, Dominican Republic
										</p>
									</div>
								</div>
								<div className='flex items-center gap-3'>
									<Mail className='h-5 w-5 text-primary' />
									<div>
										<p className='font-medium'>Email</p>
										<p className='text-muted-foreground text-sm'>
											contact@imrlopez.dev
										</p>
									</div>
								</div>
								<div className='flex items-center gap-3'>
									<Phone className='h-5 w-5 text-primary' />
									<div>
										<p className='font-medium'>Phone</p>
										<p className='text-muted-foreground text-sm'>
											+1 8492679236
										</p>
									</div>
								</div>
							</div>

							<div className='space-y-2'>
								<h4 className='font-medium'>Languages</h4>
								<div className='grid gap-2'>
									<div className='flex items-center justify-between'>
										<span>Spanish</span>
										<span className='text-muted-foreground text-sm'>
											Native
										</span>
									</div>
									<div className='h-2 w-full rounded-full bg-muted'>
										<div className='h-2 w-full rounded-full bg-primary' />
									</div>

									<div className='flex items-center justify-between'>
										<span>English</span>
										<span className='text-muted-foreground text-sm'>
											Advanced
										</span>
									</div>
									<div className='h-2 w-full rounded-full bg-muted'>
										<div className='h-2 w-4/5 rounded-full bg-primary' />
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</AnimatedSection>
	)
}
