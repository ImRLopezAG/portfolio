import { Toaster } from '@ui/sonner'
import { RootProvider } from 'fumadocs-ui/provider/next'
import { ThemeProvider } from './theme'
export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='dark'
			enableSystem
			disableTransitionOnChange
		>
			<RootProvider>
				{children}
				<Toaster position='top-center' closeButton richColors />
			</RootProvider>
		</ThemeProvider>
	)
}
