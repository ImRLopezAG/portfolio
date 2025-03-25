'use client'
import type { ThemeProviderProps } from 'next-themes'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
	children,
	...props
}) => <NextThemesProvider {...props}>{children}</NextThemesProvider>
