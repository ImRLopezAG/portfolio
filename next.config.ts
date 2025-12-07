import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

const iconsCdnPattern = new URL(
	'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/**',
)

const nextConfig: NextConfig = {
	cacheComponents: true,
	reactCompiler: true,
	images: {
		remotePatterns: [iconsCdnPattern],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	experimental: {
		viewTransition: true,
		turbopackFileSystemCacheForDev: true,
	},
	allowedDevOrigins: ['local.imrlopez.dev'],
	transpilePackages: ['three'],
}
const withMDX = createMDX({})
export default withMDX(nextConfig)