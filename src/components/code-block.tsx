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
		extractedFilename = `main.${language}`
	}

	return (
		<div className='not-prose my-6 overflow-hidden rounded-lg border border-border bg-slate-200 text-white dark:bg-stone-900'>
			{/* Header with filename and language */}
			<div className='flex items-center justify-between border-border bg-gray-500 px-4 py-2 dark:bg-stone-700'>
				<div className='flex items-center gap-6 text-sm text-white dark:text-muted-foreground '>
					<CodeIcon title={extractedFilename} />
					<span>{extractedFilename}</span>
				</div>
				<div className='flex items-center gap-2'>
					<div className='text-sm text-white dark:text-muted-foreground'>
						{language}
					</div>
					<button
						type='button'
						onClick={copyToClipboard}
						className='rounded-md p-1.5 text-white hover:bg-gray-800 focus:outline-none dark:text-muted-foreground'
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
				<div className='select-none bg-slate-200 px-4 py-4 text-right text-black text-sm dark:bg-stone-900 dark:text-muted-foreground'>
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
