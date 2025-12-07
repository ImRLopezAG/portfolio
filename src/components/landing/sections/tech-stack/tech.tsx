import { cn } from '@lib/utils'
import { Image } from '@ui/image'

interface TechProps
	extends Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'> {
	name: string
	/** Invert icon colors on dark mode (for black/white icons) */
	invert?: boolean
	customSrc?: string
}
export function Tech({
	name,
	invert,
	customSrc,
	className,
	...props
}: TechProps) {
	const normalized = name.toLowerCase().replace('.', '')

	const { main, fallbacks } = getTechSrc(normalized)
	return (
		<Image
			src={customSrc ?? main}
			alt={name}
			className={cn(
				'size-6 object-contain',
				invert && 'dark:invert',
				className,
			)}
			width={24}
			height={24}
			fallbackSrc={fallbacks}
			{...props}
		/>
	)
}

function getTechSrc(techName: string) {

	const { original, dark, light } = {
		original: `https://svgl.app/library/${techName}.svg`,
		dark: `https://svgl.app/library/${techName}_dark.svg`,
		light: `https://svgl.app/library/${techName}_light.svg`,
	}
	return {
		main: original,
		fallbacks: [dark, light]
	}
}
