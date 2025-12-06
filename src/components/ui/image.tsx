'use client'
import NextImage from 'next/image'

export function Image(
	props: React.ComponentProps<typeof NextImage> & { fallbackSrc?: string },
) {
	const { fallbackSrc, ...rest } = props

	return (
		<NextImage
			{...rest}
			onError={(e) => {
				if (fallbackSrc) {
					const target = e.target as HTMLImageElement
					target.src = fallbackSrc
				}
			}}
		/>
	)
}
