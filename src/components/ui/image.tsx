'use client'
import NextImage from 'next/image'
import { useTheme } from 'next-themes'
import { useMemo, useRef } from 'react'

const PLACEHOLDER = '/placeholder.svg'

/** URLs containing these strings won't have theme swapping applied */
const THEME_SWAP_EXCLUDED = ['next', 'placeholder', 'expo']

/** Check if URL is a placeholder */
function isPlaceholder(url: string): boolean {
	return url.includes('placeholder')
}

/** Check if URL is an R2 icon URL */
function isR2Url(url: string): boolean {
	return url.includes('/icons/') && url.includes('.svg')
}

/** Swaps 'dark'/'light' in a URL based on theme - only for fallback URLs, not R2 */
function getThemedSrc(src: string | undefined, theme: string | undefined) {
	if (!src || !theme) return src

	// NEVER swap theme on R2 URLs - they already have the correct variant
	if (isR2Url(src)) {
		return src
	}

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

/** Cache icon to R2 when fallback succeeds */
function cacheIconToR2(iconName: string, sourceUrl: string) {
	// Never cache placeholder
	if (isPlaceholder(sourceUrl)) return

	const params = new URLSearchParams({ name: iconName, src: sourceUrl })
	fetch(`/api/icon?${params}`).catch(() => {})
}

/** Extract icon name from R2 URL (preserves _dark/_light suffix) */
function getIconNameFromR2Url(url: string): string | null {
	const match = url.match(/\/icons\/([^/]+)\.svg$/)
	return match?.[1] ?? null
}

export function Image(
	props: React.ComponentProps<typeof NextImage> & {
		fallbackSrc?: string | string[]
	},
) {
	const { fallbackSrc, src, ...rest } = props
	const fallbackIndexRef = useRef(0)
	const originalSrcRef = useRef<string | null>(null)
	const { resolvedTheme } = useTheme()

	// Use original src on server/initial render, themed src after mount
	const themedSrc = useMemo(() => {
		return getThemedSrc(src as string, resolvedTheme) ?? (src as string)
	}, [src, resolvedTheme])

	const fallbacks = useMemo(() => {
		const list = fallbackSrc
			? Array.isArray(fallbackSrc)
				? fallbackSrc
				: [fallbackSrc]
			: []
		return list.map((f) => getThemedSrc(f, resolvedTheme) ?? f)
	}, [fallbackSrc, resolvedTheme])

	// Store original src on first render
	if (originalSrcRef.current === null && src) {
		originalSrcRef.current = src as string
	}

	return (
		<NextImage
			{...rest}
			src={themedSrc}
			onLoad={(e) => {
				const target = e.target as HTMLImageElement
				const currentSrc = target.src
				const originalSrc = originalSrcRef.current

				// If we loaded a fallback (not the original R2 URL), cache it
				if (
					originalSrc &&
					isR2Url(originalSrc) &&
					!isR2Url(currentSrc) &&
					!isPlaceholder(currentSrc)
				) {
					const iconName = getIconNameFromR2Url(originalSrc)
					if (iconName) {
						cacheIconToR2(iconName, currentSrc)
					}
				}
			}}
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
