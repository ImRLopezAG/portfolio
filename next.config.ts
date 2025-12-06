import type { NextConfig } from 'next'

const DEFAULT_STRAPI_URL = 'http://localhost:1337'

const resolvedStrapiUrl = (() => {
	try {
		return new URL(process.env.STRAPI_URL ?? DEFAULT_STRAPI_URL)
	} catch {
		return new URL(DEFAULT_STRAPI_URL)
	}
})()

const strapiUploadsPattern = new URL(`${resolvedStrapiUrl.origin}/uploads/**`)

const iconsCdnPattern = new URL('https://cdn.jsdelivr.net/gh/devicons/devicon/icons/**')
const allowLocalIpImages =
	process.env.NODE_ENV !== 'production'

const nextConfig: NextConfig = {
	cacheComponents: true,
	reactCompiler: true,
	images: {
		remotePatterns: [strapiUploadsPattern, iconsCdnPattern],
		dangerouslyAllowLocalIP: allowLocalIpImages,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	experimental: {
		viewTransition: true,
	},
	allowedDevOrigins: ['local.imrlopez.dev'],
	transpilePackages: ['three']
}

export default nextConfig
