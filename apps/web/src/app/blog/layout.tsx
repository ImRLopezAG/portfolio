import { strapi } from '@services/strapi.service'
import { Suspense } from 'react'
import { LoadingSection } from '@landing/loading'
export default function BlogPost({ children }: LayoutProps<'/blog'>) {
	return <Suspense fallback={<LoadingSection />}>{children}</Suspense>
}

export async function generateStaticParams() {
	const posts = await strapi.getPosts()
	return posts.map(({ metadata }) => ({
		slug: metadata.slug,
	}))
}
