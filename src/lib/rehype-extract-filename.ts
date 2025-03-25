import type { Element, Root } from 'hast'
import { visit } from 'unist-util-visit'

export function rehypeExtractFilename() {
	return (tree: Root) => {
		visit(tree, 'element', (node: Element) => {
			if (node.tagName !== 'pre') return

			const codeElement = node.children.find(
				(child): child is Element =>
					child.type === 'element' && child.tagName === 'code',
			)

			if (!codeElement || !codeElement.data || !codeElement.data.meta) return

			const meta = codeElement.data.meta as string
			const filenameMatch = meta.match(/filename=([^\s,]+)/)
			if (filenameMatch) {
				if (!node.properties) node.properties = {}
				node.properties['data-filename'] = filenameMatch[1]
			}
		})
	}
}
