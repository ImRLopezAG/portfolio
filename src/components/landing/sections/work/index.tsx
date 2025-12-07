import { LandingSection } from '@landing/section'
import { strapi } from '@services/strapi.service'
import { Layers, icons } from 'lucide-react'
import { Work } from './card'

const getIcon = (iconName: keyof typeof icons | undefined) => {
	const name = iconName || 'Layers'
	return name in icons ? icons[name as keyof typeof icons] : Layers
}

export function WorkSection() {
	const { projects } = strapi.profile()
	return (
		<LandingSection id='projects' title='Work'>
			<div className='grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6'>
				{projects.map((project) => (
					<Work key={project.id} icon={getIcon(project.icon)} project={project} />
				))}
			</div>
		</LandingSection>
	)
}
