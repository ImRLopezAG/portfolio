import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE } from './config'

/**
 * Locale resolution without i18n routing: URLs stay as they are and the choice
 * lives in a cookie. Reading it is dynamic under `cacheComponents`, so anything
 * that renders a translated string is server-rendered per request rather than
 * fully prerendered.
 */
export default getRequestConfig(async () => {
	const store = await cookies()
	const selected = store.get(LOCALE_COOKIE)?.value
	const locale = isLocale(selected) ? selected : DEFAULT_LOCALE

	return {
		locale,
		messages: (await import(`../../messages/${locale}.json`)).default,
	}
})
