import type { Locale } from '@/i18n/config'
import { DEFAULT_LOCALE } from '@/i18n/config'

/** Recognises the `{ en, es }` shape produced by `i18nString`. */
function isTranslatable(value: object): value is Record<Locale, string> {
	const keys = Object.keys(value)
	return (
		keys.length === 2 &&
		keys.includes('en') &&
		keys.includes('es') &&
		Object.values(value).every((entry) => typeof entry === 'string')
	)
}

/**
 * The shape after localization: every `{ en, es }` pair becomes a plain string,
 * recursively. Without this, consumers would still see `string | { en, es }`
 * for fields that can only ever be a string once localized.
 */
export type Localized<T> = T extends string
	? string
	: T extends ReadonlyArray<infer Item>
		? Array<Localized<Item>>
		: T extends Record<Locale, string>
			? string
			: T extends object
				? { [K in keyof T]: Localized<T[K]> }
				: T

/**
 * Collapses every `{ en, es }` pair anywhere in the parsed profile down to a
 * single string for the active locale. Doing this after parsing keeps the zod
 * schema locale-agnostic, so it's built once rather than per request.
 *
 * Falls back to the default locale when a translation is missing, so a
 * half-translated entry degrades to English instead of rendering blank.
 */
export function localize<T>(value: T, locale: Locale): Localized<T> {
	if (Array.isArray(value)) {
		return value.map((entry) => localize(entry, locale)) as Localized<T>
	}

	if (value !== null && typeof value === 'object') {
		if (isTranslatable(value)) {
			const translated = value[locale]
			return ((translated || value[DEFAULT_LOCALE]) ?? '') as Localized<T>
		}

		return Object.fromEntries(
			Object.entries(value).map(([key, entry]) => [
				key,
				localize(entry, locale),
			]),
		) as Localized<T>
	}

	return value as Localized<T>
}
