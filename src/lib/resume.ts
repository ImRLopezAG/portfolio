import { nestedToFlat } from '@json-render/core'
import { formatMonthRange } from '@lib/date'
import { strapi } from '@services/strapi.service'

/**
 * Builds the @json-render/react-pdf document spec for the resume from the same
 * profile data the site renders, so the PDF can never drift from the page.
 */

const INK = '#111111'
const MUTED = '#333333'
const RULE = '#111111'

type Node = { type: string; props?: Record<string, unknown>; children?: Node[] }

const text = (value: string, props: Record<string, unknown> = {}): Node => ({
	type: 'Text',
	props: { text: value, color: INK, fontSize: 10, ...props },
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

function buildDocument(): Node {
	const { basics, work, education, skills, languages } = strapi.profile()

	const linkedin = basics.profiles.find(
		(p) => p.network.toLowerCase() === 'linkedin',
	)

	// The contact line under the name: linkedin · phone · email · site
	const contacts = [
		linkedin?.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
		basics.phone,
		basics.email,
		basics.url.replace(/^https?:\/\/(www\.)?/, ''),
	].filter(Boolean) as string[]

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
					text(contacts.join('  ·  '), {
						align: 'center',
						fontSize: 9.5,
						color: MUTED,
					}),
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
					text(
						skills
							.map((s) => s.name.replace(/\b\w/g, (c) => c.toUpperCase()))
							.join(' · '),
						{ fontSize: 10, color: MUTED, lineHeight: 1.4 },
					),

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
export function buildResumeSpec() {
	return nestedToFlat(buildDocument() as unknown as Record<string, unknown>)
}
