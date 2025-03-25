import { Providers } from '@components/providers'
import type React from 'react'
import './globals.css'

import { getThemeScript } from '@/lib/utils'
import { Footer } from '@components/footer'
import { Navbar } from '@components/navbar'
import Script from 'next/script'
export const metadata = {
	title: 'Angel Gabriel Lopez Solano | Full-Stack Developer',
	description:
		'Full-Stack developer with +2 years of experience & basketball player',
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
