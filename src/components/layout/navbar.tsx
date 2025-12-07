'use client'

import { cn } from '@lib/utils'
import { Button } from '@ui/button'
import { Logo } from '@ui/logo'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@ui/navigation-menu'
import { Separator } from '@ui/separator'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { ModeToggle } from './theme'

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false)
	const navLinks = [
		{ href: '/#home', label: 'Home' },
		{ href: '/#experience', label: 'Experience' },
		{ href: '/#skills', label: 'Skills' },
		{ href: '/#projects', label: 'Projects' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/#contact', label: 'Contact' },
	] as const

	return (
		<header className='sticky top-2 z-40 px-4 lg:top-5'>
			<div className='container mx-auto'>
				<div className='translucent flex items-center justify-between rounded-2xl border p-3 px-4'>
					<Link href='/'>
						<Logo />
					</Link>
					{/* <!-- Mobile --> */}
					<div className='flex items-center gap-2 lg:hidden'>
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<ModeToggle />
							<SheetTrigger asChild>
								<Menu
									onClick={() => setIsOpen(!isOpen)}
									className='cursor-pointer lg:hidden'
								/>
							</SheetTrigger>

							<SheetContent
								side='left'
								className='translucent flex flex-col justify-between rounded-tr-2xl rounded-br-2xl border-secondary'
							>
								<div>
									<SheetHeader className='mb-4 ml-4'>
										<SheetTitle className='flex items-center'>
											<Logo />
										</SheetTitle>
									</SheetHeader>

									<div className='flex flex-col gap-2'>
										{navLinks.map(({ href, label }) => (
											<Button
												key={href}
												onClick={() => setIsOpen(false)}
												asChild
												variant='ghost'
												className='justify-start text-base'
											>
												<Link href={href}>{label}</Link>
											</Button>
										))}
									</div>
								</div>

								<SheetFooter className='flex-col items-start justify-start sm:flex-col'>
									<Separator className='mb-2' />
									<ModeToggle />
								</SheetFooter>
							</SheetContent>
						</Sheet>
					</div>

					{/* <!-- Desktop --> */}
					<NavigationMenu className='hidden px-4 lg:block'>
						<NavigationMenuList className='space-x-0'>
							<NavigationMenuItem>
								{navLinks.map(({ href, label }) => (
									<NavigationMenuLink
										key={href}
										asChild
										className={cn(
											navigationMenuTriggerStyle(),
											'bg-transparent! hover:bg-muted!',
										)}
									>
										<Link href={href}>{label}</Link>
									</NavigationMenuLink>
								))}
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>

					<div className='hidden items-center lg:flex'>
						<ModeToggle />
					</div>
				</div>
			</div>
		</header>
	)
}
