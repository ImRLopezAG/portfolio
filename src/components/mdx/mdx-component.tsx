import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'
import { cache } from 'react'
import { Heading } from './headings'
import { Callout } from './callout'
import { Card, Cards } from './card'

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>
type CodeProps = ComponentPropsWithoutRef<'code'>


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
	p: ({ className, ...props }: ParagraphProps) => (
		<p
			className={cn(
				'space-y-2 text-pretty text-gray-800 leading-snug dark:text-zinc-300',
				className,
			)}
			{...props}
		/>
	),
	ol: ({ className, ...props }: ListProps) => (
		<ol
			className={cn(
				'list-decimal space-y-2 pl-5 text-gray-800 dark:text-zinc-300',
				className,
			)}
			{...props}
		/>
	),
	ul: ({ className, ...props }: ListProps) => (
		<ul
			className={cn(
				'list-disc space-y-1 pl-5 text-gray-800 dark:text-zinc-300',
				className,
			)}
			{...props}
		/>
	),
	li: ({ className, ...props }: ListItemProps) => (
		<li className={cn('pl-1', className)} {...props} />
	),
	em: ({ className, ...props }: ComponentPropsWithoutRef<'em'>) => (
		<em className={cn('font-medium', className)} {...props} />
	),
	strong: ({ className, ...props }: ComponentPropsWithoutRef<'strong'>) => (
		<strong className={cn('font-medium', className)} {...props} />
	),
	hr: ({ className, ...props }: ComponentPropsWithoutRef<'hr'>) => (
		<hr
			className={cn('my-4 border-gray-300 dark:border-zinc-600', className)}
			{...props}
		/>
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
