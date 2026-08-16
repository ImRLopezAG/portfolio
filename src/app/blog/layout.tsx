import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { RootProvider } from 'fumadocs-ui/provider/next'
import { getLocale } from 'next-intl/server'
import { source } from '@/lib/source'
export default async function Layout({ children }: LayoutProps<'/blog'>) {
	// With i18n enabled the loader exposes one page tree per language.
	const locale = await getLocale()
	return (
		<RootProvider>
			<DocsLayout
				tree={source.pageTree[locale]}
				sidebar={{
					enabled: false,
				}}
			>
				{children}
			</DocsLayout>
		</RootProvider>
	)
}
