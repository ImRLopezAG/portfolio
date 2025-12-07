import { LandingSection } from '@landing/section'
import { strapi } from '@services/strapi.service'
import { Briefcase, GraduationCap } from 'lucide-react'
import { ExperienceCard } from './card'
export async function ExperienceSection() {
	const { work, education } = await strapi.profile()
	return (
		<LandingSection id='experience' title='Experience & Education'>
			<div className='grid gap-8 lg:grid-cols-2'>
				<div className='space-y-6'>
					<div className='flex items-center gap-2'>
						<Briefcase className='h-6 w-6 text-primary' />
						<h3 className='font-bold text-2xl'>Work Experience</h3>
					</div>

					<div className='space-y-6'>
						{work.map((experience) => (
							<ExperienceCard
								key={experience.id}
								title={experience.position}
								company={experience.name}
								startDate={experience.startedDate}
								endDate={experience.endDate || undefined}
								description={experience.summary}
								responsibilities={experience.highlights}
							/>
						))}
					</div>
				</div>

				<div className='space-y-6'>
					<div className='flex items-center gap-2'>
						<GraduationCap className='h-6 w-6 text-primary' />
						<h3 className='font-bold text-2xl'>Education</h3>
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
