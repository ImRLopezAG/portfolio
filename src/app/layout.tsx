import { Providers } from '@components/providers'
import type React from 'react'
import './globals.css'

import { Footer } from '@components/footer'
import { Navbar } from '@components/navbar'
import { getThemeScript } from '@lib/utils'
import { basics } from '@shared/cv'
import Script from 'next/script'
import { absoluteUrl } from '@lib/utils'

export const metadata = {
	title: {
		template: `%s | ${basics.name}`,
		default: `${basics.name} | ${basics.label}`,
		absolute: `${basics.name} | ${basics.label}`,
	},
	description: basics.summary.map((s) => s).join(' '),
	abstract: basics.summary[0],
	icons: {
		icon: [
			{
				url: '/favicon.ico',
				type: 'image/x-icon',
				sizes: '96x96',
				rel: 'shortcut icon'
			},
		],
		apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }]
	},
	appleWebApp: {
		title: basics.name,
	},
	authors: [
		{
			name: 'Angel Gabriel Lopez Solano',
			url: 'https://imrlopez.dev/'
		}
	],
	category: 'Personal',
	generator: 'Next.js',
	classification: 'Personal',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		countryName: 'Dominican Republic',
		title: basics.name,
		description: basics.summary.map((s) => s).join(' '),
		emails: ['contact@imrlopez.dev'],
		url: 'https://imrlopez.dev',
		siteName: `${basics.name} | ${basics.label}`,
		images: [
			{
				url: absoluteUrl('/me.webp'),
				alt: basics.name,
				width: 500,
				height: 500
			}
		]
	},
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	}
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<Script
					strategy='beforeInteractive'
					id='theme-script'
					dangerouslySetInnerHTML={{
						__html: getThemeScript(),
					}}
				/>
			</head>
			<Providers>
				<main className='min-h-screen bg-background'>
					<Navbar />
					{children}
					<Footer />
				</main>
			</Providers>
		</html>
	)
}
