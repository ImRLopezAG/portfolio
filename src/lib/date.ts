import { differenceInMonths, formatDate } from 'date-fns'

/**
 * Parses a `YYYY-MM-DD` string as a *local* date.
 *
 * `new Date('2026-02-01')` is spec'd as UTC midnight, which in any negative
 * offset lands on the previous day — so a role starting `2026-02-01` formats as
 * "Jan 2026". Splitting the parts sidesteps that entirely.
 */
export function parseDay(value: string): Date {
	const [year, month, day] = value.split('-').map(Number)
	return new Date(year, (month ?? 1) - 1, day ?? 1)
}

/** "Oct 2025 – Present" */
export function formatMonthRange(start: string, end: string | null) {
	const from = formatDate(parseDay(start), 'MMM yyyy')
	return `${from} – ${end ? formatDate(parseDay(end), 'MMM yyyy') : 'Present'}`
}

/** "1 yr 6 mos", LinkedIn-style. Inclusive of the starting month. */
export function formatTenure(start: string, end: string | Date) {
	const months = differenceInMonths(end, parseDay(start)) + 1
	if (months < 1) return null

	const years = Math.floor(months / 12)
	const rest = months % 12
	const parts = []
	if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
	if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`)
	return parts.join(' ')
}
