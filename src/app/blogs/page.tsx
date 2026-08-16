import { BlogCard } from '@components/blog/card'
import { BlogListSkeleton } from '@components/blog/list-skeleton'
import { Badge } from '@ui/badge'
import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { source } from '@/lib/source'

export const instant = false

/** Category names travel through the URL as slugs: "Web Development" ⇄ "web-development". */
const toSlug = (category: string) => category.replace(/\s+/g, '-')
const normalize = (value: string) =>
	value.toLowerCase().replace(/-/g, ' ').trim()

/**
 * Lean on the Badge variants rather than hand-picking colours: they pair each
 * background with its matching foreground, so the label stays legible in both
 * themes. Hardcoding `bg-primary` with `dark:text-white` rendered the active
 * filter white-on-white.
 */
const filterVariant = (active: boolean) => (active ? 'default' : 'secondary')

async function BlogList({
	searchParams,
}: {
	searchParams: PageProps<'/blogs'>['searchParams']
}) {
	const t = await getTranslations('blog')
	const { category } = await searchParams
	// No filter selected reads the same as an explicit "all".
	const selected = typeof category === 'string' ? normalize(category) : 'all'

	const posts = source
		.getPages(await getLocale())
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
			{/* `asChild` renders the Badge *as* the anchor, so the whole pill is
			    clickable and its hover styles apply — previously only the label was. */}
			<div className='mb-8 flex flex-wrap justify-center gap-2'>
				<Badge asChild variant={filterVariant(selected === 'all')}>
					<Link href='/blog'>{t('all')}</Link>
				</Badge>
				{categories.map((name) => (
					<Badge
						key={name}
						asChild
						variant={filterVariant(normalize(name) === selected)}
					>
						<Link href={`/blog?category=${toSlug(name)}`}>{name}</Link>
					</Badge>
				))}
			</div>

			<div className='grid gap-8'>
				{visible.length > 0 ? (
					visible.map((post) => <BlogCard key={post.path} post={post} />)
				) : (
					<p className='text-center text-muted-foreground'>{t('empty')}</p>
				)}
			</div>
		</>
	)
}

export default async function Home({ searchParams }: PageProps<'/blogs'>) {
	const t = await getTranslations('blog')
	return (
		<div className='container z-40 mx-auto px-4 py-20'>
			<div className='mx-auto max-w-4xl'>
				{/* Static shell — prerendered. Only the filtered list below reads
				    searchParams, so it's the only part that streams. */}
				<div className='mb-12 space-y-4 text-center'>
					<h1 className='font-bold text-4xl tracking-tight sm:text-5xl'>
						{t('title')}
					</h1>
					<div className='mx-auto h-1 w-20 rounded-full bg-primary' />
					<p className='text-muted-foreground text-xl'>{t('desc')}</p>
				</div>

				<Suspense fallback={<BlogListSkeleton />}>
					<BlogList searchParams={searchParams} />
				</Suspense>
			</div>
		</div>
	)
}
