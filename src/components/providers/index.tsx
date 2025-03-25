import { HydrateClient } from '@shared/trpc'
import { Toaster } from '@ui/sonner'
import { ThemeCustomizerPanel } from '@ui/theme-customizer-panel'
import NextTopLoader from 'nextjs-toploader'
import { Suspense } from 'react'
import { FontProvider } from './font'
import { ThemeProvider } from './theme'
import { TRPCReactProvider } from './trpc'

type Props = Readonly<{
	children: React.ReactNode
}>
export const Providers: React.FC<Props> = ({ children }) => {
	return (
		<TRPCReactProvider>
			<HydrateClient>
				<FontProvider>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
						<NextTopLoader
							color='hsl(var(--primary))'
							showSpinner={false}
							height={2}
							shadow='none'
						/>
						{children}
						<Suspense fallback={<div className='h-96' />}>
							<ThemeCustomizerPanel />
						</Suspense>
						<Toaster position='top-right' closeButton />
					</ThemeProvider>
				</FontProvider>
			</HydrateClient>
		</TRPCReactProvider>
	)
}
