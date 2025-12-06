'use client'
import { themeIcons } from 'seti-icons'
export function CodeIcon({ title }: { title: string }) {
	const { svg, color } = getDarkIcon(`some.${title}`)
	const __html = svg.replace(
		/svg/,
		`svg fill='${color}' height='28' style='margin: -8px'`,
	)
	return (
		<span
			// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
			dangerouslySetInnerHTML={{ __html }}
			style={{ display: 'contents', margin: -10 }}
		/>
	)
}

const getDarkIcon = themeIcons({
	'grey-light': '#A6ACB0',
	blue: '#0078D7',
	green: '#0E9F6D',
	orange: '#D75F00',
	purple: '#A626A4',
	grey: '#7A7B7D',
	red: '#D50000',
	ignore: '#A6ACB0',
	pink: '#D5006D',
	yellow: '#D7BA7D',
	white: '#FFFFFF',
})
