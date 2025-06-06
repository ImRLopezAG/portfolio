'use client'
import { cn } from '@/lib/utils'
import { ScrollArea, ScrollViewport } from '@ui/scroll-area'
import {
	type ComponentProps,
	type HTMLAttributes,
	type ReactNode,
	useEffect,
	useRef,
} from 'react'
import type { TOCItemType } from './popover'
import * as Primitive from './primitive'
import { TocThumb } from './toc-thumb'

export interface TOCProps {
	/**
	 * Custom content in TOC container, before the main TOC
	 */
	header?: ReactNode

	/**
	 * Custom content in TOC container, after the main TOC
	 */
	footer?: ReactNode

	children: ReactNode
}

export function Toc(props: HTMLAttributes<HTMLDivElement>) {
	const containerRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (!containerRef.current) return
		const containerHeight = containerRef.current.clientHeight
		document.documentElement.style.setProperty('--toc-rest', `${containerHeight}px`)
	}, [])
	return (
		<div
			{...props}
			className={cn(
				'sticky top-[calc(var(--banner-height)+var(--nav-height))] h-(--toc-height) pb-2',
				props.className,
			)}
			style={
				{
					...props.style,
					'--toc-height':
						'calc(100dvh - var(--banner-height) - var(--nav-height))',
				} as object
			}
			ref={containerRef}
		>
			<div className='flex h-full w-full flex-col gap-3 pe-4'>
				{props.children}
			</div>
		</div>
	)
}

export function TocItemsEmpty() {
	return (
		<div className='rounded-lg border bg-card p-3 text-muted-foreground text-xs'>
			No headings found
		</div>
	)
}

export function TOCScrollArea({
	isMenu,
	...props
}: ComponentProps<typeof ScrollArea> & { isMenu?: boolean }) {
	const viewRef = useRef<HTMLDivElement>(null)
	return (
		<ScrollArea
			{...props}
			className={cn('flex flex-col ps-px', props.className)}
		>
			<ScrollViewport
				ref={viewRef}
				className={cn(
					'relative min-h-0 text-sm',
					isMenu &&
						'px-4 py-2 [mask-image:linear-gradient(to_bottom,transparent,white_16px,white_calc(100%-16px),transparent)] md:px-6',
				)}
			>
				<Primitive.ScrollProvider containerRef={viewRef}>
					{props.children}
				</Primitive.ScrollProvider>
			</ScrollViewport>
		</ScrollArea>
	)
}

export function TOCItems({ items }: { items: TOCItemType[] }) {
	const containerRef = useRef<HTMLDivElement>(null)

	if (items.length === 0) return <TocItemsEmpty />
	return (
		<>
			<TocThumb
				containerRef={containerRef}
				className='absolute top-(--top) h-(--height) w-px bg-primary transition-all'
			/>
			<div
				ref={containerRef}
				className='flex flex-col border-foreground/10 border-s'
			>
				{items.map((item) => (
					<TOCItem key={item.url} item={item} />
				))}
			</div>
		</>
	)
}

function TOCItem({ item }: { item: TOCItemType }) {
	return (
		<Primitive.TOCItem
			href={item.url}
			className={cn(
				'prose py-1.5 text-muted-foreground text-sm transition-colors [overflow-wrap:anywhere] first:pt-0 last:pb-0 data-[active=true]:text-primary',
				item.depth <= 2 && 'ps-3',
				item.depth === 3 && 'ps-6',
				item.depth >= 4 && 'ps-8',
			)}
		>
			{item.title}
		</Primitive.TOCItem>
	)
}
