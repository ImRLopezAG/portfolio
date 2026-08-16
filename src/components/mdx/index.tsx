import { Tech } from '@landing/sections/tech-stack/tech'
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion'
import { Callout } from 'fumadocs-ui/components/callout'
import { Card, Cards } from 'fumadocs-ui/components/card'
import { Files, Folder } from 'fumadocs-ui/components/files'
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
import { File } from './file-icons'
import { LoopSession } from './loop-session'
import { Mermaid } from './mermaid'
import { Race } from './race'
import { Replay } from './replay'
import { RoleShift } from './role-shift'
import { StageDeck } from './stage-deck'
import { TestLedger } from './test-ledger'
export function getMDXComponents(components?: MDXComponents): MDXComponents {
	return {
		...defaultMdxComponents,
		LoopSession,
		Race,
		StageDeck,
		TestLedger,
		RoleShift,
		Mermaid,
		Replay,
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
