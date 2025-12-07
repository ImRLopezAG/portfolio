import { LandingSection } from '@landing/section'
import { Skeleton } from '@ui/skeleton'
export async function LoadingSection() {
	return (
		<LandingSection
			id='hero'
			allowSplit={false}
			title={<Skeleton className='h-12 w-48 rounded-md' />}
		>
			<div className='grid items-center gap-8 lg:grid-cols-2'>
				<div className='motion-preset-slide-right-lg motion-duration-700 motion-delay-500 motion-ease-bounce space-y-6'>
					<Skeleton className='h-12 w-48 rounded-md' />
					<Skeleton className='h-12 w-48 rounded-md' />
					<Skeleton className='h-12 w-48 rounded-md' />
					<Skeleton className='h-12 w-48 rounded-md' />
				</div>
			</div>
		</LandingSection>
	)
}
