import { Accordion, Accordions } from 'fumadocs-ui/components/accordion'
import { Callout } from 'fumadocs-ui/components/callout'
import { Card, Cards } from 'fumadocs-ui/components/card'
import { File, Files, Folder } from 'fumadocs-ui/components/files'
import { Step, Steps } from 'fumadocs-ui/components/steps'
import {
	Tab,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from 'fumadocs-ui/components/tabs'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import type { MDXComponents } from 'mdx/types'
import { Mermaid } from './mermaid'
import { Tech } from '@landing/sections/tech-stack/tech'
export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		Mermaid,
		Callout,
		Card,
		Cards,
		File,
		Files,
		Folder,
		Step,
		Steps,
		Tab,
		Tabs,
		TabsList,
		TabsContent,
		TabsTrigger,
		Accordion,
		Accordions,
		Tech,
		...components,
	}
}

