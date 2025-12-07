'use client'
import NextImage from 'next/image'
import { useTheme } from 'next-themes'
import { useMemo, useRef } from 'react'

const PLACEHOLDER = '/placeholder.svg'

/** URLs containing these strings won't have theme swapping applied */
const THEME_SWAP_EXCLUDED = ['next', 'placeholder', 'expo']

/** Swaps 'dark'/'light' in a URL based on theme */
function getThemedSrc(src: string | undefined, theme: string | undefined) {
	if (!src || !theme) return src

	const lower = src.toLowerCase()
	if (THEME_SWAP_EXCLUDED.some((excluded) => lower.includes(excluded))) {
		return src
	}

	const isDark = theme === 'dark'
	// Replace 'light' with 'dark' or vice versa in the src
	if (isDark && src.includes('light')) {
		return src.replace(/light/gi, 'dark')
	}
	if (!isDark && src.includes('dark')) {
		return src.replace(/dark/gi, 'light')
	}
	return src
}

export function Image(
	props: React.ComponentProps<typeof NextImage> & {
		fallbackSrc?: string | string[]
	},
) {
	const { fallbackSrc, src, ...rest } = props
	const fallbackIndexRef = useRef(0)
	const { resolvedTheme } = useTheme()

	const themedSrc = useMemo(
		() => getThemedSrc(src as string, resolvedTheme),
		[src, resolvedTheme],
	)

	const fallbacks = useMemo(() => {
		const list = fallbackSrc
			? Array.isArray(fallbackSrc)
				? fallbackSrc
				: [fallbackSrc]
			: []
		return list.map((f) => getThemedSrc(f, resolvedTheme) ?? f)
	}, [fallbackSrc, resolvedTheme])

	return (
		<NextImage
			{...rest}
			src={themedSrc ?? src}
			onError={(e) => {
				const target = e.target as HTMLImageElement

				if (fallbackIndexRef.current < fallbacks.length) {
					target.src = fallbacks[fallbackIndexRef.current]
					fallbackIndexRef.current++
				} else {
					target.src = PLACEHOLDER
				}
			}}
		/>
	)
}
