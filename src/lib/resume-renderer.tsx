import { join } from 'node:path'
import type { UIElement } from '@json-render/core'
import type { StandardComponentProps } from '@json-render/react-pdf'
import {
	type RenderComponentRegistry,
	renderToBuffer,
} from '@json-render/react-pdf/render'
import { Font, Link, Page, Text, View } from '@react-pdf/renderer'
import { Children, type ReactNode } from 'react'
import type { Locale } from '@/i18n/config'
import { buildResumeSpec } from './resume'

type Context<P> = { element: UIElement<string, P>; children?: ReactNode }

Font.register({
	family: 'STIX Two Text',
	fonts: [
		{ src: join(process.cwd(), 'public/fonts/cv/STIXTwoText-Regular.ttf') },
		{
			src: join(process.cwd(), 'public/fonts/cv/STIXTwoText-Bold.ttf'),
			fontWeight: 700,
		},
		{
			src: join(process.cwd(), 'public/fonts/cv/STIXTwoText-Italic.ttf'),
			fontStyle: 'italic',
		},
		{
			src: join(process.cwd(), 'public/fonts/cv/STIXTwoText-BoldItalic.ttf'),
			fontStyle: 'italic',
			fontWeight: 700,
		},
	],
})

// The built-in Text and Heading components hard-code Helvetica. These small
// overrides keep the JSON document spec while matching the reference's serif.
const registry = {
	ResumePage: ({
		element: { props },
		children,
	}: Context<StandardComponentProps<'Page'>>) => (
		<Page
			size={props.size ?? 'LETTER'}
			style={{
				paddingTop: props.marginTop ?? 34,
				paddingBottom: props.marginBottom ?? 34,
				paddingLeft: props.marginLeft ?? 40,
				paddingRight: props.marginRight ?? 40,
				fontFamily: 'STIX Two Text',
				fontSize: 11,
				lineHeight: 1.25,
				color: '#000000',
			}}
		>
			{children}
		</Page>
	),
	ResumeText: ({
		element: { props },
	}: Context<StandardComponentProps<'Text'>>) => (
		<Text
			style={{
				fontFamily: 'STIX Two Text',
				fontWeight: props.fontWeight ?? 'normal',
				fontStyle: props.fontStyle ?? 'normal',
				fontSize: props.fontSize ?? 11,
				color: props.color ?? '#111111',
				textAlign: props.align ?? 'left',
				lineHeight: props.lineHeight ?? 1.25,
			}}
		>
			{props.text}
		</Text>
	),
	ResumeLink: ({
		element: { props },
	}: Context<StandardComponentProps<'Link'>>) => (
		<Link
			src={props.href}
			style={{
				fontFamily: 'STIX Two Text',
				fontSize: props.fontSize ?? 11,
				color: props.color ?? '#0000ee',
				textDecoration: props.color === '#000000' ? 'none' : 'underline',
			}}
		>
			{props.text}
		</Link>
	),
	ResumeHeading: ({
		element: { props },
	}: Context<StandardComponentProps<'Heading'>>) => (
		<Text
			style={{
				fontFamily: 'STIX Two Text',
				fontWeight: 700,
				fontSize: 24,
				lineHeight: 1.2,
				textAlign: 'center',
				marginBottom: 2.6,
			}}
		>
			{props.text}
		</Text>
	),
	ResumeSection: ({ element: { props } }: Context<{ title: string }>) => (
		<View
			wrap={false}
			minPresenceAhead={60}
			style={{
				flexShrink: 0,
				marginTop: 13.1,
				marginBottom: 11,
				borderBottomWidth: 1,
				borderBottomColor: '#000000',
				paddingBottom: 0,
			}}
		>
			<Text
				style={{
					fontFamily: 'STIX Two Text',
					fontWeight: 700,
					fontSize: 12,
					lineHeight: 1.15,
				}}
			>
				{props.title}
			</Text>
		</View>
	),
	ResumeEntry: ({ children }: { children?: ReactNode }) => (
		<View wrap={false}>{children}</View>
	),
	ResumeList: ({
		element: { props },
	}: Context<StandardComponentProps<'List'>>) => (
		<View style={{ marginTop: 6, paddingLeft: 14.25, gap: 3 }}>
			{props.items.map((item) => (
				<View key={item} wrap={false} style={{ flexDirection: 'row', gap: 6 }}>
					<View style={{ width: 12 }}>
						<View
							style={{
								width: 4.4,
								height: 4.4,
								borderRadius: 2.2,
								backgroundColor: '#000000',
								marginTop: 5,
							}}
						/>
					</View>
					<Text
						style={{
							flex: 1,
							fontSize: props.fontSize ?? 11,
							lineHeight: 1.25,
						}}
					>
						{item}
					</Text>
				</View>
			))}
		</View>
	),
	ResumeRow: ({ children }: { children?: ReactNode }) => (
		<View wrap={false} style={{ flexDirection: 'row', gap: 12 }}>
			{Children.map(children, (child, index) => (
				<View style={{ flex: index === 0 ? 3 : 2 }}>{child}</View>
			))}
		</View>
	),
} satisfies RenderComponentRegistry

export function renderResume(locale: Locale) {
	return renderToBuffer(buildResumeSpec(locale), { registry })
}
