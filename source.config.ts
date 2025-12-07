import { remarkMdxFiles, remarkMdxMermaid } from 'fumadocs-core/mdx-plugins'
import {
	defineConfig,
	defineDocs,
	frontmatterSchema,
	metaSchema,
} from 'fumadocs-mdx/config'

export const docs = defineDocs({
	dir: 'src/docs',
	docs: {
		schema: frontmatterSchema,
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
