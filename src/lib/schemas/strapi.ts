import type { icons } from 'lucide-react'
import { z } from 'zod'

const autoId = (prefix: string) => `#${prefix}-${performance.now()}`

// Define allowed icons explicitly for type safety and autocomplete
const PROJECT_ICONS = [
	'Brain',
	'ServerCog',
	'Link',
	'Image',
	'Code',
	'Database',
	'Globe',
	'Layers',
	'Terminal',
	'Zap',
	'Rocket',
	'Package',
	'FileCode',
	'GitBranch',
	'Cloud',
	'Shield',
	'Lock',
	'Key',
	'Settings',
	'Cpu',
	'AudioLines',
	'PhoneCall',
] as const satisfies readonly (keyof typeof icons)[]

const PROJECT_COLOR = [
	'black',
	'white',
	'slate',
	'gray',
	'zinc',
	'neutral',
	'stone',
	'red',
	'orange',
	'amber',
	'yellow',
	'lime',
	'green',
	'emerald',
	'teal',
	'cyan',
	'sky',
	'blue',
	'indigo',
	'violet',
	'purple',
	'fuchsia',
	'pink',
	'rose',
] as const

const PROJECT_STATUS = ['ACTIVE', 'INACTIVE', 'WIP', 'PRACTICE'] as const

const COLOR_STYLES = new Map<
	(typeof PROJECT_COLOR)[number],
	{ from: string; icon: string; iconHover: string; card: string }
>([
	[
		'slate',
		{
			from: 'from-slate-900/30',
			icon: 'text-slate-700',
			iconHover: 'group-hover:text-slate-500',
			card: 'hover:border-slate-500/30 border-slate/10',
		},
	],
	[
		'gray',
		{
			from: 'from-gray-900/30',
			icon: 'text-gray-700',
			iconHover: 'group-hover:text-gray-500',
			card: 'hover:border-gray-500/30 border-gray/10',
		},
	],
	[
		'zinc',
		{
			from: 'from-zinc-900/30',
			icon: 'text-zinc-700',
			iconHover: 'group-hover:text-zinc-500',
			card: 'hover:border-zinc-500/30 border-zinc/10',
		},
	],
	[
		'neutral',
		{
			from: 'from-neutral-900/30',
			icon: 'text-neutral-700',
			iconHover: 'group-hover:text-neutral-500',
			card: 'hover:border-neutral-500/30 border-neutral/10',
		},
	],
	[
		'stone',
		{
			from: 'from-stone-900/30',
			icon: 'text-stone-700',
			iconHover: 'group-hover:text-stone-500',
			card: 'hover:border-stone-500/30 border-stone/10',
		},
	],
	[
		'red',
		{
			from: 'from-red-900/30',
			icon: 'text-red-700',
			iconHover: 'group-hover:text-red-500',
			card: 'hover:border-red-500/30 border-red/10',
		},
	],
	[
		'orange',
		{
			from: 'from-orange-900/30',
			icon: 'text-orange-700',
			iconHover: 'group-hover:text-orange-500',
			card: 'hover:border-orange-500/30 border-orange/10',
		},
	],
	[
		'amber',
		{
			from: 'from-amber-900/30',
			icon: 'text-amber-700',
			iconHover: 'group-hover:text-amber-500',
			card: 'hover:border-amber-500/30 border-amber/10',
		},
	],
	[
		'yellow',
		{
			from: 'from-yellow-900/30',
			icon: 'text-yellow-700',
			iconHover: 'group-hover:text-yellow-500',
			card: 'hover:border-yellow-500/30 border-yellow/10',
		},
	],
	[
		'lime',
		{
			from: 'from-lime-900/30',
			icon: 'text-lime-700',
			iconHover: 'group-hover:text-lime-500',
			card: 'hover:border-lime-500/30 border-lime/10',
		},
	],
	[
		'green',
		{
			from: 'from-green-900/30',
			icon: 'text-green-700',
			iconHover: 'group-hover:text-green-500',
			card: 'hover:border-green-500/30 border-green/10',
		},
	],
	[
		'emerald',
		{
			from: 'from-emerald-900/30',
			icon: 'text-emerald-700',
			iconHover: 'group-hover:text-emerald-500',
			card: 'hover:border-emerald-500/30 border-emerald/10',
		},
	],
	[
		'teal',
		{
			from: 'from-teal-900/30',
			icon: 'text-teal-700',
			iconHover: 'group-hover:text-teal-500',
			card: 'hover:border-teal-500/30	 border-teal/10',
		},
	],
	[
		'cyan',
		{
			from: 'from-cyan-900/30',
			icon: 'text-cyan-700',
			iconHover: 'group-hover:text-cyan-500',
			card: 'hover:border-cyan-500/30 border-cyan/10',
		},
	],
	[
		'sky',
		{
			from: 'from-sky-900/30',
			icon: 'text-sky-700',
			iconHover: 'group-hover:text-sky-500',
			card: 'hover:border-sky-500/30 border-sky/10',
		},
	],
	[
		'blue',
		{
			from: 'from-blue-900/30',
			icon: 'text-blue-700',
			iconHover: 'group-hover:text-blue-500',
			card: 'hover:border-blue-500/30 border-blue/10',
		},
	],
	[
		'indigo',
		{
			from: 'from-indigo-900/30',
			icon: 'text-indigo-700',
			iconHover: 'group-hover:text-indigo-500',
			card: 'hover:border-indigo-500/30 border-indigo/10',
		},
	],
	[
		'violet',
		{
			from: 'from-violet-900/30',
			icon: 'text-violet-700',
			iconHover: 'group-hover:text-violet-500',
			card: 'hover:border-violet-500/30 border-violet/10',
		},
	],
	[
		'purple',
		{
			from: 'from-purple-900/30',
			icon: 'text-purple-700',
			iconHover: 'group-hover:text-purple-500',
			card: 'hover:border-purple-500/30 border-purple/10',
		},
	],
	[
		'fuchsia',
		{
			from: 'from-fuchsia-900/30',
			icon: 'text-fuchsia-700',
			iconHover: 'group-hover:text-fuchsia-500',
			card: 'hover:border-fuchsia-500/30 border-fuchsia/10',
		},
	],
	[
		'pink',
		{
			from: 'from-pink-900/30',
			icon: 'text-pink-700',
			iconHover: 'group-hover:text-pink-500',
			card: 'hover:border-pink-500/30 border-pink/10',
		},
	],
	[
		'rose',
		{
			from: 'from-rose-900/30',
			icon: 'text-rose-700',
			iconHover: 'group-hover:text-rose-500',
			card: 'hover:border-rose-500/30 border-rose/10',
		},
	],
])

