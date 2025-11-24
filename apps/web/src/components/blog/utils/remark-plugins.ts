import Slugger from 'github-slugger'
import type { Heading, Root, RootContent } from 'mdast'
import type { Transformer } from 'unified'
import { visit } from 'unist-util-visit'

export function flattenNode(node: RootContent): string {
	if ('children' in node)
		return node.children.map((child) => flattenNode(child)).join('')

	if ('value' in node) return node.value

	return ''
}

const regex = /\s*\[#(?<slug>.+?)]\s*$/

declare module 'mdast' {
	export interface HeadingData {
		hProperties?: {
			id?: string
			className?: string[]
			style?: string
		}
	}
}

export interface RemarkHeadingOptions {
	slug?: (root: Root, heading: Heading, text: string) => string

	/**
	 * Allow custom headings ids with [#custom-id] syntax
	 *
	 * @defaultValue true
	 */
	customId?: boolean

	/**
	 * Add scroll margin to headings for better anchor positioning
	 * This prevents headings from being hidden behind fixed headers
	 *
	 * @defaultValue '7rem' (matches scroll-m-28 which is 7rem)
	 */
	scrollMargin?: string
}

/**
 * Remark plugin to add heading IDs with proper scroll behavior
 *
 * This plugin:
 * - Generates unique IDs for each heading
 * - Supports custom IDs using [#custom-id] syntax
 * - Adds scroll-margin-top to prevent headings from hiding behind fixed headers
 * - Ensures smooth scrolling to anchors with proper viewport positioning
 */
export function remarkHeading({
	slug: defaultSlug,
	customId = true,
	scrollMargin = '7rem',
}: RemarkHeadingOptions = {}): Transformer<Root, Root> {
	return (root) => {
		const slugger = new Slugger()
		slugger.reset()

		visit(root, 'heading', (heading) => {
			heading.data ||= {}
			heading.data.hProperties ||= {}

			let id = heading.data.hProperties.id
			const lastNode = heading.children.at(-1)

			// Check for custom heading ID like: ## Heading [#custom-id]
			if (!id && lastNode?.type === 'text' && customId) {
				const match = regex.exec(lastNode.value)

				if (match?.[1]) {
					id = match[1]
					// Remove the [#custom-id] part from the text
					lastNode.value = lastNode.value.slice(0, match.index).trim()
				}
			}

			// Generate slug if no custom ID found
			let flattened: string | null = null
			if (!id) {
				flattened ??= flattenNode(heading)

				id = defaultSlug
					? defaultSlug(root, heading, flattened)
					: slugger.slug(flattened)
			}

			// Set the ID and scroll behavior
			heading.data.hProperties.id = id

			// Add scroll-margin-top inline style for proper anchor positioning
			// This prevents the heading from being hidden behind fixed headers
			heading.data.hProperties.style = `scroll-margin-top: ${scrollMargin};`

			// Add class for additional styling if needed
			heading.data.hProperties.className = ['scroll-mt-28']

			return 'skip'
		})
	}
}
