import { Footer } from '@components/layout/footer'
import { Navbar } from '@components/layout/navbar'
import { Providers } from '@components/providers'
import { Background3D } from '@landing/bg'
import { seo } from '@lib/seo'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata = seo()

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden antialiased`}
			>
				<Providers>
					<Background3D />
					<Navbar />

					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
