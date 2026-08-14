// The package root pulls in the React context/provider surface, which doesn't
// exist under the `react-server` condition. This subpath is render-only.
import { renderToBuffer } from '@json-render/react-pdf/render'
import { buildResumeSpec } from '@lib/resume'
import { strapi } from '@services/strapi.service'
import { NextResponse } from 'next/server'

// @react-pdf/renderer needs Node built-ins, so this must stay on the default
// Node runtime — `cacheComponents` rejects an explicit `runtime` segment config.

function filename(name: string) {
	return `${name.replace(/\s+/g, '-')}-Resume.pdf`
}

export async function GET() {
	const { basics } = strapi.profile()

	try {
		const pdf = await renderToBuffer(buildResumeSpec())

		return new NextResponse(new Uint8Array(pdf), {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="${filename(basics.name)}"`,
				'Cache-Control': 'public, max-age=3600',
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
