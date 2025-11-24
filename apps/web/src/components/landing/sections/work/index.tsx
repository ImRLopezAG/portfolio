import { LandingSection } from '@landing/section'
import { strapi } from '@services/strapi.service'
import { Layers } from 'lucide-react'
import { Work } from './card'
export async function WorkSection() {
	const { projects } = await strapi.profile()
	return (
		<LandingSection id='projects' title='Work'>
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{projects.map((project) => (
					<Work key={project.id} icon={Layers} project={project} />
				))}
			</div>
		</LandingSection>
	)
}
