import Slugger from 'github-slugger'
import type { Root } from 'mdast'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toString as stringReading } from 'mdast-util-to-string'
import { visit } from 'unist-util-visit'
import type { TOCItemType } from '../toc/types'
import getReadingTime from './reading-time'
import { flattenNode } from './remark-plugins'

export interface ProcessedMarkdown {
	readingTime: string
	toc: TOCItemType[]
}

const regex = /\s*\[#(?<slug>.+?)]\s*$/

/**
 * Process markdown content to extract reading time and table of contents
 * @param content - Raw markdown string from Strapi
 * @returns Object containing reading time and TOC
 */
export function processMarkdown(content: string): ProcessedMarkdown {
	// Parse markdown to AST
	const tree = fromMarkdown(content)

	// Extract TOC
	const toc = extractTOC(tree)

	// Calculate reading time
	const readingTime = calculateReadingTime(tree)

	return {
		readingTime,
		toc,
	}
}

/**
 * Extract table of contents from markdown AST
 */
function extractTOC(tree: Root): TOCItemType[] {
	const toc: TOCItemType[] = []
	const slugger = new Slugger()
	slugger.reset()

	visit(tree, 'heading', (heading) => {
		let id: string | undefined

		// Check for custom heading ID like: ## Heading [#custom-id]
		const lastNode = heading.children.at(-1)
		if (lastNode?.type === 'text') {
			const match = regex.exec(lastNode.value)
			if (match?.[1]) {
				id = match[1]
			}
		}

		// Flatten heading text
		const flattened = flattenNode(heading)

		// Generate slug if no custom ID
		if (!id) {
			id = slugger.slug(flattened)
		}

		toc.push({
			title: flattened,
			url: `#${id}`,
			depth: heading.depth,
		})
	})

	return toc
}

/**
 * Calculate reading time from markdown AST
 */
function calculateReadingTime(tree: Root): string {
	const text = stringReading(tree)
	const readingTime = getReadingTime(text)
	const totalSeconds = Math.floor(readingTime.time / 1000)
	const minutes = Math.floor(totalSeconds / 60)
	const seconds = totalSeconds % 60
	return `${minutes}m ${seconds}s`
}
