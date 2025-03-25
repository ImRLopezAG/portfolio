'use client'

import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ModeToggle } from './mode-toggle'

export function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const isMobile = useIsMobile()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const navLinks = [
		{ href: '/#home', label: 'Home' },
		{ href: '/#about', label: 'About' },
		{ href: '/#experience', label: 'Experience' },
		{ href: '/#skills', label: 'Skills' },
		{ href: '/#projects', label: 'Projects' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/#contact', label: 'Contact' },
	]

	return (
		<header
			className={cn(
				'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
				isScrolled
					? 'bg-background/80 py-2 shadow-md backdrop-blur-md'
					: 'bg-transparent py-4',
			)}
		>
			<div className='container mx-auto flex items-center justify-between px-4'>
				<Link
					href='/'
					className='bg-gradient-to-r from-primary to-purple-600 bg-clip-text font-bold text-transparent text-xl'
				>
					Angel Lopez
				</Link>

				{isMobile ? (
					<>
						<div className='flex items-center gap-2'>
							<ModeToggle />
							<Button
								variant='ghost'
								size='icon'
								onClick={() => setIsMenuOpen(!isMenuOpen)}
							>
								{isMenuOpen ? <X /> : <Menu />}
							</Button>
						</div>
						{isMenuOpen && (
							<div className='fixed inset-0 top-16 z-40 bg-background p-4'>
								<nav className='flex flex-col gap-4'>
									{navLinks.map((link) => (
										<Link
											key={link.href}
											href={link.href}
											className='border-border border-b py-2 font-medium text-lg transition-colors hover:text-primary'
											onClick={() => setIsMenuOpen(false)}
										>
											{link.label}
										</Link>
									))}
								</nav>
							</div>
						)}
					</>
				) : (
					<div className='flex items-center gap-6'>
						<nav className='flex items-center gap-6'>
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className='font-medium text-sm transition-colors hover:text-primary'
								>
									{link.label}
								</Link>
							))}
						</nav>
						<ModeToggle />
					</div>
				)}
			</div>
		</header>
	)
}
