import { Skeleton } from '@ui/skeleton'

/**
 * Fallback for the search-param-dependent part of the blog index. Only the
 * filters and cards stream — the page heading is part of the static shell.
 */
export function BlogListSkeleton() {
	return (
		<>
			<div className='mb-8 flex flex-wrap justify-center gap-2'>
				{['all', 'one', 'two', 'three'].map((key) => (
					<Skeleton key={key} className='h-6 w-24 rounded-full' />
				))}
			</div>
			<div className='grid gap-8'>
				{['a', 'b', 'c'].map((key) => (
					<Skeleton key={key} className='h-48 w-full rounded-lg' />
				))}
			</div>
		</>
	)
}
