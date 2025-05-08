'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	value: string
}

export function CopyButton({ value, className, ...props }: CopyButtonProps) {
	const [copied, setCopied] = useState(false)

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(value || '')
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy text: ', err)
		}
	}

	return (
		<Button
			{...props}
			type='button'
			onClick={copyToClipboard}
			className={cn('rounded-md bg-transparent text-muted-foreground hover:bg-stone-800', className)}
			disabled={copied}
			aria-label='Copy code'
		>
			{copied ? <Check className='size-4' /> : <Copy className='size-4' />}
			<span className='sr-only'>Copy code</span>
		</Button>
	)
}
