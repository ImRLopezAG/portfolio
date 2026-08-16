/** Shared locale constants. Kept free of server imports so client code can use them. */

export const LOCALES = ['en', 'es'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

/** Where the visitor's chosen locale is persisted. Read in `i18n/request.ts`. */
export const LOCALE_COOKIE = 'NEXT_LOCALE'

export const LOCALE_LABELS: Record<Locale, string> = {
	en: 'English',
	es: 'Español',
}

export function isLocale(value: unknown): value is Locale {
	return LOCALES.includes(value as Locale)
}
