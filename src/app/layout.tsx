import { Footer } from '@components/layout/footer'
import { Navbar } from '@components/layout/navbar'
import { Providers } from '@components/providers'
import { Background3D } from '@landing/bg'
import { seo } from '@lib/seo'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'



const jetbrains = JetBrains_Mono({
	variable: '--font-jt-mono',
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
				className={`${jetbrains.variable} overflow-x-hidden antialiased`}
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
