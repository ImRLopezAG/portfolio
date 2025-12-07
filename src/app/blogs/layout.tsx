import { LoadingSection } from '@landing/loading'
import { Suspense } from 'react'
export default function BlogPost({ children }: LayoutProps<'/blog'>) {
	return <Suspense fallback={<LoadingSection />}>{children}</Suspense>
}
