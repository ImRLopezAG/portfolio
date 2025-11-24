import { ContactSection } from '@landing/sections/contact'
import { ExperienceSection } from '@landing/sections/experience'
import { HeroSection } from '@landing/sections/hero'
import { TechStack } from '@landing/sections/tech-stack'
import { WorkSection } from '@landing/sections/work'

export default async function Home() {
	return (
		<section className='container z-10 mx-auto px-4'>
			<HeroSection />
			<ExperienceSection />
			<WorkSection />
			<TechStack />
			<ContactSection />
		</section>
	)
}
