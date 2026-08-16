import { Footer } from '@components/layout/footer'
import { Navbar } from '@components/layout/navbar'
import { Providers } from '@components/providers'
import { Background3D } from '@landing/bg'
import { seo } from '@lib/seo'
import { JetBrains_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'
import './globals.css'

const jetbrains = JetBrains_Mono({
	variable: '--font-jt-mono',
	subsets: ['latin'],
})

export const metadata = seo()

/**
 * The locale is read from a cookie in the root layout, which is runtime data.
 * Under `cacheComponents` that blocks prerendering, so routes render per
 * request instead.
 */
export const instant = false

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const locale = await getLocale()

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={`${jetbrains.variable} overflow-x-hidden antialiased`}>
				<NextIntlClientProvider>
					<Providers>
						<Background3D />
						<Navbar />

						{children}
						<Footer />
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
