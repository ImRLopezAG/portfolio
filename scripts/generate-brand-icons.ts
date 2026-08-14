/**
 * Generates `src/components/ui/brand-icons.tsx` from the svgl.app API.
 *
 * lucide-react v1 dropped its brand glyphs (Github/Linkedin/Instagram/...), so
 * brand marks come from svgl instead. Icons are inlined at build time rather
 * than fetched at runtime: they render inside RSC without a network hop and
 * inherit `currentColor` like the lucide icons they replace.
 *
 * Run with: `bun run icons:brand`
 */

const SVGL_API = 'https://api.svgl.app'
const OUTPUT = 'src/components/ui/brand-icons.tsx'

interface Brand {
	/** Exported component name. */
	component: string
	/** `title` to match in the svgl catalog (case-insensitive, exact). */
	title: string
	/** Which side of a `{ light, dark }` route to pull the glyph from. */
	variant?: 'light' | 'dark'
	/**
	 * Multi-color marks (Instagram) draw the brand gradient as background paths
	 * and the glyph itself as a knocked-out white shape. Keeping only the paths
	 * painted with this fill yields the monochrome mark.
	 */
	glyphFill?: string
	/**
	 * Overrides the source viewBox. Needed when dropping background paths leaves
	 * the glyph inset, which would render it smaller than the other marks.
	 */
	viewBox?: string
}

const BRANDS: Brand[] = [
	{ component: 'Github', title: 'GitHub', variant: 'light' },
	{ component: 'Linkedin', title: 'LinkedIn' },
	{
		component: 'Instagram',
		title: 'Instagram',
		glyphFill: '#fff',
		// Tight bounds of the knocked-out glyph within the 264.583 artboard.
		viewBox: '33.97 33.97 196.64 196.64',
	},
]

interface SvglEntry {
	id: number
	title: string
	category: string | string[]
	route: string | { light: string; dark: string }
	url: string
}

/** Attributes whose JSX name isn't just the camel-cased SVG name. */
const ATTR_OVERRIDES: Record<string, string> = {
	class: 'className',
	'xlink:href': 'xlinkHref',
}

async function findEntry(brand: Brand): Promise<SvglEntry> {
	const res = await fetch(
		`${SVGL_API}?search=${encodeURIComponent(brand.title)}`,
	)
	if (!res.ok)
		throw new Error(`svgl search failed for ${brand.title}: ${res.status}`)

	const entries = (await res.json()) as SvglEntry[]
	const entry = entries.find(
		(e) => e.title.toLowerCase() === brand.title.toLowerCase(),
	)
	if (!entry) {
		throw new Error(
			`no svgl entry titled "${brand.title}" (got: ${entries.map((e) => e.title).join(', ')})`,
		)
	}
	return entry
}

function resolveRoute(brand: Brand, entry: SvglEntry): string {
	if (typeof entry.route === 'string') return entry.route
	return entry.route[brand.variant ?? 'light']
}

/** Converts SVG markup attributes to their JSX equivalents. */
function toJsxAttrs(markup: string): string {
	return markup.replace(/\s([a-zA-Z][\w:-]*)="([^"]*)"/g, (_, name, value) => {
		// Namespace declarations are meaningless in JSX.
		if (name.startsWith('xmlns') || name.startsWith('xml:')) return ''
		const jsxName =
			ATTR_OVERRIDES[name] ??
			name.replace(/-([a-z])/g, (_m: string, c: string) => c.toUpperCase())
		return ` ${jsxName}="${value}"`
	})
}

/** Strips the outer `<svg>` wrapper, returning its viewBox and inner markup. */
function unwrapSvg(source: string) {
	const openTag = source.match(/<svg\b[^>]*>/)
	if (!openTag) throw new Error('response is not an SVG document')

	const viewBox = openTag[0].match(/viewBox="([^"]+)"/)?.[1]
	if (!viewBox) throw new Error('SVG has no viewBox')

	const inner = source
		.slice(openTag.index! + openTag[0].length, source.lastIndexOf('</svg>'))
		.trim()

	return { viewBox, inner }
}

/** Keeps only the elements painted with `glyphFill`, dropping gradient defs. */
function extractGlyph(inner: string, glyphFill: string): string {
	const fill = glyphFill.toLowerCase()
	const expanded =
		fill.length === 4
			? `#${fill[1].repeat(2)}${fill[2].repeat(2)}${fill[3].repeat(2)}`
			: fill

	const kept = [...inner.matchAll(/<(path|circle|rect|polygon|g)\b[^>]*?\/>/g)]
		.map((m) => m[0])
		.filter((el) => {
			const elFill = el.match(/\sfill="([^"]*)"/)?.[1]?.toLowerCase()
			return elFill === fill || elFill === expanded
		})

	if (kept.length === 0) {
		throw new Error(`no elements filled with ${glyphFill} to extract`)
	}
	return kept.join('')
}

/** Drops hardcoded colors so the mark inherits `currentColor` from the root. */
function stripFills(markup: string): string {
	return markup.replace(/\sfill="(#[0-9a-fA-F]{3,8}|none|currentColor)"/g, '')
}

function renderComponent(
	brand: Brand,
	entry: SvglEntry,
	source: string,
): string {
	const { viewBox, inner } = unwrapSvg(source)
	const glyph = brand.glyphFill ? extractGlyph(inner, brand.glyphFill) : inner
	const body = toJsxAttrs(stripFills(glyph))

	return `/** ${entry.title} — ${entry.url} */
export function ${brand.component}({ size = 24, ...props }: BrandIconProps) {
	return (
		<svg
			viewBox='${brand.viewBox ?? viewBox}'
			width={size}
			height={size}
			fill='currentColor'
			aria-hidden='true'
			{...props}
		>
			${body}
		</svg>
	)
}`
}

function renderFile(components: string[], names: string[]): string {
	return `// GENERATED BY scripts/generate-brand-icons.ts — DO NOT EDIT.
// Sources: https://svgl.app · regenerate with \`bun run icons:brand\`.

export interface BrandIconProps extends React.SVGProps<SVGSVGElement> {
	/** Rendered width/height in px. Overridden by sizing utility classes. */
	size?: number | string
}

${components.join('\n\n')}

/** Lookup table mirroring lucide-react's \`icons\` export. */
export const brandIcons = {
${names.map((n) => `\t${n},`).join('\n')}
} as const

export type BrandIconName = keyof typeof brandIcons
`
}

const components: string[] = []

for (const brand of BRANDS) {
	const entry = await findEntry(brand)
	const route = resolveRoute(brand, entry)

	const res = await fetch(route)
	if (!res.ok) throw new Error(`failed to download ${route}: ${res.status}`)

	components.push(renderComponent(brand, entry, await res.text()))
	console.log(`✓ ${brand.component.padEnd(12)} ${route}`)
}

await Bun.write(
	OUTPUT,
	renderFile(
		components,
		BRANDS.map((b) => b.component),
	),
)

console.log(`\nWrote ${BRANDS.length} brand icons to ${OUTPUT}`)
