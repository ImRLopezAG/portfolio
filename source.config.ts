import { remarkMdxFiles, remarkMdxMermaid } from 'fumadocs-core/mdx-plugins'
import {
	defineConfig,
	defineDocs,
	frontmatterSchema,
	metaSchema,
} from 'fumadocs-mdx/config'
import {  z } from 'zod'

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
	dir: 'src/blog',
	docs: {
		schema: frontmatterSchema.extend({
			category: z.string().optional(),
			tags: z.array(z.string()).optional(),
      date: z.string().optional(),
		}),
		postprocess: {
			includeProcessedMarkdown: true,
		},
	},
	meta: {
		schema: metaSchema,
	},
})

export default defineConfig({
	mdxOptions: {
		remarkPlugins: [remarkMdxFiles, remarkMdxMermaid],
	},
})
