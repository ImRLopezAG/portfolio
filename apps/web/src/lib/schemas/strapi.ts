import { env } from '@lib/env'
import { format, parseISO } from 'date-fns'
import { nanoid } from 'nanoid'
import { z } from 'zod'

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
	{ from: string; icon: string; iconHover: string }
>([
	[
		'slate',
		{
			from: 'from-slate-900/20',
			icon: 'text-slate-700',
			iconHover: 'group-hover:text-slate-500',
		},
	],
	[
		'gray',
		{
			from: 'from-gray-900/20',
			icon: 'text-gray-700',
			iconHover: 'group-hover:text-gray-500',
		},
	],
	[
		'zinc',
		{
			from: 'from-zinc-900/20',
			icon: 'text-zinc-700',
			iconHover: 'group-hover:text-zinc-500',
		},
	],
	[
		'neutral',
		{
			from: 'from-neutral-900/20',
			icon: 'text-neutral-700',
			iconHover: 'group-hover:text-neutral-500',
		},
	],
	[
		'stone',
		{
			from: 'from-stone-900/20',
			icon: 'text-stone-700',
			iconHover: 'group-hover:text-stone-500',
		},
	],
	[
		'red',
		{
			from: 'from-red-900/20',
			icon: 'text-red-700',
			iconHover: 'group-hover:text-red-500',
		},
	],
	[
		'orange',
		{
			from: 'from-orange-900/20',
			icon: 'text-orange-700',
			iconHover: 'group-hover:text-orange-500',
		},
	],
	[
		'amber',
		{
			from: 'from-amber-900/20',
			icon: 'text-amber-700',
			iconHover: 'group-hover:text-amber-500',
		},
	],
	[
		'yellow',
		{
			from: 'from-yellow-900/20',
			icon: 'text-yellow-700',
			iconHover: 'group-hover:text-yellow-500',
		},
	],
	[
		'lime',
		{
			from: 'from-lime-900/20',
			icon: 'text-lime-700',
			iconHover: 'group-hover:text-lime-500',
		},
	],
	[
		'green',
		{
			from: 'from-green-900/20',
			icon: 'text-green-700',
			iconHover: 'group-hover:text-green-500',
		},
	],
	[
		'emerald',
		{
			from: 'from-emerald-900/20',
			icon: 'text-emerald-700',
			iconHover: 'group-hover:text-emerald-500',
		},
	],
	[
		'teal',
		{
			from: 'from-teal-900/20',
			icon: 'text-teal-700',
			iconHover: 'group-hover:text-teal-500',
		},
	],
	[
		'cyan',
		{
			from: 'from-cyan-900/20',
			icon: 'text-cyan-700',
			iconHover: 'group-hover:text-cyan-500',
		},
	],
	[
		'sky',
		{
			from: 'from-sky-900/20',
			icon: 'text-sky-700',
			iconHover: 'group-hover:text-sky-500',
		},
	],
	[
		'blue',
		{
			from: 'from-blue-900/20',
			icon: 'text-blue-700',
			iconHover: 'group-hover:text-blue-500',
		},
	],
	[
		'indigo',
		{
			from: 'from-indigo-900/20',
			icon: 'text-indigo-700',
			iconHover: 'group-hover:text-indigo-500',
		},
	],
	[
		'violet',
		{
			from: 'from-violet-900/20',
			icon: 'text-violet-700',
			iconHover: 'group-hover:text-violet-500',
		},
	],
	[
		'purple',
		{
			from: 'from-purple-900/20',
			icon: 'text-purple-700',
			iconHover: 'group-hover:text-purple-500',
		},
	],
	[
		'fuchsia',
		{
			from: 'from-fuchsia-900/20',
			icon: 'text-fuchsia-700',
			iconHover: 'group-hover:text-fuchsia-500',
		},
	],
	[
		'pink',
		{
			from: 'from-pink-900/20',
			icon: 'text-pink-700',
			iconHover: 'group-hover:text-pink-500',
		},
	],
	[
		'rose',
		{
			from: 'from-rose-900/20',
			icon: 'text-rose-700',
			iconHover: 'group-hover:text-rose-500',
		},
	],
] as const)
const richBlock = z.array(
	z
		.object({
			type: z.literal('paragraph'),
			children: z.array(
				z.object({
					type: z.literal('text'),
					text: z.string(),
				}),
			),
		})
		.transform(({ children }) => {
			if (!children.length) return { id: nanoid(), text: '' }
			const text = children.map((child) => child.text).join('')
			return { id: nanoid(), text }
		}),
)
const strapiImage = z
	.object({
		url: z.string(),
		caption: z.string().nullish().optional(),
	})
	.transform((data) => {
		return {
			...data,
			url: data.url.startsWith('http')
				? data.url
				: `${env.STRAPI_URL}${data.url}`,
		}
	})

	const skills = z.array(
		z.object({
			id: z.number(),
			name: z.string(),
			logo: z.string().nullish().optional(),
			color: z
				.string()
				.regex(
					/^bg-[a-zA-Z]+(?:-[a-zA-Z]+)*-(100|200|300|400|500|600|700|800|900)$/,
				)
				.transform((val) => (val === 'bg-none-400' ? 'bg-black' : val)),
		}),
	)
