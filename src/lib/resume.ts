import { nestedToFlat } from '@json-render/core'
import { formatMonthRange } from '@lib/date'
import { strapi } from '@services/strapi.service'
import type { Locale } from '@/i18n/config'

/**
 * Builds the @json-render/react-pdf document spec for the resume from the same
 * profile data the site renders, so the PDF can never drift from the page.
 */

const INK = '#111111'
const MUTED = '#333333'
const RULE = '#111111'
const LINK = '#1155cc'

type Node = { type: string; props?: Record<string, unknown>; children?: Node[] }

const text = (value: string, props: Record<string, unknown> = {}): Node => ({
	type: 'Text',
	props: { text: value, color: INK, fontSize: 10, ...props },
})

/** A real, clickable hyperlink in the PDF. */
const link = (value: string, href: string, fontSize = 9.5): Node => ({
	type: 'Link',
	props: { text: value, href, color: LINK, fontSize },
})

/** Section title with the full-width rule under it. */
const sectionHeading = (title: string): Node[] => [
	{ type: 'Spacer', props: { height: 10 } },
	text(title, { fontSize: 11.5, fontWeight: 'bold' }),
	{ type: 'Divider', props: { color: RULE, thickness: 1, marginTop: 2 } },
	{ type: 'Spacer', props: { height: 6 } },
]

/** "Company                         Location" — bold, pushed to the edges. */
const titleRow = (left: string, right?: string): Node => ({
	type: 'Row',
	props: { justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
	children: [
		text(left, { fontSize: 10.5, fontWeight: 'bold' }),
		right
			? text(right, { fontSize: 10.5, fontWeight: 'bold', align: 'right' })
			: text(''),
	],
})

/** "Position                              Oct 2023 – Apr 2025" — italic. */
const subtitleRow = (left: string, right?: string): Node => ({
	type: 'Row',
	props: { justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
	children: [
		text(left, { fontSize: 10 }),
		right
			? text(right, { fontSize: 10, fontStyle: 'italic', align: 'right' })
			: text(''),
	],
})

function buildDocument(locale: Locale): Node {
	const { basics, work, education, skills, languages, projects } =
		strapi.profile(locale)

	const linkedin = basics.profiles.find(
		(p) => p.network.toLowerCase() === 'linkedin',
	)

	const strip = (u: string) =>
		u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

	// Contact line: everything but the phone number is a live hyperlink.
	const contacts: Node[] = []
	if (linkedin) contacts.push(link(strip(linkedin.url), linkedin.url))
	if (basics.phone) contacts.push(text(basics.phone, { fontSize: 9.5 }))
	contacts.push(link(basics.email, `mailto:${basics.email}`))
	contacts.push(link(strip(basics.url), basics.url))

	const contactRow: Node = {
		type: 'Row',
		props: {
			justifyContent: 'center',
			alignItems: 'center',
			gap: 6,
			wrap: true,
		},
		children: contacts.flatMap((node, index) =>
			index === 0 ? [node] : [text('·', { fontSize: 9.5, color: MUTED }), node],
		),
	}

	// Skills read as a grid rather than one long run-on line.
	const SKILL_COLUMNS = 4
	const perColumn = Math.ceil(skills.length / SKILL_COLUMNS)
	const skillGrid: Node = {
		type: 'Row',
		props: { gap: 10, alignItems: 'flex-start' },
		children: Array.from({ length: SKILL_COLUMNS }, (_, column) => ({
			type: 'Column',
			props: { gap: 3, flex: 1 },
			children: skills
				.slice(column * perColumn, (column + 1) * perColumn)
				.map((s) =>
					text(
						s.name.replace(/\b\w/g, (c) => c.toUpperCase()),
						{
							fontSize: 9.5,
							color: MUTED,
						},
					),
				),
		})),
	}

	const projectEntries = projects.flatMap((project) => {
		const label =
			project.state && project.state !== 'ACTIVE'
				? `${project.name} (${project.state})`
				: project.name

		return [
			text(label, { fontSize: 10.5, fontWeight: 'bold' }),
			project.desc
				? text(project.desc, { fontSize: 10, color: MUTED, lineHeight: 1.4 })
				: { type: 'Spacer', props: { height: 0 } },
			project.techStack?.length
				? text(
						`Technologies: ${project.techStack.map((t) => t.name).join(', ')}`,
						{ fontSize: 9.5, color: MUTED },
					)
				: { type: 'Spacer', props: { height: 0 } },
			{ type: 'Spacer', props: { height: 8 } },
		]
	})

	const experience = work.flatMap((company) => [
		titleRow(company.company, company.location),
		...company.positions.flatMap((position) => [
			subtitleRow(
				position.title,
				formatMonthRange(position.startedDate, position.endDate),
			),
			position.highlights.length > 0
				? {
						type: 'List',
						props: {
							items: position.highlights.map((h) => h.text),
							fontSize: 10,
							color: MUTED,
							spacing: 2,
						},
					}
				: { type: 'Spacer', props: { height: 0 } },
		]),
		{ type: 'Spacer', props: { height: 8 } },
	])

	const studies = education.flatMap((edu) => [
		titleRow(edu.institution, edu.location),
		subtitleRow(
			`${edu.area}${edu.studyType ? ` — ${edu.studyType}` : ''}`,
			formatMonthRange(edu.startDate, edu.endDate),
		),
		{ type: 'Spacer', props: { height: 8 } },
	])

	return {
		type: 'Document',
		props: {
			title: `${basics.name} — Resume`,
			author: basics.name,
			subject: basics.label,
		},
		children: [
			{
				type: 'Page',
				props: {
					size: 'A4',
					marginTop: 34,
					marginBottom: 34,
					marginLeft: 40,
					marginRight: 40,
					backgroundColor: '#ffffff',
				},
				children: [
					{
						type: 'Heading',
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
						props: { color: RULE, thickness: 1, marginTop: 6 },
					},
					{ type: 'Spacer', props: { height: 6 } },

					// Summary, italic, matching the reference layout.
					...basics.summary.map((s) =>
						text(s.text, {
							fontStyle: 'italic',
							fontSize: 10,
							lineHeight: 1.4,
						}),
					),

					...sectionHeading('Professional Experience'),
					...experience,

					...sectionHeading('Education'),
					...studies,

					...sectionHeading('Technical Skills'),
					skillGrid,

					...sectionHeading('Projects'),
					...projectEntries,

					...sectionHeading('Languages'),
					text(
						languages
							.map((l) => `${l.language} (${l.fluency.toLowerCase()})`)
							.join(' · '),
						{ fontSize: 10, color: MUTED },
					),
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
	return nestedToFlat(
		buildDocument(locale) as unknown as Record<string, unknown>,
	)
}
