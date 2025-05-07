import { cn } from '@shared/utils'
interface AnimatedSectionProps {
	children: React.ReactNode
	id: string
	className?: string
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
	children,
	id,
	className,
}) => {
	return (
		<section id={id} className={cn('animate-view py-10 scroll-m-12', className)}>
			<div className='space-y-8'>{children}</div>
		</section>
	)
}
