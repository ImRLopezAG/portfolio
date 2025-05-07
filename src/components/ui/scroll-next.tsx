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
			className='fixed right-4 bottom-4 z-50 animate-bounce cursor-pointer rounded-full bg-foreground p-2 shadow-md transition-all duration-300 hover:text-foreground'
			onClick={() => {
				document
					.getElementById(elementId)
					?.scrollIntoView({ behavior: 'smooth' })
			}}
		>
			<ArrowDown className='h-6 w-6 text-background' />
			<span className='sr-only'>Scroll down</span>
		</Button>
	)
}
