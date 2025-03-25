import {
	Geist,
	Geist_Mono,
	Inter,
	Montserrat,
	Overpass_Mono,
	Poppins,
	Roboto,
} from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	variable: '--font-roboto',
})

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
	variable: '--font-montserrat',
})

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
	variable: '--font-poppins',
})

const overpass_mono = Overpass_Mono({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
	variable: '--font-overpass-mono',
})

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})
const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const FontProvider: React.FC<Props> = ({ children }) => {
	return (
		<body
			suppressHydrationWarning
			className={`${inter.variable} ${roboto.variable} ${montserrat.variable} ${poppins.variable} ${overpass_mono.variable} ${geistSans.variable} ${geistMono.variable}`}
		>
			{children}
		</body>
	)
}
