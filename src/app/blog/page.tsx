import { Badge } from '@/components/ui/badge'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ViewTransition } from '@components/view-transition'
import { getPosts } from '@server/services/post'
import Link from 'next/link'
interface BlogPageProps {
	searchParams: Promise<{ category: string }>
}

export const metadata = {
	title: 'Blog',
	description:
		'Thoughts, ideas, and insights on web development and programming',
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const { category } = await searchParams
	const posts = await getPosts()
	const categories = [...new Set(posts.map((post) => post.metadata.category))]
	const filteredPosts = () => {
		if (category) {
			console.log(category)
			const filteredPosts = posts.filter(
				(post) =>
					post.metadata.category?.toLocaleLowerCase() ===
					category.replace(/-/g, ' ').toLocaleLowerCase(),
			)
			return filteredPosts.length > 0 ? filteredPosts : posts
		}
		return posts
	}

	return (
		<ViewTransition>
			<div className='container mx-auto px-4 py-20'>
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
						<Badge className='cursor-pointer bg-primary'>
							<Link href='/blog'>All</Link>
						</Badge>
						{categories.map((category) => (
							<Badge key={category} className='cursor-pointer bg-muted'>
								<Link
									href={`/blog?category=${category?.replace(/ /g, '-') || category}`}
								>
									{category}
								</Link>
							</Badge>
						))}
					</div>

					<div className='grid gap-8'>
						{filteredPosts().map((post) => (
							<Card key={post.slug} className='overflow-hidden'>
								<CardHeader className='pb-2'>
									<div className='flex items-start justify-between'>
										<ViewTransition name={`blog-category-${post.slug}`}>
											<Badge
												variant='outline'
												className='mb-2 border border-primary'
											>
												{post.metadata.category}
											</Badge>
										</ViewTransition>
										<ViewTransition name={`blog-date-${post.slug}`}>
											<span className='text-muted-foreground text-sm'>
												{post.metadata.date}
											</span>
										</ViewTransition>
									</div>
									<ViewTransition name={`blog-title-${post.slug}`}>
										<CardTitle className='transition-colors hover:text-primary'>
											<Link href={`/blog/${post.slug}`}>
												{post.metadata.title}
											</Link>
										</CardTitle>
									</ViewTransition>
								</CardHeader>
								<CardContent>
									<p className='text-muted-foreground'>
										{post.metadata.description}
									</p>
								</CardContent>
								<CardFooter className='flex items-center justify-between'>
									<ViewTransition name={`blog-content-${post.slug}`}>
										<Link
											href={`/blog/${post.slug}`}
											className='font-medium text-primary hover:underline'
										>
											Read more →
										</Link>
									</ViewTransition>
									{post.metadata.tags && (
										<div className='mt-2 flex w-4/5 flex-wrap justify-end gap-2'>
											{post.metadata.tags.map((tag) => (
												<Badge key={tag} variant='outline'>
													{tag}
												</Badge>
											))}
										</div>
									)}
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</div>
		</ViewTransition>
	)
}
