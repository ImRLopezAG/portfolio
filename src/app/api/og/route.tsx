import { ImageResponse } from 'next/og'
import { source } from '@/lib/source'

const size = { width: 1200, height: 630 }

/** The favicon mark, redrawn inline so the card needs no external fetch. */
function Logo({ scale }: { scale: number }) {
	return (
		<svg
			width={24 * scale}
			height={24 * scale}
			viewBox='0 0 24 24'
			fill='none'
		>
			<path
				fill='#FFF'
				d='M10.405 7.748a1.5 1.5 0 01-.549 2.05l-6.062 3.5a1.5 1.5 0 01-1.5-2.599l6.062-3.5a1.5 1.5 0 012.049.55z'
			/>
			<path
				fill='#005bc4'
				d='M1.745 11.252a1.5 1.5 0 012.049-.55l6.062 3.5a1.5 1.5 0 01-1.5 2.599l-6.062-3.5a1.5 1.5 0 01-.55-2.05z'
			/>
			<path
				fill='#FFF'
				d='M22.255 11.252a1.5 1.5 0 00-2.049-.55l-6.062 3.5a1.5 1.5 0 001.5 2.599l6.062-3.5a1.5 1.5 0 00.55-2.05z'
			/>
			<path
				fill='#005bc4'
				d='M13.595 7.748a1.5 1.5 0 00.549 2.05l6.062 3.5a1.5 1.5 0 001.5-2.599l-6.062-3.5a1.5 1.5 0 00-2.049.55z'
			/>
		</svg>
	)
}

export async function GET(request: Request) {
	const slugParam = new URL(request.url).searchParams.get('slug')
	// Crawlers carry no locale cookie, so the card uses the default language.
	const page = source.getPage(slugParam ? slugParam.split('/') : undefined)
	const title = page?.data.title ?? 'Blog'
	const description = page?.data.description ?? ''
	const category = (page?.data as { category?: string } | undefined)?.category

	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: 72,
				background:
					'linear-gradient(135deg, #0a0a0e 0%, #101018 55%, #0b1224 100%)',
				color: '#fff',
				fontFamily: 'sans-serif',
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<Logo scale={2.6} />
					<span
						style={{ fontSize: 30, color: 'rgba(255,255,255,0.85)' }}
					>
						imrlopez.dev
					</span>
				</div>
				{category && (
					<span
						style={{
							fontSize: 24,
							color: '#7aa2f7',
							border: '1.5px solid rgba(122,162,247,0.45)',
							borderRadius: 999,
							padding: '8px 24px',
						}}
					>
						{category}
					</span>
				)}
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
				<span
					style={{
						fontSize: title.length > 45 ? 58 : 72,
						fontWeight: 700,
						lineHeight: 1.12,
						letterSpacing: -1,
					}}
				>
					{title}
				</span>
				{description && (
					<span
						style={{
							fontSize: 28,
							lineHeight: 1.45,
							color: 'rgba(255,255,255,0.6)',
						}}
					>
						{description.length > 160
							? `${description.slice(0, 157)}…`
							: description}
					</span>
				)}
			</div>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					color: 'rgba(255,255,255,0.4)',
					fontSize: 24,
				}}
			>
				<span>Angel Gabriel Lopez · Blog</span>
				<span style={{ color: '#4ea96f' }}>imrlopez.dev/blog</span>
			</div>
		</div>,
		size,
	)
}
