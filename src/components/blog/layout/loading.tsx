import { Badge } from '@ui/badge'
import { Skeleton } from '@ui/skeleton'
import { Calendar, Clock, Tag } from 'lucide-react'
import { ViewTransition } from 'react'

export default function BlogLayoutLoading() {
	const data = {
		slug: 'loading',
	}
	return (
		<div className='container relative scroll-mt-20 gap-4 px-4 py-20 lg:flex'>
			<div className=''>
				<div className='relative max-w-3xl'>
					<div className='fixed top-8 right-4 z-10 block w-full overflow-y-auto lg:hidden'>
						<Skeleton className='h-10 w-32 rounded-md' />
					</div>
					<div className='mb-5 flex-col gap-6 space-y-4'>
						<ViewTransition name={`blog-title-${data.slug}`}>
							<h1
								className='scroll-m-28 font-bold text-3xl tracking-tight sm:text-4xl'
								id={data.slug}
							>
								<Skeleton className='h-10 w-32 rounded-md' />
							</h1>
						</ViewTransition>
						<div className='flex flex-wrap gap-4 text-muted-foreground text-sm'>
							<ViewTransition name={`blog-meta-${data.slug}`}>
								<div className='flex items-center'>
									<Calendar className='mr-2 size-4 text-primary' />
									<Skeleton className='h-4 w-20 rounded-md' />
								</div>
							</ViewTransition>
							<ViewTransition name={`blog-category-${data.slug}`}>
								<div className='flex items-center'>
									<Tag className='mr-2 size-4 text-primary' />
									<Badge variant='outline' className='border border-primary'>
										<Skeleton className='h-4 w-20 rounded-md' />
									</Badge>
								</div>
							</ViewTransition>
							<ViewTransition name={`blog-read-time-${data.slug}`}>
								<div className='flex items-center'>
									<Clock className='mr-2 size-4 text-primary' />
									<Skeleton className='h-4 w-20 rounded-md' />
								</div>
							</ViewTransition>
						</div>
					</div>
					<article className='max-w-none'>
						<Skeleton className='h-[600px] w-full rounded-md' />
					</article>
				</div>
			</div>

			<div className='sticky top-20 right-4 hidden h-[calc(var(--toc-rest))] w-1/4 overflow-y-auto lg:block'>
				<Skeleton className='h-full w-full rounded-md' />
			</div>
		</div>
	)
}
