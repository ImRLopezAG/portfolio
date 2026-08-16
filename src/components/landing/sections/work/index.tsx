import { LandingSection } from '@landing/section'
import { strapi } from '@services/strapi.service'
import { icons, Layers } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { Work } from './card'

const getIcon = (iconName: keyof typeof icons | undefined) => {
	const name = iconName || 'Layers'
	return name in icons ? icons[name as keyof typeof icons] : Layers
}

export async function WorkSection() {
	const t = await getTranslations('work')
	const { projects } = strapi.profile(await getLocale())
	return (
		<LandingSection id='projects' title={t('title')}>
			<div className='grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6'>
				{projects.map((project) => (
					<Work
						key={project.id}
						icon={getIcon(project.icon)}
						project={project}
					/>
				))}
			</div>
		</LandingSection>
	)
}
