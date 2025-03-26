import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@ui/button'

export default function NotFound() {
	return (
		<div className='grid h-screen items-center bg-background pb-8 lg:grid-cols-2 lg:pb-0'>
			<div className='text-center'>
				<p className='font-semibold text-base text-muted-foreground'>404</p>
				<h1 className='mt-4 font-bold text-3xl tracking-tight md:text-5xl lg:text-7xl'>
					Post not found
				</h1>
				<p className='mt-6 text-base text-muted-foreground leading-7'>
					Sorry, we couldn’t find the page you’re looking for.
				</p>
				<div className='mt-10 flex items-center justify-center gap-x-2'>
					<Button size='lg' asChild>
						<Link href='/blog'>Go back blogs</Link>
					</Button>
					<Button size='lg' variant='ghost'>
						Contact support <ArrowRight className='ms-2 h-4 w-4' />
					</Button>
				</div>
			</div>
			<div className='hidden lg:block'>
				<Image
					src={'/404.svg'}
					width={300}
					height={400}
					className='w-full object-contain lg:max-w-2xl'
					alt='not found image'
				/>
			</div>
		</div>
	)
}
