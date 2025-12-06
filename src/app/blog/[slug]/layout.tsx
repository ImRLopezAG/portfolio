import { BlogLayout } from '@components/blog/layout'
import { strapi } from '@services/strapi.service'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import LoadingState from '@components/blog/layout/loading'
export default async function BlogPost({
	children,
	params,
}: LayoutProps<'/blog/[slug]'>) {
	const { slug } = await params
	const post = await strapi.getPostBySlug(slug)
	if (!post) return notFound()
	return (
		<Suspense fallback={<LoadingState />}>
			<BlogLayout post={post}>{children}</BlogLayout>
		</Suspense>
	)
}

export async function generateStaticParams() {
	const posts = await strapi.getPosts()
	return posts.map(({ metadata }) => ({
		slug: metadata.slug,
	}))
}
