import { r2 } from '@lib/r2'
import { strapi } from '@services/strapi.service'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/** Icons that shouldn't have dark/light variants uploaded */
const THEME_SWAP_EXCLUDED = ['next', 'placeholder', 'expo']

/** Get source URLs for an icon */
function getSourceUrls(iconName: string) {
	return [
		`https://svgl.app/library/${iconName}.svg`,
		`https://svgl.app/library/${iconName}_dark.svg`,
		`https://svgl.app/library/${iconName}_light.svg`,
		`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`,
	]
}

/** Fetch and upload icon to R2 */
async function uploadIcon(
	iconName: string,
	sourceUrl: string,
): Promise<boolean> {
	try {
		const response = await fetch(sourceUrl)
		if (!response.ok) return false

		const buffer = Buffer.from(await response.arrayBuffer())
		await r2.upload(`icons/${iconName}.svg`, buffer, 'image/svg+xml')
		return true
	} catch {
		return false
	}
}

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl
	const iconName = searchParams.get('name')
	const sourceUrl = searchParams.get('src')

	if (!iconName || !sourceUrl) {
		return NextResponse.json({ error: 'Missing name or src' }, { status: 400 })
	}

	// Never upload placeholder
	if (sourceUrl.includes('placeholder')) {
		return NextResponse.json(
			{ error: 'Cannot cache placeholder' },
			{ status: 400 },
		)
	}

	try {
		const response = await fetch(sourceUrl)
		if (!response.ok) {
			return NextResponse.json(
				{ error: 'Failed to fetch icon' },
				{ status: 400 },
			)
		}

		const buffer = Buffer.from(await response.arrayBuffer())
		const key = `icons/${iconName}.svg`

		await r2.upload(key, buffer, 'image/svg+xml')

		return NextResponse.json({ success: true, key })
	} catch {
		return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
	}
}

/** Sync all icons from profile - dev only */
export async function POST() {
	if (process.env.NODE_ENV !== 'development') {
		return NextResponse.json({ error: 'Dev only' }, { status: 403 })
	}

	const { skills, projects } = strapi.profile()

	// Collect all unique icon names
	const iconNames = new Set<string>()
	for (const skill of skills) {
		const name = (skill.logo ?? skill.name).toLowerCase().replace(/\./g, '')
		iconNames.add(name)
	}
	for (const project of projects) {
		for (const tech of project.techStack ?? []) {
			const name = (tech.logo ?? tech.name).toLowerCase().replace(/\./g, '')
			iconNames.add(name)
		}
	}

	const results: Record<string, { success: boolean; variants?: string[] }> = {}

	for (const iconName of iconNames) {
		const sourceUrls = getSourceUrls(iconName)
		let uploaded = false

		// Try to upload base icon
		for (const url of sourceUrls) {
			if (await uploadIcon(iconName, url)) {
				uploaded = true
				break
			}
		}

		results[iconName] = { success: uploaded, variants: [] }

		// Upload dark/light variants if not excluded
		const isExcluded = THEME_SWAP_EXCLUDED.some((ex) => iconName.includes(ex))
		if (!isExcluded) {
			// Dark variant
			if (
				await uploadIcon(
					`${iconName}_dark`,
					`https://svgl.app/library/${iconName}_dark.svg`,
				)
			) {
				results[iconName].variants?.push('dark')
			}
			// Light variant
			if (
				await uploadIcon(
					`${iconName}_light`,
					`https://svgl.app/library/${iconName}_light.svg`,
				)
			) {
				results[iconName].variants?.push('light')
			}
		}
	}

	const successful = Object.values(results).filter((r) => r.success).length

	return NextResponse.json({
		success: true,
		total: iconNames.size,
		uploaded: successful,
		results,
	})
}
