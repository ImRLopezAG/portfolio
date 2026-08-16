// The package root pulls in the React context/provider surface, which doesn't
// exist under the `react-server` condition. This subpath is render-only.
import { renderToBuffer } from '@json-render/react-pdf/render'
import { buildResumeSpec } from '@lib/resume'
import { strapi } from '@services/strapi.service'
import { NextResponse } from 'next/server'
import { getLocale } from 'next-intl/server'

// @react-pdf/renderer needs Node built-ins, so this must stay on the default
// Node runtime — `cacheComponents` rejects an explicit `runtime` segment config.

function filename(name: string) {
	return `${name.replace(/\s+/g, '-')}-Resume.pdf`
}

export async function GET() {
	const locale = await getLocale()
	const { basics } = strapi.profile(locale)

	try {
		const pdf = await renderToBuffer(buildResumeSpec(locale))

		return new NextResponse(new Uint8Array(pdf), {
			headers: {
				'Content-Type': 'application/pdf',
				// `inline` so the browser renders it in the tab; the filename is
				// still used if the viewer's save button is hit.
				'Content-Disposition': `inline; filename="${filename(basics.name)}"`,
				// Not cached: the PDF is regenerated from profile data on every
				// request (~200ms), and a cached response also pins its
				// Content-Disposition, which is how this previously kept
				// downloading after being switched to `inline`.
				'Cache-Control': 'no-store, must-revalidate',
			},
		})
	} catch (error) {
		console.error('[resume] failed to render PDF', error)
		return NextResponse.json(
			{ error: 'Failed to generate resume' },
			{ status: 500 },
		)
	}
}
