import { Toaster } from '@ui/sonner'
import { ThemeProvider } from './theme'
export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='dark'
			enableSystem
			disableTransitionOnChange
		>
			{children}
			<Toaster position='top-center' closeButton richColors />
		</ThemeProvider>
	)
}
