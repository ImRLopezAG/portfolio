import { BlogCard } from '@components/blog/blog-card'
import { cn } from '@lib/utils'
import { strapi } from '@services/strapi.service'
import { Badge } from '@ui/badge'
import Link from 'next/link'
export default async function Home({ searchParams }: PageProps<'/blogs'>) {
	const search = await searchParams
	const categoryName = search.category as string | undefined
	const posts = await strapi.getPosts()
	const categories = Array.from(
		new Set(posts.map((post) => post.metadata.category).filter(Boolean)),
	) as string[]

	const filteredPosts = () => {
		if (!categoryName || categoryName.toLowerCase() === 'all') {
			return posts
		}
		return posts.filter(
			(post) =>
				post.metadata.category?.toLowerCase() ===
				categoryName.toLowerCase().replace(/-/g, ' '),
		)
	}
	return (
		<div className='container mx-auto px-4 py-20 z-40'>
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
						className={cn(
							'cursor-pointer bg-muted text-black dark:text-white',
							{
								'bg-primary': categoryName === 'all' || categoryName === 'All',
							},
						)}
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
					{filteredPosts().map((post) => (
						<BlogCard key={post.id} post={post} />
					))}
				</div>
			</div>
		</div>
	)
}
