import { ExperienceCard } from '@components/experience-card'
import { education, work } from '@shared/cv.json'
import { Briefcase, GraduationCap } from 'lucide-react'
import { AnimatedSection } from './section'
export async function Experience() {
	return (
		<AnimatedSection id='experience'>
			<div className='space-y-4 text-center'>
				<h2 className='font-bold text-3xl tracking-tight sm:text-4xl'>
					Experience & Education
				</h2>
				<div className='mx-auto h-1 w-20 rounded-full bg-primary' />
			</div>

			<div className='grid gap-8 lg:grid-cols-2'>
				<div className='space-y-6'>
					<div className='flex items-center gap-2'>
						<Briefcase className='h-6 w-6 text-primary' />
						<h3 className='font-bold text-2xl'>Work Experience</h3>
					</div>

					<div className='space-y-6'>
						{work.map((experience) => (
							<ExperienceCard
								key={experience.name}
								title={experience.position}
								company={experience.name}
								startDate={experience.startDate}
								endDate={experience.endDate}
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
								key={edu.area}
								title={edu.area}
								company={edu.institution}
								startDate={edu.startDate}
								endDate={edu.endDate}
								description={edu.studyType}
								responsibilities={edu.courses}
								isEducation
								type={edu.studyType}
								value={`${edu.scoreType}: ${edu.score}`}
							/>
						))}
					</div>
				</div>
			</div>
		</AnimatedSection>
	)
}
