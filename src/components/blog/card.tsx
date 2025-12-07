import { Badge } from '@ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@ui/card'
import Link from 'next/link'
import type { source } from '@/lib/source'

interface Props {
	post: ReturnType<typeof source.getPages>[number]
}
export function BlogCard({ post: { slugs, data } }: Props) {
	return (
		<Card className='overflow-hidden'>
			<CardHeader className='pb-2'>
				<div className='flex items-start justify-between'>
					<Badge variant='outline' className='mb-2 border border-primary'>
						<span>{data.category}</span>
					</Badge>
					<span className='text-muted-foreground text-sm'>{data.date}</span>
				</div>
				<CardTitle className='transition-colors hover:text-primary'>
					<Link href={`/blog/${slugs.join('/')}`} prefetch={true}>
						{data.title}
					</Link>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className='text-muted-foreground'>{data.description}</p>
			</CardContent>
			<CardFooter className='flex items-center justify-between'>
				<Link
					href={`/blog/${slugs.join('/')}`}
					className='font-medium text-primary hover:underline'
					prefetch={true}
				>
					Read more →
				</Link>
				{data.tags && (
					<div className='mt-2 flex w-4/5 flex-wrap justify-end gap-2'>
						{data.tags.map((tag) => (
							<Badge key={crypto.randomUUID()} variant='outline'>
								{tag}
							</Badge>
						))}
					</div>
				)}
			</CardFooter>
		</Card>
	)
}
