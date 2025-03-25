'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@shared/utils'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { ModeToggle } from './mode-toggle'
export function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const { scrollY } = useScroll()

	// Detect Scroll Direction
	useMotionValueEvent(scrollY, 'change', (latest) => {
		setIsScrolled(latest > 10) // Toggle navbar background when scrolling down
	})

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
		<motion.header
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className={cn(
				'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
				{ 'bg-background/80 py-2 shadow-md backdrop-blur-md': isScrolled },
				{ 'bg-transparent py-4': !isScrolled },
			)}
		>
			<div className='container mx-auto flex items-center justify-between px-4'>
				<Link
					href='/'
					className='bg-gradient-to-r from-primary to-purple-600 bg-clip-text font-bold text-transparent text-xl'
				>
					Angel Lopez
				</Link>

				{/* Mobile Menu */}
				<div className='flex items-center gap-2 md:hidden'>
					<ModeToggle />
					<Button
						variant='ghost'
						size='icon'
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X /> : <Menu />}
					</Button>
				</div>

				{/* Mobile Dropdown Menu */}
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className='fixed inset-0 top-16 z-40 bg-background p-4'
					>
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
					</motion.div>
				)}

				{/* Desktop Navbar */}
				<div className='hidden items-center gap-6 md:flex'>
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
			</div>
		</motion.header>
	)
}
