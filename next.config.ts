import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	transpilePackages: ['next-mdx-remote'],
	experimental: {
		useCache: true,
		reactCompiler: true,
		viewTransition: true,
		mdxRs: true,
	},
}

export default nextConfig