// Skill lookup map - just add new skills here and use them by name anywhere
// invert: true for black/white icons that need inversion on dark mode
type SkillEntry = {
	name: string
	color: string
	logo?: string
	invert?: boolean
	icon?: keyof typeof icons
}
const SKILL_MAP: Map<string, SkillEntry> = new Map([
	[
		'llm engineering',
		{
			name: 'LLM Engineering',
			color: 'hover:border-violet-500/30',
			icon: 'Brain',
		},
	],
	['rag', { name: 'RAG', color: 'hover:border-blue-500/30', icon: 'Search' }],
	[
		'ontology modeling',
		{
			name: 'Ontology Modeling',
			color: 'hover:border-cyan-500/30',
			icon: 'Network',
		},
	],
	[
		'ai agents',
		{ name: 'AI Agents', color: 'hover:border-violet-500/30', icon: 'Bot' },
	],
	[
		'voice ai',
		{ name: 'Voice AI', color: 'hover:border-rose-500/30', icon: 'AudioLines' },
	],
	[
		'forward deployed engineering',
		{
			name: 'Forward Deployed Engineering',
			color: 'hover:border-emerald-500/30',
			icon: 'Workflow',
		},
	],
	[
		'prompt engineering',
		{
			name: 'Prompt Engineering',
			color: 'hover:border-violet-500/30',
			icon: 'MessageSquare',
		},
	],
	[
		'embeddings & semantic search',
		{
			name: 'Embeddings & Semantic Search',
			color: 'hover:border-blue-500/30',
			icon: 'Database',
		},
	],
	[
		'llm evaluation',
		{
			name: 'LLM Evaluation',
			color: 'hover:border-amber-500/30',
			icon: 'ClipboardCheck',
		},
	],
	[
		'tailwind',
		{
			name: 'tailwind',
			color: 'hover:border-blue-500/30',
			logo: 'tailwindcss',
		},
	],
	[
		'react',
		{ name: 'react', color: 'hover:border-blue-500/30', logo: 'react_dark' },
	],
	[
		'node',
		{ name: 'node', color: 'hover:border-green-700/30', logo: 'nodejs' },
	],
	['typescript', { name: 'typescript', color: 'hover:border-blue-600/30' }],
	[
		'nestjs',
		{ name: 'nest.js', color: 'hover:border-red-400/30', logo: 'nestjs' },
	],
	[
		'nextjs',
		{
			name: 'next.js',
			color: 'hover:border-gray-500/30',
			logo: 'nextjs_icon_dark',
		},
	],
	[
		'aws',
		{ name: 'aws', color: 'hover:border-orange-500/30', logo: 'aws_dark' },
	],
	[
		'mongo db',
		{
			name: 'mongo db',
			color: 'hover:border-green-600/30',
			logo: 'mongodb-icon-dark',
		},
	],
	['graphql', { name: 'graphql', color: 'hover:border-pink-500/30' }],
	[
		'c-sharp',
		{ name: 'c-sharp', color: 'hover:border-purple-700/30', logo: 'csharp' },
	],
	['redis', { name: 'redis', color: 'hover:border-red-600/30' }],
	['expo', { name: 'expo', color: 'hover:border-gray-500/30', invert: true }],
	['docker', { name: 'docker', color: 'hover:border-blue-400/30' }],
	[
		'cypress',
		{ name: 'cypress', color: 'hover:border-green-500/30', invert: true },
	],
	['postgresql', { name: 'postgresql', color: 'hover:border-blue-500/30' }],
	[
		'socket.io',
		{
			name: 'socket.io',
			color: 'hover:border-gray-500/30',
			logo: 'socketio-icon-dark',
		},
	],
	['hono', { name: 'hono', color: 'hover:border-orange-500/30' }],
	['sqlite', { name: 'sqlite', color: 'hover:border-blue-400/30' }],
	['upstash', { name: 'upstash', color: 'hover:border-emerald-500/30' }],
	[
		'shadcn',
		{ name: 'shadcn-ui', color: 'hover:border-gray-500/30', invert: true },
	],
	['convex', { name: 'convex', color: 'hover:border-amber-500/30' }],
	['tanstack', { name: 'tanstack', color: 'hover:border-cyan-500/30' }],
	['workos', { name: 'workos', color: 'hover:border-indigo-500/30' }],
	[
		'ai sdk',
		{
			name: 'ai sdk',
			color: 'hover:border-gray-500/30',
			// svgl has no AI SDK mark; the Vercel triangle is the closest stand-in.
			logo: 'vercel_dark',
		},
	],
	[
		'vercel',
		{ name: 'vercel', color: 'hover:border-gray-500/30', logo: 'vercel_dark' },
	],
	['twilio', { name: 'twilio', color: 'hover:border-red-500/30' }],
	['xai', { name: 'xai', color: 'hover:border-zinc-500/30', logo: 'xai_dark' }],
	[
		'openai',
		{
			name: 'openai',
			color: 'hover:border-emerald-500/30',
			logo: 'openai_dark',
		},
	],
])

