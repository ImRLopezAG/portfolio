import { LandingSection } from '@landing/section'
import { strapi } from '@services/strapi.service'
import { Briefcase, GraduationCap } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { ExperienceCard } from './card'
import { CompanyExperience } from './company'
export async function ExperienceSection() {
	const t = await getTranslations('experience')
	const { work, education } = strapi.profile(await getLocale())
	return (
		<LandingSection id='experience' title={t('title')}>
			<div className='grid gap-8 lg:grid-cols-2'>
				<div className='space-y-6'>
					<div className='flex items-center gap-2'>
						<Briefcase className='h-6 w-6 text-primary' />
						<h3 className='font-bold text-2xl'>{t('work')}</h3>
					</div>

					<div className='space-y-6'>
						{work.map((company) => (
							<CompanyExperience key={company.id} {...company} />
						))}
					</div>
				</div>

				<div className='space-y-6'>
					<div className='flex items-center gap-2'>
						<GraduationCap className='h-6 w-6 text-primary' />
						<h3 className='font-bold text-2xl'>{t('education')}</h3>
					</div>

					<div className='space-y-6'>
						{education.map((edu) => (
							<ExperienceCard
								key={edu.id}
								title={edu.area}
								company={edu.institution}
								startDate={edu.startDate}
								endDate={edu.endDate || undefined}
								responsibilities={edu.courses}
								isEducation
								type={edu.studyType}
								value={`${edu.scoreType}: ${edu.score}`}
							/>
						))}
					</div>
				</div>
			</div>
		</LandingSection>
	)
}
