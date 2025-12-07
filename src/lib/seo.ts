import { strapi } from '@services/strapi.service'
import type { Metadata } from 'next'
export async function seo(meta?: Metadata): Promise<Metadata> {
	const { basics } = await strapi.profile()
	const defaultDescription =
		basics.summary.map(({ text }) => text).join('\n') ||
		'Welcome to my portfolio website.'
	return {
		metadataBase: new URL('https://imrlopez.dev'),
		title: {
			absolute: basics.name || 'My Portfolio',
			template: `%s | ${basics.name || 'My Portfolio'}`,
			default: basics.name || 'My Portfolio',
		},
		description:
			basics.summary.map(({ text }) => text).join('\n') ||
			'Welcome to my portfolio website.',
		category: 'Portfolio',
		keywords: ['Portfolio', 'Web Developer', 'Software Engineer', basics.name],
		openGraph: {
			title: basics.name || 'My Portfolio',
			description: defaultDescription,
			type: 'website',
			url: basics.url,
			images: basics.image ? [basics.image.url] : undefined,
		},
		twitter: {
			card: 'summary_large_image',
			title: basics.name || 'My Portfolio',
			description: defaultDescription,
			images: basics.image ? [basics.image.url] : undefined,
			creator:
				basics.profiles.find((p) => p.network.toLowerCase() === 'twitter')
					?.username || undefined,
		},
		generator: 'Next.js',
		authors: [
			{
				name: basics.name,
				url: basics.url,
			},
		],
		...meta,
	}
}
