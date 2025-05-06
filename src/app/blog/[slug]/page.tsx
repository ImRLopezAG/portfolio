import { useMDXComponents } from '@components/mdx-component'
import { ViewTransition } from '@components/view-transition'
import { rehypeExtractFileInfo } from '@lib/rehype-extract-filename'
import { getPost, getPosts } from '@server/services/post'
import { absoluteUrl } from '@shared/utils'
import { Badge } from '@ui/badge'
import { Button } from '@ui/button'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { type Options, rehypePrettyCode } from 'rehype-pretty-code'

interface BlogPageProps {
	params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
	const posts = await getPosts()
	return posts.map((post) => ({
		slug: post.slug,
	}))
}

export async function generateMetadata({ params }: BlogPageProps) {
	const { slug } = await params
	const post = await getPost({ slug })

	if (!post) {
		return {
			title: 'Post not found',
			description: 'The requested post was not found',
		}
	}
	const doc = post.metadata

	return {
		title: doc.title,
		description: doc.description,
		openGraph: {
			title: doc.title,
			description: doc.description,
			type: 'article',
			url: absoluteUrl(post.slug),
			images: [
				{
					url: `/og?title=${encodeURIComponent(
						doc.title,
					)}&description=${encodeURIComponent(doc.description ?? '')}`,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: doc.title,
			description: doc.description,
			images: [
				{
					url: `/og?title=${encodeURIComponent(
						doc.title,
					)}&description=${encodeURIComponent(doc.description ?? '')}`,
				},
			],
			creator: '@ImRLopezAG',
			site: 'imrlopez.dev',
		},
	}
}

export default async function BlogPage({ params }: BlogPageProps) {
	const { slug } = await params
	const post = await getPost({ slug })
	if (!post) {
		notFound()
	}

	return (
		<ViewTransition>
			<div className='container mx-auto px-4 py-20'>
				<div className='mx-auto max-w-3xl'>
					<div className='mb-6'>
						<Button asChild variant='ghost' className='mb-4'>
							<Link href='/blog'>
								<ArrowLeft className='mr-2 h-4 w-4 text-primary' />
								Back to all posts
							</Link>
						</Button>

						<ViewTransition name={`blog-title-${post.slug}`}>
							<h1 className='mb-4 font-bold text-3xl tracking-tight sm:text-4xl'>
								{post.metadata.title}
							</h1>
						</ViewTransition>
						<div className='mb-6 flex flex-wrap gap-4 text-muted-foreground'>
							<ViewTransition name={`blog-date-${post.slug}`}>
								<div className='flex items-center'>
									<Calendar className='mr-2 h-4 w-4 text-primary' />
									{post.metadata.date}
								</div>
							</ViewTransition>
							<ViewTransition name={`blog-category-${post.slug}`}>
								<div className='flex items-center'>
									<Tag className='mr-2 h-4 w-4 text-primary' />
									<Badge variant='outline' className='border border-primary'>
										{post.metadata.category}
									</Badge>
								</div>
							</ViewTransition>
						</div>
					</div>

					<ViewTransition name={`blog-content-${post.slug}`}>
						<MDXRemote
							source={post.content}
							components={useMDXComponents()}
							options={{
								mdxOptions: {
									rehypePlugins: [
										[
											rehypePrettyCode,
											{
												theme: 'one-dark-pro',
												keepBackground: false
											} as Options,
										],
										rehypeExtractFileInfo
									],
									remarkPlugins: [],
									format: 'mdx',
								},
							}}
						/>
					</ViewTransition>
				</div>
			</div>
		</ViewTransition>
	)
}
