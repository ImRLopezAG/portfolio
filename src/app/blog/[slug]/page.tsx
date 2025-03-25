import { useMDXComponents } from '@components/mdx-component'
import { rehypeExtractFilename } from '@lib/rehype-extract-filename'
import { api } from '@shared/trpc'
import { absoluteUrl } from '@shared/utils'
import { Badge } from '@ui/badge'
import { Button } from '@ui/button'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import rehypePrettyCode, { type Options } from 'rehype-pretty-code'

interface BlogPageProps {
	params: Promise<{ slug: string }>
}
export async function generateMetadata({ params }: BlogPageProps) {
	const { slug } = await params
	const doc = await api.post.getPostMetadata({ slug })

	if (!doc) {
		return {}
	}

	return {
		title: doc.title,
		description: doc.description,
		openGraph: {
			title: doc.title,
			description: doc.description,
			type: 'article',
			url: absoluteUrl(doc.slug),
			images: [
				{
					url: `/og?title=${encodeURIComponent(
						doc.title,
					)}&description=${encodeURIComponent(doc.description)}`,
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
					)}&description=${encodeURIComponent(doc.description)}`,
				},
			],
			creator: '@ImRLopezAG',
			site: 'imrlopez.dev',
		},
	}
}

export default async function BlogPage({ params }: BlogPageProps) {
	const { slug } = await params
	const post = await api.post.getPost({ slug })

	if (!post) {
		notFound()
	}
	return (
		<div className='container mx-auto px-4 py-20'>
			<div className='mx-auto max-w-3xl'>
				<div className='mb-6'>
					<Button asChild variant='ghost' className='mb-4'>
						<Link href='/blog'>
							<ArrowLeft className='mr-2 h-4 w-4' />
							Back to all posts
						</Link>
					</Button>

					<h1 className='mb-4 font-bold text-3xl tracking-tight sm:text-4xl'>
						{post.metadata.title}
					</h1>

					<div className='mb-6 flex flex-wrap gap-4 text-muted-foreground'>
						<div className='flex items-center'>
							<Calendar className='mr-2 h-4 w-4' />
							{post.metadata.date}
						</div>
						<div className='flex items-center'>
							<Tag className='mr-2 h-4 w-4' />
							<Badge variant='outline'>{post.metadata.category}</Badge>
						</div>
					</div>
				</div>
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
										keepBackground: false,
										onVisitLine(node) {
											// Prevent the line from being collapsed
											if (node.children.length === 0) {
												node.children = [{ type: 'text', value: ' ' }]
											}
										},
										// Add this to ensure line numbers are properly displayed
										onVisitHighlightedLine(node) {
											node.properties.className = ['highlighted']
										},

										transformers: [],
									} as Options,
								],
								rehypeExtractFilename,
							],
							format: 'mdx',
						},
					}}
				/>
			</div>
		</div>
	)
}
