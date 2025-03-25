import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const withMDX = createMDX()

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

export default withMDX(nextConfig)
