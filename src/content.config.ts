import { defineCollection } from 'astro:content'
import { metadataSchema } from '@lib/schemas/metadata.schema'
import { glob } from 'astro/loaders'

const posts = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/components/blog/posts/' }),
	schema: metadataSchema
})

export const collections = { posts }
