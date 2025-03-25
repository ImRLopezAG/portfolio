import type * as schema from '@server/schemas'
import type {
	basics,
	education,
	interests,
	languages,
	projects,
	skills,
	volunteer,
	work,
} from '@shared/cv'
import type { NextMiddleware } from 'next/server'
import type { z } from 'zod'
declare global {
	interface Props {
		children?: React.ReactNode
		className?: string
	}
	interface ParamsProps {
		searchParams: Promise<Record<string, string>>
		params: Promise<Record<string, string>>
	}

	type BlogMetadata = z.infer<typeof schema.metadataSchema>
	type Email = z.infer<typeof schema.emailSchema>
	type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware

	type CVBasics = typeof basics
	type CVEducation = (typeof education)[number]
	type CVInterests = (typeof interests)[number]
	type CVLanguages = (typeof languages)[number]
	type CVProjects = (typeof projects)[number]
	type CVSkills = (typeof skills)[number]
	type CVVolunteer = typeof volunteer
	type CVWork = (typeof work)[number]
}
