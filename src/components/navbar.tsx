import { cn } from '@shared/utils'
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'
import { NavbarClient } from './navbar-client'

export function Navbar() {
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
				'fixed top-0 right-0 left-0 z-50 animate-blur bg-transparent py-4 transition-all duration-300 ',
			)}
		>
			<div className='container mx-auto flex items-center justify-between px-4'>
				<Link
					href='/'
					className='bg-gradient-to-r from-primary to-purple-600 bg-clip-text font-bold text-transparent text-xl'
				>
					Angel Lopez
				</Link>

				<NavbarClient navLinks={navLinks} />

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
		</header>
	)
}
