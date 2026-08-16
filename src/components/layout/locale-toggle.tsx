'use client'

import { Languages } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useTransition } from 'react'
import { setLocale } from '@/app/actions/locale'
import { Button } from '@/components/ui/button'
import { DEFAULT_LOCALE, LOCALE_LABELS, LOCALES } from '@/i18n/config'

/**
 * Two locales, so a toggle beats a dropdown. Writing the cookie happens in a
 * server action, which then revalidates the layout so server-rendered strings
 * pick up the new language.
 */
export function LocaleToggle() {
	const active = useLocale()
	const [pending, startTransition] = useTransition()

	const next = LOCALES.find((locale) => locale !== active) ?? DEFAULT_LOCALE

	return (
		<Button
			variant='ghost'
			size='icon'
			className='h-10 w-10 p-0'
			disabled={pending}
			title={`Switch to ${LOCALE_LABELS[next]}`}
			onClick={() => startTransition(() => setLocale(next))}
		>
			<Languages className='size-5' />
			<span className='sr-only'>Switch to {LOCALE_LABELS[next]}</span>
		</Button>
	)
}
