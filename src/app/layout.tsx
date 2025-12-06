import { Providers } from '@components/providers'
import { Background3D } from '@landing/bg'
import { LoadingSection } from '@landing/loading'
import { Footer } from '@layout/fotter'
import { Navbar } from '@layout/navbar'
import { metadata } from '@lib/metadata'
import { cn } from '@lib/utils'
import { Geist, Geist_Mono } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export function generateMetadata() {
	return metadata()
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={cn(geistSans.variable, geistMono.variable, 'antialiased')}
			>
				<Providers>
					<Navbar />
					<Suspense fallback={<LoadingSection />}>
						<Background3D />
						{children}
					</Suspense>
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
