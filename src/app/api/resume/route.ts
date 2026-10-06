import { renderResume } from '@lib/resume-renderer'
import { strapi } from '@services/strapi.service'
import { NextResponse } from 'next/server'
import { getLocale } from 'next-intl/server'
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/config'

// @react-pdf/renderer needs Node built-ins, so this must stay on the default
// Node runtime — `cacheComponents` rejects an explicit `runtime` segment config.

function filename(name: string, locale: Locale) {
	return `${name.replace(/\s+/g, '-')}-CV-${locale}.pdf`
}

export async function GET(request: Request) {
	const requestedLocale = new URL(request.url).searchParams.get('locale')
	if (requestedLocale !== null && !isLocale(requestedLocale)) {
		return NextResponse.json(
			{ error: 'Supported locales: en, es' },
			{ status: 400 },
		)
	}
	const activeLocale = requestedLocale ?? (await getLocale())
	const locale = isLocale(activeLocale) ? activeLocale : DEFAULT_LOCALE
	const { basics } = strapi.profile(locale)

	try {
		const pdf = await renderResume(locale)

		return new NextResponse(new Uint8Array(pdf), {
			headers: {
				'Content-Type': 'application/pdf',
				// `inline` so the browser renders it in the tab; the filename is
				// still used if the viewer's save button is hit.
				'Content-Disposition': `inline; filename="${filename(basics.name, locale)}"`,
				'Content-Language': locale,
				// Generate from the current profile on every request.
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
