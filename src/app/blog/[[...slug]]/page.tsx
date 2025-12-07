import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from 'fumadocs-ui/layouts/docs/page'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMDXComponents } from '@/components/mdx'
import { source } from '@/lib/source'
import { seo } from '@lib/seo'
export default async function Page(props: PageProps<'/blog/[[...slug]]'>) {
	const params = await props.params
	const page = source.getPage(params.slug)
	if (!page) notFound()

	const MDX = page.data.body

	return (
		<DocsPage
			toc={page.data.toc}
			tableOfContentPopover={{
				style: 'clerk',
			}}
			tableOfContent={{
				style: 'clerk',
			}}
			footer={{
				enabled: false,
			}}
		>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody>
				<MDX
					components={getMDXComponents({
						// this allows you to link to other pages with relative file paths
						a: createRelativeLink(source, page),
					})}
				/>
			</DocsBody>
		</DocsPage>
	)
}

export async function generateStaticParams() {
	return source.generateParams()
}

export async function generateMetadata(
	props: PageProps<'/blog/[[...slug]]'>,
): Promise<Metadata> {
	const params = await props.params
	const page = source.getPage(params.slug)
	if (!page) notFound()

	return seo({
		title: page.data.title,
		description: page.data.description,
	})
}
