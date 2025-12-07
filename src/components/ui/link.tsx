import type { VariantProps } from 'class-variance-authority'
import NextLink from 'next/link'
import type * as React from 'react'
import { cn } from '@/lib/utils'
import { buttonVariants } from './button'

function Link({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<typeof NextLink> &
	VariantProps<typeof buttonVariants> & {}) {
	return (
		<NextLink
			data-slot='link'
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Link }
