interface AnimatedSectionProps {
	children: React.ReactNode
	id: string
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
	children,
	id,
}) => {
	return (
		<section id={id} className='animate-view py-20'>
			<div className='space-y-12'>{children}</div>
		</section>
	)
}
