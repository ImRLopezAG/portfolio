'use client'

import type { MermaidConfig } from 'mermaid'
import type { ComponentType } from 'react'
import { createContext, memo, useEffect, useId, useMemo } from 'react'
import ReactMarkdown, { type Options } from 'react-markdown'
import { harden } from 'rehype-harden'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkCjkFriendly from 'remark-cjk-friendly'
import remarkCjkFriendlyGfmStrikethrough from 'remark-cjk-friendly-gfm-strikethrough'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import type { BundledTheme } from 'shiki'
import type { Pluggable } from 'unified'
import { components as defaultComponents } from './lib/components'
import { transformCustomComponents } from './lib/custom-components'
import { parseMarkdownIntoBlocks } from './lib/parse-blocks'
import { parseIncompleteMarkdown } from './lib/parse-incomplete-markdown'
import { cn } from './lib/utils'

export type { MermaidConfig } from 'mermaid'
// biome-ignore lint/performance/noBarrelFile: "required"
export { defaultUrlTransform } from 'react-markdown'
export { parseMarkdownIntoBlocks } from './lib/parse-blocks'
export { parseIncompleteMarkdown } from './lib/parse-incomplete-markdown'

export type ControlsConfig =
	| boolean
	| {
			table?: boolean
			code?: boolean
			mermaid?:
				| boolean
				| {
						download?: boolean
						copy?: boolean
						fullscreen?: boolean
				  }
	  }

type MarkdownComponents = NonNullable<Options['components']>
type MarkdownComponent =
	| NonNullable<MarkdownComponents[keyof MarkdownComponents]>
	| ComponentType<any>
export type StreamdownComponentMap = Record<string, MarkdownComponent>
type ReactMarkdownOptions = Omit<Options, 'components'>

export type StreamdownProps = ReactMarkdownOptions & {
	BlockComponent?: ComponentType<BlockProps>
	parseMarkdownIntoBlocksFn?: (markdown: string) => string[]
	parseIncompleteMarkdown?: boolean
	className?: string
	shikiTheme?: [BundledTheme, BundledTheme]
	mermaidConfig?: MermaidConfig
	controls?: ControlsConfig
	isAnimating?: boolean
	components?: StreamdownComponentMap
}

export const defaultRehypePlugins: Record<string, Pluggable> = {
	harden: [
		harden,
		{
			allowedImagePrefixes: ['*'],
			allowedLinkPrefixes: ['*'],
			defaultOrigin: undefined,
			allowDataImages: true,
		},
	],
	raw: rehypeRaw,
	katex: [rehypeKatex, { errorColor: 'var(--color-muted-foreground)' }],
} as const

export const defaultRemarkPlugins: Record<string, Pluggable> = {
	gfm: [remarkGfm, {}],
	math: [remarkMath, { singleDollarTextMath: false }],
	cjkFriendly: [remarkCjkFriendly, {}],
	cjkFriendlyGfmStrikethrough: [remarkCjkFriendlyGfmStrikethrough, {}],
} as const

export const ShikiThemeContext = createContext<[BundledTheme, BundledTheme]>([
	'github-light' as BundledTheme,
	'github-dark' as BundledTheme,
])

export const MermaidConfigContext = createContext<MermaidConfig | undefined>(
	undefined,
)

export const ControlsContext = createContext<ControlsConfig>(true)

export type StreamdownRuntimeContextType = {
	isAnimating: boolean
}

export const StreamdownRuntimeContext =
	createContext<StreamdownRuntimeContextType>({
		isAnimating: false,
	})

export const ComponentsRegistryContext = createContext<StreamdownComponentMap>(
	{},
)

type BlockProps = Options & {
	content: string
	shouldParseIncompleteMarkdown: boolean
	index: number
}

