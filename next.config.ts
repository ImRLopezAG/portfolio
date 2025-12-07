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
	images: {
		remotePatterns: validImagesCdnHosts.map(
			(host) => new URL(`https://${host}/**`),
		),
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	experimental: {
		// viewTransition: true,
		turbopackFileSystemCacheForDev: true,
	},
	transpilePackages: ['three'],
	async rewrites() {
		return [
			{
				source: '/blog',
				destination: '/blogs',
			},
		]
	},
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
