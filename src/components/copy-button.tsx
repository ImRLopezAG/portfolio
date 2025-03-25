'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	value: string
}

export function CopyButton({ value, className, ...props }: CopyButtonProps) {
	const [hasCopied, setHasCopied] = useState(false)

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(value)
		setHasCopied(true)
		setTimeout(() => setHasCopied(false), 2000)
	}

	return (
		<Button
			size='icon'
			variant='ghost'
			className={cn(
				'absolute top-3 right-3 h-7 w-7 text-muted-foreground hover:bg-muted',
				className,
			)}
			onClick={copyToClipboard}
			{...props}
		>
			{hasCopied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
			<span className='sr-only'>Copy code</span>
		</Button>
	)
}
