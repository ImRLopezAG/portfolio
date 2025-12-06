import { Image } from '@ui/image'

interface TechProps
	extends Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'> {
	name: string
}
export function Tech({ name, ...props }: TechProps) {
	const normalized = name.toLowerCase().replace('.', '')
	const { original, plain } = {
		original: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${normalized}/${normalized}-original.svg`,
		plain: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${normalized}/${normalized}-plain.svg`,
	}

	return (
		<Image
			src={original}
			alt={name}
			className='size-6 object-contain'
			width={24}
			height={24}
			fallbackSrc={plain}
			{...props}
		/>
	)
}
