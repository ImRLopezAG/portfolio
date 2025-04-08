import { cn } from '@/lib/utils'
import { CodeBlock } from '@components/code-block'
import { FileTree } from '@components/file-tree'
import { Icon } from '@ui/icon'
import Link from 'next/link'
import type { ComponentPropsWithoutRef } from 'react'
import { cache } from 'react'

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>
type CodeProps = ComponentPropsWithoutRef<'code'>
import { useTheme } from 'next-themes'
type PreProps = ComponentPropsWithoutRef<'pre'> & {
	'data-filename'?: string
	'data-theme'?: string	
}

const components = cache(() => ({
	h1: ({ className, ...props }: HeadingProps) => (
		<h1 className={cn('mb-0 pt-12 font-bold text-3xl', className)} {...props} />
	),
	h2: ({ className, ...props }: HeadingProps) => (
		<h2
			className={cn(
				'mt-8 mb-3 font-semibold text-2xl text-gray-800 dark:text-zinc-200',
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }: HeadingProps) => (
		<h3
			className={cn(
				'mt-8 mb-3 font-medium text-gray-800 text-xl dark:text-zinc-200',
				className,
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }: HeadingProps) => (
		<h4 className={cn('font-medium', className)} {...props} />
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
			'text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800'
		if (href?.startsWith('/')) {
			return (
				<Link href={href} className={cn(linkClass, className)} {...props}>
					{children}
				</Link>
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
	// Inline code
	code: ({ className, ...props }: CodeProps) => {
		// If this is an inline code block (not inside a pre)
		const isInlineCode =
			!props.children ||
			(typeof props.children === 'string' && !props.children.includes('\n'))

		if (isInlineCode) {
			return (
				<code
					className={cn(
						'rounded bg-muted px-1.5 py-0.5 font-mono text-sm',
						className,
					)}
					{...props}
				/>
			)
		}

		// For block code, we'll let the pre handle it
		return <code className={className} {...props} />
	},
	// Override pre to use our custom CodeBlock
	pre: ({ className, children, ...props }: PreProps) => {
		
		return (
			<CodeBlock
				className={className}
				{...props}
				filename={props['data-filename']}
			>
				{children}
			</CodeBlock>
		)
	},
	Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
		<table>
			<thead>
				<tr>
					{data.headers.map((header, index) => (
						<th key={index}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.rows.map((row, index) => (
					<tr key={index}>
						{row.map((cell, cellIndex) => (
							<td key={cellIndex}>{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	),
	blockquote: ({ className, ...props }: BlockquoteProps) => (
		<blockquote
			className={cn(
				'ml-[0.075em] border-gray-300 border-l-3 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300',
				className,
			)}
			{...props}
		/>
	),
	Icon,
	FileTree,
}))
declare global {
	type MDXProvidedComponents = typeof components
}

export const useMDXComponents = () => components()
