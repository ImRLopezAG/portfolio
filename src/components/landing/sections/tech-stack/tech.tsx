import { env } from '@lib/env'
import { cn } from '@lib/utils'
import { Image } from '@ui/image'

const { R2_PUBLIC_URL } = env
const ICON_PREFIX = 'icons'
interface TechProps
	extends Omit<
		React.ComponentProps<typeof Image>,
		'src' | 'alt' | 'width' | 'height' | 'fallbackSrc' | 'priority'
	> {
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
			priority={false}
			unoptimized
			{...props}
		/>
	)
}

function getTechSrc(techName: string) {
	// R2 URL first, then external fallbacks
	const r2Url = R2_PUBLIC_URL
		? `${R2_PUBLIC_URL}/${ICON_PREFIX}/${techName}.svg`
		: null

	const externalUrls = [
		`https://svgl.app/library/${techName}.svg`,
		`https://svgl.app/library/${techName}_dark.svg`,
		`https://svgl.app/library/${techName}_light.svg`,
		`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${techName}/${techName}-original.svg`,
	]

	return {
		main: r2Url ?? externalUrls[0],
		fallbacks: r2Url ? externalUrls : externalUrls.slice(1),
	}
}
