import { Badge } from '@ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card'
import { ViewTransition } from 'react'

interface Props {
	post: BlogPost
}
export function BlogCard({ post: { metadata } }: Props) {
	const slug = metadata.slug

	return (
		<Card className='overflow-hidden'>
			<CardHeader className='pb-2'>
				<div className='flex items-start justify-between'>
					<Badge variant='outline' className='mb-2 border border-primary'>
						<ViewTransition name={`blog-category-${slug}`}>
							<span>{metadata.category}</span>
						</ViewTransition>
					</Badge>
					<ViewTransition name={`blog-date-${slug}`}>
						<span className='text-muted-foreground text-sm'>
							{metadata.posting}
						</span>
					</ViewTransition>
				</div>
				<CardTitle className='transition-colors hover:text-primary'>
					<ViewTransition name={`blog-title-${slug}`}>
						<a href={`/blog/${slug}`}>{metadata.title}</a>
					</ViewTransition>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className='text-muted-foreground'>{metadata.desc}</p>
			</CardContent>
			<CardFooter className='flex items-center justify-between'>
				<ViewTransition name={`blog-read-time-${slug}`}>
					<a
						href={`/blog/${slug}`}
						className='font-medium text-primary hover:underline'
					>
						Read more →
					</a>
				</ViewTransition>
				{metadata.tags && (
					<div className='mt-2 flex w-4/5 flex-wrap justify-end gap-2'>
						{metadata.tags.map((tag) => (
							<Badge key={crypto.randomUUID()} variant='outline'>
								{tag.children.map((t) => t.text).join('')}
							</Badge>
						))}
					</div>
				)}
			</CardFooter>
		</Card>
	)
}
