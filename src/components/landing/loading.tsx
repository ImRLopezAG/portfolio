import { cn } from '@lib/utils'
import { Badge } from '@ui/badge'
import { Skeleton } from '@ui/skeleton'
import Link from 'next/link'
export async function LoadingSection() {
	const categories = ['Loading...', 'Loading...', 'Loading...', 'Loading...']
	const filteredPosts = () => {
		return Array(5).fill(null)
	}
	const categoryName = 'Loading...'
	return (
		<div className='container z-40 mx-auto px-4 py-20'>
			<div className='mx-auto max-w-4xl'>
				<div className='mb-12 space-y-4 text-center'>
					<h1 className='font-bold text-4xl tracking-tight sm:text-5xl'>
						Blog
					</h1>
					<div className='mx-auto h-1 w-20 rounded-full bg-primary' />
					<p className='text-muted-foreground text-xl'>
						Thoughts, ideas, and insights on web development and programming
					</p>
				</div>

				<div className='mb-8 flex flex-wrap justify-center gap-2'>
					<Badge
						className={cn('cursor-pointer bg-muted text-black dark:text-white')}
					>
						<Link href='/blog'>All</Link>
					</Badge>
					{categories.map((category) => (
						<Badge
							key={category}
							className={cn(
								'cursor-pointer bg-muted text-black dark:text-white',
								{
									'bg-primary': categoryName === category,
								},
							)}
						>
							<Link
								href={`/blog?category=${category?.replace(/ /g, '-') || category}`}
							>
								{category}
							</Link>
						</Badge>
					))}
				</div>

				<div className='grid gap-8'>
					{filteredPosts().map((_post, idx) => (
						<Skeleton key={`loading-skeleton-${idx}`} className='h-48 w-full rounded-lg' />
					))}
				</div>
			</div>
		</div>
	)
}