/**
 * A translatable string. A bare string stays as-is (English only); an
 * `{ en, es }` pair is collapsed to the active locale by `localize` after
 * parsing, so the schema itself stays locale-agnostic.
 */
export const i18nString = z.union([
	z.string(),
	z.object({ en: z.string(), es: z.string() }),
])

const textBlock = z.array(
	z
		.object({ text: i18nString })
		.transform(({ text }) => ({ id: autoId('TB'), text })),
)

const image = z.object({
	url: z.string(),
	caption: z.string().optional(),
})

// Skill input: can be just a string name or an object with overrides
const skillInput = z.union([
	z.string().transform((name) => {
		const found = SKILL_MAP.get(name.toLowerCase())
		return {
			id: autoId('SK'),
			name: found?.name ?? name,
			color: found?.color ?? 'border-blue-400 hover:border-blue-500/30',
			logo: found?.logo,
			icon: found?.icon,
			invert: found?.invert ?? false,
		}
	}),
	z
		.object({
			name: z.enum(Array.from(SKILL_MAP.keys())),
			color: z.string().optional(),
			logo: z.string().optional(),
			invert: z.boolean().optional(),
		})
		.transform((data) => {
			const found = SKILL_MAP.get(data.name.toLowerCase())
			return {
				id: autoId('SK'),
				name: data.name,
				color:
					data.color ??
					found?.color ??
					'border-blue-400 hover:border-blue-500/30',
				logo: data.logo ?? found?.logo,
				icon: found?.icon,
				invert: data.invert ?? found?.invert ?? false,
			}
		}),
])

const skillsArray = z.array(skillInput)

const EMPLOYMENT_TYPE = [
	'Full-time',
	'Part-time',
	'Contract',
	'Freelance',
	'Internship',
	'Self-employed',
] as const

const WORK_MODE = ['On-site', 'Hybrid', 'Remote'] as const