export const profile = z.object({
	basics: z.object({
		name: z.string(),
		label: z.string(),
		email: z.email(),
		phone: z.string().nullish().optional(),
		url: z.url(),
		image: strapiImage,
		summary: richBlock,
		location: z.object({
			address: z.string().nullish().optional(),
			postalCode: z.string().nullish().optional(),
			city: z.string().nullish().optional(),
			countryCode: z.string().nullish().optional(),
			region: z.string().nullish().optional(),
		}),
		profiles: z.array(
			z.object({
				network: z.string(),
				username: z.string(),
				url: z.url(),
			}),
		),
	}),
	work: z.array(
		z.object({
			id: z.number(),
			name: z.string(),
			position: z.string(),
			url: z.url().nullish().optional(),
			startedDate: z.string(),
			endDate: z.string().nullish(),
			summary: richBlock,
			highlights: richBlock,
		}),
	),
	education: z.array(
		z.object({
			id: z.number(),
			institution: z.string(),
			url: z.url().nullish().optional(),
			area: z.string(),
			studyType: z.string(),
			scoreType: z.string(),
			startDate: z.string(),
			endDate: z.string().nullish().optional(),
			score: z.string(),
			courses: richBlock,
		}),
	),
	skills: skills,
	languages: z.array(
		z.object({
			id: z.number(),
			language: z.string(),
			fluency: z.string(),
		}),
	),
	projects: z.array(
		z
			.object({
				id: z.number(),
				name: z.string(),
				url: z.url().nullish().optional(),
				github: z.url().nullish().optional(),
				state: z.enum(PROJECT_STATUS).nullish().optional(),
				color: z.enum(PROJECT_COLOR).nullish().optional(),
				desc: z.string().nullish().optional(),
				techStack: skills.nullish().optional(),
			})
			.transform((data) => {
				return {
					...data,
					styles: COLOR_STYLES.get(data.color || 'blue'),
				}
			}),
	),
})

export const blogPost = z.object({
	id: z.number(),
	content: z.string(),
	metadata: z
		.object({
			slug: z.string(),
			title: z.string(),
			desc: z.string().nullish().optional(),
			category: z.string(),
			posting: z.string(),
			tags: z
				.array(
					z.object({
						type: z.string(),
						children: z.array(
							z.object({
								type: z.literal('text'),
								text: z.string(),
							}),
						),
					}),
				)
				.optional(),
			image: strapiImage.optional(),
		})
		.transform((data) => {
			return {
				...data,
				posting: format(parseISO(data.posting), 'LLLL d, yyyy'),
			}
		}),
})
