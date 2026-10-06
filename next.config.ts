import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const validImagesCdnHosts = [
	'cdn.jsdelivr.net',
	'bucket.imrlopez.dev',
	'svgl.app',
] as const

const nextConfig: NextConfig = {
	allowedDevOrigins: ['local.imrlopez.dev'],
	cacheComponents: true,
	reactCompiler: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	experimental: {
		// viewTransition: true,
		// turbopackFileSystemCacheForDev: disabled — it persists compiled chunks
		// across restarts, and superseded chunks were being served after edits
		// (stale hydration mismatches, stale `searchParams` prerender errors).
		// Re-enable for faster cold starts once that's fixed upstream.
	},
	transpilePackages: ['three'],
	// Both use React APIs (createContext) that are absent under the
	// `react-server` condition, so they must resolve at runtime, not be bundled.
	serverExternalPackages: ['@react-pdf/renderer', '@json-render/react-pdf'],
	outputFileTracingIncludes: {
		'/api/resume': ['./public/fonts/cv/*.ttf'],
	},
	images: {
		remotePatterns: validImagesCdnHosts.map(
			(host) => new URL(`https://${host}/**`),
		),
		formats: ['image/avif', 'image/webp'],
		// Drives the optimizer's own Cache-Control on /_next/image. Setting that
		// header manually via headers() breaks dev-time revalidation.
		minimumCacheTTL: 31536000,
	},
	async rewrites() {
		return [
			{
				source: '/blog',
				destination: '/blogs',
			},
		]
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
				],
			},
		]
	},
}

const withMDX = createMDX({})

/**
 * `extract: true` enables `useExtracted`/`getExtracted`: a build-time loader
 * rewrites those calls into keyed `useTranslations` and keeps `messages/*.json`
 * in sync, so keys are never hand-written. Experimental in next-intl.
 */
const withNextIntl = createNextIntlPlugin({
	requestConfig: './src/i18n/request.ts',
	experimental: {
		srcPath: './src',
		messages: {
			format: 'json',
			path: './messages',
			locales: ['en', 'es'],
			sourceLocale: 'en',
		},
	},
})

export default withNextIntl(withMDX(nextConfig))