// Ensures custom React components declared in PascalCase still resolve after
// markdown parsing lowercases the underlying HTML tag name.
const mergeComponentsWithAliases = (
	components?: StreamdownComponentMap,
): Options['components'] => {
	const mergedEntries = Object.entries({
		...(defaultComponents as StreamdownComponentMap),
		...(components ?? {}),
	}) as Array<[string, MarkdownComponent | undefined]>

	const normalized: Record<string, MarkdownComponent> = {}

	for (const [key, component] of mergedEntries) {
		if (!component) continue
		normalized[key] = component
		const lowercaseKey = key.toLowerCase()
		if (!(lowercaseKey in normalized)) {
			normalized[lowercaseKey] = component
		}
	}

	return normalized as Options['components']
}

export const Block = memo(
	({ content, shouldParseIncompleteMarkdown, ...props }: BlockProps) => {
		const parsedContent = useMemo(
			() =>
				typeof content === 'string' && shouldParseIncompleteMarkdown
					? parseIncompleteMarkdown(content.trim())
					: content,
			[content, shouldParseIncompleteMarkdown],
		)

		return <ReactMarkdown {...props}>{parsedContent}</ReactMarkdown>
	},
	(prevProps, nextProps) => prevProps.content === nextProps.content,
)

Block.displayName = 'Block'

const defaultShikiTheme: [BundledTheme, BundledTheme] = [
	'github-light',
	'github-dark',
]

export const Streamdown = memo(
	({
		children,
		parseIncompleteMarkdown: shouldParseIncompleteMarkdown = true,
		components,
		rehypePlugins = Object.values(defaultRehypePlugins),
		remarkPlugins = Object.values(defaultRemarkPlugins),
		className,
		shikiTheme = defaultShikiTheme,
		mermaidConfig,
		controls = true,
		isAnimating = false,
		urlTransform = (value) => value,
		BlockComponent = Block,
		parseMarkdownIntoBlocksFn = parseMarkdownIntoBlocks,
		...props
	}: StreamdownProps) => {
		// Parse the children to remove incomplete markdown tokens if enabled
		const generatedId = useId()
		const normalizedMarkdown = useMemo(
			() =>
				typeof children === 'string' ? transformCustomComponents(children) : '',
			[children],
		)
		const blocks = useMemo(
			() => parseMarkdownIntoBlocksFn(normalizedMarkdown),
			[normalizedMarkdown, parseMarkdownIntoBlocksFn],
		)
		const resolvedComponents = useMemo(
			() => mergeComponentsWithAliases(components),
			[components],
		)

		useEffect(() => {
			if (
				Array.isArray(rehypePlugins) &&
				rehypePlugins.some((plugin) =>
					Array.isArray(plugin)
						? plugin[0] === rehypeKatex
						: plugin === rehypeKatex,
				)
			) {
				// @ts-expect-error
				import('katex/dist/katex.min.css')
			}
		}, [rehypePlugins])

		const runtimeContext = useMemo(() => ({ isAnimating }), [isAnimating])

		return (
			<ShikiThemeContext.Provider value={shikiTheme}>
				<MermaidConfigContext.Provider value={mermaidConfig}>
					<ControlsContext.Provider value={controls}>
						<StreamdownRuntimeContext.Provider value={runtimeContext}>
							<ComponentsRegistryContext.Provider
								value={resolvedComponents as StreamdownComponentMap}
							>
								<div className={cn('space-y-4', className)}>
									{blocks.map((block, index) => (
										<BlockComponent
											components={resolvedComponents}
											content={block}
											index={index}
											// biome-ignore lint/suspicious/noArrayIndexKey: "required"
											key={`${generatedId}-block-${index}`}
											rehypePlugins={rehypePlugins}
											remarkPlugins={remarkPlugins}
											shouldParseIncompleteMarkdown={
												shouldParseIncompleteMarkdown
											}
											urlTransform={urlTransform}
											{...props}
										/>
									))}
								</div>
							</ComponentsRegistryContext.Provider>
						</StreamdownRuntimeContext.Provider>
					</ControlsContext.Provider>
				</MermaidConfigContext.Provider>
			</ShikiThemeContext.Provider>
		)
	},
	(prevProps, nextProps) =>
		prevProps.children === nextProps.children &&
		prevProps.shikiTheme === nextProps.shikiTheme &&
		prevProps.isAnimating === nextProps.isAnimating,
)
Streamdown.displayName = 'Streamdown'