const workEntry = z
	.object({
		name: z.string(),
		position: i18nString,
		url: z.url().optional(),
		startedDate: z.string(),
		endDate: z.string().nullable(),
		// Company-level context. Read off the most recent position when grouped.
		employmentType: z.enum(EMPLOYMENT_TYPE).optional(),
		location: z.string().optional(),
		workMode: z.enum(WORK_MODE).optional(),
		logo: z.url().optional(),
		/** Shown collapsed, next to the role — free-form, unlike `skillsArray`. */
		skills: z.array(z.string()).default([]),
		summary: textBlock.default([]),
		highlights: textBlock.default([]),
	})
	.transform((data) => ({ ...data, id: autoId('WK') }))

type WorkEntry = z.infer<typeof workEntry>

export type Company = ReturnType<typeof groupByCompany>[number]
export type Position = Company['positions'][number]

/**
 * Collapses the flat JSON-Resume-style `work` list into one entry per company,
 * so multiple positions held at the same employer render as a single timeline
 * instead of repeating the company. Entries are matched on `name`
 * case-insensitively — spell it identically to group a promotion.
 */
function groupByCompany(entries: WorkEntry[]) {
	const companies = new Map<
		string,
		{ id: string; company: string; url?: string; positions: WorkEntry[] }
	>()

	for (const entry of entries) {
		const key = entry.name.toLowerCase()
		const existing = companies.get(key)
		if (existing) {
			// Keep the first non-empty url seen for the company.
			existing.url ??= entry.url
			existing.positions.push(entry)
			continue
		}
		companies.set(key, {
			id: autoId('CO'),
			company: entry.name,
			url: entry.url,
			positions: [entry],
		})
	}

	return Array.from(companies.values())
		.map(({ positions, ...company }) => {
			// Most recent position first — it heads the timeline.
			const ordered = [...positions]
				.sort((a, b) => b.startedDate.localeCompare(a.startedDate))
				.map(({ position, ...rest }) => ({ ...rest, title: position }))

			const startDate = ordered.reduce(
				(earliest, p) => (p.startedDate < earliest ? p.startedDate : earliest),
				ordered[0].startedDate,
			)
			// A single ongoing position keeps the whole company ongoing.
			const closed = ordered.flatMap((p) => (p.endDate ? [p.endDate] : []))
			const endDate =
				closed.length === ordered.length
					? closed.reduce((latest, end) => (end > latest ? end : latest))
					: null

			// Company-level context comes from the current/most recent position.
			const { employmentType, location, workMode, logo } = ordered[0]

			return {
				...company,
				positions: ordered,
				startDate,
				endDate,
				employmentType,
				location,
				workMode,
				logo,
			}
		})
		.sort((a, b) =>
			b.positions[0].startedDate.localeCompare(a.positions[0].startedDate),
		)
}

export const profile = z
	.object({
		basics: z.object({
			name: z.string(),
			label: i18nString,
			email: z.email(),
			phone: z.string().optional(),
			url: z.url(),
			image: image,
			summary: textBlock,
			location: z.object({
				address: z.string().optional(),
				postalCode: z.string().optional(),
				city: z.string().optional(),
				countryCode: z.string().optional(),
				region: z.string().optional(),
			}),
			profiles: z.array(
				z
					.object({
						network: z.string(),
						username: z.string(),
						url: z.url(),
					})
					.transform((data) => ({ ...data, id: autoId('PR') })),
			),
		}),
		work: z.array(workEntry),
		skills: skillsArray,
		education: z.array(
			z
				.object({
					institution: z.string(),
					url: z.url().optional(),
					location: z.string().optional(),
					area: i18nString,
					studyType: i18nString,
					scoreType: z.string(),
					startDate: z.string(),
					endDate: z.string().nullable(),
					score: z.string(),
					courses: textBlock,
				})
				.transform((data) => ({ ...data, id: autoId('ED') })),
		),
		languages: z.array(
			z
				.object({
					language: z.string(),
					fluency: i18nString,
				})
				.transform((data) => ({ ...data, id: autoId('LG') })),
		),
		projects: z.array(
			z
				.object({
					name: z.string(),
					url: z.url().optional(),
					github: z.url().optional(),
					state: z.enum(PROJECT_STATUS).optional(),
					color: z.enum(PROJECT_COLOR).optional(),
					desc: i18nString.optional(),
					techStack: skillsArray.optional(),
					icon: z.enum(PROJECT_ICONS).optional(),
				})
				.transform((data) => ({
					...data,
					id: autoId('PJ'),
					styles: COLOR_STYLES.get(data.color || 'blue'),
				})),
		),
	})
	.transform((data) => ({
		...data,
		id: autoId('PF'),
		work: groupByCompany(data.work),
	}))
