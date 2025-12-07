'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

function ModeToggleContent() {
	const { theme, setTheme } = useTheme()
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
				<Sun className='size-5 text-yellow-500' />
			) : (
				<Moon className='size-5 text-slate-400' />
			)}
			<span className='sr-only'>Toggle theme</span>
		</Button>
	)
}

export function ModeToggle() {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<Button variant='ghost' size='icon' className='h-10 w-10 p-0' disabled>
				<Sun className='size-5 text-yellow-500' />
				<span className='sr-only'>Toggle theme</span>
			</Button>
		)
	}

	return <ModeToggleContent />
}
