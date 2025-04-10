'use client'

import type React from 'react'

import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { CodeIcon } from './annotations/icons'

type CodeBlockProps = React.HTMLAttributes<HTMLPreElement> & {
	filename?: string
	'data-language'?: string
	'data-meta'?: string
}

export function CodeBlock({
	children,
	className,
	filename,
	'data-language': dataLanguage,
	'data-meta': dataMeta,
	...props
}: CodeBlockProps) {
	const [copied, setCopied] = useState(false)
	const [lineCount, setLineCount] = useState(1)
	const preRef = useRef<HTMLPreElement>(null)
	useEffect(() => {
		if (preRef.current) {
			const text = preRef.current.textContent || ''
			const lines = text.split('\n')
			setLineCount(lines.length)
		}
	}, [])

	const copyToClipboard = async () => {
		if (!preRef.current) return

		try {
			await navigator.clipboard.writeText(preRef.current.textContent || '')
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy text: ', err)
		}
	}

	// Extract language from data-language or className
	const language =
		dataLanguage || className?.replace(/language-/, '').split(' ')[0] || 'text'

	// Extract filename from data-meta
	let extractedFilename = filename

	if (!extractedFilename && dataMeta) {
		const filenameMatch = dataMeta.match(/filename=([^\s,]+)/)
		if (filenameMatch) {
			extractedFilename = filenameMatch[1]
		}
	}

	// If still not found, use a default
	if (!extractedFilename) {
		extractedFilename = `index.${language}`
	}

	return (
		<div className='not-prose my-6 overflow-hidden rounded-lg border bg-zinc-900 text-white'>
			{/* Header with filename and language */}
			<div className='flex items-center justify-between border-stone-700 border-b bg-stone-900 px-4 py-2'>
				<div className='flex items-center gap-6 text-muted-foreground text-sm'>
					<CodeIcon title={extractedFilename} />
					<span>{extractedFilename}</span>
				</div>
				<div className='flex items-center gap-2'>
					<button
						type='button'
						onClick={copyToClipboard}
						className='rounded-md bg-stone-900 p-1.5 text-muted-foreground hover:bg-stone-800'
						aria-label='Copy code'
					>
						{copied ? (
							<Check className='h-4 w-4' />
						) : (
							<Copy className='h-4 w-4' />
						)}
						<span className='sr-only'>Copy code</span>
					</button>
				</div>
			</div>

			<div className='flex'>
				{/* Line numbers */}
				<div className='select-none bg-zinc-900 px-4 py-4 text-right text-muted-foreground text-sm'>
					{Array.from({ length: lineCount }).map((_, i) => (
						<div key={i} className='leading-relaxed '>
							{i + 1}
						</div>
					))}
				</div>

				<pre
					ref={preRef}
					className={cn(
						'overflow-x-auto p-4 text-sm leading-relaxed',
						className,
					)}
					{...props}
				>
					{children}
				</pre>
			</div>
		</div>
	)
}
