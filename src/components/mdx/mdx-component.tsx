import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'
import { cache } from 'react'
import { Heading } from './headings'
import { Callout } from './callout'
import { Card, Cards } from './card'

type HeadingProps = ComponentPropsWithoutRef<'h1'>


export const mdxComponents = {
	h1: (props: HeadingProps) => (
    <Heading as="h1" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <Heading as="h2" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <Heading as="h3" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <Heading as="h4" {...props} />
  ),
  h5: (props: HeadingProps) => (
    <Heading as="h5" {...props} />
  ),
  h6: (props: HeadingProps) => (
    <Heading as="h6" {...props} />
  ),
	a: ({ href, children, className, ...props }: AnchorProps) => {
		const linkClass =
			'text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800 not-prose'
		if (href?.startsWith('/')) {
			return (
				<a href={href} className={cn(linkClass, className)} {...props}>
					{children}
				</a>
			)
		}
		if (href?.startsWith('#')) {
			return (
				<a href={href} className={cn(linkClass, className)} {...props}>
					{children}
				</a>
			)
		}
		return (
			<a
				href={href}
				target='_blank'
				rel='noopener noreferrer'
				className={cn(linkClass, className)}
				{...props}
			>
				{children}
			</a>
		)
	},
	Callout,
	Card,
	Cards,
}

const components = cache(() => ({
	...mdxComponents,
}))

declare global {
	type MDXProvidedComponents = typeof components
}

export const useMDXComponents = () => components()
