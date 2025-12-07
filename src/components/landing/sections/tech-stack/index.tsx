import { LandingSection } from '@landing/section'
import { strapi } from '@services/strapi.service'
import { Tech } from './tech'
import { cn } from '@lib/utils' 
export async function TechStack() {
	const { skills } = await strapi.profile()

	return (
		<LandingSection id='skills' title='Tech Stack'>
			<div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
				{skills.map((tech) => {
					return (
						<div
							key={tech.name}
							className={cn('translucent flex items-center gap-3 rounded-lg border p-4', tech.color)}
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
