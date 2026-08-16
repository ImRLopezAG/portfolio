import { File as FdFile } from 'fumadocs-ui/components/files'
import { FileText } from 'lucide-react'
import type { ComponentProps } from 'react'

/** The official TypeScript mark: blue rounded square, "TS" in the corner. */
export function TsIcon({ className }: { className?: string }) {
	return (
		<svg viewBox='0 0 128 128' className={className} aria-hidden='true'>
			<rect width='128' height='128' rx='16' fill='#3178c6' />
			<path
				fill='#fff'
				d='M22.7 63.7h50.9v11.4H55.3v51.2H41V75.1H22.7Zm60.6 62.6c-4.6 0-8.7-.8-12.3-2.4-3.6-1.6-6.5-3.9-8.6-6.9l9.4-8.2c1.5 2 3.2 3.5 5.2 4.6 2 1 4.2 1.6 6.6 1.6 2.3 0 4.1-.5 5.4-1.4 1.3-1 2-2.3 2-4 0-1.5-.5-2.7-1.6-3.7s-3.2-2-6.2-3.1l-5.5-2c-4.6-1.7-8-3.9-10.2-6.6-2.2-2.7-3.3-6-3.3-9.9 0-3.1.8-5.9 2.4-8.3 1.6-2.4 3.9-4.3 6.8-5.6 2.9-1.4 6.3-2 10.1-2 4 0 7.6.7 10.8 2.1 3.2 1.4 5.8 3.4 7.8 6l-8.9 8c-1.2-1.6-2.6-2.8-4.2-3.6-1.6-.9-3.4-1.3-5.3-1.3-2.1 0-3.7.4-4.9 1.3-1.2.8-1.8 2-1.8 3.5 0 1.4.6 2.6 1.8 3.5 1.2 1 3.3 2 6.3 3l5.3 1.9c4.6 1.6 8 3.8 10.1 6.5 2.2 2.7 3.2 6 3.2 10 0 3.3-.8 6.2-2.5 8.7-1.6 2.5-4 4.5-7 5.9-3 1.6-6.7 2.4-10.9 2.4Z'
			/>
		</svg>
	)
}

/** The React atom, for .tsx/.jsx files. */
export function ReactIcon({ className }: { className?: string }) {
	return (
		<svg viewBox='-11 -10.5 22 21' className={className} aria-hidden='true'>
			<circle r='2.05' fill='#61dafb' />
			<g stroke='#61dafb' strokeWidth='1' fill='none'>
				<ellipse rx='10' ry='4.2' />
				<ellipse rx='10' ry='4.2' transform='rotate(60)' />
				<ellipse rx='10' ry='4.2' transform='rotate(120)' />
			</g>
		</svg>
	)
}

/** The JavaScript mark: yellow square, "JS" in the corner. */
function JsIcon({ className }: { className?: string }) {
	return (
		<svg viewBox='0 0 128 128' className={className} aria-hidden='true'>
			<rect width='128' height='128' rx='16' fill='#f7df1e' />
			<path d='M71.6 100.8c2.6 4.2 5.9 7.3 11.8 7.3 5 0 8.1-2.5 8.1-5.9 0-4.1-3.2-5.6-8.7-8l-3-1.3c-8.6-3.7-14.3-8.3-14.3-18 0-9 6.8-15.8 17.5-15.8 7.6 0 13 2.6 17 9.6l-9.3 6c-2.1-3.7-4.3-5.1-7.7-5.1-3.5 0-5.7 2.2-5.7 5.1 0 3.6 2.2 5 7.4 7.3l3 1.3c10.1 4.3 15.9 8.8 15.9 18.7 0 10.8-8.5 16.7-19.9 16.7-11.1 0-18.3-5.3-21.9-12.3Zm-42.2 1c1.9 3.3 3.6 6.1 7.7 6.1 3.9 0 6.4-1.5 6.4-7.5V59.8h11.9v40.8c0 12.3-7.2 17.9-17.8 17.9-9.5 0-15-4.9-17.9-10.9Z' />
		</svg>
	)
}

function MdIcon({ className }: { className?: string }) {
	return (
		<svg viewBox='0 0 208 128' className={className} aria-hidden='true'>
			<rect
				width='198'
				height='118'
				x='5'
				y='5'
				rx='12'
				fill='none'
				stroke='#a3a3a3'
				strokeWidth='10'
			/>
			<path
				fill='#a3a3a3'
				d='M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39Zm125 0-30-33h20V30h20v35h20Z'
			/>
		</svg>
	)
}

function JsonIcon({ className }: { className?: string }) {
	return (
		<svg viewBox='0 0 24 24' className={className} aria-hidden='true'>
			<path
				fill='none'
				stroke='#e0af68'
				strokeWidth='2'
				strokeLinecap='round'
				d='M8 3c-2 0-3 1-3 3v3c0 1.5-.8 3-2 3 1.2 0 2 1.5 2 3v3c0 2 1 3 3 3m8-18c2 0 3 1 3 3v3c0 1.5.8 3 2 3-1.2 0-2 1.5-2 3v3c0 2-1 3-3 3'
			/>
		</svg>
	)
}

function CssIcon({ className }: { className?: string }) {
	return (
		<svg viewBox='0 0 128 128' className={className} aria-hidden='true'>
			<path fill='#1572B6' d='m18 3 8.4 94.8L64 108l37.6-10.2L110 3Z' />
			<path
				fill='#fff'
				d='M64 22v75l30.4-8.3L101 22Zm23.5 24H51l.8 9h35l-2.4 26L64 85.6 43.6 80l-1.4-15h10l.7 7.5L64 75.3l11.1-2.8 1.2-13.5H42l-2.6-28h49Z'
				opacity='.9'
			/>
		</svg>
	)
}

function iconFor(name: string) {
	const ext = name.includes('.') ? (name.split('.').pop() ?? '') : ''
	switch (ext) {
		case 'ts':
			return <TsIcon className='!size-4 rounded-[3px]' />
		case 'tsx':
		case 'jsx':
			return <ReactIcon className='!size-4' />
		case 'js':
			return <JsIcon className='!size-4 rounded-[3px]' />
		case 'json':
			return <JsonIcon className='!size-4' />
		case 'md':
		case 'mdx':
			return <MdIcon className='!h-3 !w-4' />
		case 'css':
			return <CssIcon className='!size-4' />
		default:
			return <FileText className='!size-4 text-white/40' />
	}
}

/** fumadocs File with the real branded icon for its extension. */
export function File({ name, ...rest }: ComponentProps<typeof FdFile>) {
	return <FdFile name={name} icon={iconFor(name)} {...rest} />
}
