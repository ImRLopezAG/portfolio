import { docs } from 'fumadocs-mdx:collections/server'
import { defineI18n } from 'fumadocs-core/i18n'
import { loader } from 'fumadocs-core/source'

/**
 * `hideLocale: 'always'` keeps URLs identical across languages, matching the
 * cookie-based locale strategy — a Spanish post lives at the same /blog/<slug>
 * as its English original, sourced from `<slug>.es.mdx`.
 */
export const i18n = defineI18n({
	languages: ['en', 'es'],
	defaultLanguage: 'en',
	hideLocale: 'always',
})

export const source = loader({
	baseUrl: '/blog',
	i18n,
	source: docs.toFumadocsSource(),
})
