import { nestedToFlat } from '@json-render/core'
import { parseDay } from '@lib/date'
import { strapi } from '@services/strapi.service'
import type { Locale } from '@/i18n/config'

/**
 * Builds the @json-render/react-pdf document spec for the resume from the same
 * profile data the site renders, so the PDF can never drift from the page.
 */

const INK = '#000000'
const MUTED = '#000000'
const RULE = '#000000'
const LINK = '#0000ee'

const skillNames: Record<string, string> = {
	tailwind: 'Tailwind CSS',
	react: 'React',
	node: 'Node.js',
	typescript: 'TypeScript',
	'nest.js': 'NestJS',
	'next.js': 'Next.js',
	nextjs: 'Next.js',
	aws: 'AWS',
	'mongo db': 'MongoDB',
	graphql: 'GraphQL',
	'c-sharp': 'C#',
	redis: 'Redis',
	expo: 'Expo',
	docker: 'Docker',
	cypress: 'Cypress',
	postgresql: 'PostgreSQL',
	'socket.io': 'Socket.IO',
	hono: 'Hono',
	sqlite: 'SQLite',
	upstash: 'Upstash',
	'shadcn-ui': 'shadcn/ui',
	convex: 'Convex',
	tanstack: 'TanStack',
	workos: 'WorkOS',
	'ai sdk': 'AI SDK',
	vercel: 'Vercel',
	twilio: 'Twilio',
	xai: 'xAI',
	openai: 'OpenAI',
	tailwindcss: 'Tailwind CSS',
	'better-auth': 'Better Auth',
	cloudflare: 'Cloudflare',
}

const skillName = (name: string) => skillNames[name] ?? name

type Node = {
	[key: string]: unknown
	type: string
	props?: Record<string, unknown>
	children?: Node[]
}

const labels = {
	en: {
		resume: 'Resume',
		experience: 'PROFESSIONAL EXPERIENCE',
		education: 'EDUCATION',
		skills: 'ADDITIONAL SKILLS',
		projects: 'PROJECTS',
		technologies: 'Technologies',
		present: 'Present',
		states: { WIP: 'In progress', INACTIVE: 'Inactive', PRACTICE: 'Practice' },
	},
	es: {
		resume: 'Currículum',
		experience: 'EXPERIENCIA PROFESIONAL',
		education: 'EDUCACIÓN',
		skills: 'SKILLS ADICIONALES',
		projects: 'PROYECTOS',
		technologies: 'Tecnologías',
		present: 'Actualidad',
		states: {
			WIP: 'En desarrollo',
			INACTIVE: 'Inactivo',
			PRACTICE: 'Práctica',
		},
	},
} as const

function dateRange(start: string, end: string | null, locale: Locale) {
	const formatter = new Intl.DateTimeFormat(locale, {
		month: 'short',
		year: 'numeric',
	})
	return `${formatter.format(parseDay(start))} - ${end ? formatter.format(parseDay(end)) : labels[locale].present}`
}

function location(value: string | undefined, locale: Locale) {
	value = value?.replace(
		'Santo Domingo, Distrito Nacional, ',
		'Santo Domingo, ',
	)
	return locale === 'es'
		? value
				?.replace('Dominican Republic', 'República Dominicana')
				.replace('United States', 'Estados Unidos')
		: value
}

const text = (value: string, props: Record<string, unknown> = {}): Node => ({
	type: 'ResumeText',
	props: { text: value, color: INK, fontSize: 11, ...props },
})

/** A real, clickable hyperlink in the PDF. */
const link = (
	value: string,
	href: string,
	fontSize = 11,
	color = LINK,
): Node => ({
	type: 'ResumeLink',
	props: { text: value, href, color, fontSize },
})

/** Section title with the full-width rule under it. */
const sectionHeading = (title: string): Node[] => [
	{ type: 'ResumeSection', props: { title } },
]

