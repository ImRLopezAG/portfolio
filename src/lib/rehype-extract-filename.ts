import type { Element, Root } from 'hast'
import { visit } from 'unist-util-visit'
export function rehypeExtractFileInfo() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'pre') return

      const codeElement = node.children.find(
        (child): child is Element =>
          child.type === 'element' && child.tagName === 'code',
      )

      if (!codeElement) return

      // Extract filename from data-meta
      const meta = codeElement.data?.meta as string | undefined
			
      if (meta) {
        const filenameMatch = meta.match(/filename=([^\s,]+)/)
        if (filenameMatch) {
          if (!node.properties) node.properties = {}
          node.properties['data-filename'] = filenameMatch[1]
        }
      }

      // Count the number of lines in the code block
      const lineCount = codeElement.children.reduce((count, child) => {
        if (child.type === 'text') {
          return count + (child.value.match(/\n/g)?.length || 0)
        }
        return count
      }, 1) // Start with 1 for the first line

      if (!node.properties) node.properties = {}
      node.properties['data-line-count'] = lineCount
    })
  }
}