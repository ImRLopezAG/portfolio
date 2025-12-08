import {
	GetObjectCommand,
	HeadObjectCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3'
import { env } from './env'

const ICON_PREFIX = 'icons'

const client = new S3Client({
	region: 'auto',
	endpoint: env.R2_ENDPOINT,
	credentials: {
		accessKeyId: env.R2_ACCESS_KEY_ID,
		secretAccessKey: env.R2_SECRET_ACCESS_KEY,
	},
})

/** Get all possible source URLs for a tech icon */
function getSourceUrls(techName: string) {
	return [
		`https://svgl.app/library/${techName}.svg`,
		`https://svgl.app/library/${techName}_dark.svg`,
		`https://svgl.app/library/${techName}_light.svg`,
		`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${techName}/${techName}-original.svg`,
		`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${techName}/${techName}-plain.svg`,
	]
}

/** Fetch icon from external source */
async function fetchIcon(url: string): Promise<Buffer | null> {
	try {
		const response = await fetch(url)
		if (!response.ok) return null
		const arrayBuffer = await response.arrayBuffer()
		return Buffer.from(arrayBuffer)
	} catch {
		return null
	}
}

export const r2 = {
	/** Check if an object exists in R2 */
	async exists(key: string): Promise<boolean> {
		try {
			await client.send(
				new HeadObjectCommand({
					Bucket: env.R2_BUCKET,
					Key: key,
				}),
			)
			return true
		} catch {
			return false
		}
	},

	/** Get public URL for an R2 object */
	getPublicUrl(key: string): string {
		return `${env.R2_PUBLIC_URL}/${key}`
	},

	/** Upload a file to R2 */
	async upload(
		key: string,
		body: Buffer | Uint8Array | string,
		contentType: string,
	): Promise<string> {
		await client.send(
			new PutObjectCommand({
				Bucket: env.R2_BUCKET,
				Key: key,
				Body: body,
				ContentType: contentType,
			}),
		)
		return r2.getPublicUrl(key)
	},

	/** Get object from R2 */
	async get(key: string): Promise<Buffer | null> {
		try {
			const response = await client.send(
				new GetObjectCommand({
					Bucket: env.R2_BUCKET,
					Key: key,
				}),
			)
			const bytes = await response.Body?.transformToByteArray()
			return bytes ? Buffer.from(bytes) : null
		} catch {
			return null
		}
	},

	/** Sync a single icon to R2 */
	async syncIcon(techName: string): Promise<boolean> {
		const normalized = techName.toLowerCase().replace(/\./g, '')
		const key = `${ICON_PREFIX}/${normalized}.svg`

		if (await r2.exists(key)) return true

		const sourceUrls = getSourceUrls(normalized)
		for (const url of sourceUrls) {
			const iconBuffer = await fetchIcon(url)
			if (iconBuffer) {
				await r2.upload(key, iconBuffer, 'image/svg+xml')
				return true
			}
		}
		return false
	},

	/** Sync all icons from skills array */
	async syncAllIcons(
		skills: Array<{ name: string; logo?: string }>,
	): Promise<Record<string, boolean>> {
		const results: Record<string, boolean> = {}
		const iconNames = new Set<string>()

		// Collect unique icon names (use logo if available, otherwise name)
		for (const skill of skills) {
			const iconName = skill.logo ?? skill.name
			iconNames.add(iconName.toLowerCase().replace(/\./g, ''))
		}

		// Sync each icon
		for (const iconName of iconNames) {
			results[iconName] = await r2.syncIcon(iconName)
		}

		return results
	},

	/** Get icon URL with fallbacks for client components */
	getIconSrc(techName: string): { main: string; fallbacks: string[] } {
		const normalized = techName.toLowerCase().replace(/\./g, '')

		return {
			main: `${env.R2_PUBLIC_URL}/${ICON_PREFIX}/${normalized}.svg`,
			fallbacks: getSourceUrls(normalized),
		}
	},
} as const

/** Sync all icons from strapi profile at build time */
export async function syncIcons() {
	// Dynamic import to avoid circular dependency
	const { strapi } = await import('@services/strapi.service')
	const { skills, projects } = strapi.profile()

	const allIcons = [...skills, ...projects.flatMap((p) => p.techStack ?? [])]

	const results = await r2.syncAllIcons(allIcons)
	const successful = Object.values(results).filter(Boolean).length
	console.log(`[R2] Synced ${successful}/${Object.keys(results).length} icons`)
}
