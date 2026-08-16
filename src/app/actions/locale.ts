'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { isLocale, LOCALE_COOKIE, type Locale } from '@/i18n/config'

/** Persists the visitor's language choice; `i18n/request.ts` reads it back. */
export async function setLocale(locale: Locale) {
	if (!isLocale(locale)) return

	const store = await cookies()
	store.set(LOCALE_COOKIE, locale, {
		path: '/',
		maxAge: 60 * 60 * 24 * 365,
		sameSite: 'lax',
	})

	revalidatePath('/', 'layout')
}
