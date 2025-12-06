import { processMarkdown } from '@components/blog/utils'
import { Badge } from '@ui/badge'
import { Calendar, Clock, Tag } from 'lucide-react'
import { ViewTransition } from 'react'
import { TOC, TOCPopover } from './toc-side'

interface Props {
	post: BlogPost

	children: React.ReactNode
}

export function BlogLayout({ children, post }: Props) {
	const { metadata: data, content } = post
	const { readingTime, toc } = processMarkdown(content)
	return (
		<div className='container relative scroll-mt-20 gap-4 px-4 py-20 lg:flex mx-auto'>
			<div className='mx-auto'>
				<div className='relative max-w-3xl'>
					<div className='fixed top-8 right-4 z-10 block w-full overflow-y-auto lg:hidden'>
						<TOCPopover toc={toc} path={data.title} />
					</div>
					<div className='mb-5 flex-col gap-6 space-y-4'>
						<ViewTransition name={`blog-title-${data.slug}`}>
							<h1
								className='scroll-m-28 font-bold text-3xl tracking-tight sm:text-4xl'
								id={data.slug}
							>
								{data.title}
							</h1>
						</ViewTransition>
						<div className='flex flex-wrap gap-4 text-muted-foreground text-sm'>
							<ViewTransition name={`blog-meta-${data.slug}`}>
								<div className='flex items-center'>
									<Calendar className='mr-2 size-4 text-primary' />
									<span>{data.posting}</span>
								</div>
							</ViewTransition>
							<ViewTransition name={`blog-category-${data.slug}`}>
								<div className='flex items-center'>
									<Tag className='mr-2 size-4 text-primary' />
									<Badge variant='outline' className='border border-primary'>
										{data.category}
									</Badge>
								</div>
							</ViewTransition>
							<ViewTransition name={`blog-read-time-${data.slug}`}>
								<div className='flex items-center'>
									<Clock className='mr-2 size-4 text-primary' />
									<span>{readingTime}</span>
								</div>
							</ViewTransition>
						</div>
					</div>
					<article className='max-w-none'>{children}</article>
				</div>
			</div>

			<div className='sticky top-24 right-4 hidden h-[calc(var(--toc-rest))] w-1/4 overflow-y-auto lg:block'>
				<TOC toc={toc} />
			</div>
		</div>
	)
}
