import { LandingSection } from '@landing/section'
import { cn } from '@lib/utils'
import { strapi } from '@services/strapi.service'
import { getLocale, getTranslations } from 'next-intl/server'
import { Tech } from './tech'
export async function TechStack() {
	const t = await getTranslations('techStack')
	const { skills } = strapi.profile(await getLocale())

	return (
		<LandingSection id='skills' title={t('title')}>
			<div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
				{skills.map((tech) => {
					return (
						<div
							key={tech.name}
							className={cn(
								'translucent flex items-center gap-3 rounded-lg border p-4',
								tech.color,
							)}
						>
							<Tech name={tech.logo || tech.name} invert={tech.invert} />
							<span className='font-medium text-sm'>
								{tech.name.toUpperCase()}
							</span>
						</div>
					)
				})}
			</div>
		</LandingSection>
	)
}
