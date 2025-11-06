'use client'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'
export function ModeToggle() {
	const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

	useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains('dark')
		setTheme(isDarkMode ? 'dark' : 'light')
	}, [])

	useEffect(() => {
		const isDark =
			theme === 'dark' ||
			(theme === 'system' &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
	}, [theme])
	return (
		<Button
			variant='ghost'
			size='icon'
			className='h-10 w-10 p-0'
			onClick={() => {
				setTheme(theme === 'dark' ? 'light' : 'dark')
			}}
		>
			{theme === 'dark' ? (
				<Sun className='size-5' />
			) : (
				<Moon className='size-5' />
			)}
			<span className='sr-only'>Toggle theme</span>
		</Button>
	)
}
