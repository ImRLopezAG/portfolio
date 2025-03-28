import { Toaster } from '@ui/sonner'
import { ThemeCustomizerPanel } from '@ui/theme-customizer-panel'
import NextTopLoader from 'nextjs-toploader'
import { Suspense } from 'react'
import { FontProvider } from './font'
import { ThemeProvider } from './theme'

type Props = Readonly<{
	children: React.ReactNode
}>
export const Providers: React.FC<Props> = ({ children }) => {
	return (
		<FontProvider>
			<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
				<NextTopLoader
					color='oklch(var(--primary))'
					showSpinner={false}
					height={4}
					shadow='none'
				/>
				{children}
				<Suspense fallback={<div className='h-96' />}>
					<ThemeCustomizerPanel />
				</Suspense>
				<Toaster position='top-right' closeButton />
			</ThemeProvider>
		</FontProvider>
	)
}
