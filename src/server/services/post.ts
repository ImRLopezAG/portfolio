import { readFile, readdir } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'
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
	const files = await readdir(dir)
	return files.filter((file) => extname(file) === '.mdx')
}

async function readMDXFile(filePath: string) {
	const rawContent = await readFile(filePath, 'utf-8')
	return parseFrontmatter(rawContent)
}

const getMDXData = cache(async (dir: string) => {
	const mdxFiles = await getMDXFiles(dir)
	const filesData = await Promise.all(
		mdxFiles.map(async (file) => {
			const { metadata, content } = await readMDXFile(join(dir, file))
			const slug = basename(file, extname(file))

			return {
				metadata,
				slug,
				content,
			}
		}),
	)
	return filesData
})

export const getPosts = cache(async () => {
	const posts = await getMDXData(join(process.cwd(), 'src', 'server', 'posts'))
	return posts
})

export const getPost = cache(async ({ slug }: { slug: string }) => {
	const posts = await getPosts()
	return posts.find((post) => post.slug === slug)
})
