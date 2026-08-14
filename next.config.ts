import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

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
		turbopackFileSystemCacheForDev: true,
	},
	transpilePackages: ['three'],
	// Both use React APIs (createContext) that are absent under the
	// `react-server` condition, so they must resolve at runtime, not be bundled.
	serverExternalPackages: ['@react-pdf/renderer', '@json-render/react-pdf'],
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

export default withMDX(nextConfig)
