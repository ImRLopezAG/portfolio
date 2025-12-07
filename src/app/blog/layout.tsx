import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { RootProvider } from 'fumadocs-ui/provider/next'
import { source } from '@/lib/source'
export default function Layout({ children }: LayoutProps<'/blog'>) {
	return (
		<RootProvider>
			<DocsLayout
				tree={source.pageTree}
				sidebar={{
					hidden: true,
				}}
			>
				{children}
			</DocsLayout>
		</RootProvider>
	)
}
