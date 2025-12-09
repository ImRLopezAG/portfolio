import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

const validImagesCdnHosts = [
	'cdn.jsdelivr.net',
	'bucket.imrlopez.dev',
	'svgl.app',
] as const

const nextConfig: NextConfig = {
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
	images: {
		remotePatterns: validImagesCdnHosts.map(
			(host) => new URL(`https://${host}/**`),
		),
		formats: ['image/avif', 'image/webp'],
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
			{
				source: '/_next/image',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		]
	},
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
