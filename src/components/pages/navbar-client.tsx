'use client'
import { Button } from '@ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { ModeToggle } from '@ui/mode-toggle'

interface NavbarClientProps {
	navLinks: { href: string; label: string }[]
}
export const NavbarClient: React.FC<NavbarClientProps> = ({ navLinks }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	return (
		<>
			{/* Mobile Menu */}
			<div className='flex items-center gap-2 md:hidden'>
				<ModeToggle />
				<Button
					type='button'
					aria-label='Menu'
					variant='ghost'
					size='icon'
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					{isMenuOpen ? <X /> : <Menu />}
				</Button>
			</div>

			{/* Mobile Dropdown Menu */}
			{isMenuOpen && (
				<div className='fixed inset-0 top-16 z-40 bg-background p-4'>
					<nav className='flex flex-col gap-4'>
						{navLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className='border-border border-b py-2 font-medium text-lg transition-colors hover:text-primary'
								onClick={() => setIsMenuOpen(false)}
							>
								{link.label}
							</a>
						))}
					</nav>
				</div>
			)}
		</>
	)
}
