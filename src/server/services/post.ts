import { promises as fs } from 'node:fs'
import path from 'node:path'
import { metadataSchema } from '@server/schemas'
import { cache } from 'react'

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
async function getMDXFiles(dir: string) {
	const files = await fs.readdir(dir)
	return files.filter((file) => path.extname(file) === '.mdx')
}

async function readMDXFile(filePath: string) {
	const rawContent = await fs.readFile(filePath, 'utf-8')
	return parseFrontmatter(rawContent)
}

async function getMDXData(dir: string) {
	const mdxFiles = await getMDXFiles(dir)
	const filesData = await Promise.all(
		mdxFiles.map(async (file) => {
			const { metadata, content } = await readMDXFile(path.join(dir, file))
			const slug = path.basename(file, path.extname(file))

			return {
				metadata,
				slug,
				content,
			}
		}),
	)
	return filesData
}

export async function uncached_post() {
	return getMDXData(
		path.join(process.cwd(), 'src', 'app', 'blog', '[slug]', '_content'),
	)
}

export const getPosts = cache(async () => {
	const posts = await uncached_post()
	return posts
})
