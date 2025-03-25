import { Providers } from '@components/providers'
import type React from 'react'
import './globals.css'

import { getThemeScript } from '@/lib/utils'
import { Footer } from '@components/footer'
import { Navbar } from '@components/navbar'
import { basics } from '@shared/cv'
import Script from 'next/script'
export const metadata = {
	title: `${basics.name} | ${basics.label}`,
	description: basics.summary,
	image: basics.image,
	url: basics.url,
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
