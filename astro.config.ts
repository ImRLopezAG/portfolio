import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField } from 'astro/config'
import rehypePrettyCode, { type Options } from 'rehype-pretty-code'

import {
	metaTransformer,
	rehypeExtractFileInfo,
} from './src/lib/rehype-plugins'
import { remarkHeading, remarkReadingTime } from './src/lib/remark-plugins'

// https://astro.build/config

export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	output: 'server',
	site: 'https://imrlopez.dev',
	
	integrations: [
		react(),
		mdx({
			syntaxHighlight: false,
			remarkPlugins: [remarkHeading, remarkReadingTime],
			rehypePlugins: [
				[
					rehypePrettyCode,
					{
						keepBackground: false,
						// theme: 'one-dark-pro',
						grid: false,
						themes: {
							light: 'one-light',
							dark: 'one-dark-prp',
						},
						transformers: [metaTransformer],
					} as Options,
				],
				rehypeExtractFileInfo,
			],
		}),
	],
	experimental: {
		contentIntellisense: true,
	},
	env: {
		schema: {
			RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
		},
	},
	adapter: vercel({
		isr: {
			expiration: 60 * 60 * 24 * 7, 
		},
	}),
})