/** "Company                         Location" — bold, pushed to the edges. */
const titleRow = (left: string, right?: string): Node => ({
	type: 'ResumeRow',
	props: { justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
	children: [
		text(left, { fontWeight: 'bold' }),
		right ? text(right, { fontWeight: 'bold', align: 'right' }) : text(''),
	],
})

/** "Position                              Oct 2023 – Apr 2025" — italic. */
const subtitleRow = (left: string, right?: string): Node => ({
	type: 'ResumeRow',
	props: { justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
	children: [
		text(left),
		right ? text(right, { fontStyle: 'italic', align: 'right' }) : text(''),
	],
})

function buildDocument(locale: Locale): Node {
	const t = labels[locale]
	const { basics, work, education, skills, languages, projects } =
		strapi.profile(locale)

	const linkedin = basics.profiles.find(
		(p) => p.network.toLowerCase() === 'linkedin',
	)

	const strip = (u: string) =>
		u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

	// Contact URLs remain clickable in the PDF.
	const contacts: Node[] = []
	if (basics.location.region) contacts.push(text(basics.location.region))
	if (linkedin) contacts.push(link(strip(linkedin.url), linkedin.url))
	if (basics.phone) contacts.push(text(basics.phone))
	contacts.push(link(basics.email, `mailto:${basics.email}`, 11, INK))

	const contactRow: Node = {
		type: 'Row',
		props: {
			justifyContent: 'center',
			alignItems: 'center',
			gap: 3,
			wrap: true,
		},
		children: contacts.flatMap((node, index) =>
			index === 0 ? [node] : [text('·'), node],
		),
	}

	const languageLine = languages
		.map((language) => {
			const name =
				locale === 'es'
					? ({ English: 'Inglés', Spanish: 'Español' }[language.language] ??
						language.language)
					: language.language
			const fluency =
				language.fluency === 'ADVANCE'
					? 'advanced'
					: language.fluency.toLowerCase()
			return `${name} (${fluency})`
		})
		.join(' · ')
	const additionalSkills: Node = {
		type: 'ResumeList',
		props: {
			items: [
				skills.map((skill) => skillName(skill.name)).join(', '),
				languageLine,
			],
			fontSize: 11,
		},
	}

	const projectEntries = projects.flatMap((project) => {
		const label =
			project.state && project.state !== 'ACTIVE'
				? `${project.name} (${Object.entries(t.states).find(([state]) => state === project.state)?.[1] ?? project.state})`
				: project.name

		return [
			{
				type: 'ResumeEntry',
				children: [
					text(label, { fontWeight: 'bold' }),
					project.desc
						? text(project.desc, {
								fontSize: 11,
								color: MUTED,
								lineHeight: 1.25,
							})
						: { type: 'Spacer', props: { height: 0 } },
					project.techStack?.length
						? text(
								`${t.technologies}: ${project.techStack.map((t) => skillName(t.name)).join(', ')}`,
								{ fontSize: 11, color: MUTED },
							)
						: { type: 'Spacer', props: { height: 0 } },
					{ type: 'Spacer', props: { height: 8 } },
				],
			},
		]
	})

	const experience = work.flatMap((company) => [
		{
			type: 'ResumeEntry',
			children: [
				titleRow(company.company, location(company.location, locale)),
				...company.positions.flatMap((position) => [
					subtitleRow(
						position.title,
						dateRange(position.startedDate, position.endDate, locale),
					),
					position.highlights.length > 0
						? {
								type: 'ResumeList',
								props: {
									items: position.highlights.map((h) => h.text),
									fontSize: 11,
									color: MUTED,
									spacing: 2,
								},
							}
						: { type: 'Spacer', props: { height: 0 } },
				]),
				{ type: 'Spacer', props: { height: 16 } },
			],
		},
	])

	const studies = education.flatMap((edu) => [
		{
			type: 'ResumeEntry',
			children: [
				titleRow(edu.institution, location(edu.location, locale)),
				subtitleRow(
					`${edu.area}${edu.studyType ? ` - ${edu.studyType}` : ''}`,
					dateRange(edu.startDate, edu.endDate, locale),
				),
				{ type: 'Spacer', props: { height: 8 } },
			],
		},
	])

	return {
		type: 'Document',
		props: {
			title: `${basics.name} - ${t.resume}`,
			author: basics.name,
			subject: basics.label,
		},
		children: [
			{
				type: 'ResumePage',
				props: {
					size: 'LETTER',
					marginTop: 49,
					marginBottom: 34,
					marginLeft: 33.6,
					marginRight: 21.9,
					backgroundColor: '#ffffff',
				},
				children: [
					{
						type: 'ResumeHeading',
						props: {
							text: basics.name,
							level: 'h1',
							align: 'center',
							color: INK,
						},
					},
					contactRow,
					{
						type: 'Divider',
						props: { color: RULE, thickness: 1, marginTop: 6, marginBottom: 0 },
					},
					{ type: 'Spacer', props: { height: 5.125 } },

					// Summary, italic, matching the reference layout.
					text(basics.summary.map((s) => s.text).join(' '), {
						fontStyle: 'italic',
						fontSize: 10.5,
						lineHeight: 1.4375,
					}),

					...sectionHeading(t.experience),
					...experience,

					...sectionHeading(t.education),
					...studies,

					...sectionHeading(t.skills),
					additionalSkills,

					...sectionHeading(t.projects),
					link(strip(basics.url), basics.url),
					{ type: 'Spacer', props: { height: 6 } },
					...projectEntries,
				],
			},
		],
	}
}

/**
 * json-render consumes a *flat* `{ root, elements }` spec; `nestedToFlat` keys
 * the tree above into that shape.
 */
export function buildResumeSpec(locale: Locale) {
	return nestedToFlat(buildDocument(locale))
}
