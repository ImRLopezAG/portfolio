import { Content } from '@components/blog/layout/content'
import { metadata } from '@lib/metadata'
import { strapi } from '@services/strapi.service'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>) {
	const { slug } = await params
	const data = await strapi.getPostBySlug(slug)
	if (!data) return metadata({ title: 'Post not found' })
	const { metadata: meta } = data
	return metadata({ title: meta.title, description: meta.desc })
}

export default async function BlogPost({ params }: PageProps<'/blog/[slug]'>) {
	const { slug } = await params
	const data = await strapi.getPostBySlug(slug)
	if (!data) return notFound()

	return <Content>{data.content}</Content>
}
