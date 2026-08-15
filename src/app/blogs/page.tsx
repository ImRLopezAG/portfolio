import { BlogCard } from '@components/blog/card'
import { BlogListSkeleton } from '@components/blog/list-skeleton'
import { cn } from '@lib/utils'
import { Badge } from '@ui/badge'
import Link from 'next/link'
import { Suspense } from 'react'
import { source } from '@/lib/source'

/** Category names travel through the URL as slugs: "Web Development" ⇄ "web-development". */
const toSlug = (category: string) => category.replace(/\s+/g, '-')
const normalize = (value: string) =>
	value.toLowerCase().replace(/-/g, ' ').trim()

const badgeStyles = (active: boolean) =>
	cn('cursor-pointer bg-muted text-black dark:text-white', {
		'bg-primary': active,
	})

async function BlogList({
	searchParams,
}: {
	searchParams: PageProps<'/blogs'>['searchParams']
}) {
	const { category } = await searchParams
	// No filter selected reads the same as an explicit "all".
	const selected = typeof category === 'string' ? normalize(category) : 'all'

	const posts = source
		.getPages()
		.toSorted(
			(a, b) =>
				new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
		)

	const categories = Array.from(
		new Set(posts.map((post) => post.data.category).filter(Boolean)),
	) as string[]

	const visible =
		selected === 'all'
			? posts
			: posts.filter((post) => normalize(post.data.category ?? '') === selected)

	return (
		<>
			<div className='mb-8 flex flex-wrap justify-center gap-2'>
				<Badge className={badgeStyles(selected === 'all')}>
					<Link href='/blog'>All</Link>
				</Badge>
				{categories.map((name) => (
					<Badge
						key={name}
						className={badgeStyles(normalize(name) === selected)}
					>
						<Link href={`/blog?category=${toSlug(name)}`}>{name}</Link>
					</Badge>
				))}
			</div>

			<div className='grid gap-8'>
				{visible.length > 0 ? (
					visible.map((post) => <BlogCard key={post.path} post={post} />)
				) : (
					<p className='text-center text-muted-foreground'>
						No posts in this category yet.
					</p>
				)}
			</div>
		</>
	)
}

export default function Home({ searchParams }: PageProps<'/blogs'>) {
	return (
		<div className='container z-40 mx-auto px-4 py-20'>
			<div className='mx-auto max-w-4xl'>
				{/* Static shell — prerendered. Only the filtered list below reads
				    searchParams, so it's the only part that streams. */}
				<div className='mb-12 space-y-4 text-center'>
					<h1 className='font-bold text-4xl tracking-tight sm:text-5xl'>
						Blog
					</h1>
					<div className='mx-auto h-1 w-20 rounded-full bg-primary' />
					<p className='text-muted-foreground text-xl'>
						Thoughts, ideas, and insights on web development and programming
					</p>
				</div>

				<Suspense fallback={<BlogListSkeleton />}>
					<BlogList searchParams={searchParams} />
				</Suspense>
			</div>
		</div>
	)
}
