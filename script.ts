// this script is used to test the `Glob` and `file` APIs in Bun runtime as they are not supported in `TurboPack` yet
import { basename } from 'node:path'
import { metadataSchema } from '@server/schemas'
function parseFrontmatter(fileContent: string) {
	const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
	const match = frontmatterRegex.exec(fileContent)

	if (!match) {
		throw new Error('Invalid frontmatter format')
	}

	const frontMatterBlock = match[1]
	const content = fileContent.replace(frontmatterRegex, '').trim()
	const frontMatterLines = frontMatterBlock.trim().split('\n')

	const metadata: Partial<BlogMetadata> = {}
	let currentKey: keyof BlogMetadata | null = null

	for (const line of frontMatterLines) {
		const trimmedLine = line.trim()

		if (trimmedLine.startsWith('-') && currentKey === 'tags') {
			metadata.tags?.push(trimmedLine.substring(1).trim())
			continue
		}

		const keyValueMatch = trimmedLine.match(/^([^:]+):\s*(.*)$/)
		if (keyValueMatch) {
			const key = keyValueMatch[1].trim() as keyof BlogMetadata
			let value = keyValueMatch[2].trim()

			if (key === 'tags') {
				metadata.tags = [] // Initialize tags array
				currentKey = 'tags'
				continue
			}

			value = value.replace(/^['"](.*)['"]$/, '$1')

			metadata[key] = value
			currentKey = null
		}
	}

	return { metadata: metadataSchema.parse(metadata), content }
}

export async function uncached_post() {
	const glob = new Bun.Glob('**/*.mdx')
	const files = await Array.fromAsync(glob.scan({}))
	const posts = await Promise.all(
		files.map(async (mdx) => {
			const data = Bun.file(mdx)
			const text = await data.text()
			const { content, metadata } = parseFrontmatter(text)
			const slug = basename(data.name ?? '').replace(/\.mdx$/, '')
			return {
				slug,
				metadata,
				content,
			}
		}),
	)
	return posts
}

async function main() {
	const posts = await uncached_post()
	console.log(posts)
}
main()
