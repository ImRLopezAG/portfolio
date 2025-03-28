'use client'
import { Button } from '@ui/button'
import { ArrowDown } from 'lucide-react'
interface ScrollNextProps {
	elementId: string
}
export const ScrollNext: React.FC<ScrollNextProps> = ({ elementId }) => {
	return (
		<Button
			variant='ghost'
			size='icon'
			className='animate-bounce'
			onClick={() => {
				document
					.getElementById(elementId)
					?.scrollIntoView({ behavior: 'smooth' })
			}}
		>
			<ArrowDown className='h-6 w-6' />
			<span className='sr-only'>Scroll down</span>
		</Button>
	)
}
