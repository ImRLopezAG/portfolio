'use client'
import { remarkHeading } from '@components/blog/utils'
import { cn } from '@lib/utils'
import { memo } from 'react'
import { Streamdown } from '../mdx/streamdown'
import { FileTree } from '../mdx/streamdown/lib/file-tree'

export type ContentProps = React.ComponentProps<typeof Streamdown>

export const Content = memo(
	({ className, ...props }: ContentProps) => (
		<Streamdown
			remarkPlugins={[() => remarkHeading({ scrollMargin: '8rem' })]}
			className={cn(
				'size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
				className,
			)}
			components={{
				FileTree,
			}}
			{...props}
		/>
	),
	(prevProps, nextProps) => prevProps.children === nextProps.children,
)
