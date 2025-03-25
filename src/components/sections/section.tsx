'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedSectionProps {
	children: React.ReactNode
	id: string
}
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
	children,
	id,
}) => {
	const ref = useRef<HTMLElement>(null)
	const isInView = useInView(ref, { once: true, amount: 0.2 })

	return (
		<section id={id} ref={ref} className='scroll-mt-20 py-20'>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
				transition={{ duration: 0.8 }}
				className='space-y-12'
			>
				{children}
			</motion.div>
		</section>
	)
}
